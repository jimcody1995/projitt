'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { any, z } from 'zod';
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
import { LoaderCircleIcon } from 'lucide-react';
import { forgotPasssword } from '@/api/user';
import { customToast } from '@/components/common/toastr';

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await form.trigger();
    if (!result) return;
    try {
      const values = form.getValues();
      setIsProcessing(true);
      const response = await forgotPasssword({ email: values.email });
      if (response?.data?.status === false) {
        customToast("Error", response?.data?.error, "error")
        return
      }
      setEmail(values.email)
      setChecking(true)

      form.reset();
    } catch (err: any) {
      customToast("Error", err.response.data.message, "error")
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <>
      <div className="w-full h-full flex flex-col justify-between gap-[30px]">
        <div className="pt-[60px] flex justify-center w-full">
          <img src="/images/zaidLLC.png" alt="logo" className=" h-[48px]" />
        </div>
        <div className="w-full flex-1 flex justify-center items-center pb-[10px]">
          <div className="w-[482px] border border-[#e9e9e9] rounded-[16px] bg-white py-[40px] px-[40px]">
            {!checking ? (
              <Suspense>
                <Form {...form}>
                  <form onSubmit={handleSubmit} className="block w-full space-y-5">
                    <div className="space-y-1 pb-3">
                      <h1 className="text-[22px]/[30px] font-semibold tracking-tight">
                        Reset Password
                      </h1>
                      <p className="text-[14px]/[26px] text-[#787878]">
                        Enter your account’s email address and we’ll send you a secure link to reset
                        your password.
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive" onClose={() => setError(null)}>
                        <AlertIcon>
                          <AlertCircle />
                        </AlertIcon>
                        <AlertTitle>{error}</AlertTitle>
                      </Alert>
                    )}

                    {success && (
                      <Alert onClose={() => setSuccess(null)}>
                        <AlertIcon>
                          <Check />
                        </AlertIcon>
                        <AlertTitle>{success}</AlertTitle>
                      </Alert>
                    )}

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[14px]/[22px] text-[#353535]">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              disabled={!!success || isProcessing}
                              className="h-[48px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={!!success || isProcessing}
                      className="w-full h-[48px] text-[14px]/[20px] font-semibold"
                    >
                      {isProcessing ? <LoaderCircleIcon className="animate-spin" /> : null}
                      Continue
                    </Button>

                    <div className="flex justify-center">
                      <span className="text-[14px]/[22px] text-[#626262] font-semibold text-center">
                        <Link href="/signin">Back</Link>
                      </span>
                    </div>
                  </form>
                </Form>
              </Suspense>
            ) : (
              <div className="flex justify-center flex-col items-center gap-[18px]">
                <img
                  src="/images/icons/streamline-stickies-color_mail.svg"
                  alt="mail"
                  className="w-[56px]"
                />
                <div className="flex flex-col items-center gap-[8px]">
                  <h1 className="text-[22px]/[30px] font-semibold text-[#353535]">
                    Check your Email
                  </h1>
                  <p className="text-[18px]/[30px] text-[#4b4b4b] text-center">
                    We’ve sent you a secure link to reset your password at{' '}
                    <span className="text-[#0d978b]">{email}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center md:mb-[-25px] mb-0">
            <img src="/images/poweredBy.png" alt="logo" className="h-[28px]" />
          </div>
          <div className=" w-full pb-[50px] pl-[80px] pr-[80px] flex md:flex-row flex-col items-center justify-between gap-[10px] md:mt-0 mt-[10px]">
            <div className="flex gap-[16px]">
              <span className="text-[14px]/[22px] underline text-[#a19e9e]">Terms of Service</span>
              <div className="w-[1px] h-[20px] bg-[#a19e9e]"></div>
              <span className="text-[14px]/[22px] underline text-[#a19e9e]">Privacy Policy</span>
            </div>

            <span className="text-[14px]/[22px] text-[#a19e9e]">© 2025 Projitt</span>
          </div>
        </div>
      </div>
    </>
  );
}
