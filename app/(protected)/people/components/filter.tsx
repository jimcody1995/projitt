import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, X, Briefcase } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";
import { Input } from "@/components/ui/input";

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
export const FilterTool = ({
    selectedTypes,
    setSelectedTypes
}: {
    selectedTypes: string[],
    setSelectedTypes: (value: string[]) => void
}): JSX.Element => {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [searchTypeQuery, setSearchTypeQuery] = useState('');

    const handleTypeChange = (checked: boolean, value: string): void => {
        setSelectedTypes(checked ? [...selectedTypes, value] : selectedTypes.filter((v) => v !== value))
    };

    const clearAllFilters = (): void => {
        setSelectedTypes([]);
    };

    const filteredTypes = [{
        id: 'full-time',
        name: 'Full Time'
    }, {
        id: 'part-time',
        name: 'Part Time'
    }, {
        id: 'freelance',
        name: 'Freelance'
    }];

    return (
        <div className="flex flex-wrap gap-[11px] mt-[5px] items-center">
            <Popover open={isTypeOpen} onOpenChange={setIsTypeOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-type-trigger"
                        data-testid="filter-type-trigger"
                    >
                        <Briefcase className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedTypes.length > 0
                                ? "Type: " + selectedTypes.length + " selected"
                                : "Type"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isTypeOpen ? 'rotate-180' : ''
                                }`}
                            id="filter-type-chevron"
                            data-testid="filter-type-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-48 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-type-content"
                    data-testid="filter-type-content"
                >
                    <div className="space-y-3">
                        <Input
                            placeholder="Search type"
                            value={searchTypeQuery}
                            onChange={(e) => setSearchTypeQuery(e.target.value)}
                        />
                        {filteredTypes.map((type: { id: string; name: string; }, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-type-item-${index}`}
                                data-testid={`filter-type-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-type-checkbox-${index}`}
                                    checked={selectedTypes.includes(type.id)}
                                    onCheckedChange={(checked) =>
                                        handleTypeChange(checked === true, type.id)
                                    }
                                    data-testid={`filter-type-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-type-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {type.name}
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
