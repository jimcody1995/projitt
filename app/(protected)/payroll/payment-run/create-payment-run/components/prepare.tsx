"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RiAlertFill } from 'react-icons/ri';
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleCheck, MoreVertical, TriangleAlert, Clock, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import AttendanceRecord from "./attendance-record";
import LeaveRecord from "./leave-record";

interface PrepareProps {
    onNext: () => void;
    onBack: () => void;
}

// Mock employee data
const employeesData = [
    {
        id: "1",
        employeeId: "#E001",
        name: "Alice Fernandez",
        hourly: "$25.00/hr",
        hoursWorked: "84.00hrs",
        attendanceStatus: "Validated",
        leaves: 2,
        overtime: "+5hrs overtime"
    },
    {
        id: "2",
        employeeId: "#E002",
        name: "Evelyn Hayes",
        hourly: "$123,000.00/yr",
        hoursWorked: "80.00hrs",
        attendanceStatus: "Unresolved",
        leaves: 0,
    },
    {
        id: "3",
        employeeId: "#E003",
        name: "Brynn Moretti",
        hourly: "$123,000.00/yr",
        hoursWorked: "120.60hrs",
        attendanceStatus: "Validated",
        leaves: 2,
        overtime: "+5hrs overtime"

    },
    {
        id: "4",
        employeeId: "#E003",
        name: "Alice Fernandez",
        hourly: "$25.00/hr",
        hoursWorked: "80.00hrs",
        attendanceStatus: "Validated",
        leaves: 1,
    },
    {
        id: "5",
        employeeId: "#E003",
        name: "Jamison Stotzfus",
        hourly: "$25.00/hr",
        hoursWorked: "84.00hrs",
        attendanceStatus: "Validated",
        leaves: 2,
    },
    {
        id: "6",
        employeeId: "#E003",
        name: "Jaxer Chang",
        hourly: "$25.00/hr",
        hoursWorked: "84.00hrs",
        attendanceStatus: "Unresolved",
        leaves: 0,
    },
    {
        id: "7",
        employeeId: "#E003",
        name: "Macey Olgun",
        hourly: "$25.00/hr",
        hoursWorked: "80.00hrs",
        attendanceStatus: "Validated",
        leaves: 2,
    },
    {
        id: "8",
        employeeId: "#E003",
        name: "Ozhier Glanger",
        hourly: "$25.00/hr",
        hoursWorked: "84.00hrs",
        attendanceStatus: "Validated",
        leaves: 2,
    },
    {
        id: "9",
        employeeId: "#E003",
        name: "Amelia Rosales",
        hourly: "$25.00/hr",
        hoursWorked: "84.00hrs",
        attendanceStatus: "Validated",
        leaves: 2,
    },
    {
        id: "10",
        employeeId: "#E003",
        name: "Hadley Levesque",
        hourly: "$25.00/hr",
        hoursWorked: "84.00hrs",
        attendanceStatus: "Validated",
        leaves: 2,
    },
];

