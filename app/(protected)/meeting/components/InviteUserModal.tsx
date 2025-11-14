"use client";

import { useState } from "react";
import { X, UserPlus, Mail, User, Loader2, CheckCircle } from "lucide-react";
import { inviteUser } from "../../../../api/meeting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InviteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    meetingId: number | null;
    onSuccess?: () => void;
}

type InviteMethod = 'user_id' | 'email';

export default function InviteUserModal({
    isOpen,
    onClose,
    meetingId,
    onSuccess
}: InviteUserModalProps) {
    const [inviteMethod, setInviteMethod] = useState<InviteMethod>('user_id');
    const [inviteeUserId, setInviteeUserId] = useState("");
    const [inviteeEmail, setInviteeEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!meetingId) return;

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Validate inputs
            if (inviteMethod === 'user_id') {
                if (!inviteeUserId.trim()) {
                    throw new Error("User ID is required");
                }
                const userId = parseInt(inviteeUserId.trim());
                if (isNaN(userId) || userId < 1) {
                    throw new Error("Please enter a valid user ID");
                }
            } else {
                if (!inviteeEmail.trim()) {
                    throw new Error("Email address is required");
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(inviteeEmail.trim())) {
                    throw new Error("Please enter a valid email address");
                }
            }

            // Prepare request data
            const requestData = inviteMethod === 'user_id'
                ? { invitee_user_id: parseInt(inviteeUserId.trim()) }
                : { invitee_email: inviteeEmail.trim() };

            const response = await inviteUser(meetingId, requestData);
            console.log('Invitation sent successfully:', response);

            setSuccessMessage(
                inviteMethod === 'user_id'
                    ? `Invitation sent to user #${inviteeUserId}`
                    : `Invitation sent to ${inviteeEmail}`
            );

            // Reset form
            setInviteeUserId("");
            setInviteeEmail("");

            // Call success callback
            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                    handleClose();
                }, 1500);
            } else {
                setTimeout(() => {
                    handleClose();
                }, 1500);
            }

        } catch (err: any) {
            const errorMessage = err?.response?.data?.message
                || err?.message
                || 'Failed to send invitation';
            setError(errorMessage);
            console.error('Error sending invitation:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setInviteeUserId("");
        setInviteeEmail("");
        setError(null);
        setSuccessMessage(null);
        setInviteMethod('user_id');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative bg-[#053834] rounded-[16px] w-[90vw] max-w-[500px] flex flex-col border border-[#8f8f8f]/30">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#8f8f8f]/30">
                    <div className="flex items-center gap-3">
                        <UserPlus className="text-white size-6" />
                        <h2 className="text-white text-2xl font-semibold">Invite User</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-lg hover:bg-[#086159] transition-colors"
                    >
                        <X className="text-white size-5" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Invite Method Selection */}
                    <div className="space-y-3">
                        <Label className="text-white text-sm font-medium">Invite Method</Label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setInviteMethod('user_id');
                                    setInviteeEmail("");
                                    setError(null);
                                }}
                                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                                    inviteMethod === 'user_id'
                                        ? 'border-[#0a9f8e] bg-[#0a9f8e]/20'
                                        : 'border-[#8f8f8f]/30 bg-[#086159]/20 hover:bg-[#086159]/30'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <User className={`size-5 ${inviteMethod === 'user_id' ? 'text-[#0a9f8e]' : 'text-[#c5c6d0]'}`} />
                                    <div className="text-left">
                                        <p className={`font-medium ${inviteMethod === 'user_id' ? 'text-white' : 'text-[#c5c6d0]'}`}>
                                            Registered User
                                        </p>
                                        <p className={`text-xs ${inviteMethod === 'user_id' ? 'text-[#0a9f8e]' : 'text-[#8f8f8f]'}`}>
                                            By User ID
                                        </p>
                                    </div>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setInviteMethod('email');
                                    setInviteeUserId("");
                                    setError(null);
                                }}
                                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                                    inviteMethod === 'email'
                                        ? 'border-[#0a9f8e] bg-[#0a9f8e]/20'
                                        : 'border-[#8f8f8f]/30 bg-[#086159]/20 hover:bg-[#086159]/30'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Mail className={`size-5 ${inviteMethod === 'email' ? 'text-[#0a9f8e]' : 'text-[#c5c6d0]'}`} />
                                    <div className="text-left">
                                        <p className={`font-medium ${inviteMethod === 'email' ? 'text-white' : 'text-[#c5c6d0]'}`}>
                                            Email Invitation
                                        </p>
                                        <p className={`text-xs ${inviteMethod === 'email' ? 'text-[#0a9f8e]' : 'text-[#8f8f8f]'}`}>
                                            External Guest
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Input Field */}
                    <div className="space-y-2">
                        <Label className="text-white text-sm font-medium">
                            {inviteMethod === 'user_id' ? 'User ID' : 'Email Address'}
                        </Label>
                        {inviteMethod === 'user_id' ? (
                            <Input
                                type="number"
                                value={inviteeUserId}
                                onChange={(e) => {
                                    setInviteeUserId(e.target.value);
                                    setError(null);
                                }}
                                placeholder="Enter user ID (e.g., 25)"
                                className="bg-[#086159]/30 border-[#8f8f8f]/30 text-white placeholder:text-[#8f8f8f] focus:border-[#0a9f8e]"
                                disabled={isLoading}
                                min="1"
                            />
                        ) : (
                            <Input
                                type="email"
                                value={inviteeEmail}
                                onChange={(e) => {
                                    setInviteeEmail(e.target.value);
                                    setError(null);
                                }}
                                placeholder="Enter email address (e.g., user@example.com)"
                                className="bg-[#086159]/30 border-[#8f8f8f]/30 text-white placeholder:text-[#8f8f8f] focus:border-[#0a9f8e]"
                                disabled={isLoading}
                            />
                        )}
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
                            <CheckCircle className="text-green-400 size-5" />
                            <p className="text-green-400 text-sm">{successMessage}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={handleClose}
                            variant="outline"
                            className="flex-1 bg-transparent border-[#8f8f8f]/30 text-[#c5c6d0] hover:bg-[#086159]/30"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-[#0a9f8e] text-white hover:bg-[#0a9f8e]/90 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="size-4 mr-2" />
                                    Send Invitation
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

