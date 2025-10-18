import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter, Palette, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
    const [selectedDateRange, setSelectedDateRange] = useState<string>("today");

    const handleDateRangeChange = (dateRange: string) => {
        setSelectedDateRange(dateRange);
    }
    interface DateRange {
        today: string;
        thisWeek: string;
        thisMonth: string;
        thisYear: string;
        customDate: string;
    }
    const dateRanges: DateRange = {
        today: "Today",
        thisWeek: "This Week",
        thisMonth: "This Month",
        thisYear: "This Year",
        customDate: "Custom Date",
    }
    return (
        <>
            {/**Dashboard Header Select Date Range and Settings */}
            <div className="flex flex-row justify-between items-center">
                {/** Select Date Range */}
                <div className="flex flex-row items-center  border border-[#E9E9E9] overflow-hidden rounded-[8px]">
                    {Object.entries(dateRanges).map(([key, value]) => (
                        <Button variant="ghost" className={cn("h-11 border-r border-[#E9E9E9] last:border-r-0 rounded-none", selectedDateRange === key ? "bg-gray-200" : "bg-transparent")} onClick={() => handleDateRangeChange(key)}>
                            <span className={cn("text-[16px]/[20px] font-medium text-[#353535]", selectedDateRange === key ? "text-[#1C1C1C]" : "text-[#A5A5A5]")}>{value}</span>
                            {key === "customDate" && <Filter className="w-4 h-4 text-[#A5A5A5]" />}
                        </Button>
                    ))}
                </div>
                {/** Settings */}
                <div className="flex flex-row items-center gap-[16px]">
                    <Button variant="outline" className="h-11 bg-gray-100 rounded-[8px]">
                        <Palette className="w-4 h-4 text-[#A5A5A5]" />
                        <span className="text-[16px]/[20px] font-medium text-[#353535]">Change Theme</span>
                    </Button>
                    <Button variant="outline" className="h-11 rounded-[8px] bg-transparent">
                        <SlidersHorizontal className="w-4 h-4 text-[#A5A5A5]" />
                        <span className="text-[16px]/[20px] font-medium text-[#353535]">Customize</span>
                    </Button>
                </div>
            </div>
        </>
    );
}