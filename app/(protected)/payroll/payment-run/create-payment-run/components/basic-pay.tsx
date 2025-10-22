"use client";

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
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Calculator, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BasicPayProps {
    onNext: () => void;
    onBack: () => void;
    payrollData: any;
    setPayrollData: (data: any) => void;
}

export default function BasicPay({
    onNext,
    onBack,
    payrollData,
    setPayrollData,
}: BasicPayProps) {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [payDate, setPayDate] = useState<Date>();
    const [calculationModalOpen, setCalculationModalOpen] = useState(false);
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [calculationLogs, setCalculationLogs] = useState<string[]>([]);
    const [calculationData, setCalculationData] = useState<any>(null);
    const [importMethod, setImportMethod] = useState<'csv' | 'api'>('csv');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    // Validation state
    const [errors, setErrors] = useState<{
        payrollType?: string;
        startDate?: string;
        endDate?: string;
        payDate?: string;
    }>({});
    const [touched, setTouched] = useState<{
        payrollType?: boolean;
        startDate?: boolean;
        endDate?: boolean;
        payDate?: boolean;
    }>({});

    // Validation functions
    const validateField = (field: string, value: any) => {
        switch (field) {
            case 'payrollType':
                return !value ? 'Please select a payroll type' : '';
            case 'startDate':
                return !value ? 'Please select a start date' : '';
            case 'endDate':
                return !value ? 'Please select an end date' : '';
            case 'payDate':
                return !value ? 'Please select a pay date' : '';
            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        const newTouched: any = {};

        // Validate all fields
        newErrors.payrollType = validateField('payrollType', payrollData.payrollType);
        newErrors.startDate = validateField('startDate', startDate);
        newErrors.endDate = validateField('endDate', endDate);
        newErrors.payDate = validateField('payDate', payDate);

        // Mark all fields as touched
        newTouched.payrollType = true;
        newTouched.startDate = true;
        newTouched.endDate = true;
        newTouched.payDate = true;

        setErrors(newErrors);
        setTouched(newTouched);

        // Return true if no errors
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSaveAndImport = () => {
        if (!validateForm()) {
            return; // Don't proceed if validation fails
        }

        // Save data to parent state
        setPayrollData({
            ...payrollData,
            payrollType: payrollData.payrollType || "Salary",
            startDate,
            endDate,
            payDate,
        });
        onNext();
    };

    // Field change handlers with validation
    const handlePayrollTypeChange = (value: string) => {
        setPayrollData({ ...payrollData, payrollType: value });
        setTouched({ ...touched, payrollType: true });
        const error = validateField('payrollType', value);
        setErrors({ ...errors, payrollType: error });
    };

    const handleStartDateChange = (date: Date | undefined) => {
        setStartDate(date);
        setTouched({ ...touched, startDate: true });
        const error = validateField('startDate', date);
        setErrors({ ...errors, startDate: error });
    };

    const handleEndDateChange = (date: Date | undefined) => {
        setEndDate(date);
        setTouched({ ...touched, endDate: true });
        const error = validateField('endDate', date);
        setErrors({ ...errors, endDate: error });
    };

    const handlePayDateChange = (date: Date | undefined) => {
        setPayDate(date);
        setTouched({ ...touched, payDate: true });
        const error = validateField('payDate', date);
        setErrors({ ...errors, payDate: error });
    };

    const handleCalculatePayroll = async () => {
        if (!validateForm()) {
            return; // Don't proceed if validation fails
        }

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
                        totalEmployees: 268,
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
        <div className="w-full max-w-[500px]">
            <h2 className="text-[16px] sm:text-[18px]/[24px] font-medium text-[#353535] mb-[16px] sm:mb-[20px]">
                Basic Pay
            </h2>

            <div className="space-y-[24px] sm:space-y-[32px]">
                {/* Select Payroll Type */}
                <div className="flex flex-col gap-[10px]">
                    <Label htmlFor="payroll-type" className="text-[13px] sm:text-[14px]/[16px] font-medium text-[#1C1C1C]">
                        Select Payroll Type
                    </Label>
                    <Select
                        value={payrollData.payrollType || ""}
                        onValueChange={handlePayrollTypeChange}
                    >
                        <SelectTrigger
                            id="payroll-type"
                            className={`w-full h-[44px] rounded-[8px] ${touched.payrollType && errors.payrollType
                                ? 'border-red-500'
                                : 'border-[#BCBCBC]'
                                }`}
                        >
                            <SelectValue placeholder="Select payroll type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Salary">Salary</SelectItem>
                            <SelectItem value="Hourly">Hourly</SelectItem>
                            <SelectItem value="Commission">Commission</SelectItem>
                        </SelectContent>
                    </Select>
                    {touched.payrollType && errors.payrollType && (
                        <p className="text-red-500 text-sm">{errors.payrollType}</p>
                    )}
                </div>

                {/* Pay Period */}
                <div className="flex flex-col gap-[10px]">
                    <Label className="text-[13px] sm:text-[14px]/[16px] font-medium text-[#1C1C1C]">
                        Pay Period
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[16px]">
                        {/* Start Date */}
                        <div className="flex flex-col gap-[5px]">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full h-[44px] justify-start text-left font-normal rounded-[8px]",
                                            touched.startDate && errors.startDate
                                                ? "border-red-500"
                                                : "border-[#BCBCBC]",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={handleStartDateChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {touched.startDate && errors.startDate && (
                                <p className="text-red-500 text-sm">{errors.startDate}</p>
                            )}
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col gap-[5px]">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full h-[44px] justify-start text-left font-normal rounded-[8px]",
                                            touched.endDate && errors.endDate
                                                ? "border-red-500"
                                                : "border-[#BCBCBC]",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "MMM d, yyyy") : "End date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={handleEndDateChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {touched.endDate && errors.endDate && (
                                <p className="text-red-500 text-sm">{errors.endDate}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pay Date */}
                <div className="flex flex-col gap-[10px]">
                    <Label className="text-[13px] sm:text-[14px]/[16px] font-medium text-[#1C1C1C]">
                        Pay Date
                    </Label>
                    <div className="flex flex-col gap-[5px]">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full h-[44px] justify-start text-left font-normal rounded-[8px]",
                                        touched.payDate && errors.payDate
                                            ? "border-red-500"
                                            : "border-[#BCBCBC]",
                                        !payDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {payDate ? format(payDate, "MMM d, yyyy") : "Select pay date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={payDate}
                                    onSelect={handlePayDateChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {touched.payDate && errors.payDate && (
                            <p className="text-red-500 text-sm">{errors.payDate}</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Button
                        variant="outline"
                        className="flex-1 h-[44px] rounded-[8px] border-[#BCBCBC] text-[#4B4B4B] font-medium"
                        onClick={() => setImportModalOpen(true)}
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        Import Data
                    </Button>
                    {/* <Button
                        className="flex-1 h-[44px] rounded-[8px] bg-[#0D978B] hover:bg-[#0c8679] text-white font-medium"
                        onClick={handleCalculatePayroll}
                    >
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Payroll
                    </Button> */}
                </div>

                {/* Calculation Preview */}
                {calculationData && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <h3 className="font-medium text-green-800">Calculation Complete</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-green-700">Total Employees:</span>
                                <span className="font-medium ml-2">{calculationData.totalEmployees}</span>
                            </div>
                            <div>
                                <span className="text-green-700">Net Pay:</span>
                                <span className="font-medium ml-2">${calculationData.netPay.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Calculation Modal */}
            <Dialog open={calculationModalOpen} onOpenChange={setCalculationModalOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Calculator className="h-5 w-5" />
                            Payroll Calculation
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
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Category</th>
                                                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {calculationData.breakdown.map((item: any, index: number) => (
                                                    <tr key={index} className="border-b">
                                                        <td className="px-4 py-2 font-medium">{item.category}</td>
                                                        <td className="px-4 py-2 text-right font-mono">
                                                            ${item.amount.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
                                    onNext();
                                }}
                            >
                                Continue to Next Step
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
                            Import Employee Data
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
        </div>
    );
}

