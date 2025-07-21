import { Check } from "lucide-react"; // or use any checkmark SVG/icon

const steps = [
    { title: "Job Details", subtitle: "Enter Job Details" },
    { title: "Job Description", subtitle: "Clarify responsibilities" },
    { title: "Applicant Questions", subtitle: "Screen for Fit" },
    { title: "Hiring Pipeline", subtitle: "Interview Stages" },
    { title: "Review & Publish", subtitle: "Final check" },
];

export default function Stepper({ currentStep = 2 }: { currentStep?: number }) {
    return (
        <div>

            <div className="flex flex-col gap-[56px] relative">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isActive = stepNumber === currentStep;

                    return (
                        <div key={index} className="flex items-start gap-[12px] relative">
                            {/* Vertical line */}
                            {index !== steps.length - 1 && (
                                <div className={`absolute top-[40px] left-[18.5px] h-[46px] border-l border-dashed ${index < currentStep ? "border-[#0D978B]" : "border-[#626262]"} z-0`}></div>
                            )}

                            {/* Circle */}
                            <div className="relative z-10">
                                {isCompleted ? (
                                    <div className="w-[36px] h-[36px] rounded-full bg-[#0D978B] text-white flex items-center justify-center">
                                        <Check size={16} strokeWidth={3} />
                                    </div>
                                ) : isActive ? (
                                    <div className="w-[36px] h-[36px] rounded-full bg-[#0D978B] text-white flex items-center justify-center text-[12px] font-medium">
                                        {stepNumber}
                                    </div>
                                ) : (
                                    <div className="w-[36px] h-[36px] rounded-full border-[1px] border-[#626262] text-[#626262] flex items-center justify-center text-[12px] font-medium">
                                        {stepNumber}
                                    </div>
                                )}
                            </div>

                            {/* Labels */}
                            <div>
                                <div
                                    className={`text-[14px]/[18px] font-medium ${isCompleted || isActive ? "text-teal-600" : "text-[#626262]"
                                        }`}
                                >
                                    {step.title}
                                </div>
                                <div className="text-[11px]/[12px] text-[#626262] mt-[3px]">{step.subtitle}</div>
                            </div>

                        </div>
                    );
                })}
            </div >
            <div className="w-full px-[24px] py-[21px] bg-[#ededed] rounded-[8px] text-[13px]/[21px] text-[#626262] mt-[213px]">
                Tell candidates what the role really involves and who thrives in it. Include key responsibilities, and what success looks like in this position.
            </div>
        </div>

    );
}
