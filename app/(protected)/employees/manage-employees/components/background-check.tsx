'use client'
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CalendarDays, Search, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Message from "../../../recruitment/components/message";
import { Checkbox } from "@/components/ui/checkbox";
// Remove form imports as we're not using react-hook-form context
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/date-utils";

interface DetailProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setMessage: (message: string) => void;
}


export default function OffboardStart({ open, onOpenChange, setMessage }: DetailProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [preview, setPreview] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent close={false} className="p-0 w-full sm:w-[575px] sm:max-w-none  overflow-y-auto  gap-[0px]">
                    <div className="p-[32px] border-b border-[#e9e9e9]  bg-[#f7f7f7]  sticky top-0 z-10">
                        <div className="w-full justify-between flex items-center">
                            <div className="flex flex-col">
                                <p className="text-[22px]/[30px] font-semibold text-[#353535]">Background Checks</p>
                                <p className="text-[14px]/[22px] text-[#626262]">Senior Data Analyst ~ United States</p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                <X className="size-[14px] text-[#1a1a1a]" />
                            </Button>
                        </div>
                    </div>
                    <div className="m-[22px] flex pt-0 flex-col gap-[20px] md:w-[511px] w-full">
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C] mb-[6px]">Select Employee</p>
                            <div className="relative">
                                <Search
                                    className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                                    data-testid="search-icon"
                                />
                                <Input
                                    placeholder="Search by Employee Name or ID"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="ps-9 w-full h-[42px]"
                                    data-testid="search-input"
                                />
                                {searchQuery.length > 0 && (
                                    <Button
                                        mode="icon"
                                        variant="ghost"
                                        className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                                        onClick={() => setSearchQuery('')}
                                        data-testid="clear-search-button"
                                    >
                                        <X />
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C] mb-[6px]">SSN Last 4</p>
                            <Input type="input" className="h-[48px]" />
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Date of Birth</p>
                            <div className="relative mt-[6px]">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            mode="input"
                                            variant="outline"
                                            id="date"
                                            className={cn(
                                                'w-full h-[48px] border-[#bcbcbc] data-[state=open]:border-primary',
                                            )}
                                            data-test-id="certificate-issue-date"
                                        >
                                            <CalendarDays className="-ms-0.5" />
                                            {formatDate(new Date())}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="single"
                                            defaultMonth={new Date()}
                                            selected={new Date()}
                                            onSelect={(e) => {

                                            }}
                                            numberOfMonths={1}
                                            data-testid="start-date-calendar"
                                            id="start-date-calendar"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div data-testid="training-path-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="training-path-label" id="training-path-label">Regions</p>
                            <Select value="1" data-testid="training-path-select">
                                <SelectTrigger className="w-full h-[48px] mt-[6px] text-gray-800" data-testid="training-path-select-trigger" id="training-path-select-trigger">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent data-testid="training-path-select-content" id="training-path-select-content">
                                    <SelectItem value="1" data-testid="training-path-item-1" id="training-path-item-1">Medium</SelectItem>
                                    <SelectItem value="2" data-testid="training-path-item-2" id="training-path-item-2">Path 2</SelectItem>
                                    <SelectItem value="3" data-testid="training-path-item-3" id="training-path-item-3">Path 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div data-testid="training-path-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="training-path-label" id="training-path-label">Sensitivity</p>
                            <Select value="1" data-testid="training-path-select">
                                <SelectTrigger className="w-full h-[48px] mt-[6px] text-gray-800" data-testid="training-path-select-trigger" id="training-path-select-trigger">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent data-testid="training-path-select-content" id="training-path-select-content">
                                    <SelectItem value="1" data-testid="training-path-item-1" id="training-path-item-1">Medium</SelectItem>
                                    <SelectItem value="2" data-testid="training-path-item-2" id="training-path-item-2">Path 2</SelectItem>
                                    <SelectItem value="3" data-testid="training-path-item-3" id="training-path-item-3">Path 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-[6px]" data-testid="confirm-bg-checks">
                            <Checkbox className="size-[24px] text-[#0d978b]" />
                            <p className="text-[14px]/[16px] text-[#4b4b4b]" >I confirm I have candidate consent for background checks.</p>
                        </div>
                        <div data-testid="background-checks-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="background-checks-label" id="background-checks-label">Checks</p>
                            <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
                                <div className="flex items-center gap-[8px]" data-testid="check-item-criminal" id="check-item-criminal">
                                    <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-criminal" id="check-checkbox-criminal" />
                                    <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-criminal">Criminal</p>
                                </div>
                                <div className="flex items-center gap-[8px]" data-testid="check-item-employment" id="check-item-employment">
                                    <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-employment" id="check-checkbox-employment" />
                                    <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-employment">Employment</p>
                                </div>
                                <div className="flex items-center gap-[8px]" data-testid="check-item-education" id="check-item-education">
                                    <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-education" id="check-checkbox-education" />
                                    <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-education">Education</p>
                                </div>
                                <div className="flex items-center gap-[8px]" data-testid="check-item-identity" id="check-item-identity">
                                    <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-identity" id="check-checkbox-identity" />
                                    <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-identity">Identity</p>
                                </div>
                                <div className="flex items-center gap-[8px]" data-testid="check-item-credit" id="check-item-credit">
                                    <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-credit" id="check-checkbox-credit" />
                                    <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-credit">Credit</p>
                                </div>
                            </div>
                        </div>
                        <Button className="w-[181px] h-[42px] mt-[20px]">Start BackGround Check</Button>
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