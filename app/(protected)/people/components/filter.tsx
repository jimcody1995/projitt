import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, X, Briefcase, MapPin, User, Building } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";
import { Input } from "@/components/ui/input";

/**
 * FilterTool component
 *
 * This component renders a filter UI with popover dropdowns for Types, Mode,
 * Status, Country, and Name filters. Each filter shows the number of
 * selected options or "All" if none selected. User selections are managed
 * with internal state arrays for each category.
 *
 * Returns:
 *  JSX.Element - The rendered filter tool component.
 */
export const FilterTool = ({
    selectedTypes,
    setSelectedTypes,
    selectedMode,
    setSelectedMode,
    selectedStatuses,
    setSelectedStatuses,
    selectedCountries,
    setSelectedCountries,
    nameFilter,
    setNameFilter
}: {
    selectedTypes?: string[],
    setSelectedTypes?: (value: string[]) => void,
    selectedMode?: string[],
    setSelectedMode?: (value: string[]) => void,
    selectedStatuses?: string[],
    setSelectedStatuses?: (value: string[]) => void,
    selectedCountries?: number[],
    setSelectedCountries?: (value: number[]) => void,
    nameFilter?: string,
    setNameFilter?: (value: string) => void
}): JSX.Element => {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isModeOpen, setIsModeOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [searchTypeQuery, setSearchTypeQuery] = useState('');
    const [searchModeQuery, setSearchModeQuery] = useState('');
    const [searchStatusQuery, setSearchStatusQuery] = useState('');
    const [searchCountryQuery, setSearchCountryQuery] = useState('');

    const handleTypeChange = (checked: boolean, value: string): void => {
        if (setSelectedTypes && selectedTypes) {
            setSelectedTypes(checked ? [...selectedTypes, value] : selectedTypes.filter((v) => v !== value));
        }
    };

    const handleModeChange = (checked: boolean, value: string): void => {
        if (setSelectedMode && selectedMode) {
            setSelectedMode(checked ? [...selectedMode, value] : selectedMode.filter((v) => v !== value));
        }
    };

    const handleStatusChange = (checked: boolean, value: string): void => {
        if (setSelectedStatuses && selectedStatuses) {
            setSelectedStatuses(checked ? [...selectedStatuses, value] : selectedStatuses.filter((v) => v !== value));
        }
    };

    const handleCountryChange = (checked: boolean, value: number): void => {
        if (setSelectedCountries && selectedCountries) {
            setSelectedCountries(checked ? [...selectedCountries, value] : selectedCountries.filter((v) => v !== value));
        }
    };

    const clearAllFilters = (): void => {
        setSelectedTypes?.([]);
        setSelectedMode?.([]);
        setSelectedStatuses?.([]);
        setSelectedCountries?.([]);
        setNameFilter?.('');
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

    const filteredModes = [{
        id: 'remote',
        name: 'Remote'
    }, {
        id: 'hybrid',
        name: 'Hybrid'
    }, {
        id: 'onsite',
        name: 'Onsite'
    }];

    const filteredStatuses = [{
        id: 'active',
        name: 'Active'
    }, {
        id: 'inactive',
        name: 'Inactive'
    }, {
        id: 'pending',
        name: 'Pending'
    }];

    const filteredCountries = [{
        id: 1,
        name: 'United States'
    }, {
        id: 2,
        name: 'Canada'
    }, {
        id: 3,
        name: 'United Kingdom'
    }];

    return (
        <div className="flex flex-wrap gap-[11px] mt-[5px] items-center">
            {/* Name Filter Input */}
            {nameFilter !== undefined && setNameFilter && (
                <div className="flex items-center gap-2">
                    <User className="size-[18px] text-[#4b4b4b]" />
                    <Input
                        placeholder="Filter by name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="w-48"
                    />
                </div>
            )}

            {/* Type Filter */}
            {selectedTypes !== undefined && setSelectedTypes && (
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
            )}

            {/* Mode Filter */}
            {selectedMode !== undefined && setSelectedMode && (
                <Popover open={isModeOpen} onOpenChange={setIsModeOpen}>
                    <PopoverTrigger asChild>
                        <div
                            className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        >
                            <Building className="size-[18px] text-[#4b4b4b]" />
                            <span className="text-[14px]/[20px] text-[#787878]">
                                {selectedMode.length > 0
                                    ? "Mode: " + selectedMode.length + " selected"
                                    : "Mode"}
                            </span>
                            <ChevronDown
                                className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isModeOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3" align="start">
                        <div className="space-y-3">
                            <Input
                                placeholder="Search mode"
                                value={searchModeQuery}
                                onChange={(e) => setSearchModeQuery(e.target.value)}
                            />
                            {filteredModes.map((mode: { id: string; name: string; }, index: number) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <Checkbox
                                        checked={selectedMode.includes(mode.id)}
                                        onCheckedChange={(checked) =>
                                            handleModeChange(checked === true, mode.id)
                                        }
                                    />
                                    <Label className="grow flex items-center justify-between font-normal gap-1.5">
                                        {mode.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}

            {/* Status Filter */}
            {selectedStatuses !== undefined && setSelectedStatuses && (
                <Popover open={isStatusOpen} onOpenChange={setIsStatusOpen}>
                    <PopoverTrigger asChild>
                        <div
                            className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        >
                            <User className="size-[18px] text-[#4b4b4b]" />
                            <span className="text-[14px]/[20px] text-[#787878]">
                                {selectedStatuses.length > 0
                                    ? "Status: " + selectedStatuses.length + " selected"
                                    : "Status"}
                            </span>
                            <ChevronDown
                                className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3" align="start">
                        <div className="space-y-3">
                            <Input
                                placeholder="Search status"
                                value={searchStatusQuery}
                                onChange={(e) => setSearchStatusQuery(e.target.value)}
                            />
                            {filteredStatuses.map((status: { id: string; name: string; }, index: number) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <Checkbox
                                        checked={selectedStatuses.includes(status.id)}
                                        onCheckedChange={(checked) =>
                                            handleStatusChange(checked === true, status.id)
                                        }
                                    />
                                    <Label className="grow flex items-center justify-between font-normal gap-1.5">
                                        {status.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}

            {/* Country Filter */}
            {selectedCountries !== undefined && setSelectedCountries && (
                <Popover open={isCountryOpen} onOpenChange={setIsCountryOpen}>
                    <PopoverTrigger asChild>
                        <div
                            className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        >
                            <MapPin className="size-[18px] text-[#4b4b4b]" />
                            <span className="text-[14px]/[20px] text-[#787878]">
                                {selectedCountries.length > 0
                                    ? "Country: " + selectedCountries.length + " selected"
                                    : "Country"}
                            </span>
                            <ChevronDown
                                className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isCountryOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3" align="start">
                        <div className="space-y-3">
                            <Input
                                placeholder="Search country"
                                value={searchCountryQuery}
                                onChange={(e) => setSearchCountryQuery(e.target.value)}
                            />
                            {filteredCountries.map((country: { id: number; name: string; }, index: number) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <Checkbox
                                        checked={selectedCountries.includes(country.id)}
                                        onCheckedChange={(checked) =>
                                            handleCountryChange(checked === true, country.id)
                                        }
                                    />
                                    <Label className="grow flex items-center justify-between font-normal gap-1.5">
                                        {country.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}

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
