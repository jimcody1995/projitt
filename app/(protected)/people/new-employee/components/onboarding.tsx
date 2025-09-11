'use client';

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Onboarding() {
    const [onboardingChecklist, setOnboardingChecklist] = useState({
        uploadId: true,
        personalInfo: true,
        bankTax: true,
        training: true,
        benefits: true
    });

    const [benefits, setBenefits] = useState({
        healthBenefit1: true,
        healthBenefit2: true,
        retirement401k: true
    });

    const [trainingPath, setTrainingPath] = useState('New Employee Onboarding Videos');

    const handleOnboardingChecklistChange = (item: string, checked: boolean) => {
        setOnboardingChecklist(prev => ({
            ...prev,
            [item]: checked
        }));
    };

    const handleBenefitsChange = (item: string, checked: boolean) => {
        setBenefits(prev => ({
            ...prev,
            [item]: checked
        }));
    };

    const trainingPaths = [
        'New Employee Onboarding Videos',
        'Department Specific Training',
        'Leadership Development Program',
        'Technical Skills Training',
        'Compliance Training',
        'Customer Service Training'
    ];

    return (
        <div className="md:w-[619px] w-full">
            <div>
                <h1 className="text-[20px]/[30px] font-semibold text-[#1C1C1C]">Onboarding</h1>
            </div>

            <div className="space-y-8 mt-[32px] w-full">
                {/* Onboarding Checklist */}
                <div className="space-y-[16px]">
                    <Label className="text-[14px]/[22px] font-medium text-[#353535]">
                        Onboarding Checklist
                    </Label>
                    <div className="space-y-[12px]">
                        {[
                            { key: 'uploadId', label: 'Upload ID & Certifications' },
                            { key: 'personalInfo', label: 'Complete Personal Information' },
                            { key: 'bankTax', label: 'Submit Bank & Tax info' },
                            { key: 'training', label: 'Training & Orientation' },
                            { key: 'benefits', label: 'Benefits' }
                        ].map((item) => (
                            <div key={item.key} className="flex items-center space-x-[12px]">
                                <Checkbox
                                    id={item.key}
                                    checked={onboardingChecklist[item.key as keyof typeof onboardingChecklist]}
                                    onCheckedChange={(checked) =>
                                        handleOnboardingChecklistChange(item.key, checked as boolean)
                                    }
                                />
                                <Label
                                    htmlFor={item.key}
                                    className="text-[14px]/[22px] font-medium text-[#353535] cursor-pointer"
                                >
                                    {item.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Select Training Learning Path */}
                <div className="space-y-[8px]">
                    <Label className="text-[14px]/[22px] font-medium text-[#353535]">
                        Select Training Learning Path
                    </Label>
                    <Select
                        value={trainingPath}
                        onValueChange={setTrainingPath}
                    >
                        <SelectTrigger className="w-full h-[48px]">
                            <SelectValue placeholder="Select Training Path" />
                        </SelectTrigger>
                        <SelectContent>
                            {trainingPaths.map((path) => (
                                <SelectItem key={path} value={path}>
                                    {path}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* What benefits does Alice have? */}
                <div className="space-y-[16px]">
                    <Label className="text-[14px]/[22px] font-medium text-[#353535]">
                        What benefits does Alice have?
                    </Label>
                    <div className="space-y-[12px]">
                        {[
                            { key: 'healthBenefit1', label: 'Health Benefit' },
                            { key: 'healthBenefit2', label: 'Health Benefit' },
                            { key: 'retirement401k', label: '401k' }
                        ].map((item) => (
                            <div key={item.key} className="flex items-center space-x-[12px]">
                                <Checkbox
                                    id={item.key}
                                    checked={benefits[item.key as keyof typeof benefits]}
                                    onCheckedChange={(checked) =>
                                        handleBenefitsChange(item.key, checked as boolean)
                                    }
                                />
                                <Label
                                    htmlFor={item.key}
                                    className="text-[14px]/[22px] font-medium text-[#353535] cursor-pointer"
                                >
                                    {item.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
