'use client';

import { useState, useRef, useEffect } from "react";
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
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0
    });

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

    return (
        <div data-testid="table-mode-container">
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

                    <div
                        ref={(el) => { tabRefs.current.active = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium cursor-pointer transition-colors duration-200 ${activeSection === 'active' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('active')}
                        data-testid="active-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Active</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.onboarding = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium cursor-pointer transition-colors duration-200 ${activeSection === 'onboarding' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('onboarding')}
                        data-testid="onboarding-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Onboarding</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.offboarding = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium cursor-pointer transition-colors duration-200 ${activeSection === 'offboarding' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('offboarding')}
                        data-testid="offboarding-tab-button"
                    >
                        <p className='whitespace-nowrap text-center'>Offboarding</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.suspended = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium cursor-pointer transition-colors duration-200 ${activeSection === 'suspended' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('suspended')}
                        data-testid="suspended-tab-button"
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
