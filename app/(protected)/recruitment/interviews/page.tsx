'use client'
import { useState } from "react";
import CalendarMode from "./components/calendar-mode";
import TableMode from "./components/table-mode";
import Detail from "../applications/[id]/components/detail";

export default function Interviews() {
    const [activeTab, setActiveTab] = useState<'calendar' | 'table'>('calendar');
    const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
    const handleOpenChange = (open: boolean) => {
        setSelectedApplication(null);
    };
    return <div>
        <div className="flex justify-between w-full">
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
        <div className="mt-[15px]">
            {activeTab === 'calendar' && <CalendarMode setSelectedApplication={setSelectedApplication} />}
            {activeTab === 'table' && <TableMode setSelectedApplication={setSelectedApplication} />}
        </div>
        <Detail
            open={selectedApplication !== null}
            onOpenChange={handleOpenChange}
        />
    </div>;
}