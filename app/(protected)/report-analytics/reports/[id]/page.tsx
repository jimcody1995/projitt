'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Calendar, Filter, Save, ArrowLeft, ChevronRight, ListFilter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import CalendarIcon from '../../components/calendarIcon';

// Report data interface
interface ReportData {
    id: string;
    title: string;
    description: string;
}

// Sample reports data (you can move this to a separate file or API)
const reportsData: Record<string, ReportData> = {
    'balance-sheet-favorite': {
        id: 'balance-sheet-favorite',
        title: 'Balance Sheet',
        description: 'What you own (assets), what you owe (liabilities), and what you invested (equity)'
    },
    'accounts-payable-ageing': {
        id: 'accounts-payable-ageing',
        title: 'Accounts payable ageing summary',
        description: 'Unpaid balances for each customer, grouped by days past due.'
    },
    'audit-log': {
        id: 'audit-log',
        title: 'Audit Log',
        description: 'Shows everything that has happened in your company file so you always know who\'s been in Q...'
    },
    'balance-sheet': {
        id: 'balance-sheet',
        title: 'Balance Sheet',
        description: 'What you own (assets), what you owe (liabilities), and what you invested (equity).'
    },
    'balance-sheet-comparison': {
        id: 'balance-sheet-comparison',
        title: 'Balance Sheet Comparison',
        description: 'What you own (assets), what you owe (liabilities), and what you invested (equity) compared to last y...'
    },
    'balance-sheet-detail': {
        id: 'balance-sheet-detail',
        title: 'Balance Sheet Detail',
        description: 'A detailed view of what you own (assets), what you owe (liabilities), and what you invested (equity)...'
    },
    'cash-flows': {
        id: 'cash-flows',
        title: 'Statement of Cash Flows',
        description: 'Cash flowing in and out from sales and expenses (operating activities), investments, and financing...'
    },
    'equity-changes': {
        id: 'equity-changes',
        title: 'Statement of Changes in Equity',
        description: 'Statement of changes in equity.'
    },
    'profit-loss': {
        id: 'profit-loss',
        title: 'Profit and Loss',
        description: 'Your income, expenses, and net income (profit or loss). Also called an income statement.'
    },
    'profit-loss-ytd': {
        id: 'profit-loss-ytd',
        title: 'Profit and Loss YTD Comparison',
        description: 'Your income, expenses, and net income (profit or loss) compared to this year so far.'
    },
    'quarterly-profit-loss': {
        id: 'quarterly-profit-loss',
        title: 'Quarterly Profit and Loss Summary',
        description: 'A summary of your income, expenses, and net income (profit or loss) by quarter.'
    }
};

// Hierarchical data structure for Balance Sheet
const balanceSheetData = [
    {
        id: 'assets',
        account: 'Assets',
        amount: '₦2,400.00',
        level: 0,
        isTotal: true,
        isExpanded: true,
        children: [
            {
                id: 'current-assets',
                account: 'Current Assets',
                amount: '₦2,400.00',
                level: 1,
                isTotal: true,
                isExpanded: true,
                children: [
                    {
                        id: 'accounts-receivable',
                        account: 'Accounts Receivable',
                        amount: '₦2,400.00',
                        level: 2,
                        isTotal: true,
                        isExpanded: true,
                        children: [
                            {
                                id: 'ar-detail',
                                account: 'Accounts Receivable (A/R)',
                                amount: '2,400.00',
                                level: 3,
                                isTotal: false,
                                isExpanded: false,
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 'long-term-assets',
                account: 'Long-term assets',
                amount: '-',
                level: 1,
                isTotal: false,
                isExpanded: false,
                children: []
            }
        ]
    },
    {
        id: 'liabilities-equity',
        account: 'Liabilities and Shareholder\'s Equity',
        amount: '₦2,400.00',
        level: 0,
        isTotal: true,
        isExpanded: true,
        children: [
            {
                id: 'current-liabilities',
                account: 'Current Liabilities',
                amount: '-',
                level: 1,
                isTotal: true,
                isExpanded: true,
                children: [
                    {
                        id: 'accounts-payable',
                        account: 'Accounts Payable',
                        amount: '-',
                        level: 2,
                        isTotal: false,
                        isExpanded: false,
                        children: []
                    }
                ]
            },
            {
                id: 'non-current-liabilities',
                account: 'Non-current Liabilities',
                amount: '-',
                level: 1,
                isTotal: false,
                isExpanded: false,
                children: []
            },
            {
                id: 'shareholder-equity',
                account: 'Shareholder\'s Equity',
                amount: '₦2,400.00',
                level: 1,
                isTotal: true,
                isExpanded: true,
                children: [
                    {
                        id: 'retained-earnings',
                        account: 'Retained Earnings',
                        amount: '-',
                        level: 2,
                        isTotal: false,
                        isExpanded: false,
                        children: []
                    },
                    {
                        id: 'net-income',
                        account: 'Net Income',
                        amount: '2,400.00',
                        level: 2,
                        isTotal: false,
                        isExpanded: false,
                        children: []
                    }
                ]
            }
        ]
    }
];

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const report = reportsData[id];
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['assets', 'current-assets', 'accounts-receivable', 'liabilities-equity', 'current-liabilities', 'shareholder-equity']));
    const [selectedDateRange, setSelectedDateRange] = useState<string>("last-90-days");
    const [fromDate, setFromDate] = useState<Date | undefined>(new Date('2025-01-01'));
    const [toDate, setToDate] = useState<Date | undefined>(new Date('2025-03-01'));

    const handleDateRangeChange = (dateRange: string) => {
        setSelectedDateRange(dateRange);
    };

    const toggleExpanded = (itemId: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const dateRanges = {
        "last-30-days": "Last 30 days",
        "last-90-days": "Last 90 days",
        "last-year": "Last year",
        "custom": "Custom Date"
    };

    // Custom Date Input Component
    const DateInput = ({
        value,
        onChange,
        placeholder = "Select date"
    }: {
        value: Date | undefined;
        onChange: (date: Date | undefined) => void;
        placeholder?: string;
    }) => {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={`w-full !w-full max-[768px]:w-32 w-30 lg:!w-40 justify-between text-left font-normal border border-gray-300 rounded-lg px-3 h-8 sm:h-10 lg:text-[14px]/[20px] text-[12px] text-gray-900 bg-transparent  ${!value && "text-muted-foreground"
                            }`}
                    >

                        {value ? format(value, "dd-MM-yyyy") : <span>{placeholder}</span>}
                        <CalendarIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                        mode="single"
                        selected={value}
                        onSelect={onChange}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        );
    };

    // Recursive component to render hierarchical data
    const renderAccountItem = (item: any) => {
        const isExpanded = expandedItems.has(item.id);
        const hasChildren = item.children && item.children.length > 0;
        const isMainParent = item.level === 0; // Assets and Liabilities are level 0

        return (
            <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                <div
                    className={`flex items-center justify-between py-[6px] max-[425px]:py-2 max-[768px]:py-2 hover:bg-gray-250 cursor-pointer ${hasChildren ? 'cursor-pointer' : 'cursor-default'} ${isMainParent && isExpanded ? 'bg-gray-200' : ''
                        }`}
                    onClick={() => hasChildren && toggleExpanded(item.id)}
                >
                    <div className="flex items-center" style={{ paddingLeft: `${item.level * 20}px` }}>
                        {hasChildren && (
                            <button className="mr-2 p-1 hover:bg-gray-200 rounded">
                                {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                        )}
                        {!hasChildren && <div className="w-6 mr-2" />}
                        <span className={`text-sm max-[425px]:text-xs max-[768px]:text-xs ${item.isTotal ? 'font-semibold' : 'font-normal'} text-gray-900`}>
                            {item.account}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className={`text-sm max-[425px]:text-xs max-[768px]:text-xs ${item.isTotal ? 'font-semibold' : 'font-normal'} text-gray-900`}>
                            {item.amount}
                        </span>
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="bg-gray-50">
                        {item.children.map((child: any) => renderAccountItem(child))}
                    </div>
                )}
            </div>
        );
    };

    if (!report) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Report Not Found</h1>
                    <p className="text-gray-600 mb-6">The report you're looking for doesn't exist.</p>
                    <button
                        onClick={() => router.push('/report-analytics')}
                        className="flex items-center mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Reports
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50  sm:-mx-[40px] -mx-[20px]">
            {/* Header */}
            <div className="flex sm:flex-row flex-col gap-[20px] items-start sm:items-center justify-between mb-[15px] sm:px-[40px] px-[20px]">
                <div className="flex items-start flex-col space-x-4">
                    <div className="text-[12px]/[20px] text-[#0D978B]">
                        <span onClick={() => router.push('/report-analytics')} className="cursor-pointer text-gray-400 hover:text-gray-900 transition-colors text-[12px]/[20px]">Reports</span> / {report.title}
                    </div>
                    <h1 className="text-[18px]/[24px] sm:text-[24px]/[30px] font-semibold text-gray-900 mt-1">{report.title}</h1>
                </div>
                <div className="flex items-center sm:flex-row justify-between  space-x-4">
                    <div className="text-[14px]/[20px] text-gray-500">Last updated 12 minutes ago</div>
                    <button className="flex items-center bg-[#0D978B] text-white px-4 sm:h-11 h-8 sm:rounded-[8px] rounded-[6px] hover:bg-[#0D978B70] transition-colors">
                        Save as
                        <p className="h-full w-0.5 mx-2 bg-gray-500"></p>
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>


            {/* Filters */}
            <div className="flex items-end gap-6 max-[425px]:flex-col max-[425px]:items-start max-[425px]:gap-4 max-[768px]:flex-wrap max-[768px]:gap-4 border-b border-gray-300 w-full pb-6 sm:px-[40px] px-[20px]">
                {/* Report Period Filter */}
                <div className="flex flex-col space-y-1 w-full sm:w-auto">
                    <label className="text-[12px]/[18px] font-medium text-gray-500">Report Period</label>
                    <div className="relative">
                        <select
                            value={selectedDateRange}
                            onChange={(e) => handleDateRangeChange(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 h-8 sm:h-10 lg:text-[14px]/[20px] text-[12px] !w-full sm:w-30 lg:!w-40 max-[768px]:w-32 appearance-none pr-7"
                        >
                            <option value="last-30-days">Last 30 days</option>
                            <option value="last-90-days">Last 90 days</option>
                            <option value="last-year">Last year</option>
                            <option value="custom">Custom Date</option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* From Date Filter */}
                <div className="flex flex-col space-y-1 w-full sm:w-auto">
                    <label className="text-[12px]/[18px] font-medium text-gray-500">From</label>
                    <DateInput
                        value={fromDate}
                        onChange={setFromDate}
                        placeholder="Select from date"
                    />
                </div>

                {/* To Date Filter */}
                <div className="flex flex-col space-y-1 w-full sm:w-auto">
                    <label className="text-[12px]/[18px] font-medium text-gray-500">To</label>
                    <DateInput
                        value={toDate}
                        onChange={setToDate}
                        placeholder="Select to date"
                    />
                </div>

                {/* Accounting Method Filter */}
                <div className="flex flex-col space-y-1 ">
                    <label className="text-[12px]/[18px] font-medium text-gray-500">Accounting Method</label>
                    <div className="relative">
                        <select className="border border-gray-300 rounded-lg px-3 py-2 lg:text-[14px]/[20px] text-[12px] !w-full !max-[425px]:w-full sm:w-30 lg:!w-40 max-[768px]:w-32 h-8 sm:h-10 appearance-none bg-transparent pr-8">
                            <option>Accrual</option>
                            <option>Cash</option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Filter Button */}
                <div className="ml-auto max-[425px]:ml-0 w-full sm:w-auto">
                    <button className="flex items-center border border-gray-300 text-gray-700 px-4 h-8 sm:h-10 text-[14px] lg:text-[16px]/[20px] rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
                        <ListFilter className="w-4 h-4 mr-2" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Report Content */}
            <div className="sm:p-6 p-2 sm:px-[120px] px-[60px]">
                <div className=" sm:border sm:border-gray-200 sm:px-6 ">
                    {/* Report Header */}
                    <div className="border-b border-gray-200 px-6 py-4">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-900">{report.title}</h2>
                            <p className="text-[12px] text-gray-600 mt-1">ColumnGrid</p>
                            <p className="text-[14px]/[20px] font-medium text-gray-600">As of August 1, 2025</p>
                        </div>
                    </div>

                    {/* Interactive Hierarchical Report */}
                    <div className="overflow-x-auto">
                        {/* Header Row */}
                        <div className="flex items-center justify-between bg-gray-50 py-3 border-b border-gray-200">
                            <div className="text-sm font-medium text-gray-900">Account</div>
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                                <span>↓ Total</span>
                            </div>
                        </div>

                        {/* Hierarchical Data */}
                        <div className="divide-y divide-gray-100">
                            {balanceSheetData.map((item) => renderAccountItem(item))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
