"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ArrowLeft, ListFilter, MoreVertical, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { EmployeeFilterTool } from "../[id]/components/employee-filter";
import PaystubSheet, { PaystubEmployee } from "../components/PaystubSheet";
import * as XLSX from 'xlsx';

// Mock employee payment data
const paymentData = [
    {
        id: "1",
        employeeId: "#E0030",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Hourly",
        grossPay: "€21,050.00",
        grossPaySubtext: "€2,836",
        netPay: "€21,050.00",
        netPaySubtext: "€2,836",
        paymentStatus: "Paid",
        tax: "€2,836",
        taxSubtext: "€2,836",
    },
    {
        id: "2",
        employeeId: "#E0023",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Salary",
        grossPay: "¥2,300,000.00",
        grossPaySubtext: "€1,230",
        netPay: "¥1,820,000.00",
        netPaySubtext: "€1,230",
        paymentStatus: "Pending",
        tax: "€1,230",
        taxSubtext: "€1,230",
    },
    {
        id: "3",
        employeeId: "#E0023",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Salary",
        grossPay: "€2,000.00",
        grossPaySubtext: "€2,836",
        netPay: "€2,000.00",
        netPaySubtext: "€2,836",
        paymentStatus: "Refunded",
        tax: "€2,836",
        taxSubtext: "€2,836",
    },
    {
        id: "4",
        employeeId: "#E0023",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Salary",
        grossPay: "€2,000.00",
        grossPaySubtext: "€2,836",
        netPay: "€2,000.00",
        netPaySubtext: "€2,836",
        paymentStatus: "Paid",
        tax: "€2,836",
        taxSubtext: "€2,836",
    },
    {
        id: "5",
        employeeId: "#E0023",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Hourly",
        grossPay: "¥2,300,000.00",
        grossPaySubtext: "€1,230",
        netPay: "¥1,820,000.00",
        netPaySubtext: "€1,230",
        paymentStatus: "Paid",
        tax: "€1,230",
        taxSubtext: "€1,230",
    },
    {
        id: "6",
        employeeId: "#E0023",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Hourly",
        grossPay: "€2,000.00",
        grossPaySubtext: "€2,836",
        netPay: "€2,000.00",
        netPaySubtext: "€2,836",
        paymentStatus: "Paid",
        tax: "€2,836",
        taxSubtext: "€2,836",
    },
    {
        id: "7",
        employeeId: "#E0023",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Salary",
        grossPay: "€2,000.00",
        grossPaySubtext: "€2,836",
        netPay: "€2,000.00",
        netPaySubtext: "€2,836",
        paymentStatus: "Paid",
        tax: "€2,836",
        taxSubtext: "€2,836",
    },
    {
        id: "8",
        employeeId: "#E0023",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Hourly",
        grossPay: "¥2,300,000.00",
        grossPaySubtext: "€1,230",
        netPay: "¥1,820,000.00",
        netPaySubtext: "€1,230",
        paymentStatus: "Paid",
        tax: "€1,230",
        taxSubtext: "€1,230",
    },
    {
        id: "9",
        employeeId: "#E0023",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Hourly",
        grossPay: "€2,000.00",
        grossPaySubtext: "€2,836",
        netPay: "€2,000.00",
        netPaySubtext: "€2,836",
        paymentStatus: "Paid",
        tax: "€2,836",
        taxSubtext: "€2,836",
    },
    {
        id: "10",
        employeeId: "#E0023",
        name: "Alice Fernandez",
        email: "€21a",
        workType: "Hourly",
        grossPay: "€2,000.00",
        grossPaySubtext: "€2,836",
        netPay: "€2,000.00",
        netPaySubtext: "€2,836",
        paymentStatus: "Paid",
        tax: "€2,836",
        taxSubtext: "€2,836",
    },
];

// Transform payment data to PaystubEmployee format
const transformToPaystubData = (paymentData: any[]): PaystubEmployee[] => {
    return paymentData.map(emp => ({
        id: emp.id,
        name: emp.name,
        email: emp.email.includes('€') ? `${emp.name.toLowerCase().replace(/\s+/g, '')}@company.com` : emp.email,
        phone: "+44 12 3456 7890", // Mock phone
        address: "123 Highland Drive, Anytown, CA", // Mock address
        employeeId: emp.employeeId,
        niNumber: "123412568712", // Mock NI number
        taxCode: "12508", // Mock tax code
        bankDetails: "Wells Fargo - 1232249218", // Mock bank details
        paymentMethod: "Direct Deposit",
        payPeriod: "May 1 - May 31, 2025",
        payDate: "June 1, 2025",
        payrollNumber: "12345687",
        payType: emp.workType,
        earnings: [
            {
                description: "Standard Pay",
                hours: 40,
                rate: 12.5,
                current: parseFloat(emp.grossPay.replace(/[€¥$,]/g, '')) * 0.8 || 2000,
                ytd: parseFloat(emp.grossPay.replace(/[€¥$,]/g, '')) * 0.8 || 2000,
            },
            {
                description: "Overtime",
                hours: 8,
                rate: 12.5,
                current: parseFloat(emp.grossPay.replace(/[€¥$,]/g, '')) * 0.2 || 500,
                ytd: parseFloat(emp.grossPay.replace(/[€¥$,]/g, '')) * 0.2 || 500,
            }
        ],
        deductions: [
            {
                description: "PAYE Tax",
                current: parseFloat(emp.tax.replace(/[€¥$,]/g, '')) || 500,
                ytd: parseFloat(emp.tax.replace(/[€¥$,]/g, '')) || 500,
            },
            {
                description: "Health Insurance",
                current: 200,
                ytd: 200,
            },
            {
                description: "401k",
                current: 300,
                ytd: 300,
            }
        ],
        contributions: [
            {
                description: "Employer 401k Match",
                current: 300,
                ytd: 300,
            },
            {
                description: "Health Insurance Contribution",
                current: 150,
                ytd: 150,
            }
        ],
        grossPay: parseFloat(emp.grossPay.replace(/[€¥$,]/g, '')) || 2000,
        totalDeductions: (parseFloat(emp.tax.replace(/[€¥$,]/g, '')) || 500) + 200 + 300,
        totalContributions: 300 + 150,
        netPay: parseFloat(emp.netPay.replace(/[€¥$,]/g, '')) || 1500,
    }));
};

