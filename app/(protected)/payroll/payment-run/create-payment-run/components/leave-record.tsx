"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FileText, X, Check, FileIcon, File } from "lucide-react";
import { useState } from "react";

// Mock leave data
const initialLeaveData = [
    {
        id: 1,
        requestDate: "Mar 21, 2025",
        startDate: "Mar 21, 2025",
        endDate: "Mar 21, 2025",
        days: 1,
        leaveType: "Vacation",
        reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        status: "Pending",
        hasDocument: true,
    },
    {
        id: 2,
        requestDate: "Mar 21, 2025",
        startDate: "Mar 21, 2025",
        endDate: "Mar 21, 2025",
        days: 1,
        leaveType: "Sick",
        reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        status: "Accepted",
        hasDocument: true,
    },
    {
        id: 3,
        requestDate: "Mar 21, 2025",
        startDate: "Mar 21, 2025",
        endDate: "Mar 21, 2025",
        days: 1,
        leaveType: "Probation Leave",
        reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        status: "Rejected",
        hasDocument: true,
    },
    {
        id: 4,
        requestDate: "Mar 21, 2025",
        startDate: "Mar 21, 2025",
        endDate: "Mar 21, 2025",
        days: 1,
        leaveType: "Probation Leave",
        reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        status: "Accepted",
        hasDocument: true,
    },
    {
        id: 5,
        requestDate: "Mar 21, 2025",
        startDate: "Mar 21, 2025",
        endDate: "Mar 21, 2025",
        days: 1,
        leaveType: "Sick",
        reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        status: "Accepted",
        hasDocument: true,
    },
    {
        id: 6,
        requestDate: "Mar 21, 2025",
        startDate: "Mar 21, 2025",
        endDate: "Mar 21, 2025",
        days: 1,
        leaveType: "Vacation",
        reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        status: "Rejected",
        hasDocument: true,
    },
    {
        id: 7,
        requestDate: "Mar 21, 2025",
        startDate: "Mar 21, 2025",
        endDate: "Mar 21, 2025",
        days: 1,
        leaveType: "Vacation",
        reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        status: "Accepted",
        hasDocument: true,
    },
    {
        id: 8,
        requestDate: "Mar 21, 2025",
        startDate: "Mar 21, 2025",
        endDate: "Mar 21, 2025",
        days: 1,
        leaveType: "Vacation",
        reason: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        status: "Accepted",
        hasDocument: true,
    },
];

export default function LeaveRecord() {
    const [leaveData, setLeaveData] = useState(initialLeaveData);
    const [expandedReasons, setExpandedReasons] = useState<number[]>([]);

    const handleApprove = (id: number) => {
        setLeaveData(leaveData.map(item =>
            item.id === id ? { ...item, status: "Accepted" } : item
        ));
    };

    const handleReject = (id: number) => {
        setLeaveData(leaveData.map(item =>
            item.id === id ? { ...item, status: "Rejected" } : item
        ));
    };

    const toggleReason = (id: number) => {
        setExpandedReasons(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="max-h-[400px] overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                        <TableHead className="text-[12px]/[18px] font-medium text-[#8C8E8E] py-[15px]">
                            Request Date
                        </TableHead>
                        <TableHead className="text-[12px]/[18px] font-medium text-[#8C8E8E] py-[15px]">
                            Start Date
                        </TableHead>
                        <TableHead className="text-[12px]/[18px] font-medium text-[#8C8E8E]">
                            End Date
                        </TableHead>
                        <TableHead className="text-[12px]/[18px] font-medium text-[#8C8E8E] py-[15px]">
                            Days
                        </TableHead>
                        <TableHead className="text-[12px]/[18px] font-medium text-[#8C8E8E]">
                            Leave Type
                        </TableHead>
                        <TableHead className="text-[12px]/[18px] font-medium text-[#8C8E8E] py-[15px]">
                            Reason
                        </TableHead>
                        <TableHead className="text-[12px]/[18px] font-medium text-[#8C8E8E] py-[15px]">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="[&_tr:last-child]:border-b [&_tr:last-child]:border-[#E9E9E9]">
                    {leaveData.map((record, index) => (
                        <TableRow
                            key={index}
                            className="border-b border-[#E9E9E9] hover:bg-gray-50"
                        >
                            <TableCell className="text-[12px]/[22px] text-[#353535]">
                                {record.requestDate}
                            </TableCell>
                            <TableCell className="text-[12px]/[22px] text-[#353535]">
                                {record.startDate}
                            </TableCell>
                            <TableCell className="text-[12px]/[22px] text-[#353535]">
                                {record.endDate}
                            </TableCell>
                            <TableCell className="text-[12px]/[22px] text-[#353535]">
                                {record.days}
                            </TableCell>
                            <TableCell className="text-[12px]/[22px] text-[#353535]">
                                {record.leaveType}
                            </TableCell>
                            <TableCell className="text-[12px]/[22px] text-[#353535] max-w-[300px] ">
                                <div className="flex items-start gap-[12px]">
                                    <span className={expandedReasons.includes(record.id) ? "whitespace-normal break-words" : "truncate"}>
                                        {record.reason}
                                    </span>
                                    {record.hasDocument && (
                                        <Button onClick={(e) => {
                                            e.stopPropagation();
                                            toggleReason(record.id);
                                        }}
                                            variant="outline"
                                            size="sm"
                                            className="p-[7px] border-[#8C8E8E] hover:bg-[#F8F9FA] rounded-[6px]"
                                        >
                                            <File
                                                className="h-4 w-4 text-[#8C8E8E] cursor-pointer hover:text-[#0D978B]  transition-colors flex-shrink-0 "

                                            />
                                        </Button>

                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                {record.status === "Pending" ? (
                                    <div className="flex items-center gap-[8px]">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-[28px] w-[28px] p-0 border-[#E53E3E] hover:bg-[#FFE5E5] rounded-[6px]"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleReject(record.id);
                                            }}
                                        >
                                            <X className="h-4 w-4 text-[#E53E3E]" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-[28px] px-[16px] bg-[#0D978B] hover:bg-[#0c8679] text-white rounded-[6px] text-[14px]/[20px] font-medium"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleApprove(record.id);
                                            }}
                                        >
                                            <Check className="h-4 w-4 mr-[4px]" />
                                            Approve
                                        </Button>
                                    </div>
                                ) : record.status === "Accepted" ? (
                                    <Badge className="bg-[#D6EEEC] text-[#0D978B] border-0 px-3 py-1 rounded-[21px] text-[12px] font-medium hover:bg-[#D6EEEC]">
                                        Accepted
                                    </Badge>
                                ) : (
                                    <Badge className="bg-[#FFE5E5] text-[#C30606] border-0 px-3 py-1 rounded-[21px] text-[12px] font-medium hover:bg-[#FFE5E5]">
                                        Rejected
                                    </Badge>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

