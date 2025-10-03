'use client';

import { useState, useMemo } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, closestCenter, DragOverlay, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    GripVertical,
    Play,
    FileText,
    Search,
    X,
    Expand,
    MoreVertical,
    Sparkles,
    Plus
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Course {
    id: string;
    title: string;
    duration: string;
    type: 'video' | 'document';
    isSelected?: boolean;
}

interface DraggableCourseProps {
    course: Course;
    isSelected?: boolean;
    onRemove?: (id: string) => void;
    onExpand?: (id: string) => void;
}

function DraggableCourse({ course, isSelected, onRemove, onExpand }: DraggableCourseProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: course.id,
        data: {
            type: 'selected-course',
            course: course
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-3 p-3 border-b border-gray-200 bg-white ${isSelected ? ' border-gray-200' : ' border-gray-100'
                } ${isDragging ? 'opacity-50' : ''} hover:bg-gray-50 transition-colors`}
            {...attributes}
        >
            <div
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded"
            >
                <GripVertical className="h-4 w-4 text-gray-400" />
            </div>

            <div className="flex-1 flex items-center gap-3">

                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{course.title}</p>

                </div>
                <p className="text-xs text-gray-500"> {course.duration}</p>
            </div>

            {isSelected && (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onExpand?.(course.id)}
                        className="h-6 w-6 p-0 hover:bg-gray-200"
                    >
                        <Expand className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove?.(course.id)}
                        className="h-6 w-6 p-0 hover:bg-gray-200"
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            )}
        </div>
    );
}

function DroppableSelectionArea({ children, onDrop }: { children: React.ReactNode; onDrop: (course: Course, insertIndex?: number) => void }) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'selection-area',
        data: {
            type: 'selection-area'
        }
    });

    return (
        <div
            ref={setNodeRef}
            className={`min-h-[200px] ${isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg' : ''}`}
        >
            {children}
        </div>
    );
}

function LibraryCourse({ course, onAdd }: { course: Course; onAdd: (course: Course) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: course.id,
        data: {
            type: 'library-course',
            course: course
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-3 p-3 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''
                }`}
            {...attributes}
            {...listeners}
        >
            {course.type === 'video' ? (
                <Play className="h-4 w-4 text-green-600" />
            ) : (
                <FileText className="h-4 w-4 text-blue-600" />
            )}

            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{course.title}</p>
                <p className="text-xs text-gray-500">{course.duration}</p>
            </div>


            <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 "
                onClick={(e) => e.stopPropagation()}
            >
                <GripVertical className="h-3 w-3" />
            </Button>

        </div>
    );
}

export default function CourseSelection() {
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([
        {
            id: '1',
            title: 'Managing a Cross-Functional Team',
            duration: 'Video ~ 45min',
            type: 'video',
            isSelected: true
        },
        {
            id: '2',
            title: 'Leadership 101',
            duration: 'Video ~ 45min',
            type: 'video',
            isSelected: true
        },
        {
            id: '3',
            title: 'Leadership 101',
            duration: 'Video ~ 45min',
            type: 'video',
            isSelected: true
        },
        {
            id: '4',
            title: 'Leadership 101',
            duration: 'Video ~ 45min',
            type: 'video',
            isSelected: true
        },
        {
            id: '5',
            title: 'Leadership 101',
            duration: 'Video ~ 45min',
            type: 'video',
            isSelected: true
        },
        {
            id: '6',
            title: 'Leadership 101',
            duration: 'Video ~ 45min',
            type: 'video',
            isSelected: true
        },
        {
            id: '7',
            title: 'Leadership 101',
            duration: 'Video ~ 45min',
            type: 'video',
            isSelected: true
        },
        {
            id: '8',
            title: 'Leadership 101',
            duration: 'Video ~ 45min',
            type: 'video',
            isSelected: true
        }
    ]);

    const [libraryCourses] = useState<Course[]>([
        {
            id: 'lib-1',
            title: 'Leadership 101',
            duration: '45min',
            type: 'video'
        },
        {
            id: 'lib-2',
            title: 'Leadership 101',
            duration: '45min',
            type: 'document'
        },
        {
            id: 'lib-3',
            title: 'Leadership 101',
            duration: '45min',
            type: 'document'
        },
        {
            id: 'lib-4',
            title: 'Leadership 101',
            duration: '45min',
            type: 'document'
        },
        {
            id: 'lib-5',
            title: 'Project Management Fundamentals',
            duration: '60min',
            type: 'video'
        },
        {
            id: 'lib-6',
            title: 'Communication Skills',
            duration: '30min',
            type: 'video'
        },
        {
            id: 'lib-7',
            title: 'Team Building Strategies',
            duration: '45min',
            type: 'document'
        },
        {
            id: 'lib-8',
            title: 'Conflict Resolution',
            duration: '50min',
            type: 'video'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [activeId, setActiveId] = useState<string | null>(null);
    const [draggedCourse, setDraggedCourse] = useState<Course | null>(null);

    const filteredLibraryCourses = useMemo(() => {
        return libraryCourses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [libraryCourses, searchTerm]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);

        // Check if dragging from library
        const activeData = event.active.data.current;
        if (activeData?.type === 'library-course') {
            setDraggedCourse(activeData.course);
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeData = active.data.current;
        const overData = over.data.current;

        // Handle dragging from library over selection area
        if (activeData?.type === 'library-course' && overData?.type === 'selection-area') {
            // This is handled in drag end
            return;
        }

        // Handle dragging from library over a selected course
        if (activeData?.type === 'library-course' && overData?.type === 'selected-course') {
            // This is handled in drag end
            return;
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        setDraggedCourse(null);

        if (!over) return;

        const activeData = active.data.current;
        const overData = over.data.current;

        // Handle dropping from library to selection
        if (activeData?.type === 'library-course') {
            const course = activeData.course;
            const newCourse = {
                ...course,
                id: `${course.id}-${Date.now()}`,
                isSelected: true
            };

            if (overData?.type === 'selection-area') {
                // Add to end of list
                setSelectedCourses(prev => [...prev, newCourse]);
            } else if (overData?.type === 'selected-course') {
                // Insert at specific position
                const overIndex = selectedCourses.findIndex(item => item.id === over.id);
                setSelectedCourses(prev => {
                    const newList = [...prev];
                    newList.splice(overIndex, 0, newCourse);
                    return newList;
                });
            }
            return;
        }

        // Handle reordering within selection
        if (activeData?.type === 'selected-course' && overData?.type === 'selected-course') {
            if (active.id !== over.id) {
                setSelectedCourses((items) => {
                    const oldIndex = items.findIndex((item) => item.id === active.id);
                    const newIndex = items.findIndex((item) => item.id === over.id);
                    return arrayMove(items, oldIndex, newIndex);
                });
            }
        }
    };

    const handleAddCourse = (course: Course) => {
        const newCourse = {
            ...course,
            id: `${course.id}-${Date.now()}`,
            isSelected: true
        };
        setSelectedCourses(prev => [...prev, newCourse]);
    };

    const handleRemoveCourse = (id: string) => {
        setSelectedCourses(prev => prev.filter(course => course.id !== id));
    };

    const handleExpandCourse = (id: string) => {
        console.log('Expand course:', id);
        // Implement expand functionality
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="h-full flex lg:flex-row flex-col">
                {/* Left Panel - Course Selection */}
                <div className="flex-1 p-6 border-r border-gray-200">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Selection</h2>
                        <p className="text-sm text-gray-600">Select and reorder courses</p>
                    </div>

                    <DroppableSelectionArea onDrop={handleAddCourse}>
                        <SortableContext items={selectedCourses.map(c => c.id)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-2 mb-6">
                                {selectedCourses.map((course) => (
                                    <DraggableCourse
                                        key={course.id}
                                        course={course}
                                        isSelected={course.isSelected}
                                        onRemove={handleRemoveCourse}
                                        onExpand={handleExpandCourse}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DroppableSelectionArea>

                    {/* AI Suggestions */}

                    <button className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-[#0d978b]" />
                        <span className="text-sm font-medium text-[#0d978b]">AI Suggestions</span>
                    </button>

                </div>

                {/* Right Panel - Course Library */}
                <div className="lg:w-[350px] w-full p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Library</h2>

                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-10 border-gray-200 focus:border-[#0d978b] focus:ring-[#0d978b]"
                            />
                        </div>

                        <p className="text-sm text-gray-600 mb-4">Drag courses to add to course selection</p>
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                        {filteredLibraryCourses.map((course) => (
                            <LibraryCourse
                                key={course.id}
                                course={course}
                                onAdd={handleAddCourse}
                            />
                        ))}
                    </div>

                    {filteredLibraryCourses.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <p>No courses found matching your search</p>
                        </div>
                    )}
                </div>
            </div>

            <DragOverlay>
                {draggedCourse ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white shadow-lg">
                        {draggedCourse.type === 'video' ? (
                            <Play className="h-4 w-4 text-green-600" />
                        ) : (
                            <FileText className="h-4 w-4 text-blue-600" />
                        )}
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{draggedCourse.title}</p>
                            <p className="text-xs text-gray-500">{draggedCourse.duration}</p>
                        </div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}   