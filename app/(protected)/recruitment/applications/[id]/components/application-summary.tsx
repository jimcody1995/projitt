'use client'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, Linkedin } from "lucide-react";
import { useState } from "react";

export default function ApplicationSummary() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpOpen, setIsExpOpen] = useState(false);
    const [isEduOpen, setIsEduOpen] = useState(false);
    const [isCertOpen, setIsCertOpen] = useState(false);
    const [isSkillOpen, setIsSkillOpen] = useState(false);
    return (
        <div>
            <div className="flex items-center gap-[10px]">
                <div className="w-[24px] h-[24px] rounded-full bg-[#0d978b] flex items-center justify-center">
                    <Linkedin className="size-[12px] text-white" />
                </div>
                <div className="h-[14px] border-[1.2px] border-[#626262]"></div>
                <div className="flex gap-[4px] items-center">
                    <span className="text-[12px]/[20px] font-medium text-[#4b4b4b]">Website</span>
                    <Link className="size-[16px] text-[#4b4b4b]" />
                </div>
                <div className="h-[14px] border-[1.2px] border-[#626262]"></div>
                <div className="flex gap-[4px] items-center">
                    <span className="text-[12px]/[20px] font-medium text-[#4b4b4b]">Other Link 1</span>
                    <Link className="size-[16px] text-[#4b4b4b]" />
                </div>
                <div className="h-[14px] border-[1.2px] border-[#626262]"></div>
                <div className="flex gap-[4px] items-center">
                    <span className="text-[12px]/[20px] font-medium text-[#4b4b4b]">Other Link 2</span>
                    <Link className="size-[16px] text-[#4b4b4b]" />
                </div>
            </div>
            <div className="flex flex-col gap-[32px] w-full mt-[20px]">
                <Collapsible className="w-full" onOpenChange={setIsOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Personal Information</p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px]">
                        <div className="w-full flex flex-col gap-[16px] py-[16px] px-[24px] bg-white rounded-[12px]">
                            <div className="flex items-center gap-[28px]">
                                <p className="text-[14px]/[22px] font-medium text-[#787878] w-[100px]">Email</p>
                                <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">alicefernadez@gmail.com</p>
                            </div>
                            <div className="flex items-center gap-[28px]">
                                <p className="text-[14px]/[22px] font-medium text-[#787878] w-[100px]">Phone</p>
                                <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">+1 234 567 890</p>
                            </div>
                            <div className="flex items-center gap-[28px]">
                                <p className="text-[14px]/[22px] font-medium text-[#787878] w-[100px]">Address</p>
                                <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">alicefernadez@gmail.com</p>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible className="w-full" onOpenChange={setIsExpOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Work Experience </p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isExpOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px]">
                        <div className="w-full  py-[20px] px-[24px] bg-white rounded-[12px]">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[16px]/[20px] font-medium text-[#4b4b4b]">Data Analyst</p>
                                    <p className="text-[14px]/[20px] font-medium text-[#4b4b4b]">Google ~ California</p>
                                </div>
                                <p className="text-[14px]/[20px] font-medium text-[#787878]">Jun 2024 - Jun 2025</p>
                            </div>
                            <p className="mt-[12px] text-[13px]/[20px]">
                                Lead complex data analysis projects and develop comprehensive reporting solutions<br />
                                Build and maintain advanced statistical models and data visualization dashboards<br />
                                Collaborate with stakeholders to identify business needs and translate them into analytical solutions<br />
                                Mentor junior analysts and promote best practices in data analysis<br />
                                Design and implement data quality processes and validation procedures
                            </p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible className="w-full" onOpenChange={setIsEduOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Education </p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isEduOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px]">
                        <div className="w-full  py-[20px] px-[24px] bg-white rounded-[12px]">
                            <p className="text-[16px]/[20px] font-medium text-[#4b4b4b]">Harvard University</p>
                            <p className="text-[14px]/[20px] font-medium text-[#4b4b4b]">Bachelors Degree in Business Adminstration</p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible className="w-full" onOpenChange={setIsCertOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Certifications </p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isCertOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px]">
                        <div className="w-full  py-[20px] px-[24px] bg-white rounded-[12px]">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[16px]/[20px] font-medium text-[#4b4b4b]">Certified Data Analyst </p>
                                    <p className="text-[14px]/[20px] font-medium text-[#4b4b4b]">NC120345</p>
                                </div>
                                <p className="text-[14px]/[20px] font-medium text-[#787878]">Jun 2024 - Jun 2025</p>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible className="w-full" onOpenChange={setIsSkillOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Skills </p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isSkillOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px]">
                        <div className="w-full flex flex-wrap  gap-[8px] py-[20px] px-[24px] bg-white rounded-[12px]">
                            <span className="py-[5.25px] px-[8.75px] rounded-[7px] bg-[#d6eeec] text-[#0d978b] text-[12px]/[16px]">UI/UX Prototyping</span>
                            <span className="py-[5.25px] px-[8.75px] rounded-[7px] bg-[#d6eeec] text-[#0d978b] text-[12px]/[16px]">UI/UX Prototyping</span>
                            <span className="py-[5.25px] px-[8.75px] rounded-[7px] bg-[#d6eeec] text-[#0d978b] text-[12px]/[16px]">UI/UX Prototyping</span>
                            <span className="py-[5.25px] px-[8.75px] rounded-[7px] bg-[#d6eeec] text-[#0d978b] text-[12px]/[16px]">UI/UX Prototyping</span>
                            <span className="py-[5.25px] px-[8.75px] rounded-[7px] bg-[#d6eeec] text-[#0d978b] text-[12px]/[16px]">UI/UX Prototyping</span>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

            </div>
        </div>
    );
}