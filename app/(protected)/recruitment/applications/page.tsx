'use client'
import { Button } from '@/components/ui/button';
import { BriefcaseBusiness, ChevronDown, ChevronLeft, ChevronRight, EllipsisVertical, MapPin, MessageSquareMore, PieChart, Users } from 'lucide-react';
import React, { JSX, useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CheckDialog from '@/app/(protected)/recruitment/job-postings/components/checkDialog';
import Applicants from './components/applicants';
import Share from '@/app/components/partials/common/share';
import Interviews from './components/interview';
import JobSummary from './components/job-summary';
import { getJobPostings } from '@/api/job-posting';
import { duplicateJob } from '@/api/job-posting';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { errorHandlers } from '@/utils/error-handler';
import { Skeleton } from '@/components/ui/skeleton';

export default function ApplicantJobPage() {
    const url = "https://www.figma.com/file/NlfVhYygR9mAQasassdsada/Share...";
    const [activeSection, setActiveSection] = useState<'applicants' | 'interviews' | 'job-summary'>('applicants');
    const [jobs, setJobs] = useState<any>([]);
    const [filteredJobs, setFilteredJobs] = useState<any>([]);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [applicantCount, setApplicantCount] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const params = useSearchParams();
    const router = useRouter();
    // Extracted fetchJobs function
    const fetchJobs = async () => {
        try {
            setIsInitialLoading(true);
            const response = await getJobPostings({});
            setJobs(response.data);
            setFilteredJobs(response.data);
            const jobId = params.get('jobId');
            console.log(jobId);

            if (jobId) {
                const job = response.data.find((job: any) => job.id === Number(jobId));
                setSelectedJob(job);
            }
            else setSelectedJob(response.data[0]);
            router.push(`/recruitment/applications?jobId=${response.data[0].id}`);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setIsInitialLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);
    useEffect(() => {
        const filtered = jobs.filter((job: any) => job?.title?.toLowerCase().includes(search.toLowerCase()));
        setFilteredJobs(filtered);
    }, [search]);
    useEffect(() => {
        if (selectedJob?.id) {
            router.push(`/recruitment/applications?jobId=${selectedJob?.id}`);
        }
    }, [selectedJob]);

    const handleDuplicate = async (id: string) => {
        try {
            setLoading(true);
            const response = await duplicateJob(id);

            if (response.status === true) {
                // Reload the data after successful duplication
                await fetchJobs();
                setDropdownOpen(false); // Close dropdown after successful duplication
            } else {
                errorHandlers.custom(new Error(response.message || 'Failed to duplicate application'), 'Duplicate failed');
            }
        } catch (error) {
            errorHandlers.jobPosting(error);
        } finally {
            setLoading(false);
        }
    };

    function ActionsCell(): JSX.Element {
        return (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="size-[24px]"
                        mode="icon"
                        variant="ghost"
                    >
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="end"
                >
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                    >
                        View Applicants
                    </div>
                    <div
                        className={`cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px] flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!loading) {
                                handleDuplicate(selectedJob?.id?.toString() || '');
                            }
                        }}
                    >
                        {loading && <div className="animate-spin rounded-full border-b-2 border-[#0d978b] h-3 w-3"></div>}
                        {loading ? 'Duplicating...' : 'Duplicate'}
                    </div>
                    <CheckDialog
                        action="close"
                        id={selectedJob?.id?.toString() || ''}
                        getData={fetchJobs}
                        trigger={
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                            >
                                Close Job
                            </div>
                        }
                    />
                    <CheckDialog
                        action="unpublish"
                        id={selectedJob?.id?.toString() || ''}
                        getData={fetchJobs}
                        trigger={
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                            >
                                Unpublish
                            </div>
                        }
                    />
                    <CheckDialog
                        action="delete"
                        id={selectedJob?.id?.toString() || ''}
                        getData={fetchJobs}
                        trigger={
                            <div
                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                            >
                                Delete
                            </div>
                        }
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
    return <div>

        <div className='flex items-center justify-between sm:flex-row flex-col gap-[20px]'>
            <div className='flex gap-[16px] items-center'>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger className='bg-transparent border-none shadow-none cursor-pointer text-left flex items-center gap-[12px] justify-between'>
                        {isInitialLoading ? (
                            <Skeleton className="h-[30px] w-[200px]" />
                        ) : (
                            <p
                                className='text-[24px]/[30px] font-semibold text-[#1c1c1c]'
                                data-testid="page-title"
                            >
                                {selectedJob?.title}
                            </p>
                        )}
                        <ChevronDown className='size-[20px] text-[#1c1c1c]' />
                    </PopoverTrigger>
                    <PopoverContent className='min-w-[300px]'>
                        <Input
                            type="text"
                            placeholder="Search"
                            className='w-full mb-[20px] mt-[5px]'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {filteredJobs?.map((job: any) => (
                            <div key={job.id} className='cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]' onClick={() => { setSelectedJob(job); setOpen(false) }}>{job.title}</div>
                        ))}
                    </PopoverContent>
                </Popover>
            </div>
            <div className='flex gap-[17px] items-center'>
                <div className='flex gap-[10px] items-center'>
                    <Button
                        type='button'
                        variant='outline'
                        disabled={jobs?.findIndex((job: any) => job.id === selectedJob?.id) === 0}
                        onClick={() => {
                            const index = jobs?.findIndex((job: any) => job.id === selectedJob?.id);
                            if (index !== -1 && index > 0) {
                                setSelectedJob(jobs[index - 1]);
                            }
                        }}
                    >
                        <ChevronLeft className='size-[16px] text-[#1a1a1a]' />
                    </Button>
                    <Button
                        type='button'
                        variant='outline'
                        disabled={jobs?.findIndex((job: any) => job.id === selectedJob?.id) === jobs.length - 1}
                        onClick={() => {
                            const index = jobs?.findIndex((job: any) => job.id === selectedJob?.id);
                            if (index !== -1 && index < jobs.length - 1) {
                                setSelectedJob(jobs[index + 1]);
                            }
                        }}
                    >
                        <ChevronRight className='size-[16px] text-[#1a1a1a]' />
                    </Button>
                    <span className='text-[14px]/[22px] text-[#1a1a1a]'>{jobs?.findIndex((job: any) => job.id === selectedJob?.id) + 1} of {jobs.length}</span>
                </div>
                <ActionsCell />
                <Share url={url} className="w-[100px] h-[42px] text-white text-[14px] font-semibold rounded-[8px]" />
            </div>
        </div>
        <div className='ml-[42px] mt-[12px] gap-[14px] flex items-center flex-wrap sm:justify-start justify-center'>
            {isInitialLoading ? (
                <>
                    <Skeleton className="h-[24px] w-[80px] rounded-full" />
                    <Skeleton className="h-[22px] w-[120px]" />
                    <Skeleton className="h-[22px] w-[100px]" />
                    <Skeleton className="h-[22px] w-[90px]" />
                </>
            ) : (
                <>
                    <Button
                        className='h-[24px] rounded-full bg-[#0D978B] hover:bg-[#0D978B]'
                    >
                        <span className='text-[12px]/[22px] text-white'>{selectedJob?.status.charAt(0).toUpperCase() + selectedJob?.status.slice(1)}</span>
                        <ChevronDown className='size-[12px] text-white' />
                    </Button>
                    <span
                        className='text-[14px]/[22px] px-[8px] flex items-center gap-[2px] text-[#4b4b4b]'
                    >
                        <PieChart className='size-[20px] text-[#00d47d]' />
                        {selectedJob?.department?.name}
                    </span>
                    <span
                        className='text-[14px]/[22px] px-[8px] flex items-center gap-[2px] text-[#4b4b4b]'
                    >
                        <BriefcaseBusiness className='size-[20px] text-[#4b4b4b]' />
                        {selectedJob?.employment_type?.name}
                    </span>
                    <span
                        className='text-[14px]/[22px] px-[8px] flex items-center gap-[2px] text-[#4b4b4b]'
                    >
                        <MapPin className='size-[20px] text-[#4b4b4b]' />
                        {selectedJob?.country?.name}
                    </span>
                </>
            )}
        </div>
        <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  mt-[20px] w-full overflow-x-auto'>
            <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'applicants' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('applicants')}>
                <Users className='size-[20px] ' />
                <p className='whitespace-nowrap'>Applicants</p>
                <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]'>{applicantCount || 0}</span>
            </div>
            <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'interviews' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('interviews')}>
                <MessageSquareMore className='size-[20px] ' />
                <p className='whitespace-nowrap'>Interviews Stages</p>
            </div>
            <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'job-summary' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('job-summary')}>
                <BriefcaseBusiness className='size-[20px] ' />
                <p className='whitespace-nowrap'>Job Summary</p>
            </div>
        </div>
        {activeSection === 'applicants' && selectedJob?.id && <Applicants setApplicantCount={setApplicantCount} id={selectedJob.id.toString()} />}
        {activeSection === 'interviews' && <Interviews />}
        {selectedJob && activeSection === 'job-summary' && <JobSummary selected={selectedJob} />}
    </div>
}