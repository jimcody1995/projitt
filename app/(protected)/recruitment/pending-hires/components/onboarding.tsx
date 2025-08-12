'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowLeft, BriefcaseBusiness, CalendarDays, PieChart, Search } from "lucide-react";
import moment from "moment";

/**
 * @description
 * Onboarding is a component designed to manage and configure the onboarding process for a new hire.
 * It displays a new employee's key information and provides a form for setting up their initial company access and tasks.
 * The component includes fields for the employee's company email, their assigned manager, team, and start date.
 * It also features interactive checklists for standard onboarding procedures and activities, as well as a dropdown for selecting a training path.
 * Unique `data-testid` and `id` attributes are added to all key UI elements to support test automation.
 */
export default function Onboarding({ setOnboarding }: { setOnboarding: any }) {
    const onboardingCheckinglist = [
        "Upload ID & Certifications",
        "Complete Personal Information",
        "Submit Bank & Tax info",
        "Training & Orientation",
        "Benefits ",
        "Background Check"
    ];

    const onboardingAcitivites = [
        "Email ID Creation",
        "Laptop Issue",
        "Office Tour",
    ]
    return (<div>
        <div className='flex gap-[16px] items-center'>
            <button className='w-[24px] h-[24px] rounded-full border border-[#e9e9e9] flex items-center justify-center cursor-pointer'
                onClick={() => setOnboarding(null)}
            >
                <ArrowLeft className='size-[12px] text-[#4b4b4b]' />
            </button>
            <p
                className='text-[24px]/[30px] font-semibold'
                data-testid="page-title"
            >
                Onboarding
            </p>
        </div>
        <div className="mt-[22px] w-full rounded-[20px] bg-[#fff] border border-[#e9e9e9] py-[40px] pl-[48px] pr-[77px]">
            <div className="flex justify-between sm:flex-row flex-col gap-[10px]">
                <div>
                    <p className="font-semibold text-[20px]/[30px] text-[#8f8f8f]"><span className="text-[#1C1C1C]">Alice Fernadez</span> ~ Senior Data Analyst </p>
                    <div className="flex gap-[15px] mt-[6px]">
                        <span
                            className='text-[14px]/[22px] px-[8px] flex items-center gap-[2px] text-[#4b4b4b]'
                        >
                            <PieChart className='size-[20px] text-[#00d47d]' />
                            Data
                        </span>
                        <span
                            className='text-[14px]/[22px] px-[8px] flex items-center gap-[2px] text-[#4b4b4b]'
                        >
                            <BriefcaseBusiness className='size-[20px] text-[#4b4b4b]' />
                            Fulltime
                        </span>
                    </div>
                </div>
                <Button className="w-[208px] h-[42px] ">Send Onboarding Invite</Button>
            </div>
            <div className="mt-[40px] flex flex-col gap-[32px] md:w-[623px] w-full">
                <div>
                    <p className="text-[14px]/[16px]  text-[#1C1C1C]">Email address</p>
                    <p className="text-[12px]/[20px]  text-[#8f8f8f] mt-[4px]">The email address that will be used to sign in to Projitt and receive personal info.</p>
                    <Input type="email" value="alicefernadez@Zaid LLC.com" className="h-[48px]" />
                </div>
                <div>
                    <p className="text-[14px]/[16px]  text-[#1C1C1C]">Manager</p>
                    <p className="text-[12px]/[20px]  text-[#8f8f8f] mt-[4px]">Assign this emloyee to a manager. </p>
                    <div className="relative">
                        <Search className="size-[18px] text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                        <Input
                            placeholder=""
                            className="ps-9 w-full h-[48px]"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-[14px]/[16px]  text-[#1C1C1C]">Add to Team</p>
                    <div className="relative">
                        <Search className="size-[18px] text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                        <Input
                            placeholder=""
                            className="ps-9 w-full h-[48px]"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-[14px]/[16px]  text-[#1C1C1C]">Select Start Date</p>
                    <div className="relative mt-[6px]">
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
                                    data-testid="start-date-calendar"
                                    id="start-date-calendar"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div data-testid="onboarding-checklist-section">
                    <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="onboarding-checklist-label" id="onboarding-checklist-label">Onboarding Checklist</p>
                    <div className="flex flex-col gap-[16px] mt-[12px]">
                        {onboardingCheckinglist.map((item, index) => (
                            <div key={index} className="flex items-center gap-[6px]" data-testid={`checklist-item-${index}`} id={`checklist-item-${index}`}>
                                <Checkbox className="size-[24px] text-[#0d978b]" data-testid={`checklist-checkbox-${index}`} id={`checklist-checkbox-${index}`} />
                                <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid={`checklist-text-${index}`}>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div data-testid="onboarding-activities-section">
                    <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="onboarding-activities-label" id="onboarding-activities-label">Onboarding Activities</p>
                    <div className="flex flex-col gap-[16px] mt-[12px]">
                        {onboardingAcitivites.map((item, index) => (
                            <div key={index} className="flex items-center gap-[6px]" data-testid={`activity-item-${index}`} id={`activity-item-${index}`}>
                                <Checkbox className="size-[24px] text-[#0d978b]" data-testid={`activity-checkbox-${index}`} id={`activity-checkbox-${index}`} />
                                <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid={`activity-text-${index}`}>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div data-testid="training-path-section">
                    <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="training-path-label" id="training-path-label">Select Training Learning Path</p>
                    <Select value="1" data-testid="training-path-select">
                        <SelectTrigger className="w-full h-[48px] mt-[6px]" data-testid="training-path-select-trigger" id="training-path-select-trigger">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent data-testid="training-path-select-content" id="training-path-select-content">
                            <SelectItem value="1" data-testid="training-path-item-1" id="training-path-item-1">New Employee Onboarding Videos</SelectItem>
                            <SelectItem value="2" data-testid="training-path-item-2" id="training-path-item-2">Path 2</SelectItem>
                            <SelectItem value="3" data-testid="training-path-item-3" id="training-path-item-3">Path 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    </div>
    );
}
