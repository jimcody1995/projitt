'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import phoneNumber from '@/constants/phoneNumber.json';
import PinField from 'react-pin-field';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { getSignupSchema, SignupSchemaType } from '../forms/signup-schema';
import { getVerifyCodeSchema, VerifyCodeSchemaType } from '../forms/verify-code-schema';

export default function Page() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [checkEmail, setCheckEmail] = useState(true);

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(getSignupSchema()),
    defaultValues: {
      email: '',
      companyName: '',
      firstName: '',
      lastName: '',
      country: 'us',
      phoneNumber: '',
      industry: '',
      companySize: 'small',
      interests: [],
      accept: false,
    },
  });

  const verifyForm = useForm<VerifyCodeSchemaType>({
    resolver: zodResolver(getVerifyCodeSchema()),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (e: SignupSchemaType) => {
    setCheckEmail(true);
    setShowRecaptcha(true);
  };

  const handleCheckEmail = async (e: VerifyCodeSchemaType) => {
    // if (!result) return;
    router.push('/company-profile');
  };

  const handleVerifiedSubmit = async (token: string) => {
    // try {
    //   const values = form.getValues();
    //   setIsProcessing(true);
    //   setError(null);
    //   setShowRecaptcha(false);
    //   const response = await apiFetch('/api/auth/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'x-recaptcha-token': token,
    //     },
    //     body: JSON.stringify(values),
    //   });
    //   if (!response.ok) {
    //     const { message } = await response.json();
    //     setError(message);
    //   } else {
    //     router.push('/');
    //   }
    // } catch (err) {
    //   setError(
    //     err instanceof Error
    //       ? err.message
    //       : 'An unexpected error occurred. Please try again.',
    //   );
    // } finally {
    //   setIsProcessing(false);
    // }
  };

  if (success) {
    return (
      <Alert onClose={() => setSuccess(false)}>
        <AlertIcon>
          <Check />
        </AlertIcon>
        <AlertTitle>
          You have successfully signed up! Please check your email to verify your account and then{' '}
          <Link href="/signin/" className="text-primary hover:text-primary-darker">
            Log in
          </Link>
          .
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#fafafa] relative overflow-y-auto">
      <div className="flex h-full">
        <div className="lg:block hidden flex-1 relative bg-[#0D978B] overflow-hidden pt-[60px] xl:pl-[68px] xl:pr-[146px] pl-[50px] pr-[50px]">
          <img src="/images/white-logo.svg" alt="logo" className="h-[40px]" />
          <p className="text-[28px]/[36px] text-[#fff] mt-[97px] font-semibold md:break-words break-all">
            <span className="opacity-[72%]">Join businesses using Projitt to streamline</span> HR
            operations, automate workflows, and empower growth
          </p>
          <div className="absolute xl:top-[387px] top-[550px] w-[1015px] right-[130px] rounded-[16px] bg-[#FFFFFF33] overflow-hidden p-[16px]">
            <img src="/images/signup/dashboard.png" alt="logo" className="rounded-[12px] " />
          </div>
        </div>
        {!checkEmail ? (
          <div className="lg:w-[50%] w-full lg:min-w-[737px] md:px-[136px] px-[30px] lg:pt-[130px] pt-[40px] pb-[80px] bg-white">
            <div className="w-full flex justify-center mb-[20px] lg:hidden">
              <img src="/images/logo.png" alt="logo" className="h-[48px]" />
            </div>
            <Suspense>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full space-y-5">
                  <div className="space-y-1.5 pb-3">
                    <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px]/[22px] text-[#353535]">
                          Work Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter work email addresss"
                            {...field}
                            className="h-[48px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[14px]/[22px] text-[#353535]">
                              Company Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter company name"
                                type="text"
                                className="h-[48px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="companySize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[14px]/[22px] text-[#353535]">
                              What is your company size?
                            </FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                indicatorVisibility={false}
                              >
                                <SelectTrigger className="h-[48px]">
                                  <SelectValue placeholder="Select a size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="small">1-10</SelectItem>
                                  <SelectItem value="medium">11-100</SelectItem>
                                  <SelectItem value="large">101-1000</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[14px]/[22px] text-[#353535]">
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                type="text"
                                className="h-[48px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[14px]/[22px] text-[#353535]">
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your last name"
                                type="text"
                                className="h-[48px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px]/[22px] text-[#353535]">Country</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            indicatorVisibility={false}
                          >
                            <SelectTrigger className="h-[48px]">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-[14px]/[22px] text-[#353535] mb-[10px]">Phone Number</p>
                  <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                    <div className="w-[300px]">
                      <Select
                        defaultValue="US"
                        indicatorVisibility={false}
                        onValueChange={(value) => {
                          setCode(phoneNumber.find((item) => item.key === value)?.code || '');
                        }}
                      >
                        <SelectTrigger className="h-[48px]">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          {phoneNumber.map((item) => (
                            <SelectItem key={item.key} value={item.key}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={`+${code}(555)000-0000`}
                                type="text"
                                className="h-[48px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Industry</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            indicatorVisibility={false}
                          >
                            <SelectTrigger className="h-[48px]">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="governemnt">Government</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px]/[22px] text-[#353535]">
                          What Product(s) are you interested in?
                        </FormLabel>
                        <div className="flex flex-col gap-[18px]">
                          {[
                            { label: 'HR Management', value: 'hr_management' },
                            {
                              label: 'Vendor & Contract Management',
                              value: 'vendor_contract_management',
                            },
                            {
                              label: 'Asset & Facility Management',
                              value: 'asset_facility_management',
                            },
                            { label: 'Finance & Operation', value: 'finance_operation' },
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2">
                              <Checkbox
                                checked={
                                  Array.isArray(field.value)
                                    ? field.value.includes(option.value)
                                    : false
                                }
                                onCheckedChange={(checked) => {
                                  let newValue = Array.isArray(field.value) ? [...field.value] : [];
                                  if (checked) {
                                    if (!newValue.includes(option.value)) {
                                      newValue.push(option.value);
                                    }
                                  } else {
                                    newValue = newValue.filter((v) => v !== option.value);
                                  }
                                  field.onChange(newValue);
                                }}
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-2 pt-[40px]">
                    <FormField
                      control={form.control}
                      name="accept"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex  gap-2.5">
                              <Checkbox
                                id="accept"
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(!!checked)}
                              />
                              <label htmlFor="accept" className="text-[14px]/[20px] text-[#626262]">
                                By creating an account, you have read and agree to the Terms of
                                Service and our Privacy Policy
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <Button type="submit" disabled={isProcessing} className="h-[48px]">
                      {isProcessing ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            </Suspense>
          </div>
        ) : (
          <div className="lg:w-[50%] w-full lg:min-w-[737px] md:px-[136px] px-[30px] lg:pt-[130px] pt-[40px] pb-[80px] bg-white flex flex-col justify-center items-center">
            <div className="w-full flex justify-center mb-[20px] lg:hidden">
              <img src="/images/logo.png" alt="logo" className="h-[48px]" />
            </div>
            <div className="sm:w-[560px] w-full sm:px-[48px] px-[20px] h-full flex flex-col justify-center items-center">
              <Form {...verifyForm}>
                <form
                  onSubmit={verifyForm.handleSubmit(handleCheckEmail)}
                  className="block w-full space-y-5"
                >
                  <div className="space-y-1 pb-3">
                    <h1 className="text-[22px]/[30px] font-semibold tracking-tight">
                      Check Your Email
                    </h1>
                    <p className="text-[14px]/[20px] text-[#787878]">
                      Almost there! Enter the 6-digit code sent to your email to confirm
                    </p>
                  </div>
                  <div>
                    <FormField
                      control={verifyForm.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex justify-between">
                              <PinField
                                {...field}
                                length={6}
                                onComplete={(code) => console.log('Entered Code:', code)}
                                className="border border-[#bcbcbc] rounded-[10px] sm:w-[56px] w-full h-[56px] text-center text-xl mx-1 focus:outline-none focus:ring-[3px] focus:ring-[#0D978B33]"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-[14px]/[20px] text-[#787878] mt-[14px]">
                      Didn't receive your code?{' '}
                      <span className="text-[#0D978B] font-medium">Resend Code</span>
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={!!success || isProcessing}
                    className="w-full h-[48px] text-[14px]/[20px] font-semibold"
                  >
                    {isProcessing ? <LoaderCircleIcon className="animate-spin" /> : null}
                    Verify & Continue
                  </Button>

                  <div className="flex justify-center">
                    <span
                      className="text-[14px]/[20px] text-[#0D978B] hover:text-[#086159] text-center cursor-pointer"
                      onClick={() => {
                        setCheckEmail(false);
                      }}
                    >
                      Change email
                    </span>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
