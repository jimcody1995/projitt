'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, ChevronLeft, ChevronRight, Home, ChevronRight as ChevronRightIcon } from "lucide-react";
import { SwapRequestsComponent } from "../components";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface FilterOptions {
    status: string[];
    department: string[];
    dateRange: string;
}

export default function Scheduling() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        status: [],
        department: [],
        dateRange: 'today'
    });
    const router = useRouter();
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
            <div className="px-[12px] sm:px-[16px] lg:px-[24px] py-[12px] sm:py-[16px] lg:py-[24px]">
                {/* Breadcrumb */}
                <div className="flex items-center gap-[6px] sm:gap-[8px] mb-[12px] sm:mb-[16px] lg:mb-[20px]">
                    <span className="text-[11px] sm:text-[12px] lg:text-[14px] text-[#6B7280] cursor-pointer" onClick={() => router.push('/leave-attendance/scheduling')}>Scheduling</span>
                    <ChevronRightIcon className="size-3 sm:size-4 text-[#6B7280]" />
                    <span className="text-[11px] sm:text-[12px] lg:text-[14px] text-[#353535] font-medium">Swap Requests</span>
                </div>

                {/* Title */}
                <h1 className="text-[18px] sm:text-[20px] lg:text-[24px] leading-[22px] sm:leading-[26px] lg:leading-[30px] font-semibold text-[#353535] mb-[16px] sm:mb-[24px] lg:mb-[32px]">
                    Swap Requests
                </h1>

                <SwapRequestsComponent
                    searchQuery={searchQuery}
                    selectedDate={selectedDate}
                    filterOptions={filterOptions}
                />

            </div>
        </div>
    );
}
