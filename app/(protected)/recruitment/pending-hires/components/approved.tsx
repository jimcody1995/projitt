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
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";
import { NoData } from "../../assessments/components/noData";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import DetailLetter from "./detalilLetter";

/**
 * @description
 * Approved is a component that displays a data table of applicants who have been approved and are in the final stages of the hiring process.
 * The table shows applicant details like name, job title, location, and offer status.
 * It features dynamic actions based on the applicant's offer status: "Start Onboarding," "Generate Offer Letter," or "Reset Letter."
 * The component uses the `@tanstack/react-table` library for handling table state, sorting, and pagination.
 * It also includes unique `data-testid` attributes on interactive elements to support UI test automation.
 */
export default function Approved({ setOnboarding }: { setOnboarding: any }) {
    const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
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
            status: '',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
        {
            id: '3',
            name: 'Jane Smith',
            job_title: 'Product Manager',
            job_location: 'Canada',
            status: 'Accepted',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
        {
            id: '4',
            name: 'Peter Jones',
            job_title: 'UX Designer',
            job_location: 'UK',
            status: 'Rejected',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
    ]);

    /**
     * @description
     * A map of offer statuses to their corresponding text colors for display.
     */
    const statusTextColors: { [key: string]: string } = {
        "Pending": 'text-[#fff]',
        "Accepted": 'text-[#0d978b]',
        "Rejected": 'text-[#FA1E1E]',
    };

    /**
     * @description
     * A map of offer statuses to their corresponding background colors for display.
     */
    const statusBgColors: { [key: string]: string } = {
        "Pending": 'bg-[#a5a5a5]',
        "Accepted": 'bg-[#d6eeec]',
        "Rejected": 'bg-[#FA1E1E26]',
    };

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
     * Defines the columns for the data grid table. It uses `useMemo` to prevent unnecessary re-renders.
     * Each column specifies an accessor key, a header component, and a cell rendering function.
     * The `actions` column's cell content is dynamically rendered based on the applicant's offer status.
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
                        title="Offer Status"
                        column={column}
                        data-testid="status-header"
                    />
                ),
                cell: ({ row }) => {
                    const status = row.original.status as keyof typeof statusTextColors;
                    return (
                        <span
                            className={`text-[14px]/[22px] px-[12px] py-[2px] rounded-[8px] ${statusTextColors[status] || ''} ${statusBgColors[status] || ''}`}
                            data-testid={`status-${row.original.id}`}
                        >
                            {row.original.status ? row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1) : 'Not Sent'}
                        </span>
                    );
                },
                enableSorting: true,
                size: 90,
                meta: {
                    headerClassName: '',
                },
            },
            {
                id: 'actions',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Action"
                        column={column}
                        data-testid="action-header"
                    />
                ),
                cell: ({ row }) => (
                    <div data-testid={`actions-cell-${row.original.id}`}>
                        {row.original.status === 'Accepted' ? (
                            <Button
                                className="h-[38px]"
                                data-testid={`start-onboarding-button-${row.original.id}`}
                                id={`start-onboarding-button-${row.original.id}`}
                                onClick={() => setOnboarding(row.original.id)}
                            >
                                Start Onboarding
                            </Button>
                        )
                            : row.original.status === '' ? (
                                <button
                                    className="text-[#0d978b] text-[14px]/[22px] flex items-center cursor-pointer"
                                    data-testid={`generate-offer-letter-button-${row.original.id}`}
                                    id={`generate-offer-letter-button-${row.original.id}`}
                                    onClick={() => setSelectedApplication(row.original.id)}
                                >
                                    Generate Offer Letter
                                    <ArrowRight className="ml-2 size-[16px]" />
                                </button>
                            ) : (
                                <button
                                    className="text-[#353535] text-[14px]/[22px] flex items-center cursor-pointer"
                                    data-testid={`reset-letter-button-${row.original.id}`}
                                    id={`reset-letter-button-${row.original.id}`}
                                    onClick={() => setSelectedApplication(row.original.id)}
                                >
                                    Reset Letter
                                    <ArrowRight className="ml-2 size-[16px]" />
                                </button>
                            )
                        }
                    </div>
                ),
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
        ],
        []
    );

    /**
     * @description
     * This function is a callback for the `DetailLetter` dialog's `onOpenChange` prop.
     * It closes the dialog by setting `selectedApplication` back to `null`.
     * @param {boolean} open - The new open state of the dialog.
     */
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedApplication(null);
        }
    };

    /**
     * @description
     * `useReactTable` hook instance to handle table state, sorting, and pagination.
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

    return (
        <div data-testid="approved-applicants-container">
            <div className='w-full mt-[22px]'>
                <DataGrid
                    className='w-full'
                    table={table}
                    recordCount={applicantsData?.length || 0}
                    data-testid="approved-applicants-grid"
                >
                    <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                        {applicantsData.length === 0 ? (
                            <NoData data-testid="no-data-message" />
                        ) : (
                            <>
                                <div
                                    className={`w-full overflow-x-auto h-[calc(100vh-300px)]`}
                                    data-testid="approved-list-view-container"
                                >
                                    <DataGridTable />
                                </div>
                                <DataGridPagination data-testid="approved-pagination-controls" />
                            </>
                        )}
                    </div>
                </DataGrid>
            </div>
            <DetailLetter
                open={selectedApplication !== null}
                onOpenChange={handleOpenChange}
                data-testid="detail-letter-dialog"
            />
        </div>
    );
}
