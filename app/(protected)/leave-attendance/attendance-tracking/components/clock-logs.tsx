'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Check, X, User, Edit, Trash2, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export default function ClockLogsComponent({ searchQuery, selectedDate, filterOptions }: ClockLogsComponentProps) {
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
        <div className="bg-white rounded-[8px] border border-[#E9E9E9] overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#E9E9E9]">
                            <TableHead className="w-[50px]  bg-[#EEF3F2]">
                                <Checkbox
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
                            <TableRow key={employee.id} className="border-b border-[#E9E9E9] hover:bg-[#F8F9FA]">
                                <TableCell className=" bg-white">
                                    <Checkbox
                                        checked={selectedEmployees.includes(employee.id)}
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
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-[24px] w-[24px] sm:h-[32px] sm:w-[32px] p-0 bg-white border-[#E5E7EB] hover:bg-[#FEF2F2] rounded-md"
                                                onClick={() => handleReject(employee.id)}
                                            >
                                                <X className="size-3 sm:size-4 text-[#DC2626]" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="h-[24px] sm:h-[32px] px-[6px] sm:px-[12px] bg-[#0d978b] hover:bg-[#0b7a6f] text-white rounded-md font-medium text-[10px] sm:text-[12px]"
                                                onClick={() => handleApprove(employee.id)}
                                            >
                                                <Check className="size-3 sm:size-4 mr-1" />
                                                <span className="hidden sm:inline">Approve</span>
                                            </Button>
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
    );
}
