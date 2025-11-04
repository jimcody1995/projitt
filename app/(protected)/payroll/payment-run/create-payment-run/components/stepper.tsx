/**
 * Stepper component displaying a vertical progress tracker.
 * Highlights current step, completed steps with check icon,
 * and upcoming steps in outlined style.
 */

import React from "react";
import { JSX } from 'react';

const steps = [
    { title: "Basic Pay", description: "Enter payroll details" },
    { title: "Prepare", description: "Review employee data" },
    { title: "Validated Details", description: "Verify payment information" },
    { title: "Tax & Deductions", description: "Tax and Deductions" },
    { title: "Disburse Funds", description: "Complete payment run" },
];

/**
 * Renders the stepper UI with vertical line indicators and labeled steps.
 * 
 * @param currentStep - The current active step (1-indexed)
 * @returns JSX.Element
 */
export default function Stepper({ currentStep }: { currentStep: number }): JSX.Element {
    return (
        <div id="vertical-stepper" data-testid="vertical-stepper">
            <div className="flex xl:flex-col flex-row md:gap-[56px] gap-[40px] relative">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isActive = stepNumber === currentStep;

                    return (
                        <div
                            key={index}
                            className="flex items-center  gap-[12px] relative"
                            id={`step-${stepNumber}`}
                            data-testid={`step-${stepNumber}`}
                        >
                            {/* Connecting line - horizontal on small, vertical on xl */}
                            {index !== steps.length - 1 && (
                                <div
                                    className="absolute top-[18px] left-[36px] md:w-[56px] w-[40px] h-[1px] border-t border-[1px] border-dashed border-[#8F8F8F] xl:top-[41px] xl:left-[18px] xl:w-[1px] xl:h-[46px] xl:border-t-0 xl:border-l z-0"
                                    id={`step-line-${stepNumber}`}
                                    data-testid={`step-line-${stepNumber}`}
                                ></div>
                            )}

                            {/* Circle */}
                            <div
                                className="relative"
                                id={`step-circle-${stepNumber}`}
                                data-testid={`step-circle-${stepNumber}`}
                            >
                                {isCompleted || isActive ? (
                                    <div className="w-[36px] h-[36px] text-[12px]/[16px] rounded-full bg-[#0D978B] text-white flex items-center justify-center">
                                        {stepNumber}
                                    </div>
                                ) : (
                                    <div className="w-[36px] h-[36px] text-[12px]/[16px] rounded-full border-[1px] border-[#626262] text-[#626262] flex items-center justify-center text-[12px] font-medium">
                                        {stepNumber}
                                    </div>
                                )}
                            </div>

                            {/* Labels */}
                            <div
                                className="step-labels hidden xl:block"
                                id={`step-labels-${stepNumber}`}
                                data-testid={`step-labels-${stepNumber}`}
                            >
                                <div
                                    className={`text-[14px]/[18px] font-medium ${isCompleted || isActive ? "text-[#0D978B]" : "text-[#626262]"
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

