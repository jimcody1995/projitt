'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter, DragOverlay } from '@dnd-kit/core';
import { MoreVertical, Info, Calendar, Clock, MapPin, X, GripVertical, Plus, CirclePlus } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TagInput from '@/components/ui/tag-input';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface Event {
    id: string;
    name: string;
    eventDate: string;
    employees: number;
    status: 'In Process' | 'Completed';
}

const events: Event[] = [
    {
        id: '1',
        name: 'Celebration Party',
        eventDate: '23 Mar, 2025',
        employees: 32,
        status: 'In Process'
    },
    {
        id: '2',
        name: 'Meet and Greet',
        eventDate: '23 Mar, 2025',
        employees: 23,
        status: 'Completed'
    },
    {
        id: '3',
        name: 'Open House',
        eventDate: '23 Mar, 2025',
        employees: 56,
        status: 'In Process'
    }
];

interface Criteria {
    id: string;
    type: 'role' | 'isManager' | 'department' | 'experience' | 'custom';
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


interface EventsTableProps {
    showPreviewSheet?: boolean;
    onClosePreviewSheet?: () => void;
}

export default function EventsTable({ showPreviewSheet = false, onClosePreviewSheet }: EventsTableProps = {}) {
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [eventToCancel, setEventToCancel] = useState<Event | null>(null);
    const [internalShowPreviewSheet, setInternalShowPreviewSheet] = useState(false);
    const [eventToPreview, setEventToPreview] = useState<Event | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
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


    // Form state for the preview sheet
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '2025-03-23',
        eventTime: '20:00',
        location: 'Zoom',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown...'
    });

    const handleCancelEvent = (event: Event) => {
        setEventToCancel(event);
        setShowCancelDialog(true);
    };

    const handleConfirmCancel = () => {
        // Handle the actual cancellation logic here
        console.log('Cancelling event:', eventToCancel?.name);
        setShowCancelDialog(false);
        setEventToCancel(null);
    };

    const handleCancelDialog = () => {
        setShowCancelDialog(false);
        setEventToCancel(null);
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
            type: 'role',
            selectedValues: []
        };
        setCriteria(prev => [...prev, newCriteria]);
    };

    const handlePreviewEvent = (event: Event) => {
        setEventToPreview(event);
        setFormData({
            eventName: event.name,
            eventDate: '2025-03-23', // Convert to proper date format for input
            eventTime: '20:00', // Convert to proper time format (8:00pm = 20:00)
            location: 'Zoom',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown...'
        });
        setInternalShowPreviewSheet(true);
    };

    // Handle external showPreviewSheet prop
    useEffect(() => {
        if (showPreviewSheet) {
            setInternalShowPreviewSheet(true);
            // Reset form data for new event
            setFormData({
                eventName: '',
                eventDate: new Date().toISOString().split('T')[0], // Today's date
                eventTime: '20:00',
                location: 'Zoom',
                description: ''
            });
        }
    }, [showPreviewSheet]);

    const handleClosePreviewSheet = () => {
        setInternalShowPreviewSheet(false);
        if (onClosePreviewSheet) {
            onClosePreviewSheet();
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePublishEvent = () => {
        console.log('Publishing event:', formData);
        // Handle the actual event publishing logic here
        setInternalShowPreviewSheet(false);
        if (onClosePreviewSheet) {
            onClosePreviewSheet();
        }
    };

    return (
        <>
            <div className="rounded-[12px] overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-[#EEF3F2] h-[50px] sm:h-[60px]">
                            <tr>
                                <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E] font-medium">
                                    Event
                                </th>
                                <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E] font-medium">
                                    Event Date
                                </th>
                                <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E] font-medium">
                                    Employees
                                </th>
                                <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E] font-medium">
                                    Status
                                </th>
                                <th className="px-[12px] sm:px-[16px] text-right text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E]">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-[12px]/[18px] sm:text-[14px]/[20px] text-[#353535]">
                                        {event.name}
                                    </td>
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-[12px]/[18px] sm:text-[14px]/[20px] text-[#4B4B4B]">
                                        {event.eventDate}
                                    </td>
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-[12px]/[18px] sm:text-[14px]/[20px] text-[#4B4B4B]">
                                        {event.employees}
                                    </td>
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px]">
                                        <span className={`inline-flex items-center px-2.5  rounded-full text-[14px]/[22px] font-medium ${event.status === 'In Process'
                                            ? 'bg-[#FFDFC0] text-[#BE5E00]'
                                            : 'bg-[#D6EEEC] text-[#0D978B]'
                                            }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[140px] rounded-[12px]">
                                                <DropdownMenuItem
                                                    className="text-[12px]/[18px] text-[#4B4B4B]"
                                                    onClick={() => handleCancelEvent(event)}
                                                >
                                                    Cancel Event
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-[12px]/[18px] text-[#4B4B4B]"
                                                >
                                                    Preview
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cancel Event Confirmation Dialog */}
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogContent className="w-[400px] rounded-[12px] p-0" close={false}>
                    <div className="p-6 text-center">
                        {/* Information Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-[#D6EEEC]  rounded-full flex items-center justify-center">
                                <Info className="w-6 h-6 text-[#0D978B]" />
                            </div>
                        </div>

                        {/* Main Message */}
                        <h3 className="text-[16px]/[24px] font-semibold text-[#353535] mb-2">
                            Are you sure you want to cancel this event
                        </h3>

                        {/* Warning Message */}
                        <p className="text-[14px]/[20px] text-[#6B7280] mb-6">
                            This action cannot be undone!
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-center">
                            <Button
                                variant="outline"
                                onClick={handleCancelDialog}
                                className="px-6 py-2 h-9 border-gray-300 text-[#353535] text-[14px]/[20px] font-medium rounded-[8px]"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirmCancel}
                                className="px-6 py-2 h-9 bg-[#0D978B] hover:bg-[#0D978B]/90 text-white text-[14px]/[20px] font-medium rounded-[8px]"
                            >
                                Yes, Cancel Event
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Preview Event Sheet */}
            <Sheet open={internalShowPreviewSheet} onOpenChange={handleClosePreviewSheet}>
                <SheetContent side="right" className="w-full sm:min-w-[530px] p-0" close={false}>
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <SheetHeader className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <SheetTitle className="text-[18px]/[24px] sm:text-[22px]/[30px] font-medium text-[#353535]">
                                    Create Events
                                </SheetTitle>
                                <button
                                    onClick={handleClosePreviewSheet}
                                    className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#787878] hover:bg-gray-100"
                                >
                                    <X className="w-3 h-3 text-[#6B7280]" />
                                </button>
                            </div>
                        </SheetHeader>

                        {/* Content */}
                        <div className="flex-1 px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-6 overflow-y-auto">
                            {/* Event Details Section */}
                            <div className="space-y-4">
                                {/* Event Name */}
                                <div>
                                    <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                        Event Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.eventName}
                                        onChange={(e) => handleInputChange('eventName', e.target.value)}
                                        placeholder="Enter event name"
                                        className="w-full h-10 px-3 border border-gray-300 rounded-[8px] text-[14px]/[20px] text-[#353535] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none"
                                    />
                                </div>

                                {/* Select Date */}
                                <div>
                                    <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                        Select Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="date"
                                            value={formData.eventDate}
                                            onChange={(e) => handleInputChange('eventDate', e.target.value)}
                                            className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-[8px] text-[14px]/[20px] text-[#353535] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                            style={{
                                                WebkitAppearance: 'none',
                                                MozAppearance: 'textfield'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Select Time */}
                                <div>
                                    <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                        Select Time
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="time"
                                            value={formData.eventTime}
                                            onChange={(e) => handleInputChange('eventTime', e.target.value)}
                                            className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-[8px] text-[14px]/[20px] text-[#353535] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                            style={{
                                                WebkitAppearance: 'none',
                                                MozAppearance: 'textfield'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-2">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <select
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-[8px] text-[14px]/[20px] text-[#353535] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none appearance-none"
                                        >
                                            <option value="Zoom">Zoom</option>
                                            <option value="Google Meet">Google Meet</option>
                                            <option value="Microsoft Teams">Microsoft Teams</option>
                                            <option value="Office">Office</option>
                                            <option value="Conference Room A">Conference Room A</option>
                                            <option value="Conference Room B">Conference Room B</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Event Description */}
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
                        </div>

                        {/* Footer */}
                        <div className="px-4 sm:px-6 py-4 sm:py-5">
                            <Button
                                onClick={handlePublishEvent}
                                className="w-full h-10 sm:h-11 bg-[#0D978B] hover:bg-[#0D978B]/90 text-white text-[14px]/[20px] font-medium rounded-[8px]"
                            >
                                Publish Event
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
