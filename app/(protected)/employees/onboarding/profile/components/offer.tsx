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

export default function Offer() {
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
        documents: "Mode of Identification",
        status: "Verified",
        updatedAt: new Date()
    },
    {
        id: 2,
        documents: "Passport Photo",
        status: "Pending Review",
        updatedAt: new Date()
    },
    {
        id: 3,
        documents: "Work Permit",
        status: "Missing",
        updatedAt: new Date()
    }]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'documents',
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
                            {row.original.documents}
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
                        {row.original.status === "Verified" ? <span className="px-[16px] py-[2px] rounded-[20px] bg-[#0d978b] text-white">Verified</span> : row.original.status === "Pending Review" ? <span className="px-[16px] py-[2px] rounded-[20px] bg-[#E9E9E9] text-[#4B4B4B]">Pending Review</span> : <span className="px-[16px] py-[2px] rounded-[20px] bg-white border border-[#4B4B4B] text-[#4B4B4B]">Missing</span>}
                    </div>
                ),
                enableSorting: true,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'updatedAt',
                header: ({ column }: { column: any }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Uploaded On"
                        column={column}
                        data-testid="uploaded-on-header"
                    />
                ),
                cell: ({ row }: { row: any }) => {
                    return (
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs `}
                            data-testid={`start-date-badge-${row.original.id}`}
                        >
                            {row.original.status !== "Missing" ? moment(row.original.updatedAt).format('MMM DD, YYYY') : "-"}
                        </span>
                    );
                },
                enableSorting: true,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },

            {
                id: 'externalLink',
                header: '',
                cell: ({ row }: { row: any }) => <ExternalLink className="size-[14px] text-[#353535]" />,
                enableSorting: false,
                size: 10,
                meta: {
                    headerClassName: '',
                },
            },
            {
                id: 'download',
                header: '',
                cell: ({ row }: { row: any }) => <Download className="size-[14px] text-[#353535]" />,
                enableSorting: false,
                size: 10,
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
                        <EllipsisVertical className="size-[14px] text-[#353535]" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    data-testid={`actions-menu-${row.original.id}`}
                >
                    {row.original.status == "Verified" && <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`reschedule-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); }} // TODO: change to profile page
                    >
                        Approve
                    </div>}
                    {row.original.status == "Verified" && <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`cancel-interview-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); }}
                    >
                        Request New
                    </div>}
                    {row.original.status == "Pending Review" && <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`cancel-interview-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); }}
                    >
                        Request
                    </div>}
                    {row.original.status == "Missing" && <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`no-show-action-${row.original.id}`}
                        onClick={e => { e.stopPropagation(); }}
                    >
                        Reject
                    </div>}

                </DropdownMenuContent>
            </DropdownMenu >
        );
    }
    return <div className="">

        <div className="flex flex-col gap-[12px]">
            <div className="pb-[18px] flex justify-between border-b border-[#e9e9e9]">
                <p className="text-[14px]/[20px] text-[#626262]">Offer Letter</p>
                <button className="flex gap-[4px] items-center text-[14px]/[20px] text-[#0D978B]">View Signed Document <MoveUpRight className="size-[15px]" /></button>
            </div>
            <div className="pb-[18px] flex justify-between border-b border-[#e9e9e9]">
                <p className="text-[14px]/[20px] text-[#626262]">Offer Letter</p>
                <button className="flex gap-[4px] items-center text-[14px]/[20px] text-[#0D978B]">View Signed Document <MoveUpRight className="size-[15px]" /></button>
            </div>
            <div className="pb-[18px] flex justify-between border-b border-[#e9e9e9]">
                <p className="text-[14px]/[20px] text-[#626262]">Offer Letter</p>
                <button className="flex gap-[4px] items-center text-[14px]/[20px] text-[#0D978B]">View Signed Document <MoveUpRight className="size-[15px]" /></button>
            </div>
        </div>
        <p className="mt-[85px] text-[15px]/[20px] text-[#787878]">Document Checklist</p>
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