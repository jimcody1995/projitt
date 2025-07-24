'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AssessmentDetail from "./components/assessment-detail";
import Questions from "./components/questions";

type AssessmentData = {
    name: string;
    description: string;
    type: string;
    duration: number | string;
};

type AssessmentErrors = {
    name?: string;
    description?: string;
    type?: string;
    duration?: string;
};


export default function CreateAssessment() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const router = useRouter();
    const handleContinue = (): void => {
        if (currentStep === 1) {
            const validationErrors = validateJobDetails(assessmentData);
            setErrors(validationErrors);
            setTriggerValidation(true);
            if (Object.keys(validationErrors).length > 0) return;
        }
        setCurrentStep(currentStep + 1);
    };

    const [assessmentData, setAssessmentData] = useState<AssessmentData>({
        name: '',
        description: '',
        type: 'psychometric',
        duration: '',
    });

    /**
     * Redirects user to assessments page on exit.
     * @returns void
     */
    const handleSaveExit = (): void => {
        router.push('/recruitment/assessments');
    };
    const handleBack = (): void => {
        setCurrentStep(currentStep - 1);
    };
    const [errors, setErrors] = useState<AssessmentErrors>({});
    const [triggerValidation, setTriggerValidation] = useState<boolean>(false);

    /**
     * Validates the job details step.
     * @param data - job data from state
     * @returns object containing error messages for invalid fields
     */
    function validateJobDetails(data: AssessmentData): AssessmentErrors {
        const newErrors: AssessmentErrors = {};

        if (!data.name?.trim()) newErrors.name = 'Name is required.';
        if (!data.description?.trim()) newErrors.description = 'Description is required.';
        if (!data.type?.trim()) newErrors.type = 'Type is required.';
        if (!data.duration) newErrors.duration = 'Duration is required.';
        return newErrors;
    }

    return (
        <div className="w-full" id="create-assessment-root" data-testid="create-assessment-root">
            <div className="flex justify-between items-center">
                <div>
                    <p
                        className="text-[12px]/[20px] text-[#a5a5a5]"
                        id="breadcrumb-text"
                        data-testid="breadcrumb-text"
                    >
                        Assessments <span className="text-[#0d978b]">/ Create Assessment</span>
                    </p>
                    <h1
                        className="text-[24px]/[30px] font-semibold text-[#1c1c1c] mt-[4px]"
                        id="page-title"
                        data-testid="page-title"
                    >
                        Create Assessment
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
                    {currentStep !== 1 && <Button
                        variant="outline"
                        className="h-[42px] order-2 sm:order-1 font-semibold text-[14px]/[20px] text-[#4b4b4b] border-[#053834]"
                        id="save-exit-button"
                        data-testid="save-exit-button"
                        onClick={handleBack}
                    >
                        Back
                    </Button>}
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
            <div className="mt-[40px]">
                {currentStep === 1 && <AssessmentDetail errors={errors} triggerValidation={triggerValidation} assessmentData={assessmentData} setAssessmentData={setAssessmentData} />}
                {currentStep === 2 && <Questions assessmentData={assessmentData} setAssessmentData={setAssessmentData} />}
            </div>
        </div>
    );
}