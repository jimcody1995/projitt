'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ReviewInfo from './components/review-info';
import Competencies from './components/competencies';
import { useState, useRef } from 'react';
import Criteria from './components/criteria';


export default function CreateReviewCycle() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [competenciesFormData, setCompetenciesFormData] = useState<any>(null);
    const competenciesValidationRef = useRef<(() => boolean) | null>(null);
    return (
        <div className=" bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[12px]/[20px] text-[#A5A5A5]">
                        <span className="cursor-pointer" onClick={() => router.push('/talent-management/performance-review')}>
                            Performance Review
                        </span>
                        <span className="text-[#0d978b]"> / Create Review Cycle</span>
                    </p>
                    <p className="text-[24px]/[30px] font-semibold text-[#353535]">Create Review Cycle</p>
                </div>
                <div className='flex gap-[10px]'>
                    <Button className='h-[42px]' variant="outline">Save & Exit</Button>
                    {step !== 1 && <Button className='h-[42px]' variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
                    <Button
                        onClick={() => {
                            if (step === 3) {
                                return;
                            }
                            setStep((prev) => prev + 1);
                            console.log("asdf123");

                        }}
                        className='h-[42px]'
                    >
                        Continue
                    </Button>
                </div>
            </div>
            <div className="mt-[40px] ">

                {step === 1 && <ReviewInfo />}
                {step === 2 && (
                    <Competencies
                        onFormDataChange={setCompetenciesFormData}
                        onValidation={(validationFn: () => boolean) => { competenciesValidationRef.current = validationFn; }}
                    />
                )}
                {step === 3 && <Criteria />}
            </div>
        </div>
    );
}
