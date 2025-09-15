'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TalentManagement() {
    const employeeData = {
        status: 'High Potential',
        promotionList: '-',
        succession: 'Tech Lead',
        mentor: 'John Dauda',
    };

    const learningPaths = [
        {
            title: 'Leadership Fundamentals',
            description: 'Essential skills for emerging leaders',
            completedLessons: 0,
            totalLessons: 15,
        },
        {
            title: 'Leadership Fundamentals',
            description: 'Essential skills for emerging leaders',
            completedLessons: 0,
            totalLessons: 15,
        },
        {
            title: 'Leadership Fundamentals',
            description: 'Essential skills for emerging leaders',
            completedLessons: 0,
            totalLessons: 15,
        },
    ];

    const performanceReviews = [
        {
            reviewCycle: 'H1 2025 Mid-Year Review',
            finalScore: 4.5,
            peerAvg: 4.5,
            managerScore: 3.7,
            selfScore: 4.5,
        },
        {
            reviewCycle: 'H1 2025 Mid-Year Review',
            finalScore: 4.5,
            peerAvg: 4.5,
            managerScore: 4.5,
            selfScore: 4.5,
        },
        {
            reviewCycle: 'H1 2025 Mid-Year Review',
            finalScore: 4.5,
            peerAvg: 1.8,
            managerScore: 3.7,
            selfScore: 4.5,
        },
    ];

    const getScoreColor = (score: number) => {
        if (score >= 4.0) return 'text-[#00683D]';
        if (score >= 3.0) return 'text-[#934900]';
        return 'text-[#c30606]';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end gap-4">
                <Button variant="outline" className="border-[#053834] text-[#053834] hover:bg-green-50">
                    Add to Promotion/Succession
                </Button>
                <Button variant="outline" className="border-[#053834] text-[#053834] hover:bg-green-50">
                    Assign Mentor
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 grid grid-cols-4 gap-y-4 gap-x-8">
                <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center mt-1">
                        <span className="font-medium text-[#BE5E00] text-[16px]/[24px]">
                            {employeeData.status}
                        </span>
                        <ChevronDown className="w-4 h-4 text-[#BE5E00] ml-1" />
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Promotion List</p>
                    <p className="font-medium text-[#4b4b4b] text-[16px]/[24px] mt-1">{employeeData.promotionList}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Succession</p>
                    <p className="font-medium text-[#4b4b4b] text-[16px]/[24px] mt-1">{employeeData.succession}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Mentor</p>
                    <p className="font-medium text-[#4b4b4b] text-[16px]/[24px] mt-1">{employeeData.mentor}</p>
                </div>
            </div>

            {/* Assigned Learning Paths */}
            <div className="bg-white border-[#e9e9e9] border rounded-[12px] p-[20px] space-y-[14px]">
                <h2 className="text-[14px]/[20px] text-[#4b4b4b]">Assigned Learning Paths</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {learningPaths.map((path, index) => (
                        <div key={index} className="bg-white rounded-lg  border border-[#e9e9e9] p-4">
                            <h3 className="font-semibold text-[#353535]] text-[16px]/[21px]">{path.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{path.description}</p>
                            <div className="flex items-center mt-3 text-sm text-gray-600">
                                <div className="w-4 h-4 rounded-full border border-gray-400 mr-2 flex items-center justify-center">
                                    {/* This is a placeholder for an unchecked radio button */}
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <span>{path.completedLessons} of {path.totalLessons} lessons completed</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#EEF3F2]">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Review Cycle
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Final Score
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Peer Avg
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Manager
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Self
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {performanceReviews.map((review, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {review.reviewCycle}
                                    </td>
                                    <td className="px-[16px] py-[13px] whitespace-nowrap text-sm">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] text-xs font-medium border-[#00683D] border bg-[#C0FFE5] text-[#00683D]">
                                            {review.finalScore.toFixed(1)}
                                        </span>
                                    </td>
                                    <td className="px-[16px] py-[13px] whitespace-nowrap text-sm">
                                        <span className={getScoreColor(review.peerAvg)}>
                                            {review.peerAvg.toFixed(1)}
                                        </span>
                                    </td>
                                    <td className="px-[16px] py-[13px] whitespace-nowrap text-sm">
                                        <span className={getScoreColor(review.managerScore)}>
                                            {review.managerScore.toFixed(1)}
                                        </span>
                                    </td>
                                    <td className="px-[16px] py-[13px] whitespace-nowrap text-sm">
                                        <span className={getScoreColor(review.selfScore)}>
                                            {review.selfScore.toFixed(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}