import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, MoreVertical, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger, Dialog } from "@/components/ui/dialog";
import Message from "../../components/message";
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
    const handleEarningChange = (value: string, type: string, id: number) => {
        setEarnings((prev) =>
            prev.map((earning) =>
                earning.id === id ? { ...earning, [type]: value } : earning
            )
        );
    };
    const handleAddNew = () => {
        setEarnings((prev) => [...prev, { id: prev.length + 1, category: '', amount: 0, completed: false }]);
    };
    const handleEarningComplete = (id: number) => {
        setEarnings((prev) =>
            prev.map((earning) =>
                earning.id === id ? { ...earning, completed: true } : earning
            )
        );
    };
    useEffect(() => {
        const total = earnings.reduce((acc, earning) => acc + (earning.completed ? earning.amount * 1 : 0), 0);
        setTotal(total);
    }, [earnings]);
    return (
        <div>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent close={false} className="p-0 sm:w-[667px] sm:max-w-none bg-[#f7f7f7] gap-[0px]">
                    <div className="px-[32px] py-[24px]">
                        <div className="w-full justify-between flex">
                            <div className="flex items-center gap-[10px]">
                                <Button
                                    mode="icon"
                                    variant="outline"

                                >
                                    <ChevronLeft className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                                <Button
                                    mode="icon"
                                    variant="outline"

                                >
                                    <ChevronRight className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <span className="text-[14px] text-[#626262]">Senior Data Analyst ~ United States</span>
                                <Button
                                    mode="icon"
                                    variant="outline"

                                >
                                    <X className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-[14px]/[22px] text-[#8f8f8f] mt-[16px]">#E003</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[22px]/[30px] font-medium flex items-center gap-[6px]">Alice Fernadez </p>
                                <p className="text-[14px]/[22px] text-[#626262]">Senior Data Analyst ~ United States</p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-[150px] h-[42px]">
                                        Continue
                                    </Button>
                                </DialogTrigger>
                                <DialogContent close={false}>
                                    <DialogTitle></DialogTitle>
                                    <DialogDescription className="flex flex-col">
                                        <img src="/images/applicant/check.png" alt="" className="w-[95px] h-[95px] mx-auto" />
                                        <span className="text-[28px]/[36px] font-semibold mt-[28px] text-[#353535] text-center">Hire Applicant</span>
                                        <span className="text-[14px]/[24px] text-[#626262] mt-[8px] text-center">You're about to send an offer to this applicant they will be moved to onboarding once accepted</span>
                                        <span className="mt-[28px] text-[14px]/[24px] text-[#8f8f8f]">Select an email template</span>
                                        <Select value="1">
                                            <SelectTrigger className="w-full h-[42px]">
                                                <SelectValue placeholder="Select an email template" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Offer Letter Template</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <button className="text-[14px]/[24px] text-[#0d978b] underline mt-[6px] text-start cursor-pointer" onClick={() => setPreview(true)}>Preview/Edit Email</button>
                                        <div className="flex items-center gap-[12px] mt-[28px] w-full">
                                            <Button variant="outline" className="w-full h-[42px]">Cancel</Button>
                                            <Button className="bg-[#0D978B] hover:bg-[#0D978B] w-full h-[42px]">Send Offer</Button>
                                        </div>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </div>

                    </div>
                    <div className="border-t border-[#e9e9e9] bg-white py-[29px] pl-[32px] pr-[79px] flex flex-col gap-[28px] overflow-y-auto">
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Select Start Date</p>
                            <div className="relative mt-[12px]">
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
                                            {moment(new Date()).format('DD/MM/YYYY')}
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
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Offer Expiry Date</p>
                            <div className="relative mt-[12px]">
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
                                            {moment(new Date()).format('DD/MM/YYYY')}
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
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Offer Expiry Date</p>
                            <RadioGroup className="mt-[12px] flex items-center gap-[12px]">
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem value="option1" />
                                    <p className="text-[13px]/[17px] text-[#787878]">System Generated</p>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem value="option2" />
                                    <p className="text-[13px]/[17px] text-[#787878]">Upload Manually</p>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Offer Letter Template</p>
                            <Select value="offer-letter">
                                <SelectTrigger className="w-full h-[48px] mt-[12px]">
                                    <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="offer-letter">Offer Letter</SelectItem>
                                    <SelectItem value="template2">Template 2</SelectItem>
                                    <SelectItem value="template3">Template 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Work Location</p>
                            <Select >
                                <SelectTrigger className="w-full h-[48px] mt-[12px]">
                                    <SelectValue placeholder="Select work address" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="remote">Remote</SelectItem>
                                    <SelectItem value="office">Office</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Work Hours</p>
                            <Select >
                                <SelectTrigger className="w-full h-[48px] mt-[12px]">
                                    <SelectValue placeholder="Select work hours" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="remote">Full Time</SelectItem>
                                    <SelectItem value="office">Part Time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Included Benefits</p>
                            <div className="flex flex-col gap-[12px] mt-[12px]">
                                <div className="flex items-center gap-[12px]">
                                    <Checkbox />
                                    <p>Health Insurance</p>
                                </div>
                                <div className="flex items-center gap-[12px]">
                                    <Checkbox />
                                    <p>401k</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Salary</p>
                            <Popover>
                                <PopoverTrigger asChild className="w-full mt-[12px]">
                                    <div
                                        className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] justify-between items-center h-[48px]"
                                        id="filter-locations-trigger"
                                        data-testid="filter-locations-trigger"
                                    >
                                        Select leave
                                        <ChevronDown
                                            className="size-[18px] text-[#4b4b4b]"
                                            id="filter-locations-chevron"
                                            data-testid="filter-locations-chevron"
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-full p-3"
                                    align="start"
                                    id="filter-locations-content"
                                    data-testid="filter-locations-content"
                                >
                                    <div className="space-y-3">
                                        {leaves.map((leave: { id: string, name: string }, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2.5"
                                                id={`filter-location-item-${index}`}
                                                data-testid={`filter-location-item-${index}`}
                                            >
                                                <Checkbox
                                                    id={`filter-location-checkbox-${index}`}
                                                    checked={selectedLeaves.includes(leave.id)}
                                                    onCheckedChange={(checked) =>
                                                        handleLeavesChange(checked === true, leave.id)
                                                    }
                                                    data-testid={`filter-location-checkbox-${index}`}
                                                />
                                                <Label
                                                    htmlFor={`filter-location-checkbox-${index}`}
                                                    className="grow flex items-center justify-between font-normal gap-1.5"
                                                >
                                                    {leave.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <div className="flex gap-[11px] mt-[11px] items-start w-full flex-wrap">
                                {selectedLeaves.map((leave, index) => (
                                    <div key={index} className="flex gap-[8px] py-[6px] px-[10px] text-[#0d978b] rounded-[8px] bg-[#d6eeec]">
                                        <span className="text-[14px]/[20px]">{leaves.find((i) => i.id === leave)?.name}</span>
                                        <button onClick={() => {
                                            setSelectedLeaves(selectedLeaves.filter((_, i) => i !== index));
                                        }}><X className="size-[16px]" /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Detailed Salary Structure</p>
                            <RadioGroup value="yes" className="mt-[12px] flex items-center gap-[12px]">
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem value="yes" />
                                    <p className="text-[13px]/[17px] text-[#787878]">Yes</p>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <RadioGroupItem value="no" />
                                    <p className="text-[13px]/[17px] text-[#787878]">No</p>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Earning Structure</p>
                            <Select value="hourly-based">
                                <SelectTrigger className="w-full h-[48px] mt-[12px]">
                                    <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hourly-based">Hourly-based</SelectItem>
                                    <SelectItem value="salary-based">Salary-based</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <p className="text-[14px]/[16px]  text-[#1C1C1C]">Earnings</p>
                            <table className="w-full mt-[12px] border-spacing-0 ">
                                <thead className="h-[32px] rounded-[10px]">
                                    <tr className="bg-[#eef3f2] ">
                                        <th className="w-[50%] text-left text-[12px] text-[#8c8e8e] pl-[16px] ">Category</th>
                                        <th className="w-[30%] text-left text-[12px] text-[#8c8e8e] pl-[16px]">Amount</th>
                                        <th className="w-[20%] text-left text-[12px] text-[#8c8e8e] pl-[16px]">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {earnings.map((earning, index) => (
                                        <>{earning.completed ? <>
                                            <tr className="h-[42px] border-b border-[#e9e9e9]" key={index}>
                                                <td className="pl-[16px] font-medium text-[12px] text-[#4b4b4b] border-b border-[#e9e9e9]">{earning.category}</td>
                                                <td className="pl-[16px] font-medium text-[12px] text-[#4b4b4b] border-b border-[#e9e9e9]">${earning.amount}</td>
                                                <td className="pl-[16px] border-b border-[#e9e9e9]">
                                                    <MoreVertical />
                                                </td>
                                            </tr></> : <>
                                            <tr className="h-[42px] border-b border-[#e9e9e9]" key={index}>
                                                <td className="pl-[16px] border-b border-[#e9e9e9] "><input type="text" className="w-[150px] border-[#a8a8a8] border-[1px] rounded-[4px] px-[8px] " value={earning.category} onChange={(e) => handleEarningChange(e.target.value, 'category', earning.id)} /></td>
                                                <td className="pl-[16px] border-b border-[#e9e9e9] "><input type="text" className="w-[150px] border-[#a8a8a8] border-[1px] rounded-[4px] px-[8px] " value={earning.amount} onChange={(e) => handleEarningChange(e.target.value, 'amount', earning.id)} /></td>
                                                <td className="pl-[16px] border-b border-[#e9e9e9]  ">
                                                    <button className="w-[17px] h-[17px] rounded-[50%] bg-[#0d978b] text-[#fff] flex items-center justify-center cursor-pointer" onClick={() => handleEarningComplete(earning.id)}><Check className="size-[14px]" /></button>
                                                </td>
                                            </tr></>}

                                        </>
                                    ))}
                                    <tr>
                                        <td colSpan={3} className="h-[42px]">
                                            <button className=" h-[48px] text-[#0d978b] text-[14px]/[16px] pl-[16px]" onClick={() => handleAddNew()}>+ Add New</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pl-[16px] font-medium text-[12px] text-[#4b4b4b] border-b border-[#e9e9e9]">Total</td>
                                        <td className="pl-[16px] font-medium text-[12px] text-[#4b4b4b] border-b border-[#e9e9e9]">${total}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Button className=" w-[180px] h-[48px]">Preview Offer Letter</Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <Dialog open={preview} onOpenChange={setPreview}>
                <DialogContent close={false} className="!w-[830px] max-w-[830px]">
                    <DialogTitle></DialogTitle>
                    <DialogDescription >
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
                    </DialogDescription>
                </DialogContent>
            </Dialog>
            <Message
                open={isEdit}
                onOpenChange={setIsEdit}
            />
        </div>
    );
}