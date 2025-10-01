'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data for leave types
const leaveTypes = [
    { id: 1, name: "Sick Leave", hasSetup: true, canManage: true },
    { id: 2, name: "Bereavement Leave", hasSetup: true, canManage: true },
    { id: 3, name: "Volunteer Time Off", hasSetup: true, canManage: true },
    { id: 4, name: "Personal Leave", hasSetup: true, canManage: true },
    { id: 5, name: "Jury Duty", hasSetup: false, canManage: false },
    { id: 6, name: "Parental Leave", hasSetup: false, canManage: false },
    { id: 7, name: "Military Leave", hasSetup: false, canManage: false },
    { id: 8, name: "Floating Holiday", hasSetup: false, canManage: false },
    { id: 9, name: "Sabbatical", hasSetup: false, canManage: false },
    { id: 10, name: "Vacation Leave", hasSetup: false, canManage: false },
    { id: 11, name: "Family Leave", hasSetup: false, canManage: false }
];

export default function ManageLeaves() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    // Filter leave types based on search query
    const filteredLeaveTypes = leaveTypes.filter(leave =>
        leave.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleManageClick = (leaveName: string) => {
        if (leaveName === "Sick Leave") {
            router.push("/leave-attendance/manage-leaves/sick-leave");
        }
    };

    const handleSetUpClick = (leaveName: string) => {
        if (leaveName === "Jury Duty") {
            router.push("/leave-attendance/manage-leaves/setup");
        }
    };

    return (
        <div className="w-full h-full bg-[#F8F9FA] min-h-screen">
            {/* Header */}
            <div className="flex w-full justify-between md:flex-row flex-col items-center">
                <div className="px-[24px] py-[24px]">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-[8px]">
                        <span className="text-[14px]/[20px] text-[#8F8F8F] cursor-pointer"
                            onClick={() => router.push('/leave-attendance/leave-management')}
                        >Leaves Management</span>
                        <span className="text-[14px]/[20px] text-[#0d978b]">/ Manage Leaves</span>
                    </div>

                    {/* Title and Create Button */}
                    <div className="flex w-full justify-between items-center flex-col sm:flex-row gap-4 sm:gap-0">
                        <h1 className="text-[24px]/[30px] font-semibold text-[#353535]">
                            Manage Leaves
                        </h1>

                    </div>
                </div>
                <Button
                    className="h-[42px] px-[16px] flex items-center gap-[8px] bg-[#0d978b] text-white hover:bg-[#086159] text-[14px]/[20px] font-semibold rounded-[8px] w-full sm:w-auto"
                >
                    <Plus className="size-4" />
                    Create New Leave
                </Button>
            </div>

            {/* Search */}
            <div className="px-[24px] mb-[24px]">
                <div className="relative w-full sm:w-[320px]">
                    <Search className="size-4 text-[#8f8f8f] absolute start-3 top-1/2 -translate-y-1/2" />
                    <Input
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-9 h-[36px] border-[#E9E9E9] text-[14px] rounded-[8px] bg-white"
                    />
                </div>
            </div>

            {/* Leave Types Grid */}
            <div className="px-[24px] pb-[24px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[16px]">
                    {filteredLeaveTypes.map((leave) => (
                        <Card
                            key={leave.id}
                            className="bg-white border border-[#E9E9E9] rounded-[8px] p-[20px] hover:shadow-sm transition-shadow duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[18px]/[21px] font-semibold text-[#353535] truncate">
                                        {leave.name}
                                    </h3>
                                </div>
                                <div className="flex-shrink-0 ml-[12px]">
                                    {leave.canManage ? (
                                        <Button
                                            variant="outline"
                                            className="h-[32px] px-[8px] text-[14px]/[21px] border-[#E9E9E9] text-[#353535] hover:bg-[#F8F9FA] font-semibold rounded-[6px] flex items-center gap-[4px]"
                                            onClick={() => handleManageClick(leave.name)}
                                        >
                                            <Settings className="size-4" />
                                            Manage
                                        </Button>
                                    ) : (
                                        <Button
                                            className="h-[32px] px-[8px] text-[14px]/[20px] bg-[#0d978b] text-white hover:bg-[#086159] font-semibold rounded-[6px] flex items-center gap-[4px]"
                                            onClick={() => handleSetUpClick(leave.name)}
                                        >
                                            <Plus className="size-3" />
                                            Set Up
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* No results message */}
                {filteredLeaveTypes.length === 0 && (
                    <div className="text-center py-[40px]">
                        <p className="text-[14px] text-[#8F8F8F]">
                            No leave types found matching your search.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}