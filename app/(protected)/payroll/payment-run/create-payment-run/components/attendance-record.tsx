"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CircleAlert, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock attendance data
const attendanceData = [
    {
        date: "Mar 21",
        clockIn: "Leave",
        clockOut: "Leave",
        totalHours: "Leave",
        status: "Leave",
    },
    {
        date: "Mar 22",
        clockIn: "-",
        clockOut: "-",
        totalHours: "0h 0m",
        status: "Missing Entry",
    },
    {
        date: "Mar 23",
        clockIn: "08:5AM",
        clockOut: "",
        totalHours: "23h 59m",
        status: "Missing Entry",
        hasClockIcon: true,
    },
    {
        date: "Mar 24",
        clockIn: "08:5AM",
        clockOut: "08:5AM",
        totalHours: "7h 35m",
        status: "Present",
    },
    {
        date: "Mar 25",
        clockIn: "08:5AM",
        clockOut: "08:5AM",
        totalHours: "7h 35m",
        status: "Present",
    },
    {
        date: "Mar 21",
        clockIn: "08:5AM",
        clockOut: "08:5AM",
        totalHours: "7h 35m",
        status: "Present",
    },
    {
        date: "Mar 21",
        clockIn: "08:5AM",
        clockOut: "08:5AM",
        totalHours: "7h 35m",
        status: "Present",
    },
    {
        date: "Mar 21",
        clockIn: "08:5AM",
        clockOut: "08:5AM",
        totalHours: "7h 35m",
        status: "Present",
    },
];

interface AttendanceRecordProps {
    onEditEntry?: (employee: any) => void;
}

export default function AttendanceRecord({ onEditEntry }: AttendanceRecordProps) {
    return (
        <div className="max-h-[400px] overflow-auto rounded-[12px] border border-[#E9E9E9]">
            <Table>
                <TableHeader>
                    <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                        <TableHead className="text-[14px]/[22px] py-[13px] font-medium text-[#8C8E8E]">
                            Date
                        </TableHead>
                        <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E]">
                            Clock In
                        </TableHead>
                        <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E]">
                            <div className="flex items-center gap-[8px]">
                                <span>Clock Out</span>
                            </div>
                        </TableHead>
                        <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E]">
                            Total Hours
                        </TableHead>
                        <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E]">
                            Status
                        </TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {attendanceData.map((record, index) => (
                        <TableRow
                            key={index}
                            className="border-b border-[#E9E9E9] hover:bg-gray-50"
                        >
                            <TableCell className="text-[12px]/[22px] text-[#4B4B4B] font-medium">
                                {record.date}
                            </TableCell>
                            <TableCell className="text-[12px]/[22px] text-[#353535]">
                                {record.clockIn}
                            </TableCell>
                            <TableCell className="text-[12px]/[22px] text-[#353535]">
                                {record.clockOut}
                            </TableCell>
                            <TableCell className="text-[12px]/[22px]">
                                {record.status === "Missing Entry" ? (
                                    <span className="text-[#E97400]">{record.totalHours}</span>
                                ) : (
                                    <span className="text-[#353535]">{record.totalHours}</span>
                                )}
                            </TableCell>
                            <TableCell>
                                {record.status === "Leave" ? (
                                    <span className="text-[12px]/[22px] text-[#353535]">Leave</span>
                                ) : record.status === "Missing Entry" ? (
                                    <div className=" text-[#E97400] border-0 text-[12px] font-medium flex items-center gap-[4px]">
                                        Missing Entry
                                        <CircleAlert className="h-4 w-4 text-white fill-[#E97400]" />
                                    </div>
                                ) : (
                                    <span className="text-[#0D978B] text-[12px]/[22px]">Present</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded-[12px] min-w-[132px]">
                                        <DropdownMenuItem
                                            className="text-[12px]/[18px] text-[#4B4B4B] h-[32px]"
                                            onClick={() => onEditEntry?.(record)}
                                        >
                                            Edit Entry
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B] h-[32px]">
                                            Mark as Absent
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B] h-[32px]">
                                            Leave
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B] h-[32px]">
                                            Notify Manager
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

