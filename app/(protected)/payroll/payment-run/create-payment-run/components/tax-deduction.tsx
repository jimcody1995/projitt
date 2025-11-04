"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MoreVertical, ChevronDown, X } from "lucide-react";
import { useState } from "react";

interface TaxDeductionsProps {
    onNext: () => void;
    onBack: () => void;
}

// Mock tax and deduction data
const taxDeductionData = [
    {
        id: "1",
        employeeId: "#E0001",
        name: "Alice Fernandez",
        payRate: "$25.00/hr",
        federalTax: "$400",
        stateTax: "$245",
        k401Contribution: "$300",
        healthInsurance: "$100",
        federalTax2: "$367",
        totalDeductions: "$1620",
    },
    {
        id: "2",
        employeeId: "#E0002",
        name: "Evelyn Hayes",
        payRate: "$123,000.00/yr",
        federalTax: "$350",
        stateTax: "$75",
        k401Contribution: "$200",
        healthInsurance: "$150",
        federalTax2: "$50",
        totalDeductions: "$1670",
    },
    {
        id: "3",
        employeeId: "#E0003",
        name: "Brynn Moretti",
        payRate: "$123,000.00/yr",
        federalTax: "$300",
        stateTax: "$400",
        k401Contribution: "$280",
        healthInsurance: "$130",
        federalTax2: "$350",
        totalDeductions: "$1720",
    },
    {
        id: "4",
        employeeId: "#E0004",
        name: "Jamison Stotzfus",
        payRate: "$25.00/hr",
        federalTax: "$420",
        stateTax: "$180",
        k401Contribution: "$250",
        healthInsurance: "$120",
        federalTax2: "$320",
        totalDeductions: "$1650",
    },
    {
        id: "5",
        employeeId: "#E0005",
        name: "Jaxer Chang",
        payRate: "$123,000.00/yr",
        federalTax: "$380",
        stateTax: "$220",
        k401Contribution: "$320",
        healthInsurance: "$110",
        federalTax2: "$280",
        totalDeductions: "$1680",
    },
    {
        id: "6",
        employeeId: "#E0006",
        name: "Macey Olgun",
        payRate: "$25.00/hr",
        federalTax: "$450",
        stateTax: "$160",
        k401Contribution: "$270",
        healthInsurance: "$140",
        federalTax2: "$300",
        totalDeductions: "$1680",
    },
    {
        id: "7",
        employeeId: "#E0007",
        name: "Carter Glanger",
        payRate: "$123,000.00/yr",
        federalTax: "$320",
        stateTax: "$300",
        k401Contribution: "$290",
        healthInsurance: "$90",
        federalTax2: "$400",
        totalDeductions: "$1700",
    },
    {
        id: "8",
        employeeId: "#E0008",
        name: "Amelia Rosales",
        payRate: "$25.00/hr",
        federalTax: "$480",
        stateTax: "$200",
        k401Contribution: "$310",
        healthInsurance: "$160",
        federalTax2: "$250",
        totalDeductions: "$1700",
    },
    {
        id: "9",
        employeeId: "#E0009",
        name: "Hadley Levesque",
        payRate: "$123,000.00/yr",
        federalTax: "$360",
        stateTax: "$190",
        k401Contribution: "$240",
        healthInsurance: "$130",
        federalTax2: "$350",
        totalDeductions: "$1670",
    },
    {
        id: "10",
        employeeId: "#E0010",
        name: "Kai Nakamura",
        payRate: "$25.00/hr",
        federalTax: "$410",
        stateTax: "$170",
        k401Contribution: "$260",
        healthInsurance: "$150",
        federalTax2: "$290",
        totalDeductions: "$1680",
    },
];

interface DeductionMapping {
    id: string;
    deductionName: string;
    costCenter: string;
    remittanceAccount: string;
}

