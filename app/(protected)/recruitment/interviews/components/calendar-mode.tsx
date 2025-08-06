'use client';
import React, { useState } from 'react';
import moment from 'moment';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, EllipsisVertical, User, Video } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Placeholder data (replace with props or context as needed)
const interviewData = [
    {
        name: 'Alice Fernandez',
        date: '2025-08-11T10:00:00',
        title: 'Test Interview',
        status: 'Confirmed',
        link: 'https://example.zoom.us/j/12345',
        time: '20 Nov, 4:00pm',
        interviewers: ['Abubakar Ali', 'Steve Larry', 'Arnold Leviticus'],
    },
    // Add more events as needed
];

function getDaysInMonth(year: number, month: number) {
    const start = moment([year, month]);
    const end = start.clone().endOf('month');
    const days: moment.Moment[] = [];
    const day = start.clone().startOf('week');
    const lastDay = end.clone().endOf('week');
    while (day.isBefore(lastDay)) {
        days.push(day.clone());
        day.add(1, 'day');
    }
    return days;
}

export default function CalendarMode({ setSelectedApplication }: { setSelectedApplication: (id: string) => void }) {
    const [currentMonth, setCurrentMonth] = useState(moment());

    const days = getDaysInMonth(currentMonth.year(), currentMonth.month());
    const monthLabel = currentMonth.format('MMMM YYYY');

    // Group interviews by date (YYYY-MM-DD)
    const eventsByDate: Record<string, typeof interviewData> = {};
    interviewData.forEach(event => {
        const key = moment(event.date).format('YYYY-MM-DD');
        if (!eventsByDate[key]) eventsByDate[key] = [];
        eventsByDate[key].push(event);
    });

    function ActionsCell({ row }: { row: Row<any> }): JSX.Element {

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="size-7"
                        mode="icon"
                        variant="ghost"
                        data-testid={`actions-button-${row.original.id}`}
                    >
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    data-testid={`actions-menu-${row.original.id}`}
                >

                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`view-applicants-action-${row.original.id}`}
                        onClick={() => setSelectedApplication(row.original.id)}
                    >
                        Reschedule
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`duplicate-action-${row.original.id}`}
                    >
                        Cancel Interview
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`duplicate-action-${row.original.id}`}
                    >
                        Mark as No-show
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className="bg-white rounded-[20px] overflow-hidden border border-[#E9E9E9]" >
            <div className="flex gap-[30px] items-center py-[19px] px-[27px]">
                <div className="text-[22px] font-bold">{monthLabel}</div>
                <div className="flex gap-2">
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#e9e9e9] cursor-pointer"
                        onClick={() => setCurrentMonth(m => m.clone().subtract(1, 'month'))}
                        aria-label="Previous Month"
                    >
                        {'<'}
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#e9e9e9] cursor-pointer"
                        onClick={() => setCurrentMonth(m => m.clone().add(1, 'month'))}
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
                    const key = day.format('YYYY-MM-DD');
                    const isCurrentMonth = day.month() === currentMonth.month();
                    return (
                        <div
                            key={key}
                            className={`min-h-[128px]  p-1 relative border border-[#D3F0EC]`}
                        >
                            <div className="text-[14px] font-medium text-center text-[#5D5555] mb-1">{isCurrentMonth ? day.date() : moment(day).format('MMM') + ' ' + day.date()}</div>
                            {eventsByDate[key]?.map((event, idx) => (
                                <>
                                    <Popover key={idx}>
                                        <PopoverTrigger asChild>
                                            <div
                                                className="bg-[#D6EEEC] text-[#0D978B] text-[12px] rounded px-1 py-0.5 mb-1 cursor-pointer truncate"
                                                title={event.name}
                                            >
                                                {event.name}
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className='flex justify-between items-start'>
                                                <div>
                                                    <p className="text-[14px]/[20px] font-medium">{event.name}</p>
                                                    <p className="text-[12px]/[20px] text-[#0d978b]">{event.status}</p>
                                                </div>
                                                <ActionsCell row={{ original: event }} />
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
                                                        {event.interviewers.map((interviewer, idx) => (
                                                            <span key={idx} className="py-[3.75px] px-[6.25px] rounded-[5px] bg-[#ebebeb] text-[12px]/[12.5px] text-[#4b4b4b]">{interviewer}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}