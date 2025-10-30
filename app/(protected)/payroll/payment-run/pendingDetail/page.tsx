"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
import { ArrowLeft, CircleSlash, FileDown, ListFilter, MoreVertical, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { EmployeeFilterTool } from "../[id]/components/employee-filter";
import * as XLSX from 'xlsx';

// Mock employee payment data
const paymentData = [
    {
        id: "2",
        employeeId: "#E0002",
        name: "Evelyn Hayes",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "80.00hrs",
        additionalEarnings: "-",
        deductions: "-",
        ytd: "¥2,100,000.00",
        ytdSubtext: "€28,000.00",
        grossPay: "¥2,100,000.00",
        grossPaySubtext: "€28,000.00",
        netPay: "¥2,100,000.00",
        netPaySubtext: "€28,000.00",
    },
    {
        id: "1",
        employeeId: "#E0001",
        name: "Alice Fernandez",
        email: "$25.00/hr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "64.00hrs",
        overtime: "+5hrs overtime",
        additionalEarnings: "-",
        deductions: "$1520",
        ytd: "€21,000.00",
        ytdSubtext: "$28,000.00",
        grossPay: "€21,000.00",
        grossPaySubtext: "$28,000.00",
        netPay: "€21,000.00",
        netPaySubtext: "€28,000.00",
    },
    {
        id: "3",
        employeeId: "#E0003",
        name: "Brynn Moretti",
        email: "$123,000.00/yr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "120.50hrs",
        overtime: "+5hrs overtime",
        additionalEarnings: "-",
        deductions: "-",
        ytd: "€21,000.00",
        ytdSubtext: "€28,000.00",
        grossPay: "€21,000.00",
        grossPaySubtext: "€28,000.00",
        netPay: "€21,000.00",
        netPaySubtext: "€28,000.00",
        status: "Critical",
    },
    {
        id: "4",
        employeeId: "#E0003",
        name: "Alice Fernandez",
        email: "$25.00/hr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "80.00hrs",
        additionalEarnings: "$1390",
        deductions: "-",
        ytd: "€21,000.00",
        ytdSubtext: "€28,000.00",
        grossPay: "€21,000.00",
        grossPaySubtext: "€28,000.00",
        netPay: "€21,000.00",
        netPaySubtext: "€28,000.00",
    },
    {
        id: "5",
        employeeId: "#E0003",
        name: "Jamison Stotzfus",
        email: "$25.00/hr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "64.00hrs",
        overtime: "+5hrs overtime",
        additionalEarnings: "$1340",
        deductions: "$1410",
        ytd: "¥2,100,000.00",
        ytdSubtext: "€28,000.00",
        grossPay: "¥2,100,000.00",
        grossPaySubtext: "€28,000.00",
        netPay: "¥2,100,000.00",
        netPaySubtext: "€28,000.00",
    },
    {
        id: "6",
        employeeId: "#E0003",
        name: "Javier Chang",
        email: "$25.00/hr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "64.00hrs",
        overtime: "+5hrs overtime",
        additionalEarnings: "-",
        deductions: "$1410",
        ytd: "€21,000.00",
        ytdSubtext: "€28,000.00",
        grossPay: "€21,000.00",
        grossPaySubtext: "€28,000.00",
        netPay: "€21,000.00",
        netPaySubtext: "€28,000.00",
    },
    {
        id: "7",
        employeeId: "#E0003",
        name: "Macey Olgun",
        email: "$25.00/hr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "80.00hrs",
        additionalEarnings: "$1420",
        deductions: "$1570",
        ytd: "€21,000.00",
        ytdSubtext: "€28,000.00",
        grossPay: "€21,000.00",
        grossPaySubtext: "€28,000.00",
        netPay: "€21,000.00",
        netPaySubtext: "€28,000.00",
    },
    {
        id: "8",
        employeeId: "#E0003",
        name: "Carter Stenger",
        email: "$25.00/hr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "64.00hrs",
        overtime: "+5hrs overtime",
        additionalEarnings: "-",
        deductions: "-",
        ytd: "¥2,100,000.00",
        ytdSubtext: "€28,000.00",
        grossPay: "¥2,100,000.00",
        grossPaySubtext: "€28,000.00",
        netPay: "¥2,100,000.00",
        netPaySubtext: "€28,000.00",
    },
    {
        id: "9",
        employeeId: "#E0003",
        name: "Amelia Rosales",
        email: "$25.00/hr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "64.00hrs",
        overtime: "+5hrs overtime",
        additionalEarnings: "$1550",
        deductions: "-",
        ytd: "€21,000.00",
        ytdSubtext: "€28,000.00",
        grossPay: "€21,000.00",
        grossPaySubtext: "€28,000.00",
        netPay: "€21,000.00",
        netPaySubtext: "€28,000.00",
    },
    {
        id: "10",
        employeeId: "#E0003",
        name: "Hadley Levesque",
        email: "$25.00/hr",
        accountNumber: "1232249218",
        routingNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "64.00hrs",
        overtime: "+5hrs overtime",
        additionalEarnings: "$1330",
        deductions: "-",
        ytd: "€21,000.00",
        ytdSubtext: "€28,000.00",
        grossPay: "€21,000.00",
        grossPaySubtext: "€28,000.00",
        netPay: "€21,000.00",
        netPaySubtext: "€28,000.00",
    },
];

export default function PendingDetail() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    // Get unique employees for filter
    const uniqueEmployees = useMemo(() => {
        const seen = new Set();
        return paymentData.filter(emp => {
            if (seen.has(emp.id)) return false;
            seen.add(emp.id);
            return true;
        }).map(emp => ({
            id: emp.id,
            name: emp.name,
            employeeId: emp.employeeId
        }));
    }, []);

    // Filter employees based on search and filters
    const filteredData = useMemo(() => {
        return paymentData.filter(employee => {
            const searchMatch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

            const workTypeMatch = selectedWorkTypes.length === 0 || selectedWorkTypes.includes(employee.workType);

            const employeeMatch = selectedEmployees.length === 0 || selectedEmployees.includes(employee.id);

            return searchMatch && workTypeMatch && employeeMatch;
        });
    }, [searchQuery, selectedWorkTypes, selectedEmployees]);

    // Export to Excel function
    const handleExportToExcel = () => {
        // Prepare data for export
        const exportData = filteredData.map(employee => ({
            'ID': employee.employeeId,
            'Employee Name': employee.name,
            'Email/Rate': employee.email,
            'Work Type': employee.workType,
            'Hours Worked': employee.hoursWorked,
            'Additional Earnings': employee.additionalEarnings,
            'Deductions': employee.deductions,
            'YTD': employee.ytd,
            'Gross Pay': employee.grossPay,
            'Net Pay': employee.netPay,
        }));

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Payment Run');

        // Save file
        XLSX.writeFile(wb, `Payment_Run_Pending_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className=" w-full min-h-screen bg-[#F9F9F9]">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-[12px] sm:gap-[16px] mb-[20px] sm:mb-[31px]">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-[24px] w-[24px] p-0 bg-white border border-[#E9E9E9] rounded-full flex-shrink-0"
                    onClick={() => router.push('/payroll/payment-run')}
                >
                    <ArrowLeft className="h-[16px] w-[16px] text-[#4B4B4B]" />
                </Button>
                <h1 className="text-[18px]/[24px] sm:text-[24px]/[30px] font-semibold text-[#353535]">
                    Run for Mar 25th - Mar 26th
                </h1>
                <Badge className="bg-[#FFDFC0] text-[#934900] border-0 px-3 py-1 rounded-[21px] text-[12px]/[18px] sm:text-[14px]/[22px] font-medium hover:bg-[#FFDFC0]">
                    Pending
                </Badge>
            </div>

            {/* Summary Cards */}
            <div className="bg-white border border-[#E9E9E9] rounded-[12px] px-[16px] sm:px-[32px] py-[16px] sm:py-[19px] mb-[32px] sm:mb-[57px]">
                <div className="grid grid-cols-2 sm:flex sm:flex-row sm:justify-between sm:items-center gap-[16px] sm:gap-[24px]">
                    <div>
                        <div className="text-[11px] sm:text-[15px]/[16px] text-[#626262] mb-[4px] sm:mb-[9px]">
                            Pay Period
                        </div>
                        <div className="text-[13px] sm:text-[15px]/[16px] font-medium text-[#353535]">
                            Mar 25th - Mar 29th
                        </div>
                    </div>
                    <div className="hidden sm:block w-[1px] h-[40px] bg-[#E9E9E9]"></div>
                    <div>
                        <div className="text-[11px] sm:text-[15px]/[16px] text-[#626262] mb-[4px] sm:mb-[9px]">
                            Employees
                        </div>
                        <div className="text-[13px] sm:text-[15px]/[16px] font-medium text-[#353535]">
                            125
                        </div>
                    </div>
                    <div className="hidden sm:block w-[1px] h-[40px] bg-[#E9E9E9]"></div>
                    <div>
                        <div className="text-[11px] sm:text-[15px]/[16px] text-[#626262] mb-[4px] sm:mb-[9px]">
                            Pay Date
                        </div>
                        <div className="text-[13px] sm:text-[15px]/[16px] font-medium text-[#353535]">
                            May 27th
                        </div>
                    </div>
                    <div className="hidden sm:block w-[1px] h-[40px] bg-[#E9E9E9]"></div>
                    <div>
                        <div className="text-[11px] sm:text-[15px]/[16px] text-[#626262] mb-[4px] sm:mb-[9px]">
                            Net Pay
                        </div>
                        <div className="text-[13px] sm:text-[15px]/[16px] font-medium text-[#353535]">
                            $45,000
                        </div>
                    </div>
                    <div className="hidden sm:block w-[1px] h-[40px] bg-[#E9E9E9]"></div>
                    <div>
                        <div className="text-[11px] sm:text-[15px]/[16px] text-[#626262] mb-[4px] sm:mb-[9px]">
                            Tax
                        </div>
                        <div className="text-[13px] sm:text-[15px]/[16px] font-medium text-[#353535]">
                            $5,000
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-[16px] sm:mb-[24px]">
                <div className="flex flex-col sm:flex-row justify-end gap-[12px] sm:gap-[16px] mb-[16px]">
                    <div className="relative w-full sm:w-[231px] h-[32px]">
                        <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-[#8C8E8E]" />
                        <Input
                            placeholder="Search"
                            className="pl-[36px] h-[32px] bg-white border-[#BCBCBC] rounded-[8px] bg-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-[12px]">
                        <Button
                            variant="outline"
                            className="h-[32px] px-[16px] border-[#4B4B4B] bg-white text-[#4B4B4B] font-semibold text-[14px]/[20px] rounded-[8px] flex items-center gap-[8px] bg-transparent flex-1 sm:flex-initial"
                            onClick={() => setFilterOpen(!filterOpen)}
                        >
                            <ListFilter className="h-[16px] w-[16px] text-[#4B4B4B]" />
                            <span className="hidden sm:inline">Filter</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-[32px] px-[16px] border-[#4B4B4B] bg-white text-[#4B4B4B] font-semibold text-[14px]/[20px] rounded-[8px] bg-transparent flex items-center gap-[8px] flex-1 sm:flex-initial"
                            onClick={handleExportToExcel}
                        >
                            <span className="hidden sm:inline">Export</span>
                            <span className="sm:hidden">Exp</span>
                        </Button>
                    </div>
                </div>

                {/* Filter Tool */}
                {filterOpen && (
                    <EmployeeFilterTool
                        selectedWorkTypes={selectedWorkTypes}
                        setSelectedWorkTypes={setSelectedWorkTypes}
                        selectedEmployees={selectedEmployees}
                        setSelectedEmployees={setSelectedEmployees}
                        employees={uniqueEmployees}
                    />
                )}
            </div>

            {/* Table */}
            <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[12px] overflow-x-auto">
                <Table className="min-w-[1400px]">
                    <TableHeader>
                        <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[95px]">
                                ID
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[196px]">
                                Employee
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[136px]">
                                Work Type
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[136px]">
                                Hours Worked
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[156px]">
                                Additional Earnings
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[143px]">
                                Deductions
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[144px]">
                                YTD
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[142px]">
                                Gross Pay
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-white w-[172px] bg-[#0D978B]">
                                Net Pay
                            </TableHead>
                            <TableHead className="w-[84px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((employee) => (
                            <TableRow
                                key={employee.id}
                                className="border-b border-[#E9E9E9] hover:bg-gray-50"
                            >
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    <div className="flex items-center gap-[3px]">
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
                                    {employee.workType}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.hoursWorked}
                                    {employee.overtime && (
                                        <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                            {employee.overtime}
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
                                    <div className="text-[11px]/[14px] text-[#8F8F8F]">{employee.ytdSubtext}</div>
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    <div>{employee.grossPay}</div>
                                    <div className="text-[11px]/[14px] text-[#8F8F8F]">{employee.grossPaySubtext}</div>
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    <div>{employee.netPay}</div>
                                    <div className="text-[11px]/[14px] text-[#8F8F8F] font-normal">{employee.netPaySubtext}</div>
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

