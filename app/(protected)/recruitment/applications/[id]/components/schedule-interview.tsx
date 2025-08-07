import { ArrowLeft, ChevronDown, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DialogContent, { Dialog, div, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ScheduleInterviewProps {
    setActive: (section: string) => void;
    onOpenChange: (open: boolean) => void;
}
export default function ScheduleInterview({ setActive, onOpenChange }: ScheduleInterviewProps) {
    const [schedulingType, setSchedulingType] = useState<'propose-time' | 'request-availability'>('propose-time');
    const [mode, setMode] = useState<'google' | 'zoom' | 'projitt' | 'teams'>('google');
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({})
    const [selectedHour, setSelectedHour] = useState<string | null>(moment().format("hh"));
    const [selectedMinute, setSelectedMinute] = useState<string | null>(moment().format("mm"));
    const [selectedAmPm, setSelectedAmPm] = useState<string | null>(moment().format("A"));
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
    const handleInterviewersChange = (checked: boolean, id: string) => {
        if (checked) {
            setSelectedInterviewers((prev) => [...prev, id]);
        } else {
            setSelectedInterviewers((prev) => prev.filter((interviewer) => interviewer !== id));
        }
    };
    const [isSent, setIsSent] = useState<boolean>(false);
    return (
        <div className="bg-white w-full px-[164px] py-[28px] overflow-y-auto flex-1">
            <div >
                <button className="flex gap-[10px]" onClick={() => { setActive('stages') }}><ArrowLeft className="size-[20px] text-[#4b4b4b]" /> <span className="text-[#353535] text-[14px]/[22px]">Go Back</span></button>
                <div className="flex gap-[24px] flex-col mt-[28px]">
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Interview Scheduling Type</p>
                        <Select value={schedulingType} onValueChange={(value) => setSchedulingType(value as 'propose-time' | 'request-availability')}>
                            <SelectTrigger className="mt-[12px] h-[48px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="propose-time">Propose Time</SelectItem>
                                <SelectItem value="request-availability">Request Availability</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Select Mode</p>
                        <Select value={mode} onValueChange={(value) => setMode(value as 'google' | 'zoom' | 'projitt' | 'teams')}>
                            <SelectTrigger className="mt-[12px] h-[48px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="google">
                                    <div className="flex gap-[10px] items-center">
                                        <img src="/images/meeting/google.png" className="size-[20px]" alt="" />Google Meet
                                    </div>
                                </SelectItem>
                                <SelectItem value="zoom">
                                    <div className="flex gap-[10px] items-center">
                                        <img src="/images/meeting/zoom.png" className="size-[20px]" alt="" />Zoom
                                    </div>
                                </SelectItem>
                                <SelectItem value="projitt">
                                    <div className="flex gap-[10px] items-center">
                                        <img src="/images/meeting/projit.png" className="size-[20px]" alt="" />Projitt Video Conferencing
                                    </div>
                                </SelectItem>
                                <SelectItem value="teams">
                                    <div className="flex gap-[10px] items-center">
                                        <img src="/images/meeting/team.png" className="size-[20px]" alt="" />Microsoft Teams
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {schedulingType === 'propose-time' && <div>
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

                                    initialFocus
                                    mode="range"
                                    defaultMonth={new Date()}
                                    selected={range}
                                    onSelect={setRange}
                                    numberOfMonths={1}
                                    classNames={{
                                        day_button: 'cursor-pointer relative flex w-full mx-auto  size-6 items-center justify-center whitespace-nowrap rounded-md p-0 transition-200 group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 group-data-disabled:pointer-events-none focus-visible:z-10 hover:not-in-data-selected:bg-[#D6EEEC] group-data-selected:bg-[#0D978B] hover:not-in-data-selected:text-foreground group-data-selected:text-[#fff] group-data-disabled:text-foreground/30 group-data-disabled:line-through group-data-outside:text-foreground/30 group-data-selected:group-data-outside:text-primary-foreground outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-[.range-middle]:group-data-selected:bg-[#D6EEEC] group-[.range-middle]:group-data-selected:text-[#787878]'
                                    }}
                                />
                                <div className="flex gap-2 p-4 justify-center">
                                    {/* Hour Select */}
                                    <Select defaultValue={moment().format("hh")} onValueChange={(value) => setSelectedHour(value)}>
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
                                    <Select defaultValue={moment().format("mm")} onValueChange={(value) => setSelectedMinute(value)}>
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
                                    <Select defaultValue={moment().format("A")} onValueChange={(value) => setSelectedAmPm(value)}>
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
                                        if (range.from && range.to && selectedHour && selectedMinute && selectedAmPm) {
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
                                    <span className="text-[14px]/[20px]">{
                                        `${moment(date.from).format('DD MMM')} - ${moment(date.to).format('DD MMM')}` + ' ' +
                                        `${date.hour}:${date.minute} ${date.amPm}`
                                    }</span>
                                    <button onClick={() => {
                                        setAvailableDate(availableDate.filter((_, i) => i !== index));
                                    }}><X className="size-[16px]" /></button>
                                </div>
                            ))}
                        </div>
                    </div>}
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Add Interviewers</p>
                        <Popover>
                            <PopoverTrigger asChild className="w-full mt-[12px]">
                                <div
                                    className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] justify-between items-center h-[48px]"
                                    id="filter-locations-trigger"
                                    data-testid="filter-locations-trigger"
                                >
                                    <span className="text-[14px]/[20px] text-[#787878]">
                                        Communical
                                    </span>
                                    <ChevronDown
                                        className="size-[18px] text-[#4b4b4b]"
                                        id="filter-locations-chevron"
                                        data-testid="filter-locations-chevron"
                                    />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-[330px] p-3"
                                align="start"
                                id="filter-locations-content"
                                data-testid="filter-locations-content"
                            >
                                <div className="space-y-3">
                                    {interviewers.map((interviewer: { id: string, name: string }, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2.5"
                                            id={`filter-location-item-${index}`}
                                            data-testid={`filter-location-item-${index}`}
                                        >
                                            <Checkbox
                                                id={`filter-location-checkbox-${index}`}
                                                checked={selectedInterviewers.includes(interviewer.id)}
                                                onCheckedChange={(checked) =>
                                                    handleInterviewersChange(checked === true, interviewer.id)
                                                }
                                                data-testid={`filter-location-checkbox-${index}`}
                                            />
                                            <Label
                                                htmlFor={`filter-location-checkbox-${index}`}
                                                className="grow flex items-center justify-between font-normal gap-1.5"
                                            >
                                                {interviewer.name}
                                            </Label>
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
                        <Textarea className="w-full mt-[12px] h-[70px] border border-[#d2d2d2] rounded-[8px] p-[12px]" placeholder="Enter message"></Textarea>
                    </div>
                    <div>
                        {schedulingType === 'propose-time' && <Button className="w-full mt-[12px] h-[48px]" onClick={() => setIsSent(true)}>Schedule Interview Invite</Button>}
                        {schedulingType === 'request-availability' && <Button className="w-full mt-[12px] h-[48px]" onClick={() => setIsSent(true)}>Send Request</Button>}
                    </div>
                </div>
            </div >
            <Dialog open={isSent} onOpenChange={setIsSent}>
                <DialogContent close={false}>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <div className="flex flex-col items-center">
                            <img src="/images/applicant/success.png" alt="" className="w-[120px] h-[120px]" />
                            <span className="text-[28px]/[36px] font-semibold mt-[28px] text-[#353535]">{schedulingType === 'propose-time' ? 'Interview Invite Sent' : 'Availability Request Sent'}</span>
                            <span className="text-[14px]/[24px] text-[#626262] mt-[8px] text-center">{schedulingType === 'propose-time' ? 'Your interview request has been sent to Alice Fernadez. They’ve been invited to confirm the proposed time.' : 'We’ve asked Alice Fernadez to share their availability. You’ll be notified once they submit their preferred time slots.'}</span>
                            <Button className="mt-[24px] w-[300px] h-[42px]" onClick={() => { setIsSent(false); onOpenChange(false); }}>Return to Applicants List</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div >
    );
}