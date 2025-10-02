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

interface TimeException {
    id: string;
    employeeName: string;
    employeeRole: string;
    avatar?: string;
    initials?: string;
    date: string;
    type: 'Overtime' | 'Entry Edit' | 'Missed Clock Out' | 'No Attendance';
    details: string;
    hours?: string;
    timeRange: string;
    entryType: string;
    reason: string;
    status: 'pending' | 'approved';
    department?: string;
}

interface TimeExceptionsComponentProps {
    searchQuery: string;
    selectedDate: Date;
    filterOptions: {
        status: string[];
        department: string[];
        dateRange: string;
    };
}

const mockTimeExceptions: TimeException[] = [
    {
        id: '1',
        employeeName: 'Alice Fernadez',
        employeeRole: 'Senior Data Analyst',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        date: 'Mon, Apr 23',
        type: 'Overtime',
        details: '2hrs',
        hours: '2hrs',
        timeRange: '8:00am - 7:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'pending',
        department: 'engineering'
    },
    {
        id: '2',
        employeeName: 'Floyd Miles',
        employeeRole: 'HR Manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        date: 'Mon, Apr 23',
        type: 'Entry Edit',
        details: '8 hrs',
        hours: '8 hrs',
        timeRange: '8:00am - 5:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'pending',
        department: 'hr'
    },
    {
        id: '3',
        employeeName: 'Kathryn Murphy',
        employeeRole: 'Marketing Director',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        date: 'Mon, Apr 23',
        type: 'Missed Clock Out',
        details: '8:00am - 5:00pm',
        timeRange: '8:00am - 5:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'pending',
        department: 'marketing'
    },
    {
        id: '4',
        employeeName: 'Jerome Bell',
        employeeRole: 'Sales Executive',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        date: 'Mon, Apr 23',
        type: 'No Attendance',
        details: '8:00am - 5:00pm',
        timeRange: '8:00am - 5:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'approved',
        department: 'sales'
    },
    {
        id: '5',
        employeeName: 'Brooklyn Simmons',
        employeeRole: 'Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        date: 'Mon, Apr 23',
        type: 'Overtime',
        details: '2hrs',
        hours: '2hrs',
        timeRange: '8:00am - 7:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'approved',
        department: 'engineering'
    },
    {
        id: '6',
        employeeName: 'Cody Fisher',
        employeeRole: 'Financial Analyst',
        initials: 'CF',
        date: 'Mon, Apr 23',
        type: 'Entry Edit',
        details: '8 hrs',
        hours: '8 hrs',
        timeRange: '8:00am - 5:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'approved',
        department: 'finance'
    },
    {
        id: '7',
        employeeName: 'Esther Howard',
        employeeRole: 'HR Specialist',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        date: 'Mon, Apr 23',
        type: 'Overtime',
        details: '2hrs',
        hours: '2hrs',
        timeRange: '8:00am - 7:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'approved',
        department: 'hr'
    },
    {
        id: '8',
        employeeName: 'Jacob Jones',
        employeeRole: 'Marketing Coordinator',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        date: 'Mon, Apr 23',
        type: 'Entry Edit',
        details: '8 hrs',
        hours: '8 hrs',
        timeRange: '8:00am - 5:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'approved',
        department: 'marketing'
    },
    {
        id: '9',
        employeeName: 'Leslie Alexander',
        employeeRole: 'Product Manager',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        date: 'Mon, Apr 23',
        type: 'Overtime',
        details: '2hrs',
        hours: '2hrs',
        timeRange: '8:00am - 7:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'approved',
        department: 'engineering'
    },
    {
        id: '10',
        employeeName: 'Kristin Watson',
        employeeRole: 'Designer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        date: 'Mon, Apr 23',
        type: 'Overtime',
        details: '2hrs',
        hours: '2hrs',
        timeRange: '8:00am - 7:00pm',
        entryType: 'Manual Entry',
        reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting ind...',
        status: 'approved',
        department: 'design'
    }
];

