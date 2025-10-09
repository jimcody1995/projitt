'use client';
import { Button } from "@/components/ui/button";
import Stepper from "./components/stepper";
import { useState } from "react";
import SelectFile from "./components/select-file";
import MappingColumns from "./components/mapping-columns";
import DataImport from "./components/data-import";
import { useRouter } from "next/navigation";
interface FileWithUrl {
    name: string;
    url: string;
}
export default function BulkImport() {
    const [currentStep, setCurrentStep] = useState(1);
    const [file, setFile] = useState<File | FileWithUrl | null>(null);
    const router = useRouter();
    return (
        <div className="w-full h-full">
            {currentStep !== 4 ? <div>
                <div className="flex w-full justify-between items-center px-[8px] py-[6px]">
                    <div className="flex flex-col gap-[4px]">
                        <p className="text-[12px]/[20px] text-[#A5A5A5]"><span className="cursor-pointer " onClick={() => router.push('/employees/manage-employees')}>Employeee</span> <span className="text-[#0d978b]">/ Bulk Import</span></p>
                        <p className="text-[24px]/[30px] font-semibold text-[#353535]">Bulk Import</p>
                    </div>
                    <div className="flex gap-[10px]">
                        {currentStep !== 1 && <Button variant="outline" className=" h-[42px] min-w-[110px]" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>}
                        <Button className=" h-[42px] min-w-[110px]" onClick={() => setCurrentStep(currentStep + 1)}>{currentStep === 3 ? 'Import Now' : 'Save & Continue'}</Button>
                    </div>
                </div>
                <div className="mt-[30px] bg-white border-[#E9E9E9] rounded-[12px] flex">
                    <div className="w-[324px] pt-[52px] px-[48px] border-r border-[#E9E9E9]">
                        <Stepper currentStep={currentStep} />
                    </div>
                    <div className="flex-1 py-[42px] px-[56px]">
                        {currentStep === 1 && <SelectFile setFile={setFile} file={file} setCurrentStep={setCurrentStep} />}
                        {currentStep === 2 && <MappingColumns />}
                        {currentStep === 3 && <DataImport />}
                    </div>
                </div>
            </div>
                : <div className="w-full h-full flex justify-center items-center p-[10px]">
                    <div className="md:w-[562px] w-full py-[73px] px-[32px] flex flex-col items-center gap-[30px] bg-white rounded-[20px] border border-[#E9E9E9]">
                        <img src="/images/employee/Loader.svg" alt="bulk-import-success" className="w-[48px] h-[48px]" />
                        <p className="text-[22px]/[30px] font-medium text-[#1c1c1c]">Your data is being processed. This may take a few moments. We’ll notify you when it’s done.</p>
                        <Button onClick={() => router.push('/employees/manage-employees')}>Back to Employee List</Button>
                    </div>
                </div>}
        </div>
    )
}