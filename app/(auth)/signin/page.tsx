'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { getSigninSchema, SigninSchemaType } from '../forms/signin-schema';
import { toast } from 'sonner';
import { customToast } from '@/components/common/toastr';

export default function Page() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(getSigninSchema()),
    defaultValues: {
      email: 'demo@kt.com',
      password: 'demo123',
      rememberMe: false,
    },
  });

  async function onSubmit(values: SigninSchemaType) {
    // setIsProcessing(true);
    setError(null);
    customToast('Invalid credentials', 'Check your email and password', 'error');
    // try {
    //   const response = await signIn('credentials', {
    //     redirect: false,
    //     email: values.email,
    //     password: values.password,
    //     rememberMe: values.rememberMe,
    //   });

    //   if (response?.error) {
    //     const errorData = JSON.parse(response.error);
    //     setError(errorData.message);
    //     toast.error(errorData.message);
    //   } else {
    //     router.push('/');
    //   }
    // } catch (err) {
    //   setError(
    //     err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
    //   );
    // } finally {
    //   setIsProcessing(false);
    // }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between gap-[30px]">
        <div className="pt-[60px] flex justify-center w-full">
          <img src="/images/zaidLLC.png" alt="logo" className=" h-[48px]" />
        </div>
        <div className="w-full flex-1 flex justify-center items-center pb-[10px]">
          <div className="w-[482px] border border-[#e9e9e9] rounded-[16px] bg-white py-[48px] px-[48px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full space-y-5">
                <div className="pb-[24px] mb-0">
                  <h1 className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535]">
                    Log in to your account
                  </h1>
                </div>

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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center gap-2.5">
                        <FormLabel className="text-[14px]/[22px] font-normal text-[#353535]">
                          Password
                        </FormLabel>
                      </div>
                      <div className="relative">
                        <Input
                          placeholder="Enter password"
                          type={passwordVisible ? 'text' : 'password'} // Toggle input type
                          {...field}
                          className="h-[48px]"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          mode="icon"
                          size="sm"
                          onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <>
                          <Checkbox
                            id="remember-me"
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(!!checked)}
                            className="cursor-pointer"
                          />
                          <label
                            htmlFor="remember-me"
                            className="text-[14px]/[20px] leading-none text-[#626262] cursor-pointer"
                          >
                            Remember me on this device
                          </label>
                        </>
                      )}
                    />
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-[14px]/[20px] font-medium text-[#0d978b] hover:text-[#0d978b]"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="flex flex-col gap-2.5">
                  <Button type="submit" disabled={isProcessing} className="h-[48px]">
                    {isProcessing ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
                    Sign In
                  </Button>
                </div>
              </form>
            </Form>
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
