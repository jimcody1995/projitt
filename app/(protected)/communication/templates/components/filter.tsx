import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";

/**
 * FilterTool component for Templates page
 *
 * This component renders a filter UI with popover dropdowns for Use Case and Default filters.
 * Each filter shows the number of selected options or "All" if none selected.
 * User selections are managed with internal state arrays for each category.
 *
 * Returns:
 *  JSX.Element - The rendered filter tool component.
 */
export const FilterTool = ({
    selectedUseCases,
    selectedDefaults,
    setSelectedUseCases,
    setSelectedDefaults
}: {
    selectedUseCases: string[],
    selectedDefaults: string[],
    setSelectedUseCases: (value: string[]) => void,
    setSelectedDefaults: (value: string[]) => void
}): JSX.Element => {
    const [isUseCaseOpen, setIsUseCaseOpen] = useState(false);
    const [isDefaultOpen, setIsDefaultOpen] = useState(false);

    // Use Case options
    const useCaseOptions = [
        { id: 'onboarding', label: 'Onboarding' },
        { id: 'offer-letter', label: 'Offer Letter' },
        { id: 'interview', label: 'Interview' },
        { id: 'rejection', label: 'Rejection' },
        { id: 'welcome', label: 'Welcome' },
        { id: 'reminder', label: 'Reminder' }
    ];

    // Default options
    const defaultOptions = [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' }
    ];

    const handleUseCaseToggle = (useCaseId: string) => {
        const newSelection = selectedUseCases.includes(useCaseId)
            ? selectedUseCases.filter((id: string) => id !== useCaseId)
            : [...selectedUseCases, useCaseId];
        setSelectedUseCases(newSelection);
    };

    const handleDefaultToggle = (defaultId: string) => {
        const newSelection = selectedDefaults.includes(defaultId)
            ? selectedDefaults.filter((id: string) => id !== defaultId)
            : [...selectedDefaults, defaultId];
        setSelectedDefaults(newSelection);
    };

    const clearAllFilters = () => {
        setSelectedUseCases([]);
        setSelectedDefaults([]);
    };

    const hasActiveFilters = selectedUseCases.length > 0 || selectedDefaults.length > 0;

    return (
        <div className="flex items-center gap-2">
            {/* Use Case Filter */}
            <Popover open={isUseCaseOpen} onOpenChange={setIsUseCaseOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="h-8 px-3 text-[#053834] font-medium text-[14px]/[20px] bg-transparent border border-gray-300 hover:bg-gray-50"
                    >
                        Use Case: {selectedUseCases.length > 0 ? `${selectedUseCases.length} selected` : 'All'}
                        <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="start">
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-900">Use Case</h4>
                        <div className="space-y-2">
                            {useCaseOptions.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`use-case-${option.id}`}
                                        checked={selectedUseCases.includes(option.id)}
                                        onCheckedChange={() => handleUseCaseToggle(option.id)}
                                    />
                                    <Label
                                        htmlFor={`use-case-${option.id}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Default Filter */}
            <Popover open={isDefaultOpen} onOpenChange={setIsDefaultOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="h-8 px-3 text-[#053834] font-medium text-[14px]/[20px] bg-transparent border border-gray-300 hover:bg-gray-50"
                    >
                        Is Default
                        <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-4" align="start">
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-900">Default</h4>
                        <div className="space-y-2">
                            {defaultOptions.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`default-${option.id}`}
                                        checked={selectedDefaults.includes(option.id)}
                                        onCheckedChange={() => handleDefaultToggle(option.id)}
                                    />
                                    <Label
                                        htmlFor={`default-${option.id}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Clear All Button */}
            {hasActiveFilters && (
                <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-1 text-[#053834] text-[14px]/[20px] font-medium hover:text-gray-600"
                >
                    <X className="h-3 w-3" />
                    Clear All
                </button>
            )}
        </div>
    );
};
