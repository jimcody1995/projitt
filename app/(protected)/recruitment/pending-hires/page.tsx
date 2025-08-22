'use client';

import React, { useState, useRef, useEffect } from "react";
import Approved from "./components/approved";
import Pending from "./components/pending";
import Onboarding from "./components/onboarding";

/**
 * @description
 * PendingHires is a top-level component that acts as a dashboard for managing job applicants who have been approved for hiring or are pending approval.
 * It features two main tabs: "Approved" and "Pending Approval," which display corresponding lists of candidates.
 * The component also manages a state to conditionally render an `Onboarding` screen when a specific approved candidate is selected, allowing for the initiation of their onboarding process.
 * All key interactive elements and sections are annotated with unique `data-testid` and `id` attributes to support UI test automation.
 */
export default function PendingHires() {
    const [activeSection, setActiveSection] = useState<'approved' | 'pending'>('approved');
    const [onboarding, setOnboarding] = useState<any>(null);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Update underline position when activeSection changes
    useEffect(() => {
        const activeTab = tabRefs.current[activeSection];
        if (activeTab) {
            const rect = activeTab.getBoundingClientRect();
            const containerRect = tabRefs.current.container?.getBoundingClientRect();
            if (containerRect) {
                setUnderlineStyle({
                    left: rect.left - containerRect.left,
                    width: rect.width
                });
            }
        }
    }, [activeSection]);

    return (
        <div data-testid="pending-hires-container" id="pending-hires-container">
            {onboarding !== null ? (
                <Onboarding setOnboarding={setOnboarding} data-testid="onboarding-component" />
            ) : (
                <div data-testid="pending-hires-main-content">
                    <p className="text-[24px]/[30px] font-semibold text-[#1C1C1C]" data-testid="page-title" id="page-title">Pending Hires</p>
                    <div
                        className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px] mt-[20px] w-full overflow-x-auto relative'
                        data-testid="section-tabs"
                        id="section-tabs"
                        ref={(el) => { tabRefs.current.container = el; }}
                    >
                        {/* Animated underline */}
                        <div
                            className="absolute bottom-0 h-[2px] bg-[#0d978b] transition-all duration-300 ease-in-out"
                            style={{
                                left: `${underlineStyle.left}px`,
                                width: `${underlineStyle.width}px`
                            }}
                            data-testid="tab-underline"
                        />
                        <div
                            ref={(el) => { tabRefs.current.approved = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'approved' ? 'text-[#0d978b]' : 'text-[#353535]'}`}
                            onClick={() => setActiveSection('approved')}
                            data-testid="approved-tab-button"
                            id="approved-tab-button"
                        >
                            <p className='whitespace-nowrap' data-testid="approved-tab-text">Approved</p>
                            <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]' data-testid="approved-count">12</span>
                        </div>
                        <div
                            ref={(el) => { tabRefs.current.pending = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'pending' ? 'text-[#0d978b]' : 'text-[#353535]'}`}
                            onClick={() => setActiveSection('pending')}
                            data-testid="pending-tab-button"
                            id="pending-tab-button"
                        >
                            <p className='whitespace-nowrap' data-testid="pending-tab-text">Pending Approval</p>
                            <span className='w-[26px] h-[26px] rounded-full bg-[#d6eeec] text-[12px]/[22px] flex items-center justify-center text-[#0d978b]' data-testid="pending-count">12</span>
                        </div>
                    </div>
                    <div className="mt-[15px]" data-testid="content-area" id="content-area">
                        {activeSection === 'approved' && <Approved setOnboarding={setOnboarding} data-testid="approved-component" />}
                        {activeSection === 'pending' && <Pending data-testid="pending-component" />}
                    </div>
                </div>
            )}
        </div>
    );
}
