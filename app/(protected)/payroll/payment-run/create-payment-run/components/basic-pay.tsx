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
import { CalendarIcon } from "lucide-react";
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

    const handleSaveAndImport = () => {
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
                        value={payrollData.payrollType || "Salary"}
                        onValueChange={(value) =>
                            setPayrollData({ ...payrollData, payrollType: value })
                        }
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
                                    onSelect={setStartDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        {/* End Date */}
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
                                    onSelect={setEndDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Pay Date */}
                <div className="flex flex-col gap-[10px]">
                    <Label className="text-[13px] sm:text-[14px]/[16px] font-medium text-[#1C1C1C]">
                        Pay Date
                    </Label>
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
                                onSelect={setPayDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}

