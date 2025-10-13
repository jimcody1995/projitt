import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, X, Calendar, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";

/**
 * FilterTool component
 *
 * This component renders a filter UI with popover dropdowns for PayDate and Status filters.
 * Each filter shows the number of selected options or "All" if none selected.
 * User selections are managed with internal state arrays for each category.
 *
 * Returns:
 *  JSX.Element - The rendered filter tool component.
 */
export const FilterTool = ({
    selectedPayDates,
    selectedStatuses,
    setSelectedPayDates,
    setSelectedStatuses
}: {
    selectedPayDates: string[],
    selectedStatuses: string[],
    setSelectedPayDates: (value: string[]) => void,
    setSelectedStatuses: (value: string[]) => void
}): JSX.Element => {
    const [isPayDateOpen, setIsPayDateOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    // Available pay dates from the data
    const payDates = ["15 Mar, 2025"];

    // Available statuses
    const statuses = ["Draft", "Pending", "Paid"];

    const handlePayDateChange = (checked: boolean, value: string): void => {
        setSelectedPayDates(checked ? [...selectedPayDates, value] : selectedPayDates.filter((v) => v !== value))
    };

    const handleStatusChange = (checked: boolean, value: string): void => {
        setSelectedStatuses(checked ? [...selectedStatuses, value] : selectedStatuses.filter((v) => v !== value))
    };

    const clearAllFilters = (): void => {
        setSelectedPayDates([]);
        setSelectedStatuses([]);
    };

    return (
        <div className="flex flex-wrap gap-[11px] mb-3 items-center">
            {/* Pay Date filter */}
            <Popover open={isPayDateOpen} onOpenChange={setIsPayDateOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-paydate-trigger"
                        data-testid="filter-paydate-trigger"
                    >
                        <Calendar className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedPayDates.length > 0
                                ? "Pay Date: " + selectedPayDates.length + " selected"
                                : "Pay Date"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isPayDateOpen ? 'rotate-180' : ''}`}
                            id="filter-paydate-chevron"
                            data-testid="filter-paydate-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-40 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-paydate-content"
                    data-testid="filter-paydate-content"
                >
                    <div className="space-y-3">
                        {payDates.map((date, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-paydate-item-${index}`}
                                data-testid={`filter-paydate-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-paydate-checkbox-${index}`}
                                    checked={selectedPayDates.includes(date)}
                                    onCheckedChange={(checked) =>
                                        handlePayDateChange(checked === true, date)
                                    }
                                    data-testid={`filter-paydate-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-paydate-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {date}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Status filter */}
            <Popover open={isStatusOpen} onOpenChange={setIsStatusOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-status-trigger"
                        data-testid="filter-status-trigger"
                    >
                        <Clock className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedStatuses.length > 0
                                ? "Status: " + selectedStatuses.length + " selected"
                                : "Status"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`}
                            id="filter-status-chevron"
                            data-testid="filter-status-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-40 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-status-content"
                    data-testid="filter-status-content"
                >
                    <div className="space-y-3">
                        {statuses.map((status, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-status-item-${index}`}
                                data-testid={`filter-status-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-status-checkbox-${index}`}
                                    checked={selectedStatuses.includes(status)}
                                    onCheckedChange={(checked) =>
                                        handleStatusChange(checked === true, status)
                                    }
                                    data-testid={`filter-status-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-status-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {status}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Clear All Button */}
            {(selectedPayDates.length > 0 || selectedStatuses.length > 0) && (
                <button
                    className="flex gap-[6px] cursor-pointer transition-all duration-200 hover:opacity-70"
                    onClick={clearAllFilters}
                >
                    <X className="size-[20px]" />
                    <span className="text-[14px]/[20px] text-[#353535]">Clear All</span>
                </button>
            )}
        </div>
    );
};

