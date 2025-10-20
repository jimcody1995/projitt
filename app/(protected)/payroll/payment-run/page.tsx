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

    // Calculation functions
    const handleCalculatePayroll = async (run: any) => {
        setSelectedRun(run);
        setIsCalculating(true);
        setCalculationLogs([]);
        setCalculationModalOpen(true);

        // Simulate calculation process
        const logs = [
            "Starting payroll calculation...",
            "Loading employee data...",
            "Calculating gross pay...",
            "Computing deductions...",
            "Calculating taxes...",
            "Processing benefits...",
            "Finalizing net pay...",
            "Calculation completed successfully!"
        ];

        for (let i = 0; i < logs.length; i++) {
            setTimeout(() => {
                setCalculationLogs(prev => [...prev, logs[i]]);
                if (i === logs.length - 1) {
                    setIsCalculating(false);
                    setCalculationData({
                        totalEmployees: run.employees,
                        grossPay: 350000,
                        deductions: 37500,
                        taxes: 52500,
                        netPay: 260000,
                        breakdown: [
                            { category: "Basic Salary", amount: 280000 },
                            { category: "Overtime", amount: 35000 },
                            { category: "Bonus", amount: 35000 },
                            { category: "Health Insurance", amount: 15000 },
                            { category: "Retirement", amount: 14000 },
                            { category: "Tax", amount: 52500 },
                            { category: "Other Deductions", amount: 8500 }
                        ]
                    });
                }
            }, i * 1000);
        }
    };

    const handleImportData = (run: any) => {
        setSelectedRun(run);
        setImportModalOpen(true);
    };

    const handleManualAdjustment = (run: any) => {
        setSelectedRun(run);
        setAdjustmentModalOpen(true);
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate file upload progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setIsUploading(false);
                    // Simulate successful upload
                    setTimeout(() => {
                        setImportModalOpen(false);
                        setSelectedFile(null);
                        setUploadProgress(0);
                        // You can add success notification here
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleApiImport = async () => {
        if (!apiEndpoint || !apiKey) return;

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate API import progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setIsUploading(false);
                    // Simulate successful API import
                    setTimeout(() => {
                        setImportModalOpen(false);
                        setApiEndpoint('');
                        setApiKey('');
                        setUploadProgress(0);
                        // You can add success notification here
                    }, 500);
                    return 100;
                }
                return prev + 15;
            });
        }, 300);
    };

    const handleImport = () => {
        if (importMethod === 'csv') {
            handleFileUpload();
        } else {
            handleApiImport();
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            // Check if file type is supported
            const supportedTypes = ['.csv', '.xlsx', '.xls'];
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

            if (supportedTypes.includes(fileExtension)) {
                setSelectedFile(file);
            } else {
                alert('Please select a supported file type (CSV, XLSX, XLS)');
            }
        }
    };
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
                                                onClick={() => {
                                                    if (run.status === 'Pending') {
                                                        router.push('/payroll/payment-run/pendingDetail');
                                                    } else if (run.status === 'Paid') {
                                                        router.push('/payroll/payment-run/paidDetail');
                                                    }
                                                }}
                                            >
                                                <Eye className="h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            {run.status === 'Draft' && (
                                                <>
                                                    <DropdownMenuItem
                                                        className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                                        onClick={() => handleCalculatePayroll(run)}
                                                    >
                                                        <Calculator className="h-4 w-4" />
                                                        Calculate Payroll
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                                        onClick={() => handleImportData(run)}
                                                    >
                                                        <Upload className="h-4 w-4" />
                                                        Import Data
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            {(run.status === 'Draft' || run.status === 'Pending') && (
                                                <DropdownMenuItem
                                                    className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                                    onClick={() => handleManualAdjustment(run)}
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
                                                    onClick={() => {
                                                        if (run.status === 'Pending' || run.status === 'Paid') {
                                                            router.push(`/payroll/payment-run/${run.id}?status=${run.status}`);
                                                        }
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                {run.status === 'Draft' && (
                                                    <>
                                                        <DropdownMenuItem
                                                            className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                                            onClick={() => handleCalculatePayroll(run)}
                                                        >
                                                            <Calculator className="h-4 w-4" />
                                                            Calculate Payroll
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                                            onClick={() => handleImportData(run)}
                                                        >
                                                            <Upload className="h-4 w-4" />
                                                            Import Data
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                                {(run.status === 'Draft' || run.status === 'Pending') && (
                                                    <DropdownMenuItem
                                                        className="text-[12px]/[18px] text-[#4B4B4B] h-[48px] flex items-center gap-2"
                                                        onClick={() => handleManualAdjustment(run)}
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

            {/* Calculation Modal */}
            <Dialog open={calculationModalOpen} onOpenChange={setCalculationModalOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Calculator className="h-5 w-5" />
                            Payroll Calculation - {selectedRun?.payPeriod}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Calculation Status */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-3">Calculation Status</h3>
                            <div className="space-y-2">
                                {calculationLogs.map((log, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm">
                                        {isCalculating && index === calculationLogs.length - 1 ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                                        ) : (
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        )}
                                        <span className={isCalculating && index === calculationLogs.length - 1 ? "text-teal-600" : "text-gray-600"}>
                                            {log}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calculation Results */}
                        {calculationData && (
                            <div className="space-y-4">
                                <h3 className="font-medium">Calculation Results</h3>

                                {/* Summary Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Total Employees</p>
                                        <p className="text-2xl font-bold text-blue-600">{calculationData.totalEmployees}</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Gross Pay</p>
                                        <p className="text-2xl font-bold text-green-600">${calculationData.grossPay.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Deductions</p>
                                        <p className="text-2xl font-bold text-red-600">${calculationData.deductions.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-teal-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Net Pay</p>
                                        <p className="text-2xl font-bold text-teal-600">${calculationData.netPay.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Detailed Breakdown */}
                                <div className="bg-white border rounded-lg">
                                    <div className="p-4 border-b">
                                        <h4 className="font-medium">Earnings & Deductions Breakdown</h4>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Category</TableHead>
                                                    <TableHead className="text-right">Amount</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {calculationData.breakdown.map((item: any, index: number) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium">{item.category}</TableCell>
                                                        <TableCell className="text-right font-mono">
                                                            ${item.amount.toLocaleString()}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setCalculationModalOpen(false)}>
                            Close
                        </Button>
                        {calculationData && (
                            <Button
                                className="bg-teal-600 hover:bg-teal-700"
                                onClick={() => {
                                    setCalculationModalOpen(false);
                                    // Navigate to review page or update status
                                }}
                            >
                                Proceed to Review
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Import Data Modal */}
            <Dialog open={importModalOpen} onOpenChange={setImportModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Import Employee Data - {selectedRun?.payPeriod}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Import Method Selection */}
                        <div className="space-y-4">
                            <h4 className="font-medium">Choose Import Method</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setImportMethod('csv')}
                                    className={`p-4 border-2 rounded-lg text-left transition-colors ${importMethod === 'csv'
                                        ? 'border-teal-500 bg-teal-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Upload className="h-5 w-5" />
                                        <span className="font-medium">CSV Upload</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Upload CSV or Excel file</p>
                                </button>
                                <button
                                    onClick={() => setImportMethod('api')}
                                    className={`p-4 border-2 rounded-lg text-left transition-colors ${importMethod === 'api'
                                        ? 'border-teal-500 bg-teal-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calculator className="h-5 w-5" />
                                        <span className="font-medium">API Import</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Connect via API endpoint</p>
                                </button>
                            </div>
                        </div>

                        {/* CSV Upload Section */}
                        {importMethod === 'csv' && (
                            <div className="space-y-4">
                                <div
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver
                                        ? 'border-teal-500 bg-teal-50'
                                        : 'border-gray-300 hover:border-teal-400'
                                        }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
                                    <p className="text-gray-600 mb-4">Drag and drop your CSV file here, or click to browse</p>

                                    <input
                                        type="file"
                                        id="file-upload"
                                        accept=".csv,.xlsx,.xls"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                        ref={(input) => {
                                            if (input) {
                                                // Store reference for programmatic access
                                                (window as any).fileInputRef = input;
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        className="bg-teal-600 hover:bg-teal-700 cursor-pointer"
                                        onClick={() => {
                                            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                                            if (fileInput) {
                                                fileInput.click();
                                            }
                                        }}
                                    >
                                        Choose File
                                    </Button>

                                    {selectedFile && (
                                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                <span className="text-sm font-medium text-green-800">
                                                    Selected: {selectedFile.name}
                                                </span>
                                            </div>
                                            <p className="text-xs text-green-600 mt-1">
                                                Size: {(selectedFile.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-500 mt-2">Supported formats: CSV, Excel (.xlsx, .xls)</p>
                                </div>
                            </div>
                        )}

                        {/* API Import Section */}
                        {importMethod === 'api' && (
                            <div className="space-y-4">
                                <h4 className="font-medium">API Configuration</h4>
                                <div className="space-y-2">
                                    <Label htmlFor="api-endpoint">API Endpoint</Label>
                                    <Input
                                        id="api-endpoint"
                                        value={apiEndpoint}
                                        onChange={(e) => setApiEndpoint(e.target.value)}
                                        placeholder="https://api.example.com/employees"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="api-key">API Key</Label>
                                    <Input
                                        id="api-key"
                                        type="password"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder="Enter your API key"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Upload Progress */}
                        {isUploading && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-yellow-800">Data Validation</h4>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        The system will validate all imported data and show any errors before processing.
                                        You can preview and correct data before final import.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setImportModalOpen(false);
                                setSelectedFile(null);
                                setApiEndpoint('');
                                setApiKey('');
                                setUploadProgress(0);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-teal-600 hover:bg-teal-700"
                            onClick={handleImport}
                            disabled={
                                isUploading ||
                                (importMethod === 'csv' && !selectedFile) ||
                                (importMethod === 'api' && (!apiEndpoint || !apiKey))
                            }
                        >
                            {isUploading ? 'Importing...' : 'Import Data'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Manual Adjustments Modal */}
            <Dialog open={adjustmentModalOpen} onOpenChange={setAdjustmentModalOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="pb-4 border-b border-gray-200">
                        <DialogTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2 bg-teal-100 rounded-lg">
                                <Edit3 className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-900">Manual Adjustments</h2>
                                <p className="text-sm text-gray-600 font-normal">{selectedRun?.payPeriod}</p>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-8 py-6">
                        {/* Adjustment Form */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                Add New Adjustment
                            </h3>

                            <div className="space-y-6">
                                {/* Adjustment Type and Amount */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="adjustment-type" className="text-sm font-medium text-gray-700">
                                            Adjustment Type *
                                        </Label>
                                        <select
                                            id="adjustment-type"
                                            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                                        >
                                            <option value="">Select adjustment type</option>
                                            <option value="bonus" className="text-green-700">Bonus</option>
                                            <option value="deduction" className="text-green-700">Deduction</option>
                                            <option value="overtime" className="text-green-700">Overtime</option>
                                            <option value="commission" className="text-green-700">Commission</option>
                                            <option value="other" className="text-green-700">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                                            Amount ($) *
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                                            <Input
                                                id="amount"
                                                type="number"
                                                placeholder="0.00"
                                                className="h-12 pl-8 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                                        Description *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter a detailed description of this adjustment..."
                                        rows={3}
                                        className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                                    />
                                </div>

                                {/* Employee Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="employee" className="text-sm font-medium text-gray-700">
                                        Apply To
                                    </Label>
                                    <select
                                        id="employee"
                                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                                    >
                                        <option value="">All Employees</option>
                                        <option value="1">John Doe - Software Engineer</option>
                                        <option value="2">Jane Smith - Marketing Manager</option>
                                        <option value="3">Mike Johnson - Sales Director</option>
                                        <option value="4">Sarah Wilson - HR Specialist</option>
                                    </select>
                                </div>

                                {/* Additional Options */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="effective-date" className="text-sm font-medium text-gray-700">
                                            Effective Date
                                        </Label>
                                        <Input
                                            id="effective-date"
                                            type="date"
                                            className="h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                                            Category
                                        </Label>
                                        <select
                                            id="category"
                                            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                                        >
                                            <option value="">Select category</option>
                                            <option value="performance">Performance Related</option>
                                            <option value="holiday">Holiday/Seasonal</option>
                                            <option value="penalty">Penalty/Fine</option>
                                            <option value="reimbursement">Reimbursement</option>
                                            <option value="miscellaneous">Miscellaneous</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Adjustments */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                Recent Adjustments
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-medium text-gray-900">Holiday Bonus</p>
                                            <p className="text-sm text-gray-600">All Employees • Dec 15, 2024</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-green-600">+$500.00</p>
                                        <p className="text-xs text-gray-500">Performance Related</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-medium text-gray-900">Late Fee</p>
                                            <p className="text-sm text-gray-600">John Doe • Dec 10, 2024</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-red-600">-$25.00</p>
                                        <p className="text-xs text-gray-500">Penalty/Fine</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-medium text-gray-900">Overtime Pay</p>
                                            <p className="text-sm text-gray-600">Jane Smith • Dec 8, 2024</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-blue-600">+$150.00</p>
                                        <p className="text-xs text-gray-500">Overtime</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                                    View All Adjustments →
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">Total Adjustments:</span> 3 items •
                            <span className="text-green-600 font-medium ml-1">+$625.00</span>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setAdjustmentModalOpen(false)}
                                className="px-6 h-11 border-gray-300 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-teal-600 hover:bg-teal-700 px-8 h-11 font-medium"
                            >
                                Add Adjustment
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}