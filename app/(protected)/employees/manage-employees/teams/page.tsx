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
import { NoData } from '../../../recruitment/applications/components/noData';
import LoadingSpinner from '@/components/common/loading-spinner';
import { ChevronDown } from "lucide-react";
import { TeamsSelectedDialog } from './components/teamsSelectedDialog';
import { CreateTeamSheet } from './components/createTeamsSheet';
import { CreateTeamsDialog, RenameTeamsDialog, DeleteTeamsDialog, MergeTeamsDialog } from './components/teamsDialogs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getTeams, editTeam, deleteTeam, mergeTeam } from '@/api/employee';

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
    const [loading, setLoading] = useState(false);
    const [teamsData, setTeamsData] = useState<Array<{ id: number; team_id: string; name: string; employeeCount: number }>>([]);
    const [error, setError] = useState<string | null>(null);

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

    const getData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getTeams();
            if (response.status) {
                // Transform API data to match the expected format
                const transformedData = response.data.map((team: any) => ({
                    id: team.id,
                    team_id: team.id, // Using tuid as team_id
                    name: team.name,
                    employeeCount: 0 // This would need to be fetched separately or included in the API response
                }));
                setTeamsData(transformedData);
            } else {
                setError(response.message || 'Failed to fetch teams');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to fetch teams. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch teams data on component mount
    useEffect(() => {
        getData();
    }, [getData]);

    // Dialog handlers
    const handleCreateTeams = useCallback(async (data?: { name: string }) => {
        if (!data?.name) {
            customToast("Error", "Please enter a team name", "error");
            return;
        }
        console.log('Creating team:', data.name);
        // Refresh teams data after creation
        await getData();
    }, [getData]);

    const handleRenameTeams = useCallback(async (data?: { name: string, teamId?: number }) => {
        if (!data?.name) {
            customToast("Error", "Please enter a team name", "error");
            return;
        }
        if (!data?.teamId) {
            customToast("Error", "Team ID is required", "error");
            return;
        }

        try {
            const response = await editTeam({
                id: data.teamId,
                name: data.name
            });

            if (response.status) {
                customToast("Success", "Team renamed successfully", "success");
                await getData();
            } else {
                customToast("Error", response.message || "Failed to rename team", "error");
            }
        } catch (error: any) {
            customToast("Error", error.response?.data?.message || "Failed to rename team. Please try again.", "error");
        }
    }, [getData]);

    const handleDeleteTeams = useCallback(async (teamIds?: number[]) => {
        if (!teamIds || teamIds.length === 0) {
            customToast("Error", "No teams selected for deletion", "error");
            return;
        }

        try {
            const response = await deleteTeam({
                team_ids: teamIds
            });

            if (response.status) {
                customToast("Success", `${teamIds.length} team(s) deleted successfully`, "success");
                await getData();
            } else {
                customToast("Error", response.message || "Failed to delete teams", "error");
            }
        } catch (error: any) {
            customToast("Error", error.response?.data?.message || "Failed to delete teams. Please try again.", "error");
        }
    }, [getData]);

    const handleMergeTeams = useCallback(async (data?: { name: string, teamIds?: number[] }) => {
        if (!data?.name) {
            customToast("Error", "Please enter a team name", "error");
            return;
        }
        if (!data?.teamIds || data.teamIds.length < 2) {
            customToast("Error", "Please select at least 2 teams to merge", "error");
            return;
        }

        try {
            const response = await mergeTeam({
                team_ids: data.teamIds,
                new_name: data.name
            });

            if (response.status) {
                customToast("Success", "Teams merged successfully", "success");
                await getData();
            } else {
                customToast("Error", response.message || "Failed to merge teams", "error");
            }
        } catch (error: any) {
            customToast("Error", error.response?.data?.message || "Failed to merge teams. Please try again.", "error");
        }
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
                                    onConfirm={(data) => handleRenameTeams({ ...data, teamId: row.original.id })}
                                >
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                        data-testid={`edit-action-${row.original.id}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        Rename
                                    </div>
                                </RenameTeamsDialog>

                                <DeleteTeamsDialog onConfirm={() => handleDeleteTeams([row.original.id])}>
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
                                    router.push('/employees/manage-employees/departments');
                                }}
                            >
                                Department
                            </div>
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/employees/manage-employees/teams');
                                }}
                            >
                                Teams
                            </div>
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/employees/manage-employees/job-title');
                                }}
                            >
                                Job Titles
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <p className='text-[12px]/[14px] font-medium text-[#a5a5a5]'>Manage your companies teams</p>
                </div>

                <div className='flex gap-[16px] sm:flex-row flex-col w-full justify-end'>
                    <CreateTeamSheet onTeamCreated={getData}>
                        <Button className='h-[42px] sm:w-auto w-full text-[14px]/[22px] font-medium'>
                            Create Team
                        </Button>
                    </CreateTeamSheet>
                </div>
            </div >

            <div className='w-full mt-[22px] relative'>
                <DataGrid
                    className='w-full '
                    table={table}
                    recordCount={sortedData?.length || 0}
                    data-testid="departments-grid"
                    onRowClick={(row) => {
                        router.push(`/employees/manage-employeesteams/data?id=${row.id}`);
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
                            {error ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="text-red-600 text-center">
                                        <p className="text-lg font-medium mb-2">Error Loading Teams</p>
                                        <p className="text-sm mb-4">{error}</p>
                                        <Button onClick={getData} variant="outline">
                                            Try Again
                                        </Button>
                                    </div>
                                </div>
                            ) : sortedData.length === 0 ? (
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