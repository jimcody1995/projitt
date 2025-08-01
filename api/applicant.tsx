// This module provides functions to send and verify OTP (One-Time Password) 
// for applicants using API endpoints. It uses Axios to perform HTTP POST requests.

import axios from "axios";

/**
 * Sends an OTP to the applicant using the backend API.
 * 
 * @param data - Object containing the applicant's information (e.g., email or phone number).
 * @returns The response data from the API.
 */
export const sendApplicantOTP = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/user/send-applicant-otp`, data);
    return response.data;
}

/**
 * Verifies the OTP entered by the applicant using the backend API.
 * 
 * @param data - Object containing the OTP and any other necessary applicant information.
 * @returns The response data from the API.
 */
export const verifyApplicantOTP = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/user/verify-applicant-otp`, data);
    return response.data;
}