export default function PaidDetail() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [isPaystubOpen, setIsPaystubOpen] = useState(false);

    // Transform data for paystub component
    const paystubData = useMemo(() => transformToPaystubData(paymentData), []);

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
            'Gross Pay': employee.grossPay,
            'Tax': employee.tax,
            'Status': employee.paymentStatus,
            'Net Pay': employee.netPay,
        }));

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Payment Run');

        // Save file
        XLSX.writeFile(wb, `Payment_Run_Paid_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="p-4 sm:px-[8px] sm:py-[12px] w-full min-h-screen bg-[#F9F9F9]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[16px] mb-[20px] sm:mb-[31px]">
                <div className="flex items-center gap-[12px] sm:gap-[16px]">
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
                    <Badge className="bg-[#D6EEEC] text-[#0D978B] border-0 px-3 py-1 rounded-[21px] text-[12px]/[18px] sm:text-[14px]/[22px] font-medium hover:bg-[#D6EEEC]">
                        Paid
                    </Badge>
                </div>
                <Button className="w-full sm:w-auto sm:ml-auto bg-[#0D978B] hover:bg-[#0c8679] h-[40px] px-[16px] text-[14px]/[20px] font-medium rounded-[8px]">
                    Distribute Payslip
                </Button>
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
            <div className="mb-[16px] sm:mb-[21px]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[16px] sm:gap-[24px]">
                    {/* Status Filter Badges */}
                    <div className="flex flex-wrap gap-[16px] sm:gap-[25px] items-center">
                        <div className="flex items-center">
                            <span className="h-[5px] w-[5px] rounded-full bg-[#17A39C] inline-block mr-2"></span>
                            <span className="text-[#626262] text-[12px] sm:text-[13px]/[16px] font-normal">Paid 256</span>
                        </div>
                        <div className="flex items-center">
                            <span className="h-[5px] w-[5px] rounded-full bg-[#FFAE4F] inline-block mr-2"></span>
                            <span className="text-[#626262] text-[12px] sm:text-[13px]/[16px] font-normal">Pending 25</span>
                        </div>
                        <div className="flex items-center">
                            <span className="h-[5px] w-[5px] rounded-full bg-[#C71F1F] inline-block mr-2"></span>
                            <span className="text-[#626262] text-[12px] sm:text-[13px]/[16px] font-normal">Refunded 2</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-[12px] sm:gap-[16px] w-full sm:w-auto">
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
                <Table className="min-w-[900px]">
                    <TableHeader>
                        <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[95px]">
                                ID
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[196px]">
                                Employee
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[156px]">
                                Gross Pay (EBT)
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[143px]">
                                Tax
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[144px]">
                                Status
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[172px]">
                                Net Pay (AT)
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
                                    <div>{employee.grossPay}</div>
                                    <div className="text-[11px]/[14px] text-[#8F8F8F]">{employee.grossPaySubtext}</div>
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    <div>{employee.tax}</div>
                                    <div className="text-[11px]/[14px] text-[#8F8F8F]">{employee.taxSubtext}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`border-0 px-3 py-1 rounded-[21px] text-[12px]/[18px] font-medium ${employee.paymentStatus === 'Paid' ? 'bg-[#D6EEEC] text-[#0D978B] hover:bg-[#D6EEEC]' :
                                        employee.paymentStatus === 'Pending' ? 'bg-[#E9E9E9] text-[#4B4B4B] hover:bg-[#FFDFC0]' :
                                            'bg-[#C306061A] text-[#C30606] hover:bg-[#FFE5E5]'
                                        }`}>
                                        {employee.paymentStatus}
                                    </Badge>
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
                                            <DropdownMenuItem
                                                className="text-[12px]/[18px] text-[#4B4B4B] h-[32px]"
                                                onClick={() => setIsPaystubOpen(true)}
                                            >
                                                View Summary
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B] h-[32px]">
                                                Download
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Enhanced Paystub Sheet */}
            <PaystubSheet
                isOpen={isPaystubOpen}
                onClose={() => setIsPaystubOpen(false)}
                employees={paystubData}
                companyLogo="/images/logo.png"
                companyName="Projitt HR"
            />
        </div>
    );
}

