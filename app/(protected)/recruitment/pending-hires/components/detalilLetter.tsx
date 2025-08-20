'use client';

import React, { JSX, useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CirclePlus, MoreVertical, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/lib/date-utils";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Message from "../../components/message";
import FileDropUpload from "./file-drop-upload";

/**
 * @description
 * DetailLetter is a component that provides a comprehensive interface for generating and sending a job offer letter.
 * It appears as a sheet that slides in from the side, allowing the user to configure all aspects of the offer.
 * This includes setting a start date and an offer expiry date, choosing between a system-generated or manually uploaded letter,
 * defining work location, hours, benefits, and a detailed earning structure.
 * The component also features nested dialogs for a final hiring confirmation, a preview of the email, and an rich text editor to make changes before sending.
 * All interactive elements and key information displays are equipped with unique `data-testid` attributes to facilitate UI test automation.
 */
interface DetailLetterProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DetailLetter({ open, onOpenChange }: DetailLetterProps) {
    const [leaves, setLeaves] = useState<{ id: string, name: string }[]>([
        { id: '1', name: 'Sick Leave for Executives (15days/yr)' },
        { id: '2', name: 'Vacation Leaves (7days/yr)' },
    ]);
    const [selectedLeaves, setSelectedLeaves] = useState<string[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [preview, setPreview] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedOfferMethod, setSelectedOfferMethod] = useState<string>('system-generated');
    const [file, setFile] = useState<File | null>(null);
    const [id, setID] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [offerExpiryDate, setOfferExpiryDate] = useState<Date | undefined>(new Date());


    /**
     * @description
     * Handles the selection and deselection of leave benefits.
     * It adds or removes the leave's ID from the `selectedLeaves` state array.
     * @param {boolean} checked - Indicates whether the checkbox is checked.
     * @param {string} id - The unique ID of the leave item.
     */
    const handleLeavesChange = (checked: boolean, id: string) => {
        if (checked) {
            setSelectedLeaves((prev) => [...prev, id]);
        } else {
            setSelectedLeaves((prev) => prev.filter((leave) => leave !== id));
        }
    };

    const [earnings, setEarnings] = useState<{ id: number, category: string, amount: number, completed: boolean }[]>([
        {
            id: 1,
            category: 'Monthly Texable',
            amount: 100,
            completed: true
        }
    ]);

    /**
     * @description
     * Updates the category or amount of a specific earning entry in the `earnings` state.
     * @param {string} value - The new value for the field.
     * @param {string} type - The type of field to update ('category' or 'amount').
     * @param {number} id - The unique ID of the earning entry.
     */
    const handleEarningChange = (value: string, type: string, id: number) => {
        setEarnings((prev) =>
            prev.map((earning) =>
                earning.id === id ? { ...earning, [type]: value } : earning
            )
        );
    };

    /**
     * @description
     * Adds a new, empty earning entry to the `earnings` state array, allowing the user to define a new earning category and amount.
     */
    const handleAddNew = () => {
        setEarnings((prev) => [...prev, { id: prev.length + 1, category: '', amount: 0, completed: false }]);
    };

    /**
     * @description
     * Marks a specific earning entry as "completed," which typically indicates that the user has finished editing it.
     * @param {number} id - The unique ID of the earning entry to mark as complete.
     */
    const handleEarningComplete = (id: number) => {
        setEarnings((prev) =>
            prev.map((earning) =>
                earning.id === id ? { ...earning, completed: true } : earning
            )
        );
    };

    /**
     * @description
     * A side effect that recalculates the total sum of all completed earnings whenever the `earnings` state array is updated.
     */
    useEffect(() => {
        const total = earnings.reduce((acc, earning) => acc + (earning.completed ? earning.amount * 1 : 0), 0);
        setTotal(total);
    }, [earnings]);

    return (
        <div>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent close={false} className="p-0 sm:w-[667px] w-full sm:max-w-none bg-[#f7f7f7] gap-[0px]">
                    <div className="px-[32px] py-[24px]">
                        <div className="w-full justify-between flex">
                            <div className="flex items-center gap-[10px]">
                                <Button
                                    mode="icon"
                                    variant="outline"
                                    data-testid="previous-applicant-button"
                                    id="previous-applicant-button"
                                >
                                    <ChevronLeft className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                                <Button
                                    mode="icon"
                                    variant="outline"
                                    data-testid="next-applicant-button"
                                    id="next-applicant-button"
                                >
                                    <ChevronRight className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <span className="text-[14px] text-[#626262]" data-testid="applicant-job-title" id="applicant-job-title">Senior Data Analyst ~ United States</span>
                                <Button
                                    mode="icon"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    data-testid="close-sheet-button"
                                    id="close-sheet-button"
                                >
                                    <X className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-[14px]/[22px] text-[#8f8f8f] mt-[16px]" data-testid="applicant-id">#E003</p>
                        <div className="flex items-center justify-between">
                            <div data-testid="applicant-info">
                                <p className="text-[22px]/[30px] font-medium flex items-center gap-[6px]" data-testid="applicant-name" id="applicant-name">Alice Fernadez</p>
                                <p className="text-[14px]/[22px] text-[#626262]" data-testid="applicant-role-location" id="applicant-role-location">Senior Data Analyst ~ United States</p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-[150px] h-[42px]" data-testid="continue-button" id="continue-button">
                                        Continue
                                    </Button>
                                </DialogTrigger>
                                <DialogContent close={false} data-testid="hire-applicant-dialog" id="hire-applicant-dialog">
                                    <DialogTitle></DialogTitle>
                                    <div className="flex flex-col">
                                        <img src="/images/applicant/check.png" alt="" className="w-[95px] h-[95px] mx-auto" data-testid="check-image" />
                                        <span className="text-[28px]/[36px] font-semibold mt-[28px] text-[#353535] text-center" data-testid="hire-applicant-title" id="hire-applicant-title">Hire Applicant</span>
                                        <span className="text-[14px]/[24px] text-[#626262] mt-[8px] text-center" data-testid="hire-applicant-message" id="hire-applicant-message">You're about to send an offer to this applicant they will be moved to onboarding once accepted</span>
                                        <span className="mt-[28px] text-[14px]/[24px] text-[#8f8f8f]" data-testid="email-template-label" id="email-template-label">Select an email template</span>
                                        <Select data-testid="email-template-select">
                                            <SelectTrigger className="w-full h-[42px]" data-testid="email-template-select-trigger" id="email-template-select-trigger">
                                                <SelectValue placeholder="Offer Letter Template" />
                                            </SelectTrigger>
                                            <SelectContent data-testid="email-template-select-content" id="email-template-select-content">
                                                <button className="flex w-full items-center gap-[5px] cursor-pointer h-[42px] text-[#0d978b] hover:text-[#3c8b85] ml-[20px]" data-testid="add-template-button" id="add-template-button">
                                                    <CirclePlus className="size-[20px] " />
                                                    <span className="text-[14px]/[24px]">Add Template</span>
                                                </button>
                                                <SelectItem value="1" data-testid="template-item-1" id="template-item-1">Reject Letter</SelectItem>
                                                <SelectItem value="2" data-testid="template-item-2" id="template-item-2">Accept Letter</SelectItem>
                                                <SelectItem value="3" data-testid="template-item-3" id="template-item-3">Appointment Letter</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <button className="text-[14px]/[24px] text-[#0d978b] underline mt-[6px] text-start cursor-pointer" onClick={() => setPreview(true)} data-testid="preview-edit-email-button" id="preview-edit-email-button">Preview/Edit Email</button>
                                        <div className="flex items-center gap-[12px] mt-[28px] w-full">
                                            <Button variant="outline" className="w-full h-[42px]" data-testid="cancel-hire-button" id="cancel-hire-button">Cancel</Button>
                                            <Button className="bg-[#0D978B] hover:bg-[#0D978B] w-full h-[42px]" data-testid="send-offer-button" id="send-offer-button">Send Offer</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                    </div>
                    <div className="border-t border-[#e9e9e9] bg-white py-[29px] pl-[32px] md:pr-[79px] pr-[20px] flex flex-col gap-[28px] overflow-y-auto">
                        <div data-testid="start-date-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="start-date-label" id="start-date-label">Select Start Date</p>
                            <div className="relative mt-[12px]">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            mode="input"
                                            variant="outline"
                                            id="start-date-picker-button"
                                            className={cn(
                                                'w-full h-[48px] border-[#bcbcbc] data-[state=open]:border-primary',
                                                !startDate && 'text-muted-foreground'
                                            )}
                                            data-testid="start-date-picker-button"
                                        >
                                            <CalendarDays className="-ms-0.5" />
                                            {startDate ? formatDate(startDate) : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start" data-testid="start-date-calendar-popover" id="start-date-calendar-popover">
                                        <Calendar
                                            initialFocus
                                            mode="single"
                                            defaultMonth={startDate}
                                            selected={startDate}
                                            onSelect={(newDate) => {
                                                setStartDate(newDate);
                                            }}
                                            numberOfMonths={1}
                                            data-testid="start-date-calendar"
                                            id="start-date-calendar"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div data-testid="offer-expiry-date-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="offer-expiry-date-label" id="offer-expiry-date-label">Offer Expiry Date</p>
                            <div className="relative mt-[12px]">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            mode="input"
                                            variant="outline"
                                            id="offer-expiry-date-picker-button"
                                            className={cn(
                                                'w-full h-[48px] border-[#bcbcbc] data-[state=open]:border-primary',
                                                !offerExpiryDate && 'text-muted-foreground'
                                            )}
                                            data-testid="offer-expiry-date-picker-button"
                                        >
                                            <CalendarDays className="-ms-0.5" />
                                            {offerExpiryDate ? formatDate(offerExpiryDate) : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start" data-testid="offer-expiry-calendar-popover" id="offer-expiry-calendar-popover">
                                        <Calendar
                                            initialFocus
                                            mode="single"
                                            defaultMonth={offerExpiryDate}
                                            selected={offerExpiryDate}
                                            onSelect={(newDate) => {
                                                setOfferExpiryDate(newDate);
                                            }}
                                            numberOfMonths={1}
                                            data-testid="offer-expiry-calendar"
                                            id="offer-expiry-calendar"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div data-testid="generate-offer-letter-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="offer-method-label" id="offer-method-label">Generate Offer Letter</p>
                            <RadioGroup value={selectedOfferMethod} onValueChange={setSelectedOfferMethod} className="mt-[12px] flex items-center gap-[12px]" data-testid="offer-method-radio-group" id="offer-method-radio-group">
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem value="system-generated" data-testid="system-generated-radio" id="system-generated-radio" />
                                    <p className="text-[13px]/[17px] text-[#787878]">System Generated</p>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem value="upload-manually" data-testid="upload-manually-radio" id="upload-manually-radio" />
                                    <p className="text-[13px]/[17px] text-[#787878]">Upload Manually</p>
                                </div>
                            </RadioGroup>
                        </div>
                        {selectedOfferMethod === 'system-generated' && <div data-testid="system-generated-template-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="offer-letter-template-label" id="offer-letter-template-label">Offer Letter Template</p>
                            <Select data-testid="offer-letter-template-select">
                                <SelectTrigger className="w-full h-[48px] mt-[12px]" data-testid="offer-letter-template-select-trigger" id="offer-letter-template-select-trigger">
                                    <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent data-testid="offer-letter-template-select-content" id="offer-letter-template-select-content">
                                    <SelectItem value="offer-letter" data-testid="template-offer-letter" id="template-offer-letter">Offer Letter</SelectItem>
                                    <SelectItem value="template2" data-testid="template-2" id="template-2">Template 2</SelectItem>
                                    <SelectItem value="template3" data-testid="template-3" id="template-3">Template 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>}
                        {selectedOfferMethod === 'upload-manually' && <div data-testid="upload-offer-letter-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="upload-label" id="upload-label">Upload Offer Letter</p>
                            <FileDropUpload file={file} setFile={setFile} setID={setID} label="Upload Offer Letter" data-testid="file-drop-upload" />
                        </div>}
                        <div data-testid="work-location-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="work-location-label" id="work-location-label">Work Location</p>
                            <Select data-testid="work-location-select">
                                <SelectTrigger className="w-full h-[48px] mt-[12px]" data-testid="work-location-select-trigger" id="work-location-select-trigger">
                                    <SelectValue placeholder="Select work address" />
                                </SelectTrigger>
                                <SelectContent data-testid="work-location-select-content" id="work-location-select-content">
                                    <SelectItem value="remote" data-testid="location-remote" id="location-remote">Remote</SelectItem>
                                    <SelectItem value="office" data-testid="location-office" id="location-office">Office</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div data-testid="work-hours-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="work-hours-label" id="work-hours-label">Work Hours</p>
                            <Select data-testid="work-hours-select">
                                <SelectTrigger className="w-full h-[48px] mt-[12px]" data-testid="work-hours-select-trigger" id="work-hours-select-trigger">
                                    <SelectValue placeholder="Select work hours" />
                                </SelectTrigger>
                                <SelectContent data-testid="work-hours-select-content" id="work-hours-select-content">
                                    <SelectItem value="full-time" data-testid="hours-full-time" id="hours-full-time">Full Time</SelectItem>
                                    <SelectItem value="part-time" data-testid="hours-part-time" id="hours-part-time">Part Time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div data-testid="included-benefits-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="benefits-label" id="benefits-label">Included Benefits</p>
                            <div className="flex flex-col gap-[12px] mt-[12px]">
                                <div className="flex items-center gap-[12px]">
                                    <Checkbox data-testid="health-insurance-checkbox" id="health-insurance-checkbox" />
                                    <p data-testid="health-insurance-label" id="health-insurance-label">Health Insurance</p>
                                </div>
                                <div className="flex items-center gap-[12px]">
                                    <Checkbox data-testid="401k-checkbox" id="401k-checkbox" />
                                    <p data-testid="401k-label" id="401k-label">401k</p>
                                </div>
                            </div>
                        </div>
                        <div data-testid="salary-benefits-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="salary-label" id="salary-label">Leaves</p>
                            <Popover>
                                <PopoverTrigger asChild className="w-full mt-[12px]">
                                    <div
                                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] justify-between items-center h-[48px]"
                                        id="select-leaves-trigger"
                                        data-testid="select-leaves-trigger"
                                    >
                                        Select leave
                                        <ChevronDown
                                            className="size-[18px] text-[#4b4b4b]"
                                            id="select-leaves-chevron"
                                            data-testid="select-leaves-chevron"
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-full p-3"
                                    align="start"
                                    id="select-leaves-content"
                                    data-testid="select-leaves-content"
                                >
                                    <div className="space-y-3">
                                        {leaves.map((leave: { id: string, name: string }, index: number) => (
                                            <div
                                                key={leave.id}
                                                className="flex items-center gap-2.5"
                                                id={`leave-item-${leave.id}`}
                                                data-testid={`leave-item-${leave.id}`}
                                            >
                                                <Checkbox
                                                    id={`leave-checkbox-${leave.id}`}
                                                    checked={selectedLeaves.includes(leave.id)}
                                                    onCheckedChange={(checked) =>
                                                        handleLeavesChange(checked === true, leave.id)
                                                    }
                                                    data-testid={`leave-checkbox-${leave.id}`}
                                                />
                                                <Label
                                                    htmlFor={`leave-checkbox-${leave.id}`}
                                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                                >
                                                    {leave.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <div className="flex gap-[11px] mt-[11px] items-start w-full flex-wrap" data-testid="selected-leaves-container">
                                {selectedLeaves.map((leaveId, index) => {
                                    const leave = leaves.find((i) => i.id === leaveId);
                                    return (
                                        <div key={index} className="flex gap-[8px] py-[6px] px-[10px] text-[#0d978b] rounded-[8px] bg-[#d6eeec]" data-testid={`selected-leave-tag-${leaveId}`}>
                                            <span className="text-[14px]/[20px]">{leave?.name}</span>
                                            <button onClick={() => {
                                                setSelectedLeaves(selectedLeaves.filter((id) => id !== leaveId));
                                            }} data-testid={`remove-leave-button-${leaveId}`}><X className="size-[16px]" /></button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div data-testid="salary-structure-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="detailed-salary-label" id="detailed-salary-label">Detailed Salary Structure</p>
                            <RadioGroup value="yes" className="mt-[12px] flex items-center gap-[12px]" data-testid="detailed-salary-radio-group" id="detailed-salary-radio-group">
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem value="yes" data-testid="detailed-salary-yes-radio" id="detailed-salary-yes-radio" />
                                    <p className="text-[13px]/[17px] text-[#787878]">Yes</p>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem value="no" data-testid="detailed-salary-no-radio" id="detailed-salary-no-radio" />
                                    <p className="text-[13px]/[17px] text-[#787878]">No</p>
                                </div>
                            </RadioGroup>
                        </div>
                        <div data-testid="earning-structure-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="earning-structure-label" id="earning-structure-label">Earning Structure</p>
                            <Select data-testid="earning-structure-select">
                                <SelectTrigger className="w-full h-[48px] mt-[12px]" data-testid="earning-structure-select-trigger" id="earning-structure-select-trigger">
                                    <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent data-testid="earning-structure-select-content" id="earning-structure-select-content">
                                    <SelectItem value="hourly-based" data-testid="structure-hourly-based" id="structure-hourly-based">Hourly-based</SelectItem>
                                    <SelectItem value="salary-based" data-testid="structure-salary-based" id="structure-salary-based">Salary-based</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div data-testid="earnings-table-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="earnings-label" id="earnings-label">Earnings</p>
                            <table className="w-full mt-[12px] border-spacing-0 " data-testid="earnings-table">
                                <thead className="h-[32px] rounded-[10px]">
                                    <tr className="bg-[#eef3f2] ">
                                        <th className="w-[50%] text-left text-[12px] text-[#8c8e8e] pl-[16px] " data-testid="earnings-category-header">Category</th>
                                        <th className="w-[30%] text-left text-[12px] text-[#8c8e8e] pl-[16px]" data-testid="earnings-amount-header">Amount</th>
                                        <th className="w-[20%] text-left text-[12px] text-[#8c8e8e] pl-[16px]" data-testid="earnings-action-header">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {earnings.map((earning, index) => (
                                        <React.Fragment key={earning.id}>
                                            {earning.completed ? (
                                                <tr className="h-[42px] border-b border-[#e9e9e9]" data-testid={`earning-row-completed-${earning.id}`}>
                                                    <td className="pl-[16px] font-medium text-[12px] text-[#4b4b4b] border-b border-[#e9e9e9]" data-testid={`earning-category-${earning.id}`}>{earning.category}</td>
                                                    <td className="pl-[16px] font-medium text-[12px] text-[#4b4b4b] border-b border-[#e9e9e9]" data-testid={`earning-amount-${earning.id}`}>${earning.amount}</td>
                                                    <td className="pl-[16px] border-b border-[#e9e9e9]">
                                                        <MoreVertical data-testid={`earning-more-vertical-${earning.id}`} />
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr className="h-[42px] border-b border-[#e9e9e9]" data-testid={`earning-row-editing-${earning.id}`}>
                                                    <td className="pl-[16px] border-b border-[#e9e9e9] "><input type="text" className="w-[150px] border-[#a8a8a8] border-[1px] rounded-[4px] px-[8px] " value={earning.category} onChange={(e) => handleEarningChange(e.target.value, 'category', earning.id)} data-testid={`earning-category-input-${earning.id}`} /></td>
                                                    <td className="pl-[16px] border-b border-[#e9e9e9] "><input type="number" className="w-[150px] border-[#a8a8a8] border-[1px] rounded-[4px] px-[8px] " value={earning.amount} onChange={(e) => handleEarningChange(e.target.value, 'amount', earning.id)} data-testid={`earning-amount-input-${earning.id}`} /></td>
                                                    <td className="pl-[16px] border-b border-[#e9e9e9] ">
                                                        <button className="w-[17px] h-[17px] rounded-[50%] bg-[#0d978b] text-[#fff] flex items-center justify-center cursor-pointer" onClick={() => handleEarningComplete(earning.id)} data-testid={`earning-complete-button-${earning.id}`} id={`earning-complete-button-${earning.id}`}><Check className="size-[14px]" /></button>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    <tr>
                                        <td colSpan={3} className="h-[42px]">
                                            <button className="h-[48px] text-[#0d978b] text-[14px]/[16px] pl-[16px]" onClick={handleAddNew} data-testid="add-new-earning-button" id="add-new-earning-button">+ Add New</button>
                                        </td>
                                    </tr>
                                    <tr data-testid="total-earnings-row">
                                        <td className="pl-[16px] font-medium text-[12px] text-[#4b4b4b] border-b border-[#e9e9e9]" data-testid="total-earnings-label">Total</td>
                                        <td className="pl-[16px] font-medium text-[12px] text-[#4b4b4b] border-b border-[#e9e9e9]" data-testid="total-earnings-amount">${total}</td>
                                        <td className="pl-[16px] font-medium text-[12px] text-[#4b4b4b] border-b border-[#e9e9e9]"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div data-testid="preview-button-section">
                            <Button className="w-[180px] h-[48px]" onClick={() => setPreview(true)} data-testid="preview-offer-letter-button" id="preview-offer-letter-button">Preview Offer Letter</Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <Dialog open={preview} onOpenChange={setPreview}>
                <DialogContent close={false} className="md:max-w-[830px] max-w-full">
                    <DialogTitle></DialogTitle>
                    <div>
                        <div className="flex justify-between">
                            <p className="text-[22px]/[30px] font-medium text-[#1c1c1c]" data-testid="preview-dialog-title" id="preview-dialog-title"> Offer Letter Template</p>
                            <div className="flex flex-col gap-[4px] items-end">
                                <span className="text-[12px]/[20px] text-[#0d978b] bg-[#d6eeec] px-[12px] py-[2px] rounded-[4px]" data-testid="template-name-tag" id="template-name-tag">Offer Letter</span>
                                <span className="text-[12px]/[20px] text-[#626262]" data-testid="template-type" id="template-type">Default</span>
                            </div>
                        </div>
                        <div className="w-full border border-[#e9e9e9] mt-[28px] rounded-[12px] h-[600px]" data-testid="preview-content-box" id="preview-content-box">
                            <div className="p-[24px] bg-[#f9f9f9] w-full">
                                <p className="text-[18px]/[24px] font-medium text-[#1c1c1c]" data-testid="preview-message-title" id="preview-message-title">Message Title</p>
                            </div>
                            <div className="p-[33px]" data-testid="preview-message-body" id="preview-message-body">
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
                            <Button variant="outline" className="h-[42px]" onClick={() => setPreview(false)} data-testid="go-back-button" id="go-back-button">Go Back</Button>
                            <Button className="h-[42px]" onClick={() => setIsEdit(true)} data-testid="edit-message-button" id="edit-message-button">Edit Message</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Message
                open={isEdit}
                onOpenChange={setIsEdit}
                data-testid="message-dialog"
            />
        </div >
    );
}
