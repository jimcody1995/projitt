'use client';

import React, { useEffect, useState } from 'react';
import TableMode from './components/table-mode';
import { getInterviews } from '@/api/interviews';
import { ChevronDown, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

/**
 * @description
 * The `Interviews` component serves as a main dashboard for managing job interviews. 
 * It allows users to switch between a calendar view (`CalendarMode`) and a table view (`TableMode`) of their scheduled interviews. 
 * The component maintains the state for the active view and the currently selected application,
 * and it displays a `Detail` dialog when an application is selected.
 * Unique `data-testid` attributes have been added to all key interactive elements for UI test automation.
 */
export default function People() {
    const [data, setData] = useState<any[]>([
        {
            id: 1,
            employee_id: '123456',
            name: 'John Doe',
            job: {
                title: 'Software Engineer',
                country: 'United States',
            },
            department: 'IT',
            employment_type: 'Full-time',
            mode: 'In-person',
            status: 'Active',
            date: '2024-01-01'
        },
        {
            id: 2,
            employee_id: '123456',
            name: 'Jane Smith',
            job: {
                title: 'Software Engineer',
                country: 'United States',
            },
            department: 'IT',
            employment_type: 'Full-time',
            mode: 'In-person',
            status: 'Active',
            date: '2024-01-01'
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<any>(null);
    const router = useRouter();

    return <div className='px-[8px] py-[6px]'>
        <div className="flex justify-between w-full sm:flex-row flex-col items-start gap-[10px]">

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex items-center gap-[10px] cursor-pointer'>
                        <p className="text-[24px]/[30px] font-semibold text-[#0d978b]">Employee</p>
                        <ChevronDown className='size-[20px] text-[#0d978b]' />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    className='w-[164px]'
                >
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push('/people');
                        }}
                    >
                        Employees
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push('/employees/manage-employeesdepartments');
                        }}
                    >
                        Department
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push('/employees/manage-employeesteams');
                        }}
                    >
                        Teams
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push('/employees/manage-employeesjob-title');
                        }}
                    >
                        Job TItles
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className='flex gap-[16px]'>
                <Button variant='outline' className='h-[42px] text-[14px]/[22px] font-medium text-[#053834] border-[#053834]' onClick={() => router.push('/employees/manage-employees/org-chart')}>
                    <Diamond className='size-[18px] ' />
                    <span className='text-[14px]/[20px] font-semibold'>Org Chart</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div>
                            <Button className='h-[42px] text-[14px]/[22px] font-medium '>
                                Add Employee
                                <ChevronDown className='size-[18px] ' />
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="bottom"
                        align="end"
                        data-testid={`actions-menu`}
                    >

                        <div
                            className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                            data-testid={`view-applicants-action`}
                            onClick={() => router.push('/employees/manage-employees/new-employee')}
                        >
                            Add New Employee
                        </div>
                        <div
                            className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                            data-testid={`view-applicants-action`}
                            onClick={() => router.push('/employees/manage-employees/bulk-import')}
                        >
                            Add Multiple Employees
                        </div>

                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>

        <div >
            <div className="mt-[15px] relative" data-testid="interviews-content">
                <TableMode />
            </div>
        </div>
    </div>

}
