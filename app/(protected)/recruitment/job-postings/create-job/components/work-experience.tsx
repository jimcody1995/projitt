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
        <div>
            <p className="text-[#a5a5a5] text-[16px]/[24px]">Applicants will also fill in their work history, education, skills, and relevant links. These fields are required and already built into the process.</p>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-[32px] mt-[24px]">
                <div>
                    <div className="mb-[12px]">
                        <Label>Work Experience</Label>
                        {workExperience.workExperience.map((work, index) => (
                            <>
                                <div className={`grid xl:grid-cols-2 grid-cols-1 gap-[16px] ${index === 0 ? 'mt-0' : 'mt-[20px]'} `}>
                                    <Input placeholder="Job Title" className="w-full h-[48px]" />
                                    <Input placeholder="Company" className="w-full h-[48px]" />
                                </div>
                                <Input placeholder="Location (optional)" className="w-full h-[48px] mt-[14px]" />
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
                                                >
                                                    <CalendarDays className="-ms-0.5" />
                                                    {workExperience.workExperience[index].from ? moment(workExperience.workExperience[index].from).format('DD/MM/YYYY') : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="single" // Single date selection
                                                    defaultMonth={workExperience.workExperience[index].from || new Date()}
                                                    selected={workExperience.workExperience[index].from}
                                                    onSelect={(e) => setWorkExperience({ ...workExperience, workExperience: [...workExperience.workExperience, { ...workExperience.workExperience[index], from: e as Date }] })}
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
                                                >
                                                    <CalendarDays className="-ms-0.5" />
                                                    {workExperience.workExperience[index].to ? moment(workExperience.workExperience[index].to).format('DD/MM/YYYY') : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="single" // Single date selection
                                                    defaultMonth={workExperience.workExperience[index].to || new Date()}
                                                    selected={workExperience.workExperience[index].to}
                                                    onSelect={(e) => setWorkExperience({ ...workExperience, workExperience: [...workExperience.workExperience, { ...workExperience.workExperience[index], to: e as Date }] })}
                                                    numberOfMonths={1}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <Textarea placeholder="Role Description" className="w-full h-[68px] mt-[14px]" />
                            </>
                        ))}
                    </div>
                    <Button variant="outline" className="mt-[12px] w-full" onClick={() => setWorkExperience({ ...workExperience, workExperience: [...workExperience.workExperience, { title: '', company: '', location: '', from: new Date(), to: new Date(), description: '' }] })}>Add Work Experience</Button>
                </div>

                <div>
                    <Label>Education</Label>
                    <Input placeholder="School or University" className="w-full h-[48px]" />
                    <Select>
                        <SelectTrigger className="w-full h-[48px] mt-[14px]">
                            <SelectValue placeholder="Select a Degree" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bachelor">Bachelor's</SelectItem>
                            <SelectItem value="masters">Master's</SelectItem>
                            <SelectItem value="doctorate">Doctorate</SelectItem>
                            <SelectItem value="associate">Associate</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input placeholder="Field of Study" className="w-full h-[48px] mt-[14px]" />
                    <div className="mt-[24px] border-t border-[#e9e9e9] pt-[24px]">
                        <Label>Certifications</Label>
                        <Input placeholder="Certification" className="w-full h-[48px]" />
                        <Input placeholder="Certification Number" className="w-full h-[48px] mt-[14px]" />
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
                                        >
                                            <CalendarDays className="-ms-0.5" />
                                            {workExperience.certificates.issueDate ? moment(workExperience.certificates.issueDate).format('DD/MM/YYYY') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="single" // Single date selection
                                            defaultMonth={workExperience.certificates.issueDate || new Date()}
                                            selected={workExperience.certificates.issueDate}
                                            onSelect={(e) => setWorkExperience({ ...workExperience, certificates: { ...workExperience.certificates, issueDate: e as Date } })}
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
                                                !workExperience.certificates.issueDate && 'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarDays className="-ms-0.5" />
                                            {workExperience.certificates.issueDate ? moment(workExperience.certificates.issueDate).format('DD/MM/YYYY') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="single" // Single date selection
                                            defaultMonth={workExperience.certificates.expirationDate || new Date()}
                                            selected={workExperience.certificates.expirationDate}
                                            onSelect={(e) => setWorkExperience({ ...workExperience, certificates: { ...workExperience.certificates, expirationDate: e as Date } })}
                                            numberOfMonths={1}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="mt-[24px]">
                            <Label>Skills</Label>
                            <Input placeholder="Skills" className="w-full h-[48px]" />
                        </div>
                        <div className="mt-[24px]">
                            <Label>LinkedIn</Label>
                            <Input placeholder="LinkedIn" className="w-full h-[48px]" />
                        </div>
                        <div className="mt-[24px]">
                            <Label>Website/Portfolio Link</Label>
                            <Input placeholder="Website/Portfolio Link" className="w-full h-[48px]" />
                        </div>
                        <div className="mt-[24px]">
                            <Label>Other Links</Label>
                            <div className="grid xl:grid-cols-[1fr_2fr] grid-cols-1 gap-[16px]">
                                <Input placeholder="Title" className="w-full h-[48px]" />
                                <Input placeholder="Link" className="w-full h-[48px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}