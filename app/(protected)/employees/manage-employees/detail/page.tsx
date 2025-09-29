'use client'
import { Button } from "@/components/ui/button";
import { ArrowLeft, Banknote, ChevronDown, ChevronLeft, ChevronRight, Clock, File, LogOut, User, Users } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Offboarding from "./components/offboarding";
import PersonalInfomation from "./components/personalInfomation";
import Documents from "./components/documents";
import LeaveAttendence from "./components/leave-attendence";
import TalentManagement from "./components/talent-management";
import TaxPayroll from "./components/tax-payroll";
import { useRouter } from "next/navigation";

export default function Detail() {
    const [activeSection, setActiveSection] = useState<'offboarding' | 'personal-information' | 'document' | 'leave-attendance' | 'talent-management' | 'tax-payroll'>('offboarding');
    const router = useRouter();
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0
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

    // Update indicator position when active section changes
    useEffect(() => {
        const activeTab = tabRefs.current[activeSection];
        if (activeTab) {
            const container = activeTab.parentElement;
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const tabRect = activeTab.getBoundingClientRect();
                setIndicatorStyle({
                    left: tabRect.left - containerRect.left,
                    width: tabRect.width
                });
            }
        }
    }, [activeSection]);

    return <div className="px-[8px] py-[6px]">
        <div className="w-full justify-between items-center flex md:flex-row flex-col gap-[10px]">
            <div className="flex items-center">
                <div className="w-[24px] h-[24px] rounded-full border border-[#E9E9E9] flex justify-center items-center cursor-pointer" onClick={() => router.push('/employees/manage-employees')}>
                    <ArrowLeft className="size-[12px] text-[#4B4B4B]" />
                </div>
                <div className="w-[40px] h-[40px] rounded-full bg-[#d6eeec] text-[#0D978B] flex items-center justify-center ml-[11px]">
                    CF
                </div>
                <p className="text-[18px]/[24px] font-medium text-[#1c1c1c] pl-[17px]">Alice Fernadez</p>
                <div className="border-l border-[#D2D2D2] flex gap-[14px] pl-[24px] ml-[24px] sm:flex-row flex-col">
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
                <div className="flex items-center gap-[12px] relative">
                    <div
                        className="absolute bottom-0 h-[2px] bg-[#0d978b] transition-all duration-300 ease-in-out"
                        style={{
                            left: `${indicatorStyle.left}px`,
                            width: `${indicatorStyle.width}px`
                        }}
                    />

                    {
                        menu.map((item, index) => (
                            <div
                                key={index}
                                ref={(el) => { tabRefs.current[item.value] = el; }}
                                className={`py-[11px] px-[16px] text-[15px]/[20px] font-medium cursor-pointer flex items-center gap-[10px] transition-colors duration-200 ${activeSection === item.value ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                                onClick={() => setActiveSection(item.value as 'offboarding' | 'personal-information' | 'document' | 'leave-attendance' | 'talent-management' | 'tax-payroll')}
                                data-testid={`${item.value}-tab-button`}
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
                {activeSection === 'personal-information' && <PersonalInfomation />}
                {activeSection === 'document' && <Documents />}
                {activeSection === 'leave-attendance' && <LeaveAttendence />}
                {activeSection === 'talent-management' && <TalentManagement />}
                {activeSection === 'tax-payroll' && <TaxPayroll />}
            </div>
        </div>
    </div>;
}