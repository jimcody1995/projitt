'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PinField from 'react-pin-field';
import { useRouter } from 'next/navigation';
import { sendApplicantOTP, verifyApplicantOTP } from '@/api/applicant';
import { customToast } from '@/components/common/toastr';

/**
 * SignIn component handles applicant sign-in via email OTP.
 * It manages email input, sending OTP, OTP input, verification,
 * and provides UI feedback and navigation on success or failure.
 */
export default function SignIn() {
  const [sentStatus, setSentStatus] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [code, setCode] = React.useState('');
  const [codeError, setCodeError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  /**
   * Validates the provided email string.
   * @param email - email string to validate
   * @returns error message string if invalid, empty string if valid
   */
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  /**
   * Updates email state and clears email error on input change.
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError('');
  };

  /**
   * Submits email to request OTP.
   * Validates email first, shows errors or success states.
   */
  const handleEmailSubmit = async () => {
    try {
      const error = validateEmail(email);
      if (error) {
        setEmailError(error);
        return;
      }
      setIsSubmitting(true);
      const response = await sendApplicantOTP({ email });
      console.log(response);

      if (response.status) {
        setSentStatus(true);
      }
      setIsSubmitting(false);
    } catch (error: any) {
      customToast('Error', error.response.data.message, 'error');
      setIsSubmitting(false);
    }
  };

  /**
   * Sets OTP code state on full 6-digit entry, clears code error.
   */
  const handleCodeComplete = (enteredCode: string) => {
    setCode(enteredCode);
    setCodeError('');
  };

  /**
   * Submits entered OTP code for verification.
   * Shows errors if incomplete or invalid; redirects on success.
   */
  const handleCodeSubmit = async () => {
    try {
      if (!code || code.length !== 6) {
        setCodeError('Please enter the complete 6-digit code');
        return;
      }
      setIsSubmitting(true);
      const response = await verifyApplicantOTP({ email, otp: code });
      router.push('/applicant/recruitment/apply');
      setIsSubmitting(false);
    } catch (error: any) {
      customToast('Error', error.response.data.message, 'error');
      setIsSubmitting(false);
    }
  };

  /**
   * Resends OTP code to the provided email.
   * Shows success or error toasts accordingly.
   */
  const handleResendCode = async () => {
    try {
      const response = await sendApplicantOTP({ email });
      console.log(response);
      if (response.status) {
        customToast('Success', 'Code resent successfully', 'success');
      }
    } catch (error: any) {
      customToast('Error', error.response.data.message, 'error');
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between gap-[30px]" id="signin-root" data-testid="signin-root">
      {/* Logo Section */}
      <div className="pt-[60px] flex justify-center w-full" id="logo-container" data-testid="logo-container">
        <img
          src="/images/zaidLLC.png"
          alt="logo"
          className="h-[32px]"
          id="login-page-logo"
          data-testid="login-page-logo"
        />
      </div>

      {/* Login Form Container */}
      <div className="w-full flex-1 flex justify-center items-center pb-[10px]" id="form-wrapper" data-testid="form-wrapper">
        {!sentStatus && (
          <div
            className="w-[560px] border border-[#e9e9e9] rounded-[12px] bg-white p-[48px]"
            id="login-form-container"
            data-testid="login-form-container"
          >
            {/* Form Title */}
            <h1
              className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535]"
              id="login-form-title"
              data-testid="login-form-title"
            >
              Ready to take the next step?
            </h1>
            <p className="text-[14px]/[20px] text-[#626262] mt-[4px]" id="login-form-subtitle" data-testid="login-form-subtitle">
              Create an account or sign in to continue your application
            </p>
            <div className="mt-[29px]" id="email-input-container" data-testid="email-input-container">
              <Label className="text-[14px]/[22px] text-[#353535]" htmlFor="email-input" id="email-label" data-testid="email-label">
                Email Address
              </Label>
              <Input
                id="email-input"
                data-testid="email-input"
                placeholder="Enter email address"
                className={`h-[48px] mt-[12px] ${emailError ? 'border-red-500 focus:border-red-500' : ''}`}
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => {
                  const error = validateEmail(email);
                  setEmailError(error);
                }}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2" data-testid="email-error" id="email-error">
                  {emailError}
                </p>
              )}
            </div>
            <Button
              className="w-full h-[48px] mt-[24px]"
              onClick={handleEmailSubmit}
              disabled={isSubmitting}
              id="email-submit-button"
              data-testid="email-submit-button"
            >
              {isSubmitting ? 'Sending...' : 'Continue with email'}
            </Button>
            <p className="text-[14px]/[20px] text-[#787878] mt-[25px]" id="tos-text" data-testid="tos-text">
              By clicking continue I agree with Projitt Terms of Service and Privacy Policy
            </p>
          </div>
        )}
        {sentStatus && (
          <div
            className="w-[560px] border border-[#e9e9e9] rounded-[12px] bg-white p-[48px]"
            id="otp-form-container"
            data-testid="otp-form-container"
          >
            {/* Form Title */}
            <h1
              className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535]"
              id="otp-form-title"
              data-testid="otp-form-title"
            >
              Welcome Alice,
            </h1>
            <p className="text-[14px]/[20px] text-[#626262] mt-[4px]" id="otp-instruction-text" data-testid="otp-instruction-text">
              Enter the 6-digit code sent to {email} to continue your application
            </p>
            <div className="flex justify-between" id="pinfield-container" data-testid="pinfield-container">
              <PinField
                length={6}
                onComplete={handleCodeComplete}
                className={`mt-[32px] border rounded-[10px] sm:w-[56px] w-full h-[56px] text-center text-xl mx-1 focus:outline-none focus:ring-[3px] focus:ring-[#0D978B33] ${
                  codeError ? 'border-red-500' : 'border-[#bcbcbc]'
                }`}
                id="signup-verify-pinfield"
                data-testid="signup-verify-pinfield"
              />
            </div>
            {codeError && (
              <p className="text-red-500 text-sm mt-2" data-testid="code-error" id="code-error">
                {codeError}
              </p>
            )}
            <p className="mt-[18px]" id="resend-code-text" data-testid="resend-code-text">
              Didn't receive your code?{' '}
              <span
                className="text-[#0D978B] cursor-pointer"
                onClick={handleResendCode}
                id="resend-code-link"
                data-testid="resend-code-link"
              >
                Resend Code
              </span>
            </p>
            <Button
              className="w-full h-[48px] mt-[42px] text-[14px]/[20px]"
              onClick={handleCodeSubmit}
              disabled={isSubmitting}
              id="otp-submit-button"
              data-testid="otp-submit-button"
            >
              {isSubmitting ? 'Verifying...' : 'Continue with email'}
            </Button>
            <Button
              variant="ghost"
              className="w-full h-[48px] mt-[10px] text-[14px]/[20px] text-[#0D978B]"
              onClick={() => setSentStatus(false)}
              id="change-email-button"
              data-testid="change-email-button"
            >
              Change email
            </Button>
          </div>
        )}
      </div>

      <div
        className="w-full flex justify-center"
        id="footer-logo-container"
        data-testid="footer-logo-container"
      >
        <img
          src="/images/poweredBy.png"
          alt="logo"
          className="h-[28px]"
          id="footer-logo-image"
          data-testid="footer-logo-image"
        />
      </div>
    </div>
  );
}