const getStatusBadge = (status: TimeException['status']) => {
    switch (status) {
        case 'pending':
            return (
                <div className="flex items-center gap-[8px]">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-[24px] w-[24px] p-0 text-[#EF4444] hover:bg-[#FEF2F2]"
                    >
                        <X className="size-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-[24px] px-[8px] text-[#10B981] hover:bg-[#F0FDF4]"
                    >
                        <Check className="size-3 mr-1" />
                        Approve
                    </Button>
                </div>
            );
        case 'approved':
            return (
                <Badge variant="success" appearance="light" size="sm">
                    Approved
                </Badge>
            );
        default:
            return null;
    }
};

interface TimeExceptionsComponentProps {
    searchQuery: string;
    selectedDate: Date;
    filterOptions: {
        status: string[];
        department: string[];
        dateRange: string;
    };
}

export default function TimeExceptionsComponent({ searchQuery, selectedDate, filterOptions }: TimeExceptionsComponentProps) {
    const [selectedExceptions, setSelectedExceptions] = useState<string[]>([]);

    const filteredExceptions = mockTimeExceptions.filter(exception => {
        // Search filter
        const matchesSearch = exception.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exception.type.toLowerCase().includes(searchQuery.toLowerCase());

        // Status filter (mapping exception status to filter status)
        const exceptionStatus = exception.status === 'pending' ? 'pending' : 'approved';
        const matchesStatus = filterOptions.status.length === 0 ||
            filterOptions.status.includes(exceptionStatus);

        // Department filter
        const matchesDepartment = filterOptions.department.length === 0 ||
            (exception.department && filterOptions.department.includes(exception.department));

        return matchesSearch && matchesStatus && matchesDepartment;
    });

    const handleSelectException = (exceptionId: string) => {
        setSelectedExceptions(prev =>
            prev.includes(exceptionId)
                ? prev.filter(id => id !== exceptionId)
                : [...prev, exceptionId]
        );
    };

    const handleSelectAll = () => {
        if (selectedExceptions.length === filteredExceptions.length) {
            setSelectedExceptions([]);
        } else {
            setSelectedExceptions(filteredExceptions.map(exp => exp.id));
        }
    };

    const handleApprove = (exceptionId: string) => {
        console.log('Approve exception:', exceptionId);
        // Add approval logic here
    };

    const handleReject = (exceptionId: string) => {
        console.log('Reject exception:', exceptionId);
        // Add rejection logic here
    };

    const handleViewProfile = (exceptionId: string) => {
        console.log('View profile for exception:', exceptionId);
        // Add view profile logic here
    };

    const handleEditException = (exceptionId: string) => {
        console.log('Edit exception:', exceptionId);
        // Add edit exception logic here
    };

    const handleDeleteException = (exceptionId: string) => {
        console.log('Delete exception:', exceptionId);
        // Add delete exception logic here
    };

    const handleViewDetails = (exceptionId: string) => {
        console.log('View details for exception:', exceptionId);
        // Add view details logic here
    };

    return (
        <div className="bg-white rounded-[8px] border border-[#E9E9E9] overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#E9E9E9]">
                            <TableHead className="w-[50px] bg-[#EEF3F2] sticky left-0 z-10">
                                <Checkbox
                                    checked={selectedExceptions.length === filteredExceptions.length && filteredExceptions.length > 0}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[150px]">Requesting Employee</TableHead>
                            <TableHead className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[100px]">Date</TableHead>
                            <TableHead className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[120px]">Type</TableHead>
                            <TableHead className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[140px]">Details</TableHead>
                            <TableHead className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[200px]">Reason</TableHead>
                            <TableHead className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[120px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExceptions.map((exception) => (
                            <TableRow key={exception.id} className="border-b border-[#E9E9E9] hover:bg-[#F8F9FA]">
                                <TableCell className="sticky left-0 z-10 bg-white">
                                    <Checkbox
                                        checked={selectedExceptions.includes(exception.id)}
                                        onCheckedChange={() => handleSelectException(exception.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[22px] text-gray-900 font-medium">
                                            {exception.employeeName}
                                        </div>
                                        <div className="text-[10px] sm:text-[12px] leading-[12px] sm:leading-[16px] text-[#6B7280]">
                                            {exception.employeeRole}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#353535]">
                                        {exception.date}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#353535]">
                                        {exception.type}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="text-[10px] sm:text-[12px] leading-[12px] sm:leading-[16px] text-[#6B7280]">
                                            {exception.timeRange}
                                        </div>
                                        <div className="text-[10px] sm:text-[12px] leading-[12px] sm:leading-[16px] text-[#6B7280]">
                                            {exception.entryType}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#6B7280] max-w-[200px] truncate block">
                                        {exception.reason}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {exception.status === 'pending' ? (
                                        <div className="flex items-center gap-[4px] sm:gap-[8px]">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-[20px] w-[20px] sm:h-[24px] sm:w-[24px] p-0 bg-white border-[#E5E7EB] hover:bg-[#FEF2F2] rounded-md"
                                                onClick={() => handleReject(exception.id)}
                                            >
                                                <X className="size-2 sm:size-3 text-[#DC2626]" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="h-[20px] sm:h-[24px] px-[4px] sm:px-[8px] bg-[#0d978b] hover:bg-[#0b7a6f] text-white rounded-md font-medium text-[10px] sm:text-[12px]"
                                                onClick={() => handleApprove(exception.id)}
                                            >
                                                <Check className="size-2 sm:size-3 mr-1" />
                                                <span className="hidden sm:inline">Approve</span>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center px-[6px] sm:px-[8px] py-[2px] sm:py-[4px] rounded-full bg-[#F0FDF4] text-[#10B981] text-[10px] sm:text-[12px] font-medium">
                                            Approved
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
