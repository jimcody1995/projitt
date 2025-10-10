'use client';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "./components/stepper";
import BasicInfo from "./components/basic-info";
import CourseSelection from "./components/course-selection";
import Eligibility from "./components/eligiblility";
import Review from "./components/review";
import { customToast } from "@/components/common/toastr";
export default function CreatePaths() {
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();
    const handleNext = () => {
        if (currentStep > 3) {
            customToast("Error", "Successfully published", "success");
            router.push('/talent-management/learning-paths');
        } else {
            setCurrentStep(currentStep + 1);
        }
    }
    return (
        <div className="w-full h-full">
            <div className="flex w-full justify-between items-center px-[8px] py-[6px]">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[12px]/[20px] text-[#A5A5A5]"><span className="cursor-pointer " onClick={() => router.push('/talent-management/learning-paths')}>Learning Paths </span> <span className="text-[#0d978b]">/ Create Learning Paths</span></p>
                    <p className="text-[24px]/[30px] font-semibold text-[#353535]">Create Learning Paths</p>
                </div>
                <div className="flex gap-[10px]">
                    <Button variant="ghost" className=" h-[42px] min-w-[90px] text-gray-500 font-semibold" >Save & Exit</Button>
                    {currentStep !== 1 && <Button variant="outline" className=" h-[42px] min-w-[70px] bg-transparent font-semibold" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>}
                    {currentStep !== 4 && <Button className=" h-[42px] min-w-[70px] font-semibold" onClick={() => handleNext()}>Next</Button>}
                    {currentStep === 4 && <Button className=" h-[42px] min-w-[110px] font-semibold" onClick={() => handleNext()}>Publish</Button>}
                </div>
            </div>
            <div className="mt-[30px] bg-white border-[#E9E9E9] rounded-[12px] flex">
                <div className="w-[324px] pt-[52px] px-[48px] sm:block hidden">
                    <Stepper currentStep={currentStep} />
                </div>
                <div className="flex-1 border-l-[1px] border-[#E9E9E9] w-full">
                    {currentStep === 1 && <BasicInfo />}
                    {currentStep === 2 && <CourseSelection />}
                    {currentStep === 3 && <Eligibility />}
                    {currentStep === 4 && <Review />}
                </div>
            </div>
        </div>
    )
}