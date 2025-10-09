'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowLeft, BriefcaseBusiness, CalendarDays, PieChart, Search } from "lucide-react";
import { formatDate } from "@/lib/date-utils";

// Bag component from SVG
const Bag = ({ className }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.97098 2H8.02902C8.53079 2 8.94884 2 9.28037 2.04465C9.63088 2.09153 9.94735 2.19535 10.2013 2.4493C10.4558 2.70381 10.5596 3.02028 10.6065 3.37023C10.64 3.61581 10.6484 3.90828 10.6506 4.24651C11.0123 4.25823 11.3349 4.28 11.6218 4.31795C12.2759 4.40614 12.8056 4.59144 13.2236 5.00893C13.6411 5.42698 13.8264 5.95665 13.9146 6.61079C14 7.24707 14 8.05916 14 9.08502V9.14754C14 10.1734 14 10.986 13.9146 11.6218C13.8264 12.2759 13.6411 12.8056 13.2236 13.2236C12.8056 13.6411 12.2759 13.8264 11.6218 13.9146C10.9855 14 10.1734 14 9.14754 14H6.85247C5.8266 14 5.01395 14 4.37823 13.9146C3.72409 13.8264 3.19442 13.6411 2.77637 13.2236C2.35888 12.8056 2.17358 12.2759 2.0854 11.6218C2 10.9855 2 10.1734 2 9.14754V9.08502C2 8.05916 2 7.24651 2.0854 6.61079C2.17358 5.95665 2.35888 5.42698 2.77637 5.00893C3.19442 4.59144 3.72409 4.40614 4.37823 4.31795C4.70061 4.27846 5.02471 4.25461 5.3494 4.24651C5.35163 3.90828 5.36056 3.61581 5.39349 3.37023C5.44037 3.02028 5.54419 2.70381 5.79814 2.4493C6.05265 2.19535 6.36912 2.09209 6.71907 2.04465C7.05116 2 7.46977 2 7.97098 2ZM6.18716 4.23367C6.39814 4.23256 6.61991 4.23219 6.85247 4.23256H9.14754C9.38009 4.23256 9.60186 4.23293 9.81284 4.23367C9.81061 3.91553 9.80279 3.67553 9.77712 3.48186C9.74195 3.22456 9.68223 3.11405 9.60967 3.04149C9.53712 2.96893 9.4266 2.90921 9.16874 2.87405C8.89972 2.83833 8.53805 2.83721 8 2.83721C7.46195 2.83721 7.10028 2.83833 6.8307 2.8746C6.5734 2.90921 6.46288 2.96893 6.39033 3.04205C6.31777 3.11516 6.25805 3.22456 6.22288 3.48186C6.19721 3.67498 6.1894 3.91498 6.18716 4.23367ZM4.4893 5.14791C3.92781 5.22326 3.60409 5.36502 3.36744 5.60112C3.13191 5.83721 2.99014 6.16093 2.91479 6.72242C2.83777 7.29563 2.83665 8.05191 2.83665 9.11628C2.83665 10.1807 2.83777 10.9369 2.91479 11.5107C2.99014 12.0716 3.13191 12.3953 3.368 12.6314C3.60409 12.8675 3.92781 13.0093 4.4893 13.0847C5.06307 13.1617 5.81879 13.1628 6.88316 13.1628H9.11572C10.1801 13.1628 10.9364 13.1617 11.5101 13.0847C12.0711 13.0093 12.3948 12.8675 12.6309 12.6314C12.867 12.3953 13.0087 12.0716 13.0841 11.5101C13.1611 10.9369 13.1622 10.1807 13.1622 9.11628C13.1622 8.05191 13.1611 7.29619 13.0841 6.72186C13.0087 6.16093 12.867 5.83721 12.6309 5.60112C12.3948 5.36502 12.0711 5.22326 11.5096 5.14791C10.9364 5.07088 10.1801 5.06977 9.11572 5.06977H6.88316C5.81879 5.06977 5.06363 5.07088 4.4893 5.14791Z" fill="currentColor" />
        <path d="M10.7907 6.32572C10.7907 6.47375 10.7319 6.61571 10.6272 6.72038C10.5226 6.82505 10.3806 6.88386 10.2326 6.88386C10.0845 6.88386 9.94258 6.82505 9.83791 6.72038C9.73324 6.61571 9.67444 6.47375 9.67444 6.32572C9.67444 6.17769 9.73324 6.03572 9.83791 5.93105C9.94258 5.82638 10.0845 5.76758 10.2326 5.76758C10.3806 5.76758 10.5226 5.82638 10.6272 5.93105C10.7319 6.03572 10.7907 6.17769 10.7907 6.32572ZM6.3256 6.32572C6.3256 6.47375 6.2668 6.61571 6.16212 6.72038C6.05745 6.82505 5.91549 6.88386 5.76746 6.88386C5.61943 6.88386 5.47747 6.82505 5.3728 6.72038C5.26812 6.61571 5.20932 6.47375 5.20932 6.32572C5.20932 6.17769 5.26812 6.03572 5.3728 5.93105C5.47747 5.82638 5.61943 5.76758 5.76746 5.76758C5.91549 5.76758 6.05745 5.82638 6.16212 5.93105C6.2668 6.03572 6.3256 6.17769 6.3256 6.32572Z" fill="currentColor" />
    </svg>
);

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
    ];
    const [continueBtn, setContinueBtn] = useState(true);
    return (
        <div>
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
            <div className="mt-[22px] w-full rounded-tl-[20px] rounded-tr-[20px] bg-[#fff] border border-[#e9e9e9] py-[40px] pl-[48px] pr-[77px]">
                <div className="flex justify-between sm:flex-row flex-col gap-[10px]">
                    <div>
                        <p className="font-semibold text-[20px]/[30px] text-[#8f8f8f]"><span className="text-[#1C1C1C]">Alice Fernadez</span> ~ Senior Data Analyst </p>
                        <div className="flex gap-[15px] mt-[6px]">
                            <span
                                className='text-[14px]/[22px] px-[4px] flex items-center gap-[2px] text-[#4b4b4b]'
                            >
                                <PieChart className='size-[20px] text-[#00d47d]' />
                                Data
                            </span>
                            <span
                                className='text-[14px]/[22px] px-[8px] flex items-center gap-[2px] text-[#4b4b4b]'
                            >
                                <Bag className='size-[20px] text-[#4b4b4b]' />
                                Fulltime
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-[12px]">
                        {continueBtn ? (
                            <Button className="w-[111px] h-[42px] rounded-[8px]" onClick={() => setContinueBtn(false)}>Continue</Button>
                        ) : (
                            <>
                                <Button className="w-[85px] h-[42px] text-primary-950 border border-[#E9E9E9] rounded-[8px]" variant="outline" onClick={() => setContinueBtn(true)}>Back</Button>
                                <Button className="w-[208px] h-[42px] rounded-[8px]">Send Onboarding Invite</Button>
                            </>
                        )}
                    </div>
                </div>
            </div >
            <div className=" w-full rounded-bl-[20px] rounded-br-[20px] bg-[#fff] border border-[#e9e9e9] pt-[22px] pb-[40px] pl-[48px] pr-[77px]">
                {continueBtn ?
                    (<div className=" flex pt-0 flex-col gap-[32px] md:w-[623px] w-full">
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
                                            {formatDate(new Date())}
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
                        <div data-testid="background-checks-section" className="mb-[20px]">
                            <p className="text-[14px]/[16px] text-[#1C1C1C] mb-[6px]">
                                Do you want to perform background checks?
                            </p>
                            <div className="flex items-center gap-[24px] mt-[12px]">
                                <label className="flex items-center gap-[6px] cursor-pointer">
                                    <input
                                        type="radio"
                                        name="background-checks"
                                        value="yes"
                                        defaultChecked
                                        className="accent-[#0d978b] size-[20px]"
                                        data-testid="background-checks-yes"
                                    />
                                    <span className="text-[14px]/[16px] text-[#0d978b]">Yes</span>
                                </label>
                                <label className="flex items-center gap-[6px] cursor-pointer">
                                    <input
                                        type="radio"
                                        name="background-checks"
                                        value="no"
                                        className="accent-[#bcbcbc] size-[20px]"
                                        data-testid="background-checks-no"
                                    />
                                    <span className="text-[14px]/[16px] text-[#4b4b4b]">No</span>
                                </label>
                            </div>
                        </div>
                        <div data-testid="request-referrals-section" className="mb-[20px]">
                            <p className="text-[14px]/[16px] text-[#1C1C1C] mb-[6px]">
                                Do you want to request for Referrals?
                            </p>
                            <div className="flex items-center gap-[24px] mt-[12px]">
                                <label className="flex items-center gap-[6px] cursor-pointer">
                                    <input
                                        type="radio"
                                        name="request-referrals"
                                        value="yes"
                                        defaultChecked
                                        className="accent-[#0d978b] size-[20px]"
                                        data-testid="request-referrals-yes"
                                    />
                                    <span className="text-[14px]/[16px] text-[#0d978b]">Yes</span>
                                </label>
                                <label className="flex items-center gap-[6px] cursor-pointer">
                                    <input
                                        type="radio"
                                        name="request-referrals"
                                        value="no"
                                        className="accent-[#bcbcbc] size-[20px]"
                                        data-testid="request-referrals-no"
                                    />
                                    <span className="text-[14px]/[16px] text-[#4b4b4b]">No</span>
                                </label>
                            </div>
                        </div>
                        <div data-testid="training-path-section">
                            <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="training-path-label" id="training-path-label">Select Training Learning Path</p>
                            <Select value="1" data-testid="training-path-select">
                                <SelectTrigger className="w-full h-[48px] mt-[6px] text-gray-800" data-testid="training-path-select-trigger" id="training-path-select-trigger">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent data-testid="training-path-select-content" id="training-path-select-content">
                                    <SelectItem value="1" data-testid="training-path-item-1" id="training-path-item-1">New Employee Onboarding Videos</SelectItem>
                                    <SelectItem value="2" data-testid="training-path-item-2" id="training-path-item-2">Path 2</SelectItem>
                                    <SelectItem value="3" data-testid="training-path-item-3" id="training-path-item-3">Path 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>) :
                    (<>
                        <div>
                            <p className="text-[16px]/[24px]  text-[#1C1C1C]">Background Checks</p>
                        </div>
                        <div className="mt-[20px] flex pt-0 flex-col gap-[32px] md:w-[623px] w-full">
                            <div>
                                <p className="text-[14px]/[16px]  text-[#1C1C1C] mb-[6px]">SSN Last 4</p>
                                <Input type="input" className="h-[48px]" />
                            </div>
                            <div>
                                <p className="text-[14px]/[16px]  text-[#1C1C1C]">Date of Birth</p>
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
                                                {formatDate(new Date())}
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
                            <div data-testid="training-path-section">
                                <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="training-path-label" id="training-path-label">Regions</p>
                                <Select value="1" data-testid="training-path-select">
                                    <SelectTrigger className="w-full h-[48px] mt-[6px] text-gray-800" data-testid="training-path-select-trigger" id="training-path-select-trigger">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent data-testid="training-path-select-content" id="training-path-select-content">
                                        <SelectItem value="1" data-testid="training-path-item-1" id="training-path-item-1">Medium</SelectItem>
                                        <SelectItem value="2" data-testid="training-path-item-2" id="training-path-item-2">Path 2</SelectItem>
                                        <SelectItem value="3" data-testid="training-path-item-3" id="training-path-item-3">Path 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div data-testid="training-path-section">
                                <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="training-path-label" id="training-path-label">Sensitivity</p>
                                <Select value="1" data-testid="training-path-select">
                                    <SelectTrigger className="w-full h-[48px] mt-[6px] text-gray-800" data-testid="training-path-select-trigger" id="training-path-select-trigger">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent data-testid="training-path-select-content" id="training-path-select-content">
                                        <SelectItem value="1" data-testid="training-path-item-1" id="training-path-item-1">Medium</SelectItem>
                                        <SelectItem value="2" data-testid="training-path-item-2" id="training-path-item-2">Path 2</SelectItem>
                                        <SelectItem value="3" data-testid="training-path-item-3" id="training-path-item-3">Path 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-[6px]" data-testid="confirm-bg-checks">
                                <Checkbox className="size-[24px] text-[#0d978b]" />
                                <p className="text-[14px]/[16px] text-[#4b4b4b]" >I confirm I have candidate consent for background checks.</p>
                            </div>
                            <div data-testid="background-checks-section">
                                <p className="text-[14px]/[16px] text-[#1C1C1C]" data-testid="background-checks-label" id="background-checks-label">Checks</p>
                                <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
                                    <div className="flex items-center gap-[8px]" data-testid="check-item-criminal" id="check-item-criminal">
                                        <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-criminal" id="check-checkbox-criminal" />
                                        <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-criminal">Criminal</p>
                                    </div>
                                    <div className="flex items-center gap-[8px]" data-testid="check-item-employment" id="check-item-employment">
                                        <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-employment" id="check-checkbox-employment" />
                                        <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-employment">Employment</p>
                                    </div>
                                    <div className="flex items-center gap-[8px]" data-testid="check-item-education" id="check-item-education">
                                        <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-education" id="check-checkbox-education" />
                                        <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-education">Education</p>
                                    </div>
                                    <div className="flex items-center gap-[8px]" data-testid="check-item-identity" id="check-item-identity">
                                        <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-identity" id="check-checkbox-identity" />
                                        <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-identity">Identity</p>
                                    </div>
                                    <div className="flex items-center gap-[8px]" data-testid="check-item-credit" id="check-item-credit">
                                        <Checkbox className="size-[24px] text-[#0d978b]" data-testid="check-checkbox-credit" id="check-checkbox-credit" />
                                        <p className="text-[14px]/[16px] text-[#4b4b4b]" data-testid="check-text-credit">Credit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    )}
            </div>
        </div >
    )
}
