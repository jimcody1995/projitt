'use client'
import PdfViewer from "@/components/ui/pdf-viewer";
import { useState } from "react";


export default function Resume() {
    const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter'>('resume');
    return (
        <div>
            <div className="flex flex-col items-start">
                <div className="flex items-center bg-[#e9e9e9] rounded-[6px] p-[2px]">
                    <div className={`w-[131px] h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer ${activeTab === 'resume' ? 'bg-[#0d978b] text-white' : 'text-[#a5a5a5]'}`} onClick={() => setActiveTab('resume')} >
                        <p className="text-[14px]/[22px] font-medium ">Resume</p>
                    </div>
                    <div className={`w-[131px] h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer ${activeTab === 'cover-letter' ? 'bg-[#0d978b] text-white' : 'text-[#a5a5a5]'}`} onClick={() => setActiveTab('cover-letter')}>
                        <p className="text-[14px]/[22px] font-medium ">Cover Letter</p>
                    </div>
                </div>
                <div className="w-full mt-[23px]">
                    {activeTab === 'resume' && <PdfViewer url="/1.pdf" />}
                    {activeTab === 'cover-letter' && <PdfViewer url="/cover-letter.pdf" />}
                </div>
            </div>
        </div>
    );
}