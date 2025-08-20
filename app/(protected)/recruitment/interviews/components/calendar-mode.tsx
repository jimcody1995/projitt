'use client';
import React, { useState, useEffect } from 'react';
import { formatMonthYear, formatDateYYYYMMDD, utcToLocal, addMonth, subtractMonth, formatMonthAndDay } from '@/lib/date-utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, EllipsisVertical, User, Video } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import Reschedule from './reschedule';
import CancelInterview from './cancel-interview';

// Placeholder data (replace with props or context as needed)

function getDaysInMonth(year: number, month: number) {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Get the start of the week (Sunday) for the first day of the month
    const firstDayOfWeek = new Date(start);
    const dayOfWeek = firstDayOfWeek.getDay();
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - dayOfWeek);

    // Get the end of the week (Saturday) for the last day of the month
    const lastDayOfWeek = new Date(end);
    const lastDayOfWeekDay = lastDayOfWeek.getDay();
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (6 - lastDayOfWeekDay));

    const currentDay = new Date(firstDayOfWeek);
    while (currentDay <= lastDayOfWeek) {
        days.push(new Date(currentDay));
        currentDay.setDate(currentDay.getDate() + 1);
    }
    return days;
}

export default function CalendarMode({ interviews, setSelectedApplication }: { interviews: any[]; setSelectedApplication: (application: string | null) => void }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [rescheduleOpen, setRescheduleOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const monthLabel = formatMonthYear(currentMonth);

    // Group interviews by date (YYYY-MM-DD)
    const [eventsByDate, setEventsByDate] = useState<Record<string, any[]>>({});
    useEffect(() => {
        const eventsBy: Record<string, any[]> = {};
        console.log(interviews);
        if (interviews?.length > 0) {
            interviews.forEach((event: any) => {
                // Debug: Log the original date and how it's being processed
                console.log('Original date:', event.date);

                // Try different approaches to handle the date
                let key;
                if (event.date.includes('T00:00:00')) {
                    // If it's a date-only string (no time), parse it directly
                    const dateOnly = event.date.split('T')[0];
                    key = formatDateYYYYMMDD(new Date(dateOnly));
                } else {
                    // For datetime strings, use UTC parsing and convert to local
                    const utcDate = new Date(event.date);
                    const localDate = utcToLocal(utcDate);
                    key = formatDateYYYYMMDD(localDate);
                }

                if (!eventsBy[key]) eventsBy[key] = [];
                eventsBy[key].push(event);
            });
            console.log('Final eventsBy:', eventsBy);
            setEventsByDate(eventsBy);
        }

    }, [interviews]);



    return (
        <div className="bg-white rounded-[20px] overflow-hidden border border-[#E9E9E9]" >
            <div className="flex gap-[10px] items-center py-[19px] px-[27px]">
                <div className="text-[22px] font-bold w-[180px]">{monthLabel}</div>
                <div className="flex gap-2">
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#e9e9e9] cursor-pointer"
                        onClick={() => setCurrentMonth(prev => subtractMonth(prev))}
                        aria-label="Previous Month"
                    >
                        {'<'}
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#e9e9e9] cursor-pointer"
                        onClick={() => setCurrentMonth(prev => addMonth(prev))}
                        aria-label="Next Month"
                    >
                        {'>'}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 text-center h-[30px] text-[#5D5555]  text-[11px] ">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                    <div key={d} className="font-medium border border-[#d3f0ec] h-full flex justify-center items-center" >{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7">
                {days.map(day => {
                    const key = formatDateYYYYMMDD(day);
                    // console.log('Calendar day key:', key, 'for date:', formatDateYYYYMMDD(day));
                    const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                    return (
                        <div
                            key={key}
                            className={`min-h-[128px]  p-1 relative border border-[#D3F0EC]`}
                        >
                            <div className="text-[14px] font-medium text-center text-[#5D5555] mb-1">{isCurrentMonth ? day.getDate() : formatMonthAndDay(day)}</div>
                            {eventsByDate[key]?.map((event: any, idx: number) => (
                                <Popover key={`${key}-${idx}`}>
                                    <PopoverTrigger asChild>
                                        <div
                                            className="bg-[#D6EEEC] text-[#0D978B] text-[12px] rounded px-1 py-0.5 mb-1 cursor-pointer truncate"
                                            title={event.name}
                                        >
                                            {event.applicant.first_name + ' ' + event.applicant.last_name}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className='flex justify-between items-start'>
                                            <div>
                                                <p className="text-[14px]/[20px] font-medium">{event.applicant.first_name + ' ' + event.applicant.last_name}</p>
                                                <p className="text-[12px]/[20px] text-[#0d978b]">{event.status}</p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        className="size-7"
                                                        mode="icon"
                                                        variant="ghost"
                                                    >
                                                        <EllipsisVertical />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    side="bottom"
                                                    align="end"
                                                >
                                                    <div
                                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                                        onClick={() => setRescheduleOpen(true)}
                                                    >
                                                        Reschedule
                                                    </div>
                                                    <div
                                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                                        onClick={() => setCancelOpen(true)}
                                                    >
                                                        Cancel Interview
                                                    </div>
                                                    <div
                                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                                    >
                                                        Mark as No-show
                                                    </div>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className="w-full flex flex-col gap-[12px] mt-[18px]">
                                            <div className="flex gap-[6px]">
                                                <Video className="size-[16px] text-[#4b4b4b]" />
                                                <p className="text-[12px]/[20px] text-[#4b4b4b]">{event.link}</p>
                                            </div>
                                            <div className="border-b border-[#e9e9e9]"></div>
                                            <div className="flex gap-[6px]">
                                                <Calendar className="size-[16px] text-[#4b4b4b]" />
                                                <p className="text-[12px]/[20px] text-[#4b4b4b]">{event.time}</p>
                                            </div>
                                            <div className="border-b border-[#e9e9e9]"></div>
                                            <div className="flex gap-[6px]">
                                                <User className="size-[16px] text-[#4b4b4b]" />
                                                <div className="flex gap-[7px] flex-wrap">
                                                    {event.interviewers_ids.map((interviewer: number, idx: number) => (
                                                        <span key={idx} className="py-[3.75px] px-[6.25px] rounded-[5px] bg-[#ebebeb] text-[12px]/[12.5px] text-[#4b4b4b]">{interviewer}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ))}
                        </div>
                    );
                })}
            </div>
            <Reschedule open={rescheduleOpen} setOpen={setRescheduleOpen} />
            <CancelInterview open={cancelOpen} setOpen={setCancelOpen} />
        </div >
    );
}
