'use client';

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import SuspendedTable from "./suspended-table";
import { Search } from "lucide-react";
import OnboardingTable from "./onboarding-table";
import OffboardingTable from "./offboarding-table";
import ActiveTable from "./active-table";

/**
 * @description
 * TableMode is a component that displays a table of applicant data with filtering and sorting capabilities.
 * It provides three sections: "Upcoming", "Pending", and "Past" data.
 * The table uses a dynamic column definition based on the active section. Each row includes an actions menu for rescheduling or canceling an interview.
 * The component also includes search functionality, a filter sidebar, and pagination.
 * It uses `@tanstack/react-table` for efficient data table management and provides unique `data-testid` attributes for UI test automation.
 */
export default function TableMode() {
    const [activeSection, setActiveSection] = useState<'active' | 'onboarding' | 'offboarding' | 'suspended'>('suspended');
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
        active: null,
        onboarding: null,
        offboarding: null,
        suspended: null
    });

    return (
        <div data-testid="table-mode-container">
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

                    <div
                        ref={(el) => { tabRefs.current.active = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium  cursor-pointer ${activeSection === 'active' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                        onClick={() => setActiveSection('active')}
                        data-testid="upcoming-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Active</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.onboarding = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium cursor-pointer ${activeSection === 'onboarding' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                        onClick={() => setActiveSection('onboarding')}
                        data-testid="pending-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Onboarding</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.offboarding = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium  cursor-pointer ${activeSection === 'offboarding' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                        onClick={() => setActiveSection('offboarding')}
                        data-testid="past-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Offboarding</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.past = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium cursor-pointer ${activeSection === 'suspended' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535]'}`}
                        onClick={() => setActiveSection('suspended')}
                        data-testid="past-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Suspended</p>
                    </div>
                </div>
                <div className="relative">
                    <Search
                        className="size-[16px] text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                        data-testid="search-icon"
                        id="search-icon"
                    />
                    <Input
                        placeholder="Search data"
                        className="ps-9 w-[173px] h-[32px]"
                        data-testid="search-input"
                        id="search-input"
                    />
                </div>
            </div>
            {activeSection === 'active' && <ActiveTable />}
            {activeSection === 'suspended' && <SuspendedTable />}
            {activeSection === 'onboarding' && <OnboardingTable />}
            {activeSection === 'offboarding' && <OffboardingTable />}
        </div>
    );
}
