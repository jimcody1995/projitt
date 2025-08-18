'use client';

import React, { useEffect, useState } from 'react';
import CalendarMode from "./components/calendar-mode";
import TableMode from "./components/table-mode";
import Detail from "../applications/components/detail";
import { getInterviews } from '@/api/interviews';

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
    const [interviews, setInterviews] = useState<any[]>([]);
    /**
     * @description
     * This function is a callback for the `Detail` dialog's `onOpenChange` prop.
     * When the dialog is closed, this function resets the `selectedApplication` state to `null`,
     * which in turn closes the dialog.
     */
    const handleOpenChange = (open: boolean) => {
        setSelectedApplication(null);
    };
    const getData = async () => {
        try {
            const response = await getInterviews({});
            setInterviews(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return <div>
        <div className="flex justify-between w-full sm:flex-row flex-col items-start gap-[10px]">
            <p className="text-[24px]/[30px] font-semibold text-[#1C1C1C]">Interviews</p>
            <div className="flex items-center bg-[#e9e9e9] rounded-[6px] p-[2px] relative">
                {/* Animated background slider */}
                <div
                    className={`absolute top-[2px] h-[42px] w-[131px] bg-[#0d978b] rounded-[6px] transition-all duration-300 ease-in-out transform ${activeTab === 'calendar' ? 'translate-x-0' : 'translate-x-[131px]'
                        }`}
                />
                <div
                    className={`relative w-[131px] h-[42px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${activeTab === 'calendar' ? 'text-white' : 'text-[#a5a5a5]'
                        }`}
                    onClick={() => setActiveTab('calendar')}
                >
                    <p className="text-[14px]/[22px] font-medium transition-all duration-300 ease-in-out">Calendar</p>
                </div>
                <div
                    className={`relative w-[131px] h-[42px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${activeTab === 'table' ? 'text-white' : 'text-[#a5a5a5]'
                        }`}
                    onClick={() => setActiveTab('table')}
                >
                    <p className="text-[14px]/[22px] font-medium transition-all duration-300 ease-in-out">Table</p>
                </div>
            </div>
        </div>
        <div>
            <div className="mt-[15px]" data-testid="interviews-content">
                {interviews && activeTab === 'calendar' && <CalendarMode interviews={interviews} setSelectedApplication={setSelectedApplication} data-testid="calendar-mode-component" />}
                {activeTab === 'table' && <TableMode interviews={interviews} setSelectedApplication={setSelectedApplication} data-testid="table-mode-component" />}
            </div>
            <Detail
                open={selectedApplication !== null}
                selectedApplication={selectedApplication}
                onOpenChange={handleOpenChange}
                data-testid="detail-dialog"
                getData={getData}
            />
        </div>
    </div>

}
