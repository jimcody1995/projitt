'use client';

import { use, useEffect, useMemo, useState } from 'react';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    Row,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import {
    ArrowDown,
    ArrowRight,
    Ban,
    BriefcaseBusiness,
    ChevronDown,
    Clock,
    Dot,
    EllipsisVertical,
    Filter,
    Info,
    LayoutGrid,
    LayoutList,
    ListFilter,
    Locate,
    MapPin,
    PenTool,
    PieChart,
    Plus,
    Search,
    Share2,
    ShoppingBag,
    SquarePen,
    Star,
    StopCircle,
    Trash,
    Trash2,
    Upload,
    Users,
    X,
} from 'lucide-react';
import { toast } from 'sonner';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Button } from '@/components/ui/button';

import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
    DataGridTable,
    DataGridTableRowSelect,
    DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { FilterTool } from './components/filter';
import { SelectedDialog } from './components/selectedDialog';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenu } from '@/components/ui/dropdown-menu';
import CheckDialog from './components/checkDialog';

interface IData {
    id: string;
    title: string;
    department: string;
    location: string;
    applicants: number;
    status: string;
    due: string;
}

const jobData: IData[] = [
    { id: '1', title: 'Senior Data Analyst', department: 'Data', location: 'United States', applicants: 25, status: 'Open', due: '5 days' },
    { id: '2', title: 'UX Designer', department: 'Design', location: 'United States', applicants: 38, status: 'Closed', due: '5 days' },
    { id: '3', title: 'Nursing Assistant', department: 'Operations', location: 'United States', applicants: 44, status: 'Draft', due: '5 days' },
    { id: '4', title: 'Web Designer', department: 'HSEQ', location: 'United States', applicants: 41, status: 'Closed', due: '5 days' },
    { id: '5', title: 'Account Executive', department: 'IT', location: 'United States', applicants: 39, status: 'Open', due: '5 days' },
    { id: '6', title: 'Account Executive', department: 'Human Resources', location: 'United States', applicants: 42, status: 'Draft', due: '5 days' },
    { id: '7', title: 'President of Sales', department: 'Manning', location: 'United States', applicants: 35, status: 'Open', due: '5 days' },
    { id: '8', title: 'Project Manager', department: 'IT', location: 'United States', applicants: 38, status: 'Open', due: '5 days' },
    { id: '9', title: 'Web Designer', department: 'Engineering', location: 'United States', applicants: 34, status: 'Open', due: '5 days' },
    { id: '10', title: 'Dog Trainer', department: 'Maintenance', location: 'United States', applicants: 45, status: 'Open', due: '5 days' },
    { id: '11', title: 'Column Item', department: 'Maintenance', location: 'Column Item', applicants: 16, status: 'Open', due: '5 days' },
];


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
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [view, setView] = useState<'list' | 'grid'>('list');
    const [showFliter, setShowFilter] = useState(false);

    const filteredData = useMemo(() => {
        return jobData.filter((item) => {
            // Filter by status
            const matchesStatus =
                !selectedStatuses?.length ||
                selectedStatuses.includes(
                    item.status.replace('bg-', '').charAt(0).toUpperCase() +
                    item.status.replace('bg-', '').slice(1),
                );

            // Filter by search query (case-insensitive)
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                !searchQuery ||
                item.title.toLowerCase().includes(searchLower) ||
                item.department.toLowerCase().includes(searchLower) ||
                item.location.toLowerCase().includes(searchLower);

            return matchesStatus && matchesSearch;
        });
    }, [searchQuery, selectedStatuses]);

    const statusCounts = useMemo(() => {
        return jobData.reduce(
            (acc, item) => {
                acc[item.status] = (acc[item.status] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );
    }, []);


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
                accessorKey: 'title',
                header: ({ column }) => (
                    <DataGridColumnHeader className='text-[14px] font-medium' title="Job Title" column={column} />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#4b4b4b]">
                        {row.original.title}
                    </span>
                ),
                enableSorting: true,
                size: 220,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'department',
                header: ({ column }) => (
                    <DataGridColumnHeader className='text-[14px] font-medium' title="Department" column={column} />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#4b4b4b]">
                        {row.original.department}
                    </span>
                ),
                enableSorting: true,
                size: 160,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'location',
                header: ({ column }) => (
                    <DataGridColumnHeader className='text-[14px] font-medium' title="Location" column={column} />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#4b4b4b]">
                        {row.original.location}
                    </span>
                ),
                enableSorting: true,
                size: 180,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'applicants',
                header: ({ column }) => (
                    <DataGridColumnHeader className='text-[14px] font-medium' title="Applicants" column={column} />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#4b4b4b]">
                        {row.original.applicants}
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
                    <DataGridColumnHeader className='text-[14px] font-medium' title="Job Status" column={column} />
                ),
                cell: ({ row }) => {
                    let badgeClass = "bg-muted text-foreground";
                    if (row.original.status === "Open") badgeClass = "bg-[#d6eeec] text-[#0D978B]";
                    else if (row.original.status === "Closed") badgeClass = "bg-[#0D978B] text-white";
                    else if (row.original.status === "Draft") badgeClass = "bg-[#e9e9e9] text-[#353535]";
                    return (
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
                        >
                            {row.original.status}
                        </span>
                    );
                },
                enableSorting: true,
                size: 100,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'due',
                header: ({ column }) => (
                    <DataGridColumnHeader className='text-[14px] font-medium' title="Due in" column={column} />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#4b4b4b]">
                        {row.original.due}
                    </span>
                ),
                enableSorting: true,
                size: 100,
                meta: {
                    headerClassName: '',
                },
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => <ActionsCell row={row} />,
                enableSorting: false,
                size: 60,
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
        columns: columns as ColumnDef<IData, any>[],
        data: jobData,
        pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
        getRowId: (row: IData) => row.id,
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

    function ActionsCell({ row }: { row: Row<IData> }) {
        const { copyToClipboard } = useCopyToClipboard();
        const handleCopyId = () => {
            copyToClipboard(String(row.original.id));
            const message = `Session ID successfully copied: ${row.original.id}`;
            toast.custom(
                (t) => (
                    <Alert
                        variant="mono"
                        icon="success"
                        close={false}
                        onClose={() => toast.dismiss(t)}
                    >
                        <AlertIcon>
                            <RiCheckboxCircleFill />
                        </AlertIcon>
                        <AlertTitle>{message}</AlertTitle>
                    </Alert>
                ),
                {
                    position: 'top-center',
                },
            );
        };

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="size-7" mode="icon" variant="ghost">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">

                    {row.original.status === "Draft" &&
                        <div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                            Edit
                        </div>
                    }
                    <div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                        View Applicants
                    </div>
                    <div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                        Duplicate
                    </div>
                    {row.original.status === "Open" && <CheckDialog action="close" trigger={<div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                        Close Job
                    </div>} />}
                    {row.original.status === "Open" && <CheckDialog action="unpublish" trigger={<div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                        Unpublish
                    </div>} />
                    }
                    <CheckDialog action="delete" trigger={<div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                        Delete
                    </div>} />
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    const Toolbar = ({ view, setView }: { view: 'list' | 'grid'; setView: (view: 'list' | 'grid') => void }) => {
        return (
            <div className='flex gap-[20px]'>
                <Button variant="outline" onClick={() => setShowFilter(!showFliter)} className='text-[#053834] px-[12px] py-[6px] flex items-center gap-[6px] font-semibold'>
                    <ListFilter className='size-[20px]' />
                    Filter
                </Button>
                <div className='flex h-[32px] bg-[#e9e9e9] rounded-[8px]'>
                    <div className={`flex items-center justify-center h-full w-[32px] cursor-pointer rounded-[8px] ${view === 'list' ? 'bg-[#0D978B]' : ''}`}>
                        <LayoutList className={`${view === 'list' ? 'text-white' : 'text-[#4b4b4b]'} size-[20px]`} onClick={() => setView('list')} />
                    </div>
                    <div className={`flex items-center justify-center h-full w-[32px] cursor-pointer rounded-[8px] ${view === 'grid' ? 'bg-[#0D978B]' : ''}`}>
                        <LayoutGrid className={`${view === 'grid' ? 'text-white' : 'text-[#4b4b4b]'} size-[20px]`} onClick={() => setView('grid')} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-[37px]'>
                <p className='text-[24px]/[30px] font-semibold'>Job Postings</p>
                <Button className='h-[42px]'>
                    <Plus />
                    Create New Job
                </Button>
            </div>
            <DataGrid
                className='w-full'
                table={table}
                recordCount={filteredData?.length || 0}
            >
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                        <Input
                            placeholder="Search Job"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="ps-9 w-40"
                        />
                        {searchQuery.length > 0 && (
                            <Button
                                mode="icon"
                                variant="ghost"
                                className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                                onClick={() => setSearchQuery('')}
                            >
                                <X />
                            </Button>
                        )}
                    </div>

                    <Toolbar view={view} setView={setView} />
                </div>
                {showFliter && <FilterTool />}
                <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                    {view === 'list' &&
                        <>
                            {selectedRows.length > 0 && <SelectedDialog selectedRows={selectedRows} totalCount={filteredData?.length} />}
                            <ScrollArea className='w-full'>
                                <DataGridTable />
                            </ScrollArea>
                            <DataGridPagination />
                        </>
                    }
                    {view === 'grid' &&
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]'>
                            {filteredData.map((item) => (
                                <div key={item.id} className={`w-full bg-white flex flex-col rounded-[4px] border-t-[3px] ${item.status === 'Open' ? 'border-[#0D978B]' : item.status === 'Closed' ? 'border-[#A5A5A5]' : 'border-white'} px-[20px] py-[24px]`}>
                                    <div className='w-full flex justify-between'>
                                        <span className='text-[12px]/[22px] px-[8px] text-[#4B4B4B] bg-[#f9f9f9] rounded-[29px] flex items-center gap-[4px]'>
                                            {/* Icon based on department */}
                                            {item.department === 'Data' && <PieChart className='text-[#00D47D] size-[16px]' />}
                                            {item.department === 'Design' && <PenTool className='text-[#FFB547] size-[16px] rotate-[270deg]' />}
                                            {item.department !== 'Data' && item.department !== 'Design' && <BriefcaseBusiness className='text-[#00D47D] size-[16px]' />}
                                            {item.department}
                                        </span>
                                        <div className='flex gap-[14px]'>
                                            <button className='cursor-pointer'>
                                                <Share2 className='size-[20px] text-[#8f8f8f]' />
                                            </button>
                                            <button className='cursor-pointer'>
                                                <EllipsisVertical className='size-[20px] text-[#8f8f8f]' />
                                            </button>
                                        </div>
                                    </div>
                                    <p className='mt-[10px] text-[18px]/[30px] font-semibold'>
                                        {item.title}
                                    </p>
                                    <div className='mt-[4px] flex gap-[8px]'>
                                        <span className='text-[12px]/[18px] px-[8px] flex items-center gap-[2px] text-[#787878]'>
                                            <BriefcaseBusiness className='size-[16px]' />
                                            Fulltime
                                        </span>
                                        <span className='text-[12px]/[18px] px-[8px] flex items-center gap-[2px] text-[#787878]'>
                                            <MapPin className='size-[16px]' />
                                            {item.location}
                                        </span>
                                    </div>
                                    {/* Show stats or draft message */}
                                    {item.status !== 'Draft' ? (
                                        <div className='mt-[14px] w-full flex rounded-[6px] border border-[#e9e9e9] pl-[14px] pr-[8px] py-[8px]'>
                                            <div className='w-1/2 border-r border-[#e9e9e9]'>
                                                <div className='flex gap-[4px]'>
                                                    <Users className='size-[20px] text-[#4b4b4b]' />
                                                    <span className='text-[16px]/[22px] font-semibold text-[#4b4b4b]'>{item.applicants}</span>
                                                </div>
                                                <p className='text-[12px]/[22px] text-[#8f8f8f]'>Candidates Applied</p>
                                            </div>
                                            <div className='w-1/2 pl-[14px]'>
                                                <div className='flex gap-[4px]'>
                                                    <Star className='size-[20px] text-[#4b4b4b]' />
                                                    <span className='text-[16px]/[22px] font-semibold text-[#4b4b4b]'>10</span>
                                                </div>
                                                <p className='text-[12px]/[22px] text-[#8f8f8f]'>Shortlisted</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='mt-[24px] mb-[24px] text-[#bdbdbd] text-[16px] flex-1 flex items-center justify-center'>
                                            Complete the job details to publish
                                        </div>
                                    )}
                                    {/* Due or draft */}
                                    {item.status !== 'Draft' && (
                                        <div className='mt-[8px] flex gap-[4px]'>
                                            <Clock className='size-[16px] text-[#8f8f8f]' />
                                            <span className='text-[12px]/[18px] text-[#8f8f8f]'>{item.due} remaining</span>
                                        </div>
                                    )}
                                    <div className='mt-[19px] flex justify-between w-full'>
                                        {item.status === 'Open' && (
                                            <Button className='h-[24px] rounded-full bg-[#0D978B] hover:bg-[#0D978B]'>
                                                <span className='text-[12px]/[22px] text-white'>Open</span>
                                                <ChevronDown className='size-[12px] text-white' />
                                            </Button>
                                        )}
                                        {item.status === 'Closed' && (
                                            <Button className='h-[24px] rounded-full bg-[#353535] text-white hover:bg-[#e9e9e9]'>
                                                <span className='text-[12px]/[22px]'>Closed</span>
                                                <ChevronDown className='size-[12px]' />
                                            </Button>
                                        )}
                                        {item.status === 'Draft' && (
                                            <Button className='h-[24px] rounded-full bg-[#e9e9e9] text-[#353535] hover:bg-[#e9e9e9]'>
                                                <span className='text-[12px]/[22px]'>Draft</span>
                                            </Button>
                                        )}
                                        {item.status !== 'Draft' ? (
                                            <button className='text-[#0d978b] flex items-center gap-[2px]'>
                                                <span className='text-[14px]/[22px] font-medium'>View Details</span>
                                                <ArrowRight className='size-[16px]' />
                                            </button>
                                        ) : (
                                            <button className='text-[#0d978b] flex items-center gap-[2px]'>
                                                <span className='text-[14px]/[22px] font-medium'>Continue Edit</span>
                                                <ArrowRight className='size-[16px]' />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </DataGrid >

        </div>
    );
};


