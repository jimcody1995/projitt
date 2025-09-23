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
} from '@tanstack/react-table';
import { DataGridTable } from "@/components/ui/data-grid-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Download, Search, ListFilter, EllipsisVertical } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";
import { Input } from "@/components/ui/input";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import ReportDetail from "../components/reportDetail";

// Mock data based on the image description
const mockEmployees = [
    {
        id: 1,
        name: "Alice Fernadez",
        position: "Senior Data Analyst",
        department: "Data",
        status: "Ready",
        finalScore: 4.5,
        peerAvg: 4.5,
        manager: 4.5,
        self: 4.5,
        initials: "AF"
    },
    {
        id: 2,
        name: "Alice Fernadez",
        position: "Senior Data Analyst",
        department: "Data",
        status: "High Potential",
        finalScore: 4.5,
        peerAvg: 3.7,
        manager: 4.5,
        self: 4.5,
        initials: "AF"
    },
    {
        id: 3,
        name: "Alice Fernadez",
        position: "Senior Data Analyst",
        department: "Data",
        status: "Solid",
        finalScore: 4.5,
        peerAvg: 4.5,
        manager: 1.8,
        self: 4.5,
        initials: "AF"
    },
    {
        id: 4,
        name: "Alice Fernadez",
        position: "Senior Data Analyst",
        department: "Data",
        status: "Developing",
        finalScore: 4.5,
        peerAvg: 4.5,
        manager: 4.5,
        self: 3.7,
        initials: "AF"
    },
    {
        id: 5,
        name: "Alice Fernadez",
        position: "Senior Data Analyst",
        department: "Data",
        status: "Ready",
        finalScore: 4.5,
        peerAvg: 4.5,
        manager: 4.5,
        self: 4.5,
        initials: "AF"
    },
    {
        id: 6,
        name: "Alice Fernadez",
        position: "Senior Data Analyst",
        department: "Data",
        status: "High Potential",
        finalScore: 4.5,
        peerAvg: 4.5,
        manager: 4.5,
        self: 4.5,
        initials: "AF"
    }
];

export default function Reports() {
    const router = useRouter();
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef<{ all: HTMLDivElement | null, top: HTMLDivElement | null, needs: HTMLDivElement | null }>({ all: null, top: null, needs: null });
    const [activeTab, setActiveTab] = useState('top');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 25,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [isReportDetailOpen, setIsReportDetailOpen] = useState(false);

    // Filter data based on active tab
    const filteredData = useMemo(() => {
        let filtered = mockEmployees;

        if (activeTab === 'top') {
            filtered = mockEmployees.filter(emp => emp.finalScore >= 4.5);
        } else if (activeTab === 'needs') {
            filtered = mockEmployees.filter(emp => emp.finalScore < 3.0);
        }

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(emp =>
                emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.department.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }, [activeTab, searchQuery]);

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case 'Ready':
                return {
                    backgroundColor: '#d6eeec',
                    textColor: '#0d978b'
                };
            case 'High Potential':
                return {
                    backgroundColor: '#fff3cd',
                    textColor: '#856404'
                };
            case 'Solid':
                return {
                    backgroundColor: '#e2e3f1',
                    textColor: '#6f42c1'
                };
            case 'Developing':
                return {
                    backgroundColor: '#f8f9fa',
                    textColor: '#6c757d'
                };
            default:
                return {
                    backgroundColor: '#f8f9fa',
                    textColor: '#6c757d'
                };
        }
    };

    const getScoreBadgeStyle = (score: number) => {
        if (score >= 4.0) {
            return {
                backgroundColor: '#C0FFE5',
                borderColor: '#00683D',
                textColor: '#00683D'
            };
        } else if (score >= 3.0) {
            return {
                backgroundColor: '#FFDFC0',
                borderColor: '#934900',
                textColor: '#934900'
            };
        } else {
            return {
                backgroundColor: '#C306064D',
                borderColor: '#C30606',
                textColor: '#C30606'
            };
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const style = getStatusBadgeStyle(status);
        return (
            <div
                className="inline-flex items-center justify-center px-[12px] py-[4px] rounded-[6px] text-[14px] font-medium"
                style={{
                    backgroundColor: style.backgroundColor,
                    color: style.textColor
                }}
            >
                {status}
            </div>
        );
    };

    const ScoreBadge = ({ score }: { score: number }) => {
        const style = getScoreBadgeStyle(score);
        return (
            <div
                className="inline-flex items-center justify-center px-[12px] py-[4px] rounded-[6px] text-[14px] font-medium border"
                style={{
                    backgroundColor: style.backgroundColor,
                    borderColor: style.borderColor,
                    color: style.textColor
                }}
            >
                {score}
            </div>
        );
    };

    const ScoreCell = ({ score }: { score: number }) => {
        const isLowScore = score < 3.0;
        return (
            <span className={`text-[14px] ${isLowScore ? 'text-red-600' : 'text-[#353535]'}`}>
                {score}
            </span>
        );
    };

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'name',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Employee Name"
                        column={column}
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div className="flex items-center gap-[12px]">
                        <Avatar className="size-8">
                            <AvatarFallback className="bg-[#d6eeec] text-[#0d978b] text-[12px] font-medium">
                                {row.original.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-[14px] font-medium text-[#353535]">
                                {row.original.name}
                            </p>
                            <p className="text-[12px] text-[#8f8f8f]">
                                {row.original.position}
                            </p>
                        </div>
                    </div>
                ),
                enableSorting: true,
                size: 200,
            },
            {
                accessorKey: 'department',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Department"
                        column={column}
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <span className="text-[14px] text-[#353535]">
                        {row.original.department}
                    </span>
                ),
                enableSorting: true,
                size: 120,
            },
            {
                accessorKey: 'status',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Status"
                        column={column}
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <StatusBadge status={row.original.status} />
                ),
                enableSorting: true,
                size: 120,
            },
            {
                accessorKey: 'finalScore',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Final Score"
                        column={column}
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <ScoreBadge score={row.original.finalScore} />
                ),
                enableSorting: true,
                size: 120,
            },
            {
                accessorKey: 'peerAvg',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Peer Avg"
                        column={column}
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <ScoreCell score={row.original.peerAvg} />
                ),
                enableSorting: true,
                size: 100,
            },
            {
                accessorKey: 'manager',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Manager"
                        column={column}
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <ScoreCell score={row.original.manager} />
                ),
                enableSorting: true,
                size: 100,
            },
            {
                accessorKey: 'self',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Self"
                        column={column}
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <ScoreCell score={row.original.self} />
                ),
                enableSorting: true,
                size: 100,
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }: { row: any }) => <ActionsCell row={row} />,
                enableSorting: false,
                size: 40,
            },
        ],
        []
    );

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

    const handleViewReport = (employee: any) => {
        setSelectedEmployee(employee);
        setIsReportDetailOpen(true);
    };

    function ActionsCell({ row }: { row: Row<any> }) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="size-7"
                        mode="icon"
                        variant="ghost"
                        onClick={e => e.stopPropagation()}
                    >
                        <EllipsisVertical className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        onClick={() => handleViewReport(row.original)}
                    >
                        View Report
                    </div>
                    <div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                        Go to Profile
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex w-full justify-between items-center px-[8px] py-[6px]">
                <div className="flex items-center gap-[12px]">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="h-[40px] w-[40px]"
                    >
                        <ArrowLeft className="size-5" />
                    </Button>
                    <h1 className="text-[24px]/[30px] font-semibold text-[#353535]">
                        H1 2025 Mid-Year Review Report
                    </h1>
                </div>
                <div className="flex gap-[12px]">
                    <Button
                        variant="outline"
                        className="h-[40px] px-[16px] flex items-center gap-[8px]"
                    >
                        <Star className="size-4" />
                        Summarize
                    </Button>
                    <Button
                        variant="outline"
                        className="h-[40px] px-[16px] flex items-center gap-[8px]"
                    >
                        <Download className="size-4" />
                        Download Report
                    </Button>
                </div>
            </div>

            {/* Summary Metrics */}
            <div className="mt-[32px] grid grid-cols-1 md:grid-cols-4 gap-[40px] bg-white rounded-[12px] p-[24px] lg:w-[900px] w-full">
                <div className="border-r border-[#e9e9e9]">
                    <div className="text-[16px]/[24px] text-[#0D978B]">120</div>
                    <div className="text-[13px] text-[#8f8f8f] mt-[4px]">Total Employees Reviewed</div>
                </div>
                <div className="border-r border-[#e9e9e9]">
                    <div className="text-[16px]/[24px] text-[#0D978B]">3.7/5</div>
                    <div className="text-[13px] text-[#8f8f8f] mt-[4px]">Avg Final Score</div>
                </div>
                <div className="border-r border-[#e9e9e9]">
                    <div className="text-[16px]/[24px] text-[#0D978B]">100</div>
                    <div className="text-[13px] text-[#8f8f8f] mt-[4px]">% Completion</div>
                </div>
                <div >
                    <div className="text-[16px]/[24px] text-[#0D978B]">35%</div>
                    <div className="text-[13px] text-[#8f8f8f] mt-[4px]">High Performers (4.5+)</div>
                </div>
            </div>

            {/* Tabs */}
            <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px] mt-[20px] w-full overflow-x-auto relative'>
                {/* Sliding underline */}
                <div className="flex items-center gap-[12px] relative">
                    <div
                        className="absolute bottom-0 h-[2px] bg-[#0d978b] transition-all duration-300 ease-in-out"
                        style={{
                            left: `${indicatorStyle.left}px`,
                            width: `${indicatorStyle.width}px`
                        }}
                    />

                    <div
                        ref={(el) => { tabRefs.current.all = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'all' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveTab('all')}
                        data-testid="active-tab-button"
                    >
                        <p className='whitespace-nowrap'>All Reviews</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.top = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'top' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveTab('top')}
                        data-testid="completed-tab-button"
                    >
                        <p className='whitespace-nowrap'>Top performers</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.needs = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'needs' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveTab('needs')}
                        data-testid="draft-tab-button"
                    >
                        <p className='whitespace-nowrap'>Needs Improvement</p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="mt-[24px] flex items-center justify-between">
                <div className="relative">
                    <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                    <Input
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-9 w-[300px] h-[40px]"
                    />
                </div>
                <Button
                    variant="outline"
                    className="h-[40px] px-[16px] flex items-center gap-[8px]"
                >
                    <ListFilter className="size-4" />
                    Filter
                </Button>
            </div>

            {/* Data Table */}
            <div className="mt-[24px]">
                <DataGrid
                    className="w-full"
                    table={table}
                    recordCount={filteredData?.length || 0}
                    onRowClick={(row) => console.log('Row clicked:', row)}
                >
                    <div className="mt-[24px] w-full rounded-[12px] overflow-hidden relative">
                        {filteredData.length === 0 ? (
                            <div className="flex items-center justify-center h-[200px] text-[#8f8f8f]">
                                No employees found
                            </div>
                        ) : (
                            <>
                                <div className="w-full overflow-x-auto h-[calc(100vh-500px)]">
                                    <DataGridTable />
                                </div>
                                <DataGridPagination className="mt-[25px]" />
                            </>
                        )}
                    </div>
                </DataGrid>
            </div>

            {/* Report Detail Sheet */}
            <ReportDetail
                isOpen={isReportDetailOpen}
                onClose={() => setIsReportDetailOpen(false)}
                employee={selectedEmployee}
            />
        </div>
    );
}