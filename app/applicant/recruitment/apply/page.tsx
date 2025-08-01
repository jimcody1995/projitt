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

/**
 * Apply component manages a multi-step job application form process.
 * It controls navigation between steps, validates inputs on each step,
 * and renders the relevant step components.
 * Includes final submission and confirmation UI.
 */
export default function Apply() {
  // Current step state (1-based index)
  const [currentStep, setCurrentStep] = React.useState(1);

  // Aggregated data from each step
  const [stepData, setStepData] = React.useState({
    contactInfo: null,
    resume: null,
    qualifications: null,
    questions: null,
  });

  // Refs to access validate() method of each step component
  const contactInfoRef = React.useRef<{ validate: () => boolean }>(null);
  const resumeRef = React.useRef<{ validate: () => boolean }>(null);
  const qualificationsRef = React.useRef<{ validate: () => boolean }>(null);
  const questionsRef = React.useRef<{ validate: () => boolean }>(null);

  /**
   * Handles validation for the current step before moving to next step.
   * Calls validate method on the current step's component via ref.
   * If validation passes, advances to next step.
   */
  const handleNextStep = () => {
    let isValid = true;

    switch (currentStep) {
      case 1:
        if (contactInfoRef.current) {
          isValid = contactInfoRef.current.validate();
        }
        break;
      case 2:
        if (resumeRef.current) {
          isValid = resumeRef.current.validate();
        }
        break;
      case 3:
        if (qualificationsRef.current) {
          isValid = qualificationsRef.current.validate();
        }
        break;
      case 4:
        if (questionsRef.current) {
          isValid = questionsRef.current.validate();
        }
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Receives data changes from child step components and updates the stepData state.
   * @param step The name/key of the step to update
   * @param data The data object from the step component
   */
  const handleStepDataChange = (step: string, data: any) => {
    setStepData(prev => ({ ...prev, [step]: data }));
  };

  return (
    <div className="flex flex-col h-full" id="apply-root" data-testid="apply-root">
      <div
        className="pb-[30px] flex justify-between pl-[84px] pr-[100px] border-b border-[#e9e9e9] sm:flex-row flex-col items-center gap-[10px]"
        id="header-bar"
        data-testid="header-bar"
      >
        <img
          src="/images/zaidLLC.png"
          alt="logo"
          className="h-[32px]"
          id="logo-image"
          data-testid="logo-image"
        />
        <button
          className="flex gap-[10px] text-[#0D978B] cursor-pointer text-[14px]/[20px]"
          id="go-to-dashboard-top-button"
          data-testid="go-to-dashboard-top-button"
        >
          <p id="go-to-dashboard-top-text" data-testid="go-to-dashboard-top-text">
            Go to Dashboard
          </p>
          <ArrowRight className="size-[20px]" />
        </button>
      </div>
      {currentStep !== 6 && (
        <div
          className="lg:w-[865px] w-full flex bg-white mx-auto mt-[44px]"
          id="form-container"
          data-testid="form-container"
        >
          <div
            className="w-[321px] border-r border-[#e9e9e9] md:block hidden"
            id="sidebar"
            data-testid="sidebar"
          >
            <div
              className="pl-[40px] pt-[36px] pb-[21px] border-b border-[#e9e9e9]"
              id="sidebar-header"
              data-testid="sidebar-header"
            >
              <p
                className="text-[18px]/[30px] text-[#353535]"
                id="job-title-sidebar"
                data-testid="job-title-sidebar"
              >
                Senior Data Analyst
              </p>
              <p
                className="text-[14px]/[22px] text-[#8f8f8f]"
                id="company-info-sidebar"
                data-testid="company-info-sidebar"
              >
                Big and Small Enterprise Ltd ~ USA
              </p>
            </div>
            <div className="pt-[40px] pl-[40px]" id="stepper-container" data-testid="stepper-container">
              <Stepper currentStep={currentStep} />
            </div>
          </div>
          <div className="flex-1" id="main-content" data-testid="main-content">
            <div
              className="pl-[40px] pt-[36px] pb-[21px] border-b border-[#e9e9e9] md:hidden block"
              id="mobile-header"
              data-testid="mobile-header"
            >
              <p
                className="text-[18px]/[30px] text-[#353535]"
                id="job-title-mobile"
                data-testid="job-title-mobile"
              >
                Senior Data Analyst
              </p>
              <p
                className="text-[14px]/[22px] text-[#8f8f8f]"
                id="company-info-mobile"
                data-testid="company-info-mobile"
              >
                Big and Small Enterprise Ltd ~ USA
              </p>
            </div>
            <div
              className="pt-[33px] px-[40px] pb-[19px]"
              id="step-component-wrapper"
              data-testid="step-component-wrapper"
            >
              {currentStep === 1 && (
                <ContactInfo
                  ref={contactInfoRef}
                  onValidationChange={(isValid, data) => handleStepDataChange('contactInfo', data)}
                  id="contact-info-step"
                  data-testid="contact-info-step"
                />
              )}
              {currentStep === 2 && (
                <Resume
                  ref={resumeRef}
                  id="resume-step"
                  data-testid="resume-step"
                />
              )}
              {currentStep === 3 && (
                <Qualifications
                  ref={qualificationsRef}
                  id="qualifications-step"
                  data-testid="qualifications-step"
                />
              )}
              {currentStep === 4 && (
                <Questions
                  ref={questionsRef}
                  id="questions-step"
                  data-testid="questions-step"
                />
              )}
              {currentStep === 5 && <Review id="review-step" data-testid="review-step" />}
            </div>
            <div
              className="px-[40px] pt-[28px] pb-[32px] border-t border-[#e9e9e9] flex gap-[16px] sm:flex-row flex-col"
              id="navigation-buttons"
              data-testid="navigation-buttons"
            >
              {currentStep !== 1 && (
                <Button
                  variant="outline"
                  className="h-[48px] w-full  sm:order-1 order-2"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  id="back-button"
                  data-testid="back-button"
                >
                  Back
                </Button>
              )}
              {currentStep !== 5 && (
                <Button
                  className="h-[48px] w-full sm:order-2 order-1"
                  onClick={handleNextStep}
                  id="save-continue-button"
                  data-testid="save-continue-button"
                >
                  Save & Continue{' '}
                </Button>
              )}
              {currentStep === 5 && (
                <Button
                  className="h-[48px] w-full sm:order-2 order-1"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  id="submit-application-button"
                  data-testid="submit-application-button"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {currentStep === 6 && (
        <div className="flex-1" id="submission-success-wrapper" data-testid="submission-success-wrapper">
          <div className="w-full h-full flex justify-center items-center px-[10px]">
            <div
              className="w-[622px] border border-[#e9e9e9] rounded-[16px] bg-white py-[63px] px-[40px] flex flex-col items-center"
              id="reset-success-container"
              data-testid="reset-success-container"
            >
              <div
                className="relative w-[100px] h-[100px] flex items-center justify-center"
                id="success-icon-wrapper"
                data-testid="success-icon-wrapper"
              >
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
                Thanks for trusting us with your time and application. Our team is reviewing all
                candidates carefully, and if you're a strong fit, you'll hear from us soon.
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
      <div
        className="flex justify-center mt-[51px] pb-[20px]"
        id="footer-logo-wrapper"
        data-testid="footer-logo-wrapper"
      >
        <img
          src="/images/poweredBy.png"
          alt="logo"
          className="h-[28px]"
          id="footer-logo"
          data-testid="footer-logo"
        />
      </div>
    </div>
  );
}
