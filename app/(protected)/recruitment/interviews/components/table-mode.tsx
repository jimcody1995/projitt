'use client'
import { useState } from "react";
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
import Detail from '../../applications/[id]/components/detail';
import { useMemo } from 'react';
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


export default function TableMode({ setSelectedApplication }: { setSelectedApplication: (id: string) => void }) {
    const [activeSection, setActiveSection] = useState<'upcoming' | 'pending' | 'past'>('upcoming');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'lastSession', desc: true },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFliter, setShowFilter] = useState(false);
    const [rescheduleOpen, setRescheduleOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [applicantsData, setApplicantsData] = useState<any[]>([
        {
            name: 'John Doe',
            job_title: 'Software Engineer',
            job_location: 'USA',
            state: 'Interview',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
        {
            name: 'John David',
            job_title: 'Software Engineer',
            job_location: 'USA',
            state: 'Interview',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
    ]);
    const [selectedMode, setSelectedMode] = useState<number[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
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
                item.title.toLowerCase().includes(searchLower) ||
                (item.description || "").toLowerCase().includes(searchLower);

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
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Name"
                        column={column}
                        data-testid="name-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`name-${row.original.id}`}
                    >
                        {row.original.name}
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
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Job Details"
                        column={column}
                        data-testid="job-detail-header"
                    />
                ),
                cell: ({ row }) => (
                    <div data-testid={`job-detail-${row.original.id}`}>
                        <p
                            className="text-[14px]/[22px] text-[#4b4b4b]"
                        >
                            {row.original.job_title}
                        </p>
                        <p
                            className="text-[11px]/[14px] text-[#8f8f8f]"
                        >
                            {row.original.job_location}
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
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="State"
                        column={column}
                        data-testid="state-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`stage-${row.original.id}`}
                    >
                        {row.original.state.charAt(0).toUpperCase() + row.original.state.slice(1)}
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
                                {moment(row.original.date).format('DD MMM, YYYY')}
                            </p>
                            <p
                                className="text-[11px]/[14px] text-[#8f8f8f]"
                            >
                                {moment(row.original.date).format('HH:MM A')}
                            </p>
                        </div>
                    ),
                    enableSorting: true,
                    size: 90,
                    meta: {
                        headerClassName: '',
                    },
                }]
                : []),
            {
                accessorKey: 'mode',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Mode"
                        column={column}
                        data-testid="mode-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`mode-${row.original.id}`}
                    >
                        {row.original.mode.charAt(0).toUpperCase() + row.original.mode.slice(1)}
                    </span>
                ),
                enableSorting: true,
                size: 90,
                meta: {
                    headerClassName: '',
                },
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionsCell row={row} />,
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
        setSelectedApplication(null);
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
     * ActionsCell Component
     * 
     * Renders action dropdown menu for a job posting row
     * @param {Object} props - Component props
     * @param {Row<IData>} props.row - Table row data
     * @returns {JSX.Element} Actions dropdown menu
     */
    function ActionsCell({ row }: { row: Row<any> }): JSX.Element {

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
                        data-testid={`view-applicants-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); setRescheduleOpen(true); }}

                    >
                        Reschedule
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`duplicate-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); setCancelOpen(true); }}
                    >
                        Cancel Interview
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`duplicate-action-${row.original.id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        Mark as No-show
                    </div>
                </DropdownMenuContent>
            </DropdownMenu >
        );
    }
    return <div>
        <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  mt-[20px] w-full overflow-x-auto'>
            <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'upcoming' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('upcoming')}>
                <p className='whitespace-nowrap'>Upcoming</p>
                <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]'>12</span>
            </div>
            <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'interviews' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('interviews')}>
                <p className='whitespace-nowrap'>Pending</p>
                <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]'>12</span>
            </div>
            <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'job-summary' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('job-summary')}>
                <p className='whitespace-nowrap'>Past</p>
            </div>
        </div>
        <div className='w-full mt-[22px]'>
            <DataGrid
                className='w-full'
                table={table}
                recordCount={filteredData?.length || 0}
                onRowClick={(row) => setSelectedApplication(row)}
                data-testid="job-postings-grid"
            >
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <Search
                            className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                            data-testid="search-icon"
                        />
                        <Input
                            placeholder="Search Job"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="ps-9 w-[243px] h-[42px]"
                            data-testid="search-input"
                        />
                        {searchQuery.length > 0 && (
                            <Button
                                mode="icon"
                                variant="ghost"
                                className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                                onClick={() => setSearchQuery('')}
                                data-testid="clear-search-button"
                            >
                                <X />
                            </Button>
                        )}
                    </div>
                    <div className='flex gap-[16px]'>
                        <Button
                            variant="outline"
                            onClick={() => setShowFilter(!showFliter)}
                            className='text-[#053834] px-[12px] py-[6px] flex items-center gap-[6px] font-semibold'
                            data-testid="filter-button"
                        >
                            <ListFilter className='size-[20px]' />
                            Filter
                        </Button>
                        <Button
                            variant="outline"
                            className='text-[#053834] px-[12px] py-[6px] flex items-center gap-[6px] font-semibold'
                            data-testid="filter-button"
                        >
                            <Download className='size-[20px]' />
                            Export
                        </Button>
                    </div>
                </div>
                {showFliter && <FilterTool selectedMode={selectedMode} selectedStatuses={selectedStatuses} setSelectedMode={setSelectedMode} setSelectedStatuses={setSelectedStatuses} />}
                <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                    <> {filteredData.length === 0 ?
                        <NoData data-testid="no-data-message" /> : <>
                            <div
                                className={`w-full overflow-x-auto h-[calc(100vh-405px)] ${showFliter ? 'h-[calc(100vh-455px)]' : 'h-[calc(100vh-405px)]'}`}
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
    </div>;
}