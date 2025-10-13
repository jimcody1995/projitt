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
import { PiUsersThreeLight } from 'react-icons/pi';
import { DataGridTable } from "@/components/ui/data-grid-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Search, ListFilter, EllipsisVertical, FileText, X, CheckCircle, Calendar, User, TrendingUp, Check, File } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";
import { Input } from "@/components/ui/input";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { LeaveFilterTool } from "../components/leaveFilterTool";
import { useRouter } from "next/navigation";

// Mock data for leave requests
const mockLeaveRequests = [
    {
        id: 1,
        employeeId: "EMP001",
        employeeName: "Alice Fernadez",
        position: "Senior Data Analyst",
        balance: "8 days",
        startDate: "Apr 21 2025",
        endDate: "Apr 23 2025",
        days: 2.00,
        type: "Vacation",
        request: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        status: "pending",
        initials: "AF"
    },
    {
        id: 2,
        employeeId: "EMP001",
        employeeName: "Alice Fernadez",
        position: "Senior Data Analyst",
        balance: "8 days",
        startDate: "Apr 21 2025",
        endDate: "Apr 22 2025",
        days: 1.00,
        type: "Sick",
        request: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        status: "pending",
        initials: "AF"
    },
    {
        id: 3,
        employeeId: "EMP001",
        employeeName: "Alice Fernadez",
        position: "Senior Data Analyst",
        balance: "8 days",
        startDate: "Apr 21 2025",
        endDate: "Apr 22 2025",
        days: 1.00,
        type: "Birthday",
        request: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        status: "pending",
        initials: "AF"
    },
    {
        id: 4,
        employeeId: "EMP001",
        employeeName: "Alice Fernadez",
        position: "Senior Data Analyst",
        balance: "8 days",
        startDate: "Apr 21 2025",
        endDate: "Apr 25 2025",
        days: 4.00,
        type: "Vacation",
        request: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        status: "pending",
        initials: "AF"
    },
    {
        id: 5,
        employeeId: "EMP002",
        employeeName: "John Doe",
        position: "Frontend Developer",
        balance: "12 days",
        startDate: "May 01 2025",
        endDate: "May 03 2025",
        days: 3.00,
        type: "Personal",
        request: "Family vacation request for early May.",
        status: "approved",
        initials: "JD"
    },
    {
        id: 6,
        employeeId: "EMP003",
        employeeName: "Jane Smith",
        position: "UX Designer",
        balance: "10 days",
        startDate: "Mar 15 2025",
        endDate: "Mar 16 2025",
        days: 2.00,
        type: "Sick",
        request: "Medical appointment and recovery time.",
        status: "approved",
        initials: "JS"
    },
    {
        id: 7,
        employeeId: "EMP004",
        employeeName: "Bob Johnson",
        position: "Backend Developer",
        balance: "6 days",
        startDate: "Jun 10 2025",
        endDate: "Jun 12 2025",
        days: 3.00,
        type: "Vacation",
        request: "Summer vacation with family.",
        status: "rejected",
        initials: "BJ"
    }
];

