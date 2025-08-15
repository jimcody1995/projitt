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
} from '@tanstack/react-table';
import moment from 'moment';
import Detail from '../../applications/components/detail';
import { DataGridTable } from "@/components/ui/data-grid-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, EllipsisVertical, ListFilter, Search, X } from "lucide-react";
import CheckDialog from "../../job-postings/components/checkDialog";
import { DataGrid } from "@/components/ui/data-grid";
import { Input } from "@/components/ui/input";
import { FilterTool } from "./filter";
import { NoData } from "../../assessments/components/noData";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import Reschedule from "./reschedule";
import CancelInterview from "./cancel-interview";
import { useBasic } from "@/context/BasicContext";

/**
 * @description
 * TableMode is a component that displays a table of applicant interviews with filtering and sorting capabilities.
 * It provides three sections: "Upcoming", "Pending", and "Past" interviews.
 * The table uses a dynamic column definition based on the active section. Each row includes an actions menu for rescheduling or canceling an interview.
 * The component also includes search functionality, a filter sidebar, and pagination.
 * It uses `@tanstack/react-table` for efficient data table management and provides unique `data-testid` attributes for UI test automation.
 */
export default function TableMode({ setSelectedApplication, interviews }: { setSelectedApplication: (id: string) => void, interviews: any[] }) {
    const [activeSection, setActiveSection] = useState<'upcoming' | 'interviews' | 'job-summary'>('upcoming');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'lastSession', desc: true },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [rescheduleOpen, setRescheduleOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [applicantsData, setApplicantsData] = useState<any[]>(interviews);
    const [selectedMode, setSelectedMode] = useState<number[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const { country } = useBasic()
    const filteredData = useMemo<any[]>(() => {
        return applicantsData.filter((item) => {
            const matchesStatus =
                !selectedStatuses?.length ||
                selectedStatuses.includes(
                    item.status.replace('bg-', '').charAt(0).toUpperCase() +
                    item.status.replace('bg-', '').slice(1),
                );

            const searchLower = (searchQuery || "").toLowerCase();
            const matchesSearch =
                !searchQuery ||
                item.job_title.toLowerCase().includes(searchLower) ||
                (item.name || "").toLowerCase().includes(searchLower);

            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, selectedStatuses, applicantsData]);



    // const getData = async () => {
    //     try {
    //         const response = await getJobPostings({
    //             country_ids: selectedLocations,
    //             department_ids: selectedDepartments,
    //             employment_type_ids: selectedTypes,
    //             // status: selectedStatuses,
    //             page: pagination.pageIndex,
    //             per_page: pagination.pageSize,
    //         });
    //         console.log(response.data);

    //         setApplicantsData(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getData();
    // }, [selectedLocations, selectedDepartments, selectedTypes, selectedStatuses]);

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
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
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`name-${row.original.id}`}
                    >
                        {row.original.applicant.first_name + " " + row.original.applicant.last_name}
                    </span>
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
                            {country.find((item: any) => item.id === row.original.job?.country_id)?.name}
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
                accessorKey: 'state',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="State"
                        column={column}
                        data-testid="state-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`stage-${row.original.id}`}
                    >
                        {row.original.status}
                    </span>
                ),
                enableSorting: true,
                size: 90,
                meta: {
                    headerClassName: '',
                },
            },
            ...(activeSection === "upcoming"
                ? [{
                    accessorKey: 'date',
                    header: ({ column }: { column: any }) => (
                        <DataGridColumnHeader
                            className='text-[14px] font-medium'
                            title="Application Date"
                            column={column}
                            data-testid="applicants-header"
                        />
                    ),
                    cell: ({ row }: { row: any }) => (
                        <div data-testid={`job-detail-${row.original.id}`}>
                            <p
                                className="text-[14px]/[22px] text-[#4b4b4b]"
                            >
                                {moment(row.original.updated_at).format('DD MMM, YYYY')}
                            </p>
                            <p
                                className="text-[11px]/[14px] text-[#8f8f8f]"
                            >
                                {moment(row.original.updated_at).format('HH:MM A')}
                            </p>
                        </div>
                    ),
                    size: 130,
                    meta: {
                        headerClassName: '',
                    },
                }]
                : []),
            {
                accessorKey: 'mode',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Mode"
                        column={column}
                        data-testid="mode-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`mode-${row.original.id}`}
                    >
                        {row.original.mode}
                    </span>
                ),
                size: 90,
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
        data: filteredData,
        pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
        getRowId: (row: any) => row.id,
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
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
                        onClick={e => { e.stopPropagation(); setRescheduleOpen(true); }}
                    >
                        Reschedule
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`cancel-interview-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); setCancelOpen(true); }}
                    >
                        Cancel Interview
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`no-show-action-${row.original.id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        Mark as No-show
                    </div>
                </DropdownMenuContent>
            </DropdownMenu >
        );
    }
    return (
        <div data-testid="table-mode-container">
            <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  mt-[20px] w-full overflow-x-auto'>
                <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'upcoming' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('upcoming')}
                    data-testid="upcoming-tab-button">
                    <p className='whitespace-nowrap'>Upcoming</p>
                    <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]'>12</span>
                </div>
                <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'interviews' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('interviews')}
                    data-testid="pending-tab-button">
                    <p className='whitespace-nowrap'>Pending</p>
                    <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]'>12</span>
                </div>
                <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'job-summary' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('job-summary')}
                    data-testid="past-tab-button">
                    <p className='whitespace-nowrap'>Past</p>
                </div>
            </div>
            <div className='w-full mt-[22px]'>
                <DataGrid
                    className='w-full'
                    table={table}
                    recordCount={filteredData?.length || 0}
                    onRowClick={(row) => setSelectedApplication(row)}
                    data-testid="interviews-data-grid"
                >
                    <div className="flex items-center justify-between sm:flex-row flex-col gap-[10px]">
                        <div className="relative">
                            <Search
                                className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                                data-testid="search-icon"
                                id="search-icon"
                            />
                            <Input
                                placeholder="Search Job"
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
                                <ListFilter className='size-[20px]' />
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
                    {showFilter && <FilterTool selectedMode={selectedMode} selectedStatuses={selectedStatuses} setSelectedMode={setSelectedMode} setSelectedStatuses={setSelectedStatuses} />}
                    <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                        <> {filteredData.length === 0 ?
                            <NoData data-testid="no-data-message" /> : <>
                                <div
                                    className={`w-full overflow-x-auto h-[calc(100vh-405px)] ${showFilter ? 'h-[calc(100vh-455px)]' : 'h-[calc(100vh-405px)]'}`}
                                    data-testid="list-view-container"
                                >
                                    <DataGridTable />
                                </div>
                                <DataGridPagination data-testid="pagination-controls" />
                            </>
                        }


                        </>
                    </div>
                </DataGrid>
                <Reschedule open={rescheduleOpen} setOpen={setRescheduleOpen} />
                <CancelInterview open={cancelOpen} setOpen={setCancelOpen} />
            </div>
        </div>
    );
}
