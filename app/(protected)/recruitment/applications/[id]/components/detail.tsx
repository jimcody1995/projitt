'use client'
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import ApplicationSummary from "./application-summary";
import Resume from "./resume";
import ApplicantQuestions from "./applicant-questions";
import Stages from "./stages";
import ScheduleInterview from "./schedule-interview";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DialogContent, { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface DetailProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function Detail({ open, onOpenChange }: DetailProps) {
    const [activeSection, setActiveSection] = useState<'stages' | 'application-summary' | 'resume' | 'applicant-question' | 'schedule-interview'>('stages');
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
                                    <Dialog>
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
                                                <DialogDescription className="flex flex-col items-center">

                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <div
                                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                                    >
                                        Reject
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  mt-[20px] w-full overflow-x-auto'>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${(activeSection === 'stages' || activeSection === 'schedule-interview') ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('stages')}>
                            <p className='whitespace-nowrap'>Stages</p>
                        </div>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'application-summary' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('application-summary')}>
                            <p className='whitespace-nowrap'>Application Summary</p>
                        </div>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'resume' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('resume')}>
                            <p className='whitespace-nowrap'>Resume</p>
                        </div>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'applicant-question' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('applicant-question')}>
                            <p className='whitespace-nowrap'>Applicant Question</p>
                        </div>
                    </div>
                    {activeSection === 'schedule-interview' ?
                        <ScheduleInterview setActive={setActiveSection} onOpenChange={onOpenChange} />
                        :
                        <div className="px-[32px] py-[24px] overflow-y-auto">
                            {activeSection === 'stages' && <Stages />}
                            {activeSection === 'application-summary' && <ApplicationSummary />}
                            {activeSection === 'resume' && <Resume />}
                            {activeSection === 'applicant-question' && <ApplicantQuestions />}
                        </div>
                    }

                </SheetContent >
            </Sheet >
        </div >
    );
}