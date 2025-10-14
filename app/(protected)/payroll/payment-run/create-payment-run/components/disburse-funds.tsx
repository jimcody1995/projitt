"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Printer } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DisburseFundsProps {
    onBack: () => void;
    onComplete: () => void;
}

const activityLogData = [
    {
        id: 1,
        title: "Created Payroll Run",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    },
    {
        id: 2,
        title: "Imported Attendance",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    },
    {
        id: 3,
        title: "Resolved Validation Issue",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    },
    {
        id: 4,
        title: "Revalidated Employee",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    },
    {
        id: 5,
        title: "Resolved Validation Issue",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    }
];

export default function DisburseFunds({ onBack, onComplete }: DisburseFundsProps) {
    const [showActivityLog, setShowActivityLog] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const popupRef = useRef<HTMLDivElement>(null);

    const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Get click position relative to viewport
        const x = e.clientX;
        const y = e.clientY;

        setPosition({ x, y });
        setShowActivityLog(true);
    };

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowActivityLog(false);
            }
        };

        if (showActivityLog) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showActivityLog]);

    return (
        <div className="w-full">
            <h2 className="text-[16px] sm:text-[18px]/[24px] font-medium text-[#353535] mb-[30px] sm:mb-[42px]">
                Disburse Funds
            </h2>

            <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[16px] p-[32px] sm:py-[62px] sm:px-[48px] relative"
                onClick={handleGridClick}>
                {/* Grid Layout */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-y-[40px] sm:gap-y-[60px] gap-x-[40px] cursor-pointer"
                >
                    {/* Row 1 - Employees */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            125
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Employees
                        </div>
                    </div>

                    {/* Row 1 - Pay Period */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            Mar 25th - Mar 26th
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Pay period
                        </div>
                    </div>

                    {/* Row 2 - Gross Pay (Left) */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            $231,450.50
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Gross Pay
                        </div>
                    </div>

                    {/* Row 2 - Gross Pay (Right) */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            $231,450.50
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Gross Pay
                        </div>
                    </div>

                    {/* Row 3 - Total Deductions */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            $11,450.50
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Total Deductions
                        </div>
                    </div>

                    {/* Row 3 - Net Pay */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#0D978B] mb-[3px]">
                            $231,450.50
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Net Pay
                        </div>
                    </div>
                </div>

                {/* Activity Log Popup */}
                {showActivityLog && (
                    <div
                        ref={popupRef}
                        style={{
                            position: 'fixed',
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            zIndex: 1000
                        }}
                        className="bg-white border border-[#E9E9E9] shadow-xl rounded-[12px] w-[389px] h-[531px] flex flex-col"
                    >
                        {/* Header */}
                        <div className="px-[24px] pt-[24px] pb-[16px] flex-shrink-0 border-b border-[#E9E9E9]">
                            <h3 className="text-[14px]/[18px] font-medium text-gray-800">
                                Activity Log
                            </h3>
                        </div>

                        {/* Activity List with Timeline */}
                        <div className="flex-1 overflow-y-auto p-[24px]">
                            <div className="relative">
                                {activityLogData.map((activity, index) => (
                                    <div
                                        key={activity.id}
                                        className="relative pb-[8px] last:pb-0"
                                    >
                                        {/* Timeline container */}
                                        <div className="flex gap-[8px] h-fit">
                                            {/* Timeline - Left side stepper */}
                                            <div className="relative flex flex-col items-center flex-shrink-0">
                                                {/* Teal dot indicator */}
                                                <div className="w-[14px] h-[14px] bg-[#0D978B] rounded-full z-10 flex-shrink-0"></div>

                                                {/* Connecting line */}
                                                {index !== activityLogData.length - 1 && (
                                                    <div className="w-[1px] h-[60px] bg-[#D9D9D9] mt-[8px]"></div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                {/* Title */}
                                                <div className="text-[14px]/[16px] font-medium text-[#4B4B4B] mb-[4px]">
                                                    {activity.title}
                                                </div>

                                                {/* User Info */}
                                                <div className="flex items-center gap-[4px] mb-[4px]">
                                                    <Avatar className="h-[20px] w-[20px]">
                                                        <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[8px] font-medium">
                                                            {activity.initials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-[12px]/[18px] text-[#353535]">
                                                        {activity.user}
                                                    </span>
                                                </div>

                                                {/* Date */}
                                                <div className="text-[10px]/[12px] text-[#A5A5A5]">
                                                    {activity.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

