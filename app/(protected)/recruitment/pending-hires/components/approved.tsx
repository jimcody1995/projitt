'use client'
import { JSX, useState } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    SortingState,
    Row,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataGridTable } from "@/components/ui/data-grid-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DataGrid } from "@/components/ui/data-grid";
import { NoData } from "../../assessments/components/noData";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import DetailLetter from "./detalilLetter";
export default function Approved({ setOnboarding }: { setOnboarding: any }) {
    const [activeSection] = useState<'upcoming' | 'pending' | 'past'>('upcoming');
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
            name: 'John Doe',
            job_title: 'Software Engineer',
            job_location: 'USA',
            status: 'Pending',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
        {
            name: 'John David',
            job_title: 'Software Engineer',
            job_location: 'USA',
            status: '',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
        {
            name: 'John David',
            job_title: 'Software Engineer',
            job_location: 'USA',
            status: '',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
        {
            name: 'John David',
            job_title: 'Software Engineer',
            job_location: 'USA',
            status: 'Accepted',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
        {
            name: 'John David',
            job_title: 'Software Engineer',
            job_location: 'USA',
            status: 'Rejected',
            date: '2023-06-01 10:00 AM',
            mode: 'Online',
        },
    ]);
    const statusTextColors = {
        "Pending": 'text-[#fff]',
        "Accepted": 'text-[#0d978b]',
        "Rejected": 'text-[#FA1E1E]',
    }
    const statusBgColors = {
        "Pending": 'bg-[#a5a5a5]',
        "Accepted": 'bg-[#d6eeec]',
        "Rejected": 'bg-[#FA1E1E26]',
    }
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
                        data-testid="state-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className={`text-[14px]/[22px]  px-[12px] py-[2px] rounded-[8px] ${statusTextColors[row.original.status as keyof typeof statusTextColors]} ${statusBgColors[row.original.status as keyof typeof statusBgColors]}`}
                        data-testid={`stage-${row.original.id}`}
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
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Action"
                        column={column}
                        data-testid="action-header"
                    />
                ),
                cell: ({ row }) => (<>
                    {row.original.status === 'Accepted' ? (
                        <Button
                            className="h-[38px]"
                            data-testid={`actions-button-${row.original.id}`}
                            onClick={() => setOnboarding(row.original.id)}
                        >
                            Start Onboarding
                        </Button>
                    )
                        : row.original.status === '' ? (
                            <button
                                className="text-[#0d978b] text-[14px]/[22px] flex items-center cursor-pointer"
                                data-testid={`actions-button-${row.original.id}`}
                                onClick={() => setSelectedApplication(row.original.id)}
                            >
                                Generate Offer Letter
                                <ArrowRight className="ml-2 size-[16px]" />
                            </button>
                        ) :
                            <button
                                className="text-[#353535] text-[14px]/[22px] flex items-center cursor-pointer"
                                data-testid={`actions-button-${row.original.id}`}
                                onClick={() => setSelectedApplication(row.original.id)}
                            >
                                Reset Letter
                                <ArrowRight className="ml-2 size-[16px]" />
                            </button>
                    }

                </>),
                enableSorting: false,
                size: 120,
                meta: {
                    headerClassName: '',
                },
            },
        ].filter(Boolean),
        [activeSection]
    );

    const handleOpenChange = (open: boolean) => {
        setSelectedApplication(null);
    };

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
     * ActionsCell Component
     * 
     * Renders action dropdown menu for a job posting row
     * @param {Object} props - Component props
     * @param {Row<IData>} props.row - Table row data
     * @returns {JSX.Element} Actions dropdown menu
     */
    return <div>
        <div className='w-full mt-[22px]'>
            <DataGrid
                className='w-full'
                table={table}
                recordCount={applicantsData?.length || 0}
                data-testid="job-postings-grid"
            >
                <div className='mt-[24px] w-full rounded-[12px] overflow-hidden relative'>
                    <> {applicantsData.length === 0 ?
                        <NoData data-testid="no-data-message" /> : <>
                            <div
                                className={`w-full overflow-x-auto h-[calc(100vh-300px)]`}
                                data-testid="list-view-container"
                            >
                                <DataGridTable />
                            </div>
                            <DataGridPagination data-testid="pagination-controls" />
                        </>
                    }

                    </>
                </div>
            </DataGrid>

        </div>
        <DetailLetter
            open={selectedApplication !== null}
            onOpenChange={handleOpenChange}
        />
    </div>;
}