'use client'
import { useState } from "react";
import Approved from "./components/approved";
import Pending from "./components/pending";
import Onboarding from "./components/onboarding";
export default function PendingHires() {
    const [activeSection, setActiveSection] = useState<'approved' | 'pending'>('approved');
    const [onboarding, setOnboarding] = useState<any>(null);
    return <div>
        {onboarding !== null ? <Onboarding setOnboarding={setOnboarding} /> :
            <>
                <p className="text-[24px]/[30px] font-semibold text-[#1C1C1C]">Pending Hires</p>
                <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  mt-[20px] w-full overflow-x-auto'>
                    <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'approved' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('approved')}>
                        <p className='whitespace-nowrap'>Approved</p>
                        <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]'>12</span>
                    </div>
                    <div className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'pending' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('pending')}>
                        <p className='whitespace-nowrap'>Pending Approval</p>
                        <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]'>12</span>
                    </div>
                </div>
                <div className="mt-[15px]">
                    {activeSection === 'approved' && <Approved setOnboarding={setOnboarding} />}
                    {activeSection === 'pending' && <Pending />}
                </div>
            </>
        }
    </div>;
}