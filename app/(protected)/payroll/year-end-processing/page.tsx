"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MoreVertical } from "lucide-react";

type FormType = "W-2" | "1099" | "Hourly";
type StatusType = "Sent" | "Pending" | "Generated";

interface YearEndRecord {
    id: number;
    employeeName: string;
    employeeTitle: string;
    initials: string;
    formType: FormType;
    grossEarnings: string;
    taxesWithheld: string;
    status: StatusType;
}

// Mock data generator based on year
const generateYearData = (year: string): YearEndRecord[] => {
    const baseData = [
        { name: "Alice Fernandez", title: "Senior Data Analyst", initials: "AF" },
        { name: "Bob Johnson", title: "Software Engineer", initials: "BJ" },
        { name: "Carol Smith", title: "Product Manager", initials: "CS" },
        { name: "David Brown", title: "UI/UX Designer", initials: "DB" },
        { name: "Emma Wilson", title: "Marketing Specialist", initials: "EW" },
        { name: "Frank Miller", title: "Sales Representative", initials: "FM" },
        { name: "Grace Lee", title: "HR Manager", initials: "GL" },
        { name: "Henry Davis", title: "Accountant", initials: "HD" },
        { name: "Iris Martinez", title: "Customer Support", initials: "IM" },
        { name: "Jack Thompson", title: "Operations Manager", initials: "JT" },
    ];

    const formTypes: FormType[] = ["W-2", "1099", "Hourly", "W-2", "1099"];
    const statuses: StatusType[] = ["Sent", "Sent", "Sent", "Pending", "Generated"];

    // Adjust amounts based on year
    const yearMultiplier = parseInt(year) - 2020;
    const baseAmount = 235000 + (yearMultiplier * 5000);

    return baseData.map((emp, index) => ({
        id: index + 1,
        employeeName: emp.name,
        employeeTitle: emp.title,
        initials: emp.initials,
        formType: formTypes[index % formTypes.length],
        grossEarnings: `$${(baseAmount + (index * 1000)).toLocaleString()}.00`,
        taxesWithheld: `$${(21 + index).toLocaleString()}.00`,
        status: statuses[index % statuses.length],
    }));
};

