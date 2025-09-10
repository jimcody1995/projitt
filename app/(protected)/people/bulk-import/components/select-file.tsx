'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import FileDropUpload from "./file-drop-upload";
interface FileWithUrl {
    name: string;
    url: string;
}
export default function SelectFile({ setFile, file, setCurrentStep }: { setFile: React.Dispatch<React.SetStateAction<File | FileWithUrl | null>>, file: File | FileWithUrl | null, setCurrentStep: (step: number) => void }) {
    return (
        <div className="md:w-[555px] w-full">
            <p className="text-[20px]/[30px] font-semibold text-[#1c1c1c]">Select File</p>
            <p className="text-[14px]/[20px] text-[#787878] mt-[5px]">Upload a CSV file of your employee data to onboard them on Projitt.  Ensure your file matches the required format — incorrect or missing fields may cause import errors.</p>
            <p className="text-[14px]/[20px] text-[#0d978b] mt-[8px] cursor-pointer mb-[38px]">Download Sample Template</p>
            <FileDropUpload setFile={setFile} file={file} hasError={false} label="Upload File" />
            <Button className='w-[115px] h-[42px] mt-[42px]' onClick={() => setCurrentStep(2)}>Continue</Button>
        </div>
    )
}