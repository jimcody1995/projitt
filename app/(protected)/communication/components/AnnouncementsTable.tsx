'use client';

import { ChevronRight } from 'lucide-react';

interface Announcement {
    id: string;
    title: string;
    fromDate: string;
    toDate: string;
    status: 'In Process' | 'Completed';
}

const announcements: Announcement[] = [
    {
        id: '1',
        title: 'Welcome to the new UI',
        fromDate: '23 Mar, 2025',
        toDate: '23 Mar, 2025',
        status: 'In Process'
    },
    {
        id: '2',
        title: 'Hi and welcome',
        fromDate: '23 Mar, 2025',
        toDate: '23 Mar, 2025',
        status: 'Completed'
    },
    {
        id: '3',
        title: 'Welcome to the new UI',
        fromDate: '23 Mar, 2025',
        toDate: '23 Mar, 2025',
        status: 'In Process'
    }
];

export default function AnnouncementsTable() {
    return (
        <div className="rounded-[12px] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-[#EEF3F2] h-[50px] sm:h-[60px]">
                        <tr>
                            <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] font-medium sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E]">
                                Announcement
                            </th>
                            <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] font-medium sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E]">
                                From Date
                            </th>
                            <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] font-medium sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E]">
                                To Date
                            </th>
                            <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] font-medium sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E]">
                                Job Status
                            </th>
                            <th className="px-[12px] sm:px-[16px] text-right text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E]">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((announcement) => (
                            <tr key={announcement.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-[12px]/[18px] sm:text-[14px]/[22px] text-[#353535]">
                                    {announcement.title}
                                </td>
                                <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-[12px]/[18px] sm:text-[14px]/[20px] text-[#4B4B4B]">
                                    {announcement.fromDate}
                                </td>
                                <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-[12px]/[18px] sm:text-[14px]/[20px] text-[#4B4B4B]">
                                    {announcement.toDate}
                                </td>
                                <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px]">
                                    <span className={`inline-flex items-center px-2.5  rounded-full text-[14px]/[22px] font-medium ${announcement.status === 'In Process'
                                        ? 'bg-[#FFDFC0] text-[#BE5E00]'
                                        : 'bg-[#D6EEEC] text-[#0D978B]'
                                        }`}>
                                        {announcement.status}
                                    </span>
                                </td>
                                <td className="px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] text-right">
                                    <button className="flex items-center gap-1 text-[#0D978B] hover:text-[#0D978B]/80 text-[12px]/[16px] sm:text-[14px]/[20px] font-medium">
                                        View Announcement →
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
