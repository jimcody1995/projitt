'use client';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SickLeaveStepper from "../components/sick-leave-stepper";
import BasicLeaveInfo from "../components/basic-leave-info";
import AllowanceAccrual from "../components/allowance-accrual";
import SickLeaveEligibility from "../components/sick-leave-eligibility";
import SickLeaveReview from "../components/sick-leave-review";
import { customToast } from "@/components/common/toastr";

export default function SetupSickLeave() {
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();

    const handleNext = () => {
        if (currentStep > 3) {
            customToast("Success", "Sick leave policy published successfully", "success");
            router.push('/leave-attendance/manage-leaves');
        } else {
            setCurrentStep(currentStep + 1);
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    return (
        <div className="w-full h-full">
            <div className="flex w-full justify-between items-center px-[8px] py-[6px]">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[20px] text-[#A5A5A5]">
                        <span className="cursor-pointer" onClick={() => router.push('/leave-attendance/manage-leaves')}>
                            Leaves Management / Leaves
                        </span>
                        <span className="text-[#0d978b]"> / Set Up Sick Leave</span>
                    </p>
                    <p className="text-[24px]/[30px] font-semibold text-[#353535]">Set up Sick Leave</p>
                </div>
                <div className="flex gap-[10px]">
                    {currentStep !== 1 && (
                        <Button
                            variant="outline"
                            className="h-[48px] min-w-[110px] text-[16px]/[20px]"
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        className="h-[48px] min-w-[110px] bg-[#0d978b] hover:bg-[#0d978b]/90 text-[16px]/[20px]"
                        onClick={handleNext}
                    >
                        {currentStep === 4 ? 'Publish' : 'Save & Continue'}
                    </Button>
                </div>
            </div>
            <div className="mt-[28px] bg-white border-[#E9E9E9] rounded-[12px] flex">
                <div className="w-[324px] pt-[42px] px-[48px]  sm:block hidden">
                    <SickLeaveStepper currentStep={currentStep} />
                </div>
                <div className="flex-1 border-l-[1px] border-[#E9E9E9] w-full">
                    {currentStep === 1 && <BasicLeaveInfo />}
                    {currentStep === 2 && <AllowanceAccrual />}
                    {currentStep === 3 && <SickLeaveEligibility />}
                    {currentStep === 4 && <SickLeaveReview />}
                </div>
            </div>
        </div>
    )
}