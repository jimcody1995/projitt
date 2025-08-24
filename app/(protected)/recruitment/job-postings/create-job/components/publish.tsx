/**
 * Publish Component
 * 
 * This component renders a review screen for a job posting,
 * displaying job details, description, and applicant questions,
 * with edit options for each section. It helps users verify all inputs
 * before publishing a job listing.
 */

import { Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { getJobDetails } from "@/api/job-posting";
import { useSearchParams } from "next/navigation";

interface PublishProps {
    onNavigateToStep?: (step: number) => void;
    disabled?: boolean;
}

interface JobData {
    title: string;
    department: { name: string };
    employment_type: { name: string };
    no_of_job_opening: number;
    skills: Array<{ name: string }>;
    location_type: { name: string };
    country: { name: string };
    state: string;
    salary_from: string;
    salary_to: string;
    deadline: string;
    description: string;
    questions: Array<{
        question_name: string;
        answer_type: string;
        options?: string[];
    }>;
}

/**
 * Renders the Publish component for reviewing job post details.
 */
export default function Publish({ onNavigateToStep, disabled = false }: PublishProps) {
    const searchParams = useSearchParams();
    const [data, setData] = useState<JobData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch job data when component mounts
    useEffect(() => {
        const fetchJobData = async () => {
            const jobId = searchParams.get('id');
            if (!jobId) {
                setError('No job ID provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await getJobDetails(jobId);

                if (response.status === true && response.data) {
                    setData(response.data);
                } else {
                    setError('Failed to load job data');
                }
            } catch (err) {
                console.error('Error fetching job data:', err);
                setError('Error loading job data');
            } finally {
                setLoading(false);
            }
        };

        fetchJobData();
    }, [searchParams]);

    // Helper function to format date
    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Navigation handlers
    const handleEditJobDetails = () => {
        if (onNavigateToStep) {
            onNavigateToStep(1);
        }
    };

    const handleEditJobDescription = () => {
        if (onNavigateToStep) {
            onNavigateToStep(2);
        }
    };

    const handleEditApplicantQuestions = () => {
        if (onNavigateToStep) {
            onNavigateToStep(3);
        }
    };

    // Helper function to get answer type display text
    const getAnswerTypeDisplay = (answerType: string) => {
        switch (answerType) {
            case "short":
                return "Short Answer";
            case "long_detail":
                return "Long Paragraph";
            case "dropdown":
                return "Multiple choice";
            case "checkbox":
                return "Multiple choice";
            case "file_upload":
                return "File Upload";
            default:
                return answerType;
        }
    };

    // Helper function to render options for dropdown/checkbox
    const renderOptions = (question: { answer_type: string; options?: string[] }) => {
        if (question.answer_type === "dropdown" || question.answer_type === "checkbox") {
            if (question.options && Array.isArray(question.options)) {
                return question.options.join(", ");
            }
        }
        return "";
    };

    // Skeleton components for loading state
    const JobDetailsSkeleton = () => (
        <div className="xl:w-[650px] w-full flex flex-col gap-[36px] mt-[50px]">
            <div className="border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] p-[20px]">
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-7 w-7 rounded-[7px]" />
                </div>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 mt-[12px] gap-[42px]">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const JobDescriptionSkeleton = () => (
        <div className="xl:w-[650px] w-full flex flex-col gap-[36px] mt-[50px]">
            <div className="border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] p-[20px]">
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-7 w-7 rounded-[7px]" />
                </div>
                <div className="flex flex-col mt-[16px] gap-3">
                    <Skeleton className="h-5 w-32" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
        </div>
    );

    const ApplicantQuestionsSkeleton = () => (
        <div className="xl:w-[650px] w-full flex flex-col gap-[36px] mt-[50px]">
            <div className="border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] p-[20px]">
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-7 w-7 rounded-[7px]" />
                </div>
                <div className="flex flex-col mt-[16px] gap-[14px]">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="space-y-2">
                            <Skeleton className="h-5 w-64" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Show error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Show skeletons when loading
    if (loading) {
        return (
            <div id="job-description-component" data-testid="job-description-component">
                <Skeleton className="h-8 w-48 mb-12" />
                <JobDetailsSkeleton />
                <JobDescriptionSkeleton />
                <ApplicantQuestionsSkeleton />
            </div>
        );
    }

    // Show message if no data
    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-gray-500 text-lg">No job data available</div>
            </div>
        );
    }

    return (
        <div
            id="job-description-component"
            data-testid="job-description-component"
        >
            <h1
                className="text-[20px]/[30px] font-semibold text-[#353535]"
                id="job-description-title"
                data-testid="job-description-title"
            >
                Review & Publish
            </h1>

            {/* Job Details Section */}
            <div className="xl:w-[650px] w-full flex flex-col gap-[36px] mt-[50px]">
                <div
                    className="border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] p-[20px]"
                    id="job-details-section"
                    data-testid="job-details-section"
                >
                    <div className="flex justify-between">
                        <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Job Details</p>
                        <button
                            className="font-medium bg-[#0d978b] text-white rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"
                            id="edit-job-details"
                            data-testid="edit-job-details"
                            onClick={handleEditJobDetails}
                            disabled={disabled}
                        >
                            <Edit className="size-[16px]" />
                        </button>
                    </div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 mt-[12px] gap-[42px]" id="job-details-fields" data-testid="job-details-fields">
                        <div className="flex flex-col" id="field-job-title" data-testid="field-job-title">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Job Title</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{String(data.title || "N/A")}</p>
                        </div>
                        <div className="flex flex-col" id="field-department" data-testid="field-department">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Department</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{data.department && typeof data.department === 'object' && 'name' in data.department ? String(data.department.name) : "N/A"}</p>
                        </div>
                        <div className="flex flex-col" id="field-employment-type" data-testid="field-employment-type">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Employment Type</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{data.employment_type && typeof data.employment_type === 'object' && 'name' in data.employment_type ? String(data.employment_type.name) : "N/A"}</p>
                        </div>
                        <div className="flex flex-col" id="field-openings" data-testid="field-openings">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">No. of Openings</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{String(data.no_of_job_opening) || "N/A"}</p>
                        </div>
                        <div className="flex flex-col" id="field-skills" data-testid="field-skills">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Skills</p>
                            <div>
                                {data.skills && Array.isArray(data.skills) ? (
                                    data.skills.map((skill, index) => (
                                        <p key={index} className="text-[14px]/[22px] font-medium text-[#353535]">
                                            {skill.name}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-[14px]/[22px] font-medium text-[#353535]">N/A</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col" id="field-location" data-testid="field-location">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Location Type</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">
                                {data.location_type && typeof data.location_type === 'object' && 'name' in data.location_type ? String(data.location_type.name) : "N/A"}
                                {data.state && data.country && typeof data.country === 'object' && 'name' in data.country ? ` (${data.state}, ${String(data.country.name)})` : ""}
                            </p>
                        </div>
                        <div className="flex flex-col" id="field-salary" data-testid="field-salary">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Salary</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">
                                {data.salary_from && data.salary_to ?
                                    `$${parseInt(String(data.salary_from)).toLocaleString()} - $${parseInt(String(data.salary_to)).toLocaleString()}` :
                                    "N/A"
                                }
                            </p>
                        </div>
                        <div className="flex flex-col" id="field-deadline" data-testid="field-deadline">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Deadline</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{formatDate(String(data.deadline))}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Description Section */}
            <div className="xl:w-[650px] w-full flex flex-col gap-[36px] mt-[50px]">
                <div
                    className="border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] p-[20px]"
                    id="job-description-section"
                    data-testid="job-description-section"
                >
                    <div className="flex justify-between">
                        <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Job Description</p>
                        <button
                            className="font-medium bg-[#0d978b] text-white rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"
                            id="edit-job-description"
                            data-testid="edit-job-description"
                            onClick={handleEditJobDescription}
                            disabled={disabled}
                        >
                            <Edit className="size-[16px]" />
                        </button>
                    </div>
                    <div className="flex flex-col mt-[16px]" id="job-description-text" data-testid="job-description-text">
                        <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Job Description</p>
                        <div
                            className="text-[14px]/[22px] font-medium text-[#353535]"
                            dangerouslySetInnerHTML={{ __html: data.description || "No description available" }}
                        />
                    </div>
                </div>
            </div>

            {/* Applicant Questions Section */}
            <div className="xl:w-[650px] w-full flex flex-col gap-[36px] mt-[50px]">
                <div
                    className="border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] p-[20px]"
                    id="applicant-questions-section"
                    data-testid="applicant-questions-section"
                >
                    <div className="flex justify-between">
                        <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Applicant Questions</p>
                        <button
                            className="font-medium bg-[#0d978b] text-white rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"
                            id="edit-applicant-questions"
                            data-testid="edit-applicant-questions"
                            onClick={handleEditApplicantQuestions}
                            disabled={disabled}
                        >
                            <Edit className="size-[16px]" />
                        </button>
                    </div>
                    <div className="flex flex-col mt-[16px] gap-[14px]" id="applicant-questions" data-testid="applicant-questions">
                        {data.questions && Array.isArray(data.questions) ? (
                            data.questions.map((question, index) => (
                                <div
                                    key={index}
                                    className="text-[14px]/[22px] font-medium text-[#353535]"
                                    data-testid={`question-${index + 1}`}
                                >
                                    <p>{question.question_name}</p>
                                    <p className="text-[#a5a5a5]">
                                        {getAnswerTypeDisplay(question.answer_type)}
                                        {renderOptions(question) && `: ${renderOptions(question)}`}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">No questions available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}