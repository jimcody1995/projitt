/**
 * Stepper component displaying a vertical progress tracker.
 * Highlights current step, completed steps with check icon,
 * and upcoming steps in outlined style.
 */

import React from "react";
import { Briefcase, Check, CloudCheck, Contact, FileText } from "lucide-react";

const steps = [
  { title: "Contact Info", icon: <Contact className="w-3 h-3" /> }, // 12px = 3 * 4px
  { title: "Resume & Cover Letter", icon: <FileText className="w-3 h-3" /> },
  { title: "Qualifications", icon: <Briefcase className="w-3 h-3" /> },
  { title: "Applicant Questions", icon: <i className="text-[12px] font-medium">?</i> },
  { title: "Review", icon: <CloudCheck className="w-3 h-3" /> },
];

/**
 * Renders the stepper UI with vertical line indicators and labeled steps.
 *
 * @param currentStep - The current active step (1-indexed)
 * @returns JSX.Element
 */
export default function Stepper({ currentStep = 2 }: { currentStep?: number }): JSX.Element {
  return (
    <div id="vertical-stepper" data-testid="vertical-stepper">
      <div className="flex flex-col gap-[40px] relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className="flex items-start gap-[12px] relative"
              id={`step-${stepNumber}`}
              data-testid={`step-${stepNumber}`}
            >
              {/* Vertical line connecting steps (except last) */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-[30px] left-[13px] h-[33px] border-l border-dashed ${
                    isCompleted ? "border-[#0D978B]" : "border-[#626262]"
                  } z-0`}
                  id={`step-line-${stepNumber}`}
                  data-testid={`step-line-${stepNumber}`}
                />
              )}

              {/* Step circle */}
              <div
                className="relative z-10"
                id={`step-circle-${stepNumber}`}
                data-testid={`step-circle-${stepNumber}`}
              >
                {isCompleted ? (
                  <div className="w-[26px] h-[26px] rounded-full bg-[#0D978B] text-white flex items-center justify-center">
                    <Check size={16} strokeWidth={3} />
                  </div>
                ) : isActive ? (
                  <div className="w-[26px] h-[26px] rounded-full bg-[#0D978B] text-white flex items-center justify-center text-[12px] font-medium">
                    {step.icon}
                  </div>
                ) : (
                  <div className="w-[26px] h-[26px] rounded-full border border-[#626262] text-[#626262] flex items-center justify-center text-[12px] font-medium">
                    {step.icon}
                  </div>
                )}
              </div>

              {/* Step title */}
              <div
                className="step-labels"
                id={`step-labels-${stepNumber}`}
                data-testid={`step-labels-${stepNumber}`}
              >
                <div
                  className={`text-[14px]/[18px] font-medium ${
                    isCompleted || isActive ? "text-[#0D978B]" : "text-[#626262]"
                  }`}
                  id={`step-title-${stepNumber}`}
                  data-testid={`step-title-${stepNumber}`}
                >
                  {step.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
