'use client'
import dynamic from 'next/dynamic';
import { useState } from "react";

// Dynamically import PdfViewer to avoid SSR issues
const PdfViewer = dynamic(() => import("@/components/ui/pdf-viewer"), {
    ssr: false,
    loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse flex items-center justify-center">
        <span className="text-gray-500">Loading PDF viewer...</span>
    </div>
});


export default function Resume({ applicantDetails }: { applicantDetails: any }) {
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
                    {activeTab === 'resume' && <PdfViewer url={applicantDetails?.cv_media?.base_url + applicantDetails?.cv_media?.medium_size} />}
                    {activeTab === 'cover-letter' && <PdfViewer url={applicantDetails?.cover_media?.base_url + applicantDetails?.cover_media?.medium_size} />}
                </div>
            </div>
        </div>
    );
}