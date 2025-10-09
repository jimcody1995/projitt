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

export default function OnboardingTable({ searchQuery }: { searchQuery: string }) {
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
    const [data, setData] = useState<any[]>([{
        id: 1,
        name: 'John Doe',
        job: {
            title: 'Software Engineer',
            country: 'United States'
        },
        start_date: new Date(),
        completed: 35
    },
    {
        id: 2,
        name: 'John Doe',
        job: {
            title: 'Software Engineer',
            country: 'United States'
        },
        start_date: new Date(),
        completed: 35
    },
    {
        id: 3,
        name: 'John Doe',
        job: {
            title: 'Software Engineer',
            country: 'United States'
        },
        start_date: new Date(),
        completed: 35
    }]);
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
        console.log(nameFilter);

        return data.filter((item) => {
            // Name filter
            const matchesName =
                !nameFilter ||
                (item.name).toLowerCase().includes(nameFilter.toLowerCase());

            // Job Detail Country filter
            const searchLower = (searchQuery || "").toLowerCase();
            const matchesSearch =
                !searchQuery ||
                item.job.country.toLowerCase().includes(searchLower)

            return matchesSearch && matchesName;
        });
    }, [searchQuery, selectedCountries, nameFilter, data]);

    const sortedData = useMemo<any[]>(() => {
        if (sorting.length === 0) return filteredData;

        const { id, desc } = sorting[0];

        return [...filteredData].sort((a, b) => {
            let aValue: any = a?.[id];
            let bValue: any = b?.[id];

            // If sorting by name, compare first_name
            if (id === "name") {
                aValue = a?.first_name ?? "";
                bValue = b?.first_name ?? "";
            }
            if (id === "job-detail") {
                aValue = a?.job?.title ?? "";
                bValue = b?.job?.title ?? "";
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
                        className='text-[14px] text-[#8C8E8E] font-medium'
                        title="Name"
                        column={column}
                        data-testid="name-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div
                        className="text-[14px] text-[#4b4b4b] flex items-center gap-[8px]"
                        data-testid={`name-${row.original.id}`}
                    >
                        <p className="text-[14px]/[22px]">
                            {row.original.name}
                        </p>
                    </div>
                ),
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
                },
            },
            {
                accessorKey: 'job-detail',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] text-[#8C8E8E] font-medium'
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
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
                },
            },
            {
                accessorKey: 'Start Date',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] text-[#8C8E8E] font-medium'
                        title="Start Date"
                        column={column}
                        data-testid="department-header"
                    />
                ),
                cell: ({ row }: { row: any }) => {
                    return (
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs `}
                            data-testid={`start-date-badge-${row.original.id}`}
                        >
                            {moment(row.original.start_date).format('MMM DD, YYYY')}
                        </span>
                    );
                },
                enableSorting: false,
                size: 90,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
                },
            },
            {
                accessorKey: '%Completion',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] text-[#8C8E8E] font-medium'
                        title="% Completion"
                        column={column}
                        data-testid="employment-type-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div
                        className="flex items-center text-[14px] text-[#0d978b]"
                        data-testid={`employment-type-${row.original.id}`}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            className="mr-2"
                            data-testid={`completion-progress-${row.original.id}`}
                        >
                            <circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="none"
                                stroke="#EEF3F2"
                                strokeWidth="2"
                                rotate="180"
                                transform="rotate(180 10 10)"
                            />
                            <circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="none"
                                stroke="#0d978b"
                                strokeWidth="2"
                                strokeDasharray={2 * Math.PI * 9}
                                strokeDashoffset={
                                    2 * Math.PI * 9 * (1 - (row.original.completed || 0) / 100)
                                }
                                strokeLinecap="round"
                                rotate="180"
                                transform="rotate(180 10 10)"
                            />
                        </svg>
                        <span>{row.original.completed}%</span>
                    </div>
                ),
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: '',
                    cellClassName: 'border-b border-[#EEF3F2]',
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
                    cellClassName: 'border-b border-[#EEF3F2]',
                },
            },
        ].filter(Boolean),
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
        <div className='w-full mt-[22px]'>
            <DataGrid
                className='w-full'
                table={table}
                recordCount={filteredData?.length || 0}
                data-testid="data-data-grid"
            >
                <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                    <> {filteredData.length === 0 ?
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