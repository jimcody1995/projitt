'use client';

import { useEffect, useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    GripVertical,
    Plus,
    MoreVertical,
    X
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import TagInput from '@/components/ui/tag-input';
import { CiCirclePlus } from 'react-icons/ci';

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
                    <div className="flex md:flex-row flex-col gap-[10px]  items-center">
                        <Select value={criteria.type} onValueChange={handleTypeChange}>
                            <SelectTrigger className="w-full border-none">
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
                        <div
                            className="bg-white rounded-lg [&>:first-child]:border-none"
                        >
                            <TagInput
                                tags={criteria.selectedValues || []}
                                setTags={handleTagsChange}
                            />
                        </div>

                    </div>
                );

            case 'isManager':
                return (
                    <div className="flex md:flex-row flex-col gap-[10px] ">
                        <Select value={criteria.type} onValueChange={handleTypeChange}>
                            <SelectTrigger className="w-full border-none">
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
                            <SelectTrigger className="w-full border-none">
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
                        <SelectTrigger className="w-full border-none">
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
            className={`bg-[#F5F5F5] rounded-lg p-3 sm:p-4 border border-gray-200 w-full ${isDragging ? 'opacity-50' : ''
                }`}
            {...attributes}
        >
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 w-full">
                <div
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded mt-1 flex-shrink-0"
                >
                    <GripVertical className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex-1 min-w-0">
                    {renderCriteriaContent()}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-gray-200 flex-shrink-0"
                        >
                            <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
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

export default function Eligibility() {
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
            value: false
        },
        {
            id: '3',
            type: 'role',
            selectedValues: []
        }
    ]);
    // Function to generate dynamic description based on criteria
    const generateDescription = () => {
        const validCriteria = criteria.filter(c => {
            if (c.type === 'role') {
                return c.selectedValues && c.selectedValues.length > 0;
            }
            if (c.type === 'isManager') {
                return c.value !== undefined;
            }
            if (c.type === 'department') {
                return c.selectedValues && c.selectedValues.length > 0;
            }
            if (c.type === 'experience') {
                return c.value !== undefined;
            }
            if (c.type === 'custom') {
                return c.value;
            }
            return false;
        });

        if (validCriteria.length === 0) {
            return "No criteria defined";
        }

        const descriptions = validCriteria.map(criterion => {
            switch (criterion.type) {
                case 'role':
                    const roles = criterion.selectedValues || [];
                    if (roles.length === 0) return '';
                    if (roles.length === 1) {
                        return `Employee's role is <strong style='color: #0D978B !important'>${roles[0]}</strong>`;
                    } else {
                        const lastRole = roles[roles.length - 1];
                        const otherRoles = roles.slice(0, -1);
                        const otherRolesText = otherRoles.join('</strong>, <strong style=\'color: #0D978B !important\'>');
                        return `Employee's role are any of <strong style='color: #0D978B !important'>${otherRolesText}</strong><span style='color: #0D978B !important'> or </span><strong style='color: #0D978B !important'>${lastRole}</strong>`;
                    }

                case 'isManager':
                    const isManager = criterion.value as boolean;
                    return isManager ?
                        `Employee is a <strong style='color: #0D978B !important'>Manager</strong>` :
                        `Employee is <strong style='color: black !important'>NOT</strong> a <strong style='color: #0D978B !important'>Manager</strong>`;

                case 'department':
                    const departments = criterion.selectedValues || [];
                    if (departments.length === 0) return '';
                    if (departments.length === 1) {
                        return `Employee's department is <strong style='color: #0D978B !important'>${departments[0]}</strong>`;
                    } else {
                        const lastDept = departments.pop();
                        const otherDepts = departments.join('</strong>, <strong style=\'color: #0D978B !important\'>');
                        return `Employee's department are any of <strong style='color: #0D978B !important'>${otherDepts}</strong><span style='color: #0D978B !important'> or </span><strong style='color: #0D978B !important'>${lastDept}</strong>`;
                    }

                case 'experience':
                    const hasExperience = criterion.value as boolean;
                    return hasExperience ?
                        `has <strong style='color: #0D978B !important'>experience</strong>` :
                        `does <strong style='color: black !important'>NOT</strong> have <strong style='color: #0D978B !important'>experience</strong>`;

                case 'custom':
                    return `<strong style='color: #0D978B !important'>${criterion.value}</strong>`;

                default:
                    return '';
            }
        }).filter(desc => desc !== '');

        return descriptions.join(' <span style=\'color: black !important\'>AND</span> ');
    };
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

    const eligibleEmployees = employees.filter(employee => {
        return criteria.every(criterion => {
            switch (criterion.type) {

                case 'isManager':
                    // This would need actual manager data
                    return true; // Placeholder
                default:
                    return true;
            }
        });
    });

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="h-full flex xl:flex-row flex-col w-full">
                <div className="flex-1 p-4 sm:p-7 border-r border-gray-200">
                    <div className="mb-6">
                        <h2 className="text-[18px]/[24px] sm:text-[22px]/[30px] font-bold text-gray-900 mb-2">Eligibility Criteria</h2>

                    </div>
                    {/* Summary */}
                    <div className="bg-[#D6EEEC] rounded-[12px] py-[10px] pl-[10px] pr-[10px] sm:pr-[38px] mb-6">
                        <p
                            className="text-xs sm:text-sm text-gray-500"
                            dangerouslySetInnerHTML={{ __html: generateDescription() }}
                        />
                    </div>
                    <div className="space-y-4 w-full">
                        <SortableContext items={criteria.map(c => c.id)} strategy={verticalListSortingStrategy}>
                            {criteria.map((criterion, index) => (
                                <div key={criterion.id} className="space-y-4 w-full">
                                    {index > 0 && (
                                        <div className="flex justify-center sm:justify-start">
                                            <Select defaultValue="and">
                                                <SelectTrigger className="w-16 sm:w-20 text-xs sm:text-sm">
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
                            className="border-primary-950 text-primary-950 hover:bg-[#0d978b] hover:text-white"
                        >
                            <CiCirclePlus className="h-5 w-5 mr-2 text-primary-950" />
                            Add Criteria
                        </Button>
                    </div>
                </div>

                {/* Right Panel - Eligible Employees */}
                <div className="xl:w-[400px] h-full overflow-y-auto w-full">
                    <div className="mb-6  border-b border-gray-200">
                        <h2 className="text-[18px]/[24px] sm:text-[22px]/[30px] font-bold text-gray-900 m-3 sm:m-4">
                            Eligible Employees ({eligibleEmployees.length})
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {eligibleEmployees.map((employee) => (
                            <div key={employee.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-b -px-3 border-gray-200">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D6EEEC] flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs sm:text-[12px]/[14px] font-medium text-[#053834]">
                                        {employee.initials}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text- sm:text-[14px]/[22px] font-medium text-[#353535] truncate">{employee.name}</p>
                                    <p className="text-[11px]/[14px] text-[#8F8F8F] truncate">{employee.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {eligibleEmployees.length === 0 && (
                        <div className="text-center py-8 text-black">
                            <p>No employees match the current criteria</p>
                        </div>
                    )}
                </div>
            </div>

            <DragOverlay>
                {activeId ? (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 ">
                        <div className="flex items-center gap-3 bg-white rounded-[12px] p-4 border border-gray-200">
                            <GripVertical className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-black">Dragging criteria...</span>
                        </div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}