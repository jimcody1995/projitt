'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

interface SwapRequest {
    id: string;
    requestingEmployee: {
        name: string;
        avatar?: string;
        initials?: string;
    };
    shift: {
        time: string;
        date: string;
    };
    swapWith: {
        name: string;
        avatar?: string;
        initials?: string;
    };
    shiftToSwapTo: {
        time: string;
        date: string;
    };
    status: 'pending' | 'approved' | 'rejected';
}

interface SwapRequestsComponentProps {
    searchQuery: string;
    selectedDate: Date;
    filterOptions: {
        status: string[];
        department: string[];
        dateRange: string;
    };
}

const mockSwapRequests: SwapRequest[] = [
    {
        id: '1',
        requestingEmployee: {
            name: 'Alice Fernadez',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Alice Fernadez',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    },
    {
        id: '2',
        requestingEmployee: {
            name: 'Floyd Miles',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Floyd Miles',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    },
    {
        id: '3',
        requestingEmployee: {
            name: 'Kathryn Murphy',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Kathryn Murphy',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    },
    {
        id: '4',
        requestingEmployee: {
            name: 'Jerome Bell',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Jerome Bell',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    },
    {
        id: '5',
        requestingEmployee: {
            name: 'Brooklyn Simmons',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Brooklyn Simmons',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    },
    {
        id: '6',
        requestingEmployee: {
            name: 'Cody Fisher',
            initials: 'CF',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Cody Fisher',
            initials: 'CF',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    },
    {
        id: '7',
        requestingEmployee: {
            name: 'Esther Howard',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Esther Howard',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    },
    {
        id: '8',
        requestingEmployee: {
            name: 'Jacob Jones',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Jacob Jones',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    },
    {
        id: '9',
        requestingEmployee: {
            name: 'Leslie Alexander',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Leslie Alexander',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    },
    {
        id: '10',
        requestingEmployee: {
            name: 'Kristin Watson',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        },
        shift: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        swapWith: {
            name: 'Kristin Watson',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        },
        shiftToSwapTo: {
            time: 'Mon, 8:00am - 5:00pm',
            date: '12 Apr, 2025'
        },
        status: 'pending'
    }
];

export default function SwapRequestsComponent({ searchQuery, selectedDate, filterOptions }: SwapRequestsComponentProps) {
    const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

    const filteredRequests = mockSwapRequests.filter(request => {
        // Search filter
        const matchesSearch = request.requestingEmployee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.swapWith.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Status filter
        const requestStatus = request.status === 'pending' ? 'pending' : 'approved';
        const matchesStatus = filterOptions.status.length === 0 ||
            filterOptions.status.includes(requestStatus);

        return matchesSearch && matchesStatus;
    });

    const handleSelectRequest = (requestId: string) => {
        setSelectedRequests(prev =>
            prev.includes(requestId)
                ? prev.filter(id => id !== requestId)
                : [...prev, requestId]
        );
    };

    const handleSelectAll = () => {
        if (selectedRequests.length === filteredRequests.length) {
            setSelectedRequests([]);
        } else {
            setSelectedRequests(filteredRequests.map(req => req.id));
        }
    };

    const handleApprove = (requestId: string) => {
        console.log('Approve request:', requestId);
        // Add approval logic here
    };

    const handleReject = (requestId: string) => {
        console.log('Reject request:', requestId);
        // Add rejection logic here
    };

    return (
        <div className="bg-white rounded-[6px] sm:rounded-[8px] border border-[#E9E9E9] overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#E9E9E9]">
                            <TableHead className="w-[40px] sm:w-[50px] bg-[#EEF3F2] ">
                                <Checkbox
                                    checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                                    onCheckedChange={handleSelectAll}
                                    className="scale-75 sm:scale-100"
                                />
                            </TableHead>
                            <TableHead className="text-[10px] sm:text-[12px] lg:text-[14px] leading-[12px] sm:leading-[16px] lg:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[140px] sm:min-w-[180px]">Requesting Employee</TableHead>
                            <TableHead className="text-[10px] sm:text-[12px] lg:text-[14px] leading-[12px] sm:leading-[16px] lg:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[100px] sm:min-w-[140px]">Shift</TableHead>
                            <TableHead className="text-[10px] sm:text-[12px] lg:text-[14px] leading-[12px] sm:leading-[16px] lg:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[140px] sm:min-w-[180px]">Swap With</TableHead>
                            <TableHead className="text-[10px] sm:text-[12px] lg:text-[14px] leading-[12px] sm:leading-[16px] lg:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[100px] sm:min-w-[140px]">Shift To Swap To</TableHead>
                            <TableHead className="text-[10px] sm:text-[12px] lg:text-[14px] leading-[12px] sm:leading-[16px] lg:leading-[22px] bg-[#EEF3F2] font-medium text-[#8C8E8E] min-w-[80px] sm:min-w-[120px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRequests.map((request) => (
                            <TableRow key={request.id} className="border-b border-[#E9E9E9] hover:bg-[#F8F9FA]">
                                <TableCell className=" bg-white">
                                    <Checkbox
                                        checked={selectedRequests.includes(request.id)}
                                        onCheckedChange={() => handleSelectRequest(request.id)}
                                        className="scale-75 sm:scale-100"
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-[4px] sm:gap-[6px] lg:gap-[12px]">
                                        {request.requestingEmployee.avatar ? (
                                            <img
                                                src={request.requestingEmployee.avatar}
                                                alt={request.requestingEmployee.name}
                                                className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[32px] lg:h-[32px] rounded-full object-cover flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[32px] lg:h-[32px] rounded-full bg-[#0d978b] flex items-center justify-center text-white text-[8px] sm:text-[10px] lg:text-[12px] leading-[10px] sm:leading-[12px] lg:leading-[16px] font-medium flex-shrink-0">
                                                {request.requestingEmployee.initials}
                                            </div>
                                        )}
                                        <span className="text-[9px] sm:text-[12px] lg:text-[14px] leading-[11px] sm:leading-[16px] lg:leading-[22px] text-[#353535] font-medium truncate">
                                            {request.requestingEmployee.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="text-[9px] sm:text-[12px] lg:text-[14px] leading-[11px] sm:leading-[16px] lg:leading-[20px] text-[#353535] font-medium">
                                            {request.shift.time}
                                        </div>
                                        <div className="text-[8px] sm:text-[10px] lg:text-[12px] leading-[10px] sm:leading-[12px] lg:leading-[16px] text-[#6B7280]">
                                            {request.shift.date}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-[4px] sm:gap-[6px] lg:gap-[12px]">
                                        {request.swapWith.avatar ? (
                                            <img
                                                src={request.swapWith.avatar}
                                                alt={request.swapWith.name}
                                                className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[32px] lg:h-[32px] rounded-full object-cover flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[32px] lg:h-[32px] rounded-full bg-[#0d978b] flex items-center justify-center text-white text-[8px] sm:text-[10px] lg:text-[12px] leading-[10px] sm:leading-[12px] lg:leading-[16px] font-medium flex-shrink-0">
                                                {request.swapWith.initials}
                                            </div>
                                        )}
                                        <span className="text-[9px] sm:text-[12px] lg:text-[14px] leading-[11px] sm:leading-[16px] lg:leading-[22px] text-[#353535] font-medium truncate">
                                            {request.swapWith.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="text-[9px] sm:text-[12px] lg:text-[14px] leading-[11px] sm:leading-[16px] lg:leading-[20px] text-[#353535] font-medium">
                                            {request.shiftToSwapTo.time}
                                        </div>
                                        <div className="text-[8px] sm:text-[10px] lg:text-[12px] leading-[10px] sm:leading-[12px] lg:leading-[16px] text-[#6B7280]">
                                            {request.shiftToSwapTo.date}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-[2px] sm:gap-[4px] lg:gap-[8px]">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px] lg:h-[24px] lg:w-[24px] p-0 bg-white border-[#E5E7EB] hover:bg-[#FEF2F2] rounded-md"
                                            onClick={() => handleReject(request.id)}
                                        >
                                            <X className="size-1.5 sm:size-2.5 lg:size-3 text-[#DC2626]" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-[16px] sm:h-[20px] lg:h-[24px] px-[2px] sm:px-[4px] lg:px-[8px] bg-[#0d978b] hover:bg-[#0b7a6f] text-white rounded-md font-medium text-[7px] sm:text-[10px] lg:text-[12px]"
                                            onClick={() => handleApprove(request.id)}
                                        >
                                            <Check className="size-1.5 sm:size-2.5 lg:size-3 mr-0.5 sm:mr-1" />
                                            <span className="hidden sm:inline">Approve</span>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
