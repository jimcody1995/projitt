'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField } from '@/components/ui/form';
import { getManageSchema } from '../forms/manage-schema';
import { ManageSchemaType } from '../forms/manage-schema';
import { Button } from '@/components/ui/button';

interface SecondStepProps {
  step: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function SecondStep({ step, setStep }: SecondStepProps) {
  const [childSelections, setChildSelections] = useState<{ [key: string]: string[] }>({});

  const form = useForm<ManageSchemaType>({
    resolver: zodResolver(getManageSchema()),
    defaultValues: {
      managementAreas: [],
    },
  });
  const onSubmit = async (values: ManageSchemaType) => {
    console.log(values);
    setStep('step3');
  };
  const options = [
    {
      value: 'hr',
      label: 'HR Management',
      children: [
        { value: 'recruitment', label: 'Recruitment' },
        { value: 'payroll', label: 'Payroll' },
        { value: 'attendance', label: 'Attendance' },
        { value: 'performance', label: 'Performance' },
      ],
    },
    {
      value: 'vendor',
      label: 'Vendor & Contract Management',
      children: [
        { value: 'vendor-onboarding', label: 'Vendor Onboarding' },
        { value: 'contract-renewal', label: 'Contract Renewal' },
        { value: 'compliance', label: 'Compliance' },
      ],
    },
    {
      value: 'asset',
      label: 'Asset & Facility Management',
      children: [
        { value: 'asset-tracking', label: 'Asset Tracking' },
        { value: 'maintenance', label: 'Maintenance' },
        { value: 'facility-booking', label: 'Facility Booking' },
      ],
    },
    {
      value: 'finance',
      label: 'Finance & Operation',
      children: [
        { value: 'expense', label: 'Expense Management' },
        { value: 'budgeting', label: 'Budgeting' },
        { value: 'invoicing', label: 'Invoicing' },
      ],
    },
  ];

  // We'll use a local state for child selections for demo, but in real use, add to your form schema

  return (
    <div className="sm:w-[1000px] w-[100%] border border-[#e9e9e9] rounded-[16px] bg-white py-[60px] px-[48px]">
      <div className="flex sm:flex-row flex-col items-center justify-between">
        <p className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535] sm:text-left text-center">
          Complete your company profile
        </p>
        <p className="text-[16px]/[26px] text-[#353535] sm:mt-0 mt-[10px]">Step 2/4</p>
      </div>
      <div className="w-full h-[3px] bg-[#e9e9e9] md:mt-[32px] mt-[10px]">
        <div className="w-[40%] h-[3px] bg-[#0d978b]"></div>
      </div>
      <div className="sm:w-[486px] w-[100%] mx-auto mt-[44px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <p className="text-[18px]/[30px] text-[#353535] mb-[20px]">
              What do you plan to manage with Projitt?
            </p>
            <div className="ml-[38px]">
              <FormField
                name="managementAreas"
                render={({ field }) => (
                  <div className="flex flex-col gap-4">
                    {options.map((option) => {
                      const checked =
                        Array.isArray(field.value) && field.value.includes(option.value);

                      return (
                        <div key={option.value}>
                          <label className="flex items-center gap-2">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(checked) => {
                                let newValue = Array.isArray(field.value) ? [...field.value] : [];
                                if (checked) {
                                  if (!newValue.includes(option.value)) {
                                    newValue.push(option.value);
                                  }
                                } else {
                                  newValue = newValue.filter((v) => v !== option.value);
                                  // Remove child selections if parent is unchecked
                                  setChildSelections((prev) => {
                                    const updated = { ...prev };
                                    delete updated[option.value];
                                    return updated;
                                  });
                                }
                                field.onChange(newValue);
                              }}
                            />
                            <span className="text-[18px]/[30px] text-[#4B4B4B]">
                              {option.label}
                            </span>
                          </label>
                          {checked && option.children && (
                            <div className="ml-8 mt-2 flex flex-col gap-2">
                              {option.children.map((child) => (
                                <label key={child.value} className="flex items-center gap-2">
                                  <Checkbox
                                    checked={
                                      Array.isArray(childSelections[option.value]) &&
                                      childSelections[option.value].includes(child.value)
                                    }
                                    onCheckedChange={(checked) => {
                                      setChildSelections((prev) => {
                                        const prevArr = prev[option.value] || [];
                                        let newArr = [...prevArr];
                                        if (checked) {
                                          if (!newArr.includes(child.value)) {
                                            newArr.push(child.value);
                                          }
                                        } else {
                                          newArr = newArr.filter((v) => v !== child.value);
                                        }
                                        return {
                                          ...prev,
                                          [option.value]: newArr,
                                        };
                                      });
                                    }}
                                  />
                                  <span className="text-[16px]/[26px] text-[#4B4B4B]">
                                    {child.label}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              />
            </div>
            <div className="px-[10px] flex justify-between gap-[10px] mt-[58px]">
              <Button
                type="button"
                onClick={() => setStep('step1')}
                className="w-full bg-white text-[#053834] border-[#E9E9E9] border-[1px] h-[48px] hover:border-[#053834]  hover:bg-white"
              >
                Back
              </Button>
              <Button type="submit" className="w-full h-[48px]">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
