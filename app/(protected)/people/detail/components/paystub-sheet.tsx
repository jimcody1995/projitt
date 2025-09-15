'use client';

import React from 'react';
import { X, Download } from 'lucide-react';
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
            baseSalary: string;
            allowance: string;
            overtime: string;
            total: string;
        };
        deductions: {
            payeTax: string;
            healthInsurance: string;
            retirement401k: string;
            total: string;
        };
        netPay: {
            amount: string;
            deliveryInfo: string;
        };
    };
}

export default function PaystubSheet({ isOpen, onClose, paystubData }: PaystubSheetProps) {
    // Default paystub data
    const defaultPaystubData = {
        payPeriod: 'May 1 - May 31, 2025',
        payDate: 'June 1, 2025',
        bank: 'Wells Fargo - 1232249218',
        paymentMethod: 'Direct Deposit',
        earnings: {
            baseSalary: '$15,000.00',
            allowance: '$1,500.00',
            overtime: '$1,500.00',
            total: '$18,000.00'
        },
        deductions: {
            payeTax: '$200.00',
            healthInsurance: '$500.00',
            retirement401k: '$300.00',
            total: '$1,000.00'
        },
        netPay: {
            amount: '$18,000.00',
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
                        <div className="space-y-2">
                            <div className="flex justify-between items-center py-[13px] px-[16px] border-b border-[#e9e9e9]">
                                <span className="text-[#4b4b4b]">Base Salary</span>
                                <span className="font-medium text-[#4b4b4b]">{data.earnings.baseSalary}</span>
                            </div>
                            <div className="flex justify-between items-center py-[13px] px-[16px] border-b border-[#e9e9e9]">
                                <span className="text-[#4b4b4b]">Allowance</span>
                                <span className="font-medium text-[#4b4b4b]">{data.earnings.allowance}</span>
                            </div>
                            <div className="flex justify-between items-center py-[13px] px-[16px] border-b border-[#e9e9e9]">
                                <span className="text-[#4b4b4b]">Overtime</span>
                                <span className="font-medium text-[#4b4b4b]">{data.earnings.overtime}</span>
                            </div>
                            <div className="flex justify-between items-center py-[13px] px-[16px]  border-b border-[#e9e9e9]">
                                <span className="font-semibold text-[#0D978B]">Total</span>
                                <span className="font-bold text-[#0D978B] text-lg">{data.earnings.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Deductions Section */}
                    <div className="space-y-3">
                        <h3 className="text-[14px]/[26px] font-medium text-[#4b4b4b]">DEDUCTIONS</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center py-[13px] px-[16px] border-b border-[#e9e9e9]">
                                <span className="text-[#4b4b4b]">PAYE Tax</span>
                                <span className="font-medium text-gray-800">{data.deductions.payeTax}</span>
                            </div>
                            <div className="flex justify-between items-center py-[13px] px-[16px] border-b border-[#e9e9e9]">
                                <span className="text-[#4b4b4b]">Health Insurance</span>
                                <span className="font-medium text-[#4b4b4b]">{data.deductions.healthInsurance}</span>
                            </div>
                            <div className="flex justify-between items-center py-[13px] px-[16px] border-b border-[#e9e9e9]">
                                <span className="text-[#4b4b4b]">401k</span>
                                <span className="font-medium text-[#4b4b4b]">{data.deductions.retirement401k}</span>
                            </div>
                            <div className="flex justify-between items-center py-[13px] px-[16px] border-b border-[#e9e9e9]">
                                <span className="font-semibold text-[#c30606]">Total</span>
                                <span className="font-bold text-[#c30606] text-lg">{data.deductions.total}</span>
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
