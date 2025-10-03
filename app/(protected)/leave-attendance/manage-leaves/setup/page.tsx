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
            <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4 px-4 sm:px-2 py-4 sm:py-2">
                <div className="flex flex-col gap-1 sm:gap-1">
                    <p className="text-xs sm:text-sm text-[#A5A5A5]">
                        <span className="cursor-pointer" onClick={() => router.push('/leave-attendance/manage-leaves')}>
                            Leaves Management / Leaves
                        </span>
                        <span className="text-[#0d978b]"> / Set Up Sick Leave</span>
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#353535]">Set up Sick Leave</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    {currentStep !== 1 && (
                        <Button
                            variant="ghost"
                            className="h-10 sm:h-12 w-full sm:min-w-[110px] text-sm sm:text-base order-2 sm:order-1"
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        className="h-10 sm:h-12 w-full sm:min-w-[110px] bg-[#0d978b] hover:bg-[#0d978b]/90 text-sm sm:text-base px-4 sm:px-7 order-1 sm:order-2"
                        onClick={handleNext}
                    >
                        {currentStep === 1 && 'Continue'}
                        {currentStep === 2 && 'Save & Continue'}
                        {currentStep === 3 && 'Save & Continue'}
                        {currentStep === 4 && 'Publish'}
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