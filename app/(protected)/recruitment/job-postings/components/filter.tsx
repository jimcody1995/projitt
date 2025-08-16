import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, X, MapPin, Building2, Briefcase, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useEffect, useState } from "react";
import { useBasic } from "@/context/BasicContext";
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
export const FilterTool = ({ selectedLocations, selectedDepartments, selectedTypes, selectedStatuses, setSelectedLocations, setSelectedDepartments, setSelectedTypes, setSelectedStatuses }: { selectedLocations: number[], selectedDepartments: number[], selectedTypes: number[], selectedStatuses: string[], setSelectedLocations: (value: number[]) => void, setSelectedDepartments: (value: number[]) => void, setSelectedTypes: (value: number[]) => void, setSelectedStatuses: (value: string[]) => void }): JSX.Element => {
    const { department, employmentType, country } = useBasic();
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [searchLocationQuery, setSearchLocationQuery] = useState('');
    const [filteredLocations, setFilteredLocations] = useState(country as any);
    const [searchDepartmentQuery, setSearchDepartmentQuery] = useState('');
    const [filteredDepartments, setFilteredDepartments] = useState(department as any);
    const [searchTypeQuery, setSearchTypeQuery] = useState('');
    const [filteredTypes, setFilteredTypes] = useState(employmentType as any);
    const statuses = ["Open", "Closed", "Draft"];
    useEffect(() => {
        const filteredLocations = country.filter((location: any) => location.name.toLowerCase().includes(searchLocationQuery.toLowerCase()));
        setFilteredLocations(filteredLocations);
    }, [searchLocationQuery]);
    useEffect(() => {
        const filteredDepartments = department.filter((department: any) => department.name.toLowerCase().includes(searchDepartmentQuery.toLowerCase()));
        setFilteredDepartments(filteredDepartments);
    }, [searchDepartmentQuery]);
    useEffect(() => {
        const filteredTypes = employmentType.filter((type: any) => type.name.toLowerCase().includes(searchTypeQuery.toLowerCase()));
        setFilteredTypes(filteredTypes);
    }, [searchTypeQuery]);
    /**
     * Handle department checkbox change
     * @param checked - boolean whether the checkbox is checked
     * @param value - department name
     */
    const handleDepartmentChange = (checked: boolean, value: number): void => {
        setSelectedDepartments(checked ? [...selectedDepartments, value] : selectedDepartments.filter((v) => v !== value))
    };

    /**
     * Handle location checkbox change
     * @param checked - boolean whether the checkbox is checked
     * @param value - location name
     */
    const handleLocationChange = (checked: boolean, value: number): void => {
        setSelectedLocations(checked ? [...selectedLocations, value] : selectedLocations.filter((v) => v !== value))
    };

    /**
     * Handle type checkbox change
     * @param checked - boolean whether the checkbox is checked
     * @param value - type name
     */
    const handleTypeChange = (checked: boolean, value: number): void => {
        setSelectedTypes(checked ? [...selectedTypes, value] : selectedTypes.filter((v) => v !== value))
    };

    /**
     * Handle status checkbox change
     * @param checked - boolean whether the checkbox is checked
     * @param value - status name
     */
    const handleStatusChange = (checked: boolean, value: string): void => {
        setSelectedStatuses(checked ? [...selectedStatuses, value] : selectedStatuses.filter((v) => v !== value))
    };

    const clearAllFilters = (): void => {
        setSelectedLocations([]);
        setSelectedDepartments([]);
        setSelectedTypes([]);
        setSelectedStatuses([]);
    };

    return (
        <div className="flex flex-wrap gap-[11px] mt-[5px] items-center">
            {/* Locations filter */}
            <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-locations-trigger"
                        data-testid="filter-locations-trigger"
                    >
                        <MapPin className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedLocations.length > 0
                                ? "Locations: " + selectedLocations.length + " selected"
                                : "Locations"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`}
                            id="filter-locations-chevron"
                            data-testid="filter-locations-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-48 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-locations-content"
                    data-testid="filter-locations-content"
                >
                    <div className="space-y-3">
                        <Input
                            placeholder="Search location"
                            value={searchLocationQuery}
                            onChange={(e) => setSearchLocationQuery(e.target.value)}
                        />
                        {filteredLocations.map((location: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-location-item-${index}`}
                                data-testid={`filter-location-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-location-checkbox-${index}`}
                                    checked={selectedLocations.includes(location.id)}
                                    onCheckedChange={(checked) =>
                                        handleLocationChange(checked === true, location.id)
                                    }
                                    data-testid={`filter-location-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-location-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {location.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Departments filter */}
            <Popover open={isDepartmentOpen} onOpenChange={setIsDepartmentOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        id="filter-departments-trigger"
                        data-testid="filter-departments-trigger"
                    >
                        <Building2 className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedDepartments.length > 0
                                ? "Departments: " + selectedDepartments.length + " selected"
                                : "Departments"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isDepartmentOpen ? 'rotate-180' : ''}`}
                            id="filter-departments-chevron"
                            data-testid="filter-departments-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-48 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-departments-content"
                    data-testid="filter-departments-content"
                >
                    <div className="space-y-3">
                        <Input
                            placeholder="Search department"
                            value={searchDepartmentQuery}
                            onChange={(e) => setSearchDepartmentQuery(e.target.value)}
                        />
                        {filteredDepartments.map((department: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                                id={`filter-department-item-${index}`}
                                data-testid={`filter-department-item-${index}`}
                            >
                                <Checkbox
                                    id={`filter-department-checkbox-${index}`}
                                    checked={selectedDepartments.includes(department.id)}
                                    onCheckedChange={(checked) =>
                                        handleDepartmentChange(checked === true, department.id)
                                    }
                                    data-testid={`filter-department-checkbox-${index}`}
                                />
                                <Label
                                    htmlFor={`filter-department-checkbox-${index}`}
                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                >
                                    {department.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Types filter */}
            <Popover open={isTypeOpen} onOpenChange={setIsTypeOpen}>
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
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isTypeOpen ? 'rotate-180' : ''}`}
                            id="filter-types-chevron"
                            data-testid="filter-types-chevron"
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-48 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                    id="filter-types-content"
                    data-testid="filter-types-content"
                >
                    <div className="space-y-3">
                        <Input
                            placeholder="Search type"
                            value={searchTypeQuery}
                            onChange={(e) => setSearchTypeQuery(e.target.value)}
                        />
                        {filteredTypes.map((type: any, index: number) => (
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
