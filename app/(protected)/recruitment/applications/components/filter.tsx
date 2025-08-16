import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, X, Brain, Star, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";

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
export const FilterTool = ({ selectedAIScoring, selectedShortListed, selectedStatuses, setSelectedAIScoring, setSelectedShortListed, setSelectedStatuses }: { selectedAIScoring: number[], selectedShortListed: string, selectedStatuses: string[], setSelectedAIScoring: (value: number[]) => void, setSelectedShortListed: (value: string) => void, setSelectedStatuses: (value: string[]) => void }): JSX.Element => {
    const [isAIScoringOpen, setIsAIScoringOpen] = useState(false);
    const [isShortListedOpen, setIsShortListedOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const scoreData = [
        { id: 1, value: 40 },
        { id: 2, value: 50 },
        { id: 3, value: 60 },
        { id: 4, value: 70 },
        { id: 5, value: 90 },
    ];
    const statuses = ["Interview", "New", "Hired", "Rejected"];

    const handleShortListedChange = (checked: boolean): void => {
        setSelectedShortListed(checked ? "yes" : "no")
    };

    const handleAIScoringChange = (checked: boolean, value: number): void => {
        setSelectedAIScoring(checked ? [...selectedAIScoring, value] : selectedAIScoring.filter((v) => v !== value))
    };

    const handleStatusChange = (checked: boolean, value: string): void => {
        setSelectedStatuses(checked ? [...selectedStatuses, value] : selectedStatuses.filter((v) => v !== value))
    };

    const clearAllFilters = (): void => {
        setSelectedAIScoring([]);
        setSelectedShortListed("");
        setSelectedStatuses([]);
    };

    return (
        <div className="flex flex-wrap gap-[11px] mt-[17px] items-center">
            {/* AI Scoring filter */}
            <Popover open={isAIScoringOpen} onOpenChange={setIsAIScoringOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-ai-scoring-trigger"
                        data-testid="filter-ai-scoring-trigger"
                    >
                        <Brain className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedAIScoring.length > 0
                                ? "AI Scoring: " + selectedAIScoring.length + " selected"
                                : "AI Scoring"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isAIScoringOpen ? 'rotate-180' : ''}`}
                            id="filter-ai-scoring-chevron"
                            data-testid="filter-ai-scoring-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-40 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-ai-scoring-content"
                    data-testid="filter-ai-scoring-content"
                >
                    <div className="space-y-3">
                        {scoreData.map((score: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-location-item-${index}`}
                                data-testid={`filter-location-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-location-checkbox-${index}`}
                                    checked={selectedAIScoring.includes(score.id)}
                                    onCheckedChange={(checked) =>
                                        handleAIScoringChange(checked === true, score.id)
                                    }
                                    data-testid={`filter-location-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-location-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {score.value}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Shortlisted filter */}
            <Popover open={isShortListedOpen} onOpenChange={setIsShortListedOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-shortlisted-trigger"
                        data-testid="filter-shortlisted-trigger"
                    >
                        <Star className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedShortListed === "yes" ? "Shortlisted: Yes" : selectedShortListed === "no" ? "Shortlisted: No" : "Shortlisted"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isShortListedOpen ? 'rotate-180' : ''}`}
                            id="filter-shortlisted-chevron"
                            data-testid="filter-shortlisted-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-[150px] p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-shortlisted-content"
                    data-testid="filter-shortlisted-content"
                >
                    <div className="space-y-3 flex flex-col">
                        <button className={`text-[14px]/[20px] ${selectedShortListed === "yes" ? "text-[#0d978b]" : "text-[#787878]"} hover:bg-[#e9e9e9] py-[6px] rounded-[8px] cursor-pointer`} onClick={() => handleShortListedChange(true)}>
                            Yes
                        </button>
                        <button className={`text-[14px]/[20px] ${selectedShortListed === "no" ? "text-[#0d978b]" : "text-[#787878]"} hover:bg-[#e9e9e9] py-[6px] rounded-[8px] cursor-pointer`} onClick={() => handleShortListedChange(false)}>
                            No
                        </button>
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
