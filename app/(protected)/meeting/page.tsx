"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EllipsisVertical, Mic, MicOff, Settings, Video, VideoOff, Loader2, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import MeetingListModal from "./components/MeetingListModal";
import CreateMeetingModal from "./components/CreateMeetingModal";
import MeetingDetailsModal from "./components/MeetingDetailsModal";
import EditMeetingModal from "./components/EditMeetingModal";

export default function Meeting() {
    const [isMicEnabled, setIsMicEnabled] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [hasMicPermission, setHasMicPermission] = useState(false);
    const [hasVideoPermission, setHasVideoPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [isMeetingListModalOpen, setIsMeetingListModalOpen] = useState(false);
    const [isCreateMeetingModalOpen, setIsCreateMeetingModalOpen] = useState(false);
    const [isMeetingDetailsModalOpen, setIsMeetingDetailsModalOpen] = useState(false);
    const [isEditMeetingModalOpen, setIsEditMeetingModalOpen] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
    const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);
    const [joinMeetingId, setJoinMeetingId] = useState("");
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Handle join button click
    const handleJoinMeeting = async () => {
        if (!joinMeetingId.trim()) {
            alert('Please enter a meeting ID');
            return;
        }

        setIsJoining(true);

        // Navigate to meeting room with the entered meeting ID
        setTimeout(() => {
            router.push(`/meeting/main?meeting_id=${joinMeetingId}`);
        }, 500);
    };

    // Handle settings
    const handleSettings = () => {
        setIsMeetingListModalOpen(true);
    };

    // Handle create new meeting
    const handleCreateMeeting = () => {
        setIsCreateMeetingModalOpen(true);
    };

    // Handle meeting creation success
    const handleMeetingCreated = (meeting: any) => {
        console.log('Meeting created:', meeting);
        // Close create modal and open details modal with the new meeting
        setIsCreateMeetingModalOpen(false);
        setSelectedMeetingId(meeting.id);
        setIsMeetingDetailsModalOpen(true);
    };

    // Handle meeting click from list
    const handleMeetingClick = (meetingId: number) => {
        setSelectedMeetingId(meetingId);
        setIsMeetingListModalOpen(false);
        setIsMeetingDetailsModalOpen(true);
    };

    // Handle close details modal
    const handleCloseDetailsModal = () => {
        setIsMeetingDetailsModalOpen(false);
        setSelectedMeetingId(null);
        setSelectedMeeting(null);
    };

    // Handle edit meeting
    const handleEditMeeting = (meeting: any) => {
        setSelectedMeeting(meeting);
        setIsMeetingDetailsModalOpen(false);
        setIsEditMeetingModalOpen(true);
    };

    // Handle meeting update success
    const handleMeetingUpdated = (updatedMeeting: any) => {
        console.log('Meeting updated:', updatedMeeting);
        // Close edit modal and reopen details modal with updated data
        setIsEditMeetingModalOpen(false);
        setSelectedMeetingId(updatedMeeting.id);
        setIsMeetingDetailsModalOpen(true);
    };

    // Request microphone permission
    const requestMicPermission = async () => {
        try {
            setIsLoading(true);
            // Get both audio and video streams to combine them
            const constraints = {
                audio: true,
                video: hasVideoPermission ? {
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } : false
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setHasMicPermission(true);
            setIsMicEnabled(true);

            // If we already have video permission, update the video element
            if (hasVideoPermission && videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            streamRef.current = stream;
        } catch (error) {
            console.error('Microphone permission denied:', error);
            setHasMicPermission(false);
            setIsMicEnabled(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Request video permission
    const requestVideoPermission = async () => {
        try {
            setIsLoading(true);
            // Get both audio and video streams to combine them
            const constraints = {
                audio: hasMicPermission ? true : false,
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setHasVideoPermission(true);
            setIsVideoEnabled(true);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            // If we already have a stream with audio, merge the new video track
            if (streamRef.current && streamRef.current.getAudioTracks().length > 0) {
                const videoTrack = stream.getVideoTracks()[0];
                if (videoTrack) {
                    streamRef.current.addTrack(videoTrack);
                    console.log("Added video track to existing audio stream");
                }
            } else {
                streamRef.current = stream;
                console.log("Set new stream as main stream");
            }
        } catch (error) {
            console.error('Camera permission denied:', error);
            setHasVideoPermission(false);
            setIsVideoEnabled(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle microphone
    const toggleMic = async () => {
        if (!hasMicPermission) {
            await requestMicPermission();
        } else {
            const newMicState = !isMicEnabled;
            setIsMicEnabled(newMicState);
            if (streamRef.current) {
                const audioTrack = streamRef.current.getAudioTracks()[0];
                if (audioTrack) {
                    audioTrack.enabled = newMicState;
                }
            }
        }
    };

    // Toggle video
    const toggleVideo = async () => {
        if (!hasVideoPermission) {
            console.log("No video permission, requesting...");
            await requestVideoPermission();
        } else {
            const newVideoState = !isVideoEnabled;
            console.log("Toggling video to:", newVideoState);
            setIsVideoEnabled(newVideoState);

            if (streamRef.current) {
                console.log("streamRef.current", streamRef.current);
                const videoTrack = streamRef.current.getVideoTracks()[0];
                console.log("videoTrack", videoTrack);

                if (videoTrack) {
                    if (newVideoState) {
                        // Turning on video - enable the track
                        console.log("Enabling existing video track");
                        videoTrack.enabled = true;
                        if (videoRef.current) {
                            videoRef.current.srcObject = streamRef.current;
                        }
                    } else {
                        // Turning off video - stop the video track completely
                        console.log("Stopping and removing video track");
                        videoTrack.stop();
                        if (videoRef.current) {
                            videoRef.current.srcObject = null;
                        }

                        // Remove the stopped track from the stream
                        streamRef.current.removeTrack(videoTrack);

                        // If we still have audio, keep the stream, otherwise clear it
                        if (streamRef.current.getAudioTracks().length > 0) {
                            console.log("Keeping audio stream");
                        } else {
                            console.log("Clearing stream (no tracks left)");
                            streamRef.current = null;
                        }
                    }
                } else if (newVideoState) {
                    // No video track but trying to turn on - need to request new video permission
                    console.log("No video track found, requesting new video permission");
                    await requestVideoPermission();
                }
            } else if (newVideoState) {
                // No stream at all but trying to turn on video
                console.log("No stream found, requesting new video permission");
                await requestVideoPermission();
            }
        }
    };

    // Update video element when stream changes
    useEffect(() => {
        if (streamRef.current && videoRef.current && hasVideoPermission && isVideoEnabled) {
            videoRef.current.srcObject = streamRef.current;
        } else if (videoRef.current && (!isVideoEnabled || !hasVideoPermission)) {
            // Clear video when disabled or no permission
            videoRef.current.srcObject = null;
        }
    }, [hasVideoPermission, isVideoEnabled]);

    // Cleanup streams on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="w-full py-[50px] overflow-y-auto bg-[#053834] flex justify-center">
            <div className="w-[480px] flex flex-col items-center" >
                <img src="/images/white-logo.svg" alt="logo" className="h-[32px]" />
                <p className="text-white text-[34px]/[40px] font-semibold mt-[40px]">Get Started</p>
                <p className="text-[16px]/[24px] text-[#c5c6d0] mt-[8px]">Setup your audio and video before joining</p>

                {/* Video/Preview Area */}
                <div className="mt-[40px] relative bg-[#086159] rounded-[20px] w-full h-[340px] flex justify-center items-center overflow-hidden">
                    {/* Permission Controls */}
                    <div className="absolute top-[16px] right-[16px] flex gap-[16px] z-10">
                        {hasMicPermission && (
                            <div onClick={toggleMic} className={`cursor-pointer w-[32px] h-[32px] ${isMicEnabled ? 'bg-white' : 'bg-red-500'} rounded-full flex justify-center items-center`}>
                                {isMicEnabled ? (
                                    <Mic className="text-[#353535] size-[16px]" />
                                ) : (
                                    <MicOff className="text-white size-[16px]" />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Video Display */}
                    {isVideoEnabled && hasVideoPermission ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover rounded-[20px]"
                        />
                    ) : (
                        <div className="w-[88px] h-[88px] bg-[#7e47eb] rounded-full flex justify-center items-center">
                            <span className="text-[34px]/[40px] font-semibold text-white">KA</span>
                        </div>
                    )}

                    {/* Loading Overlay */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-[20px]">
                            <div className="text-white">Requesting permissions...</div>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex justify-between mt-[24px] w-full">
                    <div className="flex gap-[16px]">
                        {/* Microphone Control */}
                        <div className="h-[48px] border border-[#8f8f8f] rounded-[8px] flex">
                            <button
                                onClick={toggleMic}
                                disabled={isLoading}
                                className={`cursor-pointer w-[49px] h-full border-r border-[#8f8f8f] rounded-l-[8px] flex justify-center items-center transition-colors ${isMicEnabled ? 'bg-green-500 bg-opacity-20' : ''
                                    }`}
                            >
                                {isMicEnabled ? (
                                    <Mic className="text-white size-[32px]" />
                                ) : (
                                    <MicOff className="text-white size-[32px]" />
                                )}
                            </button>
                            <div className="w-[41px] h-full flex justify-center items-center">
                                <EllipsisVertical className="text-white size-[24px]" />
                            </div>
                        </div>

                        {/* Video Control */}
                        <div className="h-[48px] border border-[#8f8f8f] rounded-[8px] flex">
                            <button
                                onClick={toggleVideo}
                                disabled={isLoading}
                                className={`cursor-pointer w-[49px] h-full border-r border-[#8f8f8f] rounded-l-[8px] flex justify-center items-center transition-colors ${isVideoEnabled ? 'bg-green-500 bg-opacity-20' : ''
                                    }`}
                            >
                                {isVideoEnabled ? (
                                    <Video className="text-white size-[32px]" />
                                ) : (
                                    <VideoOff className="text-white size-[32px]" />
                                )}
                            </button>
                            <div className="w-[41px] h-full flex justify-center items-center">
                                <EllipsisVertical className="text-white size-[24px]" />
                            </div>
                        </div>

                        <div className="w-[48px] h-[48px] border border-[#8f8f8f] rounded-[8px] flex justify-center items-center">
                            <img src="/images/video/user-hidden.svg" alt="user-hidden" className="size-[32px]" />
                        </div>
                    </div>
                    <div className="cursor-pointer w-[48px] h-[48px] border border-[#8f8f8f] rounded-[8px] flex justify-center items-center"
                        onClick={handleSettings}
                    >
                        <Settings className="text-white size-[32px]" />
                    </div>
                </div>

                {/* Permission Status */}
                {/* <div className="mt-[16px] w-full text-center">
                    {!hasMicPermission && !hasVideoPermission && (
                        <p className="text-[#c5c6d0] text-[14px]">Click Mic or Video to grant permissions</p>
                    )}
                    {hasMicPermission && (
                        <p className="text-green-400 text-[12px]">✓ Microphone permission granted</p>
                    )}
                    {hasVideoPermission && (
                        <p className="text-green-400 text-[12px]">✓ Camera permission granted</p>
                    )}
                </div> */}

                <div className="w-full grid grid-cols-2 gap-[16px]">
                    <Button
                        className="w-full h-[48px] mt-[24px] text-white text-[16px] rounded-[24px] font-medium"
                        onClick={handleCreateMeeting}
                    >
                        Start New Meeting
                    </Button>
                    <div className="flex items-center w-full h-[48px] mt-[24px] grid grid-cols-3 gap-[0px]">
                        <Input
                            className="flex-1 h-[48px] rounded-l-[24px] rounded-r-none border border-[#297ffe] px-[16px] py-[12px] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#297ffe] placeholder:text-[#60646c] col-span-2"
                            placeholder="Enter Meeting ID"
                            value={joinMeetingId}
                            onChange={(e) => setJoinMeetingId(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && joinMeetingId.trim()) {
                                    handleJoinMeeting();
                                }
                            }}
                        />
                        <Button
                            onClick={handleJoinMeeting}
                            disabled={isJoining || !joinMeetingId.trim()}
                            className="text-white h-[48px] text-[16px] font-medium col-span-1 rounded-[24px] rounded-l-none disabled:opacity-50"
                        >
                            {isJoining ? 'Joining...' : 'Join'}
                        </Button>
                    </div>
                </div>
                <div className="mt-[30px] flex items-center justify-start gap-[8px] w-full">
                    <Switch />
                    <p className="text-[14px]/[16px] text-[#ffffff]">Use Projitt AI to take notes</p>
                </div>
            </div>

            {/* Meeting List Modal */}
            <MeetingListModal
                isOpen={isMeetingListModalOpen}
                onClose={() => setIsMeetingListModalOpen(false)}
                onMeetingClick={handleMeetingClick}
            />

            {/* Create Meeting Modal */}
            <CreateMeetingModal
                isOpen={isCreateMeetingModalOpen}
                onClose={() => setIsCreateMeetingModalOpen(false)}
                onSuccess={handleMeetingCreated}
            />

            {/* Meeting Details Modal */}
            <MeetingDetailsModal
                isOpen={isMeetingDetailsModalOpen}
                onClose={handleCloseDetailsModal}
                meetingId={selectedMeetingId}
                onEdit={handleEditMeeting}
                onStart={(meeting) => {
                    console.log('Start meeting:', meeting);
                    // Navigate to meeting room with meeting ID in URL
                    router.push(`/meeting/main?meeting_id=${meeting.id}`);
                }}
            />

            {/* Edit Meeting Modal */}
            <EditMeetingModal
                isOpen={isEditMeetingModalOpen}
                onClose={() => setIsEditMeetingModalOpen(false)}
                meeting={selectedMeeting}
                onSuccess={handleMeetingUpdated}
            />
        </div>
    );
}