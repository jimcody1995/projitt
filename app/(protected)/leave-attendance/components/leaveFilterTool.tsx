import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, X, Calendar, User, FileText, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface LeaveFilterProps {
    selectedLeaveTypes?: string[];
    setSelectedLeaveTypes?: (value: string[]) => void;
    selectedStatuses?: string[];
    setSelectedStatuses?: (value: string[]) => void;
    selectedEmployees?: string[];
    setSelectedEmployees?: (value: string[]) => void;
    dateRange?: { start: string; end: string };
    setDateRange?: (value: { start: string; end: string }) => void;
    nameFilter?: string;
    setNameFilter?: (value: string) => void;
}

/**
 * LeaveFilterTool component
 * 
 * This component renders a comprehensive filter UI for leave requests with popover dropdowns 
 * for Leave Type, Status, Employee, and Date Range filters.
 */
export const LeaveFilterTool = ({
    selectedLeaveTypes = [],
    setSelectedLeaveTypes,
    selectedStatuses = [],
    setSelectedStatuses,
    selectedEmployees = [],
    setSelectedEmployees,
    nameFilter = '',
    setNameFilter,
    dateRange = { start: '', end: '' },
    setDateRange
}: LeaveFilterProps): JSX.Element => {
    const [isLeaveTypeOpen, setIsLeaveTypeOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
    const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
    const [searchEmployeeQuery, setSearchEmployeeQuery] = useState('');

    // Mock data for filter options
    const leaveTypes = [
        { id: 'vacation', name: 'Vacation' },
        { id: 'sick', name: 'Sick' },
        { id: 'birthday', name: 'Birthday' },
        { id: 'personal', name: 'Personal' },
        { id: 'emergency', name: 'Emergency' }
    ];

    const statuses = [
        { id: 'pending', name: 'Pending' },
        { id: 'approved', name: 'Approved' },
        { id: 'rejected', name: 'Rejected' }
    ];

    const employees = [
        { id: 'alice-fernadez', name: 'Alice Fernadez' },
        { id: 'john-doe', name: 'John Doe' },
        { id: 'jane-smith', name: 'Jane Smith' },
        { id: 'bob-johnson', name: 'Bob Johnson' }
    ];

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchEmployeeQuery.toLowerCase())
    );

    const handleLeaveTypeChange = (checked: boolean, value: string): void => {
        if (setSelectedLeaveTypes) {
            setSelectedLeaveTypes(checked
                ? [...selectedLeaveTypes, value]
                : selectedLeaveTypes.filter((v) => v !== value)
            );
        }
    };

    const handleStatusChange = (checked: boolean, value: string): void => {
        if (setSelectedStatuses) {
            setSelectedStatuses(checked
                ? [...selectedStatuses, value]
                : selectedStatuses.filter((v) => v !== value)
            );
        }
    };

    const handleEmployeeChange = (checked: boolean, value: string): void => {
        if (setSelectedEmployees) {
            setSelectedEmployees(checked
                ? [...selectedEmployees, value]
                : selectedEmployees.filter((v) => v !== value)
            );
        }
    };

    const clearAllFilters = (): void => {
        setSelectedLeaveTypes?.([]);
        setSelectedStatuses?.([]);
        setSelectedEmployees?.([]);
        setNameFilter?.('');
        setDateRange?.({ start: '', end: '' });
    };

    const hasActiveFilters = selectedLeaveTypes.length > 0 ||
        selectedStatuses.length > 0 ||
        selectedEmployees.length > 0 ||
        nameFilter.length > 0 ||
        dateRange.start !== '' ||
        dateRange.end !== '';

    return (
        <div className="flex flex-wrap gap-[12px] mt-[16px] items-center">
            {/* Name Filter Input */}
            <div className="flex items-center gap-2">
                <User className="size-[18px] text-[#4b4b4b]" />
                <Input
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter?.(e.target.value)}
                    className="w-48 h-[36px] text-[14px] rounded-[8px]"
                />
            </div>

            {/* Leave Type Filter */}
            <Popover open={isLeaveTypeOpen} onOpenChange={setIsLeaveTypeOpen}>
                <PopoverTrigger asChild>
                    <div className="cursor-pointer flex gap-[8px] py-[8px] px-[14px] border border-[#E9E9E9] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b] min-w-[120px]">
                        <FileText className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px] text-[#787878]">
                            {selectedLeaveTypes.length > 0
                                ? `Type: ${selectedLeaveTypes.length} selected`
                                : "Leave Type"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isLeaveTypeOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-3" align="start">
                    <div className="space-y-3">
                        {leaveTypes.map((type) => (
                            <div key={type.id} className="flex items-center gap-2.5">
                                <Checkbox
                                    checked={selectedLeaveTypes.includes(type.id)}
                                    onCheckedChange={(checked) =>
                                        handleLeaveTypeChange(checked === true, type.id)
                                    }
                                />
                                <Label className="grow flex items-center justify-between font-normal gap-1.5">
                                    {type.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Status Filter */}
            <Popover open={isStatusOpen} onOpenChange={setIsStatusOpen}>
                <PopoverTrigger asChild>
                    <div className="cursor-pointer flex gap-[8px] py-[8px] px-[14px] border border-[#E9E9E9] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b] min-w-[110px]">
                        <Clock className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px] text-[#787878]">
                            {selectedStatuses.length > 0
                                ? `Status: ${selectedStatuses.length} selected`
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
                        {statuses.map((status) => (
                            <div key={status.id} className="flex items-center gap-2.5">
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

            {/* Employee Filter */}
            <Popover open={isEmployeeOpen} onOpenChange={setIsEmployeeOpen}>
                <PopoverTrigger asChild>
                    <div className="cursor-pointer flex gap-[8px] py-[8px] px-[14px] border border-[#E9E9E9] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b] min-w-[120px]">
                        <User className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px] text-[#787878]">
                            {selectedEmployees.length > 0
                                ? `Employee: ${selectedEmployees.length} selected`
                                : "Employee"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isEmployeeOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3" align="start">
                    <div className="space-y-3">
                        <Input
                            placeholder="Search employee"
                            value={searchEmployeeQuery}
                            onChange={(e) => setSearchEmployeeQuery(e.target.value)}
                            className="h-[32px] text-[14px]"
                        />
                        {filteredEmployees.map((employee) => (
                            <div key={employee.id} className="flex items-center gap-2.5">
                                <Checkbox
                                    checked={selectedEmployees.includes(employee.id)}
                                    onCheckedChange={(checked) =>
                                        handleEmployeeChange(checked === true, employee.id)
                                    }
                                />
                                <Label className="grow flex items-center justify-between font-normal gap-1.5">
                                    {employee.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Date Range Filter */}
            <Popover open={isDateRangeOpen} onOpenChange={setIsDateRangeOpen}>
                <PopoverTrigger asChild>
                    <div className="cursor-pointer flex gap-[8px] py-[8px] px-[14px] border border-[#E9E9E9] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b] min-w-[130px]">
                        <Calendar className="size-[18px] text-[#4b4b4b]" />
                        <span className="text-[14px] text-[#787878]">
                            {dateRange.start && dateRange.end
                                ? "Date Range"
                                : "Date Range"}
                        </span>
                        <ChevronDown
                            className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isDateRangeOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3" align="start">
                    <div className="space-y-3">
                        <div>
                            <Label className="text-[12px] text-[#8f8f8f] mb-1 block">Start Date</Label>
                            <Input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => setDateRange?.({ ...dateRange, start: e.target.value })}
                                className="h-[32px] text-[14px]"
                            />
                        </div>
                        <div>
                            <Label className="text-[12px] text-[#8f8f8f] mb-1 block">End Date</Label>
                            <Input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => setDateRange?.({ ...dateRange, end: e.target.value })}
                                className="h-[32px] text-[14px]"
                            />
                        </div>
                        <Button
                            onClick={() => setDateRange?.({ start: '', end: '' })}
                            variant="outline"
                            className="w-full h-[32px] text-[12px]"
                        >
                            Clear Dates
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Clear All Button */}
            {hasActiveFilters && (
                <button
                    className="flex gap-[6px] cursor-pointer transition-all duration-200 hover:opacity-70"
                    onClick={clearAllFilters}
                >
                    <X className="size-[20px] text-[#8f8f8f]" />
                    <span className="text-[14px] text-[#353535]">Clear All</span>
                </button>
            )}
        </div>
    );
};
