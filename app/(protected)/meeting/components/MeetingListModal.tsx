"use client";

import { useState, useEffect } from "react";
import { X, RefreshCw, Calendar, Clock, Users } from "lucide-react";
import { listMeetings } from "../../../../api/meeting";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface MeetingListModalProps {
    isOpen: boolean;
    onClose: () => void;
    onMeetingClick?: (meetingId: number) => void;
}

interface Meeting {
    id: number;
    title: string;
    scheduled_at: string;
    duration_minutes: number;
    status: string;
    created_by: number;
    join_code?: string;
    created_at: string;
    updated_at: string;
}

interface MeetingsResponse {
    data: Meeting[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function MeetingListModal({ isOpen, onClose, onMeetingClick }: MeetingListModalProps) {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState<'scheduled_at' | 'created_at' | 'title' | 'status'>('scheduled_at');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

    const fetchMeetings = async (page: number = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await listMeetings({
                per_page: 10,
                sort_by: sortBy,
                sort_dir: sortDir,
            });

            // Log the response to see its structure
            console.log('Raw Response:', response);
            console.log('Response Type:', typeof response);

            // Handle if response is a string (needs JSON parsing)
            let parsedResponse = response;
            if (typeof response === 'string') {
                try {
                    parsedResponse = JSON.parse(response);
                    console.log('Parsed Response:', parsedResponse);
                } catch (parseError) {
                    console.error('Failed to parse JSON response:', parseError);
                    throw new Error('Invalid response format');
                }
            }

            // Laravel paginate() returns data in this structure
            const meetingsData = parsedResponse.data || [];
            const currentPageValue = parsedResponse.current_page || 1;
            const lastPageValue = parsedResponse.last_page || 1;

            console.log('Meetings Data:', meetingsData);
            console.log('Current Page:', currentPageValue);
            console.log('Last Page:', lastPageValue);

            setMeetings(meetingsData);
            setCurrentPage(currentPageValue);
            setTotalPages(lastPageValue);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to fetch meetings');
            console.error('Error fetching meetings:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchMeetings(currentPage);
        }
    }, [isOpen, sortBy, sortDir, currentPage]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        const statusColors: { [key: string]: string } = {
            scheduled: 'bg-blue-500/20 text-blue-400',
            started: 'bg-green-500/20 text-green-400',
            ended: 'bg-gray-500/20 text-gray-400',
            cancelled: 'bg-red-500/20 text-red-400',
        };

        return (
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[status] || statusColors.scheduled}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative bg-[#053834] rounded-[16px] w-[90vw] max-w-[1000px] max-h-[80vh] flex flex-col border border-[#8f8f8f]/30">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#8f8f8f]/30">
                    <div className="flex items-center gap-3">
                        <Users className="text-white size-6" />
                        <h2 className="text-white text-2xl font-semibold">All Meetings</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => fetchMeetings(currentPage)}
                            disabled={isLoading}
                            className="p-2 rounded-lg hover:bg-[#086159] transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`text-white size-5 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-[#086159] transition-colors"
                        >
                            <X className="text-white size-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading && meetings.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <RefreshCw className="text-white size-8 animate-spin mx-auto mb-4" />
                                <p className="text-[#c5c6d0]">Loading meetings...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <p className="text-red-400 mb-4">{error}</p>
                                <Button onClick={() => fetchMeetings(currentPage)} variant="outline">
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    ) : meetings.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <Users className="text-[#8f8f8f] size-12 mx-auto mb-4" />
                                <p className="text-[#c5c6d0] text-lg">No meetings found</p>
                                <p className="text-[#8f8f8f] text-sm mt-2">Create your first meeting to get started</p>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[#8f8f8f]/30 hover:bg-transparent">
                                        <TableHead className="text-[#c5c6d0] font-semibold">Title</TableHead>
                                        <TableHead className="text-[#c5c6d0] font-semibold">Join Code</TableHead>
                                        <TableHead className="text-[#c5c6d0] font-semibold">Scheduled</TableHead>
                                        <TableHead className="text-[#c5c6d0] font-semibold">Duration</TableHead>
                                        <TableHead className="text-[#c5c6d0] font-semibold">Status</TableHead>
                                        <TableHead className="text-[#c5c6d0] font-semibold">Created By</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {meetings.map((meeting) => (
                                        <TableRow
                                            key={meeting.id}
                                            onClick={() => onMeetingClick && onMeetingClick(meeting.id)}
                                            className="border-[#8f8f8f]/30 hover:bg-[#086159]/30 cursor-pointer transition-colors"
                                        >
                                            <TableCell className="text-white font-medium">
                                                {meeting.title}
                                            </TableCell>
                                            <TableCell className="text-[#c5c6d0] font-mono text-sm">
                                                {meeting.join_code || '-'}
                                            </TableCell>
                                            <TableCell className="text-[#c5c6d0]">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="size-4" />
                                                    <div>
                                                        <div>{formatDate(meeting.scheduled_at)}</div>
                                                        <div className="text-xs text-[#8f8f8f]">{formatTime(meeting.scheduled_at)}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-[#c5c6d0]">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="size-4" />
                                                    {meeting.duration_minutes} min
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(meeting.status)}
                                            </TableCell>
                                            <TableCell className="text-[#c5c6d0] text-sm">
                                                User #{meeting.created_by}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>

                {/* Footer with Pagination */}
                {meetings.length > 0 && (
                    <div className="flex items-center justify-between p-6 border-t border-[#8f8f8f]/30">
                        <p className="text-[#c5c6d0] text-sm">
                            Page {currentPage} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1 || isLoading}
                                variant="outline"
                                size="sm"
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages || isLoading}
                                variant="outline"
                                size="sm"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

