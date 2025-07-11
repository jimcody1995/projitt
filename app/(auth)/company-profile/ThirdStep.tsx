'use client';
import { useState } from 'react';
import { ManageSchemaType } from '../forms/manage-schema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { Button } from '@/components/ui/button';

type OptionType = { value: string; label: string };

interface ThirdStepProps {
  step: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function ThirdStep({ step, setStep }: ThirdStepProps) {
  const [childSelections, setChildSelections] = useState<{ [key: string]: string[] }>({});
  const [multipleCountries, setMultipleCountries] = useState(false);
  const [selected, setSelected] = useState<OptionType[]>([]);
  const onSubmit = async (values: ManageSchemaType) => {
    console.log(values);
    setStep('step4');
  };
  // We'll use a local state for child selections for demo, but in real use, add to your form schema

  const options = [
    { value: 'uk', label: 'United Kingdom' },
    { value: 'dubai', label: 'Dubai' },
    { value: 'sweden', label: 'Sweden' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
  ];

  const customStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: '10px',
      borderColor: '#ccc',
      boxShadow: 'none',
      padding: '2px 4px',
      minHeight: '50px',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#444',
      fontSize: '16px',
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#d1eeee',
      borderRadius: '12px',
      padding: '2px 8px',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: '#00796b',
      fontWeight: 500,
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: '#00796b',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#b2dfdb',
        color: '#004d40',
      },
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      padding: '4px',
    }),
  };
  return (
    <div className="sm:w-[1000px] w-[100%] border border-[#e9e9e9] rounded-[16px] bg-white py-[60px] px-[48px]">
      <div className="flex sm:flex-row flex-col items-center justify-between">
        <p className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535] sm:text-left text-center">
          Complete your company profile
        </p>
        <p className="text-[16px]/[26px] text-[#353535] sm:mt-0 mt-[10px]">Step 3/4</p>
      </div>
      <div className="w-full h-[3px] bg-[#e9e9e9] md:mt-[32px] mt-[10px]">
        <div className="w-[60%] h-[3px] bg-[#0d978b]"></div>
      </div>
      <div className="sm:w-[486px] w-[100%] mx-auto mt-[44px]">
        <p className="text-[18px]/[30px] text-[#353535]">
          Do you operate in multiple countries or regions?
        </p>
        <RadioGroup
          className="flex flex-col gap-[16px] mt-[12px]"
          onValueChange={(e) => {
            console.log(e);
            setMultipleCountries(e === 'yes');
          }}
          value={multipleCountries ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes" variant="secondary" className="text-[14px]/[20px]">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no" variant="secondary" className="text-[14px]/[20px]">
              No
            </Label>
          </div>
        </RadioGroup>
        {/* Multi-select using Radix UI Select primitives */}
        {multipleCountries && (
          <div className="mt-8">
            <Label className="text-[16px]/[26px] mb-[12px] block">Select Countries</Label>
            <Select<OptionType, true>
              options={options}
              value={selected}
              onChange={(e) => setSelected(e as OptionType[])}
              isMulti
              placeholder="Choose countries"
              styles={customStyles}
            />
          </div>
        )}

        <div className="px-[10px] flex  gap-[10px] mt-[100px] justify-center">
          <Button
            type="button"
            onClick={() => setStep('step2')}
            className="w-[151px] bg-white text-[#053834] border-[#E9E9E9] border-[1px] h-[48px] hover:border-[#053834]  hover:bg-white"
          >
            Back
          </Button>
          <Button onClick={() => setStep('step4')} className="w-[151px] h-[48px]">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
