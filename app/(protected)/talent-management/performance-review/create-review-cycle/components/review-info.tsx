'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { DateField, DateInput } from '@/components/ui/datefield';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { GripVertical, Plus, MoreVertical, Cloud, CalendarDays, FileUp, FilePlus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { parseDate } from '@internationalized/date';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';
import moment from 'moment';
import TagInput from '@/components/ui/tag-input';

interface FormData {
    cycleName: string;
    startDate: string;
    deadline: string;
    frequency: string;
    selfReview: boolean;
    managerReview: boolean;
    peersReview: boolean;
    anonymousPeerReviews: boolean;
    allowOptionalTextFeedback: boolean;
    uploadedFiles: File[];
}

interface Criterion {
    id: number;
    type: string;
    operator: string;
    value: string;
}

interface Criteria {
    id: string;
    type: 'role' | 'isManager' | 'department' | 'experience' | 'custom';
    operator?: 'is' | 'is not' | 'contains' | 'equals' | 'greater than' | 'less than';
    value?: string | boolean | number;
    selectedValues?: string[];
}

interface Employee {
    id: string;
    name: string;
    role: string;
    initials: string;
    avatar?: string;
}

interface DraggableCriteriaProps {
    criteria: Criteria;
    onUpdate: (id: string, updates: Partial<Criteria>) => void;
    onRemove: (id: string) => void;
    onDuplicate: (id: string) => void;
}


