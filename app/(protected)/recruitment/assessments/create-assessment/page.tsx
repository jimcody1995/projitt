'use client';
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import AssessmentDetail from "./components/assessment-detail";
import Questions, { QuestionsRef } from "./components/questions";
import { getAssessmentDetails, createAssessment, editAssessment } from "@/api/assessment";
import { customToast } from "@/components/common/toastr";
import LoadingSpinner from "@/components/common/loading-spinner";
import { errorHandlers } from "@/utils/error-handler";

type AssessmentData = {
    name: string;
    description: string;
    type: string;
    duration: number | string;
    points?: number;
    questions?: Array<{
        question_id: number;
        point: number;
    }>;
};

type AssessmentErrors = {
    name?: string;
    description?: string;
    type?: string;
    duration?: string;
};

/**
 * Component: CreateAssessment
 * ----------------------------
 * This page allows users to create a new assessment. It walks through multiple steps,
 * beginning with basic assessment details. The user can save progress or exit at any time.
 */
export default function CreateAssessment() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const router = useRouter();
    const searchParams = useSearchParams();
    const assessId = searchParams.get('id');
    const isEditing = !!assessId;
    const questionsRef = useRef<QuestionsRef>(null);

    const [assessmentData, setAssessmentData] = useState<AssessmentData>({
        name: '',
        description: '',
        type: 'psychometric',
        duration: '',
        points: 100,
        questions: []
    });

    const [errors, setErrors] = useState<AssessmentErrors>({});
    const [triggerValidation, setTriggerValidation] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

    // Fetch assessment data when editing
    useEffect(() => {
        const fetchAssessmentData = async () => {
            if (assessId) {
                setIsLoadingData(true);
                try {
                    const response = await getAssessmentDetails(assessId);
                    if (response.status === true && response.data) {
                        const data = response.data;

                        // Map API data to component state
                        setAssessmentData({
                            name: data.name || '',
                            description: data.description || '',
                            type: data.type_id === 1 ? 'psychometric' : 'coding',
                            duration: data.time_duration || '',
                            points: data.points || 100,
                            questions: data.questions || []
                        });
                    } else {
                        customToast('Error', 'Assessment not found', 'error');
                        router.push('/recruitment/assessments');
                    }
                } catch (error) {
                    errorHandlers.custom(error, 'Failed to load assessment data');
                    router.push('/recruitment/assessments');
                } finally {
                    setIsLoadingData(false);
                }
            }
        };

        fetchAssessmentData();
    }, [assessId, router]);

    /**
     * Validates the assessment details step.
     * @param data - assessment data from state
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

    /**
     * Handles progressing to the next step after validation.
     * @returns void
     */
    const handleContinue = (): void => {
        if (currentStep === 1) {
            const validationErrors = validateJobDetails(assessmentData);
            setErrors(validationErrors);
            setTriggerValidation(true);
            if (Object.keys(validationErrors).length > 0) return;
        }
        setCurrentStep(currentStep + 1);
    };

    /**
     * Handles saving the assessment (create or edit)
     * @returns void
     */
    const handleSave = async (): Promise<void> => {
        const validationErrors = validateJobDetails(assessmentData);
        setErrors(validationErrors);
        setTriggerValidation(true);

        if (Object.keys(validationErrors).length > 0) return;

        setIsLoading(true);
        try {
            // If we're on step 2 (questions step), save questions first
            let processedQuestions: Array<{ question_id: number; point: number }> = [];
            if (currentStep === 2 && questionsRef.current) {
                const questions = await questionsRef.current.saveQuestions();
                // Convert questions to the format expected by the assessment API
                processedQuestions = questions.map(q => ({
                    question_id: parseInt(q.id),
                    point: parseInt(q.point || '0')
                }));
            }

            // Prepare payload based on API requirements
            const payload = {
                name: assessmentData.name,
                description: assessmentData.description,
                time_duration: assessmentData.duration && assessmentData.duration.toString().trim() ?
                    parseInt(assessmentData.duration.toString().trim()) : 0,
                type_id: assessmentData.type === 'psychometric' ? 1 : 2,
                points: assessmentData.points || 100,
                questions: currentStep === 1 ? [] : processedQuestions
            };

            let response;
            if (isEditing) {
                // Edit existing assessment
                response = await editAssessment({
                    id: parseInt(assessId!),
                    ...payload
                });
            } else {
                // Create new assessment
                response = await createAssessment(payload);
            }

            if (response.status === true) {
                customToast('Success', isEditing ? 'Assessment updated successfully' : 'Assessment created successfully', 'success');
                router.push('/recruitment/assessments');
            } else {
                customToast('Error', response.message || 'Failed to save assessment', 'error');
            }
        } catch (error: unknown) {
            console.error('Error saving assessment:', error);
            errorHandlers.custom(error, 'Failed to save assessment');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Redirects user to assessments page on exit.
     * @returns void
     */
    const handleSaveExit = (): void => {
        router.push('/recruitment/assessments');
    };

    /**
     * Navigates back to the previous step.
     * @returns void
     */
    const handleBack = (): void => {
        setCurrentStep(currentStep - 1);
    };

    if (isLoadingData) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </div>
        );
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
                        Assessments <span className="text-[#0d978b]">/ {isEditing ? 'Edit' : 'Create'} Assessment</span>
                    </p>
                    <h1
                        className="text-[24px]/[30px] font-semibold text-[#1c1c1c] mt-[4px]"
                        id="page-title"
                        data-testid="page-title"
                    >
                        {isEditing ? 'Edit' : 'Create'} Assessment
                    </h1>
                </div>
                <div className="flex sm:gap-[19px] sm:flex-row flex-col">
                    <Button
                        variant="foreground"
                        className="h-[42px] order-2 sm:order-1 font-semibold text-[14px]/[20px] text-[#4b4b4b]"
                        id="save-exit-button"
                        data-testid="save-exit-button"
                        onClick={handleSaveExit}
                        disabled={isLoading}
                    >
                        Save & Exit
                    </Button>
                    {currentStep !== 1 && (
                        <Button
                            variant="outline"
                            className="h-[42px] order-2 sm:order-1 font-semibold text-[14px]/[20px] text-[#4b4b4b] border-[#053834]"
                            id="back-button"
                            data-testid="back-button"
                            onClick={handleBack}
                            disabled={isLoading}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        className="h-[42px] order-1 min-w-[82px] sm:order-2 font-semibold text-[14px]/[20px]"
                        id="save-continue-button"
                        data-testid="save-continue-button"
                        onClick={currentStep === 2 ? handleSave : handleContinue}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <LoadingSpinner size="sm" />
                        ) : currentStep === 2 ? (
                            isEditing ? 'Update Assessment' : 'Create Assessment'
                        ) : (
                            'Save & Continue'
                        )}
                    </Button>
                </div>
            </div>

            <div className="mt-[40px]" id="step-content" data-testid="step-content">
                {currentStep === 1 && (
                    <AssessmentDetail
                        errors={errors}
                        triggerValidation={triggerValidation}
                        assessmentData={assessmentData}
                        setAssessmentData={setAssessmentData}
                        isEditing={isEditing}
                    />
                )}
                {currentStep === 2 && (
                    <Questions
                        ref={questionsRef}
                        assessmentData={assessmentData}
                        assessmentId={assessId || undefined}

                    />
                )}
            </div>
        </div>
    );
}