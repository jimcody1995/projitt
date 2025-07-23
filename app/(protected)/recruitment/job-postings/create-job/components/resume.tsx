'use client'
import { useState } from "react";
import FileDropUpload from "./file-drop-upload";

export default function Resume() {
    const [resume, setResume] = useState<File | null>(null)
    const [otherDocuments, setOtherDocuments] = useState<File | null>(null)
    return (
        <div>
            <p className="text-[#a5a5a5] text-[16px]/[24px]">All applicants are required to upload a resume or CV before proceeding. This step is locked and cannot be modified.</p>
            <div className="mt-[19px]">
                <FileDropUpload
                    label="Resume"
                    setFile={setResume}
                    file={resume}
                />
                <FileDropUpload
                    label="Other documents"
                    setFile={setOtherDocuments}
                    file={otherDocuments}
                />
            </div>
        </div>
    );
}