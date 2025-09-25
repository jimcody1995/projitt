'use client'
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Message from "../../../recruitment/components/message";

interface DetailProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setMessage: (message: string) => void;
}

export default function Suspend({ open, onOpenChange, setMessage }: DetailProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [preview, setPreview] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent close={false} className="p-0 w-full sm:w-[667px] sm:max-w-none bg-[#f7f7f7] gap-[0px]">
                    <div className="p-[32px] border-b border-[#e9e9e9]">
                        <div className="w-full justify-between flex items-center">
                            <div className="flex flex-col">
                                <p className="text-[16px]/[20px] font-semibold text-[#353535]">Suspend: Alice Fernadez</p>
                                <p className="text-[14px]/[16px] text-[#626262]">Senior Data Analyst ~ United States</p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                <X className="size-[14px] text-[#1a1a1a]" />
                            </Button>
                        </div>
                    </div>
                    <div className="py-[22px] px-[32px] w-full flex flex-col items-start">
                        <p className="text-[14px]/[24px] text-[#8f8f8f]">This will temporarily restrict Alice Fernadez access to all company systems. They will no longer appear in active workflows or receive internal communications unless reinstated.</p>
                        <Label className="text-[14px]/[24px] text-[#8f8f8f] mt-[20px]">Suspension Reason</Label>
                        <Select defaultValue="disciplinary-investigation">
                            <SelectTrigger className="w-full mt-[6px] h-[48px]">
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="disciplinary-investigation">Disciplinary Investigation</SelectItem>
                                <SelectItem value="performance-issues">Performance Issues</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label className="text-[14px]/[24px] text-[#8f8f8f] mt-[20px]">Suspension Type</Label>
                        <Select defaultValue="paid-suspension">
                            <SelectTrigger className="w-full mt-[6px] h-[48px]">
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paid-suspension">Paid Suspension</SelectItem>
                                <SelectItem value="unpaid-suspension">Unpaid Suspension</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label className="text-[14px]/[24px] text-[#8f8f8f] mt-[20px]">Effective Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className={cn(
                                        'w-full flex justify-start h-[48px] data-[state=open]:border-primary rounded-[10px] border-[#bcbcbc]',
                                    )}
                                >
                                    <CalendarDays className="-ms-0.5" />
                                    {selectedDate ? moment(selectedDate).format('MMM DD, YYYY') : 'Pick a date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    defaultMonth={selectedDate || new Date()}
                                    selected={selectedDate}
                                    onSelect={handleDateChange}
                                    numberOfMonths={1}
                                />
                            </PopoverContent>
                        </Popover>
                        <div className="flex justify-between items-center mt-[20px] w-full">
                            <p className="text-[14px]/[16px] text-[#000]">Notify Employee</p>
                            <Switch className="w-[52px] h-[28px]" />
                        </div>
                        <Label className="text-[14px]/[24px] text-[#8f8f8f] mt-[22px]">Select Email Template</Label>
                        <Select defaultValue="offer-letter">
                            <SelectTrigger className="w-full mt-[6px] h-[48px]">
                                <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="offer-letter">Offer Letter </SelectItem>
                                <SelectItem value="termination-letter">Termination Letter</SelectItem>
                            </SelectContent>
                        </Select>
                        <button className="text-[14px]/[24px] text-[#0d978b] underline mt-[8px] cursor-pointer" onClick={() => setPreview(true)}>Preview/Edit Email</button>
                        <Button className="w-[150px] h-[42px] mt-[57px]" onClick={() => setMessage("Confirm Suspension")}>Suspend</Button>
                    </div>
                </SheetContent>
            </Sheet>
            <Dialog open={preview} onOpenChange={setPreview}>
                <DialogContent className="md:max-w-[830px] w-full">
                    <DialogTitle></DialogTitle>
                    <div>
                        <div className="flex justify-between">
                            <p className="text-[22px]/[30px] font-medium text-[#1c1c1c]"> Offer Letter Template</p>
                            <div className="flex flex-col gap-[4px] items-end">
                                <span className="text-[12px]/[20px] text-[#0d978b] bg-[#d6eeec] px-[12px] py-[2px] rounded-[4px]">Offer Letter</span>
                                <span className="text-[12px]/[20px] text-[#626262]">Default</span>
                            </div>
                        </div>
                        <div className="w-full border border-[#e9e9e9] mt-[28px] rounded-[12px] h-[600px]">
                            <div className="p-[24px] bg-[#f9f9f9] w-full">
                                <p className="text-[18px]/[24px] font-medium text-[#1c1c1c]">Message Title</p>
                            </div>
                            <div className="p-[33px]">
                                Hello,
                                Hello,
                                Hello,
                                Hello,
                                Hello,
                                Hello,
                                Hello,
                            </div>
                        </div>
                        <div className="flex justify-end gap-[16px] pt-[28px] ">
                            <Button variant="outline" className="h-[42px]" onClick={() => setPreview(false)}>Go Back</Button>
                            <Button className="h-[42px]" onClick={() => setIsEdit(true)}>Edit Message</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Message
                open={isEdit}
                onOpenChange={setIsEdit}
            />
        </div>
    );
}