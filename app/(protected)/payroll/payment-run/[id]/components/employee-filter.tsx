"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Briefcase, ChevronDown, Users, X } from "lucide-react";

export const EmployeeFilterTool = ({
    selectedWorkTypes,
    setSelectedWorkTypes,
    selectedEmployees,
    setSelectedEmployees,
    employees
}: {
    selectedWorkTypes: string[],
    setSelectedWorkTypes: (value: string[]) => void,
    selectedEmployees: string[],
    setSelectedEmployees: (value: string[]) => void,
    employees: { id: string, name: string, employeeId: string }[]
}) => {
    const [isWorkTypeOpen, setIsWorkTypeOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);

    const workTypes = ["Hourly", "Salary"];

    const handleWorkTypeChange = (checked: boolean, value: string): void => {
        setSelectedWorkTypes(checked ? [...selectedWorkTypes, value] : selectedWorkTypes.filter((v) => v !== value))
    };

    const handleEmployeeChange = (checked: boolean, value: string): void => {
        setSelectedEmployees(checked ? [...selectedEmployees, value] : selectedEmployees.filter((v) => v !== value))
    };

    const clearAllFilters = (): void => {
        setSelectedWorkTypes([]);
        setSelectedEmployees([]);
    };

    return (
        <div className="flex flex-wrap gap-[11px] mb-3 items-center">
            {/* Work Type filter */}
            <Popover open={isWorkTypeOpen} onOpenChange={setIsWorkTypeOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                    >
                        <Briefcase className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedWorkTypes.length > 0
                                ? "Work Type: " + selectedWorkTypes.length + " selected"
                                : "Work Type"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isWorkTypeOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-56 p-3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                >
                    <div className="space-y-3">
                        {workTypes.map((workType, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                            >
                                <Checkbox
                                    id={`filter-worktype-checkbox-${index}`}
                                    checked={selectedWorkTypes.includes(workType)}
                                    onCheckedChange={(checked) =>
                                        handleWorkTypeChange(checked === true, workType)
                                    }
                                />
                                <Label
                                    htmlFor={`filter-worktype-checkbox-${index}`}
                                    className="grow cursor-pointer text-[13px] text-[#353535] font-normal"
                                >
                                    {workType}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Employee filter */}
            <Popover open={isEmployeeOpen} onOpenChange={setIsEmployeeOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                    >
                        <Users className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px]/[20px] text-[#787878]">
                            {selectedEmployees.length > 0
                                ? "Employee: " + selectedEmployees.length + " selected"
                                : "Employee"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isEmployeeOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-56 p-3 max-h-[300px] overflow-y-auto animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="start"
                >
                    <div className="space-y-3">
                        {employees.map((employee, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5"
                            >
                                <Checkbox
                                    id={`filter-employee-checkbox-${index}`}
                                    checked={selectedEmployees.includes(employee.id)}
                                    onCheckedChange={(checked) =>
                                        handleEmployeeChange(checked === true, employee.id)
                                    }
                                />
                                <Label
                                    htmlFor={`filter-employee-checkbox-${index}`}
                                    className="grow flex flex-col font-normal gap-0.5"
                                >
                                    <span className="text-[13px] text-[#353535]">{employee.name}</span>
                                    <span className="text-[11px] text-[#787878]">{employee.employeeId}</span>
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Clear All Button */}
            {(selectedWorkTypes.length > 0 || selectedEmployees.length > 0) && (
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

