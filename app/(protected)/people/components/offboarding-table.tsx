'use client';

import { useState, useMemo } from "react";
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
import moment from "moment";
import { useRouter } from "next/navigation";

export default function OffboardingTable() {
    const router = useRouter();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'lastSession', desc: true },
    ]);
    const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([{
        id: 1,
        employee_id: '123456',
        name: 'John Doe',
        job: {
            title: 'Software Engineer',
            country: 'United States'
        },
        department: 'IT',
        startDate: new Date(),
        completed: 35
    },
    {
        id: 2,
        employee_id: '123456',
        name: 'John Doe',
        job: {
            title: 'Software Engineer',
            country: 'United States'
        },
        department: 'IT',
        startDate: new Date(),
        completed: 35
    },

    {
        id: 3,
        employee_id: '123456',
        name: 'John Doe',
        job: {
            title: 'Software Engineer',
            country: 'United States'
        },
        department: 'IT',
        startDate: new Date(),
        completed: 35
    }
    ]);
    const [loading, setLoading] = useState(false);
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

    const filteredData = useMemo<any[]>(() => {
        return data.filter((item) => {
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
    }, [searchQuery, selectedStatuses, selectedMode, selectedCountries, nameFilter, data]);

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

    const handleOpenChange = (open: boolean) => {
        setSelectedApplication(null);
    };

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
                accessorKey: 'Start Date',
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
                            data-testid={`start-date-badge-${row.original.id}`}
                        >
                            {moment(row.original.start_date).format('MMM DD, YYYY')}
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
                accessorKey: '%Completion',
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
                        className="text-[14px] text-[#0d978b]"
                        data-testid={`completed-${row.original.id}`}
                    >
                        {row.original.completed}%
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
        []
    );

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
                        onClick={e => { e.stopPropagation(); router.push(`/people/detail?id=${row.original.id}`) }}
                    >
                        View Profile
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`cancel-interview-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); }}
                    >
                        Send Message
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
    );
}