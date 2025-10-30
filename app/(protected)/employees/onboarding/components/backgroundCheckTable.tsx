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
import { NoData } from "../../manage-employees/components/no-data";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import CheckInterview from "../../manage-employees/components/check-interview";
import Suspend from "../../manage-employees/components/suspend";
import moment from "moment";
import { useRouter } from "next/navigation";
import BackgroundCheck from "../../manage-employees/components/background-check";
import { FilterTool } from "./filterOnboardingTable";

export default function BackgroundCheckTable({ searchQuery }: { searchQuery: string }) {
    const router = useRouter();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'lastSession', desc: true },
    ]);
    const [loading, setLoading] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
    const [data, setData] = useState<any[]>([
        {
            id: 1,
            name: 'Alice Fernadez',
            dateOfBirth: 'May 10, 2025',
            sensitivity: 'Medium',
            checks: ['Criminal', 'Employment', 'Education', 'Identity'],
            regions: 'Medium',
            status: 'Completed'
        },
        {
            id: 2,
            name: 'Savannah Nguyen',
            dateOfBirth: 'Dec 01, 2024',
            sensitivity: 'High',
            checks: ['Education', 'Identity'],
            regions: 'High',
            status: 'Ongoing'
        },
        {
            id: 3,
            name: 'Jacob Jones',
            dateOfBirth: 'Feb 28, 2025',
            sensitivity: 'Low',
            checks: ['Criminal', 'Employment'],
            regions: 'Low',
            status: 'Ongoing'
        },
        {
            id: 4,
            name: 'Courtney Henry',
            dateOfBirth: 'Jan 15, 2025',
            sensitivity: 'Medium',
            checks: ['Criminal'],
            regions: 'Medium',
            status: 'Completed'
        },
        {
            id: 5,
            name: 'Bessie Cooper',
            dateOfBirth: 'Apr 01, 2025',
            sensitivity: 'High',
            checks: ['Employment', 'Education', 'Identity'],
            regions: 'High',
            status: 'Completed'
        },
        {
            id: 6,
            name: 'Guy Hawkins',
            dateOfBirth: 'Mar 15, 2025',
            sensitivity: 'Medium',
            checks: ['Criminal', 'Employment', 'Education', 'Identity'],
            regions: 'Medium',
            status: 'Completed'
        }
    ]);
    const [showFilter, setShowFilter] = useState(false);
    const [suspendOpen, setSuspendOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [nameFilter, setNameFilter] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [backgroundCheckOpen, setBackgroundCheckOpen] = useState(false);


    const filteredData = useMemo<any[]>(() => {
        return data.filter((item) => {
            // Name filter
            const matchesName =
                !nameFilter ||
                (item.name).toLowerCase().includes(nameFilter.toLowerCase());

            // Search filter - search across multiple fields
            const searchLower = (searchQuery || "").toLowerCase();
            const matchesSearch =
                !searchQuery ||
                item.name.toLowerCase().includes(searchLower) ||
                item.dateOfBirth.toLowerCase().includes(searchLower) ||
                item.sensitivity.toLowerCase().includes(searchLower) ||
                item.checks.some((check: string) => check.toLowerCase().includes(searchLower)) ||
                item.regions.toLowerCase().includes(searchLower) ||
                item.status.toLowerCase().includes(searchLower);

            return matchesSearch && matchesName;
        });
    }, [searchQuery, selectedCountries, nameFilter, data]);

    const sortedData = useMemo<any[]>(() => {
        if (sorting.length === 0) return filteredData;

        const { id, desc } = sorting[0];

        return [...filteredData].sort((a, b) => {
            let aValue: any = a?.[id];
            let bValue: any = b?.[id];

            // Handle special sorting cases
            if (id === "name") {
                aValue = a?.name ?? "";
                bValue = b?.name ?? "";
            }
            if (id === "dateOfBirth") {
                aValue = a?.dateOfBirth ?? "";
                bValue = b?.dateOfBirth ?? "";
            }
            if (id === "sensitivity") {
                aValue = a?.sensitivity ?? "";
                bValue = b?.sensitivity ?? "";
            }
            if (id === "regions") {
                aValue = a?.regions ?? "";
                bValue = b?.regions ?? "";
            }
            if (id === "status") {
                aValue = a?.status ?? "";
                bValue = b?.status ?? "";
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
                accessorKey: 'name',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Name"
                        column={column}
                        data-testid="name-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div
                        className="text-[14px] text-[#4B4B4B]  font-medium"
                        data-testid={`name-${row.original.id}`}
                    >
                        {row.original.name}
                    </div>
                ),
                enableSorting: false,
                size: 160,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
                },
            },
            {
                accessorKey: 'dateOfBirth',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Date of Birth"
                        column={column}
                        data-testid="date-of-birth-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div
                        className="text-[14px] text-[#4B4B4B] "
                        data-testid={`date-of-birth-${row.original.id}`}
                    >
                        {row.original.dateOfBirth}
                    </div>
                ),
                enableSorting: false,
                size: 140,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
                },
            },
            {
                accessorKey: 'sensitivity',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Sensitivity"
                        column={column}
                        data-testid="sensitivity-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div
                        className="text-[14px] text-[#4B4B4B] "
                        data-testid={`sensitivity-${row.original.id}`}
                    >
                        {row.original.sensitivity}
                    </div>
                ),
                enableSorting: false,
                size: 100,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
                },
            },
            {
                accessorKey: 'checks',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Checks"
                        column={column}
                        data-testid="checks-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div
                        className="text-[14px] text-[#4B4B4B] "
                        data-testid={`checks-${row.original.id}`}
                    >
                        {row.original.checks.join(', ')}
                    </div>
                ),
                enableSorting: false,
                size: 220,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
                },
            },
            {
                accessorKey: 'regions',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Regions"
                        column={column}
                        data-testid="regions-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div
                        className="text-[14px] text-[#4B4B4B] "
                        data-testid={`regions-${row.original.id}`}
                    >
                        {row.original.regions}
                    </div>
                ),
                enableSorting: false,
                size: 100,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
                },
            },
            {
                accessorKey: 'status',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium text-[#8C8E8E]'
                        title="Status"
                        column={column}
                        data-testid="status-header"
                    />
                ),
                cell: ({ row }: { row: any }) => {
                    const status = row.original.status;
                    const isCompleted = status === 'Completed';
                    const isOngoing = status === 'Ongoing';

                    return (
                        <span
                            className={`inline-flex items-center text-[12px]/[18px] font-medium ${isCompleted
                                ? ' text-teal-700'
                                : isOngoing
                                    ? 'text-[#FFA750]'
                                    : 'text-[#0D978B]'
                                }`}
                            data-testid={`status-badge-${row.original.id}`}
                        >
                            {status}
                        </span>
                    );
                },
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
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
                        onClick={e => { e.stopPropagation(); router.push(`/employees/onboarding/profile`); }} // TODO: change to profile page
                    >
                        View
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
                        onClick={e => { e.stopPropagation(); }}
                    >
                        Send Reminder
                    </div>

                </DropdownMenuContent>
            </DropdownMenu >
        );
    }
    return (
        <div className='w-full'>
            <DataGrid
                className='w-full'
                table={table}
                recordCount={sortedData?.length || 0}
                data-testid="data-data-grid"
            >
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilter
                        ? 'max-h-[500px] opacity-100 mt-4'
                        : 'max-h-0 opacity-0 mt-0'
                        }`}
                >
                    <FilterTool
                        selectedCountries={selectedCountries}
                        nameFilter={nameFilter}
                        setSelectedCountries={setSelectedCountries}
                        setNameFilter={setNameFilter}
                    />
                </div>
                <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                    <> {sortedData.length === 0 ?
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
                        </>
                    }
                    </>
                </div>
            </DataGrid>
            <BackgroundCheck open={backgroundCheckOpen} onOpenChange={setBackgroundCheckOpen} setMessage={setMessage} />

        </div>
    );
}