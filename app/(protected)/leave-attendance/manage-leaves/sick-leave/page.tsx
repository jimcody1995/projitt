'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Search, MoreHorizontal, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { Summary } from "../components/summary";
import { Employees } from "../components/employees";
import { HiOutlineUserGroup } from 'react-icons/hi2';

// Mock employee data
const employeeData = [
    {
        id: 1,
        name: "Brian Foster",
        initials: "BF",
        position: "Product Manager",
        department: "Information",
        enrolledDate: "Apr 21, 2025",
        leaveBalance: "13 days",
        totalBalance: "24 days",
        lastLeave: "Apr 21, 2025"
    },
    {
        id: 2,
        name: "Cara Fields",
        initials: "CF",
        position: "UX Designer",
        department: "Statistics",
        enrolledDate: "Apr 22, 2025",
        leaveBalance: "12 days",
        totalBalance: "22 days",
        lastLeave: "Apr 22, 2025"
    },
    {
        id: 3,
        name: "David Green",
        initials: "DG",
        position: "Software Engineer",
        department: "Metrics",
        enrolledDate: "Apr 23, 2025",
        leaveBalance: "2 days",
        totalBalance: "25 days",
        lastLeave: "Apr 23, 2025"
    },
    {
        id: 4,
        name: "Eva Hart",
        initials: "EH",
        position: "Marketing Specialist",
        department: "Insights",
        enrolledDate: "Apr 24, 2025",
        leaveBalance: "10 days",
        totalBalance: "23 days",
        lastLeave: "Apr 24, 2025"
    },
    {
        id: 5,
        name: "George Ivanov",
        initials: "GI",
        position: "Business Analyst",
        department: "Analysis",
        enrolledDate: "Apr 25, 2025",
        leaveBalance: "5 days",
        totalBalance: "20 days",
        lastLeave: "Apr 25, 2025"
    },
    {
        id: 6,
        name: "Hannah Johnson",
        initials: "HJ",
        position: "HR Specialist",
        department: "Trends",
        enrolledDate: "Apr 26, 2025",
        leaveBalance: "4 days",
        totalBalance: "17 days",
        lastLeave: "Apr 26, 2025"
    },
    {
        id: 7,
        name: "Isaac Kim",
        initials: "IK",
        position: "Content Writer",
        department: "Results",
        enrolledDate: "Apr 27, 2025",
        leaveBalance: "11 days",
        totalBalance: "21 days",
        lastLeave: "Apr 27, 2025"
    },
    {
        id: 8,
        name: "Julia Lee",
        initials: "JL",
        position: "Graphic Designer",
        department: "Findings",
        enrolledDate: "Apr 28, 2025",
        leaveBalance: "8 days",
        totalBalance: "18 days",
        lastLeave: "Apr 28, 2025"
    },
    {
        id: 9,
        name: "Kevin Martin",
        initials: "KM",
        position: "Cybersecurity Expert",
        department: "Performance",
        enrolledDate: "Apr 29, 2025",
        leaveBalance: "9 days",
        totalBalance: "15 days",
        lastLeave: "Apr 29, 2025"
    },
    {
        id: 10,
        name: "Laura Nolan",
        initials: "LN",
        position: "Financial Analyst",
        department: "Evaluation",
        enrolledDate: "Apr 30, 2025",
        leaveBalance: "7 days",
        totalBalance: "19 days",
        lastLeave: "Apr 30, 2025"
    },
    {
        id: 11,
        name: "Michael O'Connor",
        initials: "MO",
        position: "Data Scientist",
        department: "Forecast",
        enrolledDate: "May 1, 2025",
        leaveBalance: "3 days",
        totalBalance: "16 days",
        lastLeave: "May 1, 2025"
    }
];

export default function SickLeave() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('summary');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEmployees = employeeData.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full h-full bg-[#F8F9FA] min-h-screen">
            {/* Header */}
            <div className="px-[24px] py-[24px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[16px]">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.push('/leave-attendance/manage-leaves')}
                            className="h-[30px] w-[30px] hover:bg-[#E9E9E9] rounded-full bg-white p-[3px]"
                        >
                            <ArrowLeft className="size-4 text-gray-900" />
                        </Button>
                        <h1 className="text-[24px]/[30px] font-semibold text-[#353535]">
                            Sick Leave
                        </h1>
                    </div>
                    <div className="flex items-center gap-[12px]">
                        <button
                            className="h-[36px] px-[16px] text-[14px]/[20px] text-[#353535] hover:bg-[#F8F9FA] font-medium rounded-[6px] cursor-point"
                        >
                            Delete Policy
                        </button>
                        <Button
                            variant="outline"
                            className="h-[36px] px-[16px] text-[14px]/[20px] border-gray-800 text-[#353535] bg-[#F8F9FA] font-semibold rounded-[6px] text-primary-950"
                        >
                            Edit Leave
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-[24px] flex items-center justify-between  border-b border-[#E9E9E9]">
                <div className="flex gap-[32px] ">
                    <button
                        className={`py-[12px] md:px-[36px] text-[14px] font-medium transition-colors duration-200 border-b-2 whitespace-nowrap ${activeTab === 'summary'
                            ? 'text-[#0d978b] border-[#0d978b]'
                            : 'text-[#626262] border-transparent hover:text-[#353535]'
                            }`}
                        onClick={() => setActiveTab('summary')}
                    >
                        <div className="flex items-center gap-[8px]">
                            <span>Leave Summary</span>
                        </div>
                    </button>
                    <button
                        className={`py-[12px] md:px-[36px] flex items-center gap-[8px] text-[14px] font-medium transition-colors duration-200 border-b-2 whitespace-nowrap ${activeTab === 'employees'
                            ? 'text-[#0d978b] border-[#0d978b]'
                            : 'text-[#626262] border-transparent hover:text-[#353535]'
                            }`}
                        onClick={() => setActiveTab('employees')}
                    >
                        <HiOutlineUserGroup className="size-4" />
                        <span>45 eligible employees</span>
                    </button>
                </div>
                <div className="relative">
                    <Search className="size-4 text-[#8f8f8f] absolute right-3 top-1/2 -translate-y-1/2" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-[280px] h-[36px] border-none bg-transparent shadow-none"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="px-[24px] py-[24px]">
                {activeTab === 'summary' && (
                    <Summary />
                )}

                {activeTab === 'employees' && (
                    <Employees filteredEmployees={filteredEmployees} />
                )}
            </div>
        </div>
    );
}