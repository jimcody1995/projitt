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

// Sample data for roles
const rolesData = [
    {
        id: 1,
        name: 'Account Administrator',
        status: 'Active',
        usersAssigned: 1,
        modules: ['HR', 'Vendor', 'Asset & Facility', 'Finance & Operations']
    },
    {
        id: 2,
        name: 'Recruitment Manager',
        status: 'Inactive',
        usersAssigned: 4,
        modules: ['Vendor', 'Asset & Facility']
    },
    {
        id: 3,
        name: 'Chief Financial Officer',
        status: 'Active',
        usersAssigned: 2,
        modules: ['Finance & Operations']
    },
    {
        id: 4,
        name: 'HR Manager',
        status: 'Active',
        usersAssigned: 1,
        modules: ['HR']
    },
    {
        id: 5,
        name: 'Talent Manager',
        status: 'Active',
        usersAssigned: 1,
        modules: ['HR']
    }
];

// Module color mapping
const moduleColors = {
    'HR': 'bg-[#D8D2FA] text-[#282A33]',
    'Vendor': 'bg-[#C3F3CD] text-[#282A33]',
    'Asset & Facility': 'bg-[#F1C6C5] text-[#282A33]',
    'Finance & Operations': 'bg-[#FBDFC3] text-[#282A33]'
};
export default function Roles() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const filteredRoles = rolesData.filter(role =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditRole = (roleId: number) => {
        console.log('Edit role:', roleId);
        // Add your edit logic here
    };

    const handleDuplicateRole = (roleId: number) => {
        console.log('Duplicate role:', roleId);
        // Add your duplicate logic here
    };

    const handleDeactivateRole = (roleId: number) => {
        console.log('Deactivate role:', roleId);
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
                        className="pl-9 h-[40px] bg-transparent w-full"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                    <Button variant="outline" className="h-[40px] text-[#053834] font-semibold px-3 flex items-center justify-center gap-2 bg-transparent w-full sm:w-auto">
                        <ListFilter className="h-4 w-4 text-[#053834]" />
                        Filter
                    </Button>
                    <Button className="h-[40px] px-3 bg-[#0D978B] hover:bg-[#086159] text-white font-semibold w-full sm:w-auto" onClick={() => router.push('/user-access/roles/create-roles')}>
                        Create Role
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[12px] border border-[#E9E9E9] overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="min-w-[600px]">
                        <TableHeader>
                            <TableRow className="border-b border-gray-200 bg-[#EEF3F2]">
                                <TableHead className="text-[12px]/[18px] sm:text-[14px]/[22px] font-medium text-[#8C8E8E] py-[13px] px-2 sm:px-4 min-w-[150px]">Roles</TableHead>
                                <TableHead className="text-[12px]/[18px] sm:text-[14px]/[22px] font-medium text-[#8C8E8E] py-[13px] px-2 sm:px-4 min-w-[100px]">Status</TableHead>
                                <TableHead className="text-[12px]/[18px] sm:text-[14px]/[22px] font-medium text-[#8C8E8E] py-[13px] px-2 sm:px-4 min-w-[120px]">Users Assigned</TableHead>
                                <TableHead className="text-[12px]/[18px] sm:text-[14px]/[22px] font-medium text-[#8C8E8E] py-[13px] px-2 sm:px-4 min-w-[200px]">Modules</TableHead>
                                <TableHead className="w-12 min-w-[48px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRoles.map((role) => (
                                <TableRow key={role.id} className="border-b border-gray-100">
                                    <TableCell className="py-3 px-2 sm:px-4">
                                        <span className={`text-[#4B4B4B] hover:text-[#0D978B] font-medium cursor-pointer text-[12px]/[18px] sm:text-[14px]/[20px]`}>
                                            {role.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3 px-2 sm:px-4">
                                        <div className={`text-[11px]/[16px] sm:text-[13px]/[18px] rounded-[12px] text-center py-[2px] px-1 sm:px-2 inline-block
                                            ${role.status === 'Inactive' ?
                                                'text-[#787878] bg-[#E9E9E9] hover:bg-[#E9E9E950] hover:text-[#78787850]' :
                                                'text-[#0D978B] bg-[#D6EEEC] hover:bg-[#D6EEEC50] hover:text-[#0D978B50]'
                                            }
                                            `}>
                                            {role.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 px-2 sm:px-4 text-[#353535] text-[12px]/[18px] sm:text-[14px]/[20px]">
                                        {role.usersAssigned}
                                    </TableCell>
                                    <TableCell className="py-3 px-2 sm:px-4">
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {role.modules.map((module, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className={`${moduleColors[module as keyof typeof moduleColors]} border-0 text-[10px]/[14px] sm:text-[13px]/[18px] px-1 sm:px-2 rounded-[12px]`}
                                                >
                                                    {module}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 px-2 sm:px-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-gray-100"
                                                >
                                                    <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-33 rounded-[12px]">
                                                <DropdownMenuItem
                                                    onClick={() => handleEditRole(role.id)}
                                                    className="cursor-pointer text-[12px]/[18px] text-gray-700 hover:bg-gray-50"
                                                >
                                                    Edit Role
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDuplicateRole(role.id)}
                                                    className="cursor-pointer text-[12px]/[18px] text-gray-700 hover:bg-gray-50"
                                                >
                                                    Duplicate
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDeactivateRole(role.id)}
                                                    className="cursor-pointer text-[12px]/[18px] text-gray-700 hover:bg-gray-50"
                                                >
                                                    Deactivate
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
    )
}