'use client';

import { Briefcase, PieChart } from "lucide-react";
import { useRef, useState } from "react";
import Offer from "./components/offer";
import Forms from "./components/forms";
import Traning from "./components/traning";
import Checklist from "./components/checklist";

export default function Profile() {
    const [activeSection, setActiveSection] = useState<'offer' | 'forms' | 'training' | 'checklist'>('offer');
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
        offer: null,
        forms: null,
        training: null,
        checklist: null
    });
    return <div>
        <div className="flex w-full justify-between items-center px-[8px] py-[6px]">
            <div className="flex flex-col gap-[4px]">
                <p className="text-[12px]/[20px] text-[#A5A5A5]">Onboarding <span className="text-[#0d978b]">/ Profile</span></p>
                <p className="text-[24px]/[30px] font-semibold text-[#353535]">Profile</p>
            </div>
            <div className="w-[129px] h-[42px] rounded-[8px] bg-[#D6EEEC] overflow-hidden relative flex itmes-center justify-center">
                <div className="absolute top-0 left-0 h-[42px] bg-[#0D978B]" style={{
                    width: `25%`
                }}></div>
                <div className="flex items-center justify-center">
                    <p className="text-[14px]/[20px] font-semibold text-[#053834] relative">25% complete</p>
                </div>
            </div>
        </div>
        <div className="mt-[33px] w-full rounded-[20px]  bg-white border border-[#e9e9e9] py-[23px] px-[28px] flex justify-between items-center">
            <div className=" flex gap-[17px] items-center">
                <div className="w-[60px] h-[60px] rounded-full bg-[#D6EEEC] flex items-center justify-center">
                    <p className="text-[17px]/[31px] text-[#053834]">CF</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[22px]/[30px] font-semibold text-[#053834]">Alice Fernadez</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B]">Senior Data Analyst ~ Chicago, USA</p>
                    <div className="flex gap-[15px] items-center">
                        <div className="flex gap-[2px] items-center">
                            <PieChart className="size-[16px] text-[#00D47D]" />
                            <p className="text-[14px]/[22px] text-[#4B4B4B]">Data</p>
                        </div>
                        <div className="flex gap-[2px] items-center">
                            <Briefcase className="size-[16px] text-[#4B4B4B]" />
                            <p className="text-[14px]/[22px] text-[#4B4B4B]">Fulltime</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[4px]">
                <p className="text-[14px]/[22px] text-[#787878] text-right">Team: <span className="text-[#353535]">Project Falcon Task</span></p>
                <p className="text-[14px]/[22px] text-[#787878] text-right">Manager: <span className="text-[#353535]">John Dauda</span></p>
            </div>

        </div>
        <div className='border-b  border-[#e9e9e9] pl-[15px] pt-[9px] flex mt-[27px] w-full overflow-x-auto relative justify-between items-center'>
            {/* Sliding underline */}
            <div className="flex items-center gap-[12px]">
                <div
                    className="absolute bottom-0 h-[2px] bg-[#0d978b] transition-all duration-300 ease-in-out"
                    style={{
                        left: tabRefs.current[activeSection]?.offsetLeft ?
                            `${tabRefs.current[activeSection]!.offsetLeft - 15}px` : '0px',
                        width: tabRefs.current[activeSection]?.offsetWidth ?
                            `${tabRefs.current[activeSection]!.offsetWidth}px` : '0px'
                    }}
                />

                <div
                    ref={(el) => { tabRefs.current.active = el; }}
                    className={`py-[18px] px-[52px] text-[15px]/[20px] font-medium  cursor-pointer ${activeSection === 'offer' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                    onClick={() => setActiveSection('offer')}
                    data-testid="upcoming-tab-button"
                >
                    <p className='whitespace-nowrap text-center'>Offer & Documents</p>
                </div>
                <div
                    ref={(el) => { tabRefs.current.onboarding = el; }}
                    className={`py-[18px] px-[52px] text-[15px]/[20px] font-medium cursor-pointer ${activeSection === 'forms' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                    onClick={() => setActiveSection('forms')}
                    data-testid="pending-tab-button"
                >
                    <p className='whitespace-nowrap text-center'>Forms & Personal Info</p>
                </div>
                <div
                    ref={(el) => { tabRefs.current.offboarding = el; }}
                    className={`py-[18px] px-[52px] text-[15px]/[20px] font-medium  cursor-pointer ${activeSection === 'training' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                    onClick={() => setActiveSection('training')}
                    data-testid="past-tab-button"
                >
                    <p className='whitespace-nowrap text-center'>Training </p>
                </div>
                <div
                    ref={(el) => { tabRefs.current.past = el; }}
                    className={`py-[18px] px-[52px] text-[15px]/[20px] font-medium cursor-pointer ${activeSection === 'checklist' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                    onClick={() => setActiveSection('checklist')}
                    data-testid="past-tab-button"
                >
                    <p className='whitespace-nowrap text-center'>Checklist</p>
                </div>
            </div>
        </div>
        <div className="mt-[34px]">
            {activeSection === 'offer' && <Offer />}
            {activeSection === 'forms' && <Forms />}
            {activeSection === 'training' && <Traning />}
            {activeSection === 'checklist' && <Checklist />}
        </div>
    </div>;
}