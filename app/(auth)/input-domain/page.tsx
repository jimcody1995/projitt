'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { getDomainSchema, DomainSchemaType } from '@/app/(auth)/forms/domain-schema';
import { useRouter } from 'next/navigation';

export default function InputDomain() {
  const router = useRouter();
  const form = useForm<DomainSchemaType>({
    resolver: zodResolver(getDomainSchema()),
    defaultValues: {
      domain: '',
    },
  });

  function onSubmit(values: DomainSchemaType) {
    router.push(`/signin?domain=${values.domain}`);
  }

  return (
    <>

      <div className="absolute w-full h-full overflow-hidden">
        <div className="w-[618px] h-[618px] bg-[#0d978b] top-[379px] left-[769px] opacity-[10%] rounded-full absolute z-[2] blur-[100px]"></div>
        <div className="w-[483px] h-[483px] bg-[#ffa750] top-[660px] left-[264px] opacity-[10%] rounded-full absolute z-[2] blur-[100px]"></div>
      </div>
      <div className='h-full overflow-y-auto'>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="mt-[60px] flex flex-col items-center w-full relative z-[3] px-[10px]">
            <img src="/images/logo.png" alt="logo" className="h-[52px]" />
            <div className="sm:w-[482px] w-full border border-[#e9e9e9] rounded-[16px] bg-white pt-[48px] px-[38px] mt-[90px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full space-y-5">
                  <p className="font-semibold text-[22px]/[30px] text-[#353535]">
                    Enter your Projitt Domain to login
                  </p>

                  <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Company Domain" {...field} className="h-[48px] pl-[10px]" />
                            <span className="absolute top-[50%] right-[16px] -translate-y-[50%] text-[14px]/[20px] text-[#353535]">.projitt.com</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p
                    className="text-[14px]/[20px] font-[500] text-[#626262] mt-[12px] text-right cursor-pointer"
                    onClick={() => router.push('/company-domain')}
                  >
                    What’s my domain?
                  </p>
                  <Button type="submit" className="mt-[24px] w-full h-[48px]">
                    <span className="text-[14px] text-white font-semibold">Continue</span>
                  </Button>
                  <p className="text-[14px]/[20px]  text-[#626262] mt-[20px] text-center mb-[46px]">
                    New here?{' '}
                    <Link href="/signup" className="font-semibold text-[#0D978B]">
                      Create an account
                    </Link>
                  </p>
                </form>
              </Form>
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
