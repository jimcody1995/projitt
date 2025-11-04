"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Download, FileDown, FileSpreadsheet, FileText, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Unified Employee Data - Single source of truth
const employeeData = [
    {
        id: "1",
        employeeId: "#E001",
        name: "Alice Fernandez",
        department: "Engineering",
        // Leave Balance
        annualLeave: { total: 20, used: 8, remaining: 12 },
        sickLeave: { total: 10, used: 3, remaining: 7 },
        casualLeave: { total: 5, used: 2, remaining: 3 },
        // Taken Leaves (array of leave records)
        takenLeaves: [
            {
                leaveType: "Annual Leave",
                startDate: "2024-01-15",
                endDate: "2024-01-20",
                days: 5,
                status: "Approved",
            },
            {
                leaveType: "Sick Leave",
                startDate: "2024-03-05",
                endDate: "2024-03-07",
                days: 3,
                status: "Approved",
            },
        ],
        // Approval History (array of approval records)
        approvalHistory: [
            {
                leaveType: "Annual Leave",
                appliedDate: "2024-01-10",
                approvedBy: "John Manager",
                approvedDate: "2024-01-11",
                status: "Approved",
            },
        ],
        // Attendance Summary
        attendance: {
            present: 20,
            absent: 2,
            late: 3,
            halfDay: 1,
            totalDays: 23,
            attendanceRate: "87%",
        },
    },
    {
        id: "2",
        employeeId: "#E002",
        name: "Evelyn Hayes",
        department: "Marketing",
        // Leave Balance
        annualLeave: { total: 20, used: 15, remaining: 5 },
        sickLeave: { total: 10, used: 5, remaining: 5 },
        casualLeave: { total: 5, used: 1, remaining: 4 },
        // Taken Leaves
        takenLeaves: [
            {
                leaveType: "Sick Leave",
                startDate: "2024-02-10",
                endDate: "2024-02-12",
                days: 3,
                status: "Approved",
            },
        ],
        // Approval History
        approvalHistory: [
            {
                leaveType: "Sick Leave",
                appliedDate: "2024-02-08",
                approvedBy: "John Manager",
                approvedDate: "2024-02-09",
                status: "Approved",
            },
        ],
        // Attendance Summary
        attendance: {
            present: 22,
            absent: 1,
            late: 1,
            halfDay: 0,
            totalDays: 23,
            attendanceRate: "96%",
        },
    },
    {
        id: "3",
        employeeId: "#E003",
        name: "Brynn Moretti",
        department: "Sales",
        // Leave Balance
        annualLeave: { total: 20, used: 5, remaining: 15 },
        sickLeave: { total: 10, used: 2, remaining: 8 },
        casualLeave: { total: 5, used: 3, remaining: 2 },
        // Taken Leaves
        takenLeaves: [
            {
                leaveType: "Casual Leave",
                startDate: "2024-02-06",
                endDate: "2024-02-08",
                days: 3,
                status: "Rejected",
            },
        ],
        // Approval History
        approvalHistory: [
            {
                leaveType: "Casual Leave",
                appliedDate: "2024-02-05",
                approvedBy: "Jane Supervisor",
                approvedDate: "2024-02-05",
                status: "Rejected",
            },
        ],
        // Attendance Summary
        attendance: {
            present: 21,
            absent: 1,
            late: 2,
            halfDay: 1,
            totalDays: 23,
            attendanceRate: "91%",
        },
    },
];

