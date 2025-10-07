"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { ArrowLeft, Edit, Search } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock employee data
const employees = [
    {
        id: "#E001",
        name: "Alice Fernadez",
        initials: "AF",
        payRate: "$25.00/hr",
        accountNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "40hrs",
        additionalEarnings: "$125.00",
        deductions: "$50.00",
        ytd: "€2,500.00\n¥350,000",
        grossPay: "€1,250.00\n¥175,000",
        netPay: "€1,200.00\n¥168,000"
    },
    {
        id: "#E002",
        name: "Evelyn Hayes",
        initials: "EH",
        payRate: "$123,000.00/yr",
        accountNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "40hrs",
        additionalEarnings: "-",
        deductions: "$75.00",
        ytd: "€5,000.00\n¥700,000",
        grossPay: "€2,500.00\n¥350,000",
        netPay: "€2,425.00\n¥339,500"
    },
    {
        id: "#E003",
        name: "John Smith",
        initials: "JS",
        payRate: "$30.00/hr",
        accountNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "40hrs",
        additionalEarnings: "$90.00",
        deductions: "$60.00",
        ytd: "€3,000.00\n¥420,000",
        grossPay: "€1,500.00\n¥210,000",
        netPay: "€1,440.00\n¥201,600"
    },
    {
        id: "#E004",
        name: "Sarah Johnson",
        initials: "SJ",
        payRate: "$95,000.00/yr",
        accountNumber: "1232249218",
        workType: "Salary",
        hoursWorked: "40hrs",
        additionalEarnings: "-",
        deductions: "$45.00",
        ytd: "€3,800.00\n¥532,000",
        grossPay: "€1,900.00\n¥266,000",
        netPay: "€1,855.00\n¥259,700"
    },
    {
        id: "#E005",
        name: "Michael Brown",
        initials: "MB",
        payRate: "$28.00/hr",
        accountNumber: "1232249218",
        workType: "Hourly",
        hoursWorked: "40hrs",
        additionalEarnings: "$56.00",
        deductions: "$40.00",
        ytd: "€2,800.00\n¥392,000",
        grossPay: "€1,400.00\n¥196,000",
        netPay: "€1,360.00\n¥190,400"
    }
];

