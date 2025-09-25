'use client';

import { Edit } from 'lucide-react';

export default function Finalize({ setCurrentStep }: { setCurrentStep: (step: number) => void }) {

    // This would typically come from props or context in a real application
    const employeeData = {
        basicDetails: {
            name: 'Alice Fernadez',
            employeeType: 'Full Time',
            email: 'alicefernadez@gmail.com',
            location: 'United States'
        },
        role: {
            workLocation: 'United States',
            department: 'Data',
            jobTitle: 'Senior Data Analyst',
            manager: 'John Dauda',
            startDate: '12/12/2025'
        },
        payment: {
            wageType: 'Hourly',
            amount: '$35.00'
        },
        onboarding: {
            checklist: [
                'Upload ID & Certifications',
                'Complete Personal Information',
                'Submit Bank & Tax info',
                'Training & Orientation',
                'Benefits'
            ]
        }
    };

    const handleEdit = (section: string) => {
        console.log(`Edit ${section} clicked`);
        // This would typically navigate back to the specific step
        setCurrentStep(section === 'Basic Details' ? 1 : section === 'Role' ? 2 : section === 'Compensation' ? 3 : section === 'Onboarding' ? 4 : 5);
    };

    return (
        <div className="md:w-[619px] w-full">
            <div>
                <h1 className="text-[20px]/[30px] font-semibold text-[#1C1C1C]">Finalize</h1>
            </div>

            <div className="space-y-6 mt-[32px] w-full">
                {/* Basic Details Card */}
                <div className="bg-[#F8F8F8] rounded-[12px] p-6 relative">
                    <button
                        onClick={() => handleEdit('Basic Details')}
                        className="absolute top-4 right-4 w-6 h-6 bg-[#0D978B] rounded flex items-center justify-center hover:bg-[#0a7a6f] transition-colors"
                    >
                        <Edit className="w-3 h-3 text-white" />
                    </button>

                    <h3 className="text-[16px]/[24px] font-semibold text-[#353535] mb-4">Basic Details</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Name</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.basicDetails.name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Employee Type</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.basicDetails.employeeType}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Email Address</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.basicDetails.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Location</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.basicDetails.location}</p>
                        </div>
                    </div>
                </div>

                {/* Role Card */}
                <div className="bg-[#F8F8F8] rounded-[12px] p-6 relative">
                    <button
                        onClick={() => handleEdit('Role')}
                        className="absolute top-4 right-4 w-6 h-6 bg-[#0D978B] rounded flex items-center justify-center hover:bg-[#0a7a6f] transition-colors"
                    >
                        <Edit className="w-3 h-3 text-white" />
                    </button>

                    <h3 className="text-[16px]/[24px] font-semibold text-[#353535] mb-4">Role</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Work Location</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.role.workLocation}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Department</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.role.department}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Job Title</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.role.jobTitle}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Manager</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.role.manager}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Start Date</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.role.startDate}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Card */}
                <div className="bg-[#F8F8F8] rounded-[12px] p-6 relative">
                    <button
                        onClick={() => handleEdit('Payment')}
                        className="absolute top-4 right-4 w-6 h-6 bg-[#0D978B] rounded flex items-center justify-center hover:bg-[#0a7a6f] transition-colors"
                    >
                        <Edit className="w-3 h-3 text-white" />
                    </button>

                    <h3 className="text-[16px]/[24px] font-semibold text-[#353535] mb-4">Payment</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Wage Type</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.payment.wageType}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[12px]/[18px] text-[#8f8f8f]">Amount</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">{employeeData.payment.amount}</p>
                        </div>
                    </div>
                </div>

                {/* Onboarding Card */}
                <div className="bg-[#F8F8F8] rounded-[12px] p-6 relative">
                    <button
                        onClick={() => handleEdit('Onboarding')}
                        className="absolute top-4 right-4 w-6 h-6 bg-[#0D978B] rounded flex items-center justify-center hover:bg-[#0a7a6f] transition-colors"
                    >
                        <Edit className="w-3 h-3 text-white" />
                    </button>

                    <h3 className="text-[16px]/[24px] font-semibold text-[#353535] mb-4">Onboarding</h3>

                    <div className="space-y-3">
                        <p className="text-[12px]/[18px] text-[#8f8f8f]">Onboarding Checklist</p>
                        <div className="space-y-2">
                            {employeeData.onboarding.checklist.map((item, index) => (
                                <p key={index} className="text-[14px]/[22px] font-medium text-[#353535]">
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
