'use client';

import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDataForBasic } from '@/api/master';

interface OnboardingProps {
    employeeId: string | null;
    onFormDataChange?: (data: any) => void;
    onValidation?: (validationFn: () => boolean) => void;
}

export default function Onboarding({ employeeId, onFormDataChange, onValidation }: OnboardingProps) {
    const [onboardingChecklist, setOnboardingChecklist] = useState<any[]>([]);
    const [benefits, setBenefits] = useState<any[]>([]);
    const [trainingPath, setTrainingPath] = useState('New Employee Onboarding Videos');
    const [selectedChecklistIds, setSelectedChecklistIds] = useState<number[]>([]);
    const [selectedBenefitIds, setSelectedBenefitIds] = useState<number[]>([]);

    const handleOnboardingChecklistChange = (itemId: number, checked: boolean) => {
        if (checked) {
            setSelectedChecklistIds(prev => [...prev, itemId]);
        } else {
            setSelectedChecklistIds(prev => prev.filter(id => id !== itemId));
        }
    };

    const handleBenefitsChange = (itemId: number, checked: boolean) => {
        if (checked) {
            setSelectedBenefitIds(prev => [...prev, itemId]);
        } else {
            setSelectedBenefitIds(prev => prev.filter(id => id !== itemId));
        }
    };

    useEffect(() => {
        const fetchOnboardingChecklist = async () => {
            const response = await getDataForBasic({ type_id: 7 });
            setOnboardingChecklist(response.data);
        };
        fetchOnboardingChecklist();

        const fetchBenefits = async () => {
            const response = await getDataForBasic({ type_id: 8 });
            setBenefits(response.data);
        };
        fetchBenefits();
    }, []);

    // Update form data when selections change
    useEffect(() => {
        const formData = {
            onboardingChecklistIds: selectedChecklistIds,
            trainingLearningPath: trainingPath,
            benefitIds: selectedBenefitIds
        };
        onFormDataChange?.(formData);
    }, [selectedChecklistIds, trainingPath, selectedBenefitIds, onFormDataChange]);

    // Set up validation function
    useEffect(() => {
        const validateForm = () => {
            return selectedChecklistIds.length > 0 && selectedBenefitIds.length > 0;
        };
        onValidation?.(validateForm);
    }, [selectedChecklistIds, selectedBenefitIds, onValidation]);

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
                        {onboardingChecklist.map((item) => (
                            <div key={item.id} className="flex items-center space-x-[12px]">
                                <Checkbox
                                    id={item.id}
                                    checked={selectedChecklistIds.includes(item.id)}
                                    onCheckedChange={(checked) =>
                                        handleOnboardingChecklistChange(item.id, checked as boolean)
                                    }
                                />
                                <Label
                                    htmlFor={item.id}
                                    className="text-[14px]/[22px] font-medium text-[#353535] cursor-pointer"
                                >
                                    {item.name}
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
                        {benefits.map((item) => (
                            <div key={item.id} className="flex items-center space-x-[12px]">
                                <Checkbox
                                    id={item.id}
                                    checked={selectedBenefitIds.includes(item.id)}
                                    onCheckedChange={(checked) =>
                                        handleBenefitsChange(item.id, checked as boolean)
                                    }
                                />
                                <Label
                                    htmlFor={item.id}
                                    className="text-[14px]/[22px] font-medium text-[#353535] cursor-pointer"
                                >
                                    {item.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
