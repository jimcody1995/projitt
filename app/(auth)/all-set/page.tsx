'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircleIcon } from 'lucide-react';
import { ChangePasswordSchemaType, getChangePasswordSchema } from '../forms/change-password-schema';
import { Label } from '@/components/ui/label';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token') || null;

  const [verifyingToken, setVerifyingToken] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(getChangePasswordSchema()),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const verifyToken = async () => {
      // try {
      //   setVerifyingToken(true);
      //   const response = await apiFetch('/api/auth/reset-password-verify', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ token }),
      //   });
      //   if (response.ok) {
      //     setIsValidToken(true);
      //   } else {
      //     const errorData = await response.json();
      //     setError(errorData.message || 'Invalid or expired token.');
      //   }
      // } catch {
      //   setError('Unable to verify the reset token.');
      // } finally {
      //   setVerifyingToken(false);
      // }
    };

    if (token) {
      verifyToken();
    } else {
      setError('No reset token provided.');
    }
  }, [token]);

  async function onSubmit(values: ChangePasswordSchemaType) {
    setIsProcessing(true);
    setError(null);
    setSuccessMessage(null);

    // try {
    //   const response = await apiFetch('/api/auth/change-password', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ token, newPassword: values.newPassword }),
    //   });

    //   if (response.ok) {
    //     setSuccessMessage('Password reset successful! Redirecting to login...');
    //     setTimeout(() => router.push('/signin'), 3000);
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || 'Password reset failed.');
    //   }
    // } catch {
    //   setError('An error occurred while resetting the password.');
    // } finally {
    //   setIsProcessing(false);
    // }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between overflow-y-auto">
        <div className=" flex flex-col flex-1">
          <div className="h-[95px] border-b border-[#e9e9e9] w-full flex items-center justify-center">
            <img src="/images/logo.png" alt="logo" className="h-[40px]" />
          </div>
          <div className="w-full h-full flex justify-center items-center px-[10px]">
            <div className="w-[622px] border border-[#e9e9e9] rounded-[16px] bg-white py-[63px] px-[40px] flex flex-col items-center">
              <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                <div className="absolute w-[100px] h-[100px] rounded-full bg-[#0D978B33] ripple"></div>
                <div className="absolute w-[70px] h-[70px] rounded-full bg-[#0D978B] opacity-[20%] ripple delay-300"></div>
                <div className="relative z-10 flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#0D978B] text-white">
                  <svg
                    className="w-[30px] h-[30px]"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535] text-center mt-[13px]">
                You’re All Set!
              </p>
              <p className="text-[18px]/[30px] mt-[19px] text-[#4B4B4B] text-center">
                Your Projitt workspace is now ready based on your selections.
              </p>
              <p className="text-[18px]/[30px] text-[#4B4B4B] text-center">
                You can start adding employees, configuring workflows, and managing your HR
                operations with ease.
              </p>
              <div className="flex justify-center">
                <Button className="w-[284px] h-[48px] mt-[24px] font-semibold text-[16px]/[24px] mt-[36px]">
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-[48px] pb-[50px] flex sm:flex-row flex-col items-center gap-[10px] justify-between pt-[20px]">
          <div className="flex gap-[16px]">
            <span className="text-[14px]/[22px] underline text-[#a19e9e]">Terms of Service</span>
            <div className="w-[1px] h-[20px] bg-[#a19e9e]"></div>
            <span className="text-[14px]/[22px] underline text-[#a19e9e]">Privacy Policy</span>
          </div>
          <span className="text-[14px]/[22px] text-[#a19e9e]">© 2025 Projitt</span>
        </div>
      </div>
    </>
  );
}
