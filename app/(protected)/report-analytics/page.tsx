'use client';

import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import {
    DownloadIcon,
    UploadIcon
} from 'lucide-react';

export default function ReportAnalyticsPage() {
    const [activeTab, setActiveTab] = useState('Dashboard');

    return (
        <div className="py-3 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-[30px]/[36px] font-semibold text-gray-950">Reports & Analytics</h1>

                    </div>

                    <div className="flex space-x-3">
                        <button className="flex items-center px-4 h-11 border border-gray-200 rounded-[8px] text-[16px]/[20px] font-medium text-gray-800 bg-transparent hover:bg-gray-50 transition-colors">
                            Import Data
                        </button>
                        <button className="flex items-center px-4 h-11 border border-gray-200 rounded-[8px] text-[16px]/[20px] font-medium text-gray-800 bg-transparent hover:bg-gray-50 transition-colors">
                            Export Data
                        </button>
                        <button className="flex items-center px-4 h-11 bg-[#0D978B] text-white rounded-[8px] text-[16px]/[20px] font-medium hover:bg-[#0D978B]/80 transition-colors">
                            Connect
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Tabs */}
            <div className="flex space-x-1 border-b-2 border-[#E5E7EB] mb-5">
                <button
                    onClick={() => setActiveTab('Dashboard')}
                    className={`px-8 py-[9px] text-[18px]/[30px] font-medium border-b-2 transition-colors ${activeTab === 'Dashboard'
                        ? 'border-[#0D978B] text-[#0D978B]'
                        : 'border-none text-[#4B4B4B] hover:text-gray-700'
                        }`}
                >
                    Dashboard
                </button>
                <button
                    onClick={() => setActiveTab('Reports')}
                    className={`px-8 py-[9px] text-[18px]/[30px] font-medium border-b-2 transition-colors ${activeTab === 'Reports'
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
                {activeTab === 'Reports' && (
                    <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports Tab</h3>
                        <p className="text-gray-500">Reports content will be implemented here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}