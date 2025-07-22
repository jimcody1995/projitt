'use client';
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { DateInput } from "@/components/ui/datefield";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { date } from "zod";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import TagInput from "@/components/ui/tag-input";
import { useRouter } from "next/navigation";

export default function JobDetails({ jobData, setJobData }: { jobData: any; setJobData: any }) {
    const [locationType, setLocationType] = useState('onsite');
    const router = useRouter();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [tags, setTags] = useState<string[]>(["UI/UX Prototyping", "Wireframi"]);

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-[20px]/[30px] font-semibold text-[#353535]">Job Details</h1>
                <div className="flex items-center gap-[8px]">
                    <Switch shape="square" size="md" />
                    <p className="text-[14px]/[16px] text-[#1c1c1c]">AI Scoring</p>
                </div>
            </div>
            <div className="grid gap-[48px] xl:grid-cols-2 grid-cols-1 mt-[33px]">
                <div className="flex flex-col gap-[12px]">
                    <p className="text-[14px]/[16px] text-[#1c1c1c]">Job Title *</p>
                    <Input className="h-[48px]" placeholder="e.g Sales Representative" value={jobData?.jobTitle} onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })} />
                </div>
                <div className="flex flex-col gap-[12px]">
                    <p className="text-[14px]/[16px] text-[#1c1c1c]">Department *</p>
                    <Select defaultValue="sales" value={jobData?.department} onValueChange={(e) => setJobData({ ...jobData, department: e })}>
                        <SelectTrigger className="h-[48px]">
                            <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="it">IT</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <p className="text-[14px]/[16px] text-[#1c1c1c]">Employment Type*</p>
                    <Select defaultValue="full-time" value={jobData?.employmentType} onValueChange={(e) => setJobData({ ...jobData, employmentType: e })}>
                        <SelectTrigger className="h-[48px]">
                            <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <p className="text-[14px]/[16px] text-[#1c1c1c]">No. of Openings*</p>
                    <Select defaultValue="1" value={jobData?.numberOfOpenings} onValueChange={(e) => setJobData({ ...jobData, numberOfOpenings: e })}>
                        <SelectTrigger className="h-[48px]">
                            <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Skills*</p>
                        <p className="text-[12px]/[20px] text-[#8f8f8f] mt-[4px]">Add 3–6 skills to help AI match stronger applicants. </p>
                    </div>
                    <TagInput tags={jobData?.skills} setTags={(tags) => setJobData({ ...jobData, skills: tags })} />
                </div>
                <div className="flex flex-col gap-[12px]">
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Location Type*</p>
                        <p className="text-[12px]/[20px] text-[#8f8f8f] mt-[4px]">Choose based on where the role is performed not where the company is based.</p>
                    </div>
                    <div>
                        <RadioGroup className="flex gap-[32px]" defaultValue="onsite" onValueChange={(e) => setLocationType(e as string)}>
                            <div className="flex gap-[6px]">
                                <RadioGroupItem value="onsite" id="onsite" />
                                <Label htmlFor="onsite" variant="secondary" className={'text-[14px]/[20px] ' + (locationType === 'onsite' ? 'text-[#0d978b]' : '')}>
                                    Onsite
                                </Label>
                            </div>
                            <div className="flex gap-[6px]">
                                <RadioGroupItem value="hybrid" id="hybrid" />
                                <Label htmlFor="hybrid" variant="secondary" className={'text-[14px]/[20px] ' + (locationType === 'hybrid' ? 'text-[#0d978b]' : '')}>
                                    Hybrid
                                </Label>
                            </div>
                            <div className="flex gap-[6px]">
                                <RadioGroupItem value="remote" id="remote" />
                                <Label htmlFor="remote" variant="secondary" className={'text-[14px]/[20px] ' + (locationType === 'remote' ? 'text-[#0d978b]' : '')}>
                                    Remote
                                </Label>
                            </div>
                        </RadioGroup>
                        {(locationType === 'onsite' || locationType === 'hybrid') && <div className="flex flex-col gap-[10px] mt-[10px]">
                            <Select>
                                <SelectTrigger className="h-[48px]">
                                    <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="state1">State 1</SelectItem>
                                    <SelectItem value="state2">State 2</SelectItem>
                                    <SelectItem value="state3">State 3</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="usa">
                                <SelectTrigger className="h-[48px]">
                                    <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="usa">United States of America</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="canada">Canada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>}
                        {locationType === 'remote' && <div className="flex flex-col gap-[12px] mt-[10px]">
                            <Select>
                                <SelectTrigger className="h-[48px]">
                                    <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="usa">United States of America</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="canada">Canada</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex items-center gap-[8px]">
                                <input type="checkbox" placeholder="Remote (Global)" className="h-[14px] accent-[#0d978b]" />
                                <p className="text-[14px]/[20px] text-[#4b4b4b]">Remote (Global)</p>
                            </div>

                        </div>}
                    </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Salary <span className="text-[#787878]">(optional)</span></p>
                        <p className="text-[12px]/[20px] text-[#8f8f8f] mt-[4px]">Adding a range boosts visibility by up to 40%. If unsure, give your best estimate. </p>
                    </div>
                    <Input className="h-[48px]" placeholder="e.g $150,000-$200,000 p.a" value={jobData?.salary} onChange={(e) => setJobData({ ...jobData, salary: e.target.value })} />
                </div>
                <div className="flex flex-col gap-[12px]">
                    <div>
                        <p className="text-[14px]/[16px] text-[#1c1c1c]">Deadline <span className="text-[#787878]">(optional)</span></p>
                        <p className="text-[12px]/[20px] text-[#8f8f8f] mt-[4px]">Set a deadline to reflect urgency. </p>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                mode="input"
                                variant="outline"
                                id="date"
                                className={cn(
                                    'w-full h-[48px] data-[state=open]:border-primary',
                                    !date && 'text-muted-foreground',
                                )}
                            >
                                <CalendarDays className="-ms-0.5" />
                                {jobData?.deadline ? moment(jobData?.deadline).format('DD/MM/YYYY') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="single" // Single date selection
                                defaultMonth={jobData?.deadline}
                                selected={jobData?.deadline}
                                onSelect={(e) => setJobData({ ...jobData, deadline: e })}
                                numberOfMonths={1}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}