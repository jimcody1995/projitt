'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';

interface Integration {
    id: string;
    name: string;
    description: string;
    icon: string;
    isConnected: boolean;
}

export default function Integrations() {
    const [integrations] = useState<Integration[]>([
        {
            id: '1',
            name: 'Pleto',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. t laborum.',
            icon: 'GoPro',
            isConnected: false
        },
        {
            id: '2',
            name: 'Pleto',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. t laborum.',
            icon: 'GoPro',
            isConnected: true
        },
        {
            id: '3',
            name: 'Pleto',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. t laborum.',
            icon: 'GoPro',
            isConnected: false
        },
        {
            id: '4',
            name: 'Pleto',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. t laborum.',
            icon: 'GoPro',
            isConnected: false
        },
        {
            id: '5',
            name: 'Pleto',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. t laborum.',
            icon: 'GoPro',
            isConnected: false
        },
        {
            id: '6',
            name: 'Pleto',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. t laborum.',
            icon: 'GoPro',
            isConnected: false
        }
    ]);

    return (
        <div className="w-full min-h-screen bg-gray-50 -mt-[14px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {integrations.map((integration) => (
                        <div key={integration.id} className="bg-white rounded-[12px] border border-gray-200 p-3 sm:p-4">
                            <div className="flex flex-row gap-2 sm:gap-3 items-center mb-2">
                                {/* Icon */}
                                <div className="flex items-center">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black rounded-[11px] flex items-center justify-center">
                                        <span className="text-white font-bold text-[10px] sm:text-[11px]">GoPro</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-[14px]/[20px] sm:text-[15px]/[22px] lg:text-[16px]/[24px] font-medium text-gray-800">
                                    {integration.name}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-[12px]/[16px] sm:text-[13px]/[18px] leading-relaxed mb-3 sm:mb-4">
                                {integration.description}
                            </p>

                            {/* Button */}
                            {integration.isConnected ? (
                                <Button
                                    variant="outline"
                                    className="w-[80px] sm:w-[94px] h-7 sm:h-8 rounded-[8px] text-[12px]/[16px] sm:text-[14px]/[20px] border-[#BCBCBC] text-[#053834] hover:bg-[#0D978B] hover:text-white transition-colors items-center justify-center"
                                >
                                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    Manage
                                </Button>
                            ) : (
                                <Button
                                    className="w-[80px] sm:w-[94px] h-7 sm:h-8 rounded-[8px] text-[12px]/[16px] sm:text-[14px]/[20px] bg-[#0D978B] hover:bg-[#0D978B]/90 text-white items-center justify-center"
                                >
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    Connect
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}