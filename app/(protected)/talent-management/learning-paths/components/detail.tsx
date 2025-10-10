'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetBody, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Users, Maximize2, MoreHorizontal, FileText, Minimize2 } from 'lucide-react';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { FaRegCirclePlay } from 'react-icons/fa6';

interface LearningPathDetailProps {
    isOpen: boolean;
    onClose: () => void;
    learningPath: {
        id: number;
        title: string;
        subtitle: string;
        status: string;
        courses: number;
        employees: number;
        roles: string[];
        skills: string[];
    };
}

export default function LearningPathDetail({ isOpen, onClose, learningPath }: LearningPathDetailProps) {
    const [activeTab, setActiveTab] = useState<'courses' | 'employees'>('employees');

    const employees = [
        { id: 1, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 2, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 3, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 4, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 5, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 6, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 7, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 8, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 9, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 10, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
        { id: 11, name: 'Alice Fernadez', role: 'Senior Data Analyst', department: 'Data', avatar: 'AF' },
    ];

    const courses = [
        { id: 1, title: 'Leadership 101', category: 'Leadership', type: 'Video', duration: '45min' },
        { id: 2, title: 'Scrum Product Management', category: 'Design', type: 'Video', duration: '10min' },
        { id: 3, title: 'Managing a Cross-Functional Team', category: 'Team Management', type: 'Video', duration: '15min' },
        { id: 4, title: 'Microservices Architecture', category: 'Leadership', type: 'Video', duration: '30min' },
        { id: 5, title: 'Microservices Architecture', category: 'Product', type: 'Text', duration: '-' },
        { id: 6, title: 'Microservices Architecture', category: 'Design', type: 'Video', duration: '30min' },
        { id: 7, title: 'Microservices Architecture', category: 'Leadership', type: 'Text', duration: '-' },
        { id: 8, title: 'Microservices Architecture', category: 'Team Management', type: 'Video', duration: '30min' },
        { id: 9, title: 'Microservices Architecture', category: 'Design', type: 'Video', duration: '30min' },
        { id: 10, title: 'Microservices Architecture', category: 'Product', type: 'Text', duration: '-' },
        { id: 11, title: 'Microservices Architecture', category: 'Team Management', type: 'Video', duration: '30min' },
    ];

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="!max-w-[800px] p-0" close={false}>
                <div className="flex flex-col h-full w-full">
                    {/* Header Section */}
                    <SheetHeader className="p-6 pb-4 border-b border-gray-200">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <Badge className="bg-[#0d978b] text-white px-3 py-1 rounded-[4px] text-[14px]/[14px] font-medium h-[26px]">
                                        {learningPath.status}
                                    </Badge>
                                </div>
                                <SheetTitle className="text-[22px]/[30px] font-bold text-[#353535] mb-[4px] text-left">
                                    {learningPath.title}
                                </SheetTitle>
                                <p className="text-[#8F8F8F] text-[14px]/[20px] mb-[20px]">{learningPath.subtitle}</p>

                                {/* Roles and Skills */}
                                <div className="flex items-center gap-[28px]">
                                    <div>
                                        <span className="text-sm text-gray-600">Roles: </span>
                                        <span className="text-sm text-teal-600 cursor-pointer hover:underline">
                                            {learningPath.roles.join(', ')}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-600">Skills: </span>
                                        <span className="text-sm text-teal-600 cursor-pointer hover:underline">
                                            {learningPath.skills.join(', ')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer" onClick={onClose}>
                                    <Minimize2 size={16} className="text-gray-400" />
                                </button>

                            </div>
                        </div>
                    </SheetHeader>

                    {/* Summary Statistics */}
                    <div className=" border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setActiveTab('courses')}
                                className={`flex w-full items-center justify-center  cursor-pointer gap-2 px-4 py-[18px] transition-colors ${activeTab === 'courses'
                                    ? 'text-teal-600 border-b-2 border-teal-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <FaRegCirclePlay size={20} />
                                <span className="text-[15px]/[20px] font-medium">{learningPath.courses} courses</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('employees')}
                                className={`flex w-full items-center justify-center cursor-pointer gap-2 px-4 py-[18px] transition-colors ${activeTab === 'employees'
                                    ? 'text-teal-600 border-b-2 border-teal-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <HiOutlineUserGroup size={20} />
                                <span className="text-[15px]/[20px] font-medium">{learningPath.employees} employees</span>
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <SheetBody className="flex-1 overflow-y-auto py-0">
                        {activeTab === 'employees' ? (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#EEF3F2]">
                                        <th className="text-left text-sm text-gray-500 font-medium py-[17px] pl-[32px]">Role</th>
                                        <th className="text-left text-sm text-gray-500 font-medium py-[17px]">Department</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-50 ">
                                            <td className="py-3 pl-[32px]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-[28px] h-[28px] bg-[#D6EEEC] rounded-full flex items-center justify-center">
                                                        <span className="text-[#053834] text-[10px]/[12px] font-medium">{employee.avatar}</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-[14px]/[22px] font-medium text-gray-800">{employee.name}</div>
                                                        <div className="text-[11px]/[14px] text-[#8F8F8F]">{employee.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-[13px]/[22px] text-gray-800 py-3">{employee.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#EEF3F2]">
                                        <th className="text-left text-sm text-gray-500 font-medium py-[17px] pl-[32px]">Course Title</th>
                                        <th className="text-left text-sm text-gray-500 font-medium py-[17px]">Category</th>
                                        <th className="text-left text-sm text-gray-500 font-medium py-[17px]">Type</th>
                                        <th className="text-left text-sm text-gray-500 font-medium py-[17px]">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="text-sm text-gray-900 py-[17px] pl-[32px]">{course.title}</td>
                                            <td className="text-sm text-gray-600 py-[17px]">{course.category}</td>
                                            <td className="py-[17px]">
                                                <div className="flex items-center gap-2">
                                                    {course.type === 'Video' ? (
                                                        <PlayCircle size={14} className="text-gray-400" />
                                                    ) : (
                                                        <FileText size={14} className="text-gray-400" />
                                                    )}
                                                    <span className="text-sm text-gray-600">{course.type}</span>
                                                </div>
                                            </td>
                                            <td className="text-sm text-gray-600 py-[17px]">{course.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </SheetBody>

                    {/* Footer Actions */}
                    <SheetFooter className="p-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between w-full">
                            <Button variant="ghost" className="text-[#353535] hover:text-[#353535] p-0 font-semibold h-auto">
                                Move to Draft
                            </Button>
                            <Button variant="outline" className="text-[#053834]  px-3 font-semibold">
                                Edit Details
                            </Button>
                        </div>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
}