function DraggableCriteria({ criteria, onUpdate, onRemove, onDuplicate }: DraggableCriteriaProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: criteria.id,
        data: {
            type: 'criteria',
            criteria: criteria
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleTypeChange = (type: string) => {
        onUpdate(criteria.id, {
            type: type as Criteria['type'],
            operator: undefined,
            value: undefined,
            selectedValues: []
        });
    };

    const handleOperatorChange = (operator: string) => {
        onUpdate(criteria.id, { operator: operator as Criteria['operator'] });
    };

    const handleValueChange = (value: string) => {
        if (criteria.type === 'isManager') {
            onUpdate(criteria.id, { value: value === 'true' });
        } else {
            onUpdate(criteria.id, { value });
        }
    };

    const handleRoleSelect = (role: string) => {
        const currentValues = criteria.selectedValues || [];
        if (!currentValues.includes(role)) {
            onUpdate(criteria.id, {
                selectedValues: [...currentValues, role]
            });
        }
    };

    const handleTagsChange = (tags: string[]) => {
        onUpdate(criteria.id, {
            selectedValues: tags
        });
    };

    const handleRoleRemove = (role: string) => {
        const currentValues = criteria.selectedValues || [];
        onUpdate(criteria.id, {
            selectedValues: currentValues.filter(r => r !== role)
        });
    };

    const renderCriteriaContent = () => {
        switch (criteria.type) {
            case 'role':
                return (
                    <div className="flex md:flex-row flex-col gap-[10px] items-center">
                        <Select value={criteria.type} onValueChange={handleTypeChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="role">Role</SelectItem>
                                <SelectItem value="isManager">Is Manager</SelectItem>
                                <SelectItem value="department">Department</SelectItem>
                                <SelectItem value="experience">Experience</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>

                        <TagInput tags={criteria.selectedValues || []} setTags={handleTagsChange} />
                    </div>
                );

            case 'isManager':
                return (
                    <div className="flex md:flex-row flex-col gap-[10px]">
                        <Select value={criteria.type} onValueChange={handleTypeChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="role">Role</SelectItem>
                                <SelectItem value="isManager">Is Manager</SelectItem>
                                <SelectItem value="department">Department</SelectItem>
                                <SelectItem value="experience">Experience</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={criteria.value?.toString() || 'true'} onValueChange={handleValueChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Value" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">True</SelectItem>
                                <SelectItem value="false">False</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                );

            default:
                return (
                    <Select value={criteria.type} onValueChange={handleTypeChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="role">Role</SelectItem>
                            <SelectItem value="isManager">Is Manager</SelectItem>
                            <SelectItem value="department">Department</SelectItem>

                        </SelectContent>
                    </Select>
                );
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-[#F5F5F5] rounded-lg p-4 border border-gray-200 w-full ${isDragging ? 'opacity-50' : ''
                }`}
            {...attributes}
        >
            <div className="flex items-center gap-3 w-full">
                <div
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded mt-1"
                >
                    <GripVertical className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex-1">
                    {renderCriteriaContent()}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                        >
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onDuplicate(criteria.id)}>
                            Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onRemove(criteria.id)}
                            className="text-red-600 focus:text-red-600"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
export default function ReviewInfo() {
    const [formData, setFormData] = useState<FormData>({
        cycleName: '',
        startDate: '',
        deadline: '',
        frequency: 'weekly',
        selfReview: true,
        managerReview: true,
        peersReview: true,
        anonymousPeerReviews: true,
        allowOptionalTextFeedback: true,
        uploadedFiles: []
    });

    const [criteria, setCriteria] = useState<Criteria[]>([
        {
            id: '1',
            type: 'role',
            selectedValues: ['Brand Designer', 'UX Designer']
        },
        {
            id: '2',
            type: 'isManager',
            operator: 'is',
            value: true
        },
        {
            id: '3',
            type: 'role',
            selectedValues: []
        }
    ]);

    const [employees] = useState<Employee[]>([
        { id: '1', name: 'Alice Fernadez', role: 'Senior Data Analyst', initials: 'AF' },
        { id: '2', name: 'John Smith', role: 'Brand Designer', initials: 'JS' },
        { id: '3', name: 'Sarah Johnson', role: 'UX Designer', initials: 'SJ' },
        { id: '4', name: 'Mike Wilson', role: 'Product Manager', initials: 'MW' },
        { id: '5', name: 'Emily Davis', role: 'Frontend Developer', initials: 'ED' },
        { id: '6', name: 'David Brown', role: 'Backend Developer', initials: 'DB' },
        { id: '7', name: 'Lisa Garcia', role: 'Data Analyst', initials: 'LG' },
        { id: '8', name: 'Tom Anderson', role: 'Marketing Manager', initials: 'TA' },
        { id: '9', name: 'Anna Taylor', role: 'UI Designer', initials: 'AT' },
        { id: '10', name: 'Chris Lee', role: 'Senior Data Analyst', initials: 'CL' },
        { id: '11', name: 'Maria Rodriguez', role: 'Brand Designer', initials: 'MR' },
        { id: '12', name: 'James White', role: 'UX Designer', initials: 'JW' },
        { id: '13', name: 'Jennifer Martinez', role: 'Product Manager', initials: 'JM' },
        { id: '14', name: 'Robert Thompson', role: 'Frontend Developer', initials: 'RT' },
        { id: '15', name: 'Amanda Clark', role: 'Backend Developer', initials: 'AC' },
        { id: '16', name: 'Daniel Lewis', role: 'Data Analyst', initials: 'DL' },
        { id: '17', name: 'Michelle Walker', role: 'Marketing Manager', initials: 'MW' },
        { id: '18', name: 'Kevin Hall', role: 'UI Designer', initials: 'KH' },
        { id: '19', name: 'Rachel Green', role: 'Senior Data Analyst', initials: 'RG' },
        { id: '20', name: 'Brian Adams', role: 'Brand Designer', initials: 'BA' },
        { id: '21', name: 'Stephanie King', role: 'UX Designer', initials: 'SK' },
        { id: '22', name: 'Mark Wright', role: 'Product Manager', initials: 'MW' },
        { id: '23', name: 'Nicole Scott', role: 'Frontend Developer', initials: 'NS' },
        { id: '24', name: 'Jason Young', role: 'Backend Developer', initials: 'JY' },
        { id: '25', name: 'Samantha Turner', role: 'Data Analyst', initials: 'ST' }
    ]);

    const [activeId, setActiveId] = useState<string | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
            setCriteria((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleUpdateCriteria = (id: string, updates: Partial<Criteria>) => {
        setCriteria(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const handleRemoveCriteria = (id: string) => {
        setCriteria(prev => prev.filter(c => c.id !== id));
    };

    const handleDuplicateCriteria = (id: string) => {
        const criteriaToDuplicate = criteria.find(c => c.id === id);
        if (criteriaToDuplicate) {
            const newCriteria = {
                ...criteriaToDuplicate,
                id: `${Date.now()}`,
                selectedValues: []
            };
            setCriteria(prev => [...prev, newCriteria]);
        }
    };

    const handleAddCriteria = () => {
        const newCriteria: Criteria = {
            id: `${Date.now()}`,
            type: 'role',
            selectedValues: []
        };
        setCriteria(prev => [...prev, newCriteria]);
    };


    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData((prev: FormData) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setFormData((prev: FormData) => ({
            ...prev,
            uploadedFiles: [...prev.uploadedFiles, ...files]
        }));
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setFormData((prev: FormData) => ({
            ...prev,
            uploadedFiles: [...prev.uploadedFiles, ...files]
        }));
    };
    return (
        <div className="space-y-8 md:w-[545px] w-full">
            {/* Cycle Name */}
            <div>
                <Label htmlFor="cycleName" className="text-[14px]/[16px] text-[#1c1c1c]">
                    Cycle Name
                </Label>
                <Input
                    id="cycleName"
                    placeholder="e.g H1 2025 Mid-Year Review"
                    className='h-[48px] mt-[12px]'
                    value={formData.cycleName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('cycleName', e.target.value)}
                    variant="md"
                />
            </div>

            {/* Timeframe */}
            <div>
                <Label className="text-sm font-medium text-gray-700">Timeframe</Label>
                <div className="flex items-center gap-[18px] mt-[12px]">
                    <div className="flex-1">
                        <Label htmlFor="startDate" className="text-xs text-gray-500 mb-1 block">
                            Start Date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className={cn(
                                        'w-full flex justify-start h-[48px] data-[state=open]:border-primary rounded-[10px] border-[#bcbcbc]',
                                    )}
                                >
                                    <CalendarDays className="-ms-0.5" />
                                    {formData.startDate ? moment(formData.startDate).format('MMM DD, YYYY') : 'Pick a date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formData.startDate ? new Date(formData.startDate) : undefined}
                                    onSelect={(date) => handleInputChange('startDate', date?.toString() || '')}
                                    numberOfMonths={1}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="text-[#A5A5A5] text-[24px]/[32px] mt-[10px]">-</div>
                    <div className="flex-1">
                        <Label htmlFor="deadline" className="text-xs text-gray-500 mb-1 block">
                            Deadline
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className={cn(
                                        'w-full flex justify-start h-[48px] data-[state=open]:border-primary rounded-[10px] border-[#bcbcbc]',
                                    )}
                                >
                                    <CalendarDays className="-ms-0.5" />
                                    {formData.deadline ? moment(formData.deadline).format('MMM DD, YYYY') : 'Pick a date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formData.deadline ? new Date(formData.deadline) : undefined}
                                    onSelect={(date) => handleInputChange('deadline', date?.toString() || '')}
                                    numberOfMonths={1}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            {/* Upload User Guides */}
            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Upload User Guides</Label>
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-[16px] hover:border-gray-400 flex gap-[4px] items-center transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                    <FilePlus className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600">Drop file or <span className="text-[#0D978B] cursor-pointer">click to upload</span></p>
                    <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                </div>
            </div>

            {/* Reviewer Assignments */}
            <div>
                <Label className="text-sm font-medium text-gray-700">Reviewer Assignments</Label>
                <div className="flex gap-[20px] mt-[12px]">
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="selfReview"
                            checked={formData.selfReview}
                            onCheckedChange={(checked: boolean) => handleInputChange('selfReview', checked)}
                        />
                        <Label htmlFor="selfReview" className="text-sm text-gray-700">
                            Self-Review
                        </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="managerReview"
                            checked={formData.managerReview}
                            onCheckedChange={(checked: boolean) => handleInputChange('managerReview', checked)}
                        />
                        <Label htmlFor="managerReview" className="text-sm text-gray-700">
                            Manager Review
                        </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="peersReview"
                            checked={formData.peersReview}
                            onCheckedChange={(checked: boolean) => handleInputChange('peersReview', checked)}
                        />
                        <Label htmlFor="peersReview" className="text-sm text-gray-700">
                            Peers review
                        </Label>
                    </div>
                </div>
            </div>

            {/* Set Frequency */}
            <div>
                <Label htmlFor="frequency" className="text-sm font-medium text-gray-700">
                    Set Frequency
                </Label>
                <Select value={formData.frequency} onValueChange={(value: string) => handleInputChange('frequency', value)}>
                    <SelectTrigger className='mt-[12px] h-[48px]'>
                        <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-[36px]">
                <div className="flex items-center gap-[8px]">
                    <Switch
                        id="anonymousPeerReviews"
                        shape="square"
                        checked={formData.anonymousPeerReviews}
                        onCheckedChange={(checked: boolean) => handleInputChange('anonymousPeerReviews', checked)}
                    />
                    <Label htmlFor="anonymousPeerReviews" className="text-sm font-medium text-gray-700">
                        Anonymous Peer Reviews
                    </Label>
                </div>
                <div className="flex items-center gap-[8px]">
                    <Switch
                        id="allowOptionalTextFeedback"
                        shape="square"
                        checked={formData.allowOptionalTextFeedback}
                        onCheckedChange={(checked: boolean) => handleInputChange('allowOptionalTextFeedback', checked)}
                    />
                    <Label htmlFor="allowOptionalTextFeedback" className="text-sm font-medium text-gray-700">
                        Allow optional text feedback
                    </Label>
                </div>
            </div>

            {/* Eligibility Criteria */}
            <div>
                <Label className="text-[14px]/[16px] text-[#1c1c1c]">Eligibility Criteria</Label>
                <div className="flex flex-col gap-[12px] mt-[12px]">
                    <div className="space-y-4 w-full">
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext items={criteria.map(c => c.id)} strategy={verticalListSortingStrategy}>
                                {criteria.map((criterion, index) => (
                                    <div key={criterion.id} className="space-y-4 w-full">
                                        {index > 0 && (
                                            <div className="flex">
                                                <Select defaultValue="and">
                                                    <SelectTrigger className="w-20">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="and">And</SelectItem>
                                                        <SelectItem value="or">Or</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}

                                        <DraggableCriteria
                                            criteria={criterion}
                                            onUpdate={handleUpdateCriteria}
                                            onRemove={handleRemoveCriteria}
                                            onDuplicate={handleDuplicateCriteria}
                                        />
                                    </div>
                                ))}
                            </SortableContext>
                            <DragOverlay>
                                {activeId ? (
                                    <div className="transform rotate-2">
                                        <DraggableCriteria
                                            criteria={criteria.find(c => c.id === activeId)!}
                                            onUpdate={() => { }}
                                            onRemove={() => { }}
                                            onDuplicate={() => { }}
                                        />
                                    </div>
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </div>

                    <div className="mt-6">
                        <Button
                            onClick={handleAddCriteria}
                            variant="outline"
                            className="border-[#0d978b] text-[#0d978b] hover:bg-[#0d978b] hover:text-white"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Criteria
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}