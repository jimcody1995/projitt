'use client';
import { useEffect, useState } from 'react';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import DateTimePick from './DateTimePick';

export default function Page() {
  const [step, setStep] = useState('step1');
  useEffect(() => {
    console.log(step);
  }, [step]);
  return (
    <div className="w-full h-full flex flex-col justify-between overflow-y-auto">
      <div className=" flex flex-col flex-1">
        <div className="h-[95px] border-b border-[#e9e9e9] w-full flex items-center justify-center">
          <img src="/images/logo.png" alt="logo" className="h-[40px]" />
        </div>
        <div className="mt-[56px] flex justify-center flex-1 overflow-hidden px-[10px]">
          {step === 'step1' && <FirstStep step={step} setStep={setStep} />}
          {step === 'step2' && <SecondStep step={step} setStep={setStep} />}
          {step === 'step3' && <ThirdStep step={step} setStep={setStep} />}
          {step === 'step4' && <FourthStep step={step} setStep={setStep} />}
          {step === 'dateTimePick' && <DateTimePick step={step} setStep={setStep} />}
        </div>
      </div>
      <div className="px-[48px] pb-[50px] flex sm:flex-row flex-col items-center gap-[10px] justify-between pt-[20px]">
        <div className="flex gap-[16px]">
          <span className="text-[14px]/[22px] underline text-[#a19e9e]">Terms of Service</span>
          <div className="w-[1px] h-[20px] bg-[#a19e9e]"></div>
          <span className="text-[14px]/[22px] underline text-[#a19e9e]">Privacy Policy</span>
        </div>
        <span className="text-[14px]/[22px] text-[#a19e9e]">© 2025 Projitt</span>
      </div>
    </div>
  );
}
