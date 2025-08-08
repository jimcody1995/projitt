'use client';

import React, { useState } from 'react';
import CalendarMode from "./components/calendar-mode";
import TableMode from "./components/table-mode";
import Detail from "../applications/[id]/components/detail";

/**
 * @description
 * The `Interviews` component serves as a main dashboard for managing job interviews. 
 * It allows users to switch between a calendar view (`CalendarMode`) and a table view (`TableMode`) of their scheduled interviews. 
 * The component maintains the state for the active view and the currently selected application,
 * and it displays a `Detail` dialog when an application is selected.
 * Unique `data-testid` attributes have been added to all key interactive elements for UI test automation.
 */
export default function Interviews() {
    const [activeTab, setActiveTab] = useState<'calendar' | 'table'>('calendar');
    const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

    /**
     * @description
     * This function is a callback for the `Detail` dialog's `onOpenChange` prop.
     * When the dialog is closed, this function resets the `selectedApplication` state to `null`,
     * which in turn closes the dialog.
     */
    const handleOpenChange = (open: boolean) => {
        setSelectedApplication(null);
    };
    return <div>
        <div className="flex justify-between w-full sm:flex-row flex-col items-start gap-[10px]">
            <p className="text-[24px]/[30px] font-semibold text-[#1C1C1C]">Interviews</p>
            <div className="flex items-center bg-[#e9e9e9] rounded-[6px] p-[2px]">
                <div className={`w-[131px] h-[42px] rounded-[6px] flex items-center justify-center cursor-pointer ${activeTab === 'calendar' ? 'bg-[#0d978b] text-white' : 'text-[#a5a5a5]'}`} onClick={() => setActiveTab('calendar')} >
                    <p className="text-[14px]/[22px] font-medium ">Calendar</p>
                </div>
                <div className={`w-[131px] h-[42px] rounded-[6px] flex items-center justify-center cursor-pointer ${activeTab === 'table' ? 'bg-[#0d978b] text-white' : 'text-[#a5a5a5]'}`} onClick={() => setActiveTab('table')}>
                    <p className="text-[14px]/[22px] font-medium ">Table</p>
                </div>
            </div>
        </div>
        <div>
            <div className="mt-[15px]" data-testid="interviews-content">
                {activeTab === 'calendar' && <CalendarMode setSelectedApplication={setSelectedApplication} data-testid="calendar-mode-component" />}
                {activeTab === 'table' && <TableMode setSelectedApplication={setSelectedApplication} data-testid="table-mode-component" />}
            </div>
            <Detail
                open={selectedApplication !== null}
                onOpenChange={handleOpenChange}
                data-testid="detail-dialog"
            />
        </div>
    </div>

}
