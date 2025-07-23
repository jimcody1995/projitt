"use client"
import { Button } from "@/components/ui/button";
import Stepper from "./components/stepper";
import JobDetails from "./components/job-details";
import { useState } from "react";
import { useRouter } from "next/navigation";
import JobDescription from "./components/job-description";
import ApplicantQuestions from "./components/applicant-questions";
import HiringPipeline from "./components/hiring-pipeline";

type JobData = {
    jobTitle: string;
    department: string;
    employmentType: string;
    numberOfOpenings: string;
    skills: string[];
    locationType: string;
    state?: string;
    country?: string;
    salary: string;
    deadline: Date;
    description: string
};

type JobDetailsErrors = {
    jobTitle?: string;
    department?: string;
    employmentType?: string;
    numberOfOpenings?: string;
    skills?: string;
    locationType?: string;
    state?: string;
    country?: string;
};

type JobDesciptionError = {
    description?: string;
}

export default function CreateJob() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(3);
    const [jobData, setJobData] = useState<JobData>({
        jobTitle: '',
        department: '',
        employmentType: '',
        numberOfOpenings: '',
        skills: [],
        locationType: '',
        state: '',
        country: '',
        salary: '',
        deadline: new Date(),
        description: ''
    });
    const [errors, setErrors] = useState<JobDetailsErrors>({});
    const [descriptionError, setDescriptionError] = useState<JobDesciptionError>({});
    const [triggerValidation, setTriggerValidation] = useState(false);

    function validateJobDetails(data: JobData): JobDetailsErrors {
        const newErrors: JobDetailsErrors = {};
        if (!data.jobTitle || data.jobTitle.trim() === '') newErrors.jobTitle = 'Job Title is required.';
        if (!data.department || data.department.trim() === '') newErrors.department = 'Department is required.';
        if (!data.employmentType || data.employmentType.trim() === '') newErrors.employmentType = 'Employment Type is required.';
        if (!data.numberOfOpenings || data.numberOfOpenings.trim() === '') newErrors.numberOfOpenings = 'No. of Openings is required.';
        if (!data.skills || !Array.isArray(data.skills) || data.skills.length < 1) newErrors.skills = 'At least one skill is required.';
        if (!data.locationType || data.locationType.trim() === '') newErrors.locationType = 'Location Type is required.';
        if (data.locationType === 'onsite' || data.locationType === 'hybrid') {
            if (!data.state || data.state.trim() === '') newErrors.state = 'State is required.';
            if (!data.country || data.country.trim() === '') newErrors.country = 'Country is required.';
        } else if (data.locationType === 'remote') {
            if (!data.country || data.country.trim() === '') newErrors.country = 'Country is required.';
        }
        return newErrors;
    }

    function validateJobDescription(data: JobData): JobDesciptionError {
        const newErrors: JobDesciptionError = {};
        // Remove HTML tags and check if anything is left
        const plainText = data.description?.replace(/<[^>]+>/g, '').trim();
        if (!plainText) {
            newErrors.description = 'Job Description is required.';
        }
        return newErrors;
    }

    const handleContinue = () => {
        if (currentStep === 1) {
            const validationErrors = validateJobDetails(jobData);
            setErrors(validationErrors);
            setTriggerValidation(true);
            if (Object.keys(validationErrors).length > 0) return;
        }
        if (currentStep === 2) {
            const validationErrors = validateJobDescription(jobData);
            setDescriptionError(validationErrors);
            setTriggerValidation(true);
            if (Object.keys(validationErrors).length > 0) return;
        }
        setCurrentStep(currentStep + 1);
    };
    const handleSaveExit = () => {
        router.push('/recruitment/job-postings');
    };
    return (
        <div className='w-full'>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-[12px]/[20px] text-[#a5a5a5]">Job Postings <span className="text-[#0d978b]">/ Create Job Post</span></p>
                    <h1 className="text-[24px]/[30px] font-semibold text-[#1c1c1c] mt-[4px]">Create Job Post</h1>
                </div>
                <div className="flex sm:gap-[19px] sm:flex-row flex-col">
                    <Button variant="foreground" className="h-[42px] order-2 sm:order-1 font-semibold text-[14px]/[20px] text-[#4b4b4b]" onClick={handleSaveExit}>
                        Save & Exit
                    </Button>
                    <Button className="h-[42px] order-1 sm:order-2 font-semibold text-[14px]/[20px]" onClick={handleContinue}>
                        Save & Continue
                    </Button>
                </div>
            </div>
            <div className="mt-[24px] bg-white border border-[#e9e9e9] rounded-[12px] w-full flex  justify-center">
                <div className="flex-1 border-r border-[#e9e9e9] pt-[42px] px-[48px] pb-[54px] sm:block hidden">
                    <div>
                        <Stepper currentStep={currentStep} />
                    </div>
                </div>
                <div className="xl:w-[55vw] lg:w-[45vw] sm:w-[60vw] w-[85vw]  pt-[42px] pl-[20px] pr-[20px] md:pl-[48px] md:pr-[48px] sm:pl-[77px] sm:pr-[48px]">
                    {currentStep === 1 && <JobDetails jobData={jobData} setJobData={setJobData} errors={errors} triggerValidation={triggerValidation} />}
                    {currentStep === 2 && (
                        <JobDescription
                            jobData={jobData}
                            setJobData={setJobData}
                            errors={descriptionError}
                            triggerValidation={triggerValidation}
                        />
                    )}
                    {currentStep === 3 && <ApplicantQuestions />}
                    {currentStep === 4 && <HiringPipeline />}
                </div>
            </div>
        </div>
    );
}