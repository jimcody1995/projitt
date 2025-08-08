'use client';

import { JSX, useEffect, useMemo, useRef, useState } from 'react';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
    Row,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import {

    Download,
    EllipsisVertical,
    ListFilter,
    Search,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
    DataGridTable,
    DataGridTableRowSelect,
    DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { FilterTool } from './filter';
import { SelectedDialog } from './selectedDialog';
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu } from '@/components/ui/dropdown-menu';
import CheckDialog from './checkDialog';
import { NoData } from './noData';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import Detail from './detail';
import DialogContent, { Dialog, div, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Message from '../../../components/message';
export default function JobPostings() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'lastSession', desc: true },
    ]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [showFliter, setShowFilter] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<any>(null);
    const [progress, setProgress] = useState(0);
    const [applicantsData, setApplicantsData] = useState<any[]>([
        {
            id: '1',
            application_id: '#E0001',
            name: 'Alice Fernadez',
            ai_score: 85,
            date: '2023-06-01',
            status: 'interview',
        },
        {
            id: '2',
            application_id: '#E0002',
            name: 'Bob Johnson',
            ai_score: 72,
            date: '2024-06-02',
            status: 'new',
        },
        {
            id: '3',
            application_id: '#E0003',
            name: 'Charlie Davis',
            ai_score: 68,
            date: '2024-06-03',
            status: 'hired',
        },
        {
            id: '4',
            application_id: '#E0004',
            name: 'David Wilson',
            ai_score: 40,
            date: '2025-06-04',
            status: 'rejected',
        },
    ]);
    const [selectedAIScoring, setSelectedAIScoring] = useState<number[]>([]);
    const [selectedShortListed, setSelectedShortListed] = useState<string>("");
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [isMessage, setIsMessage] = useState(false);
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

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleExport = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 100);
    }
    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: 'select',
                header: () => <DataGridTableRowSelectAll />,
                cell: ({ row }) => <DataGridTableRowSelect row={row} />,
                enableSorting: false,
                enableHiding: false,
                enableResizing: false,
                size: 46,
                meta: {
                    cellClassName: '',
                },
            },
            {
                accessorKey: 'application-id',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Application ID"
                        column={column}
                        data-testid="application-id-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b] "
                        data-testid={`application-id-${row.original.id}`}
                    >
                        {row.original.application_id}
                    </span>
                ),
                enableSorting: true,
                size: 80,
                meta: {
                    headerClassName: '',
                },
            },
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
                size: 140,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'ai-score',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="AI Score"
                        column={column}
                        data-testid="ai-score-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className={`text-[14px] ${row.original.ai_score >= 80 ? 'text-[#0D978B]' : row.original.ai_score >= 80 ? 'text-[#FFC107]' : row.original.ai_score >= 50 ? 'text-[#BE5E00]' : 'text-[#C30606]'}`}
                        data-testid={`ai-score-${row.original.id}`}
                    >
                        {row.original.ai_score}%
                    </span>
                ),
                enableSorting: true,
                size: 90,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'date',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Application Date"
                        column={column}
                        data-testid="applicants-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`applicants-${row.original.id}`}
                    >
                        {moment(row.original.date).format('DD MMM, YYYY')}
                    </span>
                ),
                enableSorting: true,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'status',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Job Status"
                        column={column}
                        data-testid="status-header"
                    />
                ),
                cell: ({ row }) => {
                    let badgeClass = "bg-muted text-foreground";
                    if (row.original.status === "interview") badgeClass = "bg-[#ffdfc0] text-[#BE5E00]";
                    else if (row.original.status === "new") badgeClass = "bg-[#d6eeec] text-[#0D978B]";
                    else if (row.original.status === "hired") badgeClass = "bg-[#0d978b] text-white";
                    else if (row.original.status === "rejected") badgeClass = "bg-[#C3060626] text-[#C30606]";
                    return (
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
                            data-testid={`status-badge-${row.original.id}`}
                        >
                            {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
                        </span>
                    );
                },
                enableSorting: true,
                size: 140,
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
        ],
        [],
    );

    useEffect(() => {
        setSelectedRows(Object.keys(rowSelection));
    }, [rowSelection]);



    const handleOpenChange = (open: boolean) => {
        console.log("Asdfasdf");

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
                        onClick={() => setSelectedApplication(row.original.id)}
                    >
                        View Applicants
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`duplicate-action-${row.original.id}`}
                    >
                        Duplicate
                    </div>

                    <CheckDialog
                        action="delete"
                        trigger={
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                data-testid={`delete-action-${row.original.id}`}
                            >
                                Delete
                            </div>
                        }
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }


    return (
        <div className='w-full mt-[22px]'>
            <DataGrid
                className='w-full'
                table={table}
                recordCount={filteredData?.length || 0}
                data-testid="job-postings-grid"
            >
                <div className="flex items-center justify-between sm:flex-row flex-col gap-[20px]">
                    <div className="relative">
                        <Search
                            className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                            data-testid="search-icon"
                        />
                        <Input
                            placeholder="Search Job"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="ps-9 sm:w-[243px] w-full h-[42px]"
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
                            onClick={() => handleExport()}
                        >
                            <Download className='size-[20px]' />
                            Export
                        </Button>


                    </div>
                </div>
                {showFliter && <FilterTool selectedAIScoring={selectedAIScoring} selectedShortListed={selectedShortListed} selectedStatuses={selectedStatuses} setSelectedAIScoring={setSelectedAIScoring} setSelectedShortListed={setSelectedShortListed} setSelectedStatuses={setSelectedStatuses} />}
                <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                    <> {filteredData.length === 0 ?
                        <NoData data-testid="no-data-message" /> : <>
                            {selectedRows.length > 0 &&
                                <SelectedDialog
                                    selectedRows={selectedRows}
                                    totalCount={filteredData?.length}
                                    allData={filteredData}
                                    setSelectedRows={setSelectedRows}
                                    setRowSelection={setRowSelection}
                                    setIsMessage={setIsMessage}
                                    data-testid="selected-dialog"
                                />
                            }
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
            <Detail
                open={selectedApplication !== null}
                onOpenChange={handleOpenChange}
            />
            <Dialog open={progress > 0 && progress < 100}>
                <DialogContent className='max-w-[313px]' close={false}>
                    <DialogTitle />
                    <div className='flex flex-col items-center justify-center'>
                        <div className='w-[120px] h-[120px] mt-[28px]'>
                            <CircularProgressbar
                                value={progress}
                                text={`${progress}%`}
                                strokeWidth={12}
                                styles={buildStyles({
                                    textColor: "#159A94",
                                    pathColor: "#159A94",
                                    trailColor: "#e6f3f2",
                                    strokeLinecap: "round",
                                })}
                            />
                        </div>
                        <p className='text-[16px]/[20px] mt-[20px] font-medium text-[#353535]'>[Data Type] Export in Progress</p>
                        <Button variant="outline" className='mt-[20px] w-[90px] h-[32px]' onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setProgress(0); }}>Cancel</Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Message
                open={isMessage}
                onOpenChange={setIsMessage}
            />
        </div>

    );
};