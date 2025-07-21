'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
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
import { useParams } from 'next/navigation';
import { LoaderCircleIcon } from 'lucide-react';
import { ChangePasswordSchemaType, getChangePasswordSchema } from '../../forms/change-password-schema';
import { resetPassword } from '@/api/user';
import { customToast } from '@/components/common/toastr';
import FooterWithCompanyLogo from '../../component/footerWithCompayLogo';

export default function Page() {
  const router = useRouter();
  const { token } = useParams();

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
      email: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     // try {
  //     //   setVerifyingToken(true);
  //     //   const response = await apiFetch('/api/auth/reset-password-verify', {
  //     //     method: 'POST',
  //     //     headers: { 'Content-Type': 'application/json' },
  //     //     body: JSON.stringify({ token }),
  //     //   });
  //     //   if (response.ok) {
  //     //     setIsValidToken(true);
  //     //   } else {
  //     //     const errorData = await response.json();
  //     //     setError(errorData.message || 'Invalid or expired token.');
  //     //   }
  //     // } catch {
  //     //   setError('Unable to verify the reset token.');
  //     // } finally {
  //     //   setVerifyingToken(false);
  //     // }
  //   };

  //   if (router.query.token) {
  //     verifyToken();
  //   } else {
  //     setError('No reset token provided.');
  //   }
  // }, [router.query.token]);

  async function onSubmit(values: ChangePasswordSchemaType) {
    setIsProcessing(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (!token) {
        customToast("Error", "Token not found", "error");
        return;
      }
      console.log(values.email);


      const response = await resetPassword({ token: token as string, email: values.email, password: values.newPassword });
      console.log(response);
      if (response?.data?.status === false) {
        customToast("Error", response?.data?.error, "error")
        return
      }
      customToast("Success", "Password reset successful. Redirecting to login...", "success");
      setTimeout(() => router.push('/signin'), 3000);
    } catch (err: any) {
      customToast("Error", err.response.data.message, "error")
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between gap-[30px]">
        <div className="pt-[60px] flex justify-center w-full">
          <img src="/images/zaidLLC.png" alt="logo" className=" h-[48px]" />
        </div>
        <div className="w-full flex-1 flex justify-center items-center pb-[10px]">
          <div className="w-[482px] border border-[#e9e9e9] rounded-[16px] bg-white py-[40px] px-[40px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full space-y-4">
                <div className="space-y-1">
                  <h1 className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535]">
                    Set your New Password
                  </h1>
                </div>

                {/* {error && (
                <div className="text-center space-y-6">
                  <Alert variant="destructive">
                    <AlertIcon>
                      <AlertCircle />
                    </AlertIcon>
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                  <Button asChild>
                    <Link href="/signin" className="text-primary">
                      Go back to Login
                    </Link>
                  </Button>
                </div>
              )}

              {successMessage && (
                <Alert>
                  <AlertIcon>
                    <Check />
                  </AlertIcon>
                  <AlertTitle>{successMessage}</AlertTitle>
                </Alert>
              )}

              {verifyingToken && (
                <Alert>
                  <AlertIcon>
                    <LoaderCircleIcon className="size-4 animate-spin" />
                  </AlertIcon>
                  <AlertTitle>Verifing...</AlertTitle>
                </Alert>
              )} */}

                {/* {isValidToken && !successMessage && !verifyingToken && ( */}
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px]/[22px] font-normal text-[#353535]">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email addresss" {...field} className="h-[48px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px]/[22px] font-normal text-[#353535]">
                          New Password
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={passwordVisible ? 'text' : 'password'}
                              placeholder="Enter new password"
                              {...field}
                              className="h-[48px]"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            mode="icon"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                          >
                            {passwordVisible ? (
                              <EyeOff className="text-muted-foreground" />
                            ) : (
                              <img src="/images/icons/eye.svg" alt="eye" className="w-[15px]" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px]/[22px] font-normal text-[#353535]">
                          Confirm New Password
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={passwordConfirmationVisible ? 'text' : 'password'}
                              placeholder="Confirm new password"
                              {...field}
                              className="h-[48px]"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            mode="icon"
                            onClick={() =>
                              setPasswordConfirmationVisible(!passwordConfirmationVisible)
                            }
                            className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                            aria-label={
                              passwordConfirmationVisible
                                ? 'Hide password confirmation'
                                : 'Show password confirmation'
                            }
                          >
                            {passwordConfirmationVisible ? (
                              <EyeOff className="text-muted-foreground" />
                            ) : (
                              <img src="/images/icons/eye.svg" alt="eye" className="w-[15px]" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-[48px] text-[14px]/[20px] font-semibold"
                  >
                    {isProcessing && <LoaderCircleIcon className="size-4 animate-spin" />}
                    Confirm
                  </Button>
                </>
                {/* )} */}
              </form>
            </Form>
          </div>
        </div>
        <FooterWithCompanyLogo />
      </div>
    </>
  );
}
