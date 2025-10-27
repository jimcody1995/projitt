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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Filter, ListFilter, MoreVertical, Calculator, Upload, Eye, Edit3, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FilterTool } from "./components/filter";

// Mock data for payment runs
const paymentRuns = [
    {
        id: 1,
        payPeriod: "Run for Apr 1st - Apr 15th",
        employees: 268,
        payDate: "16 Apr, 2025",
        amountPaid: "$312,450.00",
        status: "Draft" as const
    },
    {
        id: 2,
        payPeriod: "Run for Mar 25th - Mar 31st",
        employees: 252,
        payDate: "01 Apr, 2025",
        amountPaid: "$235,525.00",
        status: "Pending" as const
    },
    {
        id: 3,
        payPeriod: "Run for Mar 15th - Mar 24th",
        employees: 245,
        payDate: "25 Mar, 2025",
        amountPaid: "$198,750.00",
        status: "Pending" as const
    },
    {
        id: 4,
        payPeriod: "Run for Mar 1st - Mar 14th",
        employees: 240,
        payDate: "15 Mar, 2025",
        amountPaid: "$287,320.00",
        status: "Paid" as const
    },
    {
        id: 5,
        payPeriod: "Run for Feb 16th - Feb 28th",
        employees: 238,
        payDate: "01 Mar, 2025",
        amountPaid: "$265,890.00",
        status: "Paid" as const
    },
    {
        id: 6,
        payPeriod: "Run for Feb 1st - Feb 15th",
        employees: 235,
        payDate: "16 Feb, 2025",
        amountPaid: "$221,480.00",
        status: "Paid" as const
    },
    {
        id: 7,
        payPeriod: "Run for Jan 16th - Jan 31st",
        employees: 230,
        payDate: "01 Feb, 2025",
        amountPaid: "$298,675.00",
        status: "Paid" as const
    },
    {
        id: 8,
        payPeriod: "Run for Jan 1st - Jan 15th",
        employees: 228,
        payDate: "16 Jan, 2025",
        amountPaid: "$245,320.00",
        status: "Paid" as const
    },
    {
        id: 9,
        payPeriod: "Run for Dec 16th - Dec 31st",
        employees: 225,
        payDate: "01 Jan, 2025",
        amountPaid: "$315,890.00",
        status: "Paid" as const
    },
    {
        id: 10,
        payPeriod: "Run for Dec 1st - Dec 15th",
        employees: 220,
        payDate: "16 Dec, 2024",
        amountPaid: "$267,540.00",
        status: "Paid" as const
    },
    {
        id: 11,
        payPeriod: "Run for Nov 16th - Nov 30th",
        employees: 218,
        payDate: "01 Dec, 2024",
        amountPaid: "$289,760.00",
        status: "Paid" as const
    },
    {
        id: 12,
        payPeriod: "Run for Nov 1st - Nov 15th",
        employees: 215,
        payDate: "16 Nov, 2024",
        amountPaid: "$254,320.00",
        status: "Paid" as const
    }
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
    const [calculationModalOpen, setCalculationModalOpen] = useState(false);
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [adjustmentModalOpen, setAdjustmentModalOpen] = useState(false);
    const [selectedRun, setSelectedRun] = useState<any>(null);
    const [calculationData, setCalculationData] = useState<any>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [calculationLogs, setCalculationLogs] = useState<string[]>([]);
    const [importMethod, setImportMethod] = useState<'csv' | 'api'>('csv');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
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
                        <div
                            key={run.id}
                            className={`p-4 border-b border-gray-200 last:border-b-0 ${(run.status === 'Pending' || run.status === 'Paid') ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                                if (run.status === 'Pending') {
                                    router.push('/payroll/payment-run/pendingDetail');
                                } else if (run.status === 'Paid') {
                                    router.push('/payroll/payment-run/paidDetail');
                                }
                            }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 text-sm">{run.payPeriod}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{run.employees} employees</p>
                                </div>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="rounded-[12px]" align="end">
                                            <DropdownMenuItem
                                                className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            {run.status === 'Draft' && (
                                                <>
                                                    <DropdownMenuItem
                                                        className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"

                                                    >
                                                        <Calculator className="h-4 w-4" />
                                                        Calculate Payroll
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                                    >
                                                        <Upload className="h-4 w-4" />
                                                        Import Data
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            {(run.status === 'Draft' || run.status === 'Pending') && (
                                                <DropdownMenuItem
                                                    className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                    Manual Adjustments
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
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
                                <TableRow
                                    key={run.id}
                                    className={`hover:bg-gray-50 border-b border-gray-200 ${(run.status === 'Pending' || run.status === 'Paid') ? 'cursor-pointer' : ''}`}
                                    onClick={() => {
                                        if (run.status === 'Pending') {
                                            router.push('/payroll/payment-run/pendingDetail');
                                        } else if (run.status === 'Paid') {
                                            router.push('/payroll/payment-run/paidDetail');
                                        }
                                    }}
                                >
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
                                    <TableCell className="py-[19px] px-[16px]" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="rounded-[12px]" align="end">
                                                <DropdownMenuItem
                                                    className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                {run.status === 'Draft' && (
                                                    <>
                                                        <DropdownMenuItem
                                                            className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"

                                                        >
                                                            <Calculator className="h-4 w-4" />
                                                            Calculate Payroll
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"

                                                        >
                                                            <Upload className="h-4 w-4" />
                                                            Import Data
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                                {(run.status === 'Draft' || run.status === 'Pending') && (
                                                    <DropdownMenuItem
                                                        className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"

                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                        Manual Adjustments
                                                    </DropdownMenuItem>
                                                )}
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