'use client';

import React, { useState } from 'react';
import Dashboard from './components/dashboard';
import Reports from './components/reports';

export default function ReportAnalyticsPage() {
    const [activeTab, setActiveTab] = useState('Dashboard');

    return (
        <div className="py-3 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
                    <div>
                        <h1 className="text-[20px]/[28px] sm:text-[24px]/[32px] md:text-[30px]/[36px] font-semibold text-gray-950">Reports & Analytics</h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <button className="flex items-center justify-center px-3 sm:px-4 h-9 sm:h-10 md:h-11 border border-gray-200 rounded-[8px] text-[12px]/[16px] sm:text-[14px]/[18px] md:text-[16px]/[20px] font-medium text-gray-800 bg-transparent hover:bg-gray-50 transition-colors">
                            Import Data
                        </button>
                        <button className="flex items-center justify-center px-3 sm:px-4 h-9 sm:h-10 md:h-11 border border-gray-200 rounded-[8px] text-[12px]/[16px] sm:text-[14px]/[18px] md:text-[16px]/[20px] font-medium text-gray-800 bg-transparent hover:bg-gray-50 transition-colors">
                            Export Data
                        </button>
                        <button className="flex items-center justify-center px-3 sm:px-4 h-9 sm:h-10 md:h-11 bg-[#0D978B] text-white rounded-[8px] text-[12px]/[16px] sm:text-[14px]/[18px] md:text-[16px]/[20px] font-medium hover:bg-[#0D978B]/80 transition-colors">
                            Connect
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Tabs */}
            <div className="flex space-x-1 border-b-2 border-[#E5E7EB] mb-4 sm:mb-5 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('Dashboard')}
                    className={`px-4 sm:px-6 md:px-8 py-2 sm:py-[7px] md:py-[9px] text-[14px]/[20px] sm:text-[16px]/[24px] md:text-[18px]/[30px] font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === 'Dashboard'
                        ? 'border-[#0D978B] text-[#0D978B]'
                        : 'border-none text-[#4B4B4B] hover:text-gray-700'
                        }`}
                >
                    Dashboard
                </button>
                <button
                    onClick={() => setActiveTab('Reports')}
                    className={`px-4 sm:px-6 md:px-8 py-2 sm:py-[7px] md:py-[9px] text-[14px]/[20px] sm:text-[16px]/[24px] md:text-[18px]/[30px] font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === 'Reports'
                        ? 'border-[#0D978B] text-[#0D978B]'
                        : 'border-none text-[#4B4B4B] hover:text-gray-700'
                        }`}
                >
                    Reports
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'Dashboard' && <Dashboard />}
                {activeTab === 'Reports' && <Reports />}
            </div>
        </div>
    );
}