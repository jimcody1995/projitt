'use client';

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import Active from "./components/active";
import Completed from "./components/completed";
import Draft from "./components/draft";
import { useRouter } from "next/navigation";
export default function Performance() {
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef<{ active: HTMLDivElement | null, completed: HTMLDivElement | null, draft: HTMLDivElement | null }>({ active: null, completed: null, draft: null });
    const [activeSection, setActiveSection] = useState('active');
    const router = useRouter();

    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex w-full justify-between items-center px-[8px] py-[6px]">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[24px]/[30px] font-semibold text-[#353535]">Performance Review</p>
                </div>
                <Button className="h-[48px] px-[24px] text-[16px]/[20px] bg-[#0d978b] hover:bg-[#0b7a6f]" onClick={() => router.push('/talent-management/performance-review/create-review-cycle')}>
                    Create Review Cycle
                </Button>
            </div>

            {/* Tabs */}
            <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px] mt-[20px] w-full overflow-x-auto relative'>
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
                        ref={(el) => { tabRefs.current.active = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'active' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('active')}
                        data-testid="active-tab-button"
                    >
                        <p className='whitespace-nowrap'>Active</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.completed = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'completed' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('completed')}
                        data-testid="completed-tab-button"
                    >
                        <p className='whitespace-nowrap'>Completed</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.draft = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'draft' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('draft')}
                        data-testid="draft-tab-button"
                    >
                        <p className='whitespace-nowrap'>Draft</p>
                    </div>
                </div>
            </div>

            {/* Review Cycles */}
            <div className="mt-[24px]">
                {activeSection === 'active' && <Active />}
                {activeSection === 'completed' && <Completed />}
                {activeSection === 'draft' && <Draft />}
            </div>
        </div>
    );
}