export default function Prepare({ onNext, onBack }: PrepareProps) {
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [isNotifyManagerModalOpen, setIsNotifyManagerModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [clockIn, setClockIn] = useState("");
    const [clockOut, setClockOut] = useState("");
    const [reason, setReason] = useState("");

    const validatedCount = employeesData.filter(
        (emp) => emp.attendanceStatus === "Validated"
    ).length;
    const unresolvedCount = employeesData.filter(
        (emp) => emp.attendanceStatus === "Unresolved"
    ).length;

    const toggleEmployee = (id: string) => {
        setSelectedEmployees((prev) =>
            prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedEmployees.length === employeesData.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employeesData.map((emp) => emp.id));
        }
    };

    const getInitials = (name: string) => {
        if (!name || typeof name !== 'string') {
            return '??';
        }
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleEditEntry = (employee: any) => {
        // Ensure the employee object has a name field
        const employeeWithName = {
            ...employee,
            name: employee.name || 'Unknown Employee'
        };
        setSelectedEmployee(employeeWithName);
        setClockIn("8:50am");
        setClockOut("1:00pm");
        setReason("");
        setIsEditDialogOpen(true);
    };

    const handleConfirmEdit = () => {
        // Handle the edit logic here
        console.log("Editing entry:", { selectedEmployee, clockIn, clockOut, reason });
        setIsEditDialogOpen(false);
    };

    const handleRowClick = (employee: any) => {
        setSelectedEmployee(employee);
        setIsDetailsDialogOpen(true);
    };

    return (
        <div className="w-full">
            <div className="mb-[16px] sm:mb-[21px] w-full">
                <h2 className="text-[16px] sm:text-[18px]/[24px] font-medium text-[#353535]">
                    Prepare
                </h2>
                <div className="flex flex-col sm:flex-row w-full justify-between gap-[8px] sm:gap-[16px] items-center mt-[12px] sm:mt-[16px] text-[12px] sm:text-[14px]/[20px] text-[#787878]">
                    <div className="flex flex-row gap-[8px] sm:gap-[16px] items-center">
                        <div>
                            <span className="text-[#0D978B]">{validatedCount}</span>
                            <span className="text-[#0D978B] ml-[2px]">Employees ready for payroll</span>
                        </div>
                        <div className="w-[2px] h-[2px] bg-[#A5A5A5] rounded-full hidden sm:block"></div>
                        <div>
                            <span className="text-[#FFA750]">{unresolvedCount}</span>
                            <span className="text-[#FFA750] ml-[2px]">Unresolved</span>
                        </div>
                    </div>
                    <Button variant="outline" className="text-[14px]/[22px] font-medium text-[#4B4B4B] border border-[#4B4B4B] h-8 bg-transparent"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsNotifyManagerModalOpen(true);
                        }}
                    >Reconcile All</Button>
                </div>
            </div>

            <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[12px] overflow-x-auto -mx-[16px] sm:mx-0">
                <Table className="min-w-[900px]">
                    <TableHeader>
                        <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={selectedEmployees.length === employeesData.length}
                                    onCheckedChange={toggleAll}
                                    className="w-[18px] h-[18px]"
                                />
                            </TableHead>
                            <TableHead className="text-[12px]/[2px] py-[9px] font-medium text-[#8C8E8E]">
                                ID
                            </TableHead>
                            <TableHead className="text-[12px]/[2px] py-[9px] font-medium text-[#8C8E8E]">
                                Employee
                            </TableHead>
                            <TableHead className="text-[12px]/[2px] py-[9px] font-medium text-[#8C8E8E]">
                                Hours Worked
                            </TableHead>
                            <TableHead className="text-[12px]/[2px] py-[9px] font-medium text-[#8C8E8E]">
                                Attendance Status
                            </TableHead>
                            <TableHead className="text-[12px]/[2px] py-[9px] font-medium text-[#8C8E8E]">
                                Leaves
                            </TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employeesData.map((employee) => (
                            <TableRow
                                key={employee.id}
                                className="border-b border-[#E9E9E9] hover:bg-gray-50 cursor-pointer"

                            >
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={selectedEmployees.includes(employee.id)}
                                        onCheckedChange={() => toggleEmployee(employee.id)}
                                        className="w-[18px] h-[18px]"
                                    />
                                </TableCell>
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
                                        <div>
                                            <div className="text-[14px]/[22px] font-gray-900xt-[#353535]">
                                                {employee.name}
                                            </div>
                                            <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                                {employee.hourly}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.hoursWorked}
                                    {employee.overtime && (
                                        <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                            {employee.overtime}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {employee.attendanceStatus === "Validated" ?
                                        <div className="text-[#0D978B] text-[14px]/[22px] flex flex-row gap-[3px] items-center">
                                            <CircleCheck className="h-5 w-5 text-white fill-[#0D978B]" />
                                            <div>Validated</div>
                                        </div> :
                                        <div className="text-[#FFA750] text-[14px]/[22px] flex flex-row gap-[3px] items-center">
                                            <TriangleAlert className="h-4 w-4 text-white fill-[#FFA750]" />
                                            <div>Unresolved</div>
                                        </div>
                                    }
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.leaves > 0 ? employee.leaves : "-"}
                                </TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-[12px] min-w-[132px]">
                                            <DropdownMenuItem
                                                className="text-[12px]/[18px] text-[#4B4B4B] h-[32px]"
                                                onClick={() => handleRowClick(employee)}
                                            >
                                                Reconcile
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Employee Details Dialog */}
            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                <DialogContent className="sm:max-w-[1010px] bg-white !rounded-[16px] p-0" close={false}>
                    {selectedEmployee && (
                        <div className="p-[24px]">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-[20px]">
                                <div className="flex flex-col gap-[8px]">
                                    {/*Avatar*/}
                                    <div className="flex items-center gap-[12px]">
                                        <Avatar className="h-[40px] w-[40px]">
                                            <AvatarFallback className="bg-[#D6EEEC] text-[#053834] text-[14px] font-medium">
                                                {getInitials(selectedEmployee.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-[18px]/[24px] font-medium text-[#1C1C1C]">
                                                {selectedEmployee.name}
                                            </div>
                                            <div className="text-[14px]/[20px] text-[#8F8F8F]">
                                                Senior Data Analyst
                                            </div>
                                        </div>
                                    </div>
                                    {/*Manager */}
                                    <div className="text-[14px]/[20px] text-[#8F8F8F]">
                                        Manager:<span className="text-[#0D978B] cursor-pointer"> John Dauda</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[16px]">
                                    <Button
                                        className="bg-[#0D978B] hover:bg-[#0c8679] h-[32px] px-[16px] text-[16px]/[20px] font-medium rounded-[8px]"
                                    >
                                        Notify Manager
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 border border-[#787878] rounded-[6px]"
                                        onClick={() => setIsDetailsDialogOpen(false)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            {/* Tabs */}
                            <Tabs defaultValue="attendance" className="w-full">
                                <TabsList className="w-full justify-start border-b border-[#E9E9E9] rounded-none bg-white p-0 h-auto flex flex-row justify-between">
                                    <div className="flex">
                                        <TabsTrigger
                                            value="attendance"
                                            className="rounded-none border-b-2 border-transparent border-r-none data-[state=active]:border-[#0D978B]  px-[36px] py-[11px] text-[15px]/[20px] font-medium data-[state=active]:text-[#0D978B] text-[#8F8F8F]"
                                        >
                                            Attendance Record
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="leave"
                                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0D978B]  px-[36px] py-[11px] text-[15px]/[20px] font-medium data-[state=active]:text-[#0D978B] text-[#8F8F8F]"
                                        >
                                            Leave Record
                                        </TabsTrigger>
                                    </div>
                                    <div className="flex items-center gap-[6px]">
                                        <TriangleAlert className="h-5 w-5 text-white fill-[#FFA750]" />
                                        <span className="text-[14px]/[20px] text-[#FFA750]">Missing Time Entry</span>
                                    </div>
                                </TabsList>

                                <TabsContent value="attendance" className="mt-[16px]">
                                    <AttendanceRecord onEditEntry={handleEditEntry} />
                                </TabsContent>
                                <TabsContent value="leave" className="mt-[16px]">
                                    <LeaveRecord />
                                </TabsContent>
                            </Tabs>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Edit Entry Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[400px] !rounded-[24px] p-[24px]"
                    close={false}>
                    <DialogHeader className="p-0 !mb-0">
                        <DialogTitle className="text-[16px]/[18px] font-semibold text-[#353535] ">
                            Edit Entry
                        </DialogTitle>
                    </DialogHeader>

                    {selectedEmployee && (
                        <div className="space-y-[20px] mt-[13px]">
                            {/* Employee Info */}
                            <div className="flex items-center gap-[12px]">
                                <Avatar className="h-[28px] w-[28px]">
                                    <AvatarFallback className="bg-[#D6EEEC] text-[#053834] text-[10px] font-medium">
                                        {getInitials(selectedEmployee.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-[14px]/[22px] font-medium text-[#353535]">
                                        {selectedEmployee.name}
                                    </div>
                                    <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                        Senior Data Analyst
                                    </div>
                                </div>
                            </div>

                            {/* Clock In/Out */}
                            <div className="grid grid-cols-2 gap-[16px]">
                                <div className="flex flex-col gap-[8px]">
                                    <Label className="text-[12px]/[22px] font-medium text-[#353535]">
                                        Clock In
                                    </Label>
                                    <div className="relative">
                                        <Clock className="absolute left-[12px] top-1/2 -translate-y-1/2 h-4 w-4 text-[#8F8F8F]" />
                                        <Input
                                            value={clockIn}
                                            onChange={(e) => setClockIn(e.target.value)}
                                            placeholder="8:50am"
                                            className="h-[36px] pl-[40px] rounded-[8px] border-[#BCBCBC] text-[14px]/[20px]"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[8px]">
                                    <Label className="text-[12px]/[22px] font-medium text-[#353535]">
                                        Clock Out
                                    </Label>
                                    <div className="relative">
                                        <Clock className="absolute left-[12px] top-1/2 -translate-y-1/2 h-4 w-4 text-[#8F8F8F]" />
                                        <Input
                                            value={clockOut}
                                            onChange={(e) => setClockOut(e.target.value)}
                                            placeholder="1:00pm"
                                            className="h-[36px] pl-[40px] rounded-[8px] border-[#BCBCBC] text-[14px]/[20px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="space-y-[8px]">
                                <Label className="text-[12px]/[22px] font-medium text-[#353535]">
                                    Please provide a reason
                                </Label>
                                <Textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Enter a reason"
                                    className="min-h-[60px] rounded-[8px] border-[#BCBCBC] resize-none text-[14px]/[20px]"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-[12px] pt-[8px]">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                    className="flex-1 h-[36px] rounded-[8px] border-[#053834] text-[14px]/[20px] font-medium"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirmEdit}
                                    className="flex-1 h-[36px] rounded-[8px] bg-[#0D978B] hover:bg-[#0c8679] text-[14px]/[20px] font-medium"
                                >
                                    Confirm Edit
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Notify Manager Modal - Reconcile All */}
            <Dialog open={isNotifyManagerModalOpen} onOpenChange={setIsNotifyManagerModalOpen}>
                <DialogContent className="w-[95vw] max-w-[1010px] max-h-[90vh] bg-white !rounded-[16px] p-0 overflow-hidden" close={false}>
                    <div className="relative w-full h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 sm:p-5">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 p-0 border border-[#E9E9E9] rounded-full"
                                    onClick={() => setIsNotifyManagerModalOpen(false)}
                                >
                                    <ArrowLeft />
                                </Button>
                                <h2 className="text-[18px]/[24px] font-semibold text-[#353535]">
                                    Reconcile All
                                </h2>
                            </div>
                            <Button className="bg-[#0D978B] hover:bg-[#0c8679] h-[32px] px-[16px] text-[14px]/[20px] font-medium rounded-[8px]">
                                Notify Manager(s)
                            </Button>
                        </div>

                        {/* Table Content */}
                        <div className="flex-1 overflow-auto p-4 sm:px-5 sm:pt-0">
                            <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[12px] overflow-hidden">
                                <div className="overflow-x-auto">
                                    <Table className="min-w-[900px]">
                                        <TableHeader>
                                            <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                                                <TableHead className="text-[14px]/[22px] py-[13px] px-[16px] font-medium text-[#8C8E8E]">
                                                    ID
                                                </TableHead>
                                                <TableHead className="text-[14px]/[22px] py-[13px] px-[16px] font-medium text-[#8C8E8E]">
                                                    Employee
                                                </TableHead>
                                                <TableHead className="text-[14px]/[22px] py-[13px] px-[16px] font-medium text-[#8C8E8E]">
                                                    Date
                                                </TableHead>
                                                <TableHead className="text-[14px]/[22px] py-[13px] px-[16px] font-medium text-[#8C8E8E]">
                                                    Manager
                                                </TableHead>
                                                <TableHead className="text-[14px]/[22px] py-[13px] px-[16px] font-medium text-[#8C8E8E]">
                                                    Clock In
                                                </TableHead>
                                                <TableHead className="text-[14px]/[22px] py-[13px] px-[16px] font-medium text-[#8C8E8E]">
                                                    Clock Out
                                                </TableHead>
                                                <TableHead className="text-[14px]/[22px] py-[13px] px-[16px] font-medium text-[#8C8E8E]">
                                                    Total Hours
                                                </TableHead>
                                                <TableHead className="w-[50px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {/* Employee 1 - Alice Fernandez */}
                                            <TableRow className="border-b border-[#E9E9E9]">
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535] font-medium" rowSpan={4}>
                                                    #E0001
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] border-r border-[#E9E9E9]" rowSpan={4}>
                                                    <div className="flex items-center gap-[12px]">
                                                        <Avatar className="h-[28px] w-[28px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                                AF
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">Alice Fernandez</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Mar 21
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[8px]">
                                                        <Avatar className="h-[20px] w-[20px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[10px]">
                                                                JK
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">James King</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Leave
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Leave
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Leave
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="border-b border-[#E9E9E9]">
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Mar 22
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[8px]">
                                                        <Avatar className="h-[20px] w-[20px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[10px]">
                                                                JK
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">James King</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    0h 0m
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="border-b border-[#E9E9E9]">
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Mar 23
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[8px]">
                                                        <Avatar className="h-[20px] w-[20px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[10px]">
                                                                JK
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">James King</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    0h 0m
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="border-b border-[#E9E9E9]">
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Mar 24
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[8px]">
                                                        <Avatar className="h-[20px] w-[20px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[10px]">
                                                                JK
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">James King</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    0h
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>

                                            {/* Employee 2 - Eva Kim */}
                                            <TableRow className="border-b border-[#E9E9E9]">
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535] font-medium">
                                                    #E0005
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[12px]">
                                                        <Avatar className="h-[28px] w-[28px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                                EK
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">Eva Kim</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Mar 25
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[8px]">
                                                        <Avatar className="h-[20px] w-[20px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[10px]">
                                                                JK
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">James King</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    08:5AM
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    7h 35m
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>

                                            {/* Employee 3 - Frank Lee */}
                                            <TableRow className="border-b border-[#E9E9E9]">
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535] font-medium">
                                                    #E0006
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[12px]">
                                                        <Avatar className="h-[28px] w-[28px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                                FL
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">Frank Lee</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Mar 21
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[8px]">
                                                        <Avatar className="h-[20px] w-[20px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[10px]">
                                                                PR
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">Peter Robinson</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    08:5AM
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    08:5AM
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    7h 35m
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>

                                            {/* Employee 4 - Daniel Johnson */}
                                            <TableRow className="border-b border-[#E9E9E9]">
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535] font-medium">
                                                    #E0007
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[12px]">
                                                        <Avatar className="h-[28px] w-[28px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                                DJ
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">Daniel Johnson</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Mar 21
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[8px]">
                                                        <Avatar className="h-[20px] w-[20px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[10px]">
                                                                JK
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">James King</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    7h 35m
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>

                                            {/* Employee 5 - Grace Miller */}
                                            <TableRow className="border-b border-[#E9E9E9]">
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535] font-medium">
                                                    #E0008
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[12px]">
                                                        <Avatar className="h-[28px] w-[28px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                                GM
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">Grace Miller</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    Mar 21
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <div className="flex items-center gap-[8px]">
                                                        <Avatar className="h-[20px] w-[20px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[10px]">
                                                                JK
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[14px]/[22px] text-[#353535]">James King</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    08:5AM
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    -
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px] text-[14px]/[22px] text-[#353535]">
                                                    7h 35m
                                                </TableCell>
                                                <TableCell className="px-[16px] py-[12px]">
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

