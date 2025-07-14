'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
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

export default function Page() {
  const router = useRouter();

  return (
    <>
      <div className="absolute w-full h-full overflow-hidden">
        <div className="w-[618px] h-[618px] bg-[#0d978b] top-[379px] left-[769px] opacity-[10%] rounded-full absolute z-[2] blur-[100px]"></div>
        <div className="w-[483px] h-[483px] bg-[#ffa750] top-[660px] left-[264px] opacity-[10%] rounded-full absolute z-[2] blur-[100px]"></div>
      </div>
      <div className="h-full overflow-y-auto">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="mt-[60px] flex flex-col items-center w-full relative z-[3] px-[10px]">
            <img src="/images/logo.png" alt="logo" className="h-[52px]" />
            <div className="sm:w-[482px] w-full border border-[#e9e9e9] rounded-[16px] bg-white pt-[48px] px-[38px] mt-[90px]">
              <div className="mb-0">
                <h1 className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535]">
                  What’s my company’s Projitt domain?
                </h1>
              </div>
              <Input disabled value="https://company.projitt.com" className="h-[48px] mt-[14px]" />
              <p className="text-[14px]/[20px]  text-[#626262] mt-[20px]">
                Check your browser’s address bar when logged in to projitt or ask a colleague. The
                text just before .projitt.com is your company domain
              </p>
              <Button
                className="h-[48px] w-full text-[14px]/[20px] font-semibold mt-[30px]"
                onClick={() => router.push('/input-domain')}
              >
                Thanks, Go Back
              </Button>
              <p className="text-[14px]/[20px]  text-[#626262] mt-[20px] text-center  mb-[46px]">
                New here?{' '}
                <Link href="/signup" className="font-semibold text-[#0D978B]">
                  Create an account
                </Link>
              </p>
            </div>
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
