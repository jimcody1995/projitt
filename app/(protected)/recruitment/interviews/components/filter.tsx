import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX } from "react";

/**
 * FilterTool component
 *
 * This component renders a filter UI with popover dropdowns for Locations,
 * Departments, Types, and Status filters. Each filter shows the number of
 * selected options or "All" if none selected. User selections are managed
 * with internal state arrays for each category.
 *
 * Returns:
 *  JSX.Element - The rendered filter tool component.
 */
export const FilterTool = ({ selectedMode, selectedStatuses, setSelectedMode, setSelectedStatuses }: { selectedMode: number[], selectedStatuses: string[], setSelectedMode: (value: number[]) => void, setSelectedStatuses: (value: string[]) => void }): JSX.Element => {
    const modeData = [
        { id: 1, value: "Google Meet" },
        { id: 2, value: "Zoom" },
        { id: 3, value: "Projitt" },
    ];
    const statuses = ["Review", "Screen", "Test"];


    const handleModeChange = (checked: boolean, value: number): void => {
        setSelectedMode(checked ? [...selectedMode, value] : selectedMode.filter((v) => v !== value))
    };

    const handleStatusChange = (checked: boolean, value: string): void => {
        setSelectedStatuses(checked ? [...selectedStatuses, value] : selectedStatuses.filter((v) => v !== value))
    };

    return (
        <div className="flex flex-wrap gap-[11px] mt-[17px] items-center">
            <Popover>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px]"
                        id="filter-mode-trigger"
                        data-testid="filter-mode-trigger"
                    >
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedStatuses.length > 0
                                ? "Status: " + selectedStatuses.length + " selected"
                                : "Status"}
                        </span>
                        <ChevronDown
                            className="size-[18px] text-[#4b4b4b]"
                            id="filter-mode-chevron"
                            data-testid="filter-mode-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-40 p-3"
                    align="start"
                    id="filter-mode-content"
                    data-testid="filter-mode-content"
                >
                    <div className="space-y-3">
                        {statuses.map((status: string, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-mode-item-${index}`}
                                data-testid={`filter-mode-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-mode-checkbox-${index}`}
                                    checked={selectedStatuses.find((s) => s === status) !== undefined}
                                    onCheckedChange={(checked) =>
                                        handleStatusChange(checked === true, status)
                                    }
                                    data-testid={`filter-mode-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-mode-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {status}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px]"
                        id="filter-mode-trigger"
                        data-testid="filter-mode-trigger"
                    >
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedMode.length > 0
                                ? "Mode: " + selectedMode.length + " selected"
                                : "Mode"}
                        </span>
                        <ChevronDown
                            className="size-[18px] text-[#4b4b4b]"
                            id="filter-mode-chevron"
                            data-testid="filter-mode-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-40 p-3"
                    align="start"
                    id="filter-mode-content"
                    data-testid="filter-mode-content"
                >
                    <div className="space-y-3">
                        {modeData.map((mode: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-mode-item-${index}`}
                                data-testid={`filter-mode-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-mode-checkbox-${index}`}
                                    checked={selectedMode.find((s) => s === mode.id) !== undefined}
                                    onCheckedChange={(checked) =>
                                        handleModeChange(checked === true, mode.id)
                                    }
                                    data-testid={`filter-mode-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-mode-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {mode.value}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
            <button className="flex gap-[6px] cursor-pointer" onClick={() => {
                setSelectedMode([]);
                setSelectedStatuses([]);
            }}>
                <X className="size-[20px]" />
                <span className="text-[14px]/[20px] text-[#353535]">Clear All</span>
            </button>
        </div>
    );
};
