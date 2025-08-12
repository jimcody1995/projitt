'use client'
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, CirclePlus, Plus, Star, X } from "lucide-react";
import ApplicationSummary from "./application-summary";
import Resume from "./resume";
import ApplicantQuestions from "./applicant-questions";
import Stages from "./stages";
import ScheduleInterview from "./schedule-interview";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DialogContent, { Dialog, div, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Message from "../../../components/message";

interface DetailProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Detail({ open, onOpenChange }: DetailProps) {
    const [activeSection, setActiveSection] = useState<'stages' | 'application-summary' | 'resume' | 'applicant-question' | 'schedule-interview'>('stages');
    const [rejectOpen, setRejectOpen] = useState(false);
    const [preview, setPreview] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    return (
        <div>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent close={false} className="p-0 w-full sm:w-[667px] sm:max-w-none bg-[#f7f7f7] gap-[0px]">
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
                                    onClick={() => onOpenChange(false)}
                                >
                                    <X className="size-[14px] text-[#1a1a1a]" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-[14px]/[22px] text-[#8f8f8f] mt-[16px]">#E003</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[22px]/[30px] font-medium flex items-center gap-[6px]">Alice Fernadez <Star className="size-[20px] text-[#353535]" /></p>
                                <div className="flex items-center gap-[12px] mt-[10px]">
                                    <div className="py-[5px] px-[9px] rounded-[9px] bg-[#d6eeec] text-[#0d978b] text-[14px]/[22px]">New</div>
                                    <div className="flex gap-[8px] py-[5px] px-[9px] text-[14px]/[22px] text-white bg-[#0d978b] rounded-[4px]">
                                        <span className="pr-[3.75px] border-r border-[#ffffff88]">86%</span>
                                        <span className="pr-[3.75px]">Stong Match</span>
                                    </div>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="h-[42px]">
                                        <span className="text-[14px]/[20px] font-semibold">Actions</span>
                                        <ChevronDown className="size-[18px] text-white" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="bottom"
                                    align="end"
                                >
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                        onClick={() => setActiveSection('schedule-interview')}
                                    >
                                        Schedule Interview
                                    </div>
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                    >
                                        Hire & Send for Approval
                                    </div>
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                    >
                                        Send Message
                                    </div>
                                    <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
                                        <DialogTrigger asChild>
                                            <div
                                                className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                            >
                                                Reject
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent close={false}>
                                            <DialogHeader>
                                                <DialogTitle></DialogTitle>
                                                <div className="flex flex-col">
                                                    <img src="/images/applicant/cancel.png" alt="" className="w-[95px] h-[95px] mx-auto" />
                                                    <span className="text-[28px]/[36px] font-semibold mt-[28px] text-[#353535] text-center">Reject Applicant</span>
                                                    <span className="text-[14px]/[24px] text-[#626262] mt-[8px] text-center">You're about to reject this applicant. They’ll be notified and and be removed from the hiring pipeline for this role.</span>
                                                    <span className="mt-[28px] text-[14px]/[24px] text-[#8f8f8f]">Select an email template</span>
                                                    <Select >
                                                        <SelectTrigger className="w-full h-[42px]">
                                                            <SelectValue placeholder="Offer Rejection Template" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <button className="flex w-full items-center  gap-[5px] cursor-pointer h-[42px] text-[#0d978b] hover:text-[#3c8b85] ml-[20px]">
                                                                <CirclePlus className="size-[20px] " />
                                                                <span className="text-[14px]/[24px]">Add Template</span>
                                                            </button>
                                                            <SelectItem value="1">Reject Letter</SelectItem>
                                                            <SelectItem value="2">Accept Letter</SelectItem>
                                                            <SelectItem value="3">Appointment Letter</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <button className="text-[14px]/[24px] text-[#0d978b] underline mt-[6px] text-start cursor-pointer" onClick={() => setPreview(true)}>Preview/Edit Email</button>
                                                    <div className="flex items-center gap-[12px] mt-[28px] w-full">
                                                        <Button variant="outline" className="w-full h-[42px]" onClick={() => setRejectOpen(false)}>Cancel</Button>
                                                        <Button className="bg-[#C30606] hover:bg-[#C30606] w-full h-[42px]">Reject Applicant</Button>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  mt-[20px] w-full overflow-x-auto sm:h-[56px] h-[80px]'>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center cursor-pointer ${(activeSection === 'stages' || activeSection === 'schedule-interview') ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('stages')}>
                            <p className='whitespace-nowrap'>Stages</p>
                        </div>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center cursor-pointer ${activeSection === 'application-summary' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('application-summary')}>
                            <p className='whitespace-nowrap'>Application Summary</p>
                        </div>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center cursor-pointer ${activeSection === 'resume' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('resume')}>
                            <p className='whitespace-nowrap'>Resume</p>
                        </div>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center cursor-pointer ${activeSection === 'applicant-question' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('applicant-question')}>
                            <p className='whitespace-nowrap'>Applicant Question</p>
                        </div>
                    </div>
                    {activeSection === 'schedule-interview' ?
                        <ScheduleInterview setActive={setActiveSection} onOpenChange={onOpenChange} />
                        :
                        <div className="px-[32px] py-[24px] overflow-y-auto flex-1">
                            {activeSection === 'stages' && <Stages />}
                            {activeSection === 'application-summary' && <ApplicationSummary />}
                            {activeSection === 'resume' && <Resume />}
                            {activeSection === 'applicant-question' && <ApplicantQuestions />}
                        </div>
                    }

                </SheetContent >
            </Sheet >
            <Dialog open={preview} onOpenChange={setPreview}>
                <DialogContent close={false} className="md:max-w-[830px] w-full">
                    <DialogTitle></DialogTitle>
                    <div >
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
        </div >
    );
}