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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, Upload, AlertCircle, CheckCircle2, FileText, Link2, X } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Papa from "papaparse";
import { customToast } from "@/components/common/toastr";

interface BasicPayProps {
    onNext: () => void;
    onBack: () => void;
    payrollData: any;
    setPayrollData: (data: any) => void;
}

interface DataRow {
    [key: string]: string;
}

interface ValidationError {
    row: number;
    column: string;
    message: string;
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
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [batchId, setBatchId] = useState("")

    // Import modal state
    const [uploadMethod, setUploadMethod] = useState<"csv" | "api">("csv");
    const [apiUrl, setApiUrl] = useState("");
    const [data, setData] = useState<DataRow[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState("");

    const validateData = (rows: DataRow[]): ValidationError[] => {
        const errors: ValidationError[] = [];

        rows.forEach((row, index) => {
            Object.entries(row).forEach(([key, value]) => {
                if (!value || value.trim() === "") {
                    errors.push({
                        row: index,
                        column: key,
                        message: "Field cannot be empty"
                    });
                }
            });
        });

        return errors;
    };

    const handleFileUpload = (file: File) => {
        setFileName(file.name);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results: any) => {
                const parsedData = results.data as DataRow[];
                if (parsedData.length > 0) {
                    setHeaders(Object.keys(parsedData[0]));
                    setData(parsedData);
                    const errors = validateData(parsedData);
                    setValidationErrors(errors);

                    if (errors.length === 0) {
                        customToast("File uploaded successfully", `${parsedData.length} rows imported with no errors.`, "success");
                    } else {
                        customToast("File uploaded with warnings", `${errors.length} validation error(s) found.`, "warning");
                    }
                }
            },
            error: (error: any) => {
                customToast("Upload failed", error.message || "Unknown error", "error");
                console.error(error);
            }
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && (file.type === "text/csv" || file.name.endsWith('.csv'))) {
            handleFileUpload(file);
        } else {
            customToast("Invalid file type", "Please upload a CSV file.", "error");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log("File selected:", file);
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleApiImport = async () => {
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();

            if (Array.isArray(jsonData) && jsonData.length > 0) {
                setHeaders(Object.keys(jsonData[0]));
                setData(jsonData);
                const errors = validateData(jsonData);
                setValidationErrors(errors);

                customToast("API import successful", `${jsonData.length} rows imported.`, "success");
            }
        } catch (error) {
            customToast("API import failed", "Could not fetch data from the provided URL.", "error");
        }
    };

    const hasError = (rowIndex: number, column: string) => {
        return validationErrors.some(
            (error) => error.row === rowIndex && error.column === column
        );
    };

    const getErrorMessage = (rowIndex: number, column: string) => {
        const error = validationErrors.find(
            (error) => error.row === rowIndex && error.column === column
        );
        return error?.message;
    };

    const handleProcess = () => {
        if (validationErrors.length > 0) {
            customToast("Cannot process", "Please fix all validation errors before processing.", "error");
            return;
        }

        customToast("Processing data", `Processing ${data.length} rows...`, "info");
    };

