import axios from "axios";

// ============================================
// MODULE 1: MEETING MANAGEMENT
// ============================================

/**
 * List all meetings created by authenticated user
 * @param params - Optional pagination and sorting parameters
 */
export const listMeetings = async (params?: {
    per_page?: number;
    sort_by?: 'scheduled_at' | 'created_at' | 'title' | 'status';
    sort_dir?: 'asc' | 'desc';
}): Promise<any> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings`, { params });
    return response.data;
};

/**
 * Create a new meeting
 * @param data - Meeting details (title, scheduled_at, duration_minutes)
 */
export const createMeeting = async (data: {
    title: string;
    scheduled_at: string;
    duration_minutes: number;
}): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings`, data);
    return response.data;
};

/**
 * Get specific meeting details
 * @param meetingId - Meeting ID
 */
export const showMeeting = async (meetingId: string | number): Promise<any> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}`);
    return response.data;
};

/**
 * Update meeting details
 * @param meetingId - Meeting ID
 * @param data - Fields to update (title, scheduled_at, duration_minutes)
 */
export const updateMeeting = async (meetingId: string | number, data: {
    title?: string;
    scheduled_at?: string;
    duration_minutes?: number;
}): Promise<any> => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}`, data);
    return response.data;
};

/**
 * Start a meeting session
 * @param meetingId - Meeting ID
 */
export const startMeeting = async (meetingId: string | number): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/start`);
    return response.data;
};

/**
 * End a meeting session
 * @param meetingId - Meeting ID
 */
export const endMeeting = async (meetingId: string | number): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/end`);
    return response.data;
};

/**
 * Generate WebRTC token for video call authentication
 */
export const generateWebRTCToken = async (): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/video/token`);
    return response.data;
};

// ============================================
// MODULE 2: INVITATION SYSTEM
// ============================================

/**
 * Invite a user to the meeting
 * @param meetingId - Meeting ID
 * @param data - Invitee details (either invitee_user_id or invitee_email)
 */
export const inviteUser = async (meetingId: string | number, data: {
    invitee_user_id?: number;
    invitee_email?: string;
}): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/invite`, data);
    return response.data;
};

/**
 * Accept a meeting invitation
 * @param invitationId - Invitation ID
 */
export const acceptInvitation = async (invitationId: string | number): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/invitations/${invitationId}/accept`);
    return response.data;
};

/**
 * Reject a meeting invitation
 * @param invitationId - Invitation ID
 */
export const rejectInvitation = async (invitationId: string | number): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/invitations/${invitationId}/reject`);
    return response.data;
};

/**
 * Propose a new time for the meeting
 * @param invitationId - Invitation ID
 * @param data - Proposed time
 */
export const proposeNewTime = async (invitationId: string | number, data: {
    proposed_time: string;
}): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/invitations/${invitationId}/propose`, data);
    return response.data;
};

// ============================================
// MODULE 3: RECORDING MANAGEMENT
// ============================================

/**
 * List all recordings for a meeting
 * @param meetingId - Meeting ID
 * @param params - Optional pagination and sorting parameters
 */
export const listRecordings = async (meetingId: string | number, params?: {
    per_page?: number;
    sort_by?: 'created_at' | 'started_at' | 'ended_at';
    sort_dir?: 'asc' | 'desc';
}): Promise<any> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/recordings`, { params });
    return response.data;
};

/**
 * Start recording a meeting
 * @param meetingId - Meeting ID
 */
export const startRecording = async (meetingId: string | number): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/recordings/start`);
    return response.data;
};

/**
 * End recording a meeting
 * @param meetingId - Meeting ID
 */
export const endRecording = async (meetingId: string | number): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/recordings/end`);
    return response.data;
};

/**
 * Download a recording
 * @param recordingId - Recording ID
 */
export const downloadRecording = async (recordingId: string | number): Promise<any> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/recordings/${recordingId}/download`, {
        responseType: 'blob',
    });
    return response.data;
};

// ============================================
// MODULE 4: AI NOTES GENERATION
// ============================================

/**
 * Generate AI-powered meeting notes
 * @param meetingId - Meeting ID
 */
export const generateAINotes = async (meetingId: string | number): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/notes`);
    return response.data;
};

// ============================================
// MODULE 5: PRESENCE TRACKING
// ============================================

/**
 * Join meeting presence (mark as active participant)
 * @param meetingId - Meeting ID
 */
export const joinMeetingPresence = async (meetingId: string | number): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/presence/join`);
    return response.data;
};

/**
 * Leave meeting presence (mark as left)
 * @param meetingId - Meeting ID
 */
export const leaveMeetingPresence = async (meetingId: string | number): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/presence/leave`);
    return response.data;
};

/**
 * List all participants in a meeting
 * @param meetingId - Meeting ID
 * @param params - Optional filter for active participants only
 */
export const listParticipants = async (meetingId: string | number, params?: {
    active?: boolean;
}): Promise<any> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/participants`, { params });
    return response.data;
};

// ============================================
// MODULE 6: RTC SIGNALING (WEBRTC)
// ============================================

/**
 * Send WebRTC signal to another participant
 * @param meetingId - Meeting ID
 * @param data - Signal data (to_user_id, type, payload)
 */
export const sendRTCSignal = async (meetingId: string | number, data: {
    to_user_id: number;
    type: 'offer' | 'answer' | 'candidate';
    payload: any;
}): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/rtc/send`, data);
    return response.data;
};

/**
 * Check signal inbox for new WebRTC signals
 * @param meetingId - Meeting ID
 * @param params - Optional since_id for polling
 */
export const checkSignalInbox = async (meetingId: string | number, params?: {
    since_id?: number;
}): Promise<any> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/rtc/inbox`, { params });
    return response.data;
};

/**
 * Acknowledge received signals
 * @param meetingId - Meeting ID
 * @param data - Array of signal IDs to acknowledge
 */
export const acknowledgeSignals = async (meetingId: string | number, data: {
    ids: number[];
}): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/meetings/${meetingId}/rtc/ack`, data);
    return response.data;
};

