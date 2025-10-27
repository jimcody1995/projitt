"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X, Download, Mail, ChevronLeft, ChevronRight, Search, Filter, ArrowLeft, Eye, ListFilter } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";

// Types for paystub data
export interface PaystubEarning {
    description: string;
    hours: number;
    rate: number;
    current: number;
    ytd: number;
}

export interface PaystubDeduction {
    description: string;
    current: number;
    ytd: number;
}

export interface PaystubContribution {
    description: string;
    current: number;
    ytd: number;
}

export interface PaystubEmployee {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    employeeId: string;
    niNumber: string;
    taxCode: string;
    bankDetails: string;
    paymentMethod: string;
    payPeriod: string;
    payDate: string;
    payrollNumber: string;
    payType: string;
    earnings: PaystubEarning[];
    deductions: PaystubDeduction[];
    contributions: PaystubContribution[];
    grossPay: number;
    totalDeductions: number;
    totalContributions: number;
    netPay: number;
}

interface PaystubSheetProps {
    isOpen: boolean;
    onClose: () => void;
    employees: PaystubEmployee[];
    companyLogo?: string;
    companyName?: string;
}

export default function PaystubSheet({
    isOpen,
    onClose,
    employees,
    companyLogo = "/images/logo.png",
    companyName = "Company Name"
}: PaystubSheetProps) {
    const router = useRouter();
    const [selectedEmployee, setSelectedEmployee] = useState<PaystubEmployee | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [filterPayType, setFilterPayType] = useState<string>("all");
    const [filterMonth, setFilterMonth] = useState<string>("all");
    const itemsPerPage = 1; // Show one employee at a time like the payslip example

    // Filter and paginate employees
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const searchMatch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.payrollNumber.includes(searchQuery);

            const statusMatch = filterStatus === "all" ||
                (filterStatus === "paid" && emp.netPay > 0) ||
                (filterStatus === "pending" && emp.netPay === 0);

            const payTypeMatch = filterPayType === "all" || emp.payType.toLowerCase() === filterPayType.toLowerCase();

            const monthMatch = filterMonth === "all" || emp.payPeriod.toLowerCase().includes(filterMonth.toLowerCase());

            return searchMatch && statusMatch && payTypeMatch && monthMatch;
        });
    }, [employees, searchQuery, filterStatus, filterPayType, filterMonth]);

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const currentEmployee = filteredEmployees[(currentPage - 1) * itemsPerPage];

    // Generate PDF with enhanced layout
    const generatePDF = (employee: PaystubEmployee) => {
        const doc = new jsPDF();

        // Set up colors
        const primaryColor = [13, 151, 139]; // #0D978B
        const lightGreen = [214, 238, 236]; // #D6EEEC
        const lightBlue = [215, 236, 234]; // #D7ECEA

        // Add company logo and header
        if (companyLogo) {
            try {
                doc.addImage(companyLogo, 'PNG', 20, 20, 30, 15);
            } catch (error) {
                console.log('Logo not found, using text instead');
                doc.setFontSize(16);
                doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                doc.text('Projitt', 20, 30);
            }
        }

        // Company name and title
        doc.setFontSize(16);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(companyName, 60, 30);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Paystub', 60, 40);

        // Employee information section
        doc.setFontSize(10);
        doc.text(`Employee: ${employee.name}`, 20, 60);
        doc.text(`ID: ${employee.employeeId}`, 20, 70);
        doc.text(`Pay Period: ${employee.payPeriod}`, 20, 80);
        doc.text(`Pay Date: ${employee.payDate}`, 20, 90);

        // Earnings table
        doc.setFontSize(12);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text('EARNINGS', 20, 110);

        const earningsData = employee.earnings.map(earning => [
            earning.description,
            earning.hours.toString(),
            earning.rate.toString(),
            `$${earning.current.toFixed(2)}`,
            `$${earning.ytd.toFixed(2)}`
        ]);

        autoTable(doc, {
            head: [['Description', 'Hours', 'Rate', 'Current ($)', 'YTD ($)']],
            body: earningsData,
            startY: 120,
            styles: {
                fontSize: 9,
                cellPadding: 3,
                textColor: [0, 0, 0]
            },
            headStyles: {
                fillColor: lightGreen,
                textColor: [0, 0, 0],
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [248, 249, 250]
            }
        });

        // Get the Y position after earnings table
        const earningsEndY = (doc as any).lastAutoTable.finalY || 180;

        // Deductions table
        const deductionsData = employee.deductions.map(deduction => [
            deduction.description,
            `$${deduction.current.toFixed(2)}`,
            `$${deduction.ytd.toFixed(2)}`
        ]);

        autoTable(doc, {
            head: [['Description', 'Current ($)', 'YTD ($)']],
            body: deductionsData,
            startY: earningsEndY + 20,
            styles: {
                fontSize: 9,
                cellPadding: 3,
                textColor: [0, 0, 0]
            },
            headStyles: {
                fillColor: lightBlue,
                textColor: [0, 0, 0],
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [248, 249, 250]
            }
        });

        // Get the Y position after deductions table
        const deductionsEndY = (doc as any).lastAutoTable.finalY || 250;

        // Net pay section
        doc.setFontSize(12);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text('NET PAY', 20, deductionsEndY + 20);
        doc.setFontSize(16);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(`$${employee.netPay.toFixed(2)}`, 20, deductionsEndY + 35);

        // Generate filename
        const filename = `paystub_${employee.name.replace(/\s+/g, '_')}_${employee.payPeriod.replace(/\s+/g, '_')}.pdf`;

        // Save the PDF
        doc.save(filename);

        return filename;
    };

    // Generate PDF and show preview
    const handleDownloadWithPreview = async (employee: PaystubEmployee) => {
        try {
            const doc = new jsPDF();

            // Set up colors
            const primaryColor = [13, 151, 139]; // #0D978B
            const lightGreen = [214, 238, 236]; // #D6EEEC
            const lightBlue = [215, 236, 234]; // #D7ECEA

            // Add company logo and header
            if (companyLogo) {
                try {
                    doc.addImage(companyLogo, 'PNG', 20, 20, 30, 15);
                } catch (error) {
                    console.log('Logo not found, using text instead');
                    doc.setFontSize(16);
                    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                    doc.text('Projitt', 20, 30);
                }
            }

            // Company name and title
            doc.setFontSize(16);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(companyName, 60, 30);
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Paystub', 60, 40);

            // Employee information section
            doc.setFontSize(10);
            doc.text(`Employee: ${employee.name}`, 20, 60);
            doc.text(`ID: ${employee.employeeId}`, 20, 70);
            doc.text(`Pay Period: ${employee.payPeriod}`, 20, 80);
            doc.text(`Pay Date: ${employee.payDate}`, 20, 90);

            // Earnings table
            doc.setFontSize(12);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text('EARNINGS', 20, 110);

            const earningsData = employee.earnings.map(earning => [
                earning.description,
                earning.hours.toString(),
                earning.rate.toString(),
                `$${earning.current.toFixed(2)}`,
                `$${earning.ytd.toFixed(2)}`
            ]);

            autoTable(doc, {
                head: [['Description', 'Hours', 'Rate', 'Current ($)', 'YTD ($)']],
                body: earningsData,
                startY: 120,
                styles: {
                    fontSize: 9,
                    cellPadding: 3,
                    textColor: [0, 0, 0]
                },
                headStyles: {
                    fillColor: lightGreen,
                    textColor: [0, 0, 0],
                    fontStyle: 'bold'
                },
                alternateRowStyles: {
                    fillColor: [248, 249, 250]
                }
            });

            // Get the Y position after earnings table
            const earningsEndY = (doc as any).lastAutoTable.finalY || 180;

            // Deductions table
            const deductionsData = employee.deductions.map(deduction => [
                deduction.description,
                `$${deduction.current.toFixed(2)}`,
                `$${deduction.ytd.toFixed(2)}`
            ]);

            autoTable(doc, {
                head: [['Description', 'Current ($)', 'YTD ($)']],
                body: deductionsData,
                startY: earningsEndY + 20,
                styles: {
                    fontSize: 9,
                    cellPadding: 3,
                    textColor: [0, 0, 0]
                },
                headStyles: {
                    fillColor: lightBlue,
                    textColor: [0, 0, 0],
                    fontStyle: 'bold'
                },
                alternateRowStyles: {
                    fillColor: [248, 249, 250]
                }
            });

            // Get the Y position after deductions table
            const deductionsEndY = (doc as any).lastAutoTable.finalY || 250;

            // Net pay section
            doc.setFontSize(12);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text('NET PAY', 20, deductionsEndY + 20);
            doc.setFontSize(16);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(`$${employee.netPay.toFixed(2)}`, 20, deductionsEndY + 35);

            // Generate filename
            const filename = `paystub_${employee.name.replace(/\s+/g, '_')}_${employee.payPeriod.replace(/\s+/g, '_')}.pdf`;

            // Create blob for preview
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Download the PDF
            doc.save(filename);

            // Show success message and preview
            alert(`PDF downloaded successfully: ${filename}`);

            // Open PDF in new tab for preview
            setTimeout(() => {
                window.open(pdfUrl, '_blank');
            }, 1000);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    };

    // Email paystub (placeholder function)
    const emailPaystub = (employee: PaystubEmployee) => {
        // This would typically integrate with an email service
        alert(`Emailing paystub to ${employee.email}`);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Preview PDF without downloading
    const handlePreviewPDF = async (employee: PaystubEmployee) => {
        try {
            const doc = new jsPDF();

            // Set up colors
            const primaryColor = [13, 151, 139]; // #0D978B
            const lightGreen = [214, 238, 236]; // #D6EEEC
            const lightBlue = [215, 236, 234]; // #D7ECEA

            // Add company logo and header
            if (companyLogo) {
                try {
                    doc.addImage(companyLogo, 'PNG', 20, 20, 30, 15);
                } catch (error) {
                    console.log('Logo not found, using text instead');
                    doc.setFontSize(16);
                    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                    doc.text('Projitt', 20, 30);
                }
            }

            // Company name and title
            doc.setFontSize(16);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(companyName, 60, 30);
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Paystub', 60, 40);

            // Employee information section
            doc.setFontSize(10);
            doc.text(`Employee: ${employee.name}`, 20, 60);
            doc.text(`ID: ${employee.employeeId}`, 20, 70);
            doc.text(`Pay Period: ${employee.payPeriod}`, 20, 80);
            doc.text(`Pay Date: ${employee.payDate}`, 20, 90);

            // Earnings table
            doc.setFontSize(12);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text('EARNINGS', 20, 110);

            const earningsData = employee.earnings.map(earning => [
                earning.description,
                earning.hours.toString(),
                earning.rate.toString(),
                `$${earning.current.toFixed(2)}`,
                `$${earning.ytd.toFixed(2)}`
            ]);

            autoTable(doc, {
                head: [['Description', 'Hours', 'Rate', 'Current ($)', 'YTD ($)']],
                body: earningsData,
                startY: 120,
                styles: {
                    fontSize: 9,
                    cellPadding: 3,
                    textColor: [0, 0, 0]
                },
                headStyles: {
                    fillColor: lightGreen,
                    textColor: [0, 0, 0],
                    fontStyle: 'bold'
                },
                alternateRowStyles: {
                    fillColor: [248, 249, 250]
                }
            });

            // Get the Y position after earnings table
            const earningsEndY = (doc as any).lastAutoTable.finalY || 180;

            // Deductions table
            const deductionsData = employee.deductions.map(deduction => [
                deduction.description,
                `$${deduction.current.toFixed(2)}`,
                `$${deduction.ytd.toFixed(2)}`
            ]);

            autoTable(doc, {
                head: [['Description', 'Current ($)', 'YTD ($)']],
                body: deductionsData,
                startY: earningsEndY + 20,
                styles: {
                    fontSize: 9,
                    cellPadding: 3,
                    textColor: [0, 0, 0]
                },
                headStyles: {
                    fillColor: lightBlue,
                    textColor: [0, 0, 0],
                    fontStyle: 'bold'
                },
                alternateRowStyles: {
                    fillColor: [248, 249, 250]
                }
            });

            // Get the Y position after deductions table
            const deductionsEndY = (doc as any).lastAutoTable.finalY || 250;

            // Net pay section
            doc.setFontSize(12);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text('NET PAY', 20, deductionsEndY + 20);
            doc.setFontSize(16);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(`$${employee.netPay.toFixed(2)}`, 20, deductionsEndY + 35);

            // Create blob for preview
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Open PDF in new tab for preview
            window.open(pdfUrl, '_blank');

        } catch (error) {
            console.error('Error generating PDF preview:', error);
            alert('Error generating PDF preview. Please try again.');
        }
    };

    const handleDownload = async () => {
        if (!currentEmployee) return;
        handleDownloadWithPreview(currentEmployee);
    };

    const handlePreview = async () => {
        if (!currentEmployee) return;
        handlePreviewPDF(currentEmployee);
    };

    const handleEmail = () => {
        if (!currentEmployee) return;
        emailPaystub(currentEmployee);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-[900px] sm:min-w-[900px] p-0 overflow-y-auto" close={false}>
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="px-[16px] sm:px-[32px] py-[20px] sm:py-[29px] flex items-center justify-between flex-shrink-0 border-b border-[#E9E9E9]">
                        <div className="flex items-center gap-3">
                            {companyLogo ? (
                                <Image
                                    src={companyLogo}
                                    alt="Company Logo"
                                    width={100}
                                    height={100}
                                    className="rounded-lg"
                                />
                            ) : (
                                <div className="text-[16px]/[24px] font-semibold text-[#353535]">Projitt</div>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-[32px] w-[32px] p-0 hover:bg-gray-100 rounded-[6px] border border-[#E9E9E9]"
                            onClick={onClose}
                        >
                            <X className="h-[16px] w-[16px] text-[#4B4B4B]" />
                        </Button>
                    </div>

                    {/* Filters and Search */}
                    <div className="px-[16px] sm:px-[32px] py-[16px] border-b border-[#E9E9E9]">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name, payroll #, or email..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={filterPayType} onValueChange={setFilterPayType}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Pay Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="hourly">Hourly</SelectItem>
                                    <SelectItem value="salary">Salary</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={filterMonth} onValueChange={setFilterMonth}>
                                <SelectTrigger className="w-[140px]">
                                    <ListFilter className="mr-2 h-4 w-4" />
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Months</SelectItem>
                                    <SelectItem value="may">May 2025</SelectItem>
                                    <SelectItem value="april">April 2025</SelectItem>
                                    <SelectItem value="march">March 2025</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Paystub Content */}
                    <div className="flex-1 overflow-y-auto">
                        {currentEmployee ? (
                            <div className="px-[16px] sm:px-[32px] py-[16px]">
                                {/* Employee Info Table */}
                                <div className="mb-[24px] sm:mb-[47px]  overflow-hidden px-[16px] sm:px-[32px]">
                                    <div className="grid grid-cols-1 sm:grid-cols-2">
                                        {/* Row 1 */}
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b sm:border-r border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Full Name</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.name}</div>
                                        </div>
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Phone</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.phone}</div>
                                        </div>

                                        {/* Row 2 */}
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b sm:border-r border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Email</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.email}</div>
                                        </div>
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Address</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.address}</div>
                                        </div>

                                        {/* Row 3 */}
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b sm:border-r border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Pay Period</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.payPeriod}</div>
                                        </div>
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Pay Type</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.payType}</div>
                                        </div>

                                        {/* Row 4 */}
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b sm:border-r border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Pay Date</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.payDate}</div>
                                        </div>
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Payroll #</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.payrollNumber}</div>
                                        </div>

                                        {/* Row 5 */}
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b sm:border-r border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">NI Number</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.niNumber}</div>
                                        </div>
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Tax Code</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.taxCode}</div>
                                        </div>

                                        {/* Row 6 */}
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b sm:border-r border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Bank</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.bankDetails}</div>
                                        </div>
                                        <div className="px-[12px] pt-[12px] pb-[6px] flex flex-row justify-between border-b border-[#E9E9E9] bg-white">
                                            <div className="text-[12px]/[18px] text-[#8F8F8F]">Payment Method</div>
                                            <div className="text-[12px]/[22px] text-[#1C1C1C]">{currentEmployee.paymentMethod}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* EARNINGS Section */}
                                <div className="mb-[24px] sm:mb-[32px] px-[16px] sm:px-[32px]">
                                    <h3 className="text-[14px]/[26px] font-medium text-[#4b4b4b] mb-[6px]">EARNINGS</h3>

                                    <div className="overflow-x-auto -mx-[16px] sm:mx-0 px-[16px] sm:px-0">
                                        <div className="min-w-[500px] sm:min-w-0">
                                            {/* Table Header */}
                                            <div className="grid grid-cols-5 bg-[#D6EEEC] border-b border-[#E9E9E9] items-start">
                                                <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">Description</div>
                                                <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">Hours</div>
                                                <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">Rate</div>
                                                <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">Current ($)</div>
                                                <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">YTD ($)</div>
                                            </div>

                                            {/* Table Rows */}
                                            {currentEmployee.earnings.map((earning, index) => (
                                                <div key={index} className="grid grid-cols-5 border-b border-[#E9E9E9]">
                                                    <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{earning.description}</div>
                                                    <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{earning.hours}</div>
                                                    <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{earning.rate}</div>
                                                    <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{formatCurrency(earning.current)}</div>
                                                    <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{formatCurrency(earning.ytd)}</div>
                                                </div>
                                            ))}

                                            {/* Total Row */}
                                            <div className="grid grid-cols-5">
                                                <div className="py-[10px] px-[12px] text-[14px]/[18px] font-semibold text-[#0D978B] col-span-3">Total</div>
                                                <div className="py-[10px] px-[12px] text-[14px]/[18px] font-semibold text-[#0D978B]">{formatCurrency(currentEmployee.grossPay)}</div>
                                                <div className="py-[10px] px-[12px] text-[14px]/[18px] font-semibold text-[#0D978B]">{formatCurrency(currentEmployee.grossPay)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* DEDUCTIONS Section */}
                                <div className="mb-[24px] sm:mb-[32px] px-[16px] sm:px-[32px]">
                                    <h3 className="text-[14px]/[18px] font-semibold text-[#4B4B4B] mb-[12px]">DEDUCTIONS</h3>

                                    <div className="overflow-x-auto -mx-[16px] sm:mx-0 px-[16px] sm:px-0">
                                        <div className="min-w-[400px] sm:min-w-0">
                                            {/* Table Header */}
                                            <div className="grid grid-cols-3 bg-[#D7ECEA] border-b border-[#E9E9E9]">
                                                <div className="py-[8px] px-[12px] text-[12px]/[18px] font-medium text-[#353535]">Description</div>
                                                <div className="py-[8px] px-[12px] text-[12px]/[18px] font-medium text-[#353535]">Current ($)</div>
                                                <div className="py-[8px] px-[12px] text-[12px]/[18px] font-medium text-[#353535]">YTD ($)</div>
                                            </div>

                                            {/* Table Rows */}
                                            {currentEmployee.deductions.map((deduction, index) => (
                                                <div key={index} className="grid grid-cols-3 border-b border-[#E9E9E9]">
                                                    <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{deduction.description}</div>
                                                    <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{formatCurrency(deduction.current)}</div>
                                                    <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{formatCurrency(deduction.ytd)}</div>
                                                </div>
                                            ))}

                                            {/* Total Row */}
                                            <div className="grid grid-cols-3">
                                                <div className="py-[10px] px-[12px] text-[14px]/[18px] font-semibold text-[#4B4B4B]">Total</div>
                                                <div className="py-[10px] px-[12px] text-[14px]/[18px] font-semibold text-[#4B4B4B]">{formatCurrency(currentEmployee.totalDeductions)}</div>
                                                <div className="py-[10px] px-[12px] text-[14px]/[18px] font-semibold text-[#4B4B4B]">{formatCurrency(currentEmployee.totalDeductions)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CONTRIBUTIONS Section */}
                                {currentEmployee.contributions && currentEmployee.contributions.length > 0 && (
                                    <div className="mb-[24px] sm:mb-[32px] px-[16px] sm:px-[32px]">
                                        <h3 className="text-[14px]/[18px] font-semibold text-[#4B4B4B] mb-[12px]">CONTRIBUTIONS</h3>

                                        <div className="overflow-x-auto -mx-[16px] sm:mx-0 px-[16px] sm:px-0">
                                            <div className="min-w-[400px] sm:min-w-0">
                                                {/* Table Header */}
                                                <div className="grid grid-cols-3 bg-[#E8F4F8] border-b border-[#E9E9E9]">
                                                    <div className="py-[8px] px-[12px] text-[12px]/[18px] font-medium text-[#353535]">Description</div>
                                                    <div className="py-[8px] px-[12px] text-[12px]/[18px] font-medium text-[#353535]">Current ($)</div>
                                                    <div className="py-[8px] px-[12px] text-[12px]/[18px] font-medium text-[#353535]">YTD ($)</div>
                                                </div>

                                                {/* Table Rows */}
                                                {currentEmployee.contributions.map((contribution, index) => (
                                                    <div key={index} className="grid grid-cols-3 border-b border-[#E9E9E9]">
                                                        <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{contribution.description}</div>
                                                        <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{formatCurrency(contribution.current)}</div>
                                                        <div className="py-[8px] px-[12px] text-[14px]/[18px] text-[#4B4B4B]">{formatCurrency(contribution.ytd)}</div>
                                                    </div>
                                                ))}

                                                {/* Total Row */}
                                                <div className="grid grid-cols-3">
                                                    <div className="py-[10px] px-[12px] text-[14px]/[18px] font-semibold text-[#4B4B4B]">Total</div>
                                                    <div className="py-[10px] px-[12px] text-[14px]/[18px] font-semibold text-[#4B4B4B]">{formatCurrency(currentEmployee.totalContributions)}</div>
                                                    <div className="py-[10px] px-[12px] text-[14px]/[18px] font-semibold text-[#4B4B4B]">{formatCurrency(currentEmployee.totalContributions)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* NET PAY Section */}
                                <div className="mb-[40px] sm:mb-[73px] px-[16px] sm:px-[32px]">
                                    <div className="text-[14px]/[26px] font-medium text-[#4B4B4B] mb-[4px]">NET PAY</div>
                                    <div className="text-[16px]/[18px] font-semibold text-[#0D978B] mb-[2px]">{formatCurrency(currentEmployee.netPay)}</div>
                                    <div className="text-[12px]/[18px] text-[#787878]">Wired via {currentEmployee.paymentMethod} on {currentEmployee.payDate}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center py-12 text-[#8F8F8F]">
                                    No paystubs found matching your criteria
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions and Pagination */}
                    {currentEmployee && (
                        <div className="px-[16px] sm:px-[32px] py-[16px] border-t border-[#E9E9E9] flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button
                                    onClick={handlePreview}
                                    variant="outline"
                                    className="flex-1 sm:flex-none border-[#0D978B] text-[#0D978B] font-semibold text-[14px]/[20px] rounded-[12px]"
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview PDF
                                </Button>
                                <Button
                                    onClick={handleDownload}
                                    className="flex-1 sm:flex-none bg-[#0D978B] hover:bg-[#0c8679] text-white font-semibold text-[14px]/[20px] rounded-[12px]"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF
                                </Button>
                                <Button
                                    onClick={handleEmail}
                                    variant="outline"
                                    className="flex-1 sm:flex-none border-[#0D978B] text-[#0D978B] font-semibold text-[14px]/[20px] rounded-[12px]"
                                >
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email
                                </Button>
                            </div>

                            {totalPages > 1 && (
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="h-8 w-8 p-0"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                        </PaginationItem>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <PaginationItem key={page}>
                                                <Button
                                                    variant={currentPage === page ? "primary" : "outline"}
                                                    size="sm"
                                                    onClick={() => setCurrentPage(page)}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    {page}
                                                </Button>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="h-8 w-8 p-0"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