export default function AuditReporting() {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const [selectedEmployee, setSelectedEmployee] = useState<string>("");
    const [selectedReportType, setSelectedReportType] = useState<string>("");
    const [activeTab, setActiveTab] = useState("leave-balance");

    // Display data (initially showing all employee data, new data will be added here)
    const [displayData, setDisplayData] = useState(employeeData);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleGenerateReport = () => {
        // Create new employee entries based on filters
        let newEmployees = [...employeeData];

        // Filter by employee
        if (selectedEmployee && selectedEmployee !== "all") {
            newEmployees = newEmployees.filter((emp) => emp.id === selectedEmployee);
        }

        // Filter by department
        if (selectedDepartment && selectedDepartment !== "all") {
            newEmployees = newEmployees.filter(
                (emp) => emp.department.toLowerCase() === selectedDepartment.toLowerCase()
            );
        }

        // Add new unique IDs to avoid conflicts
        const maxId = Math.max(...displayData.map(e => parseInt(e.id)));
        const newData = newEmployees.map((emp, index) => ({
            ...emp,
            id: String(maxId + index + 1),
            employeeId: emp.employeeId + "-NEW",
        }));

        // Add new data to existing display data
        setDisplayData([...displayData, ...newData]);

        // Switch to selected report type tab if specified
        if (selectedReportType) {
            setActiveTab(selectedReportType);
        }
    };

    const handleExport = (format: "pdf" | "excel" | "csv") => {
        let data: any[] = [];
        let headers: string[] = [];
        let filename = "";

        // Prepare data based on active tab using unified employeeData
        switch (activeTab) {
            case "leave-balance":
                filename = "Leave_Balance_Report";
                headers = [
                    "Employee ID",
                    "Employee",
                    "Department",
                    "Annual Leave Total",
                    "Annual Leave Used",
                    "Annual Leave Remaining",
                    "Sick Leave Total",
                    "Sick Leave Used",
                    "Sick Leave Remaining",
                    "Casual Leave Total",
                    "Casual Leave Used",
                    "Casual Leave Remaining",
                ];
                data = displayData.map((emp) => ({
                    "Employee ID": emp.employeeId,
                    Employee: emp.name,
                    Department: emp.department,
                    "Annual Leave Total": emp.annualLeave.total,
                    "Annual Leave Used": emp.annualLeave.used,
                    "Annual Leave Remaining": emp.annualLeave.remaining,
                    "Sick Leave Total": emp.sickLeave.total,
                    "Sick Leave Used": emp.sickLeave.used,
                    "Sick Leave Remaining": emp.sickLeave.remaining,
                    "Casual Leave Total": emp.casualLeave.total,
                    "Casual Leave Used": emp.casualLeave.used,
                    "Casual Leave Remaining": emp.casualLeave.remaining,
                }));
                break;

            case "taken-leave":
                filename = "Taken_Leave_Report";
                headers = [
                    "Employee ID",
                    "Employee",
                    "Leave Type",
                    "Start Date",
                    "End Date",
                    "Days",
                    "Status",
                ];
                // Flatten takenLeaves from all employees
                data = displayData.flatMap((emp) =>
                    emp.takenLeaves.map((leave) => ({
                        "Employee ID": emp.employeeId,
                        Employee: emp.name,
                        "Leave Type": leave.leaveType,
                        "Start Date": leave.startDate,
                        "End Date": leave.endDate,
                        Days: leave.days,
                        Status: leave.status,
                    }))
                );
                break;

            case "approval-history":
                filename = "Approval_History_Report";
                headers = [
                    "Employee ID",
                    "Employee",
                    "Leave Type",
                    "Applied Date",
                    "Approved By",
                    "Approved Date",
                    "Status",
                ];
                // Flatten approvalHistory from all employees
                data = displayData.flatMap((emp) =>
                    emp.approvalHistory.map((record) => ({
                        "Employee ID": emp.employeeId,
                        Employee: emp.name,
                        "Leave Type": record.leaveType,
                        "Applied Date": record.appliedDate,
                        "Approved By": record.approvedBy,
                        "Approved Date": record.approvedDate,
                        Status: record.status,
                    }))
                );
                break;

            case "attendance-summary":
                filename = "Attendance_Summary_Report";
                headers = [
                    "Employee ID",
                    "Employee",
                    "Department",
                    "Present",
                    "Absent",
                    "Late",
                    "Half Day",
                    "Total Days",
                    "Attendance Rate",
                ];
                data = displayData.map((emp) => ({
                    "Employee ID": emp.employeeId,
                    Employee: emp.name,
                    Department: emp.department,
                    Present: emp.attendance.present,
                    Absent: emp.attendance.absent,
                    Late: emp.attendance.late,
                    "Half Day": emp.attendance.halfDay,
                    "Total Days": emp.attendance.totalDays,
                    "Attendance Rate": emp.attendance.attendanceRate,
                }));
                break;
        }

        // Export based on format
        if (format === "csv") {
            exportToCSV(data, headers, filename);
        } else if (format === "excel") {
            exportToExcel(data, headers, filename);
        } else if (format === "pdf") {
            exportToPDF(data, headers, filename);
        }
    };

    const exportToCSV = (data: any[], headers: string[], filename: string) => {
        const csvContent = [
            headers.join(","),
            ...data.map((row) =>
                headers.map((header) => {
                    const value = row[header];
                    // Escape commas and quotes in values
                    return typeof value === "string" && (value.includes(",") || value.includes('"'))
                        ? `"${value.replace(/"/g, '""')}"`
                        : value;
                }).join(",")
            ),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.csv`;
        link.click();
    };

    const exportToExcel = (data: any[], headers: string[], filename: string) => {
        const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    };

    const exportToPDF = (data: any[], headers: string[], filename: string) => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(16);
        doc.text(filename.replace(/_/g, " "), 14, 15);

        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

        // Prepare table data
        const tableData = data.map((row) => headers.map((header) => row[header]));

        // Add table
        autoTable(doc, {
            head: [headers],
            body: tableData,
            startY: 30,
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [13, 151, 139], textColor: 255 },
            alternateRowStyles: { fillColor: [245, 245, 245] },
        });

        doc.save(`${filename}.pdf`);
    };

    return (
        <div className=" w-full min-h-screen bg-[#F9F9F9]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-[16px] sm:mb-[23px]">
                <div>
                    <div className="text-[12px] sm:text-[14px]/[20px] text-[#8F8F8F] mb-[4px]">
                        Leave & Attendance / Audit & Reporting
                    </div>
                    <h1 className="text-[20px] sm:text-[24px]/[30px] font-semibold text-[#353535]">
                        Audit & Reporting
                    </h1>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            className="h-[32px] sm:h-[36px] px-[16px] bg-[#0D978B] hover:bg-[#0c8679] text-white text-[14px] font-medium"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-2" align="end">
                        <div className="space-y-1">
                            <Button
                                variant="ghost"
                                onClick={() => handleExport("pdf")}
                                className="w-full justify-start h-[40px] px-3 text-[14px] hover:bg-gray-100"
                            >
                                <FileText className="h-4 w-4 mr-3 text-[#0D978B]" />
                                PDF
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => handleExport("excel")}
                                className="w-full justify-start h-[40px] px-3 text-[14px] hover:bg-gray-100"
                            >
                                <FileSpreadsheet className="h-4 w-4 mr-3 text-[#0D978B]" />
                                Excel
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => handleExport("csv")}
                                className="w-full justify-start h-[40px] px-3 text-[14px] hover:bg-gray-100"
                            >
                                <FileDown className="h-4 w-4 mr-3 text-[#0D978B]" />
                                CSV
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-[8px] border border-[#E9E9E9] p-[16px] sm:p-[24px] mb-[16px] sm:mb-[20px]">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-[12px] sm:gap-[16px]">
                    {/* Employee Filter */}
                    <div className="flex flex-col gap-[8px]">
                        <Label className="text-[13px] sm:text-[14px] font-medium text-[#1C1C1C]">
                            Employee
                        </Label>
                        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                            <SelectTrigger className="h-[40px] sm:h-[44px] rounded-[8px] border-[#BCBCBC]">
                                <SelectValue placeholder="All Employees" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Employees</SelectItem>
                                {employeeData.map((employee) => (
                                    <SelectItem key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Department Filter */}
                    <div className="flex flex-col gap-[8px]">
                        <Label className="text-[13px] sm:text-[14px] font-medium text-[#1C1C1C]">
                            Department
                        </Label>
                        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                            <SelectTrigger className="h-[40px] sm:h-[44px] rounded-[8px] border-[#BCBCBC]">
                                <SelectValue placeholder="All Departments" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                {Array.from(new Set(employeeData.map((emp) => emp.department))).map((dept) => (
                                    <SelectItem key={dept} value={dept.toLowerCase()}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Report Type Filter */}
                    <div className="flex flex-col gap-[8px]">
                        <Label className="text-[13px] sm:text-[14px] font-medium text-[#1C1C1C]">
                            Report Type
                        </Label>
                        <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                            <SelectTrigger className="h-[40px] sm:h-[44px] rounded-[8px] border-[#BCBCBC]">
                                <SelectValue placeholder="Select Report Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="leave-balance">Leave Balance</SelectItem>
                                <SelectItem value="taken-leave">Taken Leave</SelectItem>
                                <SelectItem value="approval-history">Approval History</SelectItem>
                                <SelectItem value="attendance-summary">Attendance Summary</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Start Date */}
                    <div className="flex flex-col gap-[8px]">
                        <Label className="text-[13px] sm:text-[14px] font-medium text-[#1C1C1C]">
                            Start Date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "h-[40px] sm:h-[44px] justify-start text-left font-normal rounded-[8px] border-[#BCBCBC]",
                                        !startDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "MMM d, yyyy") : "Select date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* End Date */}
                    <div className="flex flex-col gap-[8px]">
                        <Label className="text-[13px] sm:text-[14px] font-medium text-[#1C1C1C]">
                            End Date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "h-[40px] sm:h-[44px] justify-start text-left font-normal rounded-[8px] border-[#BCBCBC]",
                                        !endDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "MMM d, yyyy") : "Select date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="flex gap-[12px] mt-[16px]">
                    <Button
                        className="h-[32px] sm:h-[36px] px-[20px] sm:px-[24px] bg-[#0D978B] hover:bg-[#0c8679] text-[14px]"
                        onClick={handleGenerateReport}
                    >
                        Generate Report
                    </Button>
                    {/* <Button
                        variant="outline"
                        className="h-[40px] sm:h-[44px] px-[20px] sm:px-[24px] border-[#E9E9E9] text-[#4B4B4B] text-[14px]"
                        onClick={() => {
                            setStartDate(undefined);
                            setEndDate(undefined);
                            setSelectedDepartment("");
                            setSelectedEmployee("");
                            setSelectedReportType("");
                            setDisplayData(employeeData);
                        }}
                    >
                        Clear Filters
                    </Button> */}
                </div>
            </div>

            {/* Report Tabs */}
            <div className="overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList variant="line" className="bg-transparent p-0 w-full lg:w-auto mb-[16px] sm:mb-[20px]">
                        <TabsTrigger
                            value="leave-balance"
                            className="text-[14px] sm:text-[15px] leading-[18px] sm:leading-[20px] font-medium px-[20px] sm:px-[36px] py-[8px] sm:py-[11px] flex-1 lg:flex-none"
                        >
                            Leave Balance
                        </TabsTrigger>
                        <TabsTrigger
                            value="taken-leave"
                            className="text-[14px] sm:text-[15px] leading-[18px] sm:leading-[20px] font-medium px-[20px] sm:px-[36px] py-[8px] sm:py-[11px] flex-1 lg:flex-none"
                        >
                            Taken Leave
                        </TabsTrigger>
                        <TabsTrigger
                            value="approval-history"
                            className="text-[14px] sm:text-[15px] leading-[18px] sm:leading-[20px] font-medium px-[20px] sm:px-[36px] py-[8px] sm:py-[11px] flex-1 lg:flex-none"
                        >
                            Approval History
                        </TabsTrigger>
                        <TabsTrigger
                            value="attendance-summary"
                            className="text-[14px] sm:text-[15px] leading-[18px] sm:leading-[20px] font-medium px-[20px] sm:px-[36px] py-[8px] sm:py-[11px] flex-1 lg:flex-none"
                        >
                            Attendance Summary
                        </TabsTrigger>
                    </TabsList>

                    {/* Leave Balance Tab */}
                    <TabsContent value="leave-balance" className="p-0 m-0">
                        <div className="overflow-x-auto">
                            <Table className="min-w-[900px]">
                                <TableHeader>
                                    <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Employee ID
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Employee
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Department
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Annual Leave
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Sick Leave
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Casual Leave
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayData.map((employee) => (
                                        <TableRow key={employee.id} className="border-b border-[#E9E9E9]">
                                            <TableCell className="text-[14px]/[22px] text-gray-900">
                                                {employee.employeeId}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-[12px]">
                                                    <Avatar className="h-[28px] w-[28px]">
                                                        <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                            {getInitials(employee.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-[14px]/[22px] text-gray-900">
                                                        {employee.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-gray-900">
                                                {employee.department}
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-gray-900">
                                                <div className="text-[#0D978B] font-medium">
                                                    {employee.annualLeave.remaining}/{employee.annualLeave.total}
                                                </div>
                                                <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                                    Used: {employee.annualLeave.used}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-gray-900">
                                                <div className="text-[#0D978B] font-medium">
                                                    {employee.sickLeave.remaining}/{employee.sickLeave.total}
                                                </div>
                                                <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                                    Used: {employee.sickLeave.used}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-gray-900">
                                                <div className="text-[#0D978B] font-medium">
                                                    {employee.casualLeave.remaining}/{employee.casualLeave.total}
                                                </div>
                                                <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                                    Used: {employee.casualLeave.used}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    {/* Taken Leave Tab */}
                    <TabsContent value="taken-leave" className="p-0 m-0">
                        <div className="overflow-x-auto">
                            <Table className="min-w-[800px]">
                                <TableHeader>
                                    <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Employee ID
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Employee
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Leave Type
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Start Date
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            End Date
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Days
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayData.flatMap((employee) =>
                                        employee.takenLeaves.map((leave, index) => (
                                            <TableRow key={`${employee.id}-leave-${index}`} className="border-b border-[#E9E9E9]">
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {employee.employeeId}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-[12px]">
                                                        <Avatar className="h-[28px] w-[28px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                                {getInitials(employee.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-gray-900">
                                                            {employee.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {leave.leaveType}
                                                </TableCell>
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {leave.startDate}
                                                </TableCell>
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {leave.endDate}
                                                </TableCell>
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {leave.days}
                                                </TableCell>
                                                <TableCell>
                                                    <span className={cn(
                                                        "inline-flex items-center px-[12px] py-[4px] rounded-[21px] text-[12px] font-medium",
                                                        leave.status === "Approved"
                                                            ? "bg-[#D6EEEC] text-[#0D978B]"
                                                            : "bg-[#FFE5E5] text-[#E53E3E]"
                                                    )}>
                                                        {leave.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    {/* Approval History Tab */}
                    <TabsContent value="approval-history" className="p-0 m-0">
                        <div className="overflow-x-auto">
                            <Table className="min-w-[900px]">
                                <TableHeader>
                                    <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Employee ID
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Employee
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Leave Type
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Applied Date
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Approved By
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Approved Date
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayData.flatMap((employee) =>
                                        employee.approvalHistory.map((record, index) => (
                                            <TableRow key={`${employee.id}-approval-${index}`} className="border-b border-[#E9E9E9]">
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {employee.employeeId}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-[12px]">
                                                        <Avatar className="h-[28px] w-[28px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                                {getInitials(employee.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-gray-900">
                                                            {employee.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {record.leaveType}
                                                </TableCell>
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {record.appliedDate}
                                                </TableCell>
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {record.approvedBy}
                                                </TableCell>
                                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                                    {record.approvedDate}
                                                </TableCell>
                                                <TableCell>
                                                    <span className={cn(
                                                        "inline-flex items-center px-[12px] py-[4px] rounded-[21px] text-[12px] font-medium",
                                                        record.status === "Approved"
                                                            ? "bg-[#D6EEEC] text-[#0D978B]"
                                                            : "bg-[#FFE5E5] text-[#E53E3E]"
                                                    )}>
                                                        {record.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    {/* Attendance Summary Tab */}
                    <TabsContent value="attendance-summary" className="p-0 m-0">
                        <div className="overflow-x-auto">
                            <Table className="min-w-[1000px]">
                                <TableHeader>
                                    <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Employee ID
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Employee
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Department
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Present
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Absent
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Late
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Half Day
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Total Days
                                        </TableHead>
                                        <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E]">
                                            Attendance Rate
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayData.map((employee) => (
                                        <TableRow key={employee.id} className="border-b border-[#E9E9E9]">
                                            <TableCell className="text-[14px]/[22px] text-gray-900">
                                                {employee.employeeId}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-[12px]">
                                                    <Avatar className="h-[28px] w-[28px]">
                                                        <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                            {getInitials(employee.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-[14px]/[22px] text-gray-900">
                                                        {employee.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-gray-900">
                                                {employee.department}
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-[#0D978B] font-medium">
                                                {employee.attendance.present}
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-[#E53E3E] font-medium">
                                                {employee.attendance.absent}
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-[#FFA750] font-medium">
                                                {employee.attendance.late}
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-gray-900">
                                                {employee.attendance.halfDay}
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] text-gray-900">
                                                {employee.attendance.totalDays}
                                            </TableCell>
                                            <TableCell className="text-[14px]/[22px] font-semibold text-gray-900">
                                                {employee.attendance.attendanceRate}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
