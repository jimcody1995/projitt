'use client';
import { Button } from "@/components/ui/button";
import Stepper from "./components/stepper";
import JobDetails from "./components/job-details";
import Role from "./components/role";
import Compensation from "./components/compensation";
import Onboarding from "./components/onboarding";
import Finalize from "./components/finalize";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { addJobDetails, updateRoleStep, updateCompensationStep, updateOnboardingStep } from "@/api/employee";
import { customToast } from "@/components/common/toastr";
import moment from "moment";

export default function NewEmployee() {
    const [currentStep, setCurrentStep] = useState(1);
    const [jobFormData, setJobFormData] = useState<any>(null);
    const [roleFormData, setRoleFormData] = useState<any>(null);
    const [compensationFormData, setCompensationFormData] = useState<any>(null);
    const [onboardingFormData, setOnboardingFormData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [employeeId, setEmployeeId] = useState(null);
    const jobValidationRef = useRef<(() => boolean) | null>(null);
    const roleValidationRef = useRef<(() => boolean) | null>(null);
    const compensationValidationRef = useRef<(() => boolean) | null>(null);
    const onboardingValidationRef = useRef<(() => boolean) | null>(null);
    const router = useRouter();

    const handleSaveAndContinue = async () => {
        if (currentStep === 1) {
            // Handle Job Details step
            if (!jobFormData) {
                setError('Please fill in all required fields');
                return;
            }

            // Validate form
            if (jobValidationRef.current && !jobValidationRef.current()) {
                return;
            }

            setError(null);
            setIsLoading(true);

            try {
                const response = await addJobDetails({
                    first_name: jobFormData.firstName,
                    last_name: jobFormData.lastName,
                    employee_type: jobFormData.employeeType,
                    email: jobFormData.email,
                    country_id: jobFormData.country
                });

                if (response.status) {
                    setCurrentStep(2);
                    setEmployeeId(response.message.id);
                }
            } catch (error: any) {
                customToast('Error', error.response?.data?.message || 'Failed to save job details. Please try again.', 'error');
            } finally {
                setIsLoading(false);
            }
        } else if (currentStep === 2) {
            // Handle Role step
            if (!roleFormData) {
                setError('Please fill in all required fields');
                return;
            }

            // Validate form
            if (roleValidationRef.current && !roleValidationRef.current()) {
                return;
            }

            setError(null);
            setIsLoading(true);

            try {
                const response = await updateRoleStep({
                    employee_id: employeeId,
                    alice_work_id: roleFormData.workAddress,
                    department_id: roleFormData.department,
                    job_title_id: roleFormData.jobTitle,
                    manager_id: 9,
                    contract_start_date: moment(roleFormData.contractStartDate).format('YYYY-MM-DD')
                });

                if (response.status) {
                    setCurrentStep(3);
                }
            } catch (error: any) {
                customToast('Error', error.response?.data?.message || 'Failed to save role details. Please try again.', 'error');
            } finally {
                setIsLoading(false);
            }
        } else if (currentStep === 3) {
            // Handle Compensation step
            if (!compensationFormData) {
                setError('Please fill in all required fields');
                return;
            }

            // Validate form
            if (compensationValidationRef.current && !compensationValidationRef.current()) {
                return;
            }

            setError(null);
            setIsLoading(true);

            try {
                const response = await updateCompensationStep({
                    employee_id: employeeId,
                    earning_structure: compensationFormData.earning_structure,
                    rate: compensationFormData.rate
                });

                if (response.status) {
                    setCurrentStep(4);
                }
            } catch (error: any) {
                customToast('Error', error.response?.data?.message || 'Failed to save compensation details. Please try again.', 'error');
            } finally {
                setIsLoading(false);
            }
        } else if (currentStep === 4) {
            // Handle Onboarding step
            if (!onboardingFormData) {
                setError('Please fill in all required fields');
                return;
            }

            // Validate form
            if (onboardingValidationRef.current && !onboardingValidationRef.current()) {
                return;
            }

            setError(null);
            setIsLoading(true);

            try {
                const response = await updateOnboardingStep({
                    employee_id: employeeId,
                    onbaording_checklist_ids: onboardingFormData.onboardingChecklistIds,
                    training_learnging_path: onboardingFormData.trainingLearningPath,
                    benifit_ids: onboardingFormData.benefitIds
                });

                if (response.status) {
                    setCurrentStep(5);
                }
            } catch (error: any) {
                customToast('Error', error.response?.data?.message || 'Failed to save onboarding details. Please try again.', 'error');
            } finally {
                setIsLoading(false);
            }
        } else {
            // Handle other steps
            setCurrentStep(currentStep === 5 ? currentStep : currentStep + 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <JobDetails
                        setCurrentStep={setCurrentStep}
                        onFormDataChange={setJobFormData}
                        onValidation={(validationFn: () => boolean) => { jobValidationRef.current = validationFn; }}
                    />
                );
            case 2:
                return (
                    <Role
                        employeeId={employeeId}
                        onFormDataChange={setRoleFormData}
                        onValidation={(validationFn: () => boolean) => { roleValidationRef.current = validationFn; }}
                    />
                );
            case 3:
                return (
                    <Compensation
                        employeeId={employeeId}
                        onFormDataChange={setCompensationFormData}
                        onValidation={(validationFn: () => boolean) => { compensationValidationRef.current = validationFn; }}
                    />
                );
            case 4:
                return (
                    <Onboarding
                        employeeId={employeeId}
                        onFormDataChange={setOnboardingFormData}
                        onValidation={(validationFn: () => boolean) => { onboardingValidationRef.current = validationFn; }}
                    />
                );
            case 5:
                return <Finalize setCurrentStep={setCurrentStep} />;
            default:
                return (
                    <JobDetails
                        setCurrentStep={setCurrentStep}
                        onFormDataChange={setJobFormData}
                        onValidation={(validationFn: () => boolean) => { jobValidationRef.current = validationFn; }}
                    />
                );
        }
    };

    return (
        <div className="w-full h-full">
            <div>
                <div className="flex w-full sm:flex-row flex-col gap-[20px] justify-between items-center px-[8px] py-[6px]">
                    <div className="flex flex-col gap-[4px]">
                        <p className="text-[12px]/[20px] text-[#A5A5A5]"><span className="cursor-pointer " onClick={() => router.push('/people')}>Employeee</span> <span className="text-[#0d978b]">/ Add New Employee</span></p>
                        <p className="text-[24px]/[30px] font-semibold text-[#353535]">Add New Employee</p>
                    </div>
                    <div className="flex gap-[10px]">
                        {currentStep !== 1 && <Button variant="outline" className=" h-[42px] min-w-[110px]" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>}
                        <Button
                            className=" h-[42px] min-w-[110px]"
                            onClick={handleSaveAndContinue}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : (currentStep === 5 ? 'Add & Invite Employee' : 'Save & Continue')}
                        </Button>
                    </div>
                </div>
                <div className="mt-[30px] bg-white border-[#E9E9E9] rounded-[12px] flex">
                    <div className="w-[324px] pt-[52px] px-[48px] md:block hidden">
                        <Stepper currentStep={currentStep} />
                    </div>
                    <div className="flex-1 py-[42px] px-[56px] border-l border-[#E9E9E9]">
                        {/* Error Display */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}
                        {renderStepContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}