import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, Briefcase, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";

/**
 * AssessmentFilterTool component
 *
 * This component renders a filter UI with popover dropdowns for Types and Status filters. 
 * Each filter shows the number of selected options or "All" if none selected. 
 * User selections are managed through props passed from the parent component.
 *
 * Returns:
 *  JSX.Element - The rendered filter tool component.
 */
export const AssessmentFilterTool = ({
    selectedTypes,
    selectedStatuses,
    setSelectedTypes,
    setSelectedStatuses
}: {
    selectedTypes: string[],
    selectedStatuses: string[],
    setSelectedTypes: (value: string[]) => void,
    setSelectedStatuses: (value: string[]) => void
}): JSX.Element => {
    const [isTypesOpen, setIsTypesOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const types = ["Psychometric", "Coding"];
    const statuses = ["Open", "Closed", "Draft"];

    /**
     * Handle type checkbox change
     * @param checked - boolean whether the checkbox is checked
     * @param value - type name
     */
    const handleTypeChange = (checked: boolean, value: string): void => {
        setSelectedTypes(checked ? [...selectedTypes, value] : selectedTypes.filter((v) => v !== value));
    };

    /**
     * Handle status checkbox change
     * @param checked - boolean whether the checkbox is checked
     * @param value - status name
     */
    const handleStatusChange = (checked: boolean, value: string): void => {
        setSelectedStatuses(checked ? [...selectedStatuses, value] : selectedStatuses.filter((v) => v !== value));
    };

    const clearAllFilters = (): void => {
        setSelectedTypes([]);
        setSelectedStatuses([]);
    };

    return (
        <div className="flex flex-wrap gap-[11px] mt-[11px] items-center">
            {/* Types filter */}
            <Popover open={isTypesOpen} onOpenChange={setIsTypesOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-types-trigger"
                        data-testid="filter-types-trigger"
                    >
                        <Briefcase className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedTypes.length > 0
                                ? "Types: " + selectedTypes.length + " selected"
                                : "Types"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isTypesOpen ? 'rotate-180' : ''}`}
                            id="filter-types-chevron"
                            data-testid="filter-types-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-40 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-types-content"
                    data-testid="filter-types-content"
                >
                    <div className="space-y-3">
                        {types.map((type, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-type-item-${index}`}
                                data-testid={`filter-type-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-type-checkbox-${index}`}
                                    checked={selectedTypes.includes(type)}
                                    onCheckedChange={(checked) =>
                                        handleTypeChange(checked === true, type)
                                    }
                                    data-testid={`filter-type-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-type-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {type}
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
            <button
                className="flex gap-[6px] cursor-pointer transition-all duration-200 hover:opacity-70"
                onClick={clearAllFilters}
            >
                <X className="size-[20px]" />
                <span className="text-[14px]/[20px] text-[#353535]">Clear All</span>
            </button>
        </div>
    );
};
