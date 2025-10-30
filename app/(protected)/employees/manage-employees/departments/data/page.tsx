'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
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
    ArrowLeft,
    EllipsisVertical,
    Search,
    X,
    Edit,
    Trash2,
    MapPin,
    ChevronDown,
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
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu } from '@/components/ui/dropdown-menu';
import { NoData } from '../../../../recruitment/applications/components/noData';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface EmployeeData {
    id: number;
    name: string;
    department: string;
    position: string;
    location: string;
    employmentType: 'Full Time' | 'Part Time' | 'Freelance' | 'Intern';
    avatar?: string;
    initials?: string;
}

export default function DepartmentsDataPage() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [loading] = useState(false);

    // Sample employee data
    const [employeesData] = useState<EmployeeData[]>([
        {
            id: 1,
            name: 'Alice Fernandez',
            department: 'Department Head',
            position: 'Senior Data Analyst',
            location: 'USA',
            employmentType: 'Full Time',
            initials: 'AF'
        },
        {
            id: 2,
            name: 'Kathryn Murphy',
            department: 'Data',
            position: 'Senior Data Analyst',
            location: 'USA',
            employmentType: 'Part Time',
            avatar: '/images/avatars/kathryn.jpg'
        },
        {
            id: 3,
            name: 'Jerome Bell',
            department: 'Data',
            position: 'Senior Data Analyst',
            location: 'USA',
            employmentType: 'Freelance',
            avatar: '/images/avatars/jerome.jpg'
        },
        {
            id: 4,
            name: 'Brooklyn Simmons',
            department: 'Data',
            position: 'Senior Data Analyst',
            location: 'USA',
            employmentType: 'Intern',
            avatar: '/images/avatars/brooklyn.jpg'
        }
    ]);

    const filteredData = useMemo<EmployeeData[]>(() => {
        return employeesData.filter((item) => {
            const searchLower = (searchQuery || "").toLowerCase();
            const matchesSearch =
                !searchQuery ||
                (item?.name || "").toLowerCase().includes(searchLower) ||
                item?.id.toString().includes(searchLower) ||
                (item?.position || "").toLowerCase().includes(searchLower);

            return matchesSearch;
        });
    }, [searchQuery, employeesData]);

    const sortedData = useMemo<EmployeeData[]>(() => {
        if (sorting.length === 0) return filteredData;

        const { id, desc } = sorting[0];

        return [...filteredData].sort((a, b) => {
            let aValue: string | number = a?.[id as keyof typeof a] ?? '';
            let bValue: string | number = b?.[id as keyof typeof b] ?? '';

            if (id === "name") {
                aValue = a?.name ?? "";
                bValue = b?.name ?? "";
            }

            aValue = String(aValue ?? "");
            bValue = String(bValue ?? "");

            if (!aValue && !bValue) return 0;
            if (!aValue) return desc ? -1 : 1;
            if (!bValue) return desc ? 1 : -1;

            try {
                return desc
                    ? bValue.localeCompare(aValue)
                    : aValue.localeCompare(bValue);
            } catch {
                return desc
                    ? bValue > aValue ? 1 : -1
                    : aValue > bValue ? 1 : -1;
            }
        });
    }, [sorting, filteredData]);

    const columns = useMemo<ColumnDef<EmployeeData>[]>(
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
                accessorKey: 'name',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Employee Name"
                        column={column}
                        data-testid="employee-name-header"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={row.original.avatar} alt={row.original.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-semibold">
                                {row.original.initials || row.original.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span
                                className="text-[14px] font-medium text-[#1a1a1a]"
                                data-testid={`employee-name-${row.original.id}`}
                            >
                                {row.original.name}
                            </span>
                            <span
                                className="text-[12px] text-[#0d978b]"
                                data-testid={`employee-department-${row.original.id}`}
                            >
                                {row.original.department}
                            </span>
                        </div>
                    </div>
                ),
                enableSorting: false,
                size: 250,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'position',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Job Details"
                        column={column}
                        data-testid="job-details-header"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex flex-col">
                        <span
                            className="text-[14px] font-medium text-[#1a1a1a]"
                            data-testid={`employee-position-${row.original.id}`}
                        >
                            {row.original.position}
                        </span>
                        <span
                            className="text-[12px] text-[#6b7280] flex items-center gap-1"
                            data-testid={`employee-location-${row.original.id}`}
                        >
                            <MapPin className="h-3 w-3" />
                            {row.original.location}
                        </span>
                    </div>
                ),
                enableSorting: false,
                size: 200,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'employmentType',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Employment Type"
                        column={column}
                        data-testid="employment-type-header"
                    />
                ),
                cell: ({ row }) => {


                    return (
                        <p className="text-[14px] font-medium text-[#1a1a1a]" data-testid={`employment-type-${row.original.id}`}>
                            {row.original.employmentType}
                        </p>
                    );
                },
                enableSorting: false,
                size: 150,
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
        columns: columns as ColumnDef<EmployeeData, unknown>[],
        data: sortedData,
        pageCount: Math.ceil((sortedData?.length || 0) / pagination.pageSize),
        getRowId: (row: EmployeeData) => row.id.toString(),
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

    function ActionsCell({ row }: { row: Row<EmployeeData> }): JSX.Element {
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
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px] flex items-center gap-2"
                        data-testid={`edit-action-${row.original.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        View Profile
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]  flex items-center gap-2"
                        data-testid={`delete-action-${row.original.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        Assign Manager
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]  flex items-center gap-2"
                        data-testid={`delete-action-${row.original.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        Add to Team
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]  flex items-center gap-2"
                        data-testid={`delete-action-${row.original.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        Send Message
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    const getData = () => {
        // TODO: Implement data fetching logic
        console.log('Refreshing employee data...');
    };

    return (
        <div className=' relative h-full'>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sm:flex-row flex-col gap-[10px]">
                <div className="flex items-center gap-4 w-full justify-start">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        onClick={() => window.history.back()}
                        data-testid="back-button"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold text-[#1a1a1a]" data-testid="page-title">
                        Data
                    </h1>
                </div>
                <div className="flex items-center gap-2 sm:w-auto w-full">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="text-red-600 border-red-200 hover:bg-red-50 md:w-auto w-full"
                                data-testid="delete-dropdown-button"
                            >
                                Delete
                                <ChevronDown className="h-4 w-4 ml-1 text-gray-900" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <div className="p-2 text-sm text-gray-600">
                                Select employees to delete
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="bg-[#0d978b] hover:bg-[#0d978b]/90 text-white md:w-auto w-full"
                                data-testid="edit-dropdown-button"
                            >
                                Edit
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <div className="p-2 text-sm text-gray-600">
                                Select employees to edit
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                        data-testid="search-icon"
                    />
                    <Input
                        placeholder="Search by Name, ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-10 h-10"
                        data-testid="search-input"
                    />
                    {searchQuery.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setSearchQuery('')}
                            data-testid="clear-search-button"
                        >
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Data Grid */}
            <DataGrid
                className='w-full'
                table={table}
                recordCount={sortedData?.length || 0}
                data-testid="employees-grid"
            >
                {loading ? (
                    <LoadingSpinner content='Loading Employees...' />
                ) : (
                    <div className='w-full rounded-[12px] overflow-hidden relative'>
                        {sortedData.length === 0 ? (
                            <NoData data-testid="no-data-message" />
                        ) : (
                            <>

                                <div
                                    className="w-full overflow-x-auto h-[calc(100vh-300px)]"
                                    data-testid="list-view-container"
                                >
                                    <DataGridTable />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </DataGrid>
        </div>
    );
}