'use client';

import { useState } from 'react';
import Roles from './roles/page';
import Users from './users/page';



export default function UserAccess() {
    const [activeTab, setActiveTab] = useState('Roles');


    return (
        <div className="">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
                <h1 className="text-[20px]/[26px] sm:text-[24px]/[30px] font-semibold text-[#353535] mb-4 sm:mb-[26px]">
                    User Access
                </h1>

                {/* Navigation Tabs */}
                <div className="flex space-x-4 sm:space-x-8 border-b border-gray-200 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('Roles')}
                        className={`pb-3 px-3 sm:px-5 text-[13px]/[18px] sm:text-[14px]/[20px] font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'Roles'
                            ? 'border-[#0D978B] text-[#0D978B]'
                            : 'border-transparent text-[#4B4B4B] hover:text-gray-700'
                            }`}
                    >
                        Roles
                    </button>
                    <button
                        onClick={() => setActiveTab('Users')}
                        className={`pb-3 px-3 sm:px-5 text-[13px]/[18px] sm:text-[14px]/[20px] font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'Users'
                            ? 'border-[#0D978B] text-[#0D978B]'
                            : 'border-transparent text-[#4B4B4B] hover:text-gray-700'
                            }`}
                    >
                        Users
                    </button>
                </div>
            </div>
            {activeTab === 'Roles' && <Roles />}
            {activeTab === 'Users' && <Users />}
        </div>
    );
}