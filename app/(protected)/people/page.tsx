'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, Search, Filter, Upload, ChevronLeft, ChevronRight, Users, UserPlus, Building2, ListFilter } from 'lucide-react';
import EmployeeTable from './components/employee-table';
import ContractorsTable from './components/contractors-table';
import VendorsTable from './components/vendors-table';

export default function People() {
    const [activeTab, setActiveTab] = useState('employee');
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = [
        { id: 'employee', label: 'Employees', component: EmployeeTable },
        { id: 'contractor', label: 'Contractors', component: ContractorsTable },
        { id: 'vendor', label: 'Vendors', component: VendorsTable }
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || EmployeeTable;

    return (
        <div className="py-4 px-4 sm:py-6 sm:px-6 lg:py-6 lg:px-7">
            {/* Header */}
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <h1 className="text-[20px]/[26px] sm:text-[22px]/[28px] lg:text-[24px]/[30px] font-semibold text-[#353535]">People</h1>
                {/* Right Actions */}
                <div className="flex items-center w-full sm:w-auto">
                    {/* Add People Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="h-9 sm:h-10 px-3 sm:px-4 bg-[#0D978B] hover:bg-[#0D978B]/90 text-white text-[13px]/[18px] sm:text-[14px]/[20px] rounded-[8px] w-full sm:w-auto">
                                <span className="hidden sm:inline">Add People</span>
                                <span className="sm:hidden">Add</span>
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 sm:w-33 rounded-[12px]">
                            <DropdownMenuItem className="flex items-center gap-2 text-[12px]/[18px]">
                                Add Employee
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-[12px]/[18px]">
                                Add Contractor
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-[12px]/[18px]">
                                Add Vendor
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className='mb-4 sm:mb-5'>
                {/* Tabs */}
                <div className="flex items-center mb-4 sm:mb-6 w-full border-b border-[#E5E7EB] overflow-x-auto">
                    <div className="flex min-w-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-4 sm:px-6 lg:px-8 py-3 sm:py-[14px] text-[14px]/[18px] sm:text-[15px]/[20px] font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'text-[#0D978B] border-b-1 border-[#0D978B]'
                                    : 'text-[#6B7280] hover:text-[#0D978B]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search and Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-full sm:max-w-[245px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                        <Input
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-9 sm:h-10 rounded-[8px] border-[#E5E7EB] focus:border-[#0D978B] focus:ring-[#0D978B] bg-transparent text-[14px]/[18px] sm:text-[14px]/[20px]"
                        />
                    </div>

                    {/* Filter and Export */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 sm:h-10 rounded-[8px] bg-transparent px-3 sm:px-4 border-[#E5E7EB] text-[#053834] font-semibold text-[13px]/[18px] sm:text-[14px]/[20px] hover:bg-[#F9FAFB] flex-1 sm:flex-none"
                        >
                            <ListFilter className="h-4 w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Filter</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 sm:h-10 rounded-[8px] bg-transparent px-3 sm:px-4 border-[#E5E7EB] text-[#053834] font-semibold text-[13px]/[18px] sm:text-[14px]/[20px] hover:bg-[#F9FAFB] flex-1 sm:flex-none"
                        >
                            <Upload className="h-4 w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Export</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Table Content */}
            <div className="w-full overflow-hidden">
                <ActiveComponent searchTerm={searchTerm} />
            </div>
        </div>
    );
}

