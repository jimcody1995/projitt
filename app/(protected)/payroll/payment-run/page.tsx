"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Filter, ListFilter, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { FilterTool } from "./components/filter";

// Mock data for payment runs
const paymentRuns = [
    {
        id: 1,
        payPeriod: "Run for Mar 25th - Mar 26th",
        employees: 252,
        payDate: "15 Mar, 2025",
        amountPaid: "$235,525,00",
        status: "Draft" as const
    },
    {
        id: 2,
        payPeriod: "Run for Mar 25th - Mar 26th",
        employees: 252,
        payDate: "15 Mar, 2025",
        amountPaid: "$235,525,00",
        status: "Pending" as const
    },
    {
        id: 3,
        payPeriod: "Run for Mar 25th - Mar 26th",
        employees: 252,
        payDate: "15 Mar, 2025",
        amountPaid: "$235,525,00",
        status: "Pending" as const
    },
    ...Array.from({ length: 9 }, (_, i) => ({
        id: i + 4,
        payPeriod: "Run for Mar 25th - Mar 26th",
        employees: 252,
        payDate: "15 Mar, 2025",
        amountPaid: "$235,525,00",
        status: "Paid" as const
    }))
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case "Draft":
            return "secondary";
        case "Pending":
            return "default";
        case "Paid":
            return "default";
        default:
            return "secondary";
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "Draft":
            return "bg-gray-100 text-gray-800";
        case "Pending":
            return "bg-[#FFDFC0] text-[#934900]";
        case "Paid":
            return "bg-[#D6EEEC] text-[#0D978B]";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function PaymentRun() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedPayDates, setSelectedPayDates] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const router = useRouter();

    // Filter payment runs based on selected filters
    const filteredPaymentRuns = useMemo(() => {
        return paymentRuns.filter((run) => {
            const payDateMatch = selectedPayDates.length === 0 || selectedPayDates.includes(run.payDate);
            const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(run.status);
            return payDateMatch && statusMatch;
        });
    }, [selectedPayDates, selectedStatuses]);
    return (
        <div className="p-4 sm:px-[8px] sm:py-[12px] min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-[20px] sm:text-[24px] font-semibold text-gray-900">Payment Runs</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 sm:px-6 py-2 rounded-[8px] h-10 sm:h-12 text-[14px] sm:text-[16px] font-semibold w-full sm:w-auto"
                        onClick={() => { router.push('/payroll/payment-run/create-payment-run') }}
                    >
                        <span className="hidden sm:inline">Create Payment Run</span>
                        <span className="sm:hidden">Create</span>
                    </Button>
                </div>
            </div>


            {/* Filter Button */}
            <div className="mb-3">
                <Button
                    variant="outline"
                    className="border-gray-300 text-[#053834] hover:bg-gray-50 bg-transparent h-10 rounded-[8px] px-[16px] py-[6px] flex items-center gap-[6px] font-semibold"
                    onClick={() => setFilterOpen(!filterOpen)}
                >
                    <ListFilter className="h-4 w-4 mr-2 text-[#053834]" />
                    Filter
                </Button>
            </div>

            {/* Filter Tool */}
            {filterOpen && (
                <FilterTool
                    selectedPayDates={selectedPayDates}
                    selectedStatuses={selectedStatuses}
                    setSelectedPayDates={setSelectedPayDates}
                    setSelectedStatuses={setSelectedStatuses}
                />
            )}


            {/* Payment Runs Table */}
            <div className="bg-white rounded-[16px] border border-gray-200 overflow-hidden">
                {/* Mobile Card View */}
                <div className="block sm:hidden">
                    {filteredPaymentRuns.map((run) => (
                        <div key={run.id} className="p-4 border-b border-gray-200 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 text-sm">{run.payPeriod}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{run.employees} employees</p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="rounded-[12px]" align="end">
                                        <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B] h-[48px]">View Details</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <span className="text-gray-500">Pay Date:</span>
                                    <p className="font-medium text-gray-900">{run.payDate}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Amount:</span>
                                    <p className="font-medium text-gray-900">{run.amountPaid}</p>
                                </div>
                            </div>
                            <div className="mt-3">
                                <Badge
                                    className={`${getStatusColor(run.status)} border-0 px-3 py-1 rounded-[21px] text-[12px] font-medium`}
                                >
                                    {run.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#EEF3F2] border-b border-gray-200">
                                <TableHead className="font-medium py-[19px] px-[16px] text-[#8C8E8E] text-[14px]/[22px]">Pay Period</TableHead>
                                <TableHead className="font-medium text-[#8C8E8E] text-[14px]/[22px]">Employees</TableHead>
                                <TableHead className="font-medium py-[19px] px-[16px] text-[#8C8E8E] text-[14px]/[22px]">PayDate</TableHead>
                                <TableHead className="font-medium py-[19px] px-[16px] text-[#8C8E8E] text-[14px]/[22px]">Amount Paid</TableHead>
                                <TableHead className="font-medium py-[19px] px-[16px] text-[#8C8E8E] text-[14px]/[22px]">Status</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPaymentRuns.map((run) => (
                                <TableRow key={run.id} className="hover:bg-gray-50 border-b border-gray-200">
                                    <TableCell className="text-gray-900 text-[14px]/[22px] py-[19px] px-[16px]">
                                        {run.payPeriod}
                                    </TableCell>
                                    <TableCell className="text-gray-900 text-[14px]/[22px] py-[19px] px-[16px]">
                                        {run.employees}
                                    </TableCell>
                                    <TableCell className="text-gray-900 text-[14px]/[22px] py-[19px] px-[16px]">
                                        {run.payDate}
                                    </TableCell>
                                    <TableCell className="text-gray-900 text-[14px]/[22px] font-medium py-[19px] px-[16px]">
                                        {run.amountPaid}
                                    </TableCell>
                                    <TableCell className="py-[19px] px-[16px]">
                                        <Badge
                                            className={`${getStatusColor(run.status)} border-0 px-3 py-1 rounded-[21px] text-[14px]/[22px] font-medium`}
                                        >
                                            {run.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-[19px] px-[16px]">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="rounded-[12px]" align="end">
                                                <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B] h-[48px]">View Details</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}