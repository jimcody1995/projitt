"use client"
import { Button } from "@/components/ui/button";
import Stepper from "./components/stepper";
import JobDetails from "./components/job-details";
import { useState } from "react";
import { useRouter } from "next/navigation";
import JobDescription from "./components/job-description";
import ApplicantQuestions from "./components/applicant-questions";

export default function CreateJob() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [jobData, setJobData] = useState({
        jobTitle: '',
        department: '',
        employmentType: 'onsite',
        numberOfOpenings: '',
        skills: [],
        locationType: '',
        salary: '',
        deadline: new Date(),
    });
    const handleContinue = () => {
        console.log(jobData);

        setCurrentStep(currentStep + 1);
    };
    const handleSaveExit = () => {
        router.push('/recruitment/job-postings');
    };
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-[12px]/[20px] text-[#a5a5a5]">Job Postings <span className="text-[#0d978b]">/ Create Job Post</span></p>
                    <h1 className="text-[24px]/[30px] font-semibold text-[#1c1c1c] mt-[4px]">Create Job Post</h1>
                </div>
                <div className="flex gap-[19px]">
                    <Button variant="foreground" className="h-[42px] font-semibold text-[14px]/[20px] text-[#4b4b4b]" onClick={handleSaveExit}>
                        Save & Exit
                    </Button>
                    <Button className="h-[42px] font-semibold text-[14px]/[20px]" onClick={handleContinue}>
                        Save & Continue
                    </Button>
                </div>
            </div>
            <div className="mt-[24px] bg-white border border-[#e9e9e9] rounded-[12px] w-full flex">
                <div className="w-[390px] border-r border-[#e9e9e9] pt-[42px] px-[48px] pb-[54px]">
                    <div>
                        <Stepper currentStep={currentStep} />
                    </div>
                </div>
                <div className="flex-1 pt-[42px] pl-[77px] pr-[48px]">
                    {currentStep === 1 && <JobDetails jobData={jobData} setJobData={setJobData} />}
                    {currentStep === 2 && <JobDescription jobData={jobData} setJobData={setJobData} />}
                    {currentStep === 3 && <ApplicantQuestions />}
                </div>
            </div>
        </div>
    );
}