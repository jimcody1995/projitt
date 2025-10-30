"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// Mock data for Payment Trend (values represent tens of thousands)
const paymentTrendData = [
    { month: "JAN", salary: 2.5, tax: 1.5 },
    { month: "FEB", salary: 3.2, tax: 1.8 },
    { month: "MAR", salary: 4.5, tax: 2.5 },
    { month: "APR", salary: 5.8, tax: 3.8 },
    { month: "MAY", salary: 6.2, tax: 4.2 },
    { month: "JUN", salary: 7.5, tax: 4.8 },
    { month: "JUL", salary: 8.2, tax: 4.5 },
    { month: "AUG", salary: 6.8, tax: 3.8 },
    { month: "SEP", salary: 7.2, tax: 4.0 },
    { month: "OCT", salary: 9.5, tax: 4.8 },
    { month: "NOV", salary: 10.8, tax: 5.2 },
    { month: "DEC", salary: 11.5, tax: 5.5 },
];

// Mock data for Labor Cost by Department
const laborCostData = [
    { department: "Day1", basicSalary: 3.5, bonuses: 2.0 },
    { department: "Day2", basicSalary: 6.5, bonuses: 1.8 },
    { department: "Day3", basicSalary: 2.2, bonuses: 1.0 },
    { department: "Day4", basicSalary: 8.0, bonuses: 2.5 },
    { department: "Day5", basicSalary: 6.5, bonuses: 1.8 },
    { department: "Day6", basicSalary: 3.5, bonuses: 1.5 },
    { department: "Day7", basicSalary: 8.0, bonuses: 2.5 },
    { department: "Day8", basicSalary: 4.2, bonuses: 1.5 },
    { department: "Day9", basicSalary: 3.0, bonuses: 1.5 },
    { department: "Day10", basicSalary: 7.0, bonuses: 2.5 },
];

