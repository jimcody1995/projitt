'use client';

import { useState, useMemo, useRef, useEffect } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
    SortingState,
    Row,
    useReactTable,
    RowSelectionState,
} from '@tanstack/react-table';
import {
    getTodayStartOfDay,
    getTomorrowStartOfDay,
    createDateFromString,
    isSameOrAfterDate,
    isBeforeDate,
    isSameDate
} from '@/lib/date-utils';
import { DataGridTable, DataGridTableRowSelectAll, DataGridTableRowSelect } from "@/components/ui/data-grid-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, EllipsisVertical, ListFilter, Search, X } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";
import { Input } from "@/components/ui/input";
import { FilterTool } from "./filter";
import { NoData } from "./no-data";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import CheckInterview from "./check-interview";
import Suspend from "./suspend";

/**
 * @description
 * TableMode is a component that displays a table of applicant data with filtering and sorting capabilities.
 * It provides three sections: "Upcoming", "Pending", and "Past" data.
 * The table uses a dynamic column definition based on the active section. Each row includes an actions menu for rescheduling or canceling an interview.
 * The component also includes search functionality, a filter sidebar, and pagination.
 * It uses `@tanstack/react-table` for efficient data table management and provides unique `data-testid` attributes for UI test automation.
 */
export default function TableMode({ setSelectedApplication, data, loading }: { setSelectedApplication: (application: any) => void, data: any[], loading: boolean }) {
    const [activeSection, setActiveSection] = useState<'active' | 'onboarding' | 'offboarding' | 'suspended'>('suspended');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'lastSession', desc: true },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [suspendOpen, setSuspendOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [nameFilter, setNameFilter] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    // Refs for tab elements to calculate positions
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
        active: null,
        onboarding: null,
        offboarding: null,
        suspended: null
    });

    // Categorize data by date
    const categorizeddata = useMemo(() => {
        const today = getTodayStartOfDay();
        const tomorrow = getTomorrowStartOfDay();

        return {
            active: data.filter(interview => {
                // Parse date-only part to avoid timezone issues
                const interviewDate = createDateFromString(interview.date.split('T')[0]);
                return isSameOrAfterDate(interviewDate, tomorrow);
            }),
            onboarding: data.filter(interview => {
                // Parse date-only part to avoid timezone issues
                const interviewDate = createDateFromString(interview.date.split('T')[0]);
                return isSameDate(interviewDate, today);
            }),
            offboarding: data.filter(interview => {
                // Parse date-only part to avoid timezone issues
                const interviewDate = createDateFromString(interview.date.split('T')[0]);
                return isBeforeDate(interviewDate, today);
            }),
            suspended: data.filter(interview => {
                // Parse date-only part to avoid timezone issues
                const interviewDate = createDateFromString(interview.date.split('T')[0]);
                return isBeforeDate(interviewDate, today);
            })
        };
    }, [data]);

    // Get data for current active section
    const currentSectionData = useMemo(() => {
        return categorizeddata[activeSection] || [];
    }, [categorizeddata, activeSection]);
    const filteredData = useMemo<any[]>(() => {
        return currentSectionData.filter((item) => {
            // Status filter
            const matchesStatus =
                !selectedStatuses?.length ||
                selectedStatuses.includes(
                    item.status.replace('bg-', '').charAt(0).toUpperCase() +
                    item.status.replace('bg-', '').slice(1),
                );

            // Mode filter
            const matchesMode =
                !selectedMode?.length ||
                selectedMode.includes(item.mode || '');

            // Country filter
            const matchesCountry =
                !selectedCountries?.length ||
                selectedCountries.includes(item.job?.country_id || 0);

            // Name filter
            const matchesName =
                !nameFilter ||
                (item.applicant.first_name + " " + item.applicant.last_name).toLowerCase().includes(nameFilter.toLowerCase());

            // Search filter
            const searchLower = (searchQuery || "").toLowerCase();
            const matchesSearch =
                !searchQuery ||
                item.job?.title.toLowerCase().includes(searchLower) ||
                (item.applicant.first_name + " " + item.applicant.last_name).toLowerCase().includes(searchLower);

            return matchesSearch && matchesStatus && matchesMode && matchesCountry && matchesName;
        });
    }, [searchQuery, selectedStatuses, selectedMode, selectedCountries, nameFilter, currentSectionData]);

    const sortedData = useMemo<any[]>(() => {
        if (sorting.length === 0) return filteredData;

        const { id, desc } = sorting[0];

        return [...filteredData].sort((a, b) => {
            let aValue: any = a?.[id];
            let bValue: any = b?.[id];

            // If sorting by name, compare first_name
            if (id === "name") {
                aValue = a?.first_name ?? "";
                bValue = b?.first_name ?? "";
            }
            if (id === "job-detail") {
                aValue = a?.job?.title ?? "";
                bValue = b?.job?.title ?? "";
            }

            // Ensure values are strings and handle edge cases
            aValue = String(aValue ?? "");
            bValue = String(bValue ?? "");

            // Additional safety check - if either value is still empty or undefined, handle gracefully
            if (!aValue && !bValue) return 0;
            if (!aValue) return desc ? -1 : 1;
            if (!bValue) return desc ? 1 : -1;

            try {
                return desc
                    ? bValue.localeCompare(aValue, undefined, { sensitivity: "base" }) // Descending
                    : aValue.localeCompare(bValue, undefined, { sensitivity: "base" }); // Ascending
            } catch {
                // Fallback to simple string comparison if localeCompare fails
                return desc
                    ? bValue > aValue ? 1 : -1
                    : aValue > bValue ? 1 : -1;
            }
        });
    }, [sorting, filteredData]);



    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: 'select',
                header: () => <DataGridTableRowSelectAll />,
                cell: ({ row }: { row: any }) => <DataGridTableRowSelect row={row} />,
                enableSorting: false,
                enableHiding: false,
                enableResizing: false,
                size: 46,
                meta: {
                    cellClassName: '',
                },
            },
            {
                accessorKey: 'employee',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Employee ID"
                        column={column}
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`employee-${row.original.id}`}
                    >
                        {row.original.employee_id}
                    </span>
                ),
                enableSorting: true,
                size: 90,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'name',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Name"
                        column={column}
                        data-testid="name-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div
                        className="text-[14px] text-[#4b4b4b] flex items-center gap-[8px]"
                        data-testid={`name-${row.original.id}`}
                    >
                        <div className="w-[28px] h-[28px] rounded-full bg-[#d6eeec] text-[#0D978B] flex items-center justify-center">
                            CF
                        </div>
                        <p className="text-[14px]/[22px]">
                            {row.original.name}
                        </p>
                    </div>
                ),
                enableSorting: true,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'job-detail',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Job Details"
                        column={column}
                        data-testid="job-detail-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div data-testid={`job-detail-${row.original.id}`}>
                        <p
                            className="text-[14px]/[22px] text-[#4b4b4b]"
                        >
                            {row.original.job?.title}
                        </p>
                        <p
                            className="text-[11px]/[14px] text-[#8f8f8f]"
                        >
                            {row.original.job?.country}
                        </p>
                    </div>
                ),
                enableSorting: true,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'department',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Department"
                        column={column}
                        data-testid="department-header"
                    />
                ),
                cell: ({ row }: { row: any }) => {
                    return (
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs `}
                            data-testid={`department-badge-${row.original.id}`}
                        >
                            {row.original.department}
                        </span>
                    );
                },
                enableSorting: true,
                size: 90,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'employment-type',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Employment Type"
                        column={column}
                        data-testid="employment-type-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`employment-type-${row.original.id}`}
                    >
                        {row.original.employment_type}
                    </span>
                ),
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }: { row: any }) => <ActionsCell row={row} />,
                enableSorting: false,
                size: 40,
                meta: {
                    headerClassName: '',
                },
            },
        ].filter(Boolean),
        [activeSection]
    );

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedApplication('');
        }
    };

    const table = useReactTable({
        columns: columns as ColumnDef<any, any>[],
        data: data,
        pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
        getRowId: (row: any) => row.id,
        state: {
            pagination,
            sorting,
            rowSelection,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    /**
     * @description
     * This component renders an action dropdown menu for a job posting row within the table.
     * It provides options to "Reschedule", "Cancel Interview", and "Mark as No-show".
     * @param {Object} props - The component props.
     * @param {Row<any>} props.row - The table row data.
     * @returns {JSX.Element} The actions dropdown menu.
     */
    function ActionsCell({ row }: { row: Row<any> }) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="size-7"
                        mode="icon"
                        variant="ghost"
                        data-testid={`actions-button-${row.original.id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    data-testid={`actions-menu-${row.original.id}`}
                >
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`reschedule-action-${row.original.id}`}
                    >
                        View Profile
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`cancel-interview-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); setCancelOpen(true); }}
                    >
                        Send Message
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`no-show-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); setMessage("Unsuspend Alice Fernadez") }}
                    >
                        Unsuspend
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`no-show-action-${row.original.id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        Terminate / Offboard
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`no-show-action-${row.original.id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        Delete
                    </div>
                </DropdownMenuContent>
            </DropdownMenu >
        );
    }
    return (
        <div data-testid="table-mode-container">
            <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex mt-[20px] w-full overflow-x-auto relative justify-between items-center'>
                {/* Sliding underline */}
                <div className="flex items-center gap-[12px]">
                    <div
                        className="absolute bottom-0 h-[2px] bg-[#0d978b] transition-all duration-300 ease-in-out"
                        style={{
                            left: tabRefs.current[activeSection]?.offsetLeft ?
                                `${tabRefs.current[activeSection]!.offsetLeft - 15}px` : '0px',
                            width: tabRefs.current[activeSection]?.offsetWidth ?
                                `${tabRefs.current[activeSection]!.offsetWidth}px` : '0px'
                        }}
                    />

                    <div
                        ref={(el) => { tabRefs.current.active = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium  cursor-pointer ${activeSection === 'active' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                        onClick={() => setActiveSection('active')}
                        data-testid="upcoming-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Active</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.onboarding = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium cursor-pointer ${activeSection === 'onboarding' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                        onClick={() => setActiveSection('onboarding')}
                        data-testid="pending-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Onboarding</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.offboarding = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium  cursor-pointer ${activeSection === 'offboarding' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                        onClick={() => setActiveSection('offboarding')}
                        data-testid="past-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Offboarding</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.past = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium cursor-pointer ${activeSection === 'suspended' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                        onClick={() => setActiveSection('suspended')}
                        data-testid="past-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Suspended</p>
                    </div>
                </div>
                <div className="relative">
                    <Search
                        className="size-[16px] text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                        data-testid="search-icon"
                        id="search-icon"
                    />
                    <Input
                        placeholder="Search data"
                        className="ps-9 w-[173px] h-[32px]"
                        data-testid="search-input"
                        id="search-input"
                    />
                </div>
            </div>
            <div className='w-full mt-[22px]'>
                <DataGrid
                    className='w-full'
                    table={table}
                    recordCount={data?.length || 0}
                    data-testid="data-data-grid"
                    onRowClick={(row) => { setSelectedApplication(row.original); setSuspendOpen(true); }}
                >
                    <div className="flex items-center justify-between sm:flex-row flex-col gap-[10px]">
                        <div className="relative">
                            <Search
                                className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                                data-testid="search-icon"
                                id="search-icon"
                            />
                            <Input
                                placeholder="Search data"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="ps-9 w-[243px] h-[42px]"
                                data-testid="search-input"
                                id="search-input"
                            />
                            {searchQuery.length > 0 && (
                                <Button
                                    mode="icon"
                                    variant="ghost"
                                    className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                                    onClick={() => setSearchQuery('')}
                                    data-testid="clear-search-button"
                                    id="clear-search-button"
                                >
                                    <X />
                                </Button>
                            )}
                        </div>
                        <div className='flex gap-[16px]'>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilter(!showFilter)}
                                className='text-[#053834] px-[12px] py-[6px] flex items-center gap-[6px] font-semibold'
                                data-testid="filter-button"
                                id="filter-button"
                            >
                                <ListFilter
                                    className={`size-[20px] transition-transform duration-300 ease-in-out ${showFilter ? 'rotate-180' : 'rotate-0'
                                        }`}
                                />
                                Filter
                            </Button>
                            <Button
                                variant="outline"
                                className='text-[#053834] px-[12px] py-[6px] flex items-center gap-[6px] font-semibold'
                                data-testid="export-button"
                                id="export-button"
                            >
                                <Download className='size-[20px]' />
                                Export
                            </Button>
                        </div>
                    </div>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilter
                            ? 'max-h-[500px] opacity-100 mt-4'
                            : 'max-h-0 opacity-0 mt-0'
                            }`}
                    >
                        <FilterTool
                            selectedMode={selectedMode}
                            selectedStatuses={selectedStatuses}
                            selectedCountries={selectedCountries}
                            nameFilter={nameFilter}
                            setSelectedMode={setSelectedMode}
                            setSelectedStatuses={setSelectedStatuses}
                            setSelectedCountries={setSelectedCountries}
                            setNameFilter={setNameFilter}
                        />
                    </div>
                    <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                        <> {data.length === 0 ?
                            (!loading && <NoData data-testid="no-data-message" />) : <>
                                <div
                                    className={`w-full overflow-x-auto transition-all duration-300 ease-in-out ${showFilter
                                        ? 'h-[calc(100vh-375px)]'
                                        : 'h-[calc(100vh-375px)]'
                                        }`}
                                    data-testid="list-view-container"
                                >
                                    <DataGridTable />
                                </div>
                                <DataGridPagination data-testid="pagination-controls" className="mt-[25px]" />
                            </>
                        }
                        </>
                    </div>
                </DataGrid>
                <Suspend open={suspendOpen} onOpenChange={setSuspendOpen} setMessage={setMessage} />
                <CheckInterview open={message.length > 0} setOpen={() => setMessage('')} message={message} />
            </div>
        </div>
    );
}
