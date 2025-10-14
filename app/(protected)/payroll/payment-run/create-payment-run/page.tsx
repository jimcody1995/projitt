"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Stepper from "./components/stepper";
import BasicPay from "./components/basic-pay";
import Prepare from "./components/prepare";
import ValidateDetails from "./components/validate-details";
import DisburseFunds from "./components/disburse-funds";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { customToast } from "@/components/common/toastr";
import { CircleAlert, CircleCheck } from "lucide-react";

export default function CreatePaymentRun() {
    const [currentStep, setCurrentStep] = useState(1);
    const [payrollData, setPayrollData] = useState<any>({});
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const router = useRouter();

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDisburse = () => {
        // Handle payment processing
        console.log("Payment processed", payrollData);

        // Close modal
        setIsConfirmModalOpen(false);

        // Show success toast
        customToast(
            "Payroll Disbursement Successful",
            "Funds have been successfully disbursed to all employees.",
            "success"
        );

        // Navigate back to payment runs page after a short delay
        // setTimeout(() => {
        //     router.push("/payroll/payment-run");
        // }, 2000);
    };

    const handleBackToList = () => {
        router.push("/payroll/payment-run");
    };

    return (
        <div className="p-4 sm:px-[16px] sm:py-[12px] w-full min-h-screen bg-[#F9F9F9]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-[16px] sm:mb-[23px]">
                <div>
                    <div className="text-[12px] sm:text-[14px]/[20px] text-[#8F8F8F] mb-[4px]">
                        <span
                            className="cursor-pointer hover:text-[#0D978B]"
                            onClick={handleBackToList}
                        >
                            Payment Run
                        </span>
                        <span className="text-[#353535]"> / Create Payment Run</span>
                    </div>
                    <h1 className="text-[20px] sm:text-[24px]/[30px] font-semibold text-[#353535]">
                        Create Payment Run
                    </h1>
                </div>
                <div className="flex gap-[8px] sm:gap-[12px] w-full sm:w-auto">
                    <Button
                        variant="ghost"
                        className="h-[40px] sm:h-[48px] flex-1 sm:flex-none sm:min-w-[67px] text-[#4B4B4B] font-semibold text-[14px]/[20px]"
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    {currentStep < 4 && (
                        <Button
                            className="h-[40px] sm:h-[48px] flex-1 sm:flex-none sm:min-w-[125px] bg-[#0D978B] hover:bg-[#0c8679] font-semibold text-[14px]/[20px]"
                            onClick={handleNext}
                        >
                            Continue
                        </Button>
                    )}
                    {currentStep === 4 && (
                        <Button
                            className="h-[40px] sm:h-[48px] flex-1 sm:flex-none sm:min-w-[125px] bg-[#0D978B] hover:bg-[#0c8679] font-semibold text-[14px]/[20px]"
                            onClick={handleComplete}
                        >
                            Disburse Funds
                        </Button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex bg-white rounded-[8px] border border-[#E9E9E9] overflow-hidden">
                {/* Stepper Sidebar */}
                <div className="hidden lg:block min-w-[324px] border-r border-[#E9E9E9] min-h-[calc(100vh-120px)] p-[24px]">
                    <Stepper currentStep={currentStep} />
                </div>

                {/* Step Content */}
                <div className="flex-1 px-[16px] sm:px-[24px] lg:px-[40px] py-[20px] sm:py-[30px] overflow-x-hidden">
                    {currentStep === 1 && (
                        <BasicPay
                            onNext={handleNext}
                            onBack={handleBack}
                            payrollData={payrollData}
                            setPayrollData={setPayrollData}
                        />
                    )}
                    {currentStep === 2 && (
                        <Prepare onNext={handleNext} onBack={handleBack} />
                    )}
                    {currentStep === 3 && (
                        <ValidateDetails onNext={handleNext} onBack={handleBack} />
                    )}
                    {currentStep === 4 && (
                        <DisburseFunds onBack={handleBack} onComplete={handleComplete} />
                    )}
                </div>
            </div>
            <Dialog
                open={isConfirmModalOpen}
                onOpenChange={setIsConfirmModalOpen}
            >
                <DialogContent className="sm:max-w-[414px] sm:max-h-[244px] p-0 gap-0 !rounded-[12px]" close={false}>
                    <div className="flex flex-col items-center pt-[24px] pb-[24px] px-[20px]">
                        {/* Icon */}
                        <div className="w-[40px] h-[40px] rounded-full bg-[#D6EEEC] flex items-center justify-center mb-[18px]">
                            <CircleAlert className="w-[20px] h-[20px] text-[#0D978B]" />
                        </div>

                        {/* Title */}
                        <h3 className="text-[16px]/[24px] font-semibold text-[#353535] mb-[4px] text-center">
                            Confirm Payroll Disbursement
                        </h3>

                        {/* Description */}
                        <p className="text-[14px]/[20px] text-[#787878] text-center mb-[18px] max-w-[320px]">
                            This action will process all employee payments and no further edits will be possible. Please review all details carefully before proceeding.
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-[12px] justify-center">
                            <Button
                                variant="outline"
                                className="flex-1 w-[100px] h-[36px] rounded-[8px] border-[#D1D1D1] text-[14px]/[20px] font-medium text-[#353535] hover:bg-gray-50"
                                onClick={() => setIsConfirmModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 h-[36px] w-[156px] rounded-[8px] bg-[#0D978B] hover:bg-[#0c8679] text-[14px]/[20px] font-medium"
                                onClick={handleConfirmDisburse}
                            >
                                Confirm & Disburse
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

