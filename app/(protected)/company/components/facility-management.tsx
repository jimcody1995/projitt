'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, ChevronLeft, ChevronRight, MoreVertical, Download, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Image from 'next/image';

interface FacilityPoint {
    id: number;
    x: number;
    y: number;
    color: 'orange' | 'green';
}

export default function FacilityManagement() {
    const [facilityPoints] = useState<FacilityPoint[]>([
        // Orange points (4-18)
        { id: 4, x: 75, y: 15, color: 'orange' },
        { id: 7, x: 50, y: 25, color: 'orange' },
        { id: 8, x: 60, y: 25, color: 'orange' },
        { id: 10, x: 70, y: 25, color: 'orange' },
        { id: 12, x: 55, y: 40, color: 'orange' },
        { id: 16, x: 20, y: 15, color: 'orange' },
        { id: 17, x: 45, y: 60, color: 'orange' },
        { id: 18, x: 55, y: 60, color: 'orange' },

        // Green points (19-26)
        { id: 19, x: 40, y: 65, color: 'green' },
        { id: 20, x: 50, y: 70, color: 'green' },
        { id: 21, x: 45, y: 70, color: 'green' },
        { id: 22, x: 50, y: 65, color: 'green' },
        { id: 24, x: 70, y: 85, color: 'green' },
        { id: 25, x: 80, y: 85, color: 'green' },
    ]);

    return (
        <div className="w-full min-h-screen bg-gray-50 -mt-[14px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Upload Button */}
                <div className="mb-4 sm:mb-6">
                    <Button className="bg-[#0D978B] hover:bg-[#0D978B]/90 text-white px-4 sm:px-6 py-2 w-full sm:w-[160px] h-[36px] sm:h-[40px] rounded-[8px] text-[13px]/[18px] sm:text-[14px]/[20px]">
                        Upload Facility Map
                    </Button>
                </div>

                {/* Facility Map Container */}
                <div className="bg-white rounded-lg">
                    <div className="relative">
                        {/* Navigation Arrows */}
                        <button className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white border border-gray-200 rounded-[6px] flex items-center justify-center hover:bg-gray-300 transition-colors z-10">
                            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                        <button className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white border border-gray-200 rounded-[6px] flex items-center justify-center hover:bg-gray-300 transition-colors z-10">
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </button>

                        {/* Facility Map with Building Image */}
                        <div className="relative rounded-lg overflow-hidden h-[300px] sm:h-[400px] lg:h-[600px]">
                            {/* Building Map Image */}
                            <div className="relative w-full h-full">
                                <Image
                                    src="/building_map.png"
                                    alt="Building Facility Map"
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Facility Points Overlay */}
                                {facilityPoints.map((point) => (
                                    <div
                                        key={point.id}
                                        className={`absolute w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-white text-[10px] sm:text-[11px] lg:text-xs font-bold transform -translate-x-1/2 -translate-y-1/2 ${point.color === 'orange' ? 'bg-orange-500' : 'bg-green-500'
                                            }`}
                                        style={{
                                            left: `${point.x}%`,
                                            top: `${point.y}%`
                                        }}
                                    >
                                        {point.id}
                                    </div>
                                ))}

                                {/* File Information Bar - Overlay at bottom of image */}
                                <div className="absolute bottom-0 left-0 right-0 bg-[#00000080] text-white p-2 sm:p-3 lg:p-4 flex items-center justify-between w-full">
                                    <div className="flex flex-col items-start">
                                        <div className="font-medium text-[12px]/[16px] sm:text-[13px]/[18px] lg:text-[14px]/[20px]">Building Image Title</div>
                                        <div className=" text-gray-300 text-[11px]/[15px] sm:text-[12px]/[16px] lg:text-[13px]/[18px]">PNG • 52MB</div>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="p-1 sm:p-2 hover:bg-gray-700 rounded">
                                                <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-28 sm:w-32 rounded-[12px]">
                                            <DropdownMenuItem className="flex items-center gap-2 text-[#4B4B4B] text-[12px]/[16px] sm:text-[13px]/[18px]">
                                                Delete
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex items-center text-[#4B4B4B] gap-2 text-[12px]/[16px] sm:text-[13px]/[18px]">
                                                Download
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}