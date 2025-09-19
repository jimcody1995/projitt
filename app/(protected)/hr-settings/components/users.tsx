'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreVertical, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Users() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Ethan Harper',
            email: 'ethanharper@gmail.com',
            role: 'Account Owner'
        },
        {
            id: 2,
            name: 'Olivia Bennett',
            email: 'oliviabennett@gmail.com',
            role: 'Admin'
        },
        {
            id: 3,
            name: 'Noah Carter',
            email: 'noahcarter@gmail.com',
            role: 'Head of Department'
        }
    ]);

    const handleAddUser = () => {
        console.log('Add user clicked');
        // Add user logic here
    };

    const handleEditUser = (userId: number) => {
        console.log('Edit user:', userId);
        // Edit user logic here
    };

    const handleDeleteUser = (userId: number) => {
        console.log('Delete user:', userId);
        // Delete user logic here
    };

    const handleViewUser = (userId: number) => {
        console.log('View user:', userId);
        // View user logic here
    };

    return (
        <div className="flex flex-col lg:flex-row mt-[34px]">
            {/* Main Content */}
            <div className="flex-1">
                <div className="space-y-6">
                    {/* Header with Tabs and Add User Button */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center bg-[#e9e9e9] rounded-[6px] p-[2px] relative">
                            {/* Animated background slider */}
                            <div
                                className={`absolute top-[2px] h-[32px] w-[131px] bg-[#0d978b] rounded-[6px] transition-all duration-300 ease-in-out transform ${activeTab === 'users' ? 'translate-x-0' : 'translate-x-[131px]'
                                    }`}
                            />
                            <div
                                className={`relative w-[131px] h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${activeTab === 'users' ? 'text-white' : 'text-[#a5a5a5]'
                                    }`}
                                onClick={() => setActiveTab('users')}
                            >
                                <p className="text-[14px]/[22px] font-medium transition-all duration-300 ease-in-out">Users</p>
                            </div>
                            <div
                                className={`relative w-[131px] h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${activeTab === 'roles' ? 'text-white' : 'text-[#a5a5a5]'
                                    }`}
                                onClick={() => setActiveTab('roles')}
                            >
                                <p className="text-[14px]/[22px] font-medium transition-all duration-300 ease-in-out">Roles</p>
                            </div>
                        </div>
                        <Button
                            onClick={handleAddUser}
                            className="bg-[#0d978b] hover:bg-[#0d978b]/90 text-white px-4 py-2 h-auto"
                        >
                            {activeTab === 'users' ? 'Add User' : 'Add Role'}
                        </Button>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[#EEF3F2]">
                                <tr>
                                    <th className="text-left py-4 px-6 text-[14px]/[20px] font-medium text-[#6B7280]">
                                        Name
                                    </th>
                                    <th className="text-left py-4 px-6 text-[14px]/[20px] font-medium text-[#6B7280]">
                                        Email
                                    </th>
                                    <th className="text-left py-4 px-6 text-[14px]/[20px] font-medium text-[#6B7280]">
                                        Role
                                    </th>
                                    <th className="w-12 py-4 px-6"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                                        <td className="py-4 px-6">
                                            <p className="text-[14px]/[20px] font-medium text-[#1F2937]">
                                                {user.name}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-[14px]/[20px] text-[#6B7280]">
                                                {user.email}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-[14px]/[20px] text-[#6B7280]">
                                                {user.role}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-gray-100"
                                                    >
                                                        <MoreVertical className="h-4 w-4 text-gray-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => handleViewUser(user.id)}
                                                        className="text-gray-700 focus:text-gray-700"
                                                    >
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleEditUser(user.id)}
                                                        className="text-[#0d978b] focus:text-[#0d978b]"
                                                    >
                                                        Edit User
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="text-red-600 focus:text-red-600"
                                                    >
                                                        Delete User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State (if no users) */}

                </div>
            </div>
        </div>
    );
}
