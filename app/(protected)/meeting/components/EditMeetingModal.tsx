"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, FileText, Loader2, Save } from "lucide-react";
import { updateMeeting } from "../../../../api/meeting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditMeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    meeting: any | null;
    onSuccess?: (updatedMeeting: any) => void;
}

export default function EditMeetingModal({ isOpen, onClose, meeting, onSuccess }: EditMeetingModalProps) {
    const [title, setTitle] = useState("");
    const [scheduledAt, setScheduledAt] = useState("");
    const [durationMinutes, setDurationMinutes] = useState(60);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Populate form when meeting changes
    useEffect(() => {
        if (meeting) {
            setTitle(meeting.title || "");

            // Convert ISO datetime to datetime-local format
            if (meeting.scheduled_at) {
                const date = new Date(meeting.scheduled_at);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                setScheduledAt(`${year}-${month}-${day}T${hours}:${minutes}`);
            }

            setDurationMinutes(meeting.duration_minutes || 60);
        }
    }, [meeting]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            if (!meeting?.id) {
                throw new Error("Meeting ID is required");
            }

            // Validate inputs
            if (!title.trim()) {
                throw new Error("Meeting title is required");
            }
            if (!scheduledAt) {
                throw new Error("Scheduled date and time is required");
            }
            if (durationMinutes < 1) {
                throw new Error("Duration must be at least 1 minute");
            }

            // Format the date to ISO 8601 format (backend expects this)
            const formattedDate = new Date(scheduledAt).toISOString();

            // Only send changed fields (partial update)
            const updateData: any = {};

            if (title.trim() !== meeting.title) {
                updateData.title = title.trim();
            }

            if (formattedDate !== meeting.scheduled_at) {
                updateData.scheduled_at = formattedDate;
            }

            if (durationMinutes !== meeting.duration_minutes) {
                updateData.duration_minutes = durationMinutes;
            }

            // Check if anything changed
            if (Object.keys(updateData).length === 0) {
                setSuccessMessage("No changes to save");
                setTimeout(() => {
                    onClose();
                    setSuccessMessage(null);
                }, 1500);
                return;
            }

            const response = await updateMeeting(meeting.id, updateData);

            console.log('Meeting updated successfully:', response);
            setSuccessMessage(`Meeting "${response.title}" updated successfully!`);

            // Call onSuccess callback if provided
            if (onSuccess) {
                onSuccess(response);
            }

            // Auto-close after 1.5 seconds
            setTimeout(() => {
                onClose();
                setSuccessMessage(null);
            }, 1500);

        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Failed to update meeting';
            setError(errorMessage);
            console.error('Error updating meeting:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setError(null);
            setSuccessMessage(null);
            onClose();
        }
    };

    if (!isOpen || !meeting) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative bg-[#053834] rounded-[16px] w-[90vw] max-w-[600px] flex flex-col border border-[#8f8f8f]/30">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#8f8f8f]/30">
                    <div className="flex items-center gap-3">
                        <Calendar className="text-white size-6" />
                        <h2 className="text-white text-2xl font-semibold">Edit Meeting</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="p-2 rounded-lg hover:bg-[#086159] transition-colors disabled:opacity-50"
                    >
                        <X className="text-white size-5" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                            <p className="text-green-400 text-sm">{successMessage}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Meeting ID Info */}
                    <div className="p-3 bg-[#086159]/20 rounded-lg">
                        <p className="text-[#8f8f8f] text-xs">Editing Meeting</p>
                        <p className="text-white text-sm font-medium">ID: {meeting.id} • Join Code: {meeting.join_code}</p>
                    </div>

                    {/* Meeting Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-[#c5c6d0] font-medium flex items-center gap-2">
                            <FileText className="size-4" />
                            Meeting Title
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="e.g., Team Sprint Planning"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={255}
                            required
                            disabled={isLoading}
                            className="bg-[#086159]/30 border-[#8f8f8f]/30 text-white placeholder:text-[#8f8f8f] focus:border-[#0a9f8e]"
                        />
                        <p className="text-xs text-[#8f8f8f]">{title.length}/255 characters</p>
                    </div>

                    {/* Scheduled Date & Time */}
                    <div className="space-y-2">
                        <Label htmlFor="scheduledAt" className="text-[#c5c6d0] font-medium flex items-center gap-2">
                            <Calendar className="size-4" />
                            Scheduled Date & Time
                        </Label>
                        <Input
                            id="scheduledAt"
                            type="datetime-local"
                            value={scheduledAt}
                            onChange={(e) => setScheduledAt(e.target.value)}
                            required
                            disabled={isLoading}
                            className="bg-[#086159]/30 border-[#8f8f8f]/30 text-white focus:border-[#0a9f8e]"
                        />
                        <p className="text-xs text-[#8f8f8f]">Reschedule the meeting start time</p>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                        <Label htmlFor="duration" className="text-[#c5c6d0] font-medium flex items-center gap-2">
                            <Clock className="size-4" />
                            Duration (minutes)
                        </Label>
                        <div className="flex gap-2 items-center">
                            <Input
                                id="duration"
                                type="number"
                                min="1"
                                max="480"
                                value={durationMinutes}
                                onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 1)}
                                required
                                disabled={isLoading}
                                className="bg-[#086159]/30 border-[#8f8f8f]/30 text-white focus:border-[#0a9f8e]"
                            />
                            <div className="flex gap-1">
                                {[15, 30, 45, 60, 90, 120].map((mins) => (
                                    <button
                                        key={mins}
                                        type="button"
                                        onClick={() => setDurationMinutes(mins)}
                                        disabled={isLoading}
                                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${durationMinutes === mins
                                            ? 'bg-[#0a9f8e] text-white'
                                            : 'bg-[#086159]/30 text-[#c5c6d0] hover:bg-[#086159]'
                                            } disabled:opacity-50`}
                                    >
                                        {mins}m
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-[#8f8f8f]">Adjust meeting duration (1-480 minutes)</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={handleClose}
                            disabled={isLoading}
                            variant="outline"
                            className="flex-1 bg-transparent border-[#8f8f8f]/30 text-[#c5c6d0] hover:bg-[#086159]/30"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-[#0a9f8e] text-white hover:bg-[#0a9f8e]/90"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="size-4 animate-spin mr-2" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="size-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

