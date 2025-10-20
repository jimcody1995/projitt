'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Report {
    id: string;
    title: string;
    description: string;
}

const favoriteReports: Report[] = [
    {
        id: 'balance-sheet-favorite',
        title: 'Balance Sheet',
        description: 'What you own (assets), what you owe (liabilities), and what you invested (equity)'
    },
    {
        id: 'accounts-payable-ageing',
        title: 'Accounts payable ageing summary',
        description: 'Unpaid balances for each customer, grouped by days past due.'
    }
];

const businessReports: Report[] = [
    {
        id: 'audit-log',
        title: 'Audit Log',
        description: 'Shows everything that has happened in your company file so you always know who\'s been in Q...'
    },
    {
        id: 'balance-sheet',
        title: 'Balance Sheet',
        description: 'What you own (assets), what you owe (liabilities), and what you invested (equity).'
    },
    {
        id: 'balance-sheet-comparison',
        title: 'Balance Sheet Comparison',
        description: 'What you own (assets), what you owe (liabilities), and what you invested (equity) compared to last y...'
    },
    {
        id: 'balance-sheet-detail',
        title: 'Balance Sheet Detail',
        description: 'A detailed view of what you own (assets), what you owe (liabilities), and what you invested (equity)...'
    },
    {
        id: 'cash-flows',
        title: 'Statement of Cash Flows',
        description: 'Cash flowing in and out from sales and expenses (operating activities), investments, and financing...'
    },
    {
        id: 'equity-changes',
        title: 'Statement of Changes in Equity',
        description: 'Statement of changes in equity.'
    },
    {
        id: 'profit-loss',
        title: 'Profit and Loss',
        description: 'Your income, expenses, and net income (profit or loss). Also called an income statement.'
    },
    {
        id: 'profit-loss-ytd',
        title: 'Profit and Loss YTD Comparison',
        description: 'Your income, expenses, and net income (profit or loss) compared to this year so far.'
    },
    {
        id: 'quarterly-profit-loss',
        title: 'Quarterly Profit and Loss Summary',
        description: 'A summary of your income, expenses, and net income (profit or loss) by quarter.'
    }
];

export default function Reports() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredFavoriteReports = favoriteReports.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBusinessReports = businessReports.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ReportCard = ({ report }: { report: Report }) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsDropdownOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        const toggleDropdown = () => {
            setIsDropdownOpen(!isDropdownOpen);
        };

        return (
            <div className="flex flex-col items-start relative rounded-[8px] border border-gray-200 p-4 sm:p-5">
                <div className="flex justify-between w-full mb-2 gap-2">
                    <h3 className="text-[15px]/[22px] sm:text-[16px]/[24px] font-medium text-black truncate">
                        {report.title}
                    </h3>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <MoreVertical className="w-3 h-3 text-[#292929] cursor-pointer" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-[8px] shadow-lg z-10 min-w-[160px] sm:min-w-[178px] shadow-bottom">
                                <div className="py-1">

                                    <button
                                        className="w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => {
                                            router.push(`/report-analytics/reports/${report.id}`);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        View report
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => {
                                            console.log('Customize clicked for:', report.title);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        Customize
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-[#A5A5A5] text-[13px]/[18px] sm:text-[14px]/[20px] mb-6 leading-relaxed line-clamp-2">
                    {report.description}
                </p>
                <button
                    className="flex mt-auto bg-gray-200 hover:bg-gray-150 text-[#353535] font-semibold text-[12px]/[16px] sm:text-[13px]/[18px] rounded-[8px] py-2 px-3 sm:px-4 transition-colors cursor-pointer"
                    onClick={() => router.push(`/report-analytics/reports/${report.id}`)}
                >
                    View Report
                </button>
            </div>
        );
    };

    return (
        <div className="space-y-5">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 h-10 sm:h-11 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D978B] focus:border-transparent"
                />
            </div>

            {/* Favourites Section */}
            <div>
                <h2 className="text-[20px]/[28px] sm:text-[22px]/[30px] font-medium text-[#1C1C1C] mb-4">Favourites</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredFavoriteReports.map(report => (
                        <ReportCard key={report.id} report={report} />
                    ))}
                </div>
            </div>

            {/* Business Overview Section */}
            <div>
                <h2 className="text-[20px]/[28px] sm:text-[22px]/[30px]  font-medium text-[#1C1C1C] mb-4">Business Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredBusinessReports.map(report => (
                        <ReportCard key={report.id} report={report} />
                    ))}
                </div>
            </div>

            {/* No Results */}
            {filteredFavoriteReports.length === 0 && filteredBusinessReports.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No reports found matching your search.</p>
                </div>
            )}
        </div>
    );
}