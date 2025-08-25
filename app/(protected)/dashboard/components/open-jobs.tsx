'use client';

import { ArrowUpRight, Briefcase, MapPinned } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getJobPostings } from "@/api/job-posting"
import { Skeleton } from "@/components/ui/skeleton"

interface JobData {
    id: number;
    title: string;
    status: string;
    employment_type: {
        name: string;
    };
    country: {
        name: string;
    };
    no_of_job_opening: number;
    applicant_count?: number;
}

export default function OpenJobs() {
    const router = useRouter()
    const [jobs, setJobs] = useState<JobData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                const response = await getJobPostings({})

                if (response.status && response.data) {
                    // Filter only open jobs and take first 4
                    const openJobs = response.data
                        .filter((job: JobData) => job.status === 'open')
                        .slice(0, 4)

                    setJobs(openJobs)
                } else {
                    setError('Failed to fetch jobs')
                }
            } catch (err) {
                console.error('Error fetching jobs:', err)
                setError('Error loading jobs')
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    const handleNavigateToJobPostings = () => {
        router.push('/recruitment/job-postings')
    }

    // Create array of 4 items to maintain UI structure
    const displayItems = Array.from({ length: 4 }, (_, index) => {
        if (index < jobs.length) {
            return jobs[index]
        }
        return null // This will render as skeleton
    })

    return (
        <div className="w-full rounded-[12px] border border-[#e9e9e9] bg-white p-[16px]">
            <div className="flex justify-between items-center">
                <div className="flex gap-[4px]">
                    <Briefcase className="size-[16px] text-[#4b4b4b]" />
                    <p className="text-[#4b4b4b] text-[13px]/[16px]">
                        Open Jobs ({jobs.length})
                    </p>
                </div>
                <button onClick={handleNavigateToJobPostings}>
                    <ArrowUpRight className="size-[16px] text-[#1c1c1c] cursor-pointer" />
                </button>
            </div>

            {error && (
                <div className="mt-[16px] text-red-500 text-[12px]">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-[12px] mt-[16px]">
                {displayItems.map((job, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-center border-b border-[#e9e9e9] ${index === 3 ? 'border-b-0 pb-0' : 'pb-[12px]'
                            }`}
                    >
                        {loading ? (
                            // Skeleton loading state
                            <>
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-32 mb-2" />
                                    <div className="flex gap-[8px]">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                                <Skeleton className="h-3 w-20" />
                            </>
                        ) : job ? (
                            // Actual job data
                            <>
                                <div
                                    className="flex-1 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                                    onClick={() => router.push(`/recruitment/applications?jobId=${job.id}`)}
                                >
                                    <p className="text-[12px]/[20px]">{job.title}</p>
                                    <div className="flex gap-[8px]">
                                        <div className="flex items-center gap-[4px]">
                                            <Briefcase className="size-[16px] text-[#626262]" />
                                            <p className="text-[10px]/[16px] text-[#787878]">
                                                {job.employment_type?.name || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-[4px]">
                                            <MapPinned className="size-[16px] text-[#626262]" />
                                            <p className="text-[10px]/[16px] text-[#787878]">
                                                {job.country?.name || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-[10px]/[16px] text-[#0d978b] underline">
                                    {job?.applicant_count} Applicants
                                </button>
                            </>
                        ) : (
                            // Empty state (maintains UI structure)
                            <>
                                <div>
                                    <p className="text-[12px]/[20px] text-[#787878]">No open positions</p>
                                    <div className="flex gap-[8px]">
                                        <div className="flex items-center gap-[4px]">
                                            <Briefcase className="size-[16px] text-[#626262]" />
                                            <p className="text-[10px]/[16px] text-[#787878]">-</p>
                                        </div>
                                        <div className="flex items-center gap-[4px]">
                                            <MapPinned className="size-[16px] text-[#626262]" />
                                            <p className="text-[10px]/[16px] text-[#787878]">-</p>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px]/[16px] text-[#787878]">-</span>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}