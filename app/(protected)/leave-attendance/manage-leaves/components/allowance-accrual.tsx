'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function AllowanceAccrual() {
    const [formData, setFormData] = useState({
        accrualMethod: 'monthly',
        accrualHours: '',
        allowCarryover: 'yes',
        minimumNoticePeriod: '',
        maximumCarryover: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="space-y-8 md:w-[480px] w-full px-[45px] py-[42px]">
            <div>
                <h2 className="text-[22px]/[30px] font-semibold text-[#353535] mb-6">Allowance & Accrual</h2>

                <div className="space-y-7">
                    {/* Accrual Method */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-black font-medium">Accrual Method</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Select
                                value={formData.accrualMethod}
                                onValueChange={(value) => handleInputChange('accrualMethod', value)}
                            >
                                <SelectTrigger className="w-full h-[48px] border-gray-300 focus:border-[#0d978b] text-[14px]/[20px] focus:ring-[#0d978b]">
                                    <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                    <SelectItem value="annually">Annually</SelectItem>
                                    <SelectItem value="daily">Daily</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Input
                                    value={formData.accrualHours}
                                    onChange={(e) => handleInputChange('accrualHours', e.target.value)}
                                    placeholder=""
                                    className="w-full h-[48px] border-gray-300 focus:border-[#0d978b] focus:ring-[#0d978b] text-[14px]/[20px] pr-20"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[14px]/[20px] text-gray-400 pointer-events-none">hours/month</span>
                            </div>
                        </div>
                        {errors.accrualMethod && (
                            <p className="text-red-500 text-sm">{errors.accrualMethod}</p>
                        )}
                    </div>

                    {/* Carryover */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-black font-medium">Carryover</Label>
                        <RadioGroup
                            value={formData.allowCarryover}
                            onValueChange={(value) => handleInputChange('allowCarryover', value)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="carryover-yes" />
                                <Label htmlFor="carryover-yes" className="text-[14px]/[16px] text-[#353535]">Yes, allow leave carryover</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="carryover-no" />
                                <Label htmlFor="carryover-no" className="text-[14px]/[16px] text-[#353535]">No, don't allow</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Minimum Notice Period */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-black font-medium">Minimum Notice Period</Label>
                        <p className="text-[12px]/[18px] text-[#8F8F8F]">How early an employee must apply for leave</p>
                        <div className="relative">
                            <Input
                                value={formData.minimumNoticePeriod}
                                onChange={(e) => handleInputChange('minimumNoticePeriod', e.target.value)}
                                placeholder=""
                                className="w-full h-[48px] border-gray-300 focus:border-[#0d978b] focus:ring-[#0d978b] text-[14px]/[20px] pr-12"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[14px]/[20px] text-gray-400 pointer-events-none">days</span>
                        </div>
                        {errors.minimumNoticePeriod && (
                            <p className="text-red-500 text-sm">{errors.minimumNoticePeriod}</p>
                        )}
                    </div>

                    {/* Maximum Carryover */}
                    {formData.allowCarryover === 'yes' && (
                        <div className="space-y-2">
                            <Label className="text-[14px]/[16px] text-black font-medium">Maximum Carryover</Label>
                            <div className="relative">
                                <Input
                                    value={formData.maximumCarryover}
                                    onChange={(e) => handleInputChange('maximumCarryover', e.target.value)}
                                    placeholder=""
                                    className="w-full h-[48px] border-gray-300 focus:border-[#0d978b] focus:ring-[#0d978b] text-[14px]/[20px] pr-12"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[14px]/[20px] text-gray-400 pointer-events-none">days</span>
                            </div>
                            {errors.maximumCarryover && (
                                <p className="text-red-500 text-sm">{errors.maximumCarryover}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
