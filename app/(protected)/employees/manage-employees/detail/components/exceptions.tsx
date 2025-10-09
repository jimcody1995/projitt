'use client';

import { useState } from 'react';
import { FileText, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function Exceptions() {
    const [exceptions, setExceptions] = useState([
        {
            id: 1,
            date: 'Mon, Apr 23',
            type: 'Overtime',
            details: '2hrs, 5:00pm - 7:00pm',
            reason: 'Lorem Ipsum is simply dummy text of the printi...',
            status: 'Pending'
        },
        {
            id: 2,
            date: 'Mon, Apr 23',
            type: 'Entry Edit',
            details: '8:00am - 5:00pm, Manual Entry',
            reason: 'Lorem Ipsum is simply dummy text of the printi...',
            status: 'Accepted'
        },
        {
            id: 3,
            date: 'Mon, Apr 23',
            type: 'Overtime',
            details: '2hrs, 5:00pm - 7:00pm',
            reason: 'Lorem Ipsum is simply dummy text of the printi...',
            status: 'Rejected'
        },
        {
            id: 4,
            date: 'Mon, Apr 23',
            type: 'Missed Clock Out',
            details: '8:00am - 5:00pm, Manual Entry',
            reason: 'Lorem Ipsum is simply dummy text of the printi...',
            status: 'Accepted'
        },
        {
            id: 5,
            date: 'Mon, Apr 23',
            type: 'No attendance',
            details: '8:00am - 5:00pm, Manual Entry',
            reason: 'Lorem Ipsum is simply dummy text of the printi...',
            status: 'Accepted'
        }
    ]);

    const handleApprove = (id: number) => {
        setExceptions(prev =>
            prev.map(exception =>
                exception.id === id
                    ? { ...exception, status: 'Accepted' }
                    : exception
            )
        );
    };

    const handleReject = (id: number) => {
        setExceptions(prev =>
            prev.map(exception =>
                exception.id === id
                    ? { ...exception, status: 'Rejected' }
                    : exception
            )
        );
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Pending':
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleReject(exceptions.find(e => e.status === 'Pending')?.id || 0)}>
                            <X className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-700" />
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => handleApprove(exceptions.find(e => e.status === 'Pending')?.id || 0)}
                        >
                            <Check className="h-3 w-3 mr-1" />
                            Approve
                        </Button>
                    </div>
                );
            case 'Accepted':
                return (
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-[#D6EEEC] text-[#0D978B] rounded-full">
                            Accepted
                        </span>
                    </div>
                );
            case 'Rejected':
                return (
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium text-[#C30606] bg-[#C306061A] rounded-full">
                            Rejected
                        </span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full">
            <div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#eef3f2]">
                            <tr>
                                <th className="w-14 px-4 text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider items-center">
                                    <Checkbox className="w-[13px] h-[13px]" />
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider">
                                    Details
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider">
                                    Reason
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {exceptions.map((exception) => (
                                <tr key={exception.id} className="hover:bg-gray-50">
                                    <td className="w-14 px-4 whitespace-nowrap text-sm font-medium text-gray-900 items-center">
                                        <Checkbox className="w-[13px] h-[14px]" />
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                                        {exception.date}
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm text-gray-900">
                                        {exception.type}
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm text-gray-900">
                                        {exception.details}
                                    </td>
                                    <td className="px-[16px] py-[11px] text-sm text-gray-900 max-w-xs">
                                        <div className="flex items-center justify-between gap-2" title={exception.reason}>
                                            <div className="truncate">{exception.reason}</div>
                                            <Button variant="outline" size="sm">
                                                <FileText className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </div>
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm">
                                        {getStatusBadge(exception.status)}
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
