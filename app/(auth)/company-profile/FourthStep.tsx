'use client';
import { useState } from 'react';
import { ManageSchemaType } from '../forms/manage-schema';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
interface FourthStepProps {
  step: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function FourthStep({ step, setStep }: FourthStepProps) {
  const [childSelections, setChildSelections] = useState<{ [key: string]: string[] }>({});
  const [multipleCountries, setMultipleCountries] = useState(false);
  const [selected, setSelected] = useState([]);
  const onSubmit = async (values: ManageSchemaType) => {
    console.log(values);
    setStep('step5');
  };
  // We'll use a local state for child selections for demo, but in real use, add to your form schema
  const organization = [
    { label: 'IT Manager', value: 'it_manager' },
    {
      label: 'Finance/Payroll Officer',
      value: 'finance_payroll_officer',
    },
    {
      label: 'Hiring Manager',
      value: 'hiring_manager',
    },
    { label: 'Talent Partners', value: 'talent_partners' },
    { label: 'Company Admin / Founder', value: 'company_admin_founder' },
    { label: 'Others (specify)', value: 'others' },
  ];
  return (
    <div className="sm:w-[1000px] w-[100%] border border-[#e9e9e9] rounded-[16px] bg-white py-[60px] px-[48px]">
      <div className="flex sm:flex-row flex-col items-center justify-between">
        <p className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535] sm:text-left text-center">
          Complete your company profile
        </p>
        <p className="text-[16px]/[26px] text-[#353535] sm:mt-0 mt-[10px]">Step 1/4</p>
      </div>
      <div className="w-full h-[3px] bg-[#e9e9e9] md:mt-[32px] mt-[10px]">
        <div className="w-[20%] h-[3px] bg-[#0d978b]"></div>
      </div>
      <div className="sm:w-[486px] w-[100%] mx-auto mt-[44px]">
        <p className="text-[18px]/[30px] text-[#353535]">
          Who else in your organization will need access to Projitt?
        </p>

        <div className="mt-8 flex flex-col gap-[16px] w-[254px] mx-auto">
          {organization.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <Checkbox
                checked={
                  Array.isArray(childSelections.value)
                    ? childSelections.value.includes(option.value)
                    : false
                }
                onCheckedChange={(checked) => {
                  let newValue = Array.isArray(childSelections.value)
                    ? [...childSelections.value]
                    : [];
                  if (checked) {
                    if (!newValue.includes(option.value)) {
                      newValue.push(option.value);
                    }
                  } else {
                    newValue = newValue.filter((v) => v !== option.value);
                  }
                  setChildSelections({
                    ...childSelections,
                    value: newValue,
                  });
                }}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
          <Input
            className={`h-[48px] ${childSelections?.value?.includes('others') ? 'block' : 'invisible'}`}
          />
        </div>

        <div className="px-[10px] flex  gap-[10px] mt-[70px] justify-center">
          <Button
            type="button"
            onClick={() => setStep('step2')}
            className="w-[151px] bg-white text-[#053834] border-[#E9E9E9] border-[1px] h-[48px] hover:border-[#053834]  hover:bg-white"
          >
            Back
          </Button>
          <Button onClick={() => setStep('dateTimePick')} className="w-[151px] h-[48px]">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
