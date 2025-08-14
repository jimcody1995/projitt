"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code, EllipsisVertical, ListFilter, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { AssessmentFilterTool } from "./components/filter";
import { NoData } from "./components/noData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getAssessments } from "@/api/job-posting";
import { deleteAssessment, changeAssessmentStatus } from "@/api/assessment";
import { errorHandlers } from "@/utils/error-handler";
import LoadingSpinner from "@/components/common/loading-spinner";

/**
 * Interface representing each assessment/job item.
 */
interface IData {
    id: string;
    title: string;
    description: string;
    status: string;
    type: string;
}



/**
 * Component: Assessment
 * ----------------------
 * Renders the list of assessments, filter/search UI, and actions for each item like edit, delete, close, etc.
 */
export default function Assessment() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [filteredData, setFilteredData] = useState<IData[]>([]);
    const [assessmentsData, setAssessmentsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusChangingIds, setStatusChangingIds] = useState<Set<string>>(new Set());

    // Function to get assessment type name based on type_id
    const getAssessmentType = (typeId: number): string => {
        switch (typeId) {
            case 1:
                return "Psychometric Assessment";
            case 2:
                return "Coding Assessment";
            default:
                return "Assessment";
        }
    };

    // Function to fetch assessments from API
    const fetchAssessments = async () => {
        try {
            setLoading(true);
            const response = await getAssessments();
            if (response.status === true) {
                // Transform API data to match the expected format
                const transformedData = response.data.map((assessment: any) => ({
                    id: assessment.id.toString(),
                    title: assessment.name,
                    description: assessment.description,
                    status: assessment.status,
                    type: getAssessmentType(assessment.type_id)
                }));
                setAssessmentsData(transformedData);
            }
        } catch (error) {
            console.error('Error fetching assessments:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch assessments on component mount
    useEffect(() => {
        fetchAssessments();
    }, []);

    // Filter data based on search query
    useEffect(() => {
        setFilteredData(
            assessmentsData.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, assessmentsData]);

    /**
     * Component: ActionsCell
     * ----------------------
     * Renders dropdown action items for each assessment row.
     */
    function ActionsCell({ row }: { row: string }): JSX.Element {
        const currentAssessment = filteredData.find((item) => item.id === row);
        const status = currentAssessment?.status?.toLowerCase();

        const handleStatusChange = async (newStatus: 'draft' | 'open' | 'closed' | 'hold') => {
            try {
                setStatusChangingIds(prev => new Set(prev).add(row));
                const response = await changeAssessmentStatus([parseInt(row)], newStatus);
                if (response.status === true) {
                    // Update local state instead of reloading all data
                    setAssessmentsData(prevData =>
                        prevData.map(assessment =>
                            assessment.id === row
                                ? { ...assessment, status: newStatus }
                                : assessment
                        )
                    );
                } else {
                    errorHandlers.custom(new Error(response.message || 'Failed to change status'), 'Status change failed');
                }
            } catch (error) {
                errorHandlers.custom(error, "Assessment Error", "Failed to change assessment status");
            } finally {
                setStatusChangingIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(row);
                    return newSet;
                });
            }
        };

        const handleDelete = async () => {
            try {
                setLoading(true);
                const response = await deleteAssessment([parseInt(row)]);
                if (response.status === true) {
                    await fetchAssessments(); // Refresh the data
                } else {
                    errorHandlers.custom(new Error(response.message || 'Failed to delete assessment'), 'Delete failed');
                }
            } catch (error) {
                errorHandlers.custom(error, "Assessment Error", "Failed to delete assessment");
            } finally {
                setLoading(false);
            }
        };

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        id={`actions-button-${row}`}
                        className="size-7"
                        mode="icon"
                        variant="ghost"
                        data-testid={`actions-button-${row}`}
                    >
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    id={`actions-menu-${row}`}
                    side="bottom"
                    align="end"
                    data-testid={`actions-menu-${row}`}
                >
                    {/* Draft status menu items */}
                    {status === "draft" && (
                        <>
                            <div
                                id={`edit-action-${row}`}
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                data-testid={`edit-action-${row}`}
                                onClick={() => router.push(`/recruitment/assessments/create-assessment?id=${row}`)}
                            >
                                Edit
                            </div>
                            <div
                                id={`open-action-${row}`}
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                data-testid={`open-action-${row}`}
                                onClick={() => handleStatusChange('open')}
                            >
                                Open
                            </div>
                            <div
                                id={`delete-action-${row}`}
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                data-testid={`delete-action-${row}`}
                                onClick={handleDelete}
                            >
                                Delete
                            </div>
                        </>
                    )}

                    {/* Open status menu items */}
                    {status === "open" && (
                        <>
                            <div
                                id={`close-action-${row}`}
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                data-testid={`close-action-${row}`}
                                onClick={() => handleStatusChange('closed')}
                            >
                                Close
                            </div>
                            <div
                                id={`delete-action-${row}`}
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                data-testid={`delete-action-${row}`}
                                onClick={handleDelete}
                            >
                                Delete
                            </div>
                        </>
                    )}

                    {/* Closed status menu items */}
                    {status === "closed" && (
                        <>
                            <div
                                id={`open-action-${row}`}
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                data-testid={`open-action-${row}`}
                                onClick={() => handleStatusChange('open')}
                            >
                                Open
                            </div>
                            <div
                                id={`delete-action-${row}`}
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                data-testid={`delete-action-${row}`}
                                onClick={handleDelete}
                            >
                                Delete
                            </div>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className='w-full' data-testid="assessments-container" id="assessments-container">
            <div className='flex items-center justify-between mb-[37px]'>
                <p
                    className='text-[24px]/[30px] font-semibold'
                    data-testid="page-title"
                    id="page-title"
                >
                    Assessment
                </p>
                <Button
                    id="create-assessment-button"
                    className='h-[42px] font-semibold text-[14px]/[20px]'
                    data-testid="create-aseessment-button"
                    onClick={() => { router.push('/recruitment/assessments/create-assessment') }}
                >
                    Create Assessment
                </Button>
            </div>
            <div className="flex items-center justify-between">
                <div className="relative" id="search-wrapper">
                    <Search
                        className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                        data-testid="search-icon"
                        id="search-icon"
                    />
                    <Input
                        id="search-input"
                        placeholder="Search Assessment"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-[172px] ps-9 h-[32px]"
                        data-testid="search-input"
                    />
                    {searchQuery.length > 0 && (
                        <Button
                            id="clear-search-button"
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
                <Button
                    id="filter-button"
                    variant="outline"
                    onClick={() => setShowFilter(!showFilter)}
                    className='text-[#053834] px-[12px] py-[6px] flex items-center gap-[6px] font-semibold'
                    data-testid="filter-button"
                >
                    <ListFilter className='size-[20px]' />
                    Filter
                </Button>
            </div>
            {showFilter && <AssessmentFilterTool />}
            <div className="mt-[28px]">
                {loading && (
                    <div className="flex justify-center items-center py-8">
                        <LoadingSpinner content="Loading assessments..." />
                    </div>
                )}
                {!loading && filteredData.length === 0 &&
                    <NoData data-testid="no-data-message" />
                }
                {!loading && filteredData.length > 0 &&
                    <div
                        className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] h-fit overflow-y-auto'
                        data-testid="grid-view-container"
                        id="grid-view-container"
                    >
                        {filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="w-full bg-white flex flex-col h-auto px-[20px] py-[24px] border border-[#e9e9e9] rounded-[16px]"
                                data-testid={`job-card-${item.id}`}
                                id={`job-card-${item.id}`}
                            >
                                <div className='w-full flex justify-between'>
                                    <p className="text-[16px]/[24px] font-medium">{item.title}</p>
                                    <div className='flex gap-[14px]'>
                                        {statusChangingIds.has(item.id) ? (
                                            <div className="flex items-center justify-center size-7">
                                                <div className="animate-spin rounded-full border-b-2 border-[#0d978b] h-4 w-4"></div>
                                            </div>
                                        ) : (
                                            <ActionsCell row={item.id} />
                                        )}
                                    </div>
                                </div>
                                <p className="text-[14px]/[22px] mt-[8px] text-[#626262]">{item.description}</p>
                                <div className="mt-[12px] flex justify-between">
                                    <div className={`rounded-[100px] px-[8px] py-[2px] flex gap-[4px] items-center ${item?.status?.toLocaleLowerCase() === "open" ? "bg-[#d6eeec] text-[#0d978b]" : "bg-[#e9e9e9] text-[#626262]"}`}>
                                        <Code className="size-[16px]" />
                                        <p className="text-[14px]/[22px]">{item.type}</p>
                                    </div>
                                    {item?.status?.toLowerCase() === "draft" && <p className="text-[12px]/[20px] text-[#626262]">{item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}