export default function CreatePaymentRun() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const router = useRouter();

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedEmployees(employees.map(emp => emp.id));
        } else {
            setSelectedEmployees([]);
        }
    };

    const handleSelectEmployee = (employeeId: string, checked: boolean) => {
        if (checked) {
            setSelectedEmployees(prev => [...prev, employeeId]);
        } else {
            setSelectedEmployees(prev => prev.filter(id => id !== employeeId));
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
            {/* Header */}
            <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                    {/* Breadcrumb */}
                    <div className="text-[12px] sm:text-[14px] text-gray-500 mb-1">
                        <span className=" cursor-pointer" onClick={() => router.push('/payroll/payment-run')}>Payment Run</span>
                        <span className="text-[#353535] " >/ Create Payment Run</span>
                    </div>

                    {/* Title*/}
                    <div className="flex items-center justify-between">
                        <h1 className="text-[20px] sm:text-[24px] font-semibold text-gray-900">Create Payment Run</h1>
                    </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <Button
                        variant="ghost"
                        className="border-gray-300 text-[14px]/[20px] text-gray-800 font-semibold h-10 sm:h-12 hover:bg-gray-50 flex-1 lg:flex-none"
                        onClick={() => router.back()}
                    >
                        Back
                    </Button>
                    <Button
                        className="bg-teal-600 text-[14px] sm:text-[16px] font-semibold hover:bg-teal-700 text-white px-4 py-2 h-10 sm:h-12 flex-1 lg:flex-none"
                        onClick={() => {/* Handle continue */ }}
                    >
                        Continue
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-[16px] border border-gray-200">
                {/* Pay Period Section */}
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 gap-4">
                    <div className="flex-1">
                        <label className="text-[14px]/[16px] font-medium text-gray-800 mb-2 block">
                            Pay Period
                        </label>
                        <div className="text-[18px] sm:text-[20px] font-medium text-gray-900 flex flex-col sm:flex-row sm:items-center gap-2">
                            <span>JUN 3, 2025 - JUN 31, 2025</span>
                            <Button
                                variant="ghost"
                                className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 text-[14px]/[20px] font-semibold w-fit"
                            >
                                Edit
                                <Edit className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="text-[#053834] hover:bg-gray-50 h-10 sm:h-12 px-4 sm:px-7 text-[14px] sm:text-[16px] font-semibold w-full sm:w-auto"
                        >
                            Validate
                        </Button>
                    </div>
                </div>

                {/* Search and Table */}
                <div className="">
                    {/* Search Bar */}
                    <div className="px-4 sm:px-6 py-4">
                        <div className="relative max-w-[250px]">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-8 w-full"
                            />
                        </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block lg:hidden px-4 sm:px-6 pb-6">
                        {filteredEmployees.map((employee) => (
                            <div key={employee.id} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            checked={selectedEmployees.includes(employee.id)}
                                            onCheckedChange={(checked) =>
                                                handleSelectEmployee(employee.id, checked as boolean)
                                            }
                                            className="size-[13.3px]"
                                        />
                                        <Avatar className="h-7 w-7">
                                            <AvatarFallback className="bg-[#E9E9E9] text-gray-900 text-[10px]/[12px]">
                                                {employee.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-gray-900 text-sm">{employee.id}</div>
                                            <div className="font-medium text-gray-900 text-sm">{employee.name}</div>
                                            <div className="text-[11px]/[14px] text-gray-500">{employee.payRate}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <span className="text-gray-500">Account Number:</span>
                                        <p className="font-medium text-gray-900">{employee.accountNumber}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Work Type:</span>
                                        <p className="font-medium text-gray-900">{employee.workType}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Hours Worked:</span>
                                        <p className="font-medium text-gray-900">{employee.hoursWorked}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Additional Earnings:</span>
                                        <p className="font-medium text-gray-900">{employee.additionalEarnings}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Deductions:</span>
                                        <p className="font-medium text-gray-900">{employee.deductions}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">YTD:</span>
                                        <p className="font-medium text-gray-900 whitespace-pre-line text-[10px]">
                                            {employee.ytd}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Gross Pay:</span>
                                        <p className="font-medium text-gray-900 whitespace-pre-line text-[10px]">
                                            {employee.grossPay}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Net Pay (EBT):</span>
                                        <p className="font-medium text-gray-900 text-teal-600 whitespace-pre-line text-[10px]">
                                            {employee.netPay}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table Container with Horizontal Scroll */}
                    <div className="hidden lg:block mx-4 sm:mx-6 border border-gray-200 rounded-[16px] overflow-auto">
                        <Table className="min-w-[1200px]">
                            <TableHeader>
                                <TableRow className="bg-[#EEF3F2] border-b border-gray-200">
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedEmployees.length === employees.length}
                                            onCheckedChange={handleSelectAll}
                                            className="size-[13.3px]"
                                        />
                                    </TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[80px]">ID</TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[200px]">Employee</TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[150px]">Account Number</TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[100px]">Work Type</TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[150px]">Hours Worked</TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[150px]">Additional Earnings</TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[100px]">Deductions</TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[120px]">YTD</TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[120px]">Gross Pay</TableHead>
                                    <TableHead className="font-medium text-[#8C8E8E] py-[9px] px-[16px] text-[12px]/[22px] min-w-[120px] bg-[#0D978B] text-white">Net Pay (EBT)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmployees.map((employee) => (
                                    <TableRow key={employee.id} className="hover:bg-gray-50">
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedEmployees.includes(employee.id)}
                                                onCheckedChange={(checked) =>
                                                    handleSelectEmployee(employee.id, checked as boolean)
                                                }
                                                className="size-[13.3px]"
                                            />
                                        </TableCell>
                                        <TableCell className="min-w-[80px] text-gray-900 text-[14px]/[22px]">
                                            {employee.id}
                                        </TableCell>
                                        <TableCell className="min-w-[200px]">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-7 w-7">
                                                    <AvatarFallback className="bg-[#E9E9E9] text-gray-900 text-[10px]/[12px]">
                                                        {employee.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-gray-900">{employee.name}</div>
                                                    <div className="text-[11px]/[14px] text-gray-500">{employee.payRate}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="min-w-[120px] text-gray-900 text-[14px]/[22px]">
                                            {employee.accountNumber}
                                        </TableCell>
                                        <TableCell className="min-w-[100px] text-gray-900 text-[14px]/[22px]">
                                            {employee.workType}
                                        </TableCell>
                                        <TableCell className="min-w-[150px] text-gray-900 text-[14px]/[22px]">
                                            {employee.hoursWorked}
                                        </TableCell>
                                        <TableCell className="min-w-[130px] text-gray-900 text-[14px]/[22px]">
                                            {employee.additionalEarnings}
                                        </TableCell>
                                        <TableCell className="min-w-[100px] text-gray-900 text-[14px]/[22px]">
                                            {employee.deductions}
                                        </TableCell>
                                        <TableCell className="min-w-[120px] text-gray-900 text-[14px]/[22px]">
                                            <div className="whitespace-pre-line text-sm">
                                                {employee.ytd}
                                            </div>
                                        </TableCell>
                                        <TableCell className="min-w-[120px] text-gray-900 text-[14px]/[22px]">
                                            <div className="whitespace-pre-line text-sm">
                                                {employee.grossPay}
                                            </div>
                                        </TableCell>
                                        <TableCell className="min-w-[120px]  text-gray-900 text-[14px]/[22px]">
                                            <div className="whitespace-pre-line text-sm">
                                                {employee.netPay}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