    return (
        <div className="w-full max-w-[500px]">
            <h2 className="text-[16px] sm:text-[18px]/[24px] font-medium text-[#353535] mb-[16px] sm:mb-[20px]">
                Basic Pay
            </h2>

            <div className="space-y-[24px] sm:space-y-[32px]">
                {/**Batch ID */}
                <div className="flex flex-col gap-[10px]">
                    <Label htmlFor="batch-id" className="text-[13px] sm:text-[14px]/[16px] font-medium text-[#1C1C1C]">
                        Batch ID
                    </Label>
                    <Input id="batch-id" value={batchId} onChange={(e) => setBatchId(e.target.value)} type="text" className="w-full h-[44px] rounded-[8px] border-[#BCBCBC] p-[10px]" placeholder="PAYRUN-2025-01-09" />
                </div>
                {/* Select Payroll Type */}
                <div className="flex flex-col gap-[10px]">
                    <Label htmlFor="payroll-type" className="text-[13px] sm:text-[14px]/[16px] font-medium text-[#1C1C1C]">
                        Select Payroll Type
                    </Label>
                    <Select
                        value={payrollData.payrollType || ""}
                        onValueChange={(value) => setPayrollData({ ...payrollData, payrollType: value })}
                    >
                        <SelectTrigger
                            id="payroll-type"
                            className="w-full h-[44px] rounded-[8px] border-[#BCBCBC]"
                        >
                            <SelectValue placeholder="Select payroll type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Salary">Salary</SelectItem>
                            <SelectItem value="Hourly">Hourly</SelectItem>
                            <SelectItem value="Commission">Commission</SelectItem>
                        </SelectContent>
                    </Select>
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
                                            "w-full h-[44px] justify-start text-left font-normal rounded-[8px] border-[#BCBCBC]",
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
                                        onSelect={(date) => setStartDate(date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col gap-[5px]">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full h-[44px] justify-start text-left font-normal rounded-[8px] border-[#BCBCBC]",
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
                                        onSelect={(date) => setEndDate(date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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
                                        "w-full h-[44px] justify-start text-left font-normal rounded-[8px] border-[#BCBCBC]",
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
                                    onSelect={(date) => setPayDate(date)}
                                />
                            </PopoverContent>
                        </Popover>
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
                </div>
            </div>

            {/* Import Data Modal */}
            <Dialog open={importModalOpen} onOpenChange={setImportModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" close={false}>
                    <div className="min-h-screen bg-background p-3">
                        <div className="max-w-6xl mx-auto space-y-8">
                            <div>
                                <div className="flex flex-row justify-between items-center">
                                    <div>
                                        <h1 className="text-4xl font-bold mb-2">Data Import</h1>

                                    </div>
                                    <Button variant="outline" className="rounded-2" onClick={() => { setImportModalOpen(false) }} >
                                        <X className="w-6 h-6 text-black" />
                                    </Button>

                                </div>
                                <p className="text-muted-foreground">Upload CSV files or import data via API</p>
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Import Method</CardTitle>
                                    <CardDescription>Choose how you want to import your data</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex gap-4">
                                        <Button
                                            variant={uploadMethod === "csv" ? "primary" : "outline"}
                                            onClick={() => setUploadMethod("csv")}
                                            className="flex-1"
                                            size="lg"
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload CSV
                                        </Button>
                                        <Button
                                            variant={uploadMethod === "api" ? "primary" : "outline"}
                                            onClick={() => setUploadMethod("api")}
                                            className="flex-1"
                                            size="lg"
                                        >
                                            <Link2 className="mr-2 h-4 w-4" />
                                            Import via API
                                        </Button>
                                    </div>

                                    {uploadMethod === "csv" ? (
                                        <div
                                            onDrop={handleDrop}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                setIsDragging(true);
                                            }}
                                            onDragLeave={() => setIsDragging(false)}
                                            onClick={() => {
                                                const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                                                if (fileInput) {
                                                    fileInput.click();
                                                }
                                            }}
                                            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${isDragging
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                            <p className="text-lg font-medium mb-2">
                                                *Drag and drop* your CSV file here
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-4">or</p>
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                                                    if (fileInput) {
                                                        fileInput.click();
                                                    }
                                                }}
                                            >
                                                Browse Files
                                            </Button>
                                            <Input
                                                id="file-upload"
                                                type="file"
                                                accept=".csv,.txt"
                                                className="hidden"
                                                onChange={handleFileSelect}
                                            />
                                            {fileName && (
                                                <p className="text-sm text-muted-foreground mt-4">
                                                    Selected: {fileName}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="api-url">API Endpoint URL</Label>
                                                <Input
                                                    id="api-url"
                                                    type="url"
                                                    placeholder="https://api.example.com/data"
                                                    value={apiUrl}
                                                    onChange={(e) => setApiUrl(e.target.value)}
                                                />
                                            </div>
                                            <Button onClick={handleApiImport} className="w-full" size="lg">
                                                Import Data
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {validationErrors.length > 0 && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Found {validationErrors.length} validation error(s). Please review and fix them below.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {data.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Data Preview</CardTitle>
                                        <CardDescription>
                                            Review your data before processing ({data.length} rows)
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border overflow-auto max-h-96">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-12">#</TableHead>
                                                        {headers.map((header) => (
                                                            <TableHead key={header}>{header}</TableHead>
                                                        ))}
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {data.map((row, rowIndex) => (
                                                        <TableRow key={rowIndex}>
                                                            <TableCell className="font-medium">{rowIndex + 1}</TableCell>
                                                            {headers.map((header) => {
                                                                const hasErr = hasError(rowIndex, header);
                                                                const errorMsg = getErrorMessage(rowIndex, header);

                                                                return (
                                                                    <TableCell
                                                                        key={`${rowIndex}-${header}`}
                                                                        className={hasErr ? "bg-destructive/10" : ""}
                                                                    >
                                                                        <div className="space-y-1">
                                                                            <div>{row[header]}</div>
                                                                            {hasErr && (
                                                                                <div className="flex items-center gap-1 text-xs text-destructive">
                                                                                    <AlertCircle className="h-3 w-3" />
                                                                                    {errorMsg}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <Button
                                                onClick={handleProcess}
                                                disabled={validationErrors.length > 0}
                                                size="lg"
                                            >
                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                Process Data
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

