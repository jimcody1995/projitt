'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PinField from 'react-pin-field';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [sentStatus, setSentStatus] = React.useState(false);
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col justify-between gap-[30px]">
      {/* Logo Section */}
      <div className="pt-[60px] flex justify-center w-full">
        <img
          src="/images/zaidLLC.png"
          alt="logo"
          className="h-[32px]"
          id="login-page-logo"
          data-testid="login-page-logo"
        />
      </div>

      {/* Login Form Container */}
      <div className="w-full flex-1 flex justify-center items-center pb-[10px]">
        {!sentStatus && <div
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
          <p className="text-[14px]/[20px] text-[#626262] mt-[4px]">
            Create an account or sign in to continue your application
          </p>
          <div className="mt-[29px]">
            <Label className="text-[14px]/[22px] text-[#353535]" htmlFor="email-input">
              Email Address
            </Label>
            <Input
              id="email-input"
              data-testid="email-input"
              placeholder="Enter email address"
              className="h-[48px] mt-[12px]"
              type="email"
              autoComplete="email"
            />
          </div>
          <Button className="w-full h-[48px] mt-[24px]" onClick={() => setSentStatus(true)}>
            Continue with email
          </Button>
          <p className="text-[14px]/[20px] text-[#787878] mt-[25px]">
            By clicking continue I agree with Projitt Terms of Service and Privacy Policy
          </p>
        </div>}
        {sentStatus && (
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
              Welcome Alice,
            </h1>
            <p className="text-[14px]/[20px] text-[#626262] mt-[4px]">
              Enter the 6-digit code sent to alicefernadez@email.com to continue your application
            </p>
            <div className="flex justify-between">
              <PinField
                length={6}
                onComplete={(code) => console.log('Entered Code:', code)}
                className="mt-[32px] border border-[#bcbcbc] rounded-[10px] sm:w-[56px] w-full h-[56px] text-center text-xl mx-1 focus:outline-none focus:ring-[3px] focus:ring-[#0D978B33]"
                id="signup-verify-pinfield"
                data-testid="signup-verify-pinfield"
              />
            </div>
            <p className="mt-[18px]">
              Didn’t receive your code?{' '}
              <span className="text-[#0D978B] cursor-pointer">Resend Code</span>
            </p>
            <Button className="w-full h-[48px] mt-[42px] text-[14px]/[20px]" onClick={() => router.push('/applicant/recruitment/apply')}>
              Continue with email
            </Button>
            <Button
              variant="default"
              className="w-full h-[48px] mt-[10px] text-[14px]/[20px] text-[#0D978B]"
            >
              Change email
            </Button>
          </div>
        )}
      </div>

      <div
        className="w-full flex justify-center "
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
