'use client';
import DialogContent, { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Maximize2, RotateCcw, PieChart, Minimize2, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Succession() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    return (
        <div>
            <p className="text-[24px]/[30px] font-semibold text-[#353535]">Succession Planning</p>
            <div className="flex gap-[10px] mt-[39px]">
                <div className="bg-white border border-[#e9e9e9] rounded-[12px] p-[20px] sm:w-[350px] w-full cursor-pointer" onClick={() => setSelectedRole('1')}>
                    <p className="text-[18px]/[21px] font-semibold text-[#353535]">Head of Marketing</p>
                    <div className="mt-[16px] flex gap-[6px]">
                        <div className="border border-[#e9e9e9] rounded-[6px] py-[6px] px-[8px] flex gap-[6px]">
                            <div className="w-[24px] h-[24px] rounded-full bg-[#D6EEEC] text-[10px] flex items-center justify-center text-[#053834]">
                                AF
                            </div>
                            <p className="text-[14px]/[22px] text-[#053834]">Alice Fernadez</p>
                        </div>
                        <div className="border border-[#e9e9e9] rounded-[12px] p-[8px] text-[14px]">
                            +2
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={selectedRole !== null} onOpenChange={() => setSelectedRole(null)}>
                <DialogContent className="max-w-[780px] p-0 rounded-[24px]" close={false}>
                    <div className="p-[24px]">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-[24px]">
                            <div className="flex items-center gap-[8px]">
                                <PieChart className="w-[16px] h-[16px] text-green-600" />
                                <span className="text-[12px] text-[#8F8F8F]">Data</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-[32px] w-[32px] p-0" onClick={() => setSelectedRole(null)}>
                                <Minimize2 className="w-[16px] h-[16px]" />
                            </Button>
                        </div>

                        {/* Job Title */}
                        <h2 className="text-[24px]/[32px] font-bold text-[#353535] mb-[24px]">Head of Marketing</h2>

                        {/* Incumbent Section */}
                        <div className="mb-[24px]">
                            <div className="text-[12px] font-medium text-[#8F8F8F] uppercase tracking-wide mb-[12px]">
                                INCUMBENT
                            </div>
                            <div className="flex items-center gap-[12px]">
                                <div className="w-[40px] h-[40px] rounded-full bg-[#D6EEEC] flex items-center justify-center">
                                    <span className="text-[14px] font-medium text-[#053834]">AF</span>
                                </div>
                                <span className="text-[16px] font-medium text-[#353535]">Alice Fernandez</span>
                            </div>
                        </div>

                        {/* Successors Section */}
                        <div className="mb-[24px]">
                            <div className="text-[12px] font-medium text-[#8F8F8F] uppercase tracking-wide mb-[12px]">
                                SUCCESSORS
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-3 gap-[16px] mb-[12px] pb-[8px] border-b border-[#E9E9E9]">
                                <div className="text-[12px] font-medium text-[#8F8F8F]">Name</div>
                                <div className="text-[12px] font-medium text-[#8F8F8F]">Role</div>
                                <div className="text-[12px] font-medium text-[#8F8F8F]">Status</div>
                            </div>

                            {/* Successor Rows */}
                            <div className="space-y-[16px]">
                                {/* Successor 1 */}
                                <div className="grid grid-cols-3 gap-[16px] items-center">
                                    <div className="flex items-center gap-[12px]">
                                        <div className="w-[32px] h-[32px] rounded-full bg-[#D6EEEC] flex items-center justify-center">
                                            <span className="text-[12px] font-medium text-[#053834]">AF</span>
                                        </div>
                                        <span className="text-[14px] font-medium text-[#353535]">Alice Fernandez</span>
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-medium text-[#353535]">Senior Data Analyst</div>
                                        <div className="text-[12px] text-[#8F8F8F]">USA</div>
                                    </div>
                                    <div className="flex items-center gap-[8px] justify-between">
                                        <span className="px-[8px] py-[4px] bg-[#D6EEEC] text-[#053834] text-[12px] font-medium rounded-full">
                                            Ready
                                        </span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-[24px] w-[24px] p-0">
                                                    <MoreVertical className="w-[16px] h-[16px]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Remove</DropdownMenuItem>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                {/* Successor 2 */}
                                <div className="grid grid-cols-3 gap-[16px] items-center">
                                    <div className="flex items-center gap-[12px]">
                                        <div className="w-[32px] h-[32px] rounded-full bg-[#D6EEEC] flex items-center justify-center">
                                            <span className="text-[12px] font-medium text-[#053834]">AF</span>
                                        </div>
                                        <span className="text-[14px] font-medium text-[#353535]">Alice Fernandez</span>
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-medium text-[#353535]">Senior Data Analyst</div>
                                        <div className="text-[12px] text-[#8F8F8F]">USA</div>
                                    </div>
                                    <div className="flex items-center gap-[8px] justify-between">
                                        <span className="px-[8px] py-[4px] bg-[#D6EEEC] text-[#053834] text-[12px] font-medium rounded-full">
                                            Ready
                                        </span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-[24px] w-[24px] p-0">
                                                    <MoreVertical className="w-[16px] h-[16px]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Remove</DropdownMenuItem>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add Successor Link */}
                        <div className="pt-[16px] border-t border-[#E9E9E9]">
                            <button className="p-0 h-auto text-[#0d978b] hover:text-[#0a7a6f] cursor-pointer">
                                Add Successor
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}