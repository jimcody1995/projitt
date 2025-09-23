'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, InputWrapper } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { KeenIcon } from '@/components/keenicons';
import { Search, Users, Play, MoreVertical, PlayCircle } from 'lucide-react';
import LearningPathDetail from './components/detail';
import { useRouter } from 'next/navigation';
export default function LearningPaths() {
    const [selectedPath, setSelectedPath] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const router = useRouter();
    const learningPaths = [
        {
            id: 1,
            title: "Leadership Fundamentals",
            subtitle: "Essential skills for emerging leaders",
            employees: 45,
            courses: 16,
            status: "Active",
            progress: 35,
            roles: ["Design Lead", "Sales Lead", "Tech Lead", "COO", "CTO"],
            skills: ["Leadership", "Team Management"]
        },
        {
            id: 2,
            title: "Advanced Problem Solving",
            subtitle: "Essential skills for emerging leaders",
            employees: 45,
            courses: 12,
            status: "Active",
            progress: 35,
            roles: ["Senior UX Designer", "Product Lead"],
            skills: ["Problem Solving", "Critical Thinking"]
        },
        {
            id: 3,
            title: "Product Management",
            subtitle: "Essential skills for emerging leaders",
            employees: 45,
            courses: 12,
            status: "Active",
            progress: 35,
            roles: ["Product Manager"],
            skills: ["Product Strategy", "User Research"]
        },
        {
            id: 4,
            title: "Technical Excellence",
            subtitle: "Essential skills for emerging leaders",
            employees: null,
            courses: 12,
            status: "Draft",
            progress: null,
            roles: ["COO", "CTO", "Tech Lead"],
            skills: ["Technical Skills", "Architecture"]
        }
    ];

    const handlePathClick = (path: any) => {
        setSelectedPath(path);
        setIsDetailOpen(true);
    };

    const getRoleColor = (index: number) => {
        const colors = [
            'bg-green-100 text-green-800',
            'bg-pink-100 text-pink-800',
            'bg-purple-100 text-purple-800',
            'bg-gray-100 text-gray-800'
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="text-[24px]/[30px] font-bold text-[#1C1C1C] mb-[4px]">Learning Paths</h1>
                        <p className="text-[14px]/[20px] text-[#a5a5a5]">Grow employee skills with personalized learning experiences</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 lg:items-center">

                        <div className="flex gap-3">
                            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 h-[42px]" onClick={() => router.push('/talent-management/learning-paths/courses')}>
                                Course Library
                            </Button>
                            <Button variant="primary" className="bg-teal-600 hover:bg-teal-700 h-[42px]" onClick={() => router.push('/talent-management/learning-paths/create-paths')}>
                                Create Learning Path
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                <InputWrapper className="w-full sm:w-80 h-[42px]">
                    <Search className="text-gray-400" size={20} />
                    <Input
                        placeholder="Search"
                        className="border-gray-300 focus:border-teal-500 "
                    />
                </InputWrapper>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px] mt-[20px]">
                {learningPaths.map((path) => (
                    <Card
                        key={path.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handlePathClick(path)}
                    >
                        <CardContent className="p-[20px]">
                            <div className="flex justify-between items-start mb-[10px]">
                                <div className="flex-1">
                                    <h3 className="text-[18px]/[21px] font-semibold text-[#353535] mb-[4px]">{path.title}</h3>
                                    <p className="text-[#8f8f8f] text-[12px]/[20px]">{path.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {path.status === "Active" && (
                                        <div>
                                            <p className='text-end text-[12px]/[14px] text-[#0d978b]'>{path.status}</p>
                                            <div className="flex items-center gap-2 mt-[9px]">
                                                <span className="text-[#0d978b] text-[12px]/[14px] font-medium">{path.progress}% done</span>
                                                <div className="relative w-[20px] h-[20px]">
                                                    <svg className="w-[20px] h-[20px] transform -rotate-90" viewBox="0 0 32 32">
                                                        <circle
                                                            cx="16"
                                                            cy="16"
                                                            r="14"
                                                            stroke="#e5e7eb"
                                                            strokeWidth="4"
                                                            fill="none"
                                                        />
                                                        <circle
                                                            cx="16"
                                                            cy="16"
                                                            r="14"
                                                            stroke="#0d978b"
                                                            strokeWidth="4"
                                                            fill="none"
                                                            strokeDasharray={`${2 * Math.PI * 14}`}
                                                            strokeDashoffset={`${2 * Math.PI * 14 * (1 - path.progress! / 100)}`}
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {path.status === "Draft" && (
                                        <span className="text-gray-600 text-sm font-medium">{path.status}</span>
                                    )}
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="flex items-center gap-6 mb-[20px]">
                                {path.employees && (
                                    <div className="flex items-center gap-2 text-[#353535]">
                                        <Users size={15} />
                                        <span className="text-[12px]/[14px]">{path.employees} employees</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-[#353535]">
                                    <PlayCircle size={15} />
                                    <span className="text-[12px]/[14px]">{path.courses} courses</span>
                                </div>
                            </div>

                            {/* Role Tags */}
                            <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-[4px]">
                                    {(path.roles).slice(0, 3).map((role, index) => (
                                        <Badge
                                            key={index}
                                            className={`px-[10px] py-[4px] rounded-full text-xs font-medium ${getRoleColor(index)}`}
                                        >
                                            {role}
                                        </Badge>
                                    ))}
                                    {path.roles.length > 3 && (
                                        <Badge
                                            className={`px-[10px] py-[4px] rounded-full text-xs font-medium text-black bg-white border border-[#e9e9e9]`}
                                        >
                                            +{path.roles.length - 3}
                                        </Badge>
                                    )}
                                </div>
                                <button className="p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
                                    <MoreVertical size={16} className="text-gray-400" />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Learning Path Detail Sheet */}
            {selectedPath && (
                <LearningPathDetail
                    isOpen={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                    learningPath={selectedPath}
                />
            )}
        </div>
    );
}