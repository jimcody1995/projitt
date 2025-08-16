import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, X, User, Globe, Video, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useBasic } from "@/context/BasicContext";

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
    selectedMode,
    selectedStatuses,
    selectedCountries,
    nameFilter,
    setSelectedMode,
    setSelectedStatuses,
    setSelectedCountries,
    setNameFilter
}: {
    selectedMode: string[],
    selectedStatuses: string[],
    selectedCountries: number[],
    nameFilter: string,
    setSelectedMode: (value: string[]) => void,
    setSelectedStatuses: (value: string[]) => void,
    setSelectedCountries: (value: number[]) => void,
    setNameFilter: (value: string) => void
}): JSX.Element => {
    const [isNameOpen, setIsNameOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isModeOpen, setIsModeOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [searchCountryQuery, setSearchCountryQuery] = useState('');

    const { country } = useBasic();

    const modeData = [
        { id: "google_meet", value: "Google Meet", icon: <Video className="size-[18px] text-[#4b4b4b]" /> },
        { id: "zoom", value: "Zoom", icon: <Video className="size-[18px] text-[#4b4b4b]" /> },
        { id: "projitt_video_conference", value: "Projitt Video Conference", icon: <Video className="size-[18px] text-[#4b4b4b]" /> },
        { id: "microsoft_team", value: "Microsoft Team", icon: <Video className="size-[18px] text-[#4b4b4b]" /> },
    ];

    const statuses = ["Review", "Screen", "Test", "Completed", "Cancelled"];

    // Filter countries based on search query
    const filteredCountries = useMemo(() => {
        return country.filter((location: any) =>
            location.name.toLowerCase().includes(searchCountryQuery.toLowerCase())
        );
    }, [country, searchCountryQuery]);


    const handleModeChange = (checked: boolean, value: string): void => {
        setSelectedMode(checked ? [...selectedMode, value] : selectedMode.filter((v) => v !== value))
    };

    const handleStatusChange = (checked: boolean, value: string): void => {
        setSelectedStatuses(checked ? [...selectedStatuses, value] : selectedStatuses.filter((v) => v !== value))
    };

    const handleCountryChange = (checked: boolean, value: number): void => {
        setSelectedCountries(checked ? [...selectedCountries, value] : selectedCountries.filter((v) => v !== value))
    };

    const clearAllFilters = (): void => {
        setSelectedMode([]);
        setSelectedStatuses([]);
        setSelectedCountries([]);
        setNameFilter('');
    };

    return (
        <div className="flex flex-wrap gap-[11px] mt-[5px] items-center">
            {/* Name Filter */}
            <Popover open={isNameOpen} onOpenChange={setIsNameOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-name-trigger"
                        data-testid="filter-name-trigger"
                    >
                        <User className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {nameFilter ? "Name: " + nameFilter : "Name"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isNameOpen ? 'rotate-180' : ''
                                }`}
                            id="filter-name-chevron"
                            data-testid="filter-name-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-64 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-name-content"
                    data-testid="filter-name-content"
                >
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Label className="text-[12px] font-medium text-[#4b4b4b]">
                                Search by applicant name
                            </Label>
                            <Input
                                placeholder="Enter applicant name..."
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                className="h-8 text-[12px]"
                                data-testid="name-filter-input"
                            />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {/* Status Filter */}
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
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''
                                }`}
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
                        {statuses.map((status: string, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-status-item-${index}`}
                                data-testid={`filter-status-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-status-checkbox-${index}`}
                                    checked={selectedStatuses.find((s) => s === status) !== undefined}
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
            {/* Mode Filter */}
            <Popover open={isModeOpen} onOpenChange={setIsModeOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-mode-trigger"
                        data-testid="filter-mode-trigger"
                    >
                        <Video className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedMode.length > 0
                                ? "Mode: " + selectedMode.length + " selected"
                                : "Mode"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isModeOpen ? 'rotate-180' : ''
                                }`}
                            id="filter-mode-chevron"
                            data-testid="filter-mode-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-40 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-mode-content"
                    data-testid="filter-mode-content"
                >
                    <div className="space-y-3">
                        {modeData.map((mode: { id: string; value: string; icon: JSX.Element }, index: number) => (
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

            {/* Country Filter */}
            <Popover open={isCountryOpen} onOpenChange={setIsCountryOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-country-trigger"
                        data-testid="filter-country-trigger"
                    >
                        <Globe className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedCountries.length > 0
                                ? "Country: " + selectedCountries.length + " selected"
                                : "Country"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isCountryOpen ? 'rotate-180' : ''
                                }`}
                            id="filter-country-chevron"
                            data-testid="filter-country-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-48 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-country-content"
                    data-testid="filter-country-content"
                >
                    <div className="space-y-3">
                        <Input
                            placeholder="Search location"
                            value={searchCountryQuery}
                            onChange={(e) => setSearchCountryQuery(e.target.value)}
                        />
                        {filteredCountries.map((location: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-country-item-${index}`}
                                data-testid={`filter-country-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-country-checkbox-${index}`}
                                    checked={selectedCountries.includes(location.id)}
                                    onCheckedChange={(checked) =>
                                        handleCountryChange(checked === true, location.id)
                                    }
                                    data-testid={`filter-country-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-country-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {location.name}
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
