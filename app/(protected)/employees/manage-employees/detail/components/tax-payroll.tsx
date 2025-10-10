'use client';

import React, { useState } from 'react';
import { CreditCard, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import PaystubSheet from './paystub-sheet';
import PaymentInfoIcon from './paymentInfoIcon';

export default function TaxPayroll() {
    const [isPaystubOpen, setIsPaystubOpen] = useState(false);
    const [selectedPaystub, setSelectedPaystub] = useState<any>(null);

    // Sample payment information data
    const paymentInfo = {
        paymentMethod: 'Bank Transfer',
        bankName: 'Wells Fargo',
        bankCountry: 'United States',
        accountNumber: '1232249218',
        accountName: 'Alice Fernadez',
        routingNumber: '1232249218',
        bankCode: '456',
        currency: 'USD'
    };

    // Sample payment history data
    const paymentHistory = [
        {
            id: 1,
            period: 'May 2025',
            grossPay: '$15,000.00',
            deductions: '$1,500.00',
            netPay: '$13,500.00',
            status: 'Paid'
        },
        {
            id: 2,
            period: 'April 2025',
            grossPay: '$15,000.00',
            deductions: '$1,500.00',
            netPay: '$13,500.00',
            status: 'Paid'
        },
        {
            id: 3,
            period: 'March 2025',
            grossPay: '$15,000.00',
            deductions: '$1,500.00',
            netPay: '$13,500.00',
            status: 'Paid'
        },
        {
            id: 4,
            period: 'March 2025',
            grossPay: '$15,000.00',
            deductions: '$1,500.00',
            netPay: '$13,500.00',
            status: 'Paid'
        },
        {
            id: 5,
            period: 'March 2025',
            grossPay: '$15,000.00',
            deductions: '$1,500.00',
            netPay: '$13,500.00',
            status: 'Paid'
        },
        {
            id: 6,
            period: 'March 2025',
            grossPay: '$15,000.00',
            deductions: '$1,500.00',
            netPay: '$13,500.00',
            status: 'Paid'
        }
    ];

    const handleViewSummary = (payment: any) => {
        setSelectedPaystub(payment);
        setIsPaystubOpen(true);
    };

    const handleDownload = (payment: any) => {
        // Handle download logic here
        console.log('Download paystub for:', payment.period);
    };

    function ActionsCell({ row }: { row: any }) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    data-testid={`actions-menu-${row.id}`}
                >
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`view-summary-action-${row.id}`}
                        onClick={e => {
                            e.stopPropagation();
                            handleViewSummary(row);
                        }}
                    >
                        View Summary
                    </div>
                    <div
                        className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]"
                        data-testid={`download-action-${row.id}`}
                        onClick={e => {
                            e.stopPropagation();
                            handleDownload(row);
                        }}
                    >
                        Download
                    </div>

                </DropdownMenuContent>
            </DropdownMenu >
        );
    }

    return (
        <div className="space-y-[42px]">
            {/* Payment Information Card */}
            <div className="bg-white rounded-[12px] border border-[#E9E9E9] p-[20px]">
                <div className="flex items-center gap-2 mb-6">
                    <PaymentInfoIcon />
                    <h2 className="text-lg font-semibold text-gray-800">Payment Information</h2>
                </div>

                <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-5 gap-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                            <p className="font-medium text-gray-800">{paymentInfo.paymentMethod}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                            <p className="font-medium text-gray-800">{paymentInfo.bankName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Bank Country</p>
                            <p className="font-medium text-gray-800">{paymentInfo.bankCountry}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Account Number</p>
                            <p className="font-medium text-gray-800">{paymentInfo.accountNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Account Name</p>
                            <p className="font-medium text-gray-800">{paymentInfo.accountName}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-5 gap-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Routing Number</p>
                            <p className="font-medium text-gray-800">{paymentInfo.routingNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Bank Code</p>
                            <p className="font-medium text-gray-800">{paymentInfo.bankCode}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Currency</p>
                            <p className="font-medium text-gray-800">{paymentInfo.currency}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#EEF3F2]">
                        <tr>
                            <th scope="col" className="px-[16px] py-[15px] text-left text-xs font-medium text-[#8c8e8e]  tracking-wider">
                                Period
                            </th>
                            <th scope="col" className="px-[16px] py-[15px] text-right text-xs font-medium text-[#8c8e8e]  tracking-wider">
                                Gross Pay
                            </th>
                            <th scope="col" className="px-[16px] py-[15px] text-right text-xs font-medium text-[#8c8e8e]  tracking-wider">
                                Deductions
                            </th>
                            <th scope="col" className="px-[16px] py-[15px] text-right text-xs font-medium text-[#8c8e8e]  tracking-wider">
                                Net Pay
                            </th>
                            <th scope="col" className="px-[16px] py-[15px] text-center text-xs font-medium text-[#8c8e8e]  tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-[16px] py-[15px] text-center text-xs font-medium text-[#8c8e8e]  tracking-wider">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paymentHistory.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                                <td className="px-[16px] py-[13px] whitespace-nowrap text-sm font-medium text-gray-900">
                                    {payment.period}
                                </td>
                                <td className="px-[16px] py-[13px] whitespace-nowrap text-sm text-gray-900 text-right">
                                    {payment.grossPay}
                                </td>
                                <td className="px-[16px] py-[13px] whitespace-nowrap text-sm text-gray-900 text-right">
                                    {payment.deductions}
                                </td>
                                <td className="px-[16px] py-[13px] whitespace-nowrap text-sm text-gray-900 text-right">
                                    {payment.netPay}
                                </td>
                                <td className="px-[16px] py-[13px] whitespace-nowrap text-sm text-center">
                                    <span className="inline-flex items-center px-[8px] text-[12px]/[22px] rounded-full  bg-[#D6EEEC] text-[#0D978B] ">
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-[16px] py-[13px] whitespace-nowrap text-sm text-center">
                                    <ActionsCell row={payment as any} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paystub Sheet */}
            <PaystubSheet
                isOpen={isPaystubOpen}
                onClose={() => setIsPaystubOpen(false)}
                paystubData={selectedPaystub}
            />
        </div>
    );
}
