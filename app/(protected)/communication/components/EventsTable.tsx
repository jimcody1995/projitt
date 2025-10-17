'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MoreVertical, Info } from 'lucide-react';

interface Event {
    id: string;
    name: string;
    eventDate: string;
    employees: number;
    status: 'In Process' | 'Completed';
}

const events: Event[] = [
    {
        id: '1',
        name: 'Celebration Party',
        eventDate: '23 Mar, 2025',
        employees: 32,
        status: 'In Process'
    },
    {
        id: '2',
        name: 'Meet and Greet',
        eventDate: '23 Mar, 2025',
        employees: 23,
        status: 'Completed'
    },
    {
        id: '3',
        name: 'Open House',
        eventDate: '23 Mar, 2025',
        employees: 56,
        status: 'In Process'
    }
];

export default function EventsTable() {
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [eventToCancel, setEventToCancel] = useState<Event | null>(null);

    const handleCancelEvent = (event: Event) => {
        setEventToCancel(event);
        setShowCancelDialog(true);
    };

    const handleConfirmCancel = () => {
        // Handle the actual cancellation logic here
        console.log('Cancelling event:', eventToCancel?.name);
        setShowCancelDialog(false);
        setEventToCancel(null);
    };

    const handleCancelDialog = () => {
        setShowCancelDialog(false);
        setEventToCancel(null);
    };

    return (
        <>
            <div className="rounded-[12px] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-[#EEF3F2] h-[50px] sm:h-[60px]">
                            <tr>
                                <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E] font-medium">
                                    Event
                                </th>
                                <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E] font-medium">
                                    Event Date
                                </th>
                                <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E] font-medium">
                                    Employees
                                </th>
                                <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E] font-medium">
                                    Status
                                </th>
                                <th className="px-[12px] sm:px-[16px] text-right text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E]">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-[12px]/[18px] sm:text-[14px]/[20px] text-[#353535]">
                                        {event.name}
                                    </td>
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-[12px]/[18px] sm:text-[14px]/[20px] text-[#4B4B4B]">
                                        {event.eventDate}
                                    </td>
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-[12px]/[18px] sm:text-[14px]/[20px] text-[#4B4B4B]">
                                        {event.employees}
                                    </td>
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px]">
                                        <span className={`inline-flex items-center px-2.5  rounded-full text-[14px]/[22px] font-medium ${event.status === 'In Process'
                                            ? 'bg-[#FFDFC0] text-[#BE5E00]'
                                            : 'bg-[#D6EEEC] text-[#0D978B]'
                                            }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[140px] rounded-[12px]">
                                                <DropdownMenuItem
                                                    className="text-[12px]/[18px] text-[#4B4B4B]"
                                                    onClick={() => handleCancelEvent(event)}
                                                >
                                                    Cancel Event
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B]">Preview</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cancel Event Confirmation Dialog */}
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogContent className="w-[400px] rounded-[12px] p-0" close={false}>
                    <div className="p-6 text-center">
                        {/* Information Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-[#D6EEEC] border border-[#0D978B] rounded-full flex items-center justify-center">
                                <Info className="w-6 h-6 text-[#0D978B]" />
                            </div>
                        </div>

                        {/* Main Message */}
                        <h3 className="text-[16px]/[24px] font-semibold text-[#353535] mb-2">
                            Are you sure you want to cancel this event
                        </h3>

                        {/* Warning Message */}
                        <p className="text-[14px]/[20px] text-[#6B7280] mb-6">
                            This action cannot be undone!
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-center">
                            <Button
                                variant="outline"
                                onClick={handleCancelDialog}
                                className="px-6 py-2 h-9 border-gray-300 text-gray-900 font-medium rounded-[8px]"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirmCancel}
                                className="px-6 py-2 h-9 bg-[#0D978B] hover:bg-[#0D978B]/90 text-white font-medium rounded-[8px]"
                            >
                                Yes, Cancel Event
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
