'use client';

import React, { useState } from 'react';
import { formatDate } from '@/lib/date-utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Corrected import for DialogHeader, DialogTitle

import { cn } from "@/lib/utils";
import { Calendar } from '@/components/ui/calendar';

/**
 * @description
 * The `Reschedule` component provides a dialog for rescheduling an interview.
 * It allows users to select a new date for the interview using a calendar popover.
 * The component manages the selected date in its local state and is controlled by `open` and `setOpen` props,
 * enabling a parent component to manage its visibility.
 * Unique `data-testid` and `id` attributes are added to key UI elements to facilitate automated testing.
 */
export default function Reschedule({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent close={false} className="max-w-[383px]" data-testid="reschedule-interview-dialog" id="reschedule-interview-dialog">
                <div>
                    <p className="text-[16px]/[20px] font-semibold text-[#353535]" data-testid="reschedule-dialog-title" id="reschedule-dialog-title">Reschedule Interview</p>
                    <p className="mt-[20px] text-[14px]/[16px] text-[#1c1c1c]" data-testid="select-date-time-label" id="select-date-time-label">Select New Date & Time</p>
                    <Popover>
                        <PopoverTrigger asChild className="mt-[12px]">
                            <Button
                                mode="input"
                                variant="outline"
                                id="reschedule-date-picker-button"
                                className={cn(
                                    'w-full h-[48px] data-[state=open]:border-primary',
                                    !date && 'text-muted-foreground',
                                )}
                                data-testid="reschedule-date-picker-button"
                            >
                                <CalendarDays className="-ms-0.5" />
                                {date ? formatDate(date) : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" data-testid="reschedule-calendar-popover" id="reschedule-calendar-popover">
                            <Calendar
                                initialFocus
                                mode="single"
                                defaultMonth={date || undefined} // Ensure defaultMonth is Date or undefined
                                selected={date || undefined} // Ensure selected is Date or undefined
                                onSelect={(newDate) => setDate(newDate || null)} // Handle null case for onSelect
                                numberOfMonths={1}
                                data-testid="reschedule-calendar"
                                id="reschedule-calendar"
                            />
                        </PopoverContent>
                    </Popover>
                    <Button
                        className="w-full mt-[24px]"
                        onClick={() => setOpen(false)}
                        data-testid="reschedule-confirm-button"
                        id="reschedule-confirm-button"
                    >
                        Reschedule Interview
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
