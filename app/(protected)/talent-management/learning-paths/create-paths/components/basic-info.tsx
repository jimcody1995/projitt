'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, X } from 'lucide-react';
import TagInput from '@/components/ui/tag-input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import moment from 'moment';
import { cn } from '@/lib/utils';

export default function BasicInfo() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        pathName: '',
        description: '',
        beginMonth: '',
        endMonth: '',
        targetRoles: [] as string[],
        tags: [] as string[]
    });

    const [newTargetRole, setNewTargetRole] = useState('');
    const [showAddRoleInput, setShowAddRoleInput] = useState(false);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleAddTargetRole = (value: string) => {
        if (value.trim() && !formData.targetRoles.includes(value)) {
            setFormData(prev => ({
                ...prev,
                targetRoles: [...prev.targetRoles, value]
            }));
            setNewTargetRole('');
            setShowAddRoleInput(false);
        }
    };

    const handleRemoveTargetRole = (index: number) => {
        const newRoles = formData.targetRoles.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, targetRoles: newRoles }));
    };

    const handleShowAddRoleInput = () => {
        setShowAddRoleInput(true);
    };

    const handleCancelAddRole = () => {
        setNewTargetRole('');
        setShowAddRoleInput(false);
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Saving basic info:', formData);
            alert('Basic Info saved successfully!');
        } catch (error) {
            console.error('Error saving basic info:', error);
            alert('Failed to save basic info. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const availableRoles = [
        'Brand Designer',
        'UX Designer',
        'UI Designer',
        'Product Manager',
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'Data Analyst',
        'Marketing Manager',
        'Sales Manager'
    ];

    return (
        <div className="space-y-8 md:w-[480px] w-full px-[45px] py-[49px]">
            <div>
                <h2 className="text-[22px]/[30px] font-semibold text-[#353535] mb-6">Basic Info</h2>

                <div className="space-y-[36px]">
                    {/* Path Name */}
                    <div className="space-y-2">
                        <Label className="text-[13px]/[21px] text-[#353535] font-medium">Path Name</Label>
                        <Input
                            value={formData.pathName}
                            onChange={(e) => handleInputChange('pathName', e.target.value)}
                            placeholder="e.g Leadership Fundamentals"
                            className="w-full h-[48px] border-gray-200 focus:border-[#0d978b] focus:ring-[#0d978b]"
                        />
                        {errors.pathName && (
                            <p className="text-red-500 text-sm">{errors.pathName}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-[13px]/[21px] text-[#353535] font-medium">Description</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Enter a brief purpose or scope"
                            className="w-full min-h-[100px] border-gray-200 focus:border-[#0d978b] focus:ring-[#0d978b] resize-none"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
                    </div>

                    {/* Begin Month and End Month */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[13px]/[21px] text-[#353535] font-medium">Begin Month</Label>
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
                                        {formData.beginMonth ? moment(formData.beginMonth).format('MMM DD, YYYY') : 'Pick a date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 " align="center">
                                    <Calendar
                                        mode="single"
                                        defaultMonth={formData.beginMonth ? new Date(formData.beginMonth) : new Date()}
                                        selected={formData.beginMonth ? new Date(formData.beginMonth) : undefined}
                                        onSelect={(date) => handleInputChange('beginMonth', date?.toString() || '')}
                                        numberOfMonths={1}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.beginMonth && (
                                <p className="text-red-500 text-sm">{errors.beginMonth}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[13px]/[21px] text-[#353535] font-medium">End Month</Label>
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
                                        {formData.endMonth ? moment(formData.endMonth).format('MMM DD, YYYY') : 'Pick a date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 " align="center">
                                    <Calendar
                                        mode="single"
                                        defaultMonth={formData.endMonth ? new Date(formData.endMonth) : new Date()}
                                        selected={formData.endMonth ? new Date(formData.endMonth) : undefined}
                                        onSelect={(date) => handleInputChange('endMonth', date?.toString() || '')}
                                        numberOfMonths={1}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.endMonth && (
                                <p className="text-red-500 text-sm">{errors.endMonth}</p>
                            )}
                        </div>
                    </div>

                    {/* Target Role(s) */}
                    <div className="space-y-2">
                        <Label className="text-[13px]/[21px] text-[#353535] font-medium">Target Role(s)</Label>
                        <div className="space-y-3">

                            <div className="flex items-center gap-2">
                                <Select value={newTargetRole} onValueChange={handleAddTargetRole}>
                                    <SelectTrigger className="flex-1 h-[48px] border-gray-200 focus:border-[#0d978b] focus:ring-[#0d978b]">
                                        <SelectValue placeholder="Choose Role(s)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableRoles
                                            .filter(role => !formData.targetRoles.includes(role))
                                            .map((role) => (
                                                <SelectItem key={role} value={role}>
                                                    {role}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Selected Roles */}
                            {formData.targetRoles.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.targetRoles.map((role, index) => (
                                        <Badge key={index} variant="secondary" className="bg-[#D6EEEC] text-[#0d978b] px-3 py-1">
                                            {role}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="ml-2 h-auto p-0 hover:bg-transparent"
                                                onClick={() => handleRemoveTargetRole(index)}
                                            >
                                                <X className="w-3 h-3 text-[#0d978b]" />
                                            </Button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.targetRoles && (
                            <p className="text-red-500 text-sm">{errors.targetRoles}</p>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <Label className="text-[13px]/[21px] text-[#353535] font-medium">Tags</Label>
                        <div className="space-y-3">
                            <TagInput
                                tags={formData.tags}
                                setTags={(tags) => setFormData(prev => ({ ...prev, tags }))}
                            />
                        </div>
                        {errors.tags && (
                            <p className="text-red-500 text-sm">{errors.tags}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}