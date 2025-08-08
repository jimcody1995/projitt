'use client';

import React, { JSX, useState, useMemo } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    SortingState,
    Row,
    useReactTable,
} from '@tanstack/react-table';
import { DataGridTable } from "@/components/ui/data-grid-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";
import { NoData } from "../../assessments/components/noData";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import Detail from "../../applications/[id]/components/detail";

/**
 * @description
 * The `Pending` component displays a data grid of applicants whose applications are in a pending or rejected status.
 * It uses `@tanstack/react-table` for managing the table's state, sorting, and pagination.
 * The table shows key applicant details and provides an actions menu for each row, allowing for profile viewing, messaging, and rejection.
 * The component also integrates with a `Detail` component to show a more detailed view of a selected applicant.
 * All interactive elements and table components are equipped with unique `data-testid` and `id` attributes for reliable test automation.
 */
export default function Pending() {
    const [activeSection] = useState<'upcoming' | 'pending' | 'past'>('upcoming');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'lastSession', desc: true },
    ]);
    const [applicantsData, setApplicantsData] = useState<any[]>([
        {
            id: '1',
            name: 'John Doe',
            job_title: 'Software Engineer',
            job_location: 'USA',
            status: 'Pending',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
        {
            id: '2',
            name: 'John David',
            job_title: 'Software Engineer',
            job_location: 'USA',
            status: 'Rejected',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
    ]);
    const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

    // const getData = async () => {
    //     try {
    //         const response = await getJobPostings({
    //             country_ids: selectedLocations,
    //             department_ids: selectedDepartments,
    //             employment_type_ids: selectedTypes,
    //             // status: selectedStatuses,
    //             page: pagination.pageIndex,
    //             per_page: pagination.pageSize,
    //         });
    //         console.log(response.data);

    //         setApplicantsData(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getData();
    // }, [selectedLocations, selectedDepartments, selectedTypes, selectedStatuses]);

    /**
     * @description
     * A memoized definition of the table columns. This includes column headers,
     * cell rendering logic, and sorting configuration for each column.
     * The `status` column applies dynamic styling based on the applicant's status.
     */
    const columns = useMemo<ColumnDef<any>[]>(
        () => [
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
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`name-${row.original.id}`}
                    >
                        {row.original.name}
                    </span>
                ),
                enableSorting: true,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'job-detail',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Job Details"
                        column={column}
                        data-testid="job-detail-header"
                    />
                ),
                cell: ({ row }) => (
                    <div data-testid={`job-detail-${row.original.id}`}>
                        <p
                            className="text-[14px]/[22px] text-[#4b4b4b]"
                        >
                            {row.original.job_title}
                        </p>
                        <p
                            className="text-[11px]/[14px] text-[#8f8f8f]"
                        >
                            {row.original.job_location}
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
                accessorKey: 'status',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Status"
                        column={column}
                        data-testid="status-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className={`text-[14px]/[22px] px-[12px] py-[2px] rounded-[8px] ${row.original.status === 'Pending' ? 'bg-[#a5a5a5] text-white' : ' text-[#FA1E1E] bg-[#FA1E1E26]'}`}
                        data-testid={`status-${row.original.id}`}
                    >
                        {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
                    </span>
                ),
                enableSorting: true,
                size: 90,
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
        ].filter(Boolean),
        [activeSection]
    );

    /**
     * @description
     * A callback function to handle the `onOpenChange` event of the `Detail` dialog.
     * It closes the dialog by setting `selectedApplication` to `null`.
     * @param {boolean} open - The new state of the dialog.
     */
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedApplication(null);
        }
    };

    /**
     * @description
     * `useReactTable` hook instance for configuring the data table with columns, data, pagination, and sorting state.
     */
    const table = useReactTable({
        columns: columns as ColumnDef<any, any>[],
        data: applicantsData,
        pageCount: Math.ceil((applicantsData?.length || 0) / pagination.pageSize),
        getRowId: (row: any) => row.id,
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    /**
     * @description
     * A component that renders a dropdown menu for a specific row in the table, providing actions for that applicant.
     * @param {Object} props - The component props.
     * @param {Row<any>} props.row - The table row data.
     * @returns {JSX.Element} The actions dropdown menu JSX.
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
                    <DropdownMenuItem
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`view-profile-action-${row.original.id}`}
                        onClick={() => setSelectedApplication(row.original.id)}
                    >
                        View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`message-action-${row.original.id}`}
                    >
                        Message
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`reject-action-${row.original.id}`}
                    >
                        Reject
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div data-testid="pending-applicants-container">
            <div className='w-full mt-[22px]'>
                <DataGrid
                    className='w-full'
                    table={table}
                    recordCount={applicantsData?.length || 0}
                    data-testid="pending-applicants-grid"
                >
                    <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                        {applicantsData.length === 0 ? (
                            <NoData data-testid="no-data-message" />
                        ) : (
                            <>
                                <div
                                    className={`w-full overflow-x-auto h-[calc(100vh-300px)]`}
                                    data-testid="pending-list-view-container"
                                >
                                    <DataGridTable />
                                </div>
                                <DataGridPagination data-testid="pending-pagination-controls" />
                            </>
                        )}
                    </div>
                </DataGrid>

            </div>
            <Detail
                open={selectedApplication !== null}
                onOpenChange={handleOpenChange}
                data-testid="applicant-detail-dialog"
            />
        </div>
    );
}
