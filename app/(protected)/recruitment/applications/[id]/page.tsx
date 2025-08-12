'use client'
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowLeft, BriefcaseBusiness, ChevronDown, EllipsisVertical, MapPin, MessageSquareMore, PieChart, Users } from 'lucide-react';
import React, { JSX, useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CheckDialog from '@/app/(protected)/recruitment/job-postings/components/checkDialog';
import Applicants from './components/applicants';
import Share from '@/app/components/partials/common/share';
import Interviews from './components/interview';
import JobSummary from './components/job-summary';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { getApplicantJobs } from '@/api/applications';
import { getJobPostings } from '@/api/job-posting';
import { Input } from '@/components/ui/input';
export default function ApplicantJobPage() {
    const url = "https://www.figma.com/file/NlfVhYygR9mAQasassdsada/Share...";
    const [activeSection, setActiveSection] = useState<'applicants' | 'interviews' | 'job-summary'>('applicants');
    const [jobs, setJobs] = useState<any>([]);
    const [filteredJobs, setFilteredJobs] = useState<any>([]);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [search, setSearch] = useState('');
    useEffect(() => {
        const fetchJobs = async () => {
            const response = await getJobPostings({});
            setJobs(response.data);
            setSelectedJob(response.data[0]);
        };
        fetchJobs();
    }, []);
    useEffect(() => {
        const filtered = jobs.filter((job: any) => job.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredJobs(filtered);
    }, [search]);
    function ActionsCell(): JSX.Element {
        return (
            <DropdownMenu>
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
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                    >
                        Duplicate
                    </div>
                    <CheckDialog
                        action="close"
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
                <Select value={selectedJob?.id} onValueChange={(value) => setSelectedJob(jobs?.find((job: any) => job.id === value))}>
                    <SelectTrigger className='bg-transparent border-none shadow-none cursor-pointer'>
                        <p
                            className='text-[24px]/[30px] font-semibold text-[#1c1c1c]'
                            data-testid="page-title"
                        >
                            {selectedJob?.title}
                        </p>
                    </SelectTrigger>
                    <SelectContent >
                        <Input
                            type="text"
                            placeholder="Search"
                            className='w-full mb-[20px] mt-[5px]'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {filteredJobs?.map((job: any) => (
                            <SelectItem key={job.id} value={job.id} >{job.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='flex gap-[17px] items-center'>
                <ActionsCell />
                <Share url={url} className="w-[100px] h-[42px] text-white text-[14px] font-semibold rounded-[8px]" />
            </div>
        </div>
        <div className='ml-[42px] mt-[12px] gap-[14px] flex items-center flex-wrap sm:justify-start justify-center'>
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
        </div>
        <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  mt-[20px] w-full overflow-x-auto'>
            <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'applicants' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('applicants')}>
                <Users className='size-[20px] ' />
                <p className='whitespace-nowrap'>Applicants</p>
                <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]'>12</span>
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
        {activeSection === 'applicants' && <Applicants />}
        {activeSection === 'interviews' && <Interviews />}
        {activeSection === 'job-summary' && <JobSummary />}
    </div >;
}