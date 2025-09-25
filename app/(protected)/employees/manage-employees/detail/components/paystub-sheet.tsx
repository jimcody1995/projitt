'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface PaystubSheetProps {
    isOpen: boolean;
    onClose: () => void;
    paystubData?: {
        payPeriod: string;
        payDate: string;
        bank: string;
        paymentMethod: string;
        earnings: {
            standardPay: { hours: string; rate: string; current: string; ytd: string };
            overtimePay: { hours: string; rate: string; current: string; ytd: string };
            holidayPay: { hours: string; rate: string; current: string; ytd: string };
            basicPay: { hours: string; rate: string; current: string; ytd: string };
            commissionBonus: { hours: string; rate: string; current: string; ytd: string };
            total: { current: string; ytd: string };
        };
        deductions: {
            payeTax: { current: string; ytd: string };
            nationalInsurance: { current: string; ytd: string };
            studentLoan: { current: string; ytd: string };
            pension: { current: string; ytd: string };
            unionFees: { current: string; ytd: string };
            total: { current: string; ytd: string };
        };
        netPay: {
            amount: string;
            deliveryInfo: string;
        };
    };
}

export default function PaystubSheet({ isOpen, onClose }: PaystubSheetProps) {
    // Default paystub data
    const defaultPaystubData = {
        payPeriod: 'May 1 - May 31, 2025',
        payDate: 'June 1, 2025',
        bank: 'Wells Fargo - 1232249218',
        paymentMethod: 'Direct Deposit',
        earnings: {
            standardPay: { hours: '40', rate: '12.50', current: '500.00', ytd: '500.00' },
            overtimePay: { hours: '5', rate: '18.75', current: '93.75', ytd: '93.75' },
            holidayPay: { hours: '8', rate: '12.50', current: '100.00', ytd: '100.00' },
            basicPay: { hours: '', rate: '', current: '1,740.00', ytd: '1,740.00' },
            commissionBonus: { hours: '', rate: '', current: '600.00', ytd: '600.00' },
            total: { current: '3,033.75', ytd: '3,033.75' }
        },
        deductions: {
            payeTax: { current: '250.00', ytd: '250.00' },
            nationalInsurance: { current: '55.00', ytd: '55.00' },
            studentLoan: { current: '30.00', ytd: '30.00' },
            pension: { current: '50.00', ytd: '50.00' },
            unionFees: { current: '5.00', ytd: '5.00' },
            total: { current: '390.00', ytd: '390.00' }
        },
        netPay: {
            amount: '$2,643.75',
            deliveryInfo: 'Delivered via Direct Deposit on June 1, 2025'
        }
    };

    const data = defaultPaystubData;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-2xl py-[29px] px-[32px] overflow-y-auto" close={false}>
                <SheetHeader className="flex flex-row items-center justify-between">
                    <SheetTitle className="text-[22px]/[30px] font-medium text-[#353535]">Paystub</SheetTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </SheetHeader>

                <div className="mt-[35px] space-y-[47px]">
                    {/* General Information */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-x-[73px] gap-y-[20px]">
                            <div className='flex flex-col gap-[4px]'>
                                <p className="text-[12px]/[18px] text-gray-500">Pay Period</p>
                                <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">{data.payPeriod}</p>
                            </div>
                            <div>
                                <p className="text-[12px]/[18px] text-gray-500">Pay Date</p>
                                <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">{data.payDate}</p>
                            </div>
                            <div>
                                <p className="text-[12px]/[18px] text-gray-500">Bank</p>
                                <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">{data.bank}</p>
                            </div>
                            <div>
                                <p className="text-[12px]/[18px] text-gray-500">Payment Method</p>
                                <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">{data.paymentMethod}</p>
                            </div>
                        </div>
                    </div>

                    {/* Earnings Section */}
                    <div className="space-y-[3px]">
                        <h3 className="text-[14px]/[26px] font-medium text-[#4b4b4b]">EARNINGS</h3>
                        <div className="border border-[#e9e9e9] rounded-lg overflow-hidden">
                            {/* Header */}
                            <div className="grid grid-cols-5 bg-gray-50 py-3 px-4 text-[12px] font-medium text-[#4b4b4b] border-b border-[#e9e9e9]">
                                <div>Description</div>
                                <div className="text-center">Hours</div>
                                <div className="text-center">Rate</div>
                                <div className="text-center">Current ($)</div>
                                <div className="text-center">YTD ($)</div>
                            </div>

                            {/* Standard Pay */}
                            <div className="grid grid-cols-5 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">Standard Pay</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.standardPay.hours}</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.standardPay.rate}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.standardPay.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.standardPay.ytd}</div>
                            </div>

                            {/* Overtime Pay */}
                            <div className="grid grid-cols-5 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">Overtime Pay</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.overtimePay.hours}</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.overtimePay.rate}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.overtimePay.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.overtimePay.ytd}</div>
                            </div>

                            {/* Holiday Pay */}
                            <div className="grid grid-cols-5 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">Holiday Pay</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.holidayPay.hours}</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.holidayPay.rate}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.holidayPay.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.holidayPay.ytd}</div>
                            </div>

                            {/* Basic Pay */}
                            <div className="grid grid-cols-5 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">Basic Pay</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.basicPay.hours}</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.basicPay.rate}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.basicPay.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.basicPay.ytd}</div>
                            </div>

                            {/* Commission and Bonus */}
                            <div className="grid grid-cols-5 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">Commission and Bonus</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.commissionBonus.hours}</div>
                                <div className="text-center text-[#4b4b4b]">{data.earnings.commissionBonus.rate}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.commissionBonus.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.earnings.commissionBonus.ytd}</div>
                            </div>

                            {/* Total */}
                            <div className="grid grid-cols-5 py-3 px-4 text-[12px] bg-gray-50">
                                <div className="font-semibold text-[#0D978B]">Total</div>
                                <div></div>
                                <div></div>
                                <div className="text-center font-bold text-[#0D978B]">{data.earnings.total.current}</div>
                                <div className="text-center font-bold text-[#0D978B]">{data.earnings.total.ytd}</div>
                            </div>
                        </div>
                    </div>

                    {/* Deductions Section */}
                    <div className="space-y-3">
                        <h3 className="text-[14px]/[26px] font-medium text-[#4b4b4b]">DEDUCTIONS</h3>
                        <div className="border border-[#e9e9e9] rounded-lg overflow-hidden">
                            {/* Header */}
                            <div className="grid grid-cols-3 bg-gray-50 py-3 px-4 text-[12px] font-medium text-[#4b4b4b] border-b border-[#e9e9e9]">
                                <div>Description</div>
                                <div className="text-center">Current ($)</div>
                                <div className="text-center">YTD ($)</div>
                            </div>

                            {/* PAYE Tax */}
                            <div className="grid grid-cols-3 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">PAYE Tax</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.payeTax.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.payeTax.ytd}</div>
                            </div>

                            {/* National Insurance */}
                            <div className="grid grid-cols-3 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">National Insurance</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.nationalInsurance.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.nationalInsurance.ytd}</div>
                            </div>

                            {/* Student Loan Repayment */}
                            <div className="grid grid-cols-3 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">Student Loan Repayment</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.studentLoan.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.studentLoan.ytd}</div>
                            </div>

                            {/* Pension */}
                            <div className="grid grid-cols-3 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">Pension</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.pension.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.pension.ytd}</div>
                            </div>

                            {/* Union Fees */}
                            <div className="grid grid-cols-3 py-3 px-4 text-[12px] border-b border-[#e9e9e9]">
                                <div className="text-[#4b4b4b]">Union Fees</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.unionFees.current}</div>
                                <div className="text-center font-medium text-[#4b4b4b]">{data.deductions.unionFees.ytd}</div>
                            </div>

                            {/* Total */}
                            <div className="grid grid-cols-3 py-3 px-4 text-[12px] bg-gray-50">
                                <div className="font-semibold text-[#c30606]">Total</div>
                                <div className="text-center font-bold text-[#c30606]">{data.deductions.total.current}</div>
                                <div className="text-center font-bold text-[#c30606]">{data.deductions.total.ytd}</div>
                            </div>
                        </div>
                    </div>

                    {/* Net Pay Section */}
                    <div>
                        <h3 className="text-[14px]/[26px] font-medium text-[#4b4b4b]">NET PAY</h3>
                        <div className="flex justify-between items-center mb-[2px] mt-[4px]">
                            <span className="text-[16px]/[18px] font-bold text-[#0D978B]">{data.netPay.amount}</span>
                        </div>
                        <p className="text-[12px]/[18px] text-[#666666]">{data.netPay.deliveryInfo}</p>
                    </div>

                    {/* Download Button */}
                    <div className="flex justify-end pt-[16px]">
                        <Button className="bg-[#0D978B] h-[42px] hover:bg-[#0a7a6f] text-white px-6 py-2 rounded-lg text-[14px]/[20px] font-semibold">
                            Download
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
