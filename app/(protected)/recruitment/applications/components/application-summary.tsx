'use client'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, Linkedin } from "lucide-react";
import moment from "moment";
import { useState } from "react";

export default function ApplicationSummary({ applicantDetails }: { applicantDetails: any }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isExpOpen, setIsExpOpen] = useState(true);
    const [isEduOpen, setIsEduOpen] = useState(true);
    const [isCertOpen, setIsCertOpen] = useState(true);
    const [isSkillOpen, setIsSkillOpen] = useState(true);
    return (
        <div>
            <div className="flex items-center gap-[10px]">
                <div className="w-[24px] h-[24px] rounded-full bg-[#0d978b] flex items-center justify-center">
                    <Linkedin className="size-[12px] text-white" />
                </div>
                <div className="h-[14px] border-[1.2px] border-[#626262]"></div>
                <div className="flex gap-[4px] items-center">
                    <span className="text-[12px]/[20px] font-medium text-[#4b4b4b]">{applicantDetails.portfolio_link}</span>
                    <Link className="size-[16px] text-[#4b4b4b]" />
                </div>
                {(applicantDetails.other_links || []).map((link: string, index: number) => (
                    <div key={index}>
                        <div className="h-[14px] border-[1.2px] border-[#626262]"></div>
                        <div className="flex gap-[4px] items-center">
                            <span className="text-[12px]/[20px] font-medium text-[#4b4b4b]">{link}</span>
                            <Link className="size-[16px] text-[#4b4b4b]" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-[32px] w-full mt-[20px]">
                <Collapsible open={isOpen} className="w-full" onOpenChange={setIsOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Personal Information</p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px]">
                        <div className="w-full flex flex-col gap-[16px] py-[16px] px-[24px] bg-white rounded-[12px]">
                            <div className="flex items-center gap-[28px]">
                                <p className="text-[14px]/[22px] font-medium text-[#787878] w-[100px]">Email</p>
                                <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{applicantDetails.applicant.email}</p>
                            </div>
                            <div className="flex items-center gap-[28px]">
                                <p className="text-[14px]/[22px] font-medium text-[#787878] w-[100px]">Phone</p>
                                <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{applicantDetails.contact_number && (applicantDetails.contact_code + applicantDetails.contact_number)}</p>
                            </div>
                            <div className="flex items-center gap-[28px]">
                                <p className="text-[14px]/[22px] font-medium text-[#787878] w-[100px]">Address</p>
                                <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{applicantDetails.address + ', ' + applicantDetails.city + ', ' + applicantDetails.state + ', ' + applicantDetails.zip_code + ', ' + applicantDetails.country}</p>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible open={isExpOpen} className="w-full" onOpenChange={setIsExpOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Work Experience </p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isExpOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px] flex flex-col gap-[10px]">
                        {(applicantDetails.work_experience || []).map((experience: any, index: number) => (
                            <div key={index} className="w-full  py-[20px] px-[24px] bg-white rounded-[12px]">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[16px]/[20px] font-medium text-[#4b4b4b]">{experience.job_title}</p>
                                        <p className="text-[14px]/[20px] font-medium text-[#4b4b4b]">{experience.company} ~ {experience.location}</p>
                                    </div>
                                    <p className="text-[14px]/[20px] font-medium text-[#787878]">{moment(experience.from_date).format('MMM YYYY')} - {moment(experience.to_date).format('MMM YYYY')}</p>
                                </div>
                                <p className="mt-[12px] text-[13px]/[20px]">
                                    {experience.role_description}
                                </p>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible open={isEduOpen} className="w-full" onOpenChange={setIsEduOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Education </p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isEduOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px] flex flex-col gap-[10px]">
                        {(applicantDetails.education || []).map((education: any, index: number) => (
                            <div key={index} className="w-full  py-[20px] px-[24px] bg-white rounded-[12px]">
                                <p className="text-[16px]/[20px] font-medium text-[#4b4b4b]">{education.school}</p>
                                <p className="text-[14px]/[20px] font-medium text-[#4b4b4b]">{education.degree.description}</p>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible open={isCertOpen} className="w-full" onOpenChange={setIsCertOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Certifications </p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isCertOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px] flex flex-col gap-[10px]">
                        {(applicantDetails.certificate || []).map((certification: any, index: number) => (
                            <div key={index} className="w-full  py-[20px] px-[24px] bg-white rounded-[12px]">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[16px]/[20px] font-medium text-[#4b4b4b]">{certification.title}</p>
                                        <p className="text-[14px]/[20px] font-medium text-[#4b4b4b]">{certification.number}</p>
                                    </div>
                                    <p className="text-[14px]/[20px] font-medium text-[#787878]">{moment(certification.issued_date).format('MMM YYYY')} - {moment(certification.expiration_date).format('MMM YYYY')}</p>
                                </div>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible open={isSkillOpen} className="w-full" onOpenChange={setIsSkillOpen}>
                    <CollapsibleTrigger className="w-full flex justify-between items-center cursor-pointer">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Skills </p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">{isSkillOpen ? '-' : '+'}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full mt-[12px]">
                        <div className="w-full flex flex-wrap  gap-[8px] py-[20px] px-[24px] bg-white rounded-[12px]">
                            {(applicantDetails.skills || []).map((skill: any, index: number) => (
                                <span key={index} className="py-[5.25px] px-[8.75px] rounded-[7px] bg-[#d6eeec] text-[#0d978b] text-[12px]/[16px]">{skill.name}</span>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>

            </div>
        </div>
    );
}