'use client'
import { Button } from "@/components/ui/button";
import { ArrowLeft, Banknote, ChevronDown, ChevronLeft, ChevronRight, Clock, File, LogOut, User, Users } from "lucide-react";
import { useRef, useState } from "react";
import Offboarding from "./components/offboarding";

export default function Detail() {
    const [activeSection, setActiveSection] = useState<'offboarding' | 'personal-information' | 'document' | 'leave-attendance' | 'talent-management' | 'tax-payroll'>('offboarding');
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
        offboarding: null,
        'personal-information': null,
        document: null,
        'leave-attendance': null,
        'talent-management': null,
        'tax-payroll': null
    });

    const menu = [
        {
            label: 'Offboarding',
            value: 'offboarding',
            icon: LogOut
        },
        {
            label: 'Personal Information',
            value: 'personal-information',
            icon: User
        },
        {
            label: 'Document',
            value: 'document',
            icon: File
        },
        {
            label: 'Leave & Attendance',
            value: 'leave-attendance',
            icon: Clock
        },
        {
            label: 'Talent Management',
            value: 'talent-management',
            icon: Users
        },
        {
            label: 'Tax & Payroll',
            value: 'tax-payroll',
            icon: Banknote
        }
    ]
    return <div className="px-[8px] py-[6px]">
        <div className="w-full justify-between items-center flex">
            <div className="flex items-center">
                <div className="w-[24px] h-[24px] rounded-full border border-[#E9E9E9] flex justify-center items-center">
                    <ArrowLeft className="size-[12px] text-[#4B4B4B]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-full bg-[#d6eeec] text-[#0D978B] flex items-center justify-center ml-[11px]">
                    CF
                </div>
                <p className="text-[18px]/[24px] font-medium text-[#1c1c1c] pl-[17px]">Alice Fernadez</p>
                <div className="border-l border-[#D2D2D2] flex gap-[14px] pl-[24px] ml-[24px]">
                    <Button className="h-[24px]">Active</Button>
                    <p className="text-[14px]/[22px] text-[#8f8f8f]">ID: #E0001</p>
                </div>
            </div>
            <div className="flex items-center gap-[37px]">
                <div className='flex gap-[10px] items-center'>
                    <Button
                        type='button'
                        variant='outline'
                    >
                        <ChevronLeft className='size-[16px] text-[#1a1a1a]' />
                    </Button>
                    <Button
                        type='button'
                        variant='outline'
                    >
                        <ChevronRight className='size-[16px] text-[#1a1a1a]' />
                    </Button>
                    <span className='text-[14px]/[22px] text-[#1a1a1a]'>1 of 1956</span>
                </div>
                <Button className='h-[42px] text-[14px]/[22px] font-medium '>
                    Actions
                    <ChevronDown className='size-[18px] ' />
                </Button>
            </div>
        </div>
        <div className="mt-[29px]">
            <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex mt-[20px] w-full overflow-x-auto relative justify-between items-center'>
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

                    {
                        menu.map((item, index) => (
                            <div
                                key={index}
                                ref={(el) => { tabRefs.current[item.value] = el; }}
                                className={`py-[11px] px-[16px] text-[15px]/[20px] font-medium  cursor-pointer flex items-center gap-[10px] ${activeSection === item.value ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                                onClick={() => setActiveSection(item.value as 'offboarding' | 'personal-information' | 'document' | 'leave-attendance' | 'talent-management' | 'tax-payroll')}
                                data-testid="upcoming-tab-button"
                            >
                                <item.icon className='size-[20px] ' />
                                <p className='whitespace-nowrap text-center'>{item.label}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mt-[27px]">
                {activeSection === 'offboarding' && <Offboarding />}
            </div>
        </div>
    </div>;
}