'use client';
import { Button } from "@/components/ui/button";
import Stepper from "./components/stepper";
import JobDetails from "./components/job-details";
import Role from "./components/role";
import Compensation from "./components/compensation";
import Onboarding from "./components/onboarding";
import Finalize from "./components/finalize";
import { useState } from "react";

export default function NewEmployee() {
    const [currentStep, setCurrentStep] = useState(1);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <JobDetails />;
            case 2:
                return <Role />;
            case 3:
                return <Compensation />;
            case 4:
                return <Onboarding />;
            case 5:
                return <Finalize setCurrentStep={setCurrentStep} />;
            default:
                return <JobDetails />;
        }
    };

    return (
        <div className="w-full h-full">
            <div>
                <div className="flex w-full justify-between items-center px-[8px] py-[6px]">
                    <div className="flex flex-col gap-[4px]">
                        <p className="text-[12px]/[20px] text-[#A5A5A5]">Employeee <span className="text-[#0d978b]">/ Add New Employee</span></p>
                        <p className="text-[24px]/[30px] font-semibold text-[#353535]">Add New Employee</p>
                    </div>
                    <div className="flex gap-[10px]">
                        {currentStep !== 1 && <Button variant="outline" className=" h-[42px] min-w-[110px]" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>}
                        <Button className=" h-[42px] min-w-[110px]" onClick={() => setCurrentStep(currentStep === 5 ? currentStep : currentStep + 1)}>{currentStep === 5 ? 'Add & Invite Employee' : 'Save & Continue'}</Button>
                    </div>
                </div>
                <div className="mt-[30px] bg-white border-[#E9E9E9] rounded-[12px] flex">
                    <div className="w-[324px] pt-[52px] px-[48px] md:block hidden">
                        <Stepper currentStep={currentStep} />
                    </div>
                    <div className="flex-1 py-[42px] px-[56px] border-l border-[#E9E9E9]">
                        {renderStepContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}