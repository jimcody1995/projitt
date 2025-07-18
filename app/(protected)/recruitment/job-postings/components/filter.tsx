import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const FilterTool = () => {
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const locations = [
        'United States',
        'Canada',
        'United Kingdom',
        'Australia',
        'New Zealand',
    ]
    const departments = [
        'Sales',
        'Design',
        'Administrative',
        'Data',
    ]
    const types = [
        'Full-time',
        'Part-time',
        'Contract',
        'Internship',
    ]
    const statuses = [
        'Open',
        'Closed',
        'Draft',
    ]
    const handleDepartmentChange = (checked: boolean, value: string) => {
        setSelectedDepartments((prev = []) =>
            checked ? [...prev, value] : prev.filter((v) => v !== value),
        );
    };
    const handleLocationChange = (checked: boolean, value: string) => {
        setSelectedLocations((prev = []) =>
            checked ? [...prev, value] : prev.filter((v) => v !== value),
        );
    };
    const handleTypeChange = (checked: boolean, value: string) => {
        setSelectedTypes((prev = []) =>
            checked ? [...prev, value] : prev.filter((v) => v !== value),
        );
    };
    const handleStatusChange = (checked: boolean, value: string) => {
        setSelectedStatuses((prev = []) =>
            checked ? [...prev, value] : prev.filter((v) => v !== value),
        );
    };
    return (
        <div className="flex gap-[11px] mt-[17px]">
            <Popover>
                <PopoverTrigger asChild>
                    <div className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px]">
                        <span className="text-[14px]/[20px] text-[#787878]">{selectedLocations.length > 0 ? "Locations: " + selectedLocations.length + " selected" : 'All Locations'}</span>
                        <ChevronDown className="size-[18px] text-[#4b4b4b]" />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3" align="start">
                    <div className="space-y-3">

                        <div className="space-y-3">
                            {locations.map((location, index) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <Checkbox
                                        id={location}
                                        checked={selectedLocations.includes(location)}
                                        onCheckedChange={(checked) =>
                                            handleLocationChange(checked === true, location)
                                        }
                                    />
                                    <Label
                                        htmlFor={location}
                                        className="grow flex items-center justify-between font-normal gap-1.5"
                                    >
                                        {location}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px]">
                        <span className="text-[14px]/[20px] text-[#787878]">{selectedDepartments.length > 0 ? "Departments: " + selectedDepartments.length + " selected" : 'All Departments'}</span>
                        <ChevronDown className="size-[18px] text-[#4b4b4b]" />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3" align="start">
                    <div className="space-y-3">
                        <div className="space-y-3">
                            {departments.map((department, index) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <Checkbox
                                        id={department}
                                        checked={selectedDepartments.includes(department)}
                                        onCheckedChange={(checked) =>
                                            handleDepartmentChange(checked === true, department)
                                        }
                                    />
                                    <Label
                                        htmlFor={department}
                                        className="grow flex items-center justify-between font-normal gap-1.5"
                                    >
                                        {department}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px]">
                        <span className="text-[14px]/[20px] text-[#787878]">{selectedTypes.length > 0 ? "Types: " + selectedTypes.length + " selected" : 'All Types'}</span>
                        <ChevronDown className="size-[18px] text-[#4b4b4b]" />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3" align="start">
                    <div className="space-y-3">
                        <div className="space-y-3">
                            {types.map((type, index) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <Checkbox
                                        id={type}
                                        checked={selectedTypes.includes(type)}
                                        onCheckedChange={(checked) =>
                                            handleTypeChange(checked === true, type)
                                        }
                                    />
                                    <Label
                                        htmlFor={type}
                                        className="grow flex items-center justify-between font-normal gap-1.5"
                                    >
                                        {type}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px]">
                        <span className="text-[14px]/[20px] text-[#787878]">{selectedStatuses.length > 0 ? "Status: " + selectedStatuses.length + " selected" : 'All Status'}</span>
                        <ChevronDown className="size-[18px] text-[#4b4b4b]" />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3" align="start">
                    <div className="space-y-3">
                        <div className="space-y-3">
                            {statuses.map((status, index) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <Checkbox
                                        id={status}
                                        checked={selectedStatuses.includes(status)}
                                        onCheckedChange={(checked) =>
                                            handleStatusChange(checked === true, status)
                                        }
                                    />
                                    <Label
                                        htmlFor={status}
                                        className="grow flex items-center justify-between font-normal gap-1.5"
                                    >
                                        {status}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};