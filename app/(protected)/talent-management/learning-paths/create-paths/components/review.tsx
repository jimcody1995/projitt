'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Edit,
    Users,
    BookOpen,
    Calendar,
    Tag,
    Target,
    FileText,
    PenLine,
    Pen
} from 'lucide-react';

interface LearningPathData {
    pathName: string;
    description: string;
    beginMonth: string;
    endMonth: string;
    targetRoles: string[];
    tags: string[];
    selectedCourses: Array<{
        id: string;
        title: string;
        duration: string;
        type: 'video' | 'document';
    }>;
    eligibleEmployees: number;
    criteria: Array<{
        id: string;
        type: string;
        selectedValues?: string[];
        operator?: string;
        value?: any;
    }>;
}

export default function Review() {
    const [isPublishing, setIsPublishing] = useState(false);

    // Mock data - in real app, this would come from context or props
    const learningPathData: LearningPathData = {
        pathName: "Leadership Fundamentals",
        description: "We are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will transform complex data into actionable insights that drive business decisions. Key Responsibilities Lead complex data analysis projects and develop comprehensive reporting solutions",
        beginMonth: "Jul, 2024",
        endMonth: "Aug, 2025",
        targetRoles: ["UI Designer", "Design Lead"],
        tags: ["Data Analysis", "UI/UX", "Prototyping", "Wireframing"],
        selectedCourses: [
            { id: '1', title: 'Managing a Cross-Functional Team', duration: '45min', type: 'video' },
            { id: '2', title: 'Leadership 101', duration: '45min', type: 'video' },
            { id: '3', title: 'Project Management Fundamentals', duration: '60min', type: 'video' },
            { id: '4', title: 'Communication Skills', duration: '30min', type: 'video' },
            { id: '5', title: 'Team Building Strategies', duration: '45min', type: 'document' },
            { id: '6', title: 'Conflict Resolution', duration: '50min', type: 'video' }
        ],
        eligibleEmployees: 25,
        criteria: [
            { id: '1', type: 'role', selectedValues: ['Brand Designer', 'UX Designer'] },
            { id: '2', type: 'isManager', operator: 'is', value: true }
        ]
    };

    const handleEdit = (step: number) => {
        // This would navigate back to the specific step
        console.log('Edit step:', step);
    };

    const handlePublish = async () => {
        setIsPublishing(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Publishing learning path:', learningPathData);
            alert('Learning path published successfully!');
        } catch (error) {
            console.error('Error publishing learning path:', error);
            alert('Failed to publish learning path. Please try again.');
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="h-full p-6">
            <div className="mb-8">
                <h1 className="text-[22px]/[30px] font-bold text-[#353535] mb-2">Review & Publish</h1>
            </div>

            {/* Summary Cards */}
            <div className="border border-[#e9e9e9] rounded-[8px] px-[32px] py-[13px] flex md:w-[350px] w-full ">
                <div className='flex-1 border-r border-[#e9e9e9] pr-[32px]'>
                    <p className='text-[16px]/[24px] font-medium text-[#0d978b]'>25</p>
                    <p className='text-[13px]/[20px] text-[#8F8F8F] mt-[2px]'>Eligible Employees</p>
                </div>

                <div className='flex-1 pl-[32px]'>
                    <p className='text-[16px]/[24px] font-medium text-[#0d978b]'>35</p>
                    <p className='text-[13px]/[20px] text-[#8F8F8F] mt-[2px]'>Course Content</p>
                </div>
            </div>

            {/* Main Review Card */}
            <Card className="border border-gray-200 mt-[20px] bg-[#FAFAFA] max-w-[600px]">
                <CardContent className="p-8 flex justify-between">
                    <div className="space-y-6 max-w-[600px]">
                        <div className='flex justify-between'>
                            <div>
                                <label className="text-[14px]/[22px] font-medium text-[#a5a5a5] ">Path Name</label>
                                <h3 className="text-[14px]/[20px] text-[#353535]">{learningPathData.pathName}</h3>
                            </div>

                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm font-medium text-[#a5a5a5] block mb-2">Description</label>
                            <p className="text-gray-700 leading-relaxed text-[14px]/[2spx]">{learningPathData.description}</p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            {/* Target Roles */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 block mb-2">Target Roles</label>
                                <div className="flex flex-wrap gap-2">
                                    {learningPathData.targetRoles.map((role, index) => (
                                        <div key={index} className="text-gray-900 text-[14px]/[20px]">
                                            {role}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Begin Month */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 block mb-2">Begin Month</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900">{learningPathData.beginMonth}</span>
                                </div>
                            </div>

                            {/* End Month */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 block mb-2">End Month</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900">{learningPathData.endMonth}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="text-sm font-medium text-gray-500 block mb-2">Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {learningPathData.tags.map((tag, index) => (
                                        <div key={index} className="border-gray-500  text-gray-900">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => handleEdit(1)}
                        className="border-[#0d978b] hover:bg-[#0d978b] hover:text-white"
                    >
                        <PenLine className="h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}