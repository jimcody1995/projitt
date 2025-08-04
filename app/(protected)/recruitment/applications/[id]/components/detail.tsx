'use client'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import ApplicationSummary from "./application-summary";

export default function Detail({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [activeSection, setActiveSection] = useState<'stages' | 'application-summary' | 'resume' | 'applicant-question'>('stages');
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
                            <Button className="h-[42px]">
                                <span className="text-[14px]/[20px] font-semibold">Actions</span>
                                <ChevronDown className="size-[18px] text-white" />
                            </Button>
                        </div>
                    </div>
                    <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  mt-[20px] w-full overflow-x-auto'>
                        <div className={`py-[18px] px-[27.5px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer ${activeSection === 'stages' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('stages')}>
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
                    <div className="px-[32px] py-[24px]">
                        {/* {activeSection === 'stages' && <Stages />} */}
                        {activeSection === 'application-summary' && <ApplicationSummary />}
                        {/* {activeSection === 'resume' && <Resume />} */}
                        {/* {activeSection === 'applicant-question' && <ApplicantQuestion />} */}
                    </div>
                </SheetContent >
            </Sheet >
        </div >
    );
}