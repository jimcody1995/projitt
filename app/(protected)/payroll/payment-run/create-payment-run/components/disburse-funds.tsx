"use client";

import { Button } from "@/components/ui/button";

interface DisburseFundsProps {
    onBack: () => void;
    onComplete: () => void;
}

export default function DisburseFunds({ onBack, onComplete }: DisburseFundsProps) {
    return (
        <div className="w-full max-w-[600px]">
            <h2 className="text-[20px] sm:text-[24px]/[30px] font-semibold text-[#353535] mb-[20px] sm:mb-[32px]">
                Disburse Funds
            </h2>

            <div className="space-y-[24px] sm:space-y-[32px]">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[24px]">
                    {/* Employees Count */}
                    <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[12px] p-[16px] sm:p-[24px]">
                        <div className="text-[12px] sm:text-[14px]/[20px] text-[#787878] mb-[8px]">
                            Employees
                        </div>
                        <div className="text-[24px] sm:text-[32px]/[40px] font-semibold text-[#353535]">
                            165
                        </div>
                    </div>

                    {/* Pay Period */}
                    <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[12px] p-[16px] sm:p-[24px]">
                        <div className="text-[12px] sm:text-[14px]/[20px] text-[#787878] mb-[8px]">
                            Pay Period
                        </div>
                        <div className="text-[16px] sm:text-[18px]/[24px] font-semibold text-[#353535]">
                            Mar 20th - Mar 26th
                        </div>
                    </div>
                </div>

                {/* Payment Amounts */}
                <div className="space-y-[12px] sm:space-y-[16px]">
                    {/* Gross Pay */}
                    <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[12px] p-[16px] sm:p-[24px]">
                        <div className="text-[12px] sm:text-[14px]/[20px] text-[#787878] mb-[8px]">
                            Gross Pay
                        </div>
                        <div className="text-[24px] sm:text-[32px]/[40px] font-semibold text-[#353535]">
                            $231,400.50
                        </div>
                    </div>

                    {/* Deductions */}
                    <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[12px] p-[16px] sm:p-[24px]">
                        <div className="text-[12px] sm:text-[14px]/[20px] text-[#787878] mb-[8px]">
                            Total Deductions
                        </div>
                        <div className="text-[24px] sm:text-[32px]/[40px] font-semibold text-[#353535]">
                            $11,405.0
                        </div>
                    </div>

                    {/* Net Pay */}
                    <div className="bg-[#D6EEEC] border border-[#0D978B] rounded-[8px] sm:rounded-[12px] p-[16px] sm:p-[24px]">
                        <div className="text-[12px] sm:text-[14px]/[20px] text-[#0D978B] mb-[8px]">
                            Net Pay
                        </div>
                        <div className="text-[28px] sm:text-[36px]/[44px] font-bold text-[#0D978B]">
                            $231,400.50
                        </div>
                        <div className="text-[11px] sm:text-[12px]/[16px] text-[#0D978B] mt-[4px]">
                            Total amount to be disbursed
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="pt-[12px] sm:pt-[16px]">
                    <Button
                        onClick={onComplete}
                        className="w-full bg-[#0D978B] hover:bg-[#0c8679] text-white h-[44px] sm:h-[48px] px-[20px] sm:px-[24px] rounded-[8px] font-semibold text-[14px] sm:text-[16px]"
                    >
                        Process Payment
                    </Button>
                </div>
            </div>
        </div>
    );
}

