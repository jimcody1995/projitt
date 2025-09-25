'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputWrapper } from '@/components/ui/input';
import { Search, CalendarDays } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import moment from 'moment';
import { Calendar } from '@/components/ui/calendar';
import { getDataForBasic } from '@/api/master';
import { useBasic } from '@/context/BasicContext';

export default function Role({
    employeeId,
    onFormDataChange,
    onValidation
}: {
    employeeId: string | null;
    onFormDataChange?: (data: any) => void;
    onValidation?: (validationFn: () => boolean) => void;
}) {
    const [formData, setFormData] = useState({
        workAddress: '',
        department: '',
        jobTitle: '',
        manager: '',
        contractStartDate: '10 June 2025'
    });

    const handleInputChange = (field: string, value: string) => {
        const newFormData = {
            ...formData,
            [field]: value
        };
        setFormData(newFormData);
        onFormDataChange?.(newFormData);
    };

    const validateForm = () => {
        const requiredFields = ['workAddress', 'department', 'jobTitle', 'contractStartDate'];
        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            return false;
        }
        return true;
    };

    // Expose validation function to parent
    useEffect(() => {
        onValidation?.(validateForm);
    }, [formData, onValidation]);


    const [workAddresses, setWorkAddresses] = useState([]);
    const { department } = useBasic();
    const [jobTitles, setJobTitles] = useState([]);



    useEffect(() => {
        const fetchWorkAddresses = async () => {
            const response = await getDataForBasic({ type_id: 9 });
            setWorkAddresses(response.data);
        };
        fetchWorkAddresses();

        const fetchJobTitles = async () => {
            const response = await getDataForBasic({ type_id: 10 });
            setJobTitles(response.data);
        };
        fetchJobTitles();

    }, []);


    return (
        <div className="md:w-[619px] w-full">
            <div>
                <h1 className="text-[20px]/[30px] font-semibold text-[#1C1C1C]">Role</h1>
            </div>

            <div className="space-y-6 mt-[32px] w-full">
                {/* Where will Alice Work? */}
                <div>
                    <Label htmlFor="workAddress" className="text-[14px]/[22px] font-medium text-[#353535]">
                        Where will Alice Work?
                    </Label>
                    <Select
                        value={formData.workAddress}
                        onValueChange={(value) => handleInputChange('workAddress', value)}
                    >
                        <SelectTrigger className="w-full h-[48px] mt-[8px]">
                            <SelectValue placeholder="Select Work Address" />
                        </SelectTrigger>
                        <SelectContent>
                            {workAddresses.map((address: any) => (
                                <SelectItem key={address.id} value={address.id}>
                                    {address.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Department */}
                <div>
                    <Label htmlFor="department" className="text-[14px]/[22px] font-medium text-[#353535]">
                        Department
                    </Label>
                    <Select
                        value={formData.department}
                        onValueChange={(value) => handleInputChange('department', value)}
                    >
                        <SelectTrigger className="w-full h-[48px] mt-[8px]">
                            <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                            {department.map((dept: any) => (
                                <SelectItem key={dept.id} value={dept.id}>
                                    {dept.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <button className="text-[#0D978B] text-[12px]/[18px] font-semibold hover:underline mt-[10px]">
                        + Create department
                    </button>
                </div>

                {/* Job Title */}
                <div>
                    <Label htmlFor="jobTitle" className="text-[14px]/[22px] font-medium text-[#353535]">
                        Job Title
                    </Label>
                    <Select
                        value={formData.jobTitle}
                        onValueChange={(value) => handleInputChange('jobTitle', value)}
                    >
                        <SelectTrigger className="w-full h-[48px] mt-[8px]">
                            <SelectValue placeholder="Select Job Title" />
                        </SelectTrigger>
                        <SelectContent>
                            {jobTitles.map((title: any) => (
                                <SelectItem key={title.id} value={title.id}>
                                    {title.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <button className="text-[#0D978B] text-[12px]/[18px] font-semibold hover:underline mt-[10px]">
                        + Create a new job title in Data
                    </button>
                </div>

                {/* Manager */}
                <div>
                    <Label htmlFor="manager" className="text-[14px]/[22px] font-medium text-[#353535]">
                        Manager
                    </Label>
                    <InputWrapper className="w-full h-[48px] mt-[8px]">
                        <Search className="h-4 w-4 text-[#8f8f8f]" />
                        <Input
                            id="manager"
                            type="text"
                            placeholder="Find a Manager"
                            value={formData.manager}
                            onChange={(e) => handleInputChange('manager', e.target.value)}
                            className="border-0 shadow-none focus-visible:ring-0 focus-visible:border-0"
                        />
                    </InputWrapper>
                </div>

                {/* Contract Start Date */}
                <div>
                    <Label htmlFor="contractStartDate" className="text-[14px]/[22px] font-medium text-[#353535] mb-[10px]">
                        Contract Start Date
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="date"
                                className={cn(
                                    'w-full h-[48px] flex justify-start data-[state=open]:border-primary rounded-[10px] border-[#bcbcbc] mt-[10px]',
                                )}
                            >
                                <CalendarDays className="-ms-0.5" />
                                {formData.contractStartDate ? moment(formData.contractStartDate).format('MMM DD, YYYY') : 'Pick a date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 " align="center">
                            <Calendar
                                mode="single"
                                defaultMonth={formData.contractStartDate ? new Date(formData.contractStartDate) : new Date()}
                                selected={formData.contractStartDate ? new Date(formData.contractStartDate) : undefined}
                                onSelect={(date) => handleInputChange('contractStartDate', date?.toString() || '')}
                                numberOfMonths={1}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}