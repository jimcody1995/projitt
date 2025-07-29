"use client";

import { Button } from "@/components/ui/button";
import Stepper from "./components/stepper";
import JobDetails from "./components/job-details";
import JobDescription from "./components/job-description";
import ApplicantQuestions from "./components/applicant-questions";
import HiringPipeline from "./components/hiring-pipeline";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import Publish from "./components/publish";
import Completed from "./components/completed";
import { addNewDetailJob } from "@/api/job-posting";
import { useBasic } from "@/context/BasicContext";

/**
 * JobData type defines the structure of data related to a job posting.
 */
type JobData = {
    title: string;
    department_id: string;
    employment_type_id: string;
    no_of_job_opening: string;
    skill_ids: string[];
    location_type_id: number;
    state: string;
    country_id?: string;
    salary: string;
    deadline: Date;
    description: string;
};

/**
 * JobDetailsErrors type defines the structure of validation errors
 * for the job details step.
 */
type JobDetailsErrors = {
    title?: string;
    department_id?: string;
    employment_type_id?: string;
    no_of_job_opening?: string;
    skill_ids?: string;
    location_type_id?: number;
    state?: string;
    country_id?: string;
};

/**
 * JobDescriptionError type defines the structure of validation errors
 * for the job description step.
 */
type JobDesciptionError = {
    description?: string;
};

/**
 * CreateJob component handles the creation of a new job post,
 * including validation and step-based navigation (details, description, questions).
 */
export default function CreateJob(): JSX.Element {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [jobData, setJobData] = useState<JobData>({
        title: '',
        department_id: '',
        employment_type_id: '',
        no_of_job_opening: '',
        skill_ids: [],
        location_type_id: 1,
        state: '',
        country_id: '',
        salary: '',
        deadline: new Date(),
        description: ''
    });
    const [errors, setErrors] = useState<JobDetailsErrors>({});
    const [descriptionError, setDescriptionError] = useState<JobDesciptionError>({});
    const [triggerValidation, setTriggerValidation] = useState<boolean>(false);
    const { skills } = useBasic();

    /**
     * Validates the job details step.
     * @param data - job data from state
     * @returns object containing error messages for invalid fields
     */
    function validateJobDetails(data: JobData): JobDetailsErrors {
        const newErrors: JobDetailsErrors = {};

        if (!data.title?.trim()) newErrors.title = 'Job Title is required.';
        if (!data.department_id) newErrors.department_id = 'Department is required.';
        if (!data.employment_type_id) newErrors.employment_type_id = 'Employment Type is required.';
        if (!data.no_of_job_opening) newErrors.no_of_job_opening = 'No. of Openings is required.';
        if (!data.skill_ids || !Array.isArray(data.skill_ids) || data.skill_ids.length < 1) newErrors.skill_ids = 'At least one skill is required.';
        if (data.location_type_id === 1 || data.location_type_id === 2) {
            if (!data.state) newErrors.state = 'State is required.';
            if (!data.country_id) newErrors.country_id = 'Country is required.';
        } else if (data.location_type_id === 3) {
            if (!data.country_id) newErrors.country_id = 'Country is required.';
        }

        return newErrors;
    }

    /**
     * Validates the job description step.
     * @param data - job data from state
     * @returns object containing error message if description is empty
     */
    function validateJobDescription(data: JobData): JobDesciptionError {
        const newErrors: JobDesciptionError = {};
        const plainText = data.description?.replace(/<[^>]+>/g, '').trim();
        if (!plainText) {
            newErrors.description = 'Job Description is required.';
        }
        return newErrors;
    }

    /**
     * Handles transition to the next step with validation.
     * @returns void
     */
    const handleContinue = async (): Promise<void> => {
        if (currentStep === 1) {
            const validationErrors = validateJobDetails(jobData);
            setErrors(validationErrors);
            setTriggerValidation(true);
            if (Object.keys(validationErrors).length > 0) return;
            console.log(skills);
            console.log(skills.findIndex(skill => skill.name === 'PHP'));


            const payload = {
                ...jobData,
                salary_from: jobData.salary.split('-')[0].slice(1),
                salary_to: jobData.salary.split('-')[1].split(' ')[0].slice(1),
                skill_ids: jobData.skill_ids.map(skillName =>
                    skills.findIndex(skill => skill.name === skillName) + 1
                ),
            }

            const response = await addNewDetailJob(payload);
            if (response.status === 200) {
                setCurrentStep(currentStep + 1);
            }
        }

        if (currentStep === 2) {
            const validationErrors = validateJobDescription(jobData);
            setDescriptionError(validationErrors);
            setTriggerValidation(true);
            if (Object.keys(validationErrors).length > 0) return;
        }

        setCurrentStep(currentStep + 1);
    };

    /**
     * Redirects user to job postings page on exit.
     * @returns void
     */
    const handleSaveExit = (): void => {
        router.push('/recruitment/job-postings');
    };

    return (
        <>
            {currentStep !== 6 && (
                <div className="w-full" id="create-job-root" data-testid="create-job-root">
                    <div className="flex justify-between items-center">
                        <div>
                            <p
                                className="text-[12px]/[20px] text-[#a5a5a5]"
                                id="breadcrumb-text"
                                data-testid="breadcrumb-text"
                            >
                                Job Postings <span className="text-[#0d978b]">/ Create Job Post</span>
                            </p>
                            <h1
                                className="text-[24px]/[30px] font-semibold text-[#1c1c1c] mt-[4px]"
                                id="page-title"
                                data-testid="page-title"
                            >
                                Create Job Post
                            </h1>
                        </div>
                        <div className="flex sm:gap-[19px] sm:flex-row flex-col">
                            <Button
                                variant="foreground"
                                className="h-[42px] order-2 sm:order-1 font-semibold text-[14px]/[20px] text-[#4b4b4b]"
                                id="save-exit-button"
                                data-testid="save-exit-button"
                                onClick={handleSaveExit}
                            >
                                Save & Exit
                            </Button>
                            <Button
                                className="h-[42px] order-1 min-w-[82px] sm:order-2 font-semibold text-[14px]/[20px]"
                                id="save-continue-button"
                                data-testid="save-continue-button"
                                onClick={handleContinue}
                            >
                                {currentStep === 5 ? 'Publish' : 'Save & Continue'}
                            </Button>
                        </div>
                    </div>

                    <div
                        className="mt-[24px] bg-white border border-[#e9e9e9] rounded-[12px] w-full flex justify-center"
                        id="create-job-container"
                        data-testid="create-job-container"
                    >
                        <div className="flex-1 border-r border-[#e9e9e9] pt-[42px] px-[48px] pb-[54px] sm:block hidden">
                            <Stepper currentStep={currentStep} />
                        </div>

                        <div
                            className="xl:w-[55vw] lg:w-[45vw] sm:w-[60vw] w-[85vw] pt-[42px] pl-[20px] pr-[20px] md:pl-[48px] md:pr-[48px] sm:pl-[77px] sm:pr-[48px]"
                            id="stepper-content"
                            data-testid="stepper-content"
                        >
                            {currentStep === 1 && (
                                <JobDetails
                                    jobData={jobData}
                                    setJobData={setJobData}
                                    errors={errors}
                                    triggerValidation={triggerValidation}
                                />
                            )}
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
                            {currentStep === 5 && <Publish />}
                        </div>
                    </div>
                </div>
            )}
            {currentStep === 6 && (
                <Completed />
            )}
        </>
    )
}