export default function LeaveManagement() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('pending');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [selectedLeaveTypes, setSelectedLeaveTypes] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

    // Filter data based on active tab and filters
    const filteredData = useMemo(() => {
        let filtered = mockLeaveRequests;

        // Apply tab filter first
        filtered = filtered.filter(req => req.status === activeTab);

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(req =>
                req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.type.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply name filter
        if (nameFilter) {
            filtered = filtered.filter(req =>
                req.employeeName.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        // Apply leave type filter
        if (selectedLeaveTypes.length > 0) {
            filtered = filtered.filter(req =>
                selectedLeaveTypes.includes(req.type.toLowerCase())
            );
        }

        // Apply status filter
        if (selectedStatuses.length > 0) {
            filtered = filtered.filter(req =>
                selectedStatuses.includes(req.status)
            );
        }

        // Apply employee filter
        if (selectedEmployees.length > 0) {
            filtered = filtered.filter(req => {
                const employeeId = req.employeeName.toLowerCase().replace(' ', '-');
                return selectedEmployees.includes(employeeId);
            });
        }

        // Apply date range filter
        if (dateRange.start || dateRange.end) {
            filtered = filtered.filter(req => {
                const startDate = new Date(req.startDate);
                const endDate = new Date(req.endDate);
                const filterStart = dateRange.start ? new Date(dateRange.start) : null;
                const filterEnd = dateRange.end ? new Date(dateRange.end) : null;

                if (filterStart && filterEnd) {
                    return startDate >= filterStart && endDate <= filterEnd;
                } else if (filterStart) {
                    return startDate >= filterStart;
                } else if (filterEnd) {
                    return endDate <= filterEnd;
                }
                return true;
            });
        }

        return filtered;
    }, [activeTab, searchQuery, nameFilter, selectedLeaveTypes, selectedStatuses, selectedEmployees, dateRange]);

    const getTypeBadgeStyle = (type: string) => {
        switch (type) {
            case 'Vacation':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Sick':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'Birthday':
                return 'bg-purple-50 text-purple-700 border-purple-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
                        aria-label="Select all"
                        className="bg-[#EEF3F2] checked:bg-[#0D978B] size-4"

                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                        aria-label="Select row"
                        className="size-4"
                    />
                ),
                enableSorting: false,
                size: 50,
                meta: {
                    headerClassName: 'rounded-tl-[12px] bg-[#EEF3F2]',
                    cellClassName: 'bg-white',
                },
            },
            {
                accessorKey: 'employeeId',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8f8f8f]'
                        title="ID"
                        column={column}
                    />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#353535] font-medium">
                        {row.original.employeeId}
                    </span>
                ),
                enableSorting: false,
                size: 100,
                meta: {
                    headerClassName: "bg-[#EEF3F2]",
                    cellClassName: 'bg-white',
                }
            },
            {
                accessorKey: 'employeeName',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8f8f8f]'
                        title="Employee Name"
                        column={column}
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-[12px]">
                        <Avatar className="size-7">
                            <AvatarFallback className="bg-[#d6eeec] text-[#0d978b] text-[12px] font-medium">
                                {row.original.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-[14px] font-medium text-[#353535]">
                                {row.original.employeeName}
                            </p>
                            <p className="text-[11px]/[14px] text-[#8f8f8f]">
                                {row.original.position}
                            </p>
                        </div>
                    </div>
                ),
                enableSorting: false,
                size: 180,
                meta: {
                    headerClassName: "bg-[#EEF3F2]",
                    cellClassName: 'bg-white',
                }
            },
            {
                accessorKey: 'balance',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8f8f8f]'
                        title="Balance"
                        column={column}
                    />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#353535]">
                        {row.original.balance}
                    </span>
                ),
                enableSorting: false,
                size: 100,
                meta: {
                    headerClassName: "bg-[#EEF3F2]",
                    cellClassName: 'bg-white',
                }
            },
            {
                accessorKey: 'startDate',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8f8f8f]'
                        title="Start Date"
                        column={column}
                    />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#353535]">
                        {row.original.startDate}
                    </span>
                ),
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: "bg-[#EEF3F2]",
                    cellClassName: 'bg-white',
                }
            },
            {
                accessorKey: 'endDate',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8f8f8f]'
                        title="End Date"
                        column={column}
                    />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#353535]">
                        {row.original.endDate}
                    </span>
                ),
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: "bg-[#EEF3F2]",
                    cellClassName: 'bg-white',
                }
            },
            {
                accessorKey: 'days',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8f8f8f]'
                        title="Days"
                        column={column}
                    />
                ),
                cell: ({ row }) => (
                    <span className="text-[14px] text-[#353535]">
                        {row.original.days}
                    </span>
                ),
                enableSorting: false,
                size: 80,
                meta: {
                    headerClassName: "bg-[#EEF3F2]",
                    cellClassName: 'bg-white',
                }
            },
            {
                accessorKey: 'type',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8f8f8f]'
                        title="Type"
                        column={column}
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className={`text-[14px] font-medium`}
                    >
                        {row.original.type}
                    </span>
                ),
                enableSorting: false,
                size: 100,
                meta: {
                    headerClassName: "bg-[#EEF3F2]",
                    cellClassName: 'bg-white',
                }
            },
            {
                accessorKey: 'request',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8f8f8f]'
                        title="Request"
                        column={column}
                    />
                ),
                cell: ({ row }) => (
                    <div className="max-w-[180px] lg:max-w-[250px]">
                        <p className="text-[12px] text-[#353535] truncate">
                            {row.original.request}
                        </p>
                    </div>
                ),
                enableSorting: false,
                size: 180,
                meta: {
                    headerClassName: "bg-[#EEF3F2]",
                    cellClassName: 'bg-white',
                }
            },
            {
                id: 'actions',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8f8f8f]'
                        title="Action"
                        column={column}
                    />
                ),
                cell: ({ row }) => <ActionsCell row={row} />,
                enableSorting: false,
                size: 180,
                meta: {
                    headerClassName: 'bg-[#EEF3F2] rounded-tr-[12px]',
                    cellClassName: 'bg-white',
                },
            },
        ],
        []
    );

    const table = useReactTable({
        columns: columns as ColumnDef<any, any>[],
        data: filteredData,
        getRowId: (row: any) => row.id,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    function ActionsCell({ row }: { row: Row<any> }) {
        if (activeTab === 'pending') {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        className="h-[32px] w-[32px] p-0 bg-white text-gray-900 border border-[#E9E9E9] hover:bg-[#F8F9FA] hover:text-[#353535] rounded-[6px]"
                        variant="outline"
                    >
                        <File className="size-4" />
                    </Button>
                    <Button
                        size="sm"
                        className="h-[32px] w-[32px] p-0 bg-white text-[#C30606] border border-[#E9E9E9] hover:bg-[#F8F9FA] hover:text-[#353535] rounded-[6px]"
                        variant="outline"
                    >
                        <X className="size-4" />
                    </Button>
                    <Button
                        size="sm"
                        className="h-[32px] px-[12px] text-[12px] bg-[#0d978b] text-white hover:bg-[#086159] font-medium rounded-[6px]"
                    >
                        <Check className="size-3" />
                        Approve
                    </Button>
                </div>
            );
        }

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="size-7"
                        size="icon"
                        variant="ghost"
                        onClick={e => e.stopPropagation()}
                    >
                        <EllipsisVertical className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                    <div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                        View Details
                    </div>
                    <div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                        Edit Request
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className="w-full h-full bg-[#F8F9FA] min-h-screen px-[9px] py-[12px]">
            {/* Header */}
            <div className="flex w-full justify-between items-center  flex-col sm:flex-row gap-4 sm:gap-0 mb-[25px]">
                <h1 className="text-[24px]/[30px] font-semibold text-[#353535]">
                    Leave Management
                </h1>
                <Button
                    variant="outline"
                    className="h-[42px] px-[16px] flex items-center gap-[8px] border-gray-200 text-[#053834] text-[14px]/[20px] hover:bg-white w-full sm:w-auto font-semibold"
                    onClick={() => router.push("./manage-leaves")}
                >
                    <Settings className="size-4 text-[#053834]" />
                    Manage Leaves
                </Button>
            </div>
            {/* Statistics Cards */}
            <div className="mb-[18px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] overflow-x-auto">
                    {/* Currently On Leave */}
                    <div className="bg-white rounded-[12px] p-[16px] border border-[#E9E9E9]  flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-[14px]/[22px] text-[#8F8F8F]">
                                    Currently On Leave
                                </div>
                                <div className="text-[22px]/[30px] font-semibold text-[#353535] mb-[2px]">
                                    12
                                </div>
                            </div>
                            <div className="w-[32px] h-[32px] bg-[#FFDFC0] rounded-[4px] flex items-center justify-center">
                                <PiUsersThreeLight className="size-5 text-gray-900" />
                            </div>
                        </div>
                    </div>
                    {/* Average Leave per Employee */}
                    <div className="bg-white rounded-[12px] p-[16px] border border-[#E9E9E9]  flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-[14px]/[22px] text-[#8F8F8F]">
                                    Avg Leave per employee
                                </div>
                                <div className="text-[22px]/[30px] font-semibold text-[#353535] mb-[2px]">
                                    2.5 days
                                </div>
                            </div>
                            <div className="w-[32px] h-[32px] bg-green-100 rounded-[4px] flex items-center justify-center">
                                <Calendar className="size-4 text-gray-900" />
                            </div>
                        </div>
                    </div>
                    {/* Most Utilized Leave */}
                    <div className="bg-white rounded-[12px] p-[16px] border border-[#E9E9E9]  flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-[14px]/[22px] text-[#8F8F8F]">
                                    Most Utilized Leave
                                </div>
                                <div className="text-[22px]/[30px] font-semibold text-[#353535] mb-[2px]">
                                    Sick Leave
                                </div>
                            </div>
                            <div className="w-[32px] h-[32px] bg-blue-100 rounded-[4px] flex items-center justify-center">
                                <TrendingUp className="size-4 text-gray-900" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leave Requests Section */}
            <div className="">
                <div>
                    {/* Section Header */}
                    <div className="py-[18px]">
                        <h2 className="text-[20px]/[30px] font-medium text-[#353535]">
                            Leave Requests
                        </h2>
                    </div>

                    {/* Tabs */}
                    <div className="overflow-x-auto">
                        <div className="flex gap-[24px] md:gap-[32px] border-b border-[#E9E9E9] min-w-max">
                            {[
                                { key: 'pending', label: 'Pending' },
                                { key: 'approved', label: 'Approved' },
                                { key: 'rejected', label: 'Rejected' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    className={`py-[12px] text-[14px] font-medium transition-colors duration-200 border-b-2 px-[36px] whitespace-nowrap ${activeTab === tab.key
                                        ? 'text-[#0d978b] border-[#0d978b]'
                                        : 'text-[#4B4B4B] border-transparent hover:text-[#353535]'
                                        }`}
                                    onClick={() => setActiveTab(tab.key)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className=" py-[16px] flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
                        <div className="relative w-full sm:w-auto">
                            <Search className="size-4 text-[#8f8f8f] absolute start-3 top-1/2 -translate-y-1/2" />
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="ps-9 w-full sm:w-[280px] h-[36px] border-[#E9E9E9] text-[14px] rounded-[8px] bg-gray-50"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className={`h-[36px] px-[16px] flex items-center gap-[8px] w-full sm:w-auto text-[14px] rounded-[8px] transition-all bg-gray-50 duration-200 ${showFilters
                                ? 'border-[#0d978b] text-[#0d978b] bg-[#F0FDFA] shadow-sm'
                                : (selectedLeaveTypes.length > 0 || selectedStatuses.length > 0 || selectedEmployees.length > 0 || nameFilter || dateRange.start || dateRange.end)
                                    ? 'border-[#0d978b] text-[#0d978b] bg-[#F0FDFA]'
                                    : 'border-[#E9E9E9] text-[#353535] hover:bg-[#F8F9FA]'
                                }`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <ListFilter className={`size-4 transition-transform duration-200 ${showFilters ? 'text-[#0d978b] rotate-180' : ''}`} />
                            Filter
                            {(selectedLeaveTypes.length > 0 || selectedStatuses.length > 0 || selectedEmployees.length > 0 || nameFilter || dateRange.start || dateRange.end) && (
                                <span className="ml-1 bg-[#0d978b] text-white text-[10px] rounded-full w-[16px] h-[16px] flex items-center justify-center">
                                    {selectedLeaveTypes.length + selectedStatuses.length + selectedEmployees.length + (nameFilter ? 1 : 0) + (dateRange.start || dateRange.end ? 1 : 0)}
                                </span>
                            )}
                        </Button>
                    </div>

                    {/* Filter Tools */}
                    {showFilters && (
                        <div className=" py-[16px] border-b border-[#E9E9E9] bg-[#FAFAFA]">
                            <LeaveFilterTool
                                selectedLeaveTypes={selectedLeaveTypes}
                                setSelectedLeaveTypes={setSelectedLeaveTypes}
                                selectedStatuses={selectedStatuses}
                                setSelectedStatuses={setSelectedStatuses}
                                selectedEmployees={selectedEmployees}
                                setSelectedEmployees={setSelectedEmployees}
                                nameFilter={nameFilter}
                                setNameFilter={setNameFilter}
                                dateRange={dateRange}
                                setDateRange={setDateRange}
                            />
                        </div>
                    )}

                    {/* Data Table */}
                    <div className="pb-[24px]">
                        <DataGrid
                            className="w-full"
                            table={table}
                            recordCount={filteredData?.length || 0}
                            onRowClick={(row) => console.log('Row clicked:', row)}
                            tableLayout={{
                                rowBorder: true,
                                headerBorder: true,


                            }
                            }
                        >
                            <div className="w-full overflow-x-auto">
                                {filteredData.length === 0 ? (
                                    <div className="flex items-center justify-center h-[200px] text-[#8f8f8f] text-[14px]">
                                        No leave requests found
                                    </div>
                                ) : (
                                    <>
                                        <div className="min-w-[900px] [&>table]:border [&>table]:border-gray-200 [&_tbody>tr:last-child>td:last-child]:!rounded-br-[12px] [&_tbody>tr:last-child>td:first-child]:!rounded-bl-[12px]"
                                        >
                                            <DataGridTable />
                                        </div>
                                    </>
                                )}
                            </div>
                        </DataGrid>
                    </div>
                </div>
            </div>
        </div>
    );
}
