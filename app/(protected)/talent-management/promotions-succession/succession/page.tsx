'use client';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Maximize2, RotateCcw, PieChart, Minimize2, MoreVertical, Search, X, ArrowLeft, Plus, GripVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import AddSuccessionSheet from "../components/addSuccessionSheet";

export default function PromotionsSuccession() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [open, setOpen] = useState(false);
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-[4px] text-[24px]/[30px] font-semibold text-[#353535]">
                <ArrowLeft className="w-6 h-6 border border-[#E9E9E9] rounded-[56.84px]" onClick={() => router.back()} />
                Successions
            </div>
            {/* Search and Filter */}
            <div className="flex items-center justify-between sm:flex-row flex-col gap-[20px] ">
                <div className="relative ">
                    <Search
                        className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                        data-testid="search-icon"
                    />
                    <Input
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-9 w-[172px] h-[42px]"
                        data-testid="search-input"
                    />
                    {searchQuery.length > 0 && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                            onClick={() => setSearchQuery('')}
                            data-testid="clear-search-button"
                        >
                            <X />
                        </Button>
                    )}
                </div>
            </div>
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
                    <div className="p-[32px]">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-[8px]">
                                <PieChart className="w-[20px] h-[20px] text-green-600" />
                                <span className="text-[14px]/[22px] text-gray-800">Data</span>
                            </div>
                            <Button variant="ghost" className="h-[28px] w-[28px]" onClick={() => setSelectedRole(null)}>
                                <Minimize2 className="w-[21px] h-[21px]" />
                            </Button>
                        </div>

                        {/* Job Title */}
                        <h2 className="text-[24px]/[32px] font-bold text-[#353535] mb-[24px]">Head of Marketing</h2>

                        {/* Incumbent Section */}
                        <div className="mb-[28px]">
                            <div className="text-[14px]/[20px] font-medium text-[#8F8F8F] uppercase tracking-wide mb-[14px]">
                                INCUMBENT
                            </div>
                            <div className="flex items-center gap-[6px]">
                                <div className="w-[24px] h-[24px] rounded-full bg-[#D6EEEC] flex items-center justify-center">
                                    <span className="text-[14px] font-medium text-[#053834]">AF</span>
                                </div>
                                <span className="text-[14px]/[22px] font-medium text-[#353535]">Alice Fernandez</span>
                            </div>
                        </div>

                        {/* Successors Section */}
                        <div className="mb-[16px]">
                            <div className="text-[14px]/[20px] font-medium text-[#8F8F8F] uppercase tracking-wide mb-[8px]">
                                SUCCESSORS
                            </div>
                            {/*Table with Row Lines*/}
                            <div className="border rounded-[12px] border-[1px] border-[#EAEAEA] overflow-hidden">
                                {/* Successors Table Header */}
                                <div>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-[#E9E9E9]">
                                                <th className="text-[12px] font-medium text-[#8F8F8F] px-4 py-3 text-left  border-[#E9E9E9] last:border-r-0"></th>
                                                <th className="text-[12px] font-medium text-[#8F8F8F] px-4 py-3 text-left  border-[#E9E9E9] last:border-r-0">Name</th>
                                                <th className="text-[12px] font-medium text-[#8F8F8F] px-4 py-3 text-left  border-[#E9E9E9] last:border-r-0">Role</th>
                                                <th className="text-[12px] font-medium text-[#8F8F8F] px-4 py-3 text-left">Status</th>
                                                <th className="text-[12px] font-medium text-[#8F8F8F] px-4 py-3 text-left"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="sm:text-[14px] text-[9px]">
                                            <tr className="border-b border-[#E9E9E9] hover:bg-[#D6EEEC]/20 transition-colors">
                                                <td className=" font-medium text-[#353535] px-4 py-3 border-[#E9E9E9] last:border-r-0"><GripVertical /></td>
                                                <td className=" font-medium text-[#353535] px-4 py-3 border-[#E9E9E9] last:border-r-0">
                                                    <span className="w-[24px] h-[24px] rounded-full bg-[#D6EEEC] text-[#053834] p-1 ">
                                                        AF
                                                    </span>Alice Fernandez</td>
                                                <td className=" font-medium text-[#353535] px-4 py-3  border-[#E9E9E9] last:border-r-0">Senior Data Analyst</td>
                                                <td className=" font-medium text-[#353535] px-4 py-3">
                                                    <span className="px-[8px] py-[4px] text-[#0D978B] sm:bg-[#D6EEEC]  sm:text-[14px] text-[7px] font-medium rounded-full">
                                                        Ready Now
                                                    </span>
                                                </td>
                                                <td className=" font-medium text-[#353535] px-4 py-3">
                                                    <span className="px-[8px] py-[4px]  text-[#053834] text-[12px] font-medium">
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
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-[#E9E9E9] hover:bg-[#D6EEEC]/20 transition-colors last:border-b-0">
                                                <td className=" font-medium text-[#353535] px-4 py-3 border-[#E9E9E9] last:border-r-0"><GripVertical /></td>
                                                <td className=" font-medium text-[#353535] px-4 py-3  border-[#E9E9E9] last:border-r-0"><span className="w-[24px] h-[24px] rounded-full bg-[#D6EEEC] text-[#053834] p-1 ">
                                                    EH
                                                </span>Bob Wilson</td>
                                                <td className=" font-medium text-[#353535] px-4 py-3 border-[#E9E9E9] last:border-r-0">Marketing Manager</td>
                                                <td className=" font-medium text-[#353535] px-4 py-3">
                                                    <span className="sm:px-[8px] py-[4px] sm:bg-[#FFDFC0]  sm:text-[14px] text-[7px]  text-[#BE5E00]  font-medium rounded-full">
                                                        Ready in 3-6 months
                                                    </span>
                                                </td>
                                                <td className=" font-medium text-[#353535] px-4 py-3">
                                                    <span className="px-[8px] py-[4px]  text-[#053834] text-[12px] font-medium">
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
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Add Successor Link */}
                        <Button className="p-0 h-[36px] w-[142px] text-[white] hover:text-[#0a7a6f] cursor-pointer rounded-[8px]" onClick={() => setOpen(true)}>
                            <Plus className="w-[18px] h-[18px]" />
                            Add Successor
                        </Button>
                        <AddSuccessionSheet open={open} onOpenChange={setOpen} />


                    </div>
                </DialogContent>
            </Dialog>
        </div >
    )
}