'use client';

import { useState } from 'react';
import { FileText, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Leave() {
    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 1,
            requestDate: 'Mar 21, 2025',
            startDate: 'Mar 21',
            endDate: 'Mar 25',
            leaveType: 'Vacation',
            days: 1,
            reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
            status: 'Pending'
        },
        {
            id: 2,
            requestDate: 'Mar 21, 2025',
            startDate: 'Mar 21',
            endDate: 'Mar 25',
            leaveType: 'Sick',
            days: 1,
            reason: 'Lorem Ipsum is simply dummy text of...',
            status: 'Accepted'
        },
        {
            id: 3,
            requestDate: 'Mar 21, 2025',
            startDate: 'Mar 21',
            endDate: 'Mar 25',
            leaveType: 'Probation Leave',
            days: 1,
            reason: 'Lorem Ipsum is simply dummy text of...',
            status: 'Rejected'
        },
        {
            id: 4,
            requestDate: 'Mar 21, 2025',
            startDate: 'Mar 21',
            endDate: 'Mar 25',
            leaveType: 'Vacation',
            days: 1,
            reason: 'Lorem Ipsum is simply dummy text of...',
            status: 'Accepted'
        },
        {
            id: 5,
            requestDate: 'Mar 21, 2025',
            startDate: 'Mar 21',
            endDate: 'Mar 25',
            leaveType: 'Sick',
            days: 1,
            reason: 'Lorem Ipsum is simply dummy text of...',
            status: 'Accepted'
        },
        {
            id: 6,
            requestDate: 'Mar 21, 2025',
            startDate: 'Mar 21',
            endDate: 'Mar 25',
            leaveType: 'Vacation',
            days: 1,
            reason: 'Lorem Ipsum is simply dummy text of...',
            status: 'Rejected'
        },
        {
            id: 7,
            requestDate: 'Mar 21, 2025',
            startDate: 'Mar 21',
            endDate: 'Mar 25',
            leaveType: 'Probation Leave',
            days: 1,
            reason: 'Lorem Ipsum is simply dummy text of...',
            status: 'Accepted'
        },
        {
            id: 8,
            requestDate: 'Mar 21, 2025',
            startDate: 'Mar 21',
            endDate: 'Mar 25',
            leaveType: 'Vacation',
            days: 1,
            reason: 'Lorem Ipsum is simply dummy text of...',
            status: 'Accepted'
        }
    ]);

    const leaveBalances = {
        vacation: { used: 8, total: 15 },
        sick: { used: 2, total: 3 }
    };

    const requestStatuses = {
        pending: 1,
        accepted: 10,
        rejected: 2
    };

    const handleApprove = (id: number) => {
        setLeaveRequests(prev =>
            prev.map(request =>
                request.id === id
                    ? { ...request, status: 'Accepted' }
                    : request
            )
        );
    };

    const handleReject = (id: number) => {
        setLeaveRequests(prev =>
            prev.map(request =>
                request.id === id
                    ? { ...request, status: 'Rejected' }
                    : request
            )
        );
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Pending':
                return (
                    <div className="flex items-center gap-2">

                        <Button variant="outline" size="sm" onClick={() => handleReject(leaveRequests.find(r => r.status === 'Pending')?.id || 0)}>
                            <X
                                className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-700"
                            />
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => handleApprove(leaveRequests.find(r => r.status === 'Pending')?.id || 0)}
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
                        <span className="px-2 py-1 text-xs font-medium  text-[#C30606] bg-[#C306061A] rounded-full">
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
            <div className="flex items-center justify-between pt-[12px] pb-[17px] px-[20px]">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                        <span className="text-[#0d978b] font-medium">
                            {leaveBalances.vacation.used}/{leaveBalances.vacation.total}
                        </span>
                        <span className="text-[#8c8e8e] text-sm">Vacation</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-[#0d978b] font-medium">
                            {leaveBalances.sick.used}/{leaveBalances.sick.total}
                        </span>
                        <span className="text-[#8c8e8e] text-sm">Sick</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                        <span className="text-[#8c8e8e] text-sm">{requestStatuses.pending} Pending</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-[#0D978B] text-sm font-medium">{requestStatuses.accepted} Accepted</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-red-500 text-sm font-medium">{requestStatuses.rejected} Rejected</span>
                    </div>
                </div>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#eef3f2]">
                            <tr>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider">
                                    Request Date
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider">
                                    Start Date & End Date
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider">
                                    Leave Type
                                </th>
                                <th className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e] uppercase tracking-wider">
                                    Days
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
                            {leaveRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                                        {request.requestDate}
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm text-gray-900">
                                        {request.startDate} to {request.endDate}
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm text-gray-900">
                                        {request.leaveType}
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm text-gray-900">
                                        {request.days}
                                    </td>
                                    <td className="px-[16px] py-[11px] text-sm text-gray-900 max-w-xs">
                                        <div className="flex items-center justify-between gap-2" title={request.reason}>
                                            <div className="truncate">{request.reason}</div>
                                            <Button variant="outline" size="sm" >
                                                <FileText className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </div>
                                    </td>
                                    <td className="px-[16px] py-[11px] whitespace-nowrap text-sm">
                                        {getStatusBadge(request.status)}
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
