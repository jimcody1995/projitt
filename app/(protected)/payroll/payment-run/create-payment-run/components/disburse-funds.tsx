"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Printer } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DisburseFundsProps {
    onBack: () => void;
    onComplete: () => void;
}



export default function DisburseFunds({ onBack, onComplete }: DisburseFundsProps) {

    // Close popup when clicking outside

    return (
        <div className="w-full">
            <h2 className="text-[16px] sm:text-[18px]/[24px] font-medium text-[#353535] mb-[30px] sm:mb-[42px]">
                Disburse Funds
            </h2>

            <div className="bg-white border border-[#E9E9E9] rounded-[8px] sm:rounded-[16px] p-[32px] sm:py-[62px] sm:px-[48px] relative">
                {/* Grid Layout */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-y-[40px] sm:gap-y-[60px] gap-x-[40px] cursor-pointer"
                >
                    {/* Row 1 - Employees */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            125
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Employees
                        </div>
                    </div>

                    {/* Row 1 - Pay Period */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            Mar 25th - Mar 26th
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Pay period
                        </div>
                    </div>

                    {/* Row 2 - Gross Pay (Left) */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            $231,450.50
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Gross Pay
                        </div>
                    </div>

                    {/* Row 2 - Gross Pay (Right) */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            $231,450.50
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Gross Pay
                        </div>
                    </div>

                    {/* Row 3 - Total Deductions */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#353535] mb-[3px]">
                            $11,450.50
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Total Deductions
                        </div>
                    </div>

                    {/* Row 3 - Net Pay */}
                    <div>
                        <div className="text-[18px] sm:text-[24px]/[36px] font-medium text-[#0D978B] mb-[3px]">
                            $231,450.50
                        </div>
                        <div className="sm:text-[18px]/[30px] text-[14px] text-[#8F8F8F]">
                            Net Pay
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

