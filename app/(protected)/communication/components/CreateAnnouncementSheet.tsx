'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Calendar, Upload, Plus, GripVertical, CirclePlus } from 'lucide-react';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter, DragOverlay } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TagInput from '@/components/ui/tag-input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface Criteria {
    id: string;
    type: 'department' | 'role' | 'isManager' | 'experience' | 'custom';
    operator?: 'is' | 'is not' | 'contains' | 'equals' | 'greater than' | 'less than';
    value?: string | boolean | number;
    selectedValues?: string[];
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

    const handleTagsChange = (tags: string[]) => {
        onUpdate(criteria.id, {
            selectedValues: tags
        });
    };

    const renderCriteriaContent = () => {
        switch (criteria.type) {
            case 'department':
                return (
                    <div className="flex md:flex-row flex-col gap-[10px] items-center">
                        <Select value={criteria.type} onValueChange={handleTypeChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="department">By Department</SelectItem>
                                <SelectItem value="role">By Role</SelectItem>
                                <SelectItem value="isManager">Is Manager</SelectItem>
                                <SelectItem value="experience">Experience</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="bg-white rounded-lg [&>:first-child]:border-none">
                            <TagInput tags={criteria.selectedValues || []} setTags={handleTagsChange} />
                        </div>
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
                                <SelectItem value="department">By Department</SelectItem>
                                <SelectItem value="role">By Role</SelectItem>
                                <SelectItem value="isManager">Is Manager</SelectItem>
                                <SelectItem value="experience">Experience</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={criteria.value?.toString() || 'true'} onValueChange={handleValueChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Value" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">is true</SelectItem>
                                <SelectItem value="false">is false</SelectItem>
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
                            <SelectItem value="department">By Department</SelectItem>
                            <SelectItem value="role">By Role</SelectItem>
                            <SelectItem value="isManager">Is Manager</SelectItem>
                            <SelectItem value="experience">Experience</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
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

interface CreateAnnouncementSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateAnnouncementSheet({ open, onOpenChange }: CreateAnnouncementSheetProps) {
    const [formData, setFormData] = useState({
        sendEmail: false,
        startDate: '2025-06-10',
        endDate: '2025-06-10',
        subject: 'Annual Celebration',
        messageType: 'text',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown...',
        eligibilityCriteria: 'department'
    });

    const [activeId, setActiveId] = useState<string | null>(null);
    const [criteria, setCriteria] = useState<Criteria[]>([
        {
            id: '1',
            type: 'department',
            selectedValues: ['Brand Designer', 'UX Designer']
        },
        {
            id: '2',
            type: 'isManager',
            operator: 'is',
            value: true
        }
    ]);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

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
            type: 'department',
            selectedValues: []
        };
        setCriteria(prev => [...prev, newCriteria]);
    };

    const handlePublishAnnouncement = () => {
        console.log('Publishing announcement:', formData);
        onOpenChange(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:min-w-[530px] p-0" close={false}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <SheetHeader className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <SheetTitle className="text-[18px]/[24px] sm:text-[22px]/[30px] font-medium text-[#353535]">
                                Create Announcement
                            </SheetTitle>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#787878] hover:bg-gray-100"
                            >
                                <X className="w-3 h-3 text-[#6B7280]" />
                            </button>
                        </div>
                    </SheetHeader>

                    {/* Content */}
                    <div className="flex-1 px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-6 overflow-y-auto">
                        {/* Send Email Checkbox */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="sendEmail"
                                checked={formData.sendEmail}
                                onChange={(e) => handleInputChange('sendEmail', e.target.checked)}
                                className="w-4 h-4 text-[#0D978B] border-gray-300 rounded focus:ring-[#0D978B]"
                            />
                            <label htmlFor="sendEmail" className="text-[14px]/[16px] text-[#1C1C1C]">
                                Send Email
                            </label>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                Start Date
                            </label>
                            <div className="relative">
                                <Calendar
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-[#0D978B]"
                                    onClick={() => (document.getElementById('startDate') as HTMLInputElement)?.showPicker()}
                                />
                                <input
                                    id="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                                    className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-[8px] text-[14px]/[20px] text-[#353535] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    style={{
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'textfield'
                                    }}
                                />
                            </div>
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                End Date
                            </label>
                            <div className="relative">
                                <Calendar
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-[#0D978B]"
                                    onClick={() => (document.getElementById('endDate') as HTMLInputElement)?.showPicker()}
                                />
                                <input
                                    id="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                                    className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-[8px] text-[14px]/[20px] text-[#353535] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    style={{
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'textfield'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Announcement Subject */}
                        <div>
                            <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                Announcement Subject
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => handleInputChange('subject', e.target.value)}
                                placeholder="Enter announcement subject"
                                className="w-full h-10 px-3 border border-gray-300 rounded-[8px] text-[14px]/[20px] text-[#353535] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none"
                            />
                        </div>

                        {/* Message Type */}
                        <div>
                            <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                Message Type
                            </label>
                            <Select value={formData.messageType} onValueChange={(value) => handleInputChange('messageType', value)}>
                                <SelectTrigger className="w-full h-10 border border-gray-300 rounded-[8px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="image">Image</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Dynamic Content Based on Message Type */}
                        {formData.messageType === 'text' ? (
                            /* Text Message Type - Event Description */
                            <>
                                <div>
                                    <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                        Event Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Enter event description..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-[8px] text-[14px]/[20px] text-[#353535] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none resize-none"
                                    />
                                </div>
                                {/* Eligibility Criteria */}
                                <div>
                                    <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                        Eligibility Criteria
                                    </label>
                                    <Select value={formData.eligibilityCriteria} onValueChange={(value) => handleInputChange('eligibilityCriteria', value)}>
                                        <SelectTrigger className="w-full h-10 border border-gray-300 rounded-[8px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="department">By Department</SelectItem>
                                            <SelectItem value="role">By Role</SelectItem>
                                            <SelectItem value="custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Select Departments (when eligibility is department) */}
                                {formData.eligibilityCriteria === 'department' && (
                                    <div>
                                        <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                            Select Departments
                                        </label>
                                        <div className="space-y-3">
                                            {/* Dropdown Input Field */}
                                            <div className="relative">
                                                <select
                                                    className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-[8px] text-[14px]/[20px] text-[#353535] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none appearance-none bg-white"
                                                    onChange={(e) => {
                                                        if (e.target.value && !criteria[0]?.selectedValues?.includes(e.target.value)) {
                                                            const currentValues = criteria[0]?.selectedValues || [];
                                                            handleUpdateCriteria(criteria[0]?.id || '', {
                                                                selectedValues: [...currentValues, e.target.value]
                                                            });
                                                        }
                                                        e.target.value = ''; // Reset selection
                                                    }}
                                                >
                                                    <option value="">Choose Department</option>
                                                    <option value="Design">Design</option>
                                                    <option value="Data">Data</option>
                                                    <option value="Engineering">Engineering</option>
                                                    <option value="Marketing">Marketing</option>
                                                    <option value="Sales">Sales</option>
                                                    <option value="HR">HR</option>
                                                    <option value="Finance">Finance</option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Selected Department Tags */}
                                            {criteria[0]?.selectedValues && criteria[0].selectedValues.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {criteria[0].selectedValues.map((dept, index) => (
                                                        <div
                                                            key={index}
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-[#D6EEEC] text-[#0D978B] rounded-full text-[12px]/[16px] font-medium"
                                                        >
                                                            <span>{dept}</span>
                                                            <button
                                                                onClick={() => {
                                                                    const updatedValues = criteria[0]?.selectedValues?.filter((_, i) => i !== index) || [];
                                                                    handleUpdateCriteria(criteria[0]?.id || '', {
                                                                        selectedValues: updatedValues
                                                                    });
                                                                }}
                                                                className="hover:bg-[#0D978B] hover:text-white rounded-full p-0.5 transition-colors"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Custom Criteria Section */}
                                {formData.eligibilityCriteria === 'custom' && (
                                    <div className="space-y-4">
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
                                                        <div className="bg-[#F5F5F5] rounded-lg p-4 border border-gray-200 w-full opacity-50">
                                                            <div className="flex items-center gap-3 w-full">
                                                                <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded mt-1">
                                                                    <GripVertical className="h-4 w-4 text-gray-400" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex md:flex-row flex-col gap-[10px] items-center">
                                                                        <Select value="department">
                                                                            <SelectTrigger className="w-full">
                                                                                <SelectValue placeholder="Select type" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="department">By Department</SelectItem>
                                                                                <SelectItem value="role">By Role</SelectItem>
                                                                                <SelectItem value="isManager">Is Manager</SelectItem>
                                                                                <SelectItem value="experience">Experience</SelectItem>
                                                                                <SelectItem value="custom">Custom</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </DragOverlay>
                                            </DndContext>
                                        </div>

                                        <div className="mt-6">
                                            <Button
                                                onClick={handleAddCriteria}
                                                variant="outline"
                                                className="border-[#053834] text-[#053834] hover:bg-[#0d978b] hover:text-white"
                                            >
                                                <CirclePlus className="h-4 w-4 mr-2 text-[#053834]" />
                                                Add Criteria
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                        Upload Image
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-[8px] p-8 text-center hover:border-[#0D978B] transition-colors cursor-pointer">
                                        <Upload className="w-12 h-12 text-[#0D978B] mx-auto mb-4" />
                                        <p className="text-[14px]/[20px] text-[#6B7280]">
                                            Drop file or <span className="text-[#0D978B] cursor-pointer">click to upload</span>
                                        </p>
                                    </div>
                                </div>
                                {/* Eligibility Criteria Section */}
                                <div className="space-y-4">
                                    <div className="space-y-4 w-full">
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
                                    </div>

                                    <div className="mt-6">
                                        <Button
                                            onClick={handleAddCriteria}
                                            variant="outline"
                                            className="border-[#053834] text-[#053834] hover:bg-[#0d978b] hover:text-white"
                                        >
                                            <CirclePlus className="h-4 w-4 mr-2   text-[#053834]" />
                                            Add Criteria
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}


                    </div>

                    {/* Footer */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5">
                        <Button
                            onClick={handlePublishAnnouncement}
                            className="w-full h-10 sm:h-11 bg-[#0D978B] hover:bg-[#0D978B]/90 text-white text-[14px]/[20px] font-medium rounded-[8px]"
                        >
                            Publish Announcement
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