export default function ReportsAnalytics() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2024, 0, 1), // Jan 1, 2024
        to: new Date(2024, 11, 31), // Dec 31, 2024
    });

    return (
        <div className=" w-full min-h-screen bg-[#F9F9F9]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[12px] sm:gap-[24px] mb-[12px] sm:mb-[14px] md:mb-[16px]">
                <h1 className="text-[18px]/[24px] sm:text-[20px]/[26px] md:text-[24px]/[30px] font-semibold text-[#353535]">
                    Report & Analytics
                </h1>

                {/* Date Range Selector */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "flex items-center gap-[6px] sm:gap-[8px] px-[12px] sm:px-[16px] py-[8px] border border-[#BCBCBC] rounded-[10px] h-[38px] sm:h-[42px] w-full sm:w-fit hover:bg-gray-50 bg-transparent",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="h-[14px] w-[14px] sm:h-[16px] sm:w-[16px] text-[#8C8E8E]" />
                            <span className="text-[12px] sm:text-[13px] md:text-[14px]/[20px] text-[#353535]">
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "MMM d")} - {format(date.to, "MMM d")}
                                        </>
                                    ) : (
                                        format(date.from, "MMM d, yyyy")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )}
                            </span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2}
                            className="sm:block"
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Top Section - Cards and Payment Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[12px] sm:gap-[16px] mb-[12px] sm:mb-[14px] md:mb-[16px]">
                {/* Left Side - Summary Cards */}
                <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-[12px] sm:gap-[16px]">
                    {/* Total Amount Paid */}
                    <div className="bg-white border flex flex-col justify-between border-[#E9E9E9] rounded-[12px] sm:rounded-[16px] p-[14px] sm:p-[18px] md:p-[20px] flex-1">
                        <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] bg-[#D9D9D9] mb-[8px] sm:mb-[10px] md:mb-[12px]"></div>
                        <div className="text-[13px]/[16px] sm:text-[14px]/[16px] md:text-[15px]/[16px] text-[#626262] mb-[4px]">
                            Total Amount Paid
                        </div>
                        <div className="text-[18px]/[16px] sm:text-[20px]/[16px] md:text-[22px]/[16px] font-medium text-[#353535]">
                            $1,278,500
                        </div>
                    </div>

                    {/* Total Tax Filed */}
                    <div className="bg-white border flex flex-col justify-between border-[#E9E9E9] rounded-[12px] sm:rounded-[16px] p-[14px] sm:p-[18px] md:p-[20px] flex-1">
                        <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] bg-[#D9D9D9] mb-[8px] sm:mb-[10px] md:mb-[12px]"></div>
                        <div className="text-[13px]/[16px] sm:text-[14px]/[16px] md:text-[15px]/[16px] text-[#626262] mb-[4px]">
                            Total Tax Filed
                        </div>
                        <div className="text-[18px]/[16px] sm:text-[20px]/[16px] md:text-[22px]/[16px] font-medium text-[#353535]">
                            $45,000
                        </div>
                    </div>
                </div>

                {/* Right Side - Payment Trend Chart */}
                <div className="lg:col-span-9 bg-white border border-[#E9E9E9] rounded-[12px] p-[12px] sm:p-[14px] md:p-[18px]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-[10px] sm:mb-[12px] md:mb-[14px]">
                        <h2 className="text-[14px]/[20px] sm:text-[15px]/[22px] md:text-[16px]/[22px] font-medium text-[#353535] mb-[8px] sm:mb-0">
                            Payment Trend
                        </h2>
                        <div className="flex gap-[12px] sm:gap-[14px] md:gap-[16px] text-[11px] sm:text-[12px] md:text-[13px]/[18px]">
                            <div className="flex items-center gap-[4px] sm:gap-[6px]">
                                <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] bg-[#0D978B] rounded-[3px]"></div>
                                <span className="text-[#1C1C1C]">Salary</span>
                            </div>
                            <div className="flex items-center gap-[4px] sm:gap-[6px]">
                                <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] bg-[#353535] rounded-[3px]"></div>
                                <span className="text-[#1C1C1C]">Tax</span>
                            </div>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={typeof window !== 'undefined' && window.innerWidth < 640 ? 220 : 280}>
                        <LineChart
                            data={paymentTrendData}
                            margin={{ top: 5, right: 5, left: typeof window !== 'undefined' && window.innerWidth < 640 ? -30 : -40, bottom: 5 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#E9E9E9"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: '#BCBCBC', fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? 7 : 12 }}
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                            />
                            <YAxis
                                tick={{ fill: '#BCBCBC', fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? 9 : 12 }}
                                axisLine={false}
                                tickLine={false}
                                domain={[0, 12]}
                                ticks={[0, 2, 4, 6, 8, 10, 12]}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #E9E9E9',
                                    borderRadius: '8px',
                                    fontSize: '13px'
                                }}
                            />
                            <Line
                                type="linear"
                                dataKey="salary"
                                stroke="#0D978B"
                                strokeWidth={1}
                                dot={false}
                            />
                            <Line
                                type="linear"
                                dataKey="tax"
                                stroke="#353535"
                                strokeWidth={1}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Labor Cost Chart */}
            <div className="bg-white border border-[#E9E9E9] rounded-[12px] p-[12px] sm:p-[14px] md:p-[18px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-[10px] sm:mb-[12px] md:mb-[14px]">
                    <h2 className="text-[14px]/[20px] sm:text-[15px]/[22px] md:text-[16px]/[22px] font-medium text-[#353535] mb-[8px] sm:mb-0">
                        Labor Cost
                    </h2>
                    <div className="flex gap-[12px] sm:gap-[14px] md:gap-[16px] text-[11px] sm:text-[12px] md:text-[13px]/[18px]">
                        <div className="flex items-center gap-[4px] sm:gap-[6px]">
                            <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] bg-[#0D978B] rounded-[3px]"></div>
                            <span className="text-[#1C1C1C]">Basic Salary</span>
                        </div>
                        <div className="flex items-center gap-[4px] sm:gap-[6px]">
                            <div className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] bg-[#353535] rounded-[3px]"></div>
                            <span className="text-[#1C1C1C]">Bonuses</span>
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={typeof window !== 'undefined' && window.innerWidth < 640 ? 240 : 320}>
                    <BarChart
                        data={laborCostData}
                        barCategoryGap="20%"
                        margin={{ top: 5, right: 5, left: typeof window !== 'undefined' && window.innerWidth < 640 ? -30 : -40, bottom: 5 }}
                    >
                        <CartesianGrid
                            stroke="#BCBCBC"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="department"
                            tick={{ fill: '#BCBCBC', fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? 6 : 8.5 }}
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                        />
                        <YAxis
                            tick={{ fill: '#BCBCBC', fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? 9 : 10 }}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 12]}
                            ticks={[0, 2, 4, 6, 8, 10, 12]}
                        />
                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #E9E9E9',
                                borderRadius: '8px',
                                fontSize: '13px'
                            }}
                        />
                        <Bar
                            dataKey="basicSalary"
                            stackId="a"
                            fill="#0D978B"
                            radius={[0, 0, 6, 6]}
                            barSize={typeof window !== 'undefined' && window.innerWidth < 640 ? 18 : 28}
                            activeBar={{ fill: '#0D978B' }}
                        />
                        <Bar
                            dataKey="bonuses"
                            stackId="a"
                            fill="#1C1C1C"
                            radius={[6, 6, 0, 0]}
                            barSize={typeof window !== 'undefined' && window.innerWidth < 640 ? 18 : 28}
                            activeBar={{ fill: '#1C1C1C' }}
                        />
                    </BarChart>
                </ResponsiveContainer>

                <div className="text-center mt-[6px] sm:mt-[8px]">
                    <p className="text-[11px] sm:text-[12px] text-[#787878]">Departments</p>
                </div>
            </div>
        </div>
    );
}