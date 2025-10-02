'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { ClockLogsComponent, TimeExceptionsComponent } from "./components";
import { format } from "date-fns";

interface FilterOptions {
    status: string[];
    department: string[];
    dateRange: string;
}

export default function AttendanceTracking() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        status: [],
        department: [],
        dateRange: 'today'
    });

    const handleDateChange = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedDate);
        if (direction === 'prev') {
            newDate.setDate(newDate.getDate() - 1);
        } else {
            newDate.setDate(newDate.getDate() + 1);
        }
        setSelectedDate(newDate);
    };

    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        setFilterOptions(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilterOptions({
            status: [],
            department: [],
            dateRange: 'today'
        });
    };

    const formatDisplayDate = (date: Date) => {
        return format(date, 'EEEE, d MMMM');
    };

    return (
        <div className="w-full h-full bg-[#F8F9FA] min-h-screen">
            {/* Header */}
            <div className="px-[16px] sm:px-[24px] py-[16px] sm:py-[24px]">
                {/* Title */}
                <h1 className="text-[20px] sm:text-[24px] leading-[26px] sm:leading-[30px] font-semibold text-[#353535] mb-[10px]">
                    Attendance Tracking
                </h1>

                {/* Statistics */}
                <div className="flex flex-wrap gap-[8px] sm:gap-[16px] mb-[16px] sm:mb-[22px] items-center">
                    <div className="flex items-center gap-[8px]">
                        <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[21px] text-primary">78/120 Clock Ins</span>
                    </div>
                    <div className="w-[2px] h-[2px] bg-gray-400 hidden sm:block"></div>
                    <div className="flex items-center gap-[8px]">
                        <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#3D62F4]">41 Missed Entries</span>
                    </div>
                    <div className="w-[2px] h-[2px] bg-gray-400 hidden sm:block"></div>
                    <div className="flex items-center gap-[8px]">
                        <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#FFA750]">5 Overtimes</span>
                    </div>
                    <div className="w-[2px] h-[2px] bg-gray-400 hidden sm:block"></div>
                    <div className="flex items-center gap-[8px]">
                        <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#C30606]">12 Late Arrivals</span>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="clock-logs" className="w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[16px] lg:gap-0 mb-[16px] sm:mb-[24px]">
                        <TabsList variant="line" className="bg-transparent p-0 w-full lg:w-auto">
                            <TabsTrigger value="clock-logs" className="text-[14px] sm:text-[15px] leading-[18px] sm:leading-[20px] font-medium px-[20px] sm:px-[36px] py-[8px] sm:py-[11px] flex-1 lg:flex-none">
                                Clock Logs
                            </TabsTrigger>
                            <TabsTrigger value="time-exceptions" className="text-[14px] sm:text-[15px] leading-[18px] sm:leading-[20px] font-medium px-[20px] sm:px-[36px] py-[8px] sm:py-[11px] relative flex-1 lg:flex-none">
                                Time Exceptions
                                <span className="ml-[4px] sm:ml-[8px] bg-[#D6EEEC] text-primary text-[10px] sm:text-[12px] leading-[12px] sm:leading-[16px] px-[4px] sm:px-[6px] py-[1px] sm:py-[2px] rounded-full">
                                    12
                                </span>
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[8px] sm:gap-[12px]">
                            {/* Filter Toggle Button */}
                            <Button
                                variant="outline"
                                className="h-[36px] px-[12px] flex items-center justify-center gap-[8px] border border-[#626262] text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] w-full sm:w-auto"
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <Filter className="size-4" />
                                <span className="hidden sm:inline">Filter</span>
                                {(filterOptions.status.length > 0 || filterOptions.department.length > 0) && (
                                    <span className="ml-1 bg-primary text-white text-[10px] sm:text-[12px] leading-[12px] sm:leading-[16px] px-1 sm:px-1.5 py-0.5 rounded-full">
                                        {filterOptions.status.length + filterOptions.department.length}
                                    </span>
                                )}
                            </Button>

                            {/* Date Navigation */}
                            <div className="flex items-center gap-[4px] sm:gap-[8px]">
                                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                                    <PopoverTrigger asChild>
                                        <div className="cursor-pointer w-8 h-8 bg-[#0d978b] hover:bg-[#0b7a6f] rounded-md flex items-center justify-center transition-colors">
                                            <Calendar className="size-4 text-white" />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={(date) => {
                                                if (date) {
                                                    setSelectedDate(date);
                                                    setShowCalendar(false);
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1"
                                    onClick={() => handleDateChange('prev')}
                                >
                                    <ChevronLeft className="size-4" />
                                </Button>

                                <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#353535] font-medium px-1 sm:px-2 text-center min-w-0 flex-1">
                                    <span className="hidden sm:inline">{formatDisplayDate(selectedDate)}</span>
                                    <span className="sm:hidden">{format(selectedDate, 'MMM d')}</span>
                                </span>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1"
                                    onClick={() => handleDateChange('next')}
                                >
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                            <div className="relative w-full sm:w-auto">
                                <Search className="size-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 h-[36px] w-full sm:w-[200px] border-[#E9E9E9] text-[12px] sm:text-[14px] rounded-[8px] bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Inline Filter Row */}
                    {showFilter && (
                        <div className="bg-white rounded-[8px] p-[12px] sm:p-[16px] mb-[12px] sm:mb-[16px] border border-[#E9E9E9]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] sm:gap-[16px]">
                                {/* Status Filter */}
                                <div className="space-y-2">
                                    <Label className="text-[12px] sm:text-sm font-medium text-[#353535]">Status</Label>
                                    <div className="flex flex-wrap gap-[6px] sm:gap-[8px]">
                                        {['Present', 'Absent', 'Late', 'Overtime', 'Leave'].map((status) => (
                                            <Button
                                                key={status}
                                                variant={filterOptions.status.includes(status.toLowerCase()) ? "primary" : "outline"}
                                                size="sm"
                                                className="h-[24px] sm:h-[28px] px-[8px] sm:px-[12px] text-[10px] sm:text-[12px]"
                                                onClick={() => {
                                                    if (filterOptions.status.includes(status.toLowerCase())) {
                                                        handleFilterChange('status', filterOptions.status.filter(s => s !== status.toLowerCase()));
                                                    } else {
                                                        handleFilterChange('status', [...filterOptions.status, status.toLowerCase()]);
                                                    }
                                                }}
                                            >
                                                {status}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Department Filter */}
                                <div className="space-y-2">
                                    <Label className="text-[12px] sm:text-sm font-medium text-[#353535]">Department</Label>
                                    <div className="flex flex-wrap gap-[6px] sm:gap-[8px]">
                                        {['Engineering', 'HR', 'Marketing', 'Sales', 'Finance'].map((dept) => (
                                            <Button
                                                key={dept}
                                                variant={filterOptions.department.includes(dept.toLowerCase()) ? "primary" : "outline"}
                                                size="sm"
                                                className="h-[24px] sm:h-[28px] px-[8px] sm:px-[12px] text-[10px] sm:text-[12px]"
                                                onClick={() => {
                                                    if (filterOptions.department.includes(dept.toLowerCase())) {
                                                        handleFilterChange('department', filterOptions.department.filter(d => d !== dept.toLowerCase()));
                                                    } else {
                                                        handleFilterChange('department', [...filterOptions.department, dept.toLowerCase()]);
                                                    }
                                                }}
                                            >
                                                {dept}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Date Range Filter */}
                                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                                    <Label className="text-[12px] sm:text-sm font-medium text-[#353535]">Date Range</Label>
                                    <Select value={filterOptions.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                                        <SelectTrigger className="h-[24px] sm:h-[28px] text-[10px] sm:text-[12px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="yesterday">Yesterday</SelectItem>
                                            <SelectItem value="thisWeek">This Week</SelectItem>
                                            <SelectItem value="lastWeek">Last Week</SelectItem>
                                            <SelectItem value="thisMonth">This Month</SelectItem>
                                            <SelectItem value="lastMonth">Last Month</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex justify-end mt-[8px] sm:mt-[12px] pt-[8px] sm:pt-[12px] border-t border-[#E9E9E9]">
                                <Button variant="outline" size="sm" onClick={clearFilters} className="h-[24px] sm:h-[28px] text-[10px] sm:text-[12px] px-[8px] sm:px-[12px]">
                                    Clear All
                                </Button>
                            </div>
                        </div>
                    )}

                    <TabsContent value="clock-logs">
                        <ClockLogsComponent
                            searchQuery={searchQuery}
                            selectedDate={selectedDate}
                            filterOptions={filterOptions}
                        />
                    </TabsContent>

                    <TabsContent value="time-exceptions">
                        <TimeExceptionsComponent
                            searchQuery={searchQuery}
                            selectedDate={selectedDate}
                            filterOptions={filterOptions}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
