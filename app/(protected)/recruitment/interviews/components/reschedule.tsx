'use client';

import React, { useEffect, useState } from 'react';
import { formatDate } from '@/lib/date-utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDays, Clock, Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';
import { rescheduleInterviewApi } from '@/api/interviews';
import { customToast } from '@/components/common/toastr';

const Calendar = dynamic(() => import('@/components/ui/calendar').then(mod => ({ default: mod.Calendar })), { ssr: false });

/**
 * @description
 * The `Reschedule` component provides a dialog for rescheduling an interview.
 * It allows users to select a new date for the interview using a calendar popover.
 * The component manages the selected date in its local state and is controlled by `open` and `setOpen` props,
 * enabling a parent component to manage its visibility.
 * Unique `data-testid` and `id` attributes are added to key UI elements to facilitate automated testing.
 */
interface SelectedReschedule {
    date: string;
    time?: string;
    [key: string]: unknown;
}

export default function Reschedule({ getData, open, setOpen, selectedReschedule }: { getData: () => void, open: boolean, setOpen: (open: boolean) => void, selectedReschedule: SelectedReschedule }) {

    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string>('09:00');
    const [loading, setLoading] = useState<boolean>(false);

    // Generate time options (9 AM to 6 PM in 30-minute intervals)
    const timeOptions = [];
    for (let hour = 9; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            timeOptions.push({ value: timeString, label: displayTime });
        }
    }

    useEffect(() => {
        setDate(selectedReschedule ? new Date(selectedReschedule.date) : null);
        setTime(selectedReschedule?.time.slice(0, 5) || '09:00');
    }, [selectedReschedule]);

    const reschedule = async () => {
        setLoading(true);

        if (date && time) {
            try {
                // Combine date and time
                const [hours, minutes] = time.split(':').map(Number);
                const combinedDateTime = new Date(date);
                combinedDateTime.setHours(hours, minutes, 0, 0);

                const response = await rescheduleInterviewApi({ ...selectedReschedule, date: combinedDateTime, time, status: 'review' });
                if (response.status) {
                    customToast('Success', 'Interview rescheduled successfully', 'success');
                    getData();
                } else {
                    customToast('Error', 'Failed to reschedule interview', 'error');
                }
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred';
                customToast('Error', errorMessage, 'error');
            }
            finally {
                setOpen(false);
            }
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent close={false} className="max-w-[383px]" data-testid="reschedule-interview-dialog" id="reschedule-interview-dialog">
                <div>
                    <p className="text-[16px]/[20px] font-semibold text-[#353535]" data-testid="reschedule-dialog-title" id="reschedule-dialog-title">Reschedule Interview</p>
                    <p className="mt-[20px] text-[14px]/[16px] text-[#1c1c1c]" data-testid="select-date-time-label" id="select-date-time-label">Select New Date & Time</p>

                    {/* Date Selection */}
                    <div className="mt-[12px]">
                        <Popover>
                            <PopoverTrigger asChild>
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
                                    defaultMonth={date || undefined}
                                    selected={date || undefined}
                                    onSelect={(newDate) => setDate(newDate || null)}
                                    numberOfMonths={1}
                                    data-testid="reschedule-calendar"
                                    id="reschedule-calendar"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Time Selection */}
                    <div className="mt-[16px]">
                        <Select value={time} onValueChange={setTime}>
                            <SelectTrigger className="w-full h-[48px]" data-testid="reschedule-time-select" id="reschedule-time-select">
                                <Clock className="h-4 w-4 -ms-0.5" />
                                <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="w-full mt-[24px]"
                        onClick={reschedule}
                        data-testid="reschedule-confirm-button"
                        id="reschedule-confirm-button"
                        disabled={!date || !time || loading}
                    >
                        {loading && <Loader className="animate-spin size-4" />}Reschedule Interview
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
