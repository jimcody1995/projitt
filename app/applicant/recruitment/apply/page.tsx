'use client';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import Stepper from './components/steper';
import { Button } from '@/components/ui/button';
import ContactInfo from './components/contact-info';
import Resume from './components/resume';
import Qualifications from './components/qualifications';
import Questions from './components/questions';
import Review from './components/review';

export default function Apply() {
  const [currentStep, setCurrentStep] = React.useState(1);
  return (
    <div className="flex flex-col h-full">
      <div className="pb-[30px] flex justify-between pl-[84px] pr-[100px] border-b border-[#e9e9e9]">
        <img src="/images/zaidLLC.png" alt="logo" className="h-[32px]" />
        <button className="flex gap-[10px] text-[#0D978B] cursor-pointer text-[14px]/[20px]">
          <p>Go to Dashboard</p>
          <ArrowRight className="size-[20px]" />
        </button>
      </div>
      {currentStep !== 6 && (
        <div className="w-[865px] flex bg-white mx-auto mt-[44px]">
          <div className="w-[321px] border-r border-[#e9e9e9]">
            <div className="pl-[40px] pt-[36px] pb-[21px] border-b border-[#e9e9e9]">
              <p className="text-[18px]/[30px] text-[#353535]">Senior Data Analyst</p>
              <p className="text-[14px]/[22px] text-[#8f8f8f]">
                Big and Small Enterprise Ltd ~ USA
              </p>
            </div>
            <div className="pt-[40px] pl-[40px]">
              <Stepper currentStep={currentStep} />
            </div>
          </div>
          <div className="flex-1 ">
            <div className="pt-[33px] px-[40px] pb-[19px]">
              {currentStep === 1 && <ContactInfo />}
              {currentStep === 2 && <Resume />}
              {currentStep === 3 && <Qualifications />}
              {currentStep === 4 && <Questions />}
              {currentStep === 5 && <Review />}
            </div>
            <div className="px-[40px] pt-[28px] pb-[32px] border-t border-[#e9e9e9] flex gap-[16px]">
              {currentStep !== 1 && (
                <Button
                  variant="outline"
                  className="h-[48px] w-full"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              )}
              {currentStep !== 5 && (
                <Button className="h-[48px] w-full" onClick={() => setCurrentStep(currentStep + 1)}>
                  Save & Continue{' '}
                </Button>
              )}
              {currentStep === 5 && (
                <Button className="h-[48px] w-full" onClick={() => setCurrentStep(currentStep + 1)}>
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {currentStep === 6 && (
        <div className="flex-1">
          <div className="w-full h-full flex justify-center items-center px-[10px]">
            <div
              className="w-[622px] border border-[#e9e9e9] rounded-[16px] bg-white py-[63px] px-[40px] flex flex-col items-center"
              id="reset-success-container"
              data-testid="reset-success-container"
            >
              <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                <div className="absolute w-[100px] h-[100px] rounded-full bg-[#0D978B33] ripple"></div>
                <div className="absolute w-[70px] h-[70px] rounded-full bg-[#0D978B] opacity-[20%] ripple delay-300"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <img
                    src="/images/icons/check-double.svg"
                    alt="check-icon"
                    className="w-[40px] h-[40px]"
                    id="check-success-icon"
                    data-testid="check-success-icon"
                  />
                </div>
              </div>

              <p
                className="text-[22px]/[30px] font-semibold tracking-tight text-[#353535] text-center mt-[13px]"
                id="reset-success-title"
                data-testid="reset-success-title"
              >
                Application Submitted!
              </p>
              <p
                className="text-[18px]/[30px] mt-[19px] text-[#4B4B4B] text-center"
                id="reset-success-subtext1"
                data-testid="reset-success-subtext1"
              >
                Thanks for trusting us with your time and application. Our team is reviewing all candidates carefully, and if you’re a strong fit, you’ll hear from us soon.
              </p>
              <div className="flex justify-center">
                <Button
                  className="w-[284px] h-[48px] font-semibold text-[16px]/[24px] mt-[36px]"
                  id="go-to-dashboard-button"
                  data-testid="go-to-dashboard-button"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-[51px] pb-[20px]">
        <img src="/images/poweredBy.png" alt="logo" className="h-[28px]" />
      </div>
    </div>
  );
}
