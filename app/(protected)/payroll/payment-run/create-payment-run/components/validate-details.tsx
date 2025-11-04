"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BsFillBanFill } from 'react-icons/bs';
import { LuTriangleAlert } from 'react-icons/lu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, CircleAlert, CircleSlash, MoreVertical, TriangleAlert } from "lucide-react";
import { useState } from "react";

interface ValidateDetailsProps {
    onNext: () => void;
    onBack: () => void;
}

// Mock employee payment data
const paymentData = [
    {
        id: "1",
        employeeId: "#E001",
        name: "Alice Fernandez",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "84.00hrs",
        additionalEarnings: "-",
        deductions: "$1570",
        ytd: "€21,000.00",
        grossPay: "€21,000.00",
        netPay: "€21,000.00",
        // status: "Warning",
    },
    {
        id: "2",
        employeeId: "#E002",
        name: "Evelyn Hayes",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "80.00hrs",
        additionalEarnings: "-",
        deductions: "$1570",
        ytd: "¥2,100,000.00",
        grossPay: "¥2,100,000.00",
        netPay: "¥2,100,000.00",
        // status: "Warning",
    },
    {
        id: "3",
        employeeId: "#E003",
        name: "Brynn Moretti",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "120.50hrs",
        additionalEarnings: "-",
        deductions: "$1570",
        ytd: "€21,000.00",
        grossPay: "€21,000.00",
        netPay: "€21,000.00",
        // status: "Critical",
    },
    {
        id: "4",
        employeeId: "#E003",
        name: "Alice Fernandez",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "80.00hrs",
        additionalEarnings: "$1390",
        deductions: "$1570",
        ytd: "€21,000.00",
        grossPay: "€21,000.00",
        netPay: "€21,000.00",
    },
    {
        id: "5",
        employeeId: "#E003",
        name: "Jamison Stotzfus",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "84.00hrs",
        additionalEarnings: "$1340",
        deductions: "$1570",
        ytd: "¥2,100,000.00",
        grossPay: "¥2,100,000.00",
        netPay: "¥2,100,000.00",
    },
    {
        id: "6",
        employeeId: "#E003",
        name: "Jaxer Chang",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "84.00hrs",
        additionalEarnings: "-",
        deductions: "$1410",
        ytd: "€21,000.00",
        grossPay: "€21,000.00",
        netPay: "€21,000.00",
    },
    {
        id: "7",
        employeeId: "#E003",
        name: "Macey Olgun",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "80.00hrs",
        additionalEarnings: "$1450",
        deductions: "$1570",
        ytd: "€21,000.00",
        grossPay: "€21,000.00",
        netPay: "€21,000.00",
    },
    {
        id: "8",
        employeeId: "#E003",
        name: "Carter Glanger",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "84.00hrs",
        additionalEarnings: "-",
        deductions: "$1570",
        ytd: "¥2,100,000.00",
        grossPay: "¥2,100,000.00",
        netPay: "¥2,100,000.00",
    },
    {
        id: "9",
        employeeId: "#E003",
        name: "Amelia Rosales",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "84.00hrs",
        additionalEarnings: "$1560",
        deductions: "$1570",
        ytd: "€21,000.00",
        grossPay: "€21,000.00",
        netPay: "€21,000.00",
    },
    {
        id: "10",
        employeeId: "#E003",
        name: "Hadley Levesque",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "84.00hrs",
        additionalEarnings: "$1330",
        deductions: "$15",
        ytd: "€21,000.00",
        grossPay: "€21,000.00",
        netPay: "€21,000.00",
    },
];

export default function ValidateDetails({ onNext, onBack }: ValidateDetailsProps) {
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    const toggleEmployee = (id: string) => {
        setSelectedEmployees((prev) =>
            prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedEmployees.length === paymentData.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(paymentData.map((emp) => emp.id));
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="w-full">
            <div className="mb-[16px] sm:mb-[21px] flex flex-col justify-between items-start  gap-3 sm:gap-7">
                <h2 className="text-[16px] sm:text-[18px]/[24px] font-medium text-[#353535]">
                    Validated Details
                </h2>
                <div className="flex flex-wrap gap-[8px] text-[12px] sm:text-[14px]/[20px]">
                    <span className="text-[#0D978B] font-medium">95 Valid</span>
                    {/* <span className="text-[#FFA750] font-medium">2 Warnings</span>
                    <span className="text-[#E53E3E] font-medium">1 Critical</span> */}
                </div>
            </div>

            <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[12px] overflow-x-auto -mx-[16px] sm:mx-0">
                <Table className="min-w-[1400px]">
                    <TableHeader>
                        <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                            <TableHead className="py-[9px] w-[52px]">
                                <Checkbox
                                    checked={selectedEmployees.length === paymentData.length}
                                    onCheckedChange={toggleAll}
                                    className="w-[18px] h-[18px]"
                                />
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[95px]">
                                ID
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[196px] ">
                                Employee
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[136px]">
                                Account Number
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[136px]">
                                Routing Number
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[120px]">
                                Work Type
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[132px]">
                                Hours Worked
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[156px]">
                                Additional Earnings
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[143px]">
                                Deductions
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[144px] ">
                                YTD
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[142px] ">
                                Gross Pay
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-white w-[172px] bg-[#0D978B]">
                                Net Pay (EBT)
                            </TableHead>
                            <TableHead className="w-[84px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paymentData.map((employee) => (
                            <TableRow
                                key={employee.id}
                                className="border-b border-[#E9E9E9] hover:bg-gray-50"
                            >
                                <TableCell>
                                    <Checkbox
                                        checked={selectedEmployees.includes(employee.id)}
                                        onCheckedChange={() => toggleEmployee(employee.id)}
                                        className="w-[18px] h-[18px]"
                                    />
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    <div className="flex items-center gap-[3px]">
                                        {/* {employee.status && (
                                            employee.status === "Warning" ?
                                                <LuTriangleAlert className="h-4 w-4 text-white fill-[#FFA750]" /> :
                                                employee.status === "Critical" ?
                                                    <CircleSlash className="h-4 w-4 text-white fill-[#C30606] rotate-90" /> :
                                                    null
                                        )} */}
                                        {employee.employeeId}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-[12px]">
                                        <Avatar className="h-[28px] w-[28px]">
                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                {getInitials(employee.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-[14px]/[22px] text-gray-900">
                                                {employee.name}
                                            </div>
                                            <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                                {employee.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.accountNumber}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.routingNumber}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.workType}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.hoursWorked}
                                    {employee.workType === "Hourly" && employee.hoursWorked.includes("84") && (
                                        <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                            +5hrs overtime
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.additionalEarnings}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.deductions}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    <div>{employee.ytd}</div>
                                    <div className="text-[11px]/[14px] text-[#8F8F8F]">€28,000.00</div>
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    <div>{employee.grossPay}</div>
                                    <div className="text-[11px]/[14px] text-[#8F8F8F]">€28,000.00</div>
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    <div>{employee.netPay}</div>
                                    <div className="text-[11px]/[14px] text-[#8F8F8F] font-normal">€28,000.00</div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-[12px] min-w-[132px]">
                                            <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B] h-[32px]">
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B] h-[32px]">
                                                Edit
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

