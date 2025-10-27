"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Stepper from "./components/stepper";
import BasicPay from "./components/basic-pay";
import Prepare from "./components/prepare";
import ValidateDetails from "./components/validate-details";
import DisburseFunds from "./components/disburse-funds";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { customToast } from "@/components/common/toastr";
import { CircleAlert, CircleCheck, Shield, CheckCircle, LayoutList } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TaxDeductions from "./components/tax-deduction";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MAX_STEPS = 5;

const activityLogData = [
    {
        id: 1,
        title: "Created Payroll Run",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    },
    {
        id: 2,
        title: "Imported Attendance",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    },
    {
        id: 3,
        title: "Resolved Validation Issue",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    },
    {
        id: 4,
        title: "Revalidated Employee",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    },
    {
        id: 5,
        title: "Resolved Validation Issue",
        user: "Javier Chang",
        initials: "AF",
        date: "Jul 12, 2025"
    }
];

export default function CreatePaymentRun() {
    const [currentStep, setCurrentStep] = useState(1);
    const [payrollData, setPayrollData] = useState<any>({});
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const router = useRouter();
    const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);
    useEffect(() => {
        setIsActivityLogOpen(false);
    }, [currentStep]);

    // Confirmation data for payment gateway and reconciliation
    const confirmData = [
        {
            id: 1,
            transactionId: "TXN-1001",
            employee: "John Doe",
            grossPay: "$2500",
            bankAmount: "$2500",
            status: "Matched"
        },
        {
            id: 2,
            transactionId: "TXN-1002",
            employee: "Jane Smith",
            grossPay: "$2800",
            bankAmount: "$0",
            status: "Pending"
        },
        {
            id: 3,
            transactionId: "TXN-1003",
            employee: "Mike Johnson",
            grossPay: "$3200",
            bankAmount: "$3200",
            status: "Matched"
        },
        {
            id: 4,
            transactionId: "TXN-1004",
            employee: "Sarah Wilson",
            grossPay: "$2100",
            bankAmount: "$0",
            status: "Pending"
        }
    ];

    const handleNext = () => {
        if (currentStep < MAX_STEPS) {
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

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "Matched":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Failed":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
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
                    {currentStep < MAX_STEPS && (
                        <Button
                            className="h-[40px] sm:h-[48px] flex-1 sm:flex-none sm:min-w-[125px] bg-[#0D978B] hover:bg-[#0c8679] font-semibold text-[14px]/[20px]"
                            onClick={handleNext}
                        >
                            Continue
                        </Button>
                    )}
                    {currentStep === MAX_STEPS && (
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
            <div className="flex bg-white rounded-[8px] border border-[#E9E9E9]  relative">
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
                        <TaxDeductions onNext={handleNext} onBack={handleBack} />
                    )}
                    {currentStep === 5 && (
                        <DisburseFunds onBack={handleBack} onComplete={handleComplete} />
                    )}
                </div>
                {/**Activity Logs */}
                <div className="absolute right-0 -bottom-[20px]  flex items-end flex-col justify-center gap-[12px] h-fit">
                    {isActivityLogOpen && (
                        <div
                            className="bg-white border border-[#E9E9E9] shadow-xl rounded-[12px] w-[389px] h-[531px] flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-[24px] pt-[24px] pb-[16px] flex-shrink-0 border-b border-[#E9E9E9]">
                                <h3 className="text-[14px]/[18px] font-medium text-gray-800">
                                    Activity Log
                                </h3>
                            </div>

                            {/* Activity List with Timeline */}
                            <div className="flex-1 overflow-y-auto p-[24px]">
                                <div className="relative">
                                    {activityLogData.map((activity, index) => (
                                        <div
                                            key={activity.id}
                                            className="relative pb-[8px] last:pb-0"
                                        >
                                            {/* Timeline container */}
                                            <div className="flex gap-[8px] h-fit">
                                                {/* Timeline - Left side stepper */}
                                                <div className="relative flex flex-col items-center flex-shrink-0">
                                                    {/* Teal dot indicator */}
                                                    <div className="w-[14px] h-[14px] bg-[#0D978B] rounded-full z-10 flex-shrink-0"></div>

                                                    {/* Connecting line */}
                                                    {index !== activityLogData.length - 1 && (
                                                        <div className="w-[1px] h-[60px] bg-[#D9D9D9] mt-[8px]"></div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    {/* Title */}
                                                    <div className="text-[14px]/[16px] font-medium text-[#4B4B4B] mb-[4px]">
                                                        {activity.title}
                                                    </div>

                                                    {/* User Info */}
                                                    <div className="flex items-center gap-[4px] mb-[4px]">
                                                        <Avatar className="h-[20px] w-[20px]">
                                                            <AvatarFallback className="bg-[#E9E9E9] text-[#4b4b4b] text-[8px] font-medium">
                                                                {activity.initials}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[12px]/[18px] text-[#353535]">
                                                            {activity.user}
                                                        </span>
                                                    </div>

                                                    {/* Date */}
                                                    <div className="text-[10px]/[12px] text-[#A5A5A5]">
                                                        {activity.date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="rounded-full bg-white border border-[#E9E9E9] p-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 w-[60px] h-[60px] flex items-center justify-center" onClick={() => setIsActivityLogOpen(!isActivityLogOpen)}>
                        <LayoutList className="w-[28x] h-[28px] text-[#4B4B4B]" />
                    </div>
                </div>

            </div>
            <Dialog
                open={isConfirmModalOpen}
                onOpenChange={setIsConfirmModalOpen}
            >
                <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0 gap-0 !rounded-[16px]" close={false}>
                    <div className="p-8">
                        {/* Original Confirmation Section */}
                        <div className="flex flex-col items-center pt-2 pb-8 px-6 ">
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D6EEEC] to-[#B8E6E3] flex items-center justify-center mb-6 shadow-lg">
                                <CircleAlert className="w-8 h-8 text-[#0D978B]" />
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center tracking-tight">
                                Confirm Payroll Disbursement
                            </h3>

                            {/* Description */}
                            <p className="text-base leading-relaxed text-gray-600 text-center mb-6 max-w-md font-medium">
                                This action will process all employee payments and no further edits will be possible. Please review all details carefully before proceeding.
                            </p>
                        </div>

                        {/* New Payment Gateway Integration Section */}
                        <div className="p-3 border border-[#E9E9E9] rounded-[8px] mb-3">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Payment Gateway Integration</h3>
                                    <p className="text-sm text-gray-600 font-medium">Secure payment processing system</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Gateway Provider</p>
                                    <p className="text-lg font-bold text-gray-900">Stripe Payroll Payouts</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Connection Status</p>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-green-600 font-bold text-lg">Connected</span>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Batch ID</p>
                                    <p className="text-lg font-bold text-gray-900 font-mono">PG-2025-10-21</p>
                                </div>
                            </div>
                        </div>

                        {/* Reconciliation Summary Section */}
                        <div className="p-3 border border-[#E9E9E9] rounded-[8px] mb-3">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Reconciliation Summary</h3>
                                <p className="text-sm text-gray-600 font-medium">Transaction verification and payment status overview</p>
                            </div>

                            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                                <Table>
                                    <TableHeader className="bg-gray-50">
                                        <TableRow>
                                            <TableHead className="font-bold text-gray-800 text-base py-5 px-6 border-b border-gray-200">Transaction ID</TableHead>
                                            <TableHead className="font-bold text-gray-800 text-base py-5 px-6 border-b border-gray-200">Employee</TableHead>
                                            <TableHead className="font-bold text-gray-800 text-base py-5 px-6 border-b border-gray-200">Gross Pay</TableHead>
                                            <TableHead className="font-bold text-gray-800 text-base py-5 px-6 border-b border-gray-200">Bank Amount</TableHead>
                                            <TableHead className="font-bold text-gray-800 text-base py-5 px-6 border-b border-gray-200">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {confirmData.map((item, index) => (
                                            <TableRow key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors border-b border-gray-100`}>
                                                <TableCell className="font-bold text-gray-900 py-5 px-6 font-mono text-base">
                                                    {item.transactionId}
                                                </TableCell>
                                                <TableCell className="text-gray-900 py-5 px-6 font-semibold text-base">
                                                    {item.employee}
                                                </TableCell>
                                                <TableCell className="text-gray-900 py-5 px-6 font-bold text-lg">
                                                    {item.grossPay}
                                                </TableCell>
                                                <TableCell className="text-gray-900 py-5 px-6 font-bold text-lg">
                                                    {item.bankAmount}
                                                </TableCell>
                                                <TableCell className="py-5 px-6">
                                                    <Badge className={`${getStatusBadgeColor(item.status)} border-0 px-4 py-2 rounded-full text-sm font-bold`}>
                                                        {item.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4 justify-center pt-8 border-t border-gray-200 bg-gray-50 -mx-8 -mb-8 px-8 py-6">
                            <Button
                                variant="outline"
                                className="flex-1 h-12 rounded-lg border-2 border-gray-300 text-base font-bold text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 w-full"
                                onClick={() => setIsConfirmModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 w-full h-12 rounded-lg bg-gradient-to-r from-[#0D978B] to-[#0c8679] hover:from-[#0c8679] hover:to-[#0a6b5f] text-base font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200"
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