export default function YearEndProcessing() {
    const [selectedYear, setSelectedYear] = useState<string>("2024");
    const [selectedRecords, setSelectedRecords] = useState<number[]>([]);

    // Available years
    const years = ["2024", "2023", "2022", "2021", "2020"];

    // Get data based on selected year
    const yearEndRecords = useMemo(() => generateYearData(selectedYear), [selectedYear]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRecords(yearEndRecords.map(record => record.id));
        } else {
            setSelectedRecords([]);
        }
    };

    const handleSelectRecord = (checked: boolean, id: number) => {
        if (checked) {
            setSelectedRecords([...selectedRecords, id]);
        } else {
            setSelectedRecords(selectedRecords.filter(recordId => recordId !== id));
        }
    };

    const getStatusColor = (status: StatusType) => {
        switch (status) {
            case "Sent":
                return "bg-[#D6EEEC] text-[#0D978B] hover:bg-[#D6EEEC]";
            case "Pending":
                return "bg-[#FFDFC0] text-[#934900] hover:bg-[#FFDFC0]";
            case "Generated":
                return "bg-[#E5E7EB] text-[#4B4B4B] hover:bg-[#E5E7EB]";
            default:
                return "";
        }
    };

    return (
        <div className="p-4 sm:px-[8px] sm:py-[12px] w-full min-h-screen bg-[#F9F9F9]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[12px] sm:gap-[24px] mb-[12px] sm:mb-[16px]">
                <h1 className="text-[20px]/[26px] sm:text-[24px]/[30px] font-semibold text-[#353535]">
                    Year End Processing
                </h1>

                {/* Action Buttons */}
                <div className="flex gap-[8px] sm:gap-[12px]">
                    <Button
                        variant="outline"
                        className="flex-1 sm:flex-initial h-[40px] sm:h-[48px] sm:w-[147px] px-[16px] sm:px-[20px] border border-[#053834] rounded-[8px] text-[13px]/[18px] sm:text-[14px]/[20px] font-semibold text-[#053834] hover:bg-gray-50"
                    >
                        Generate
                    </Button>
                    <Button
                        className="flex-1 sm:flex-initial h-[40px] sm:h-[48px] sm:w-[147px] px-[16px] sm:px-[20px] bg-[#0D978B] hover:bg-[#0c8679] text-white text-[13px]/[18px] sm:text-[14px]/[20px] font-semibold rounded-[8px]"
                    >
                        Distribute
                    </Button>
                </div>
            </div>

            {/* Year Selector */}
            <div className="mb-[16px] sm:mb-[18px]">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[90px] sm:w-[100px] h-[32px] border border-[#BCBCBC] rounded-[8px] bg-transparent text-[13px] sm:text-[14px]">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <Table className="min-w-[900px]">
                        <TableHeader>
                            <TableRow className="bg-[#EEF3F2] border-b border-[#E9E9E9] hover:bg-[#EEF3F2]">
                                <TableHead className="w-[48px] py-[17px] px-[16px]">
                                    <Checkbox
                                        checked={selectedRecords.length === yearEndRecords.length}
                                        onCheckedChange={handleSelectAll}
                                        className=" border-[#4B4B4B] w-[17px] h-[17px] bg-transparent"
                                    />
                                </TableHead>
                                <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E] py-[17px] px-[16px]">
                                    Employee
                                </TableHead>
                                <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E] py-[17px] px-[16px]">
                                    Form Type
                                </TableHead>
                                <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E] py-[17px] px-[16px]">
                                    Gross Earnings
                                </TableHead>
                                <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E] py-[17px] px-[16px]">
                                    Taxes Withheld
                                </TableHead>
                                <TableHead className="text-[14px]/[22px] font-medium text-[#8C8E8E] py-[17px] px-[16px]">
                                    Status
                                </TableHead>
                                <TableHead className="w-[48px] py-[17px] px-[16px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {yearEndRecords.map((record) => (
                                <TableRow
                                    key={record.id}
                                    className="border-b border-[#E9E9E9] hover:bg-[#F9F9F9] transition-colors"
                                >
                                    <TableCell className="px-[16px]">
                                        <Checkbox
                                            checked={selectedRecords.includes(record.id)}
                                            onCheckedChange={(checked) =>
                                                handleSelectRecord(checked as boolean, record.id)
                                            }
                                            className=" w-[17px] h-[17px] bg-transparent border-[#4B4B4B]"
                                        />
                                    </TableCell>
                                    <TableCell className="py-[14px] px-[16px]">
                                        <div className="flex items-center gap-[8px]">
                                            <div className="h-[28px] w-[28px] rounded-full bg-[#D6EEEC] flex items-center justify-center">
                                                <span className="text-[#053834] text-[10px]">
                                                    {record.initials}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-[14px]/[22px]text-[#353535]">
                                                    {record.employeeName}
                                                </div>
                                                <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                                    {record.employeeTitle}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-[14px]/[22px] text-[#353535]  px-[16px]">
                                        {record.formType}
                                    </TableCell>
                                    <TableCell className="text-[14px]/[22px] text-[#353535]  px-[16px]">
                                        {record.grossEarnings}
                                    </TableCell>
                                    <TableCell className="text-[14px]/[22px] text-[#353535]  px-[16px]">
                                        {record.taxesWithheld}
                                    </TableCell>
                                    <TableCell className=" px-[16px]">
                                        <div className="text-[14px]/[22px] text-[#353535]">
                                            {record.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className=" px-[16px]">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                                >
                                                    <MoreVertical className="h-[16px] w-[16px] text-[#8C8E8E]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-[160px] rounded-[8px]"
                                            >
                                                <DropdownMenuItem className="text-[14px]/[20px] text-[#353535] cursor-pointer h-[36px]">
                                                    View Form
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-[14px]/[20px] text-[#353535] cursor-pointer h-[36px]">
                                                    Download
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-[14px]/[20px] text-[#353535] cursor-pointer h-[36px]">
                                                    Resend
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

            {/* Mobile Card View */}
            <div className="md:hidden">
                {/* Select All for Mobile */}
                <div className="bg-white border border-[#E9E9E9] rounded-[8px] p-[12px] mb-[8px] flex items-center gap-[10px]">
                    <Checkbox
                        checked={selectedRecords.length === yearEndRecords.length}
                        onCheckedChange={handleSelectAll}
                        className="border-[#4B4B4B] bg-transparent w-[17px] h-[17px]"
                    />
                    <span className="text-[13px]/[18px] font-medium text-[#353535]">
                        Select All
                    </span>
                </div>

                {/* Records */}
                <div className="space-y-[8px]">
                    {yearEndRecords.map((record) => (
                        <div
                            key={record.id}
                            className="bg-white border border-[#E9E9E9] rounded-[8px] p-[12px]"
                        >
                            {/* Header Row - Checkbox, Employee Info, Actions */}
                            <div className="flex items-start gap-[8px] mb-[12px]">
                                <Checkbox
                                    checked={selectedRecords.includes(record.id)}
                                    onCheckedChange={(checked) =>
                                        handleSelectRecord(checked as boolean, record.id)
                                    }
                                    className="border-[#4B4B4B] mt-[6px] bg-transparent flex-shrink-0 w-[17px] h-[17px]"
                                />
                                <div className="flex items-start gap-[8px] flex-1 min-w-0">
                                    <div className="h-[32px] w-[32px] rounded-full bg-[#D6EEEC] flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#053834] text-[11px] font-medium">
                                            {record.initials}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[14px]/[20px] font-semibold text-[#353535] truncate">
                                            {record.employeeName}
                                        </div>
                                        <div className="text-[11px]/[16px] text-[#8F8F8F] truncate">
                                            {record.employeeTitle}
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-7 w-7 p-0 hover:bg-gray-100 flex-shrink-0"
                                        >
                                            <MoreVertical className="h-[16px] w-[16px] text-[#8C8E8E]" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-[140px] rounded-[8px]"
                                    >
                                        <DropdownMenuItem className="text-[13px]/[18px] text-[#353535] cursor-pointer h-[32px]">
                                            View Form
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-[13px]/[18px] text-[#353535] cursor-pointer h-[32px]">
                                            Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-[13px]/[18px] text-[#353535] cursor-pointer h-[32px]">
                                            Resend
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Info Grid */}
                            <div className="space-y-[8px]">
                                {/* Row 1 */}
                                <div className="grid grid-cols-2 gap-[8px]">
                                    <div>
                                        <div className="text-[10px]/[14px] text-[#8C8E8E] mb-[2px]">
                                            Form Type
                                        </div>
                                        <div className="text-[13px]/[18px] text-[#353535] font-medium">
                                            {record.formType}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px]/[14px] text-[#8C8E8E] mb-[2px]">
                                            Status
                                        </div>
                                        <div className="text-[13px]/[18px] text-[#353535] font-medium">
                                            {record.status}
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-2 gap-[8px]">
                                    <div>
                                        <div className="text-[10px]/[14px] text-[#8C8E8E] mb-[2px]">
                                            Gross Earnings
                                        </div>
                                        <div className="text-[13px]/[18px] text-[#353535] font-semibold">
                                            {record.grossEarnings}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px]/[14px] text-[#8C8E8E] mb-[2px]">
                                            Taxes Withheld
                                        </div>
                                        <div className="text-[13px]/[18px] text-[#353535] font-medium">
                                            {record.taxesWithheld}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}