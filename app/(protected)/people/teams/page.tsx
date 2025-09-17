'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import {
    EllipsisVertical,
    Search,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataGrid } from '@/components/ui/data-grid';
import { customToast } from '@/components/common/toastr';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
    DataGridTable,
    DataGridTableRowSelect,
    DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu } from '@/components/ui/dropdown-menu';
import { NoData } from '../../recruitment/applications/components/noData';
import LoadingSpinner from '@/components/common/loading-spinner';
import { ChevronDown } from "lucide-react";
import { TeamsSelectedDialog } from './components/teamsSelectedDialog';
import { CreateTeamSheet } from './components/createTeamsSheet';
import { CreateTeamsDialog, RenameTeamsDialog, DeleteTeamsDialog, MergeTeamsDialog } from './components/teamsDialogs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TeamsPage() {
    const router = useRouter();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [showFilter, setShowFilter] = useState(false);
    const [loading] = useState(false);
    // Sample departments data
    const [teamsData] = useState<Array<{ id: number; team_id: string; name: string; employeeCount: number }>>([
        {
            id: 1,
            team_id: "#T001",
            name: 'Data',
            employeeCount: 120
        },
        {
            id: 2,
            team_id: "#T002",
            name: 'Design',
            employeeCount: 56
        },
        {
            id: 3,
            team_id: "#T003",
            name: 'Managerial',
            employeeCount: 45
        },
    ]);

    const filteredData = useMemo<Array<{ id: number; team_id: string; name: string; employeeCount: number }>>(() => {
        return teamsData.filter((item) => {
            const searchLower = (searchQuery || "").toLowerCase();
            const matchesSearch =
                !searchQuery ||
                (item?.name || "").toLowerCase().includes(searchLower);

            return matchesSearch;
        });
    }, [searchQuery, teamsData]);

    const sortedData = useMemo<Array<{ id: number; team_id: string; name: string; employeeCount: number }>>(() => {
        if (sorting.length === 0) return filteredData;

        const { id, desc } = sorting[0];

        return [...filteredData].sort((a, b) => {
            let aValue: string | number = a?.[id as keyof typeof a];
            let bValue: string | number = b?.[id as keyof typeof b];

            if (id === "team_id") {
                aValue = a?.team_id ?? "";
                bValue = b?.team_id ?? "";
            }

            if (id === "name") {
                aValue = a?.name ?? "";
                bValue = b?.name ?? "";
            }

            aValue = String(aValue ?? "");
            bValue = String(bValue ?? "");

            if (!aValue && !bValue) return 0;
            if (!aValue) return desc ? -1 : 1;
            if (!bValue) return desc ? 1 : -1;

            try {
                return desc
                    ? bValue.localeCompare(aValue)
                    : aValue.localeCompare(bValue);
            } catch {
                return desc
                    ? bValue > aValue ? 1 : -1
                    : aValue > bValue ? 1 : -1;
            }
        });
    }, [sorting, filteredData]);

    const getData = useCallback(() => {
        // TODO: Implement data fetching logic
        console.log('Refreshing teams data...');
    }, []);

    // Dialog handlers
    const handleCreateTeams = useCallback(async (data?: { name: string }) => {
        if (!data?.name) {
            customToast("Error", "Please enter a team name", "error");
            return;
        }
        console.log('Creating team:', data.name);
        // TODO: Implement create department API call
    }, [getData]);

    const handleRenameTeams = useCallback(async (data?: { name: string }) => {
        if (!data?.name) {
            customToast("Error", "Please enter a team name", "error");
            return;
        }
        console.log('Renaming team to:', data.name);
        // TODO: Implement rename department API call
    }, [getData]);

    const handleDeleteTeams = useCallback(async () => {
        console.log('Deleting team');
        // TODO: Implement delete department API call
    }, [getData]);

    const handleMergeTeams = useCallback(async (data?: { name: string }) => {
        if (!data?.name) {
            customToast("Error", "Please enter a team name", "error");
            return;
        }
        console.log('Merging teams to:', data.name);
        // TODO: Implement merge department API call
    }, [getData]);

    const columns = useMemo<ColumnDef<{ id: number; team_id: string; name: string; employeeCount: number }>[]>(
        () => [
            {
                id: 'select',
                header: () => <DataGridTableRowSelectAll />,
                cell: ({ row }) => <DataGridTableRowSelect row={row} />,
                enableSorting: false,
                enableHiding: false,
                enableResizing: false,
                size: 46,
                meta: {
                    cellClassName: '',
                },
            },
            {
                accessorKey: 'team_id',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="Team ID"
                        column={column}
                        data-testid="team-id-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`team-id-${row.original.id}`}
                    >
                        {row.original.team_id}
                    </span>
                ),
                enableSorting: true,
                size: 150,
                meta: {
                    headerClassName: '',
                },
            },
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
                size: 200,
                meta: {
                    headerClassName: '',
                },
            },
            {
                accessorKey: 'employeeCount',
                header: ({ column }) => (
                    <DataGridColumnHeader
                        className='text-[14px] font-medium'
                        title="No. of Employees"
                        column={column}
                        data-testid="employee-count-header"
                    />
                ),
                cell: ({ row }) => (
                    <span
                        className="text-[14px] text-[#4b4b4b]"
                        data-testid={`employee-count-${row.original.id}`}
                    >
                        {row.original.employeeCount}
                    </span>
                ),
                enableSorting: true,
                size: 150,
                meta: {
                    headerClassName: '',
                },
            },
            {
                id: 'actions',
                header: '',
                cell: ({ row }) => {
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
                                <RenameTeamsDialog
                                    departmentName={row.original.name}
                                    onConfirm={handleRenameTeams}
                                >
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                        data-testid={`edit-action-${row.original.id}`}

                                    >
                                        Rename
                                    </div>
                                </RenameTeamsDialog>
                                <MergeTeamsDialog
                                    mergeTeams={[row.original.name, 'Design']}
                                    onConfirm={handleMergeTeams}
                                >
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                        data-testid={`merge-action-${row.original.id}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        Merge Teams
                                    </div>
                                </MergeTeamsDialog>
                                <DeleteTeamsDialog onConfirm={handleDeleteTeams}>
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px] text-red-600"
                                        data-testid={`delete-action-${row.original.id}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        Delete
                                    </div>
                                </DeleteTeamsDialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
                enableSorting: false,
                size: 40,
                meta: {
                    headerClassName: '',
                },
            },
        ],
        [handleDeleteTeams, handleMergeTeams, handleRenameTeams],
    );

    useEffect(() => {
        setSelectedRows(Object.keys(rowSelection));
    }, [rowSelection]);

    const table = useReactTable({
        columns: columns as ColumnDef<{ id: number; team_id: string; name: string; employeeCount: number }, { id: number; team_id: string; name: string; employeeCount: number }>[],
        data: sortedData,
        pageCount: Math.ceil((sortedData?.length || 0) / pagination.pageSize),
        getRowId: (row: { id: number; team_id: string; name: string; employeeCount: number }) => row.id.toString(),
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

    return (
        <div className='px-[8px] py-[6px] relative h-full'>
            <div className="flex justify-between w-full sm:flex-row flex-col items-start gap-[10px]">
                <div className='flex flex-col gap-[10px] w-full'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className='flex items-center gap-[10px] cursor-pointer'>
                                <p className="text-[24px]/[30px] font-semibold text-[#0d978b]">Teams</p>
                                <ChevronDown className='size-[20px] text-[#0d978b]' />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="bottom"
                            align="start"
                            className='w-[164px]'
                        >
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/people');
                                }}
                            >
                                Employees
                            </div>
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/people/departments');
                                }}
                            >
                                Department
                            </div>
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/people/teams');
                                }}
                            >
                                Teams
                            </div>
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/people/job-title');
                                }}
                            >
                                Job TItles
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <p className='text-[12px]/[14px] font-medium text-[#a5a5a5]'>Manage your companies teams</p>
                </div>

                <div className='flex gap-[16px] sm:flex-row flex-col w-full justify-end'>
                    <CreateTeamSheet>
                        <Button variant='outline' className='h-[42px] sm:w-auto w-full text-[14px]/[22px] font-medium text-[#053834] border-[#053834]'>
                            <Image
                                src="/images/icons/ai-line.png"
                                alt="AI Icon"
                                width={20}
                                height={20}
                                id="ai-icon"
                                data-testid="ai-icon"
                            />
                            <span className='text-[14px]/[20px] font-semibold text-[#0d978b]'>Create With AI</span>
                        </Button>
                    </CreateTeamSheet>
                    <CreateTeamsDialog onConfirm={handleCreateTeams}>
                        <Button className='h-[42px] sm:w-auto w-full text-[14px]/[22px] font-medium'>
                            Add Team
                            <ChevronDown className='size-[18px]' />
                        </Button>
                    </CreateTeamsDialog>
                </div>
            </div >

            <div className='w-full mt-[22px] relative'>
                <DataGrid
                    className='w-full '
                    table={table}
                    recordCount={sortedData?.length || 0}
                    data-testid="departments-grid"
                    onRowClick={(row) => {
                        router.push(`/people/teams/data?id=${row.id}`);
                    }}
                >
                    <div className="flex items-center justify-between sm:flex-row flex-col gap-[20px]">
                        <div className="relative sm:w-[243px] w-full">
                            <Search
                                className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                                data-testid="search-icon"
                            />
                            <Input
                                placeholder="Search Teams"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="ps-9 sm:w-[243px] w-full h-[42px]"
                                data-testid="search-input"
                            />
                            {searchQuery.length > 0 && (
                                <Button
                                    mode="icon"
                                    variant="ghost"
                                    className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                                    onClick={() => setSearchQuery('')}
                                    data-testid="clear-search-button"
                                >
                                    <X />
                                </Button>
                            )}
                        </div>
                        {/* <div className='flex gap-[16px] sm:w-auto w-full justify-end'>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilter(!showFilter)}
                                className='text-[#053834] sm:w-auto w-full px-[12px] py-[6px] flex items-center gap-[6px] font-semibold'
                                data-testid="filter-button"
                            >
                                <ListFilter className={`size-[20px] transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} />
                                Filter
                            </Button>
                        </div> */}
                    </div>

                    {loading ? <LoadingSpinner content='Loading Teams' /> :
                        <div className='mt-[24px] w-full rounded-[12px] overflow-hidden '>
                            {sortedData.length === 0 ? (
                                <NoData data-testid="no-data-message" />
                            ) : (
                                <>
                                    {selectedRows.length > 0 && (
                                        <TeamsSelectedDialog
                                            getData={getData}
                                            selectedRows={selectedRows}
                                            totalCount={sortedData?.length || 0}
                                            allData={sortedData}
                                            setSelectedRows={setSelectedRows}
                                            setRowSelection={setRowSelection}
                                            data-testid="teams-selected-dialog"
                                        />
                                    )}
                                    <div
                                        className={`w-full overflow-x-auto ${showFilter ? 'h-[calc(100vh-480px)]' : 'h-[calc(100vh-430px)]'}`}
                                        data-testid="list-view-container"
                                    >
                                        <DataGridTable />
                                    </div>
                                    <DataGridPagination data-testid="pagination-controls" className='mt-[25px]' />
                                </>
                            )}
                        </div>
                    }
                </DataGrid>
            </div>
        </div >
    );
}