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
import { ChevronDown, Download, EllipsisVertical, ListFilter, Search, X } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";
import { Input } from "@/components/ui/input";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { useRouter } from 'next/navigation';

// Mock data based on the image description
const mockCourses = [
    {
        id: 1,
        title: "Leadership 101",
        category: "Leadership",
        duration: "45min",
        assignedPaths: 12,
        assignedUsers: 212,
    },
    {
        id: 2,
        title: "Scrum Product Management",
        category: "Design",
        duration: "10min",
        assignedPaths: 5,
        assignedUsers: 71,
    },
    {
        id: 3,
        title: "Managing a Cross-Functional Team",
        category: "Team Management",
        duration: "15min",
        assignedPaths: 2,
        assignedUsers: 12,
    },
    {
        id: 4,
        title: "Microservices Architecture",
        category: "Leadership",
        duration: "30min",
        assignedPaths: 3,
        assignedUsers: 18,
    },
    {
        id: 5,
        title: "Microservices Architecture",
        category: "Product",
        duration: "30min",
        assignedPaths: 3,
        assignedUsers: 18,
    },
    {
        id: 6,
        title: "Microservices Architecture",
        category: "Design",
        duration: "30min",
        assignedPaths: 3,
        assignedUsers: 18,
    },
    {
        id: 7,
        title: "Microservices Architecture",
        category: "Leadership",
        duration: "30min",
        assignedPaths: 3,
        assignedUsers: 18,
    },
    {
        id: 8,
        title: "Microservices Architecture",
        category: "Team Management",
        duration: "30min",
        assignedPaths: 3,
        assignedUsers: 18,
    },
    {
        id: 9,
        title: "Microservices Architecture",
        category: "Design",
        duration: "30min",
        assignedPaths: 3,
        assignedUsers: 18,
    },
    {
        id: 10,
        title: "Microservices Architecture",
        category: "Product",
        duration: "30min",
        assignedPaths: 3,
        assignedUsers: 18,
    },
];

export default function Courses() {
    const router = useRouter();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 25,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'title', desc: false },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilter, setShowFilter] = useState(false);

    // Filter data based on search query
    const filteredData = useMemo<any[]>(() => {
        return mockCourses.filter((course) => {
            const searchLower = (searchQuery || "").toLowerCase();
            return !searchQuery || course.title.toLowerCase().includes(searchLower);
        });
    }, [searchQuery]);

    // Sort data
    const sortedData = useMemo<any[]>(() => {
        if (sorting.length === 0) return filteredData;

        const { id, desc } = sorting[0];

        return [...filteredData].sort((a, b) => {
            let aValue: any = a?.[id];
            let bValue: any = b?.[id];

            // Ensure values are strings and handle edge cases
            aValue = String(aValue ?? "");
            bValue = String(bValue ?? "");

            if (!aValue && !bValue) return 0;
            if (!aValue) return desc ? -1 : 1;
            if (!bValue) return desc ? 1 : -1;

            try {
                return desc
                    ? bValue.localeCompare(aValue, undefined, { sensitivity: "base" })
                    : aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
            } catch {
                return desc
                    ? bValue > aValue ? 1 : -1
                    : aValue > bValue ? 1 : -1;
            }
        });
    }, [sorting, filteredData]);

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'title',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Course Title"
                        column={column}
                        data-testid="course-title-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`course-title-${row.original.id}`}
                    >
                        {row.original.title}
                    </span>
                ),
                enableSorting: true,
                size: 200,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'category',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Category"
                        column={column}
                        data-testid="category-header"
                    />
                ),
                cell: ({ row }: { row: any }) => {
                    const getCategoryColor = (category: string) => {
                        switch (category) {
                            case 'Leadership':
                                return 'bg-[#D8D2FA] text-[#282A33]';
                            case 'Design':
                                return 'bg-[#C3F3CD] text-[#282A33]';
                            case 'Team Management':
                                return 'bg-[#F1C6C5] text-[#282A33]';
                            case 'Product':
                                return 'bg-[#F8CCF3] text-[#282A33]';
                            default:
                                return 'bg-muted text-foreground';
                        }
                    };

                    return (
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs  ${getCategoryColor(row.original.category)}`}
                            data-testid={`category-badge-${row.original.id}`}
                        >
                            {row.original.category}
                        </span>
                    );
                },
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'duration',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Duration"
                        column={column}
                        data-testid="duration-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`duration-${row.original.id}`}
                    >
                        {row.original.duration}
                    </span>
                ),
                enableSorting: false,
                size: 100,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'assignedPaths',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Assigned Paths"
                        column={column}
                        data-testid="assigned-paths-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`assigned-paths-${row.original.id}`}
                    >
                        {row.original.assignedPaths}
                    </span>
                ),
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'assignedUsers',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Assigned Users"
                        column={column}
                        data-testid="assigned-users-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`assigned-users-${row.original.id}`}
                    >
                        {row.original.assignedUsers}
                    </span>
                ),
                enableSorting: false,
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
        data: sortedData,
        pageCount: Math.ceil((sortedData?.length || 0) / pagination.pageSize),
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
                        data-testid={`edit-action-${row.original.id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        Edit Course
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`duplicate-action-${row.original.id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        Duplicate
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`delete-action-${row.original.id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        Delete
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className="w-full h-full">
            <div className="flex w-full justify-between items-center px-[8px] py-[6px]">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[12px]/[20px] text-[#A5A5A5]">
                        <span className="cursor-pointer" onClick={() => router.push('/talent-management/learning-paths')}>
                            Learning Paths
                        </span>
                        <span className="text-[#0d978b]"> / Courses</span>
                    </p>
                    <p className="text-[24px]/[30px] font-semibold text-[#353535]">Courses</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-[42px] flex gap-[6px]">Create New Course
                            <ChevronDown className='size-[18px]' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <div
                            className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                            onClick={() => router.push('/talent-management/learning-paths/courses/external-link')}
                        >
                            Exteral Link
                        </div>
                        <div
                            className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                            onClick={() => router.push('/talent-management/learning-paths/courses/upload-file')}
                        >
                            Upload File
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            <div className='w-full mt-[22px]'>
                <DataGrid
                    className='w-full'
                    table={table}
                    recordCount={sortedData?.length || 0}
                    onRowClick={(row) => console.log('Row clicked:', row)}
                    data-testid="courses-data-grid"
                >
                    <div className="flex items-center justify-between sm:flex-row flex-col gap-[10px]">
                        <div className="relative">
                            <Search
                                className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                                data-testid="search-icon"
                                id="search-icon"
                            />
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="ps-9 w-[243px] h-[42px] bg-transparent"
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
                                className='text-[#053834] px-[12px] py-[6px] flex items-center gap-[6px] font-semibold h-[42px]'
                                data-testid="filter-button"
                                id="filter-button"
                            >
                                <ListFilter
                                    className={`size-[20px] transition-transform duration-300 ease-in-out ${showFilter ? 'rotate-180' : 'rotate-0'
                                        }`}
                                />
                                Filter
                            </Button>
                        </div>
                    </div>
                    <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                        {filteredData.length === 0 ? (
                            <div className="flex items-center justify-center h-[200px] text-[#8f8f8f]">
                                No courses found
                            </div>
                        ) : (
                            <>
                                <div
                                    className="w-full overflow-x-auto h-[calc(100vh-375px)]"
                                    data-testid="list-view-container"
                                >
                                    <DataGridTable />
                                </div>
                                <DataGridPagination data-testid="pagination-controls" className="mt-[25px] boreder-t border-gray-900" />
                            </>
                        )}
                    </div>
                </DataGrid>
            </div>
        </div>
    );
}