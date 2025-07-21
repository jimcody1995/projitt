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
import FooterWithCompanyLogo from '../component/footerWithCompayLogo';

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
      <div className="w-full h-full flex flex-col justify-between gap-[30px]">
        <div className="pt-[60px] flex justify-center w-full">
          <img src="/images/logo.png" alt="logo" className=" h-[48px]" />
        </div>
        <div className="w-full flex-1 flex justify-center items-center pb-[10px]">
          <div className="w-[544px] border border-[#e9e9e9] rounded-[16px] bg-white py-[63px] px-[40px]">
            <p className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535] text-center">
              Confirm your Email
            </p>
            <p className="text-[18px]/[30px] mt-[14px] text-[#4B4B4B] text-center">
              We’ve sent a confirmation link to{' '}
              <span className="text-[#0D978B]">admin@zaidllc.com</span>.
            </p>
            <p className="text-[18px]/[30px] text-[#4B4B4B] text-center">
              Click the link in that email to verify your account and access your Projitt dashboard.
            </p>
          </div>
        </div>
        <FooterWithCompanyLogo />
      </div>
    </>
  );
}