export default function TaxDeductions({ onNext, onBack }: TaxDeductionsProps) {
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [isDeductionsModalOpen, setIsDeductionsModalOpen] = useState(false);
    const [deductionsMapping, setDeductionsMapping] = useState<DeductionMapping[]>([
        { id: "1", deductionName: "Federal Tax", costCenter: "CC-1001", remittanceAccount: "Tax Authority Account" },
        { id: "2", deductionName: "State Tax", costCenter: "CC-1002", remittanceAccount: "Tax Authority Account" },
        { id: "3", deductionName: "401k Contributions", costCenter: "CC-1003", remittanceAccount: "Tax Authority Account" },
        { id: "4", deductionName: "Health Insurance", costCenter: "CC-1004", remittanceAccount: "Tax Authority Account" },
        { id: "5", deductionName: "PAYE Tax", costCenter: "CC-1005", remittanceAccount: "Tax Authority Account" },
    ]);

    const toggleEmployee = (id: string) => {
        setSelectedEmployees((prev) =>
            prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedEmployees.length === taxDeductionData.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(taxDeductionData.map((emp) => emp.id));
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleAddDeduction = () => {
        const newId = (deductionsMapping.length + 1).toString();
        setDeductionsMapping([
            ...deductionsMapping,
            { id: newId, deductionName: "", costCenter: "", remittanceAccount: "Tax Authority Account" },
        ]);
    };

    const handleUpdateDeduction = (id: string, field: keyof DeductionMapping, value: string) => {
        setDeductionsMapping(
            deductionsMapping.map((deduction) =>
                deduction.id === id ? { ...deduction, [field]: value } : deduction
            )
        );
    };

    const handleSaveChanges = () => {
        // Save logic here
        setIsDeductionsModalOpen(false);
    };

    return (
        <div className="w-full">
            {/* Header Section - Responsive */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-[16px] sm:mb-[21px] gap-3 sm:gap-7">
                <div className="text-[16px] sm:text-[18px]/[24px] font-medium text-[#353535]">
                    Tax & Deductions
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                        variant="outline"
                        className="text-[#053834] border-[#BCBCBC] text-[12px] sm:text-[14px]/[20px] text-semibold bg-white hover:bg-gray-50 w-full sm:w-auto"
                        onClick={() => setIsDeductionsModalOpen(true)}
                    >
                        Deductions Mapping
                    </Button>
                </div>
            </div>

            {/* Mobile Card View - Hidden on larger screens */}
            <div className="block md:hidden space-y-3">
                {taxDeductionData.map((employee) => (
                    <div key={employee.id} className="bg-white border border-[#E9E9E9] rounded-[8px] p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={selectedEmployees.includes(employee.id)}
                                    onCheckedChange={() => toggleEmployee(employee.id)}
                                    className="w-[18px] h-[18px]"
                                />
                                <div className="flex items-center gap-[12px]">
                                    <Avatar className="h-[32px] w-[32px]">
                                        <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                            {getInitials(employee.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-[14px]/[18px] font-medium text-gray-900">
                                            {employee.name}
                                        </div>
                                        <div className="text-[12px]/[16px] text-[#8F8F8F]">
                                            {employee.employeeId} • {employee.payRate}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-[#8C8E8E]">Federal Tax:</span>
                                    <span className="font-medium">{employee.federalTax}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#8C8E8E]">State Tax:</span>
                                    <span className="font-medium">{employee.stateTax}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#8C8E8E]">401k:</span>
                                    <span className="font-medium">{employee.k401Contribution}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-[#8C8E8E]">Health Insurance:</span>
                                    <span className="font-medium">{employee.healthInsurance}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#8C8E8E]">Federal Tax 2:</span>
                                    <span className="font-medium">{employee.federalTax2}</span>
                                </div>
                                <div className="flex justify-between bg-[#C30606] text-white px-2 py-1 rounded">
                                    <span className="font-medium">Total:</span>
                                    <span className="font-bold">{employee.totalDeductions}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tablet View - Medium screens */}
            <div className="hidden md:block lg:hidden">
                <div className="space-y-3">
                    {taxDeductionData.map((employee) => (
                        <div key={employee.id} className="bg-white border border-[#E9E9E9] rounded-[8px] p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={selectedEmployees.includes(employee.id)}
                                        onCheckedChange={() => toggleEmployee(employee.id)}
                                        className="w-[18px] h-[18px]"
                                    />
                                    <div className="flex items-center gap-[12px]">
                                        <Avatar className="h-[32px] w-[32px]">
                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[12px]">
                                                {getInitials(employee.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-[14px]/[18px] font-medium text-gray-900">
                                                {employee.name}
                                            </div>
                                            <div className="text-[12px]/[16px] text-[#8F8F8F]">
                                                {employee.employeeId} • {employee.payRate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-[#8C8E8E]">Federal Tax:</span>
                                        <span className="font-medium">{employee.federalTax}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#8C8E8E]">State Tax:</span>
                                        <span className="font-medium">{employee.stateTax}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-[#8C8E8E]">401k:</span>
                                        <span className="font-medium">{employee.k401Contribution}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#8C8E8E]">Health Insurance:</span>
                                        <span className="font-medium">{employee.healthInsurance}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-[#8C8E8E]">Federal Tax 2:</span>
                                        <span className="font-medium">{employee.federalTax2}</span>
                                    </div>
                                    <div className="flex justify-between bg-[#C30606] text-white px-2 py-1 rounded">
                                        <span className="font-medium">Total:</span>
                                        <span className="font-bold">{employee.totalDeductions}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Table View - Large screens */}
            <div className="hidden lg:block bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[12px] overflow-x-auto">
                <Table className="min-w-[1200px]">
                    <TableHeader>
                        <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9]">
                            <TableHead className="py-[9px] w-[52px]">
                                <Checkbox
                                    checked={selectedEmployees.length === taxDeductionData.length}
                                    onCheckedChange={toggleAll}
                                    className="w-[18px] h-[18px]"
                                />
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[95px]">
                                ID
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[200px]">
                                Employee
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[120px]">
                                Federal Tax
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[120px]">
                                State Tax
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[140px]">
                                401k Contribution
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[130px]">
                                Health Insurance
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-[#8C8E8E] w-[120px]">
                                Federal Tax
                            </TableHead>
                            <TableHead className="text-[12px]/[22px] py-[9px] font-medium text-white w-[140px] bg-[#C30606]">
                                Total Deductions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {taxDeductionData.map((employee) => (
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
                                            <div className="text-[14px]/[22px] text-gray-900">
                                                {employee.name}
                                            </div>
                                            <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                                {employee.payRate}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.federalTax}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.stateTax}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.k401Contribution}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.healthInsurance}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900">
                                    {employee.federalTax2}
                                </TableCell>
                                <TableCell className="text-[14px]/[22px] text-gray-900 font-semibold">
                                    {employee.totalDeductions}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Deductions Mapping Modal */}
            <Dialog open={isDeductionsModalOpen} onOpenChange={setIsDeductionsModalOpen}>
                <DialogContent className="sm:max-w-[800px] !rounded-[16px] max-h-[90vh] overflow-y-auto p-0 gap-0" close={false}>
                    <div className="p-6 ">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[18px]/[24px] font-medium text-[#353535]">Deductions Mapping</h2>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={handleAddDeduction}
                                    className="bg-[#0D978B] hover:bg-[#0c8679] text-white text-[14px]/[20px] font-medium h-8"
                                >
                                    Add
                                </Button>
                                <Button
                                    onClick={handleSaveChanges}
                                    className="bg-[#0D978B] hover:bg-[#0c8679] text-white text-[14px]/[20px] font-medium h-8"
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    onClick={() => setIsDeductionsModalOpen(false)}
                                    className="bg-white hover:bg-gray-50 text-[#053834] border-gray-300 border w-8 text-[12px] sm:text-[14px]/[20px] text-semibold h-8"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white border border-[#E9E9E9] rounded-[8px] overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-[#EEF3F2] border-none">
                                        <TableHead className="text-[14px]/[18px] font-medium text-[#353535] py-3 px-4">
                                            Deduction Name
                                        </TableHead>
                                        <TableHead className="text-[14px]/[18px] font-medium text-[#353535] py-3 px-4">
                                            Cost Center
                                        </TableHead>
                                        <TableHead className="text-[14px]/[18px] font-medium text-[#353535] py-3 px-4">
                                            Remittance Account
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {deductionsMapping.map((deduction) => (
                                        <TableRow key={deduction.id} className="border-b border-[#E9E9E9]">
                                            <TableCell className="py-3 px-4">
                                                <Input
                                                    value={deduction.deductionName}
                                                    onChange={(e) => handleUpdateDeduction(deduction.id, "deductionName", e.target.value)}
                                                    className="bg-[#F5F5F5] border-0 rounded-[6px] h-[40px] text-[14px]/[20px]"
                                                    placeholder="Enter deduction name"
                                                />
                                            </TableCell>
                                            <TableCell className="py-3 px-4">
                                                <Input
                                                    value={deduction.costCenter}
                                                    onChange={(e) => handleUpdateDeduction(deduction.id, "costCenter", e.target.value)}
                                                    className="bg-[#F5F5F5] border-0 rounded-[6px] h-[40px] text-[14px]/[20px]"
                                                    placeholder="Enter cost center"
                                                />
                                            </TableCell>
                                            <TableCell className="py-3 px-4">
                                                <Select
                                                    value={deduction.remittanceAccount}
                                                    onValueChange={(value) => handleUpdateDeduction(deduction.id, "remittanceAccount", value)}
                                                >
                                                    <SelectTrigger className="bg-[#F5F5F5] border-0 rounded-[6px] h-[40px] text-[14px]/[20px]">
                                                        <SelectValue placeholder="Select account" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Tax Authority Account">Tax Authority Account</SelectItem>
                                                        <SelectItem value="Benefits Account">Benefits Account</SelectItem>
                                                        <SelectItem value="Retirement Account">Retirement Account</SelectItem>
                                                        <SelectItem value="Insurance Account">Insurance Account</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}