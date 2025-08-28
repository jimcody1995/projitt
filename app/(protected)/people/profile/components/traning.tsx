'use client';

import { Download, ExternalLink, MoveUpRight } from "lucide-react";
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
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";

export default function Traning() {
    const router = useRouter();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'lastSession', desc: true },
    ]);
    const [data, setData] = useState<any[]>([{
        id: 1,
        module_name: "Company Culture 101",
        type: "Video",
        status: "completed",
    },
    {
        id: 2,
        module_name: "HR Policy Overview",
        type: "PDF",
        status: "not_started",
    },
    {
        id: 3,
        module_name: "Compliance & Safety",
        type: "Video",
        status: "not_started",
    }]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'module-name',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Documents"
                        column={column}
                        data-testid="documents-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div
                        className="text-[14px] text-[#4b4b4b] flex items-center gap-[8px]"
                        data-testid={`documents-${row.original.id}`}
                    >
                        <p className="text-[14px]/[22px]">
                            {row.original.module_name}
                        </p>
                    </div>
                ),
                enableSorting: true,
                size: 200,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'type',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Type"
                        column={column}
                        data-testid="type-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div data-testid={`type-${row.original.id}`} className="text-[14px]/[22px] text-[#4b4b4b]">
                        {row.original.type}
                    </div>
                ),
                enableSorting: true,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'status',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Status"
                        column={column}
                        data-testid="status-header"
                    />
                ),
                cell: ({ row }: { row: any }) => (
                    <div data-testid={`status-${row.original.id}`} className="text-[14px]/[22px] text-[#4b4b4b]">
                        {row.original.status === "completed" ? <span className="px-[16px] py-[2px] rounded-[20px] bg-[#D6EEEC] text-[#0d978b]">Completed</span> : <span className="px-[16px] py-[2px] rounded-[20px] bg-[#E9E9E9] text-[#4B4B4B]">Not Started</span>}
                    </div>
                ),
                enableSorting: true,
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
                size: 10,
                meta: {
                    headerClassName: '',
                },
            },
        ].filter(Boolean),
        []
    );

    const table = useReactTable({
        columns: columns as ColumnDef<any, any>[],
        data: data,
        pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
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
                        <EllipsisVertical className="size-[20px] text-[#353535]" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    data-testid={`actions-menu-${row.original.id}`}
                >
                </DropdownMenuContent>
            </DropdownMenu >
        );
    }
    return <div className="">

        <div className='w-full mt-[22px]'>
            <DataGrid
                className='w-full'
                table={table}
                recordCount={data?.length || 0}
                data-testid="data-data-grid"
            >
                <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                    <div
                        className={`w-full overflow-x-auto transition-all duration-300 ease-in-out`}
                        data-testid="list-view-container"
                    >
                        <DataGridTable />
                    </div>
                </div>
            </DataGrid>
        </div >
    </div >;
}