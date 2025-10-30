"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

type TabType = "Federal" | "State" | "1099" | "941";
type StatusType = "Filed" | "Pending" | "Rejected";

interface TaxRecord {
    id: number;
    period: string;
    employeeCount: number;
    totalTax: string;
    status: StatusType;
}

export default function TaxFiling() {
    const [activeTab, setActiveTab] = useState<TabType>("Federal");
    const [selectedRecords, setSelectedRecords] = useState<number[]>([]);

    // Mock data for tax records
    const taxRecords: TaxRecord[] = [
        { id: 1, period: "Q1", employeeCount: 56, totalTax: "$2100", status: "Filed" },
        { id: 2, period: "Q2", employeeCount: 56, totalTax: "$2100", status: "Filed" },
        { id: 3, period: "Annual", employeeCount: 56, totalTax: "$2100", status: "Pending" },
        { id: 4, period: "Q3", employeeCount: 56, totalTax: "$2100", status: "Rejected" },
        { id: 5, period: "Annual", employeeCount: 56, totalTax: "$2100", status: "Pending" },
        { id: 6, period: "Annual", employeeCount: 56, totalTax: "$2100", status: "Filed" },
        { id: 7, period: "Annual", employeeCount: 56, totalTax: "$2100", status: "Filed" },
        { id: 8, period: "Q2", employeeCount: 56, totalTax: "$2100", status: "Filed" },
        { id: 9, period: "Q3", employeeCount: 56, totalTax: "$2100", status: "Filed" },
        { id: 10, period: "Q2", employeeCount: 56, totalTax: "$2100", status: "Filed" },
        { id: 11, period: "Q2", employeeCount: 56, totalTax: "$2100", status: "Filed" },
    ];

    const tabs: TabType[] = ["Federal", "State", "1099", "941"];

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRecords(taxRecords.map(record => record.id));
        } else {
            setSelectedRecords([]);
        }
    };

    const handleSelectRecord = (checked: boolean, id: number) => {
        if (checked) {
            setSelectedRecords([...selectedRecords, id]);
        } else {
            setSelectedRecords(selectedRecords.filter(recordId => recordId !== id));
        }
    };

    const getStatusColor = (status: StatusType) => {
        switch (status) {
            case "Filed":
                return "bg-[#D6EEEC] text-[#0D978B] hover:bg-[#D6EEEC]";
            case "Pending":
                return "bg-[#FFDFC0] text-[#934900] hover:bg-[#FFDFC0]";
            case "Rejected":
                return "bg-[#FFE5E5] text-[#C71F1F] hover:bg-[#FFE5E5]";
            default:
                return "";
        }
    };

    return (
        <div className=" w-full min-h-screen bg-[#F9F9F9]">
            {/* Header */}
            <div className="mb-[16px] sm:mb-[20px]">
                <h1 className="text-[18px]/[24px] sm:text-[24px]/[30px] font-semibold text-[#353535] mb-[16px] sm:mb-[24px]">
                    Tax Filing
                </h1>

                {/* Tabs */}
                <div className="flex gap-[4px] sm:gap-[8px] border-b border-[#E9E9E9] overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-[16px] sm:px-[36px] py-[10px] sm:py-[11px] text-[13px]/[18px] sm:text-[14px]/[20px] font-medium transition-colors relative whitespace-nowrap flex-shrink-0 ${activeTab === tab
                                ? "text-[#0D978B]"
                                : "text-[#4B4B4B] hover:text-[#4B4B4B]"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0D978B]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="min-w-[700px]">
                        <TableHeader>
                            <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                                <TableHead className="w-[48px] py-[12px] px-[16px]">
                                    <Checkbox
                                        checked={selectedRecords.length === taxRecords.length}
                                        onCheckedChange={handleSelectAll}
                                        className="border-[#4B4B4B] w-[17px] h-[17px] bg-transparent"
                                    />
                                </TableHead>
                                <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E] py-[17px] px-[16px]">
                                    Period
                                </TableHead>
                                <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E] py-[17px] px-[16px]">
                                    Employee Count
                                </TableHead>
                                <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E] py-[17px] px-[16px]">
                                    Total Tax
                                </TableHead>
                                <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E] py-[17px] px-[16px]">
                                    Status
                                </TableHead>
                                <TableHead className="w-[48px] py-[12px] px-[16px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {taxRecords.map((record) => (
                                <TableRow
                                    key={record.id}
                                    className="border-b border-[#E9E9E9] hover:bg-[#F9F9F9] transition-colors"
                                >
                                    <TableCell className="py-[16px] px-[16px]">
                                        <Checkbox
                                            checked={selectedRecords.includes(record.id)}
                                            onCheckedChange={(checked) =>
                                                handleSelectRecord(checked as boolean, record.id)
                                            }
                                            className="border-[#4B4B4B] w-[17px] h-[17px] bg-transparent"
                                        />
                                    </TableCell>
                                    <TableCell className="text-[14px]/[22px] text-[#353535] py-[16px] px-[16px]">
                                        {record.period}
                                    </TableCell>
                                    <TableCell className="text-[14px]/[22px] text-[#353535] py-[16px] px-[16px]">
                                        {record.employeeCount}
                                    </TableCell>
                                    <TableCell className="text-[14px]/[22px] text-[#353535] py-[16px] px-[16px]">
                                        {record.totalTax}
                                    </TableCell>
                                    <TableCell className="text-[14px]/[22px] text-[#353535] py-[16px] px-[16px]">
                                        {record.status}
                                    </TableCell>
                                    <TableCell className="py-[16px] px-[16px]">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                                >
                                                    <MoreVertical className="h-[16px] w-[16px] text-[#8C8E8E]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-[160px] rounded-[8px]"
                                            >
                                                <DropdownMenuItem className="text-[14px]/[22px] text-[#353535] cursor-pointer h-[36px]">
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-[14px]/[22px] text-[#353535] cursor-pointer h-[36px]">
                                                    Download
                                                </DropdownMenuItem>
                                                {record.status === "Rejected" && (
                                                    <DropdownMenuItem className="text-[14px]/[22px] text-[#C71F1F] cursor-pointer h-[36px]">
                                                        Resubmit
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
                {/* Select All for Mobile */}
                <div className="bg-white border border-[#E9E9E9] rounded-[12px] p-[16px] mb-[12px] flex items-center gap-[12px]">
                    <Checkbox
                        checked={selectedRecords.length === taxRecords.length}
                        onCheckedChange={handleSelectAll}
                        className="border-[#4B4B4B] w-[17px] h-[17px] bg-transparent"
                    />
                    <span className="text-[14px]/[20px] font-medium text-[#353535]">
                        Select All
                    </span>
                </div>

                {/* Records */}
                <div className="space-y-[12px]">
                    {taxRecords.map((record) => (
                        <div
                            key={record.id}
                            className="bg-white border border-[#E9E9E9] rounded-[12px] p-[16px]"
                        >
                            <div className="flex items-start justify-between mb-[12px]">
                                <div className="flex items-center gap-[12px]">
                                    <Checkbox
                                        checked={selectedRecords.includes(record.id)}
                                        onCheckedChange={(checked) =>
                                            handleSelectRecord(checked as boolean, record.id)
                                        }
                                        className="border-[#4B4B4B] mt-[2px] w-[17px] h-[17px] bg-transparent"
                                    />
                                    <div>
                                        <div className="text-[16px]/[22px] font-semibold text-[#353535] mb-[4px]">
                                            {record.period}
                                        </div>
                                        <Badge
                                            className={`border-0 px-[12px] py-[4px] rounded-[21px] text-[12px]/[18px] font-medium ${getStatusColor(
                                                record.status
                                            )}`}
                                        >
                                            {record.status}
                                        </Badge>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0 hover:bg-gray-100"
                                        >
                                            <MoreVertical className="h-[16px] w-[16px] text-[#8C8E8E]" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-[160px] rounded-[8px]"
                                    >
                                        <DropdownMenuItem className="text-[14px]/[20px] text-[#353535] cursor-pointer h-[36px]">
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-[14px]/[20px] text-[#353535] cursor-pointer h-[36px]">
                                            Download
                                        </DropdownMenuItem>
                                        {record.status === "Rejected" && (
                                            <DropdownMenuItem className="text-[14px]/[20px] text-[#C71F1F] cursor-pointer h-[36px]">
                                                Resubmit
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="grid grid-cols-2 gap-[12px]">
                                <div>
                                    <div className="text-[11px]/[16px] text-[#8C8E8E] mb-[4px]">
                                        Employee Count
                                    </div>
                                    <div className="text-[14px]/[20px] text-[#353535] font-medium">
                                        {record.employeeCount}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[11px]/[16px] text-[#8C8E8E] mb-[4px]">
                                        Total Tax
                                    </div>
                                    <div className="text-[14px]/[20px] text-[#353535] font-medium">
                                        {record.totalTax}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}