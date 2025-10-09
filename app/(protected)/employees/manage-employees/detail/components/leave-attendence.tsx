'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Attendence from './attendence';
import Leave from './leave';
import Exceptions from './exceptions';

export default function LeaveAttendence() {
    const [activeTab, setActiveTab] = useState<'attendance' | 'leave' | 'exceptions'>('attendance');
    const [currentDateRange] = useState('Mar 1 - Apr 1, 2025');

    // Sample attendance data


    return (
        <div className="w-full flex flex-col items-start">
            {/* Tab Navigation */}
            <div className="w-full md:justify-between items-start flex md:flex-row flex-col gap-[10px]">
                <div className="flex items-center gap-0 mb-6 bg-[#e9e9e9] rounded-lg cursor-pointer">
                    <button
                        onClick={() => setActiveTab('attendance')}
                        className={`px-4 py-2 text-sm font-medium w-[108px] rounded-lg cursor-pointer transition-colors ${activeTab === 'attendance'
                            ? 'bg-[#0D978B] text-white'
                            : 'text-[#8F8F8F] hover:text-gray-800'
                            }`}
                    >
                        Attendance
                    </button>
                    <button
                        onClick={() => setActiveTab('leave')}
                        className={`px-4 py-2 text-sm font-medium w-[108px] rounded-lg cursor-pointer transition-colors ${activeTab === 'leave'
                            ? 'bg-[#0D978B] text-white'
                            : 'text-[#8F8F8F] hover:text-gray-800'
                            }`}
                    >
                        Leave
                    </button>
                    <button
                        onClick={() => setActiveTab('exceptions')}
                        className={`px-4 py-2 text-sm font-medium w-[108px] rounded-lg cursor-pointer transition-colors ${activeTab === 'exceptions'
                            ? 'bg-[#0D978B] text-white'
                            : 'text-[#8F8F8F] hover:text-gray-800'
                            }`}
                    >
                        Exceptions
                    </button>
                </div>

                {/* Date Range Selector */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {/* Previous month logic */ }}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium text-gray-700 min-w-[180px] text-center">
                            {currentDateRange}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {/* Next month logic */ }}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Attendance Metrics */}
            {activeTab === 'attendance' && <Attendence />}
            {activeTab === 'leave' && <Leave />}
            {activeTab === 'exceptions' && <Exceptions />}
        </div>
    );
}