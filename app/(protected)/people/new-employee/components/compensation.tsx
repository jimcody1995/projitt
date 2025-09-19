'use client';

import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputWrapper } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export default function Compensation({
    employeeId,
    onFormDataChange,
    onValidation
}: {
    employeeId: string | null;
    onFormDataChange?: (data: any) => void;
    onValidation?: (validationFn: () => boolean) => void;
}) {
    const [earningStructure, setEarningStructure] = useState('salary');
    const [hourlyRate, setHourlyRate] = useState('50');

    const handleEarningStructureChange = (value: string) => {
        setEarningStructure(value);
        const newFormData = {
            earning_structure: value === 'salary' ? 'salary_based' : 'hourly_rate',
            rate: parseFloat(hourlyRate) || 0
        };
        onFormDataChange?.(newFormData);
    };

    const handleRateChange = (value: string) => {
        setHourlyRate(value);
        const newFormData = {
            earning_structure: earningStructure === 'salary' ? 'salary_based' : 'hourly_rate',
            rate: parseFloat(value) || 0
        };
        onFormDataChange?.(newFormData);
    };

    const validateForm = () => {
        const rate = parseFloat(hourlyRate);
        return !isNaN(rate) && rate > 0;
    };

    // Expose validation function to parent
    useEffect(() => {
        onValidation?.(validateForm);
    }, [earningStructure, hourlyRate, onValidation]);

    // Initialize form data
    useEffect(() => {
        const initialFormData = {
            earning_structure: earningStructure === 'salary' ? 'salary_based' : 'hourly_rate',
            rate: parseFloat(hourlyRate) || 0
        };
        onFormDataChange?.(initialFormData);
    }, []);

    return (
        <div className="md:w-[619px] w-full">
            <div>
                <h1 className="text-[20px]/[30px] font-semibold text-[#1C1C1C]">Compensation</h1>
            </div>

            <div className="space-y-6 mt-[32px] w-full">
                {/* Earning Structure */}
                <div className="space-y-[8px]">
                    <Label className="text-[14px]/[22px] font-medium text-[#353535]">
                        Earning Structure
                    </Label>
                    <RadioGroup
                        value={earningStructure}
                        onValueChange={handleEarningStructureChange}
                        className="flex gap-[32px]"
                    >
                        <div className="flex items-center space-x-[6px]">
                            <RadioGroupItem
                                value="salary"
                                id="salary"
                                className='cursor-pointer'
                            />
                            <Label
                                htmlFor="salary"
                                className={`text-[14px]/[22px] font-medium cursor-pointer ${earningStructure === 'salary' ? 'text-[#0D978B]' : 'text-[#353535]'
                                    }`}
                            >
                                Salary Based
                            </Label>
                        </div>
                        <div className="flex items-center space-x-[6px]">
                            <RadioGroupItem
                                value="hourly"
                                id="hourly"
                                className='cursor-pointer'
                            />
                            <Label
                                htmlFor="hourly"
                                className={`text-[14px]/[22px] font-medium cursor-pointer ${earningStructure === 'hourly' ? 'text-[#0D978B]' : 'text-[#353535]'
                                    }`}
                            >
                                Hourly Rate
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Hourly Rate Input */}
                {earningStructure === 'hourly' && (
                    <div className="space-y-[8px]">
                        <Label htmlFor="hourlyRate" className="text-[14px]/[22px] font-medium text-[#353535]">
                            Hourly Rate
                        </Label>
                        <InputWrapper className="w-full h-[48px]">
                            <DollarSign className="h-4 w-4 text-[#8f8f8f]" />
                            <input
                                id="hourlyRate"
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => handleRateChange(e.target.value)}
                                className="flex-1 border-0 outline-none bg-transparent text-[#353535] placeholder:text-[#8f8f8f]"
                                placeholder="0"
                            />
                        </InputWrapper>
                    </div>
                )}
                {earningStructure === 'salary' && (
                    <div className="space-y-[8px]">
                        <Label htmlFor="hourlyRate" className="text-[14px]/[16px] font-medium text-[#1c1c1c]">
                            Salary
                        </Label>
                        <InputWrapper className="w-full h-[48px]">
                            <DollarSign className="h-4 w-4 text-[#8f8f8f]" />
                            <input
                                id="salary"
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => handleRateChange(e.target.value)}
                                className="flex-1 border-0 outline-none bg-transparent text-[#353535] placeholder:text-[#8f8f8f]"
                                placeholder="0"
                            />
                        </InputWrapper>
                    </div>
                )}
            </div>
        </div>
    );
}