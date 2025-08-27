'use client';

import React, { useEffect, useState } from 'react';
import TableMode from './components/table-mode';
import { getInterviews } from '@/api/interviews';
import { ChevronDown, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * @description
 * The `Interviews` component serves as a main dashboard for managing job interviews. 
 * It allows users to switch between a calendar view (`CalendarMode`) and a table view (`TableMode`) of their scheduled interviews. 
 * The component maintains the state for the active view and the currently selected application,
 * and it displays a `Detail` dialog when an application is selected.
 * Unique `data-testid` attributes have been added to all key interactive elements for UI test automation.
 */
export default function People() {
    const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
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
    /**
     * @description
     * This function is a callback for the `Detail` dialog's `onOpenChange` prop.
     * When the dialog is closed, this function resets the `selectedApplication` state to `null`,
     * which in turn closes the dialog.
     */
    const handleOpenChange = (open: boolean) => {
        setSelectedApplication(null);
    };

    return <div className='px-[8px] py-[6px]'>
        <div className="flex justify-between w-full sm:flex-row flex-col items-start gap-[10px]">
            <div className='flex items-center gap-[10px]'>
                <p className="text-[24px]/[30px] font-semibold text-[#0d978b]">Employee</p>
                <ChevronDown className='size-[20px] text-[#0d978b]' />
            </div>
            <div className='flex gap-[16px]'>
                <Button variant='outline' className='h-[42px] text-[14px]/[22px] font-medium text-[#053834] border-[#053834]'>
                    <Diamond className='size-[18px] ' />
                    <span className='text-[14px]/[20px] font-semibold'>Org Chart</span>
                </Button>
                <Button className='h-[42px] text-[14px]/[22px] font-medium '>
                    Add Employee
                    <ChevronDown className='size-[18px] ' />
                </Button>
            </div>
        </div>

        <div >
            <div className="mt-[15px] relative" data-testid="interviews-content">
                <TableMode data={data} setSelectedApplication={setSelectedApplication} data-testid="table-mode-component" loading={loading} />
            </div>
        </div>
    </div>

}
