'use client';
import { Import } from "lucide-react";
import { useState, useRef } from "react";
import Leadership from "./leadership";

export default function Criteria() {
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef<{ leadership: HTMLDivElement | null, teamwork: HTMLDivElement | null, communication: HTMLDivElement | null, competence: HTMLDivElement | null }>({ leadership: null, teamwork: null, communication: null, competence: null });
    const [activeTab, setActiveTab] = useState('leadership');
    return (
        <div>
            <div className="w-full justify-between items-center flex">
                <button className="flex items-center gap-2 text-[#0d978b] text-[14px]/[16px]">
                    <img src="/images/icons/ai-line.png" alt="AI icon" className="h-[20px] w-[20px]" />
                    Generate Questions
                </button>
                <button className="flex items-center gap-2 text-[#0d978b] text-[14px]/[16px]">
                    <Import className="h-[20px] w-[20px]" />
                    Import Questions
                </button>
            </div>
            <div className="w-full border border-[#e9e9e9] bg-white rounded-[12px] mt-[20px]">
                <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  w-full overflow-x-auto relative'>
                    {/* Sliding underline */}
                    <div className="flex items-center gap-[12px] relative">
                        <div
                            className="absolute bottom-0 h-[2px] bg-[#0d978b] transition-all duration-300 ease-in-out"
                            style={{
                                left: `${indicatorStyle.left}px`,
                                width: `${indicatorStyle.width}px`
                            }}
                        />

                        <div
                            ref={(el) => { tabRefs.current.leadership = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'leadership' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                            onClick={() => setActiveTab('leadership')}
                            data-testid="active-tab-button"
                        >
                            <p className='whitespace-nowrap'>Leadership</p>
                        </div>
                        <div
                            ref={(el) => { tabRefs.current.teamwork = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'teamwork' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                            onClick={() => setActiveTab('teamwork')}
                            data-testid="completed-tab-button"
                        >
                            <p className='whitespace-nowrap'>Teamwork</p>
                        </div>
                        <div
                            ref={(el) => { tabRefs.current.communication = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'communication' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                            onClick={() => setActiveTab('communication')}
                            data-testid="draft-tab-button"
                        >
                            <p className='whitespace-nowrap'>Communication</p>
                        </div>
                        <div
                            ref={(el) => { tabRefs.current.competence = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'competence' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                            onClick={() => setActiveTab('competence')}
                            data-testid="draft-tab-button"
                        >
                            <p className='whitespace-nowrap'>Competence</p>
                        </div>
                    </div>
                </div>
                {activeTab === "leadership" && <Leadership />}
            </div>
        </div>
    )
}