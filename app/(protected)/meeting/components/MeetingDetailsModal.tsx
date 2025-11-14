"use client";

import { useState, useEffect } from "react";
import { X, Copy, Calendar, Clock, User, Hash, CheckCircle, Loader2, Edit, Trash2, Play, Square, UserPlus } from "lucide-react";
import { showMeeting, startMeeting, endMeeting } from "../../../../api/meeting";
import { Button } from "@/components/ui/button";
import InviteUserModal from "./InviteUserModal";

interface MeetingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    meetingId: number | null;
    onEdit?: (meeting: any) => void;
    onDelete?: (meetingId: number) => void;
    onStart?: (meeting: any) => void;
}

interface Meeting {
    id: number;
    title: string;
    scheduled_at: string;
    duration_minutes: number;
    status: string;
    created_by: number;
    join_code: string;
    started_at: string | null;
    ended_at: string | null;
    created_at: string;
    updated_at: string;
}

export default function MeetingDetailsModal({
    isOpen,
    onClose,
    meetingId,
    onEdit,
    onDelete,
    onStart
}: MeetingDetailsModalProps) {
    const [meeting, setMeeting] = useState<Meeting | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isStarting, setIsStarting] = useState(false);
    const [startError, setStartError] = useState<string | null>(null);
    const [isEnding, setIsEnding] = useState(false);
    const [endError, setEndError] = useState<string | null>(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen && meetingId) {
            fetchMeetingDetails();
        }
    }, [isOpen, meetingId]);

    const fetchMeetingDetails = async () => {
        if (!meetingId) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await showMeeting(meetingId);
            console.log('Meeting Details Response:', response);

            // Handle if response is a string (needs JSON parsing)
            let parsedResponse: Meeting = response;
            if (typeof response === 'string') {
                parsedResponse = JSON.parse(response);
            }

            setMeeting(parsedResponse);
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Failed to fetch meeting details';
            setError(errorMessage);
            console.error('Error fetching meeting details:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyJoinCode = async () => {
        if (meeting?.join_code) {
            try {
                await navigator.clipboard.writeText(meeting.join_code);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    const handleStartMeeting = async () => {
        if (!meeting?.id) return;

        setIsStarting(true);
        setStartError(null);

        try {
            const response = await startMeeting(meeting.id);
            console.log('Meeting started successfully:', response);

            // Handle if response is a string (needs JSON parsing)
            let parsedResponse: any = response;
            if (typeof response === 'string') {
                parsedResponse = JSON.parse(response);
            }

            // Check for idempotency case (already started)
            if (parsedResponse.error === 'already_started') {
                setStartError('Meeting has already been started');
                // Refresh meeting data to show current state
                await fetchMeetingDetails();
                return;
            }

            // Update local meeting state with started meeting
            setMeeting(parsedResponse);

            // Call onStart callback if provided (e.g., navigate to meeting room)
            if (onStart) {
                onStart(parsedResponse);
            }

        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Failed to start meeting';
            setStartError(errorMessage);
            console.error('Error starting meeting:', err);
        } finally {
            setIsStarting(false);
        }
    };

    const handleEndMeeting = async () => {
        if (!meeting?.id) return;

        setIsEnding(true);
        setEndError(null);

        try {
            const response = await endMeeting(meeting.id);
            console.log('Meeting ended successfully:', response);

            // Handle if response is a string (needs JSON parsing)
            let parsedResponse: any = response;
            if (typeof response === 'string') {
                parsedResponse = JSON.parse(response);
            }

            // Check for idempotency case (already ended)
            if (parsedResponse.error === 'already_ended') {
                setEndError('Meeting has already been ended');
                // Refresh meeting data to show current state
                await fetchMeetingDetails();
                return;
            }

            // Update local meeting state with ended meeting
            setMeeting(parsedResponse);

            // Show success message
            alert('Meeting ended successfully!');

        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Failed to end meeting';
            setEndError(errorMessage);
            console.error('Error ending meeting:', err);
        } finally {
            setIsEnding(false);
        }
    };

    const handleClose = () => {
        setMeeting(null);
        setError(null);
        setCopied(false);
        setStartError(null);
        setEndError(null);
        onClose();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
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
        const statusConfig: { [key: string]: { bg: string; text: string; icon: string } } = {
            scheduled: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: '📅' },
            started: { bg: 'bg-green-500/20', text: 'text-green-400', icon: '🟢' },
            ended: { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: '✓' },
            cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', icon: '✕' },
        };

        const config = statusConfig[status] || statusConfig.scheduled;

        return (
            <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${config.bg} ${config.text} flex items-center gap-2`}>
                <span>{config.icon}</span>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative bg-[#053834] rounded-[16px] w-[90vw] max-w-[700px] flex flex-col border border-[#8f8f8f]/30">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#8f8f8f]/30">
                    <div className="flex items-center gap-3">
                        <Calendar className="text-white size-6" />
                        <h2 className="text-white text-2xl font-semibold">Meeting Details</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg hover:bg-[#086159] transition-colors"
                    >
                        <X className="text-white size-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <Loader2 className="text-white size-8 animate-spin mx-auto mb-4" />
                                <p className="text-[#c5c6d0]">Loading meeting details...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <p className="text-red-400 mb-4">{error}</p>
                                <Button onClick={fetchMeetingDetails} variant="outline">
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    ) : meeting ? (
                        <>
                            {/* Meeting Title & Status */}
                            <div className="space-y-3">
                                <h3 className="text-white text-2xl font-bold">{meeting.title}</h3>
                                {getStatusBadge(meeting.status)}
                            </div>

                            {/* Start Error Message */}
                            {startError && (
                                <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                                    <p className="text-yellow-400 text-sm">{startError}</p>
                                </div>
                            )}

                            {/* Join Code - Prominent Display */}
                            <div className="bg-[#086159]/30 border border-[#0a9f8e]/50 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-[#8f8f8f] text-xs mb-1">Meeting Join Code</p>
                                        <p className="text-white text-2xl font-mono font-bold tracking-wider">
                                            {meeting.join_code}
                                        </p>
                                    </div>
                                    <Button
                                        onClick={handleCopyJoinCode}
                                        className="bg-[#0a9f8e] hover:bg-[#0a9f8e]/90 text-white"
                                    >
                                        {copied ? (
                                            <>
                                                <CheckCircle className="size-4 mr-2" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="size-4 mr-2" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Meeting Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Scheduled Date */}
                                <div className="bg-[#086159]/20 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="text-[#0a9f8e] size-5 mt-1" />
                                        <div>
                                            <p className="text-[#8f8f8f] text-xs mb-1">Scheduled Date</p>
                                            <p className="text-white font-medium">{formatDate(meeting.scheduled_at)}</p>
                                            <p className="text-[#c5c6d0] text-sm">{formatTime(meeting.scheduled_at)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="bg-[#086159]/20 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Clock className="text-[#0a9f8e] size-5 mt-1" />
                                        <div>
                                            <p className="text-[#8f8f8f] text-xs mb-1">Duration</p>
                                            <p className="text-white font-medium">{meeting.duration_minutes} minutes</p>
                                            <p className="text-[#c5c6d0] text-sm">
                                                {Math.floor(meeting.duration_minutes / 60)}h {meeting.duration_minutes % 60}m
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Meeting ID */}
                                <div className="bg-[#086159]/20 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Hash className="text-[#0a9f8e] size-5 mt-1" />
                                        <div>
                                            <p className="text-[#8f8f8f] text-xs mb-1">Meeting ID</p>
                                            <p className="text-white font-medium font-mono">{meeting.id}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Created By */}
                                <div className="bg-[#086159]/20 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <User className="text-[#0a9f8e] size-5 mt-1" />
                                        <div>
                                            <p className="text-[#8f8f8f] text-xs mb-1">Created By</p>
                                            <p className="text-white font-medium">User #{meeting.created_by}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timestamps */}
                            {(meeting.started_at || meeting.ended_at) && (
                                <div className="bg-[#086159]/20 rounded-lg p-4 space-y-2">
                                    <p className="text-[#8f8f8f] text-xs mb-2">Timeline</p>
                                    {meeting.started_at && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#c5c6d0] text-sm">Started at:</span>
                                            <span className="text-white text-sm font-medium">
                                                {formatDate(meeting.started_at)} {formatTime(meeting.started_at)}
                                            </span>
                                        </div>
                                    )}
                                    {meeting.ended_at && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#c5c6d0] text-sm">Ended at:</span>
                                            <span className="text-white text-sm font-medium">
                                                {formatDate(meeting.ended_at)} {formatTime(meeting.ended_at)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Error Messages */}
                            {(startError || endError) && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                                    <p className="text-red-400 text-sm">{startError || endError}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 pt-4">
                                {/* Primary Actions Row */}
                                <div className="flex gap-3">
                                    {meeting.status === 'scheduled' && (
                                        <Button
                                            onClick={handleStartMeeting}
                                            disabled={isStarting}
                                            className="flex-1 bg-[#0a9f8e] text-white hover:bg-[#0a9f8e]/90 disabled:opacity-50"
                                        >
                                            {isStarting ? (
                                                <>
                                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                                    Starting...
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="size-4 mr-2" />
                                                    Start Meeting
                                                </>
                                            )}
                                        </Button>
                                    )}
                                    {meeting.status === 'started' && (
                                        <Button
                                            onClick={handleEndMeeting}
                                            disabled={isEnding}
                                            className="flex-1 bg-red-600 text-white hover:bg-red-600/90 disabled:opacity-50"
                                        >
                                            {isEnding ? (
                                                <>
                                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                                    Ending...
                                                </>
                                            ) : (
                                                <>
                                                    <Square className="size-4 mr-2" />
                                                    End Meeting
                                                </>
                                            )}
                                        </Button>
                                    )}
                                    {meeting.status !== 'ended' && (
                                        <Button
                                            onClick={() => setIsInviteModalOpen(true)}
                                            variant="outline"
                                            className="flex-1 bg-transparent border-[#0a9f8e]/50 text-[#0a9f8e] hover:bg-[#0a9f8e]/20"
                                        >
                                            <UserPlus className="size-4 mr-2" />
                                            Invite User
                                        </Button>
                                    )}
                                </div>

                                {/* Secondary Actions Row */}
                                <div className="flex gap-3">
                                    {onEdit && meeting.status !== 'ended' && (
                                        <Button
                                            onClick={() => onEdit(meeting)}
                                            variant="outline"
                                            className="flex-1 bg-transparent border-[#8f8f8f]/30 text-[#c5c6d0] hover:bg-[#086159]/30"
                                        >
                                            <Edit className="size-4 mr-2" />
                                            Edit
                                        </Button>
                                    )}
                                    {onDelete && meeting.status !== 'started' && (
                                        <Button
                                            onClick={() => onDelete(meeting.id)}
                                            variant="outline"
                                            className="flex-1 bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="size-4 mr-2" />
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>

            {/* Invite User Modal */}
            <InviteUserModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                meetingId={meetingId}
                onSuccess={() => {
                    // Optionally refresh meeting details to show new invitations
                    fetchMeetingDetails();
                }}
            />
        </div>
    );
}

