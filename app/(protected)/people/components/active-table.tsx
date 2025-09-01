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
import { NoData } from '../../recruitment/applications/components/noData';
import DialogContent, { Dialog, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


// Create a wrapper component for the progress bar to avoid SSR issues
const ProgressCircle = dynamic(
    () => import('react-circular-progressbar').then(mod => {
        const { CircularProgressbar, buildStyles } = mod;
        return {
            default: ({ value, text }: { value: number; text: string }) => (
                <CircularProgressbar
                    value={value}
                    text={text}
                    strokeWidth={12}
                    styles={buildStyles({
                        textColor: "#159A94",
                        pathColor: "#159A94",
                        trailColor: "#e6f3f2",
                        strokeLinecap: "round",
                    })}
                />
            )
        };
    }),
    {
        ssr: false,
        loading: () => <div className="w-full h-full animate-pulse bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm text-gray-500">Loading...</span>
        </div>
    }
);

// Import the CSS for CircularProgressbar
import "react-circular-progressbar/dist/styles.css";

import Message from '../../recruitment/components/message';
import LoadingSpinner from '@/components/common/loading-spinner';
import dynamic from 'next/dynamic';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export default function ActiveTable() {
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
    const [showFilter, setShowFilter] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isAddToTeam, setIsAddToTeam] = useState(false);
    const [isAssignManager, setIsAssignManager] = useState(false);
    const [employeesData, setEmployeesData] = useState<any[]>([{
        id: 1,
        employee_id: '123456',
        name: 'John Doe',
        job: {
            title: 'Software Engineer',
            country: 'United States'
        },
        department: 'IT',
        employment_type: 'full-time',
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
        employment_type: 'part-time',
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
        employment_type: 'freelance',
        startDate: new Date(),
        completed: 35
    }
    ]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [isMessage, setIsMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const filteredData = useMemo<any[]>(() => {
        return employeesData.filter((item) => {
            const matchesType =
                !selectedTypes?.length ||
                selectedTypes.includes(item.employment_type || '');

            const searchLower = (searchQuery || "").toLowerCase();
            const matchesSearch =
                !searchQuery ||
                (item?.name || "").toLowerCase().includes(searchLower) ||
                (item?.employment_type || "").toLowerCase().includes(searchLower);

            return matchesSearch && matchesType;
        });
    }, [searchQuery, selectedTypes, employeesData]);

    const sortedData = useMemo<any[]>(() => {
        if (sorting.length === 0) return filteredData;

        const { id, desc } = sorting[0];

        return [...filteredData].sort((a, b) => {
            let aValue: any = a?.[id];
            let bValue: any = b?.[id];

            // If sorting by name, compare first_name
            if (id === "name") {
                aValue = a?.name ?? "";
                bValue = b?.name ?? "";
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
                    ? bValue.localeCompare(aValue) // Descending
                    : aValue.localeCompare(bValue); // Ascending
            } catch {
                // Fallback to simple string comparison if localeCompare fails
                return desc
                    ? bValue > aValue ? 1 : -1
                    : aValue > bValue ? 1 : -1;
            }
        });
    }, [sorting, filteredData]);


    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const employmentType = [{
        item: 'full-time',
        label: 'Full Time'
    }, {
        item: 'part-time',
        label: 'Part Time'
    }, {
        item: 'freelance',
        label: 'Freelance'
    }]

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
                accessorKey: 'employee_id',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Employee ID"
                        column={column}
                        data-testid="employee-id-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b] "
                        data-testid={`employee-id-${row.original.id}`}
                    >
                        {row.original.employee_id}
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
                size: 140,
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
                        {employmentType.find((item) => item.item === row.original.employment_type)?.label}
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



    const table = useReactTable({
        columns: columns as ColumnDef<any, any>[],
        data: sortedData,
        pageCount: Math.ceil((sortedData?.length || 0) / pagination.pageSize),
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
                        // onClick={() => setSelectedApplication(row.original.id)}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        View Profile
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`assign-manager-action-${row.original.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsAssignManager(true);
                        }}
                    >
                        Assign Manager
                    </div>

                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`add-to-team-action-${row.original.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsAddToTeam(true);
                        }}
                    >
                        Add to Team
                    </div>

                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`duplicate-action-${row.original.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        Send Message
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`duplicate-action-${row.original.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        Suspend
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`duplicate-action-${row.original.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        Terminate / Offboard
                    </div>
                    <CheckDialog
                        action="delete"
                        trigger={
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                data-testid={`delete-action-${row.original.id}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
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
                recordCount={sortedData?.length || 0}
                data-testid="job-postings-grid"
            >
                <div className="flex items-center justify-between sm:flex-row flex-col gap-[20px]">
                    <div className="relative">
                        <Search
                            className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                            data-testid="search-icon"
                        />
                        <Input
                            placeholder="Search Applicant"
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
                            onClick={() => setShowFilter(!showFilter)}
                            className='text-[#053834] px-[12px] py-[6px] flex items-center gap-[6px] font-semibold'
                            data-testid="filter-button"
                        >
                            <ListFilter className={`size-[20px] transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} />
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
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilter
                        ? 'max-h-[200px] opacity-100 mt-[17px]'
                        : 'max-h-0 opacity-0 mt-0'
                        }`}
                >
                    <FilterTool
                        selectedTypes={selectedTypes}
                        setSelectedTypes={setSelectedTypes}
                    />
                </div>
                {loading ? <LoadingSpinner content='Loading Employees' /> : <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                    <> {sortedData.length === 0 ?
                        <NoData data-testid="no-data-message" /> : <>
                            {selectedRows.length > 0 &&
                                <SelectedDialog
                                    selectedRows={selectedRows}
                                    totalCount={sortedData?.length}
                                    allData={sortedData}
                                    setSelectedRows={setSelectedRows}
                                    setRowSelection={setRowSelection}
                                    setIsMessage={setIsMessage}
                                    setIsAssignManager={setIsAssignManager}
                                    setIsAddToTeam={setIsAddToTeam}
                                    data-testid="selected-dialog"
                                />
                            }
                            <div
                                className={`w-full overflow-x-auto  ${showFilter ? 'h-[calc(100vh-480px)]' : 'h-[calc(100vh-430px)]'}`}
                                data-testid="list-view-container"
                            >
                                <DataGridTable />
                            </div>
                            <DataGridPagination data-testid="pagination-controls" className='mt-[25px]' />
                        </>
                    }

                    </>
                </div>}
            </DataGrid>

            <Dialog open={progress > 0 && progress < 100}>
                <DialogContent className='max-w-[313px]' close={false}>
                    <DialogTitle />
                    <div className='flex flex-col items-center justify-center'>
                        <div className='w-[120px] h-[120px] mt-[28px]'>
                            <ProgressCircle
                                value={progress}
                                text={`${progress}%`}
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
            <Dialog open={isAddToTeam} onOpenChange={setIsAddToTeam}>
                <DialogContent className='max-w-[505px]' close={false}>
                    <DialogTitle></DialogTitle>
                    <div>
                        <p className='text-[18px]/[22px] font-medium text-[#353535]'>Add to Team</p>
                        <Select>
                            <SelectTrigger className='mt-[16px] h-[48px]'>
                                <SelectValue placeholder="Select a team" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="team1">Team 1</SelectItem>
                                <SelectItem value="team2">Team 2</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className='flex gap-[20px] mt-[22px]'>
                            <Button variant="outline" className='w-full' onClick={() => setIsAddToTeam(false)}>Cancel</Button>
                            <Button className='w-full'>Add to Team</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isAssignManager} onOpenChange={setIsAssignManager}>
                <DialogContent className='max-w-[505px]' close={false}>
                    <DialogTitle></DialogTitle>
                    <div>
                        <p className='text-[18px]/[22px] font-medium text-[#353535]'>Assign Manager</p>
                        <p className='text-[14px]/[18px] text-[#787878] mt-[5px]'>Assigning a Manager links an employee to a direct supervisor responsible for their reviews and approvals, replacing any existing manager (if any). </p>
                        <Select>
                            <SelectTrigger className='mt-[16px] h-[48px]'>
                                <SelectValue placeholder="Select Manager" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="manager1">Manager 1</SelectItem>
                                <SelectItem value="manager2">Manager 2</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className='flex gap-[20px] mt-[22px]'>
                            <Button variant="outline" className='w-full' onClick={() => setIsAssignManager(false)}>Cancel</Button>
                            <Button className='w-full'>Assign</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    );
};