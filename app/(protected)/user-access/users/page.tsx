'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListFilter, Search, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

// Sample data for users
const usersData = [
    {
        id: 1,
        name: 'Alice Fernadez',
        email: 'alicefernadez@gmail.com',
        avatar: '/images/employee/employee.svg',
        status: 'Inactive',
        assignedRoles: ['Recruitment Manager', 'Chief Financial Officer'],
        lastLogin: '12 Dec, 2025'
    },
    {
        id: 2,
        name: 'Brooklyn Simmons',
        email: 'brooklynsimmons@gmail.com',
        avatar: '/images/employee/employee.svg',
        status: 'Active',
        assignedRoles: ['Admin'],
        lastLogin: '12 Dec, 2025'
    },
    {
        id: 3,
        name: 'Kristin Watson',
        email: 'kristinwatson@gmail.com',
        avatar: '/images/employee/employee.svg',
        status: 'Active',
        assignedRoles: ['Chief Financial Officer'],
        lastLogin: '12 Dec, 2025'
    }
];

export default function Users() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const filteredUsers = usersData.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditUser = (userId: number) => {
        console.log('Edit user:', userId);
        // Add your edit logic here
    };

    const handleDeactivateUser = (userId: number) => {
        console.log('Deactivate user:', userId);
        // Add your deactivate logic here
    };

    return (
        <div>
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="relative w-full sm:w-[243px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-[42px] bg-transparent w-full"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                    <Button variant="outline" className="h-[40px] text-[#053834] font-semibold px-3 flex items-center justify-center gap-2 bg-transparent w-full sm:w-auto">
                        <ListFilter className="h-4 w-4 text-[#053834]" />
                        Filter
                    </Button>
                    <Button
                        className="h-[40px] px-3 bg-[#0D978B] hover:bg-[#086159] text-white font-semibold w-full sm:w-auto"
                        onClick={() => router.push('/user-access/users/add-user')}
                    >
                        Add User
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[12px] border border-[#E9E9E9] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="min-w-[600px]">
                        <TableHeader>
                            <TableRow className="border-b border-gray-200 bg-[#EEF3F2]">
                                <TableHead className="text-[12px]/[18px] sm:text-[14px]/[22px] font-medium text-[#8C8E8E] py-[13px] px-2 sm:px-4 min-w-[200px]">Name</TableHead>
                                <TableHead className="text-[12px]/[18px] sm:text-[14px]/[22px] font-medium text-[#8C8E8E] py-[13px] px-2 sm:px-4 text-center min-w-[100px]">Status</TableHead>
                                <TableHead className="text-[12px]/[18px] sm:text-[14px]/[22px] font-medium text-[#8C8E8E] py-[13px] px-2 sm:px-4 min-w-[200px]">Assigned Role(s)</TableHead>
                                <TableHead className="text-[12px]/[18px] sm:text-[14px]/[22px] font-medium text-[#8C8E8E] py-[13px] px-2 sm:px-4 min-w-[120px]">Last Login</TableHead>
                                <TableHead className="w-12 min-w-[48px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="border-b border-gray-100">
                                    <TableCell className="py-3 px-2 sm:px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-[#353535] text-[12px]/[18px] sm:text-[14px]/[22px] truncate">
                                                    {user.name}
                                                </div>
                                                <div className="text-[#8F8F8F] text-[10px]/[12px] sm:text-[11px]/[14px] truncate">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center py-3 px-2 sm:px-4">
                                        <div className={`text-[11px]/[16px] sm:text-[13px]/[18px] rounded-[12px] text-center py-[2px] px-1 sm:px-2 inline-block
                                            ${user.status === 'Inactive' ?
                                                'text-[#787878] bg-[#E9E9E9] hover:bg-[#E9E9E950] hover:text-[#78787850]' :
                                                'text-[#0D978B] bg-[#D6EEEC] hover:bg-[#D6EEEC50] hover:text-[#0D978B50]'
                                            }
                                            `}>
                                            {user.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 px-2 sm:px-4">
                                        <div className="text-[#4B4B4B] text-[12px]/[18px] sm:text-[14px]/[22px] truncate">
                                            {user.assignedRoles.join(', ')}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 px-2 sm:px-4 text-[#4B4B4B] text-[12px]/[18px] sm:text-[14px]/[22px]">
                                        {user.lastLogin}
                                    </TableCell>
                                    <TableCell className="py-3 px-2 sm:px-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-4 w-4 p-0">
                                                    <MoreVertical className="h-3 w-3" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-[12px] text-[12px]/[18px] text-[#4B4B4B]">
                                                <DropdownMenuItem onClick={() => handleEditUser(user.id)}
                                                    className="text-[12px]/[18px] text-[#4B4B4B]">
                                                    Edit Access
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeactivateUser(user.id)}
                                                    className="text-[12px]/[18px] text-[#4B4B4B]">
                                                    Reset Access
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-[12px]/[18px] text-[#4B4B4B]"
                                                >
                                                    Suspend User
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}