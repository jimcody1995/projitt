'use client'
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertCircle, CalendarDays, X } from "lucide-react";
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

interface DetailProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setMessage: (message: string) => void;
}


export default function OffboardStart({ open, onOpenChange, setMessage }: DetailProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [preview, setPreview] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent close={false} className="p-0 w-full sm:w-[667px] sm:max-w-none gap-[0px]">
                    <div className="p-[32px] border-b border-[#e9e9e9]  bg-[#f7f7f7]">
                        <div className="w-full justify-between flex items-center">
                            <div className="flex flex-col">
                                <p className="text-[22px]/[30px] font-semibold text-[#353535]">Offboard: Alice Fernadez</p>
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
                    <div className="pb-[22px] px-[32px] w-full flex flex-col items-start">

                        <div className="mt-[20px]">
                            <Label className="text-[14px]/[16px]">Exit Type</Label>
                            <RadioGroup defaultValue="voluntary_resignation" className="mt-[9px]">
                                <div className="grid grid-cols-1 gap-[8px]">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="voluntary_resignation" id="voluntary_resignation" />
                                        <Label htmlFor="voluntary_resignation" className="text-[12px]/[18px] text-[#4b4b4b]">Voluntary Resignation</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="termination" id="termination" />
                                        <Label htmlFor="termination" className="text-[12px]/[18px] text-[#4b4b4b]">Termination</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="layoff_redundancy" id="layoff_redundancy" />
                                        <Label htmlFor="layoff_redundancy" className="text-[12px]/[18px] text-[#4b4b4b]">Layoff/Redundancy</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="contract_end" id="contract_end" />
                                        <Label htmlFor="contract_end" className="text-[12px]/[18px] text-[#4b4b4b]">Contract Ended</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="retirement" id="retirement" />
                                        <Label htmlFor="retirement" className="text-[12px]/[18px] text-[#4b4b4b]">Retirement</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                        <Label className="text-[14px]/[24px] text-[#1C1C1C] mt-[20px]">Enter Reason here</Label>
                        <Input type="input" className="h-[48px] mt-[20px]" placeholder="Enter offboarding reason" />
                        <Label className="text-[14px]/[24px] mt-[20px] mb-[12px]">Last Working Day</Label>
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
                                    {selectedDate ? moment(selectedDate).format('MMM DD, YYYY') : '10 June 2025'}
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
                        <Label className="text-[14px]/[16px] text-[#1C1C1C] mt-[20px]" data-testid="offboarding-activities-label" id="offboarding-activities-label">Offboarding Activities</Label>
                        <div className="grid grid-cols-1 gap-[12px] mt-[12px]">
                            <div className="flex items-center gap-[8px]" data-testid="activity-item-email-deactivation" id="activity-item-email-deactivation">
                                <Checkbox className="size-[24px] text-[#0d978b]" data-testid="activity-checkbox-email-deactivation" id="activity-checkbox-email-deactivation" />
                                <p className="text-[12px]/[18px] text-[#4b4b4b]" data-testid="activity-text-email-deactivation">Email Deactivation</p>
                            </div>
                            <div className="flex items-center gap-[8px]" data-testid="activity-item-assets-returned" id="activity-item-assets-returned">
                                <Checkbox className="size-[24px] text-[#0d978b]" data-testid="activity-checkbox-assets-returned" id="activity-checkbox-assets-returned" />
                                <p className="text-[12px]/[18px] text-[#4b4b4b]" data-testid="activity-text-assets-returned">Assets Returned</p>
                            </div>
                            <div className="flex items-center gap-[8px]" data-testid="activity-item-documents-signed" id="activity-item-documents-signed">
                                <Checkbox className="size-[24px] text-[#0d978b]" data-testid="activity-checkbox-documents-signed" id="activity-checkbox-documents-signed" />
                                <p className="text-[12px]/[18px] text-[#4b4b4b]" data-testid="activity-text-documents-signed">Documents Signed</p>
                            </div>
                            <div className="flex items-center gap-[8px]" data-testid="activity-item-exit-interview-submitted" id="activity-item-exit-interview-submitted">
                                <Checkbox className="size-[24px] text-[#0d978b]" data-testid="activity-checkbox-exit-interview-submitted" id="activity-checkbox-exit-interview-submitted" />
                                <p className="text-[12px]/[18px] text-[#4b4b4b]" data-testid="activity-text-exit-interview-submitted">Exit Interview Submitted</p>
                            </div>
                            <div className="flex items-center gap-[8px]" data-testid="activity-item-final-pay-confirmed" id="activity-item-final-pay-confirmed">
                                <Checkbox className="size-[24px] text-[#0d978b]" data-testid="activity-checkbox-final-pay-confirmed" id="activity-checkbox-final-pay-confirmed" />
                                <p className="text-[12px]/[18px] text-[#4b4b4b]" data-testid="activity-text-final-pay-confirmed">Final Pay Confirmed</p>
                            </div>
                        </div>
                        <Button
                            className="w-[181px] h-[42px] mt-[20px]"
                            onClick={() => setConfirmModal(true)}
                        >
                            Start Offboarding
                        </Button>
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
            <Dialog open={confirmModal} onOpenChange={setConfirmModal}>
                <DialogContent className="w-[286px] h-[186px] p-0" close={false}>
                    <div className="flex flex-col items-center justify-center h-full p-6">
                        <div className="w-8 h-8 bg-[#d6eeec] rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="size-[20px] text-[#0d978b]" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1c1c1c] mb-6">Confirm Offboarding</h3>
                        <div className="flex gap-3 w-full">
                            <Button
                                variant="outline"
                                className="flex-1 h-10 rounded-[8px]"
                                onClick={() => setConfirmModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 h-10 rounded-[8px] bg-[#0d978b] hover:bg-[#0d978b]/90"
                                onClick={() => {
                                    setConfirmModal(false);
                                    // Add your offboarding logic here
                                    console.log('Offboarding confirmed');
                                }}
                            >
                                Yes, Confirm
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}