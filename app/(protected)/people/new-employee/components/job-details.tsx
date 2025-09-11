'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function JobDetails() {
    const [formData, setFormData] = useState({
        firstName: 'Alice',
        lastName: 'Fernadez',
        employeeType: 'full-time',
        email: 'alicefernadez@gmail.com',
        country: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const employeeTypes = [
        {
            value: 'full-time',
            label: 'Full-Time',
            description: 'Standard salaried employee with a fixed schedule and full benefits eligibility.'
        },
        {
            value: 'freelance',
            label: 'Freelance',
            description: 'Independent contractor hired for specific tasks or projects, typically invoice-based.'
        },
        {
            value: 'part-time',
            label: 'Part-Time',
            description: 'Employee with limited working hours per week, often not eligible for full benefits.'
        },
        {
            value: 'intern',
            label: 'Intern',
            description: 'Temporary employee in a learning or training role, often with a defined end date.'
        }
    ];

    const countries = [
        'United States',
        'Canada',
        'United Kingdom',
        'Germany',
        'France',
        'Australia',
        'Japan',
        'Brazil',
        'India',
        'China'
    ];

    return (
        <div className="md:w-[619px] w-full">
            <div>
                <h1 className="text-[20px]/[30px] font-semibold text-[#1C1C1C]">Job Details</h1>
            </div>

            <div className="space-y-6 mt-[32px] w-full">
                {/* First Name Field */}
                <div className='flex gap-[24px] w-full flex-col md:flex-row'>
                    <div className="space-y-[8px] w-full">
                        <Label htmlFor="firstName" className="text-[14px]/[22px] font-medium text-[#353535]">
                            First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="w-full h-[48px]"
                        />
                    </div>

                    {/* Last Name Field */}
                    <div className="space-y-2 w-full">
                        <Label htmlFor="lastName" className="text-[14px]/[22px] font-medium text-[#353535]">
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full h-[48px]"
                        />
                    </div>
                </div>

                {/* Employee Type Section */}
                <div className="space-y-[8px]">
                    <Label className="text-[14px]/[22px] font-medium text-[#353535]">Employee Type</Label>
                    <RadioGroup
                        value={formData.employeeType}
                        onValueChange={(value) => handleInputChange('employeeType', value)}
                        className="space-y-[16px]"
                    >
                        {employeeTypes.map((type) => (
                            <div key={type.value} className="flex items-start space-x-[6px]">
                                <RadioGroupItem
                                    value={type.value}
                                    id={type.value}
                                    className="mt-1"
                                />
                                <div className="flex-1">
                                    <Label
                                        htmlFor={type.value}
                                        className="text-sm font-medium text-gray-900 cursor-pointer"
                                    >
                                        {type.label}
                                    </Label>
                                    <p className="text-[12px]/[18px] text-[#8f8f8f] mt-1">
                                        {type.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Email Address Field */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[14px]/[22px] font-medium text-[#353535]">
                        Email Address
                    </Label>
                    <p className="text-[12px]/[18px] text-[#8f8f8f]">
                        The email address that will be used to sign in to Projitt and receive personal info.
                    </p>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full h-[48px]"
                    />
                </div>

                {/* Country Field */}
                <div className="space-y-2">
                    <Label htmlFor="country" className="text-[14px]/[22px] font-medium text-[#353535]">
                        Country
                    </Label>
                    <p className="text-[12px]/[18px] text-[#8f8f8f]">
                        Where your team member lives?
                    </p>
                    <Select
                        value={formData.country}
                        onValueChange={(value) => handleInputChange('country', value)}
                    >
                        <SelectTrigger className="w-full h-[48px]">
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                    {country}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}