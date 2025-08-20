import { ArrowLeft, ChevronDown, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { formatDateYYYYMMDD, formatTimeTo24Hour, formatDateWithComma } from '@/lib/date-utils';
import { Calendar } from "@/components/ui/calendar";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DialogContent, { Dialog, div, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { addInterview } from "@/api/interviews";
import { customToast } from "@/components/common/toastr";

interface ScheduleInterviewProps {
    setActive: (section: 'stages' | 'application-summary' | 'resume' | 'applicant-question' | 'schedule-interview') => void;
    onOpenChange: (open: boolean) => void;
    selectedApplication: any | null;
}
export default function ScheduleInterview({ setActive, onOpenChange, selectedApplication }: ScheduleInterviewProps) {
    const [schedulingType, setSchedulingType] = useState<'propose_time' | 'request_availability'>('propose_time');
    const [mode, setMode] = useState<'google_meet' | 'zoom' | 'projitt_video_conference' | 'microsoft_team'>('zoom');
    const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined } | undefined>(undefined)
    const now = new Date();
    const [selectedHour, setSelectedHour] = useState<string | null>(now.getHours() % 12 === 0 ? '12' : (now.getHours() % 12).toString().padStart(2, '0'));
    const [selectedMinute, setSelectedMinute] = useState<string | null>(now.getMinutes().toString().padStart(2, '0'));
    const [selectedAmPm, setSelectedAmPm] = useState<string | null>(now.getHours() >= 12 ? 'PM' : 'AM');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [availableDate, setAvailableDate] = useState<Array<{ from: Date; to: Date; hour: string; minute: string; amPm: string }>>([]);
    const [interviewers, setInterviewers] = useState<Array<{ id: string, name: string }>>([
        {
            id: '1',
            name: 'Abubakar Ali',
        },
        {
            id: '2',
            name: 'Steve Larry',
        },
    ]);
    const [selectedInterviewers, setSelectedInterviewers] = useState<Array<string>>([]);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const handleInterviewersChange = (checked: boolean, id: string) => {
        if (checked) {
            setSelectedInterviewers((prev) => [...prev, id]);
        } else {
            setSelectedInterviewers((prev) => prev.filter((interviewer) => interviewer !== id));
        }
    };
    const [isSent, setIsSent] = useState<boolean>(false);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                schedule_type: schedulingType,
                mode,
                interviewers_ids: [2, 5, 7],
                message,
                job_id: selectedApplication?.job_id,
                applicant_id: selectedApplication?.applicant_id,
                date: schedulingType === 'propose_time' ? formatDateYYYYMMDD(range?.from) : undefined,
                time: schedulingType === 'propose_time' ? formatTimeTo24Hour(`${selectedHour}:${selectedMinute} ${selectedAmPm}`) : undefined,
            }
            await addInterview(payload);
            setIsSent(true)
        } catch (error: any) {
            if (error?.response?.data?.message) {
                customToast('Error', error.response.data.message, "error");
            } else {
                customToast('Error', 'An error occurred', "error");
            }
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-white w-full px-[16px]  sm:px-[164px] py-[28px] overflow-y-auto flex-1">
            <div >
                <button className="flex gap-[10px]" onClick={() => { setActive('stages') }}><ArrowLeft className="size-[20px] text-[#4b4b4b]" /> <span className="text-[#353535] text-[14px]/[22px]">Go Back</span></button>
                <div className="flex gap-[24px] flex-col mt-[28px]">
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Interview Scheduling Type</p>
                        <Select value={schedulingType} onValueChange={(value) => setSchedulingType(value as 'propose_time' | 'request_availability')}>
                            <SelectTrigger className="mt-[12px] h-[48px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="propose_time">Propose Time</SelectItem>
                                <SelectItem value="request_availability">Request Availability</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Select Mode</p>
                        <Select value={mode} onValueChange={(value) => setMode(value as 'google_meet' | 'zoom' | 'projitt_video_conference' | 'microsoft_team')}>
                            <SelectTrigger className="mt-[12px] h-[48px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="google_meet">
                                    <div className="flex gap-[10px] items-center">
                                        <img src="/images/meeting/google.png" className="size-[20px]" alt="" />Google Meet
                                    </div>
                                </SelectItem>
                                <SelectItem value="zoom">
                                    <div className="flex gap-[10px] items-center">
                                        <img src="/images/meeting/zoom.png" className="size-[20px]" alt="" />Zoom
                                    </div>
                                </SelectItem>
                                <SelectItem value="projitt_video_conference">
                                    <div className="flex gap-[10px] items-center">
                                        <img src="/images/meeting/projit.png" className="size-[20px]" alt="" />Projitt Video Conferencing
                                    </div>
                                </SelectItem>
                                <SelectItem value="microsoft_team">
                                    <div className="flex gap-[10px] items-center">
                                        <img src="/images/meeting/team.png" className="size-[20px]" alt="" />Microsoft Teams
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {schedulingType === 'propose_time' && <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Select Available Date & Time</p>
                        <Popover open={isOpen} onOpenChange={setIsOpen}>
                            <PopoverTrigger asChild className="mt-[12px]">
                                <Button
                                    mode="input"
                                    variant="outline"
                                    id="date"
                                    className={cn(
                                        'w-full h-[48px] flex gap-[12px] border-[#bcbcbc] data-[state=open]:border-primary',
                                    )}
                                    data-test-id="certificate-issue-date"
                                >
                                    <CalendarDays className="-ms-0.5" />
                                    Choose Date
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    defaultMonth={new Date()}
                                    selected={range?.from}
                                    onSelect={(date) => setRange(date ? { from: date, to: date } : undefined)}
                                    numberOfMonths={1}
                                    classNames={{
                                        day_button: 'cursor-pointer relative flex w-full mx-auto  w-[40px] h-[40px] items-center justify-center whitespace-nowrap rounded-md p-0 transition-200 group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 group-data-disabled:pointer-events-none focus-visible:z-10 hover:not-in-data-selected:bg-[#D6EEEC] group-data-selected:bg-[#0D978B] hover:not-in-data-selected:text-foreground group-data-selected:text-[#fff] group-data-disabled:text-foreground/30 group-data-disabled:line-through group-data-outside:text-foreground/30 group-data-selected:group-data-outside:text-primary-foreground outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-[.range-middle]:group-data-selected:bg-[#D6EEEC] group-[.range-middle]:group-data-selected:text-[#787878]',
                                        day: 'group w-[42px] h-[42px] py-px text-sm'
                                    }}
                                />
                                <div className="flex gap-2 p-4 justify-center">
                                    {/* Hour Select */}
                                    <Select defaultValue={selectedHour || undefined} onValueChange={(value) => setSelectedHour(value)}>
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue placeholder="HH" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 12 }, (_, i) => {
                                                const hour = i + 1;
                                                const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
                                                return (
                                                    <SelectItem key={hourStr} value={hourStr}>
                                                        {hourStr}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <span className="text-[16px] flex items-center">:</span>
                                    {/* Minute Select */}
                                    <Select defaultValue={selectedMinute || undefined} onValueChange={(value) => setSelectedMinute(value)}>
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue placeholder="MM" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 60 }, (_, i) => {
                                                const minStr = i < 10 ? `0${i}` : `${i}`;
                                                return (
                                                    <SelectItem key={minStr} value={minStr}>
                                                        {minStr}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    {/* AM/PM Select */}
                                    <Select defaultValue={selectedAmPm || undefined} onValueChange={(value) => setSelectedAmPm(value)}>
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue placeholder="AM/PM" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AM">AM</SelectItem>
                                            <SelectItem value="PM">PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="p-[16px] flex gap-[12px] border-t border-[#e9e9e9]">
                                    <Button variant="outline" className="w-full" onClick={() => {
                                        setIsOpen(false);
                                    }}>
                                        Close
                                    </Button>
                                    <Button className="w-full" onClick={() => {
                                        if (range && range.from && range.to && selectedHour && selectedMinute && selectedAmPm) {
                                            setAvailableDate([...availableDate, { from: range.from, to: range.to, hour: selectedHour, minute: selectedMinute, amPm: selectedAmPm }]);
                                        }
                                    }}>
                                        Select
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="flex flex-col gap-[11px] mt-[11px] items-start">
                            {availableDate.map((date, index) => (
                                <div key={index} className="flex gap-[8px] py-[6px] px-[10px] text-[#0d978b] rounded-[8px] bg-[#d6eeec]">
                                    <span className="text-[14px]/[20px]">{formatDateWithComma(date.from)} {date.hour}:{date.minute} {date.amPm}</span>
                                    <button onClick={() => {
                                        setAvailableDate(availableDate.filter((_, i) => i !== index));
                                    }}><X className="size-[16px]" /></button>
                                </div>
                            ))}
                        </div>
                    </div>}
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Select Interviewers</p>
                        <Popover>
                            <PopoverTrigger asChild className="mt-[12px]">
                                <Button
                                    mode="input"
                                    variant="outline"
                                    id="date"
                                    className={cn(
                                        'w-full h-[48px] flex gap-[12px] border-[#bcbcbc] data-[state=open]:border-primary',
                                    )}
                                    data-test-id="certificate-issue-date"
                                >
                                    <span className="flex-1 text-start">Select Interviewers</span>
                                    <ChevronDown className="size-[16px]" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0" align="start">
                                <div className="p-[16px] flex flex-col gap-[12px]">
                                    {interviewers.map((interviewer) => (
                                        <div key={interviewer.id} className="flex items-center space-x-2">
                                            <Checkbox id={interviewer.id} onCheckedChange={(checked) => handleInterviewersChange(checked as boolean, interviewer.id)} />
                                            <Label htmlFor={interviewer.id}>{interviewer.name}</Label>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="flex gap-[11px] mt-[11px] items-start w-full flex-wrap">
                            {selectedInterviewers.map((interviewer, index) => (
                                <div key={index} className="flex gap-[8px] py-[6px] px-[10px] text-[#0d978b] rounded-[8px] bg-[#d6eeec]">
                                    <span className="text-[14px]/[20px]">{interviewers.find((i) => i.id === interviewer)?.name}</span>
                                    <button onClick={() => {
                                        setSelectedInterviewers(selectedInterviewers.filter((_, i) => i !== index));
                                    }}><X className="size-[16px]" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Add message (optional)</p>
                        <Textarea className="w-full mt-[12px] h-[70px] border border-[#d2d2d2] rounded-[8px] p-[12px]" placeholder="Enter message" onChange={(e) => setMessage(e.target.value)}></Textarea>
                    </div>
                    <div>
                        {schedulingType === 'propose_time' && <Button className="w-full mt-[12px] h-[48px]" onClick={() => handleSubmit()}>Schedule Interview Invite</Button>}
                        {schedulingType === 'request_availability' && <Button className="w-full mt-[12px] h-[48px]" onClick={() => handleSubmit()}>Send Request</Button>}
                    </div>
                </div>
            </div >
            <Dialog open={isSent} onOpenChange={setIsSent}>
                <DialogContent close={false}>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <div className="flex flex-col items-center">
                            <img src="/images/applicant/success.png" alt="" className="w-[120px] h-[120px]" />
                            <span className="text-[28px]/[36px] font-semibold mt-[28px] text-[#353535]">{schedulingType === 'propose_time' ? 'Interview Invite Sent' : 'Availability Request Sent'}</span>
                            <span className="text-[14px]/[24px] text-[#626262] mt-[8px] text-center">{schedulingType === 'propose_time' ? 'Your interview request has been sent to Alice Fernadez. They have been invited to confirm the proposed time.' : 'We have asked Alice Fernadez to share their availability. You will be notified once they submit their preferred time slots.'}</span>
                            <Button className="mt-[24px] w-[300px] h-[42px]" onClick={() => { setIsSent(false); onOpenChange(false); }}>Return to Applicants List</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div >
    );
}