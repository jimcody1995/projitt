'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, ChevronLeft, ChevronRight, MoreHorizontal, ListFilter } from "lucide-react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { Check } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { Eye } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";

interface FilterOptions {
    status: string[];
    department: string[];
    dateRange: string;
}

export default function AttendanceTracking() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        status: [],
        department: [],
        dateRange: 'today'
    });

    const handleDateChange = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedDate);
        if (direction === 'prev') {
            newDate.setDate(newDate.getDate() - 1);
        } else {
            newDate.setDate(newDate.getDate() + 1);
        }
        setSelectedDate(newDate);
    };

    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        setFilterOptions(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilterOptions({
            status: [],
            department: [],
            dateRange: 'today'
        });
    };

    const formatDisplayDate = (date: Date) => {
        return format(date, 'EEEE, d MMMM');
    };

    interface Employee {
        id: string;
        name: string;
        avatar?: string;
        initials?: string;
        clockIn: string;
        clockOut: string;
        hoursWorked: string;
        status: 'present' | 'absent' | 'overtime' | 'late' | 'leave';
        isApproved?: boolean;
        department?: string;
        date?: Date;
    }

    interface ClockLogsComponentProps {
        searchQuery: string;
        selectedDate: Date;
        filterOptions: {
            status: string[];
            department: string[];
            dateRange: string;
        };
    }

    const mockEmployees: Employee[] = [
        {
            id: '1',
            name: 'Alice Fernadez',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            clockIn: '8:00am',
            clockOut: '5:00pm',
            hoursWorked: '9hrs',
            status: 'present',
            isApproved: true,
            department: 'engineering'
        },
        {
            id: '2',
            name: 'Floyd Miles',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            clockIn: 'Leave',
            clockOut: 'Leave',
            hoursWorked: 'Leave',
            status: 'leave',
            department: 'hr'
        },
        {
            id: '3',
            name: 'Kathryn Murphy',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            clockIn: '-',
            clockOut: '-',
            hoursWorked: '-',
            status: 'absent',
            isApproved: true,
            department: 'marketing'
        },
        {
            id: '4',
            name: 'Jerome Bell',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            clockIn: '8:00am',
            clockOut: '5:00pm',
            hoursWorked: '9hrs',
            status: 'present',
            isApproved: true,
            department: 'sales'
        },
        {
            id: '5',
            name: 'Brooklyn Simmons',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            clockIn: '8:00am',
            clockOut: '-',
            hoursWorked: '23hrs 59m',
            status: 'overtime',
            isApproved: true,
            department: 'engineering'
        },
        {
            id: '6',
            name: 'Cody Fisher',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            clockIn: '8:00am',
            clockOut: '5:00pm',
            hoursWorked: '9hrs',
            status: 'present',
            isApproved: true,
            department: 'finance'
        },
        {
            id: '7',
            name: 'Esther Howard',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
            clockIn: '8:00am',
            clockOut: '5:00pm',
            hoursWorked: '9hrs',
            status: 'late',
            isApproved: true,
            department: 'hr'
        },
        {
            id: '8',
            name: 'Jacob Jones',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
            clockIn: '8:00am',
            clockOut: '5:00pm',
            hoursWorked: '9hrs',
            status: 'present',
            isApproved: true,
            department: 'marketing'
        },
        {
            id: '9',
            name: 'Leslie Alexander',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
            clockIn: '8:00am',
            clockOut: '5:00pm',
            hoursWorked: '9hrs',
            status: 'present',
            isApproved: true,
            department: 'engineering'
        },
        {
            id: '10',
            name: 'Kristin Watson',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
            clockIn: '8:00am',
            clockOut: '5:00pm',
            hoursWorked: '9hrs',
            status: 'present',
            isApproved: true,
            department: 'sales'
        }
    ];

    const getStatusText = (status: Employee['status']) => {
        switch (status) {
            case 'present':
                return <span className="text-[#0d978b] text-[14px]/[22px] font-medium">Present</span>;
            case 'absent':
                return <span className="text-[#DC2626] text-[14px]/[22px] font-medium">Absent</span>;
            case 'overtime':
                return <span className="text-[#3B82F6] text-[14px]/[22px] font-medium">Overtime</span>;
            case 'late':
                return <span className="text-[#F59E0B] text-[14px]/[22px] font-medium">Late</span>;
            case 'leave':
                return <span className="text-[#374151] text-[14px]/[22px] font-medium">Leave</span>;
            default:
                return null;
        }
    };

    const getHoursWorkedColor = (status: Employee['status'], hoursWorked: string) => {
        if (status === 'overtime') {
            return 'text-[#F59E0B]';
        }
        return 'text-[#353535]';
    };

    interface ClockLogsComponentProps {
        searchQuery: string;
        selectedDate: Date;
        filterOptions: {
            status: string[];
            department: string[];
            dateRange: string;
        };
    }
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    const filteredEmployees = mockEmployees.filter(employee => {
        // Search filter
        const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Status filter
        const matchesStatus = filterOptions.status.length === 0 ||
            filterOptions.status.includes(employee.status);

        // Department filter
        const matchesDepartment = filterOptions.department.length === 0 ||
            (employee.department && filterOptions.department.includes(employee.department));

        return matchesSearch && matchesStatus && matchesDepartment;
    });

    const handleSelectEmployee = (employeeId: string) => {
        setSelectedEmployees(prev =>
            prev.includes(employeeId)
                ? prev.filter(id => id !== employeeId)
                : [...prev, employeeId]
        );
    };

    const handleSelectAll = () => {
        if (selectedEmployees.length === filteredEmployees.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(filteredEmployees.map(emp => emp.id));
        }
    };

    const handleApprove = (employeeId: string) => {
        console.log('Approve employee:', employeeId);
        // Add approval logic here
    };

    const handleReject = (employeeId: string) => {
        console.log('Reject employee:', employeeId);
        // Add rejection logic here
    };

    const handleViewProfile = (employeeId: string) => {
        console.log('View profile for employee:', employeeId);
        // Add view profile logic here
    };

    const handleEditEmployee = (employeeId: string) => {
        console.log('Edit employee:', employeeId);
        // Add edit employee logic here
    };

    const handleDeleteEmployee = (employeeId: string) => {
        console.log('Delete employee:', employeeId);
        // Add delete employee logic here
    };

    const handleViewDetails = (employeeId: string) => {
        console.log('View details for employee:', employeeId);
        // Add view details logic here
    };



    return (
        <div className="w-full h-full bg-[#F8F9FA] min-h-screen">
            {/* Header */}
            <div className="px-[16px] sm:px-[24px] py-[16px] sm:py-[24px]">
                <div className="flex items-center justify-between">
                    <div>
                        {/* Title */}
                        <h1 className="text-[20px] sm:text-[24px] leading-[26px] sm:leading-[30px] font-semibold text-[#353535] mb-[10px]">
                            Attendance Tracking
                        </h1>

                        {/* Statistics */}
                        <div className="flex flex-wrap gap-[8px] sm:gap-[16px] mb-[16px] sm:mb-[22px] items-center">
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[21px] text-primary">78/120 <span className="text-gray-500">Present</span></span>
                            </div>
                            <div className="w-[2px] h-[2px] bg-gray-400 hidden sm:block"></div>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-primary">2<span className="text-gray-500">Absent</span></span>
                            </div>
                            <div className="w-[2px] h-[2px] bg-gray-400 hidden sm:block"></div>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-primary">5 <span className="text-gray-500">Overtime</span></span>
                            </div>
                            <div className="w-[2px] h-[2px] bg-gray-400 hidden sm:block"></div>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-primary">12 <span className="text-gray-500">Late Arrivals</span></span>
                            </div>
                            <div className="w-[2px] h-[2px] bg-gray-400 hidden sm:block"></div>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-primary">6 <span className="text-gray-500">On Leave</span></span>
                            </div>
                        </div>
                    </div>
                    <Button
                        className="h-[36px] sm:mb-[22px] px-[24px] flex items-center rounded-[8px] justify-center gap-[8px] text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] w-full sm:w-auto"
                    >
                        Accept Timesheet
                    </Button>

                </div>


                {/* Tabs */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[16px] lg:gap-0 mb-[16px] sm:mb-[24px]">
                    <div className="relative w-full sm:w-auto">
                        <Search className="size-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-[36px] w-full sm:w-[200px] border-[#E9E9E9] text-[12px] sm:text-[14px] rounded-[8px] bg-gray-50"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[8px] sm:gap-[12px]">
                        {/* Filter Toggle Button */}
                        <Button
                            variant="outline"
                            className="h-[32px] px-[12px] flex items-center justify-center gap-[8px] border border-[#626262] text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] w-full sm:w-auto bg-gray-50"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <ListFilter className="size-4" />
                            <span className="hidden sm:inline">Filter</span>
                            {(filterOptions.status.length > 0 || filterOptions.department.length > 0) && (
                                <span className="ml-1 bg-primary text-white text-[10px] sm:text-[12px] leading-[12px] sm:leading-[16px] px-1 sm:px-1.5 py-0.5 rounded-full">
                                    {filterOptions.status.length + filterOptions.department.length}
                                </span>
                            )}
                        </Button>

                        {/* Date Navigation */}
                        <div className="flex items-center gap-[4px] sm:gap-[8px]">
                            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                                <PopoverTrigger asChild>
                                    <div className="cursor-pointer w-8 h-8 bg-[#0d978b] hover:bg-[#0b7a6f] rounded-md flex items-center justify-center transition-colors">
                                        <Calendar className="size-4 text-white" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            if (date) {
                                                setSelectedDate(date);
                                                setShowCalendar(false);
                                            }
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <Button
                                variant="outline"
                                className="w-8 h-8 bg-gray-50"
                                onClick={() => handleDateChange('prev')}
                            >
                                <ChevronLeft className="size-4" />
                            </Button>

                            <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#353535] font-medium px-1 sm:px-2 text-center min-w-0 flex-1">
                                <span className="hidden sm:inline">{formatDisplayDate(selectedDate)}</span>
                                <span className="sm:hidden">{format(selectedDate, 'MMM d')}</span>
                            </span>

                            <Button
                                variant="outline"
                                className="w-8 h-8 bg-gray-50"
                                onClick={() => handleDateChange('next')}
                            >
                                <ChevronRight className="size-4" />
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Inline Filter Row */}
                {
                    showFilter && (
                        <div className="bg-white rounded-[8px] p-[12px] sm:p-[16px] mb-[12px] sm:mb-[16px] border border-[#E9E9E9]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] sm:gap-[16px]">
                                {/* Status Filter */}
                                <div className="space-y-2">
                                    <Label className="text-[12px] sm:text-sm font-medium text-[#353535]">Status</Label>
                                    <div className="flex flex-wrap gap-[6px] sm:gap-[8px]">
                                        {['Present', 'Absent', 'Late', 'Overtime', 'Leave'].map((status) => (
                                            <Button
                                                key={status}
                                                variant={filterOptions.status.includes(status.toLowerCase()) ? "primary" : "outline"}
                                                size="sm"
                                                className="h-[24px] sm:h-[28px] px-[8px] sm:px-[12px] text-[10px] sm:text-[12px]"
                                                onClick={() => {
                                                    if (filterOptions.status.includes(status.toLowerCase())) {
                                                        handleFilterChange('status', filterOptions.status.filter(s => s !== status.toLowerCase()));
                                                    } else {
                                                        handleFilterChange('status', [...filterOptions.status, status.toLowerCase()]);
                                                    }
                                                }}
                                            >
                                                {status}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Department Filter */}
                                <div className="space-y-2">
                                    <Label className="text-[12px] sm:text-sm font-medium text-[#353535]">Department</Label>
                                    <div className="flex flex-wrap gap-[6px] sm:gap-[8px]">
                                        {['Engineering', 'HR', 'Marketing', 'Sales', 'Finance'].map((dept) => (
                                            <Button
                                                key={dept}
                                                variant={filterOptions.department.includes(dept.toLowerCase()) ? "primary" : "outline"}
                                                size="sm"
                                                className="h-[24px] sm:h-[28px] px-[8px] sm:px-[12px] text-[10px] sm:text-[12px]"
                                                onClick={() => {
                                                    if (filterOptions.department.includes(dept.toLowerCase())) {
                                                        handleFilterChange('department', filterOptions.department.filter(d => d !== dept.toLowerCase()));
                                                    } else {
                                                        handleFilterChange('department', [...filterOptions.department, dept.toLowerCase()]);
                                                    }
                                                }}
                                            >
                                                {dept}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Date Range Filter */}
                                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                                    <Label className="text-[12px] sm:text-sm font-medium text-[#353535]">Date Range</Label>
                                    <Select value={filterOptions.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                                        <SelectTrigger className="h-[24px] sm:h-[28px] text-[10px] sm:text-[12px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="yesterday">Yesterday</SelectItem>
                                            <SelectItem value="thisWeek">This Week</SelectItem>
                                            <SelectItem value="lastWeek">Last Week</SelectItem>
                                            <SelectItem value="thisMonth">This Month</SelectItem>
                                            <SelectItem value="lastMonth">Last Month</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex justify-end mt-[8px] sm:mt-[12px] pt-[8px] sm:pt-[12px] border-t border-[#E9E9E9]">
                                <Button variant="outline" size="sm" onClick={clearFilters} className="h-[24px] sm:h-[28px] text-[10px] sm:text-[12px] px-[8px] sm:px-[12px]">
                                    Clear All
                                </Button>
                            </div>
                        </div>
                    )
                }

                <div className=" overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-[#E9E9E9]">
                                    <TableHead className="w-[50px]  bg-[#EEF3F2]">
                                        <Checkbox className="bg-[#EEF3F2]"
                                            checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="text-[12px] sm:text-[14px]  bg-[#EEF3F2] leading-[16px] sm:leading-[22px] font-medium text-[#8C8E8E] min-w-[150px]">Name</TableHead>
                                    <TableHead className="text-[12px] sm:text-[14px]  bg-[#EEF3F2] leading-[16px] sm:leading-[22px] font-medium text-[#8C8E8E] min-w-[100px]">Clock In</TableHead>
                                    <TableHead className="text-[12px] sm:text-[14px]  bg-[#EEF3F2] leading-[16px] sm:leading-[22px] font-medium text-[#8C8E8E] min-w-[100px]">Clock Out</TableHead>
                                    <TableHead className="text-[12px] sm:text-[14px]  bg-[#EEF3F2] leading-[16px] sm:leading-[22px] font-medium text-[#8C8E8E] min-w-[120px]">Hours Worked</TableHead>
                                    <TableHead className="text-[12px] sm:text-[14px]  bg-[#EEF3F2] leading-[16px] sm:leading-[22px] font-medium text-[#8C8E8E] min-w-[100px]">Status</TableHead>
                                    <TableHead className="text-[12px] sm:text-[14px]  bg-[#EEF3F2] leading-[16px] sm:leading-[22px] font-medium text-[#8C8E8E] min-w-[120px]">Action</TableHead>
                                    <TableHead className="w-[50px]  bg-[#EEF3F2]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmployees.map((employee) => (
                                    <TableRow key={employee.id} className="border-b border-[#E9E9E9] bg-gray-50 hover:bg-[#F8F9FA]">
                                        <TableCell className=" ">
                                            <Checkbox
                                                checked={selectedEmployees.includes(employee.id)}
                                                className="bg-gray-50"
                                                onCheckedChange={() => handleSelectEmployee(employee.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-[8px] sm:gap-[12px]">
                                                {employee.avatar ? (
                                                    <img
                                                        src={employee.avatar}
                                                        alt={employee.name}
                                                        className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] rounded-full object-cover flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] rounded-full bg-[#0d978b] flex items-center justify-center text-white text-[10px] sm:text-[14px] leading-[12px] sm:leading-[22px] font-medium flex-shrink-0">
                                                        {employee.initials}
                                                    </div>
                                                )}
                                                <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] text-[#353535] font-medium truncate">
                                                    {employee.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] text-[#353535]">
                                                {employee.clockIn}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] text-[#353535]">
                                                {employee.clockOut}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] ${getHoursWorkedColor(employee.status, employee.hoursWorked)}`}>
                                                {employee.hoursWorked}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-[10px] sm:text-[14px] leading-[12px] sm:leading-[22px]">
                                                {getStatusText(employee.status)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {employee.status !== 'leave' && (
                                                <div className="flex items-center gap-[4px] sm:gap-[8px]">
                                                    <div
                                                        className="h-[28px] sm:h-[32px] px-[6px] sm:px-[12px] bg-[#D6EEEC] text-primary rounded-[21px] font-medium text-[12px]/[22px] sm:text-[12px] items-center justify-center flex"
                                                        onClick={() => handleApprove(employee.id)}
                                                    >
                                                        <span className="hidden sm:inline">Approve</span>
                                                    </div>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-[24px] w-[24px] p-0">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem onClick={() => handleViewProfile(employee.id)}>
                                                        <User className="mr-2 h-4 w-4" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleViewDetails(employee.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleEditEmployee(employee.id)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit Employee
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDeleteEmployee(employee.id)}
                                                        className="text-red-600 focus:text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Employee
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div >
        </div >
    );
}
