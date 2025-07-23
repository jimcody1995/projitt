'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * WorkExperience component collects user input for work history,
 * education, certifications, skills, and links.
 * Includes calendar date pickers and dynamic field support for work history.
 */
export default function WorkExperience() {
    const [workExperience, setWorkExperience] = useState({
        workExperience: [{
            title: '',
            company: '',
            location: '',
            from: new Date(),
            to: new Date(),
            description: '',
        }],
        education: {
            school: '',
            degree: '',
            fieldOfStudy: '',
        },
        certificates: {
            certificate: '',
            certificateNumber: '',
            issueDate: new Date(),
            expirationDate: new Date(),
        },
        skills: "",
        linkedin: "",
        portfolio: "",
        links: {
            title: "",
            url: "",
        },
    });

    return (
        <div data-test-id="work-experience-section">
            <p className="text-[#a5a5a5] text-[16px]/[24px]" data-test-id="work-experience-description">
                Applicants will also fill in their work history, education, skills, and relevant links. These fields are required and already built into the process.
            </p>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-[32px] mt-[24px]">
                <div data-test-id="work-experience-block">
                    <div className="mb-[12px]">
                        <Label>Work Experience</Label>
                        {workExperience.workExperience.map((work, index) => (
                            <div key={index} data-test-id={`work-entry-${index}`}>
                                <div className={`grid xl:grid-cols-2 grid-cols-1 gap-[16px] ${index === 0 ? 'mt-0' : 'mt-[20px]'}`}>
                                    <Input placeholder="Job Title" className="w-full h-[48px]" data-test-id={`job-title-${index}`} />
                                    <Input placeholder="Company" className="w-full h-[48px]" data-test-id={`company-${index}`} />
                                </div>
                                <Input placeholder="Location (optional)" className="w-full h-[48px] mt-[14px]" data-test-id={`location-${index}`} />
                                <div className="grid xl:grid-cols-2 grid-cols-1 gap-[16px] mt-[14px]">
                                    <div>
                                        <Label>From</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    mode="input"
                                                    variant="outline"
                                                    id="date"
                                                    className={cn(
                                                        'w-full h-[48px] data-[state=open]:border-primary',
                                                        !workExperience.workExperience[index].from && 'text-muted-foreground',
                                                    )}
                                                    data-test-id={`from-date-trigger-${index}`}
                                                >
                                                    <CalendarDays className="-ms-0.5" />
                                                    {workExperience.workExperience[index].from
                                                        ? moment(workExperience.workExperience[index].from).format('DD/MM/YYYY')
                                                        : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="single"
                                                    defaultMonth={workExperience.workExperience[index].from || new Date()}
                                                    selected={workExperience.workExperience[index].from}
                                                    onSelect={(e) => setWorkExperience({
                                                        ...workExperience,
                                                        workExperience: workExperience.workExperience.map((w, i) =>
                                                            i === index ? { ...w, from: e as Date } : w
                                                        )
                                                    })}
                                                    numberOfMonths={1}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div>
                                        <Label>To</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    mode="input"
                                                    variant="outline"
                                                    id="date"
                                                    className={cn(
                                                        'w-full h-[48px] data-[state=open]:border-primary',
                                                        !workExperience.workExperience[index].to && 'text-muted-foreground',
                                                    )}
                                                    data-test-id={`to-date-trigger-${index}`}
                                                >
                                                    <CalendarDays className="-ms-0.5" />
                                                    {workExperience.workExperience[index].to
                                                        ? moment(workExperience.workExperience[index].to).format('DD/MM/YYYY')
                                                        : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="single"
                                                    defaultMonth={workExperience.workExperience[index].to || new Date()}
                                                    selected={workExperience.workExperience[index].to}
                                                    onSelect={(e) => setWorkExperience({
                                                        ...workExperience,
                                                        workExperience: workExperience.workExperience.map((w, i) =>
                                                            i === index ? { ...w, to: e as Date } : w
                                                        )
                                                    })}
                                                    numberOfMonths={1}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <Textarea
                                    placeholder="Role Description"
                                    className="w-full h-[68px] mt-[14px]"
                                    data-test-id={`role-description-${index}`}
                                />
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        className="mt-[12px] w-full"
                        onClick={() =>
                            setWorkExperience({
                                ...workExperience,
                                workExperience: [
                                    ...workExperience.workExperience,
                                    { title: '', company: '', location: '', from: new Date(), to: new Date(), description: '' },
                                ],
                            })
                        }
                        data-test-id="add-work-experience-btn"
                    >
                        Add Work Experience
                    </Button>
                </div>

                <div data-test-id="education-certificates-block">
                    <Label>Education</Label>
                    <Input placeholder="School or University" className="w-full h-[48px]" data-test-id="education-school" />
                    <Select>
                        <SelectTrigger className="w-full h-[48px] mt-[14px]" data-test-id="education-degree">
                            <SelectValue placeholder="Select a Degree" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bachelor">Bachelor's</SelectItem>
                            <SelectItem value="masters">Master's</SelectItem>
                            <SelectItem value="doctorate">Doctorate</SelectItem>
                            <SelectItem value="associate">Associate</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input placeholder="Field of Study" className="w-full h-[48px] mt-[14px]" data-test-id="education-field" />

                    <div className="mt-[24px] border-t border-[#e9e9e9] pt-[24px]">
                        <Label>Certifications</Label>
                        <Input placeholder="Certification" className="w-full h-[48px]" data-test-id="certificate-name" />
                        <Input placeholder="Certification Number" className="w-full h-[48px] mt-[14px]" data-test-id="certificate-number" />
                        <div className="grid xl:grid-cols-2 grid-cols-1 gap-[16px] mt-[14px]">
                            <div>
                                <Label>Issued Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            mode="input"
                                            variant="outline"
                                            id="date"
                                            className={cn(
                                                'w-full h-[48px] data-[state=open]:border-primary',
                                                !workExperience.certificates.issueDate && 'text-muted-foreground',
                                            )}
                                            data-test-id="certificate-issue-date"
                                        >
                                            <CalendarDays className="-ms-0.5" />
                                            {moment(workExperience.certificates.issueDate).format('DD/MM/YYYY')}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="single"
                                            defaultMonth={workExperience.certificates.issueDate || new Date()}
                                            selected={workExperience.certificates.issueDate}
                                            onSelect={(e) => setWorkExperience({
                                                ...workExperience,
                                                certificates: {
                                                    ...workExperience.certificates,
                                                    issueDate: e as Date
                                                }
                                            })}
                                            numberOfMonths={1}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <Label>Expiration Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            mode="input"
                                            variant="outline"
                                            id="date"
                                            className={cn(
                                                'w-full h-[48px] data-[state=open]:border-primary',
                                                !workExperience.certificates.expirationDate && 'text-muted-foreground',
                                            )}
                                            data-test-id="certificate-expiration-date"
                                        >
                                            <CalendarDays className="-ms-0.5" />
                                            {moment(workExperience.certificates.expirationDate).format('DD/MM/YYYY')}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="single"
                                            defaultMonth={workExperience.certificates.expirationDate || new Date()}
                                            selected={workExperience.certificates.expirationDate}
                                            onSelect={(e) => setWorkExperience({
                                                ...workExperience,
                                                certificates: {
                                                    ...workExperience.certificates,
                                                    expirationDate: e as Date
                                                }
                                            })}
                                            numberOfMonths={1}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className="mt-[24px]">
                            <Label>Skills</Label>
                            <Input placeholder="Skills" className="w-full h-[48px]" data-test-id="skills-input" />
                        </div>
                        <div className="mt-[24px]">
                            <Label>LinkedIn</Label>
                            <Input placeholder="LinkedIn" className="w-full h-[48px]" data-test-id="linkedin-input" />
                        </div>
                        <div className="mt-[24px]">
                            <Label>Website/Portfolio Link</Label>
                            <Input placeholder="Website/Portfolio Link" className="w-full h-[48px]" data-test-id="portfolio-input" />
                        </div>
                        <div className="mt-[24px]">
                            <Label>Other Links</Label>
                            <div className="grid xl:grid-cols-[1fr_2fr] grid-cols-1 gap-[16px]">
                                <Input placeholder="Title" className="w-full h-[48px]" data-test-id="link-title" />
                                <Input placeholder="Link" className="w-full h-[48px]" data-test-id="link-url" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
