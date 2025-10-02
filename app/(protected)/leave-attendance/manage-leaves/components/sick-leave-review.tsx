'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Edit, Users, ExternalLink, X, Maximize2Icon, Pen } from 'lucide-react';

export default function SickLeaveReview() {
    const [isPublishing, setIsPublishing] = useState(false);
    const [showEmployeeList, setShowEmployeeList] = useState(false);

    // Mock data - in real app, this would come from context or props
    const sickLeaveData = {
        leaveName: "Sick Leave",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
        minimumNoticePeriod: "12 days",
        leaveUsageWaitingPeriod: "90 days",
        requireDocumentSubmission: "Yes, require document for leave request",
        totalHoursPerYear: "30 hours",
        accrualMethod: "Monthly ~ 2.5hours/month",
        allowCarryover: "Yes, allow carryover",
        maximumCarryover: "20 hours",
        eligibleEmployees: 25,
        eligibilityRule: "is any of Data, Design and Engineering AND Is NOT a Manager"
    };

    // Mock employee data
    const employees = [
        { id: '1', name: 'Alice Fernadez', role: 'Senior Data Analyst', initials: 'AF' },
        { id: '2', name: 'John Smith', role: 'Brand Designer', initials: 'JS' },
        { id: '3', name: 'Sarah Johnson', role: 'UX Designer', initials: 'SJ' },
        { id: '4', name: 'Mike Wilson', role: 'Product Manager', initials: 'MW' },
        { id: '5', name: 'Emily Davis', role: 'Frontend Developer', initials: 'ED' },
        { id: '6', name: 'David Brown', role: 'Backend Developer', initials: 'DB' },
        { id: '7', name: 'Lisa Garcia', role: 'Data Analyst', initials: 'LG' },
        { id: '8', name: 'Tom Anderson', role: 'Marketing Manager', initials: 'TA' },
        { id: '9', name: 'Anna Taylor', role: 'UI Designer', initials: 'AT' },
        { id: '10', name: 'Chris Lee', role: 'Senior Data Analyst', initials: 'CL' },
        { id: '11', name: 'Maria Rodriguez', role: 'Brand Designer', initials: 'MR' },
        { id: '12', name: 'James White', role: 'UX Designer', initials: 'JW' },
        { id: '13', name: 'Jennifer Martinez', role: 'Product Manager', initials: 'JM' },
        { id: '14', name: 'Robert Thompson', role: 'Frontend Developer', initials: 'RT' },
        { id: '15', name: 'Amanda Clark', role: 'Backend Developer', initials: 'AC' },
        { id: '16', name: 'Daniel Lewis', role: 'Data Analyst', initials: 'DL' },
        { id: '17', name: 'Michelle Walker', role: 'Marketing Manager', initials: 'MW' },
        { id: '18', name: 'Kevin Hall', role: 'UI Designer', initials: 'KH' },
        { id: '19', name: 'Rachel Green', role: 'Senior Data Analyst', initials: 'RG' },
        { id: '20', name: 'Brian Adams', role: 'Brand Designer', initials: 'BA' },
        { id: '21', name: 'Stephanie King', role: 'UX Designer', initials: 'SK' },
        { id: '22', name: 'Mark Wright', role: 'Product Manager', initials: 'MW' },
        { id: '23', name: 'Nicole Scott', role: 'Frontend Developer', initials: 'NS' },
        { id: '24', name: 'Jason Young', role: 'Backend Developer', initials: 'JY' },
        { id: '25', name: 'Samantha Turner', role: 'Data Analyst', initials: 'ST' }
    ];

    const handleEdit = (step: number) => {
        // This would navigate back to the specific step
        console.log('Edit step:', step);
    };

    const handlePublish = async () => {
        setIsPublishing(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Publishing sick leave policy:', sickLeaveData);
            alert('Sick leave policy published successfully!');
        } catch (error) {
            console.error('Error publishing sick leave policy:', error);
            alert('Failed to publish sick leave policy. Please try again.');
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="h-full">
            {/* Main Content */}
            <div className="p-4 sm:p-6">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-[18px]/[24px] sm:text-[22px]/[30px] font-bold text-[#353535] mb-2">Review & Publish</h1>
                    <div className="w-full sm:w-[200px]">
                        {/* Eligible Employees Card - Full Width */}
                        <div
                            className="w-full border border-gray-200 rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => setShowEmployeeList(true)}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[14px]/[20px] sm:text-[16px]/[24px] font-medium text-[#0d978b]">{sickLeaveData.eligibleEmployees}</p>
                                    <p className="text-[12px]/[16px] sm:text-[13px]/[20px] text-[#8F8F8F] mt-[2px]">Eligible Employees</p>
                                </div>
                                <Maximize2Icon className="h-4 w-4 text-[#0d978b] flex-shrink-0" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Basic Leave Info */}
                <Card className="border border-gray-200 w-full max-w-[484px] mb-6 sm:mb-8">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[16px]/[20px] sm:text-[18px]/[24px] font-medium text-gray-900">Basic Leave Info</h3>
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleEdit(1)}
                                className="text-[#0d978b] hover:text-[#0d978b] w-6 h-6 sm:w-7 sm:h-7"
                            >
                                <Pen className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 mb-1">Description</p>
                                <p className="text-sm sm:text-base text-gray-900">{sickLeaveData.description}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Minimum Notice Period</p>
                                    <p className="text-sm sm:text-base text-gray-900">{sickLeaveData.minimumNoticePeriod}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 mb-1">Leave Usage waiting period</p>
                                <p className="text-sm sm:text-base text-gray-900">{sickLeaveData.leaveUsageWaitingPeriod}</p>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 mb-1">Require document submission</p>
                                <p className="text-sm sm:text-base text-gray-900">{sickLeaveData.requireDocumentSubmission}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Allowance & Accrual */}
                <Card className="border border-gray-200 w-full max-w-[484px] mb-6 sm:mb-8">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[16px]/[20px] sm:text-[18px]/[24px] font-medium text-gray-900">Allowance & Accrual</h3>
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleEdit(2)}
                                className="text-white hover:text-[#0d978b] w-6 h-6 sm:w-7 sm:h-7"
                            >
                                <Pen className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Total hours per year</p>
                                    <p className="text-sm sm:text-base text-gray-900">{sickLeaveData.totalHoursPerYear}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 mb-1">Accrual Method</p>
                                <p className="text-sm sm:text-base text-gray-900">{sickLeaveData.accrualMethod}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Carryover</p>
                                    <p className="text-sm sm:text-base text-gray-900">{sickLeaveData.allowCarryover}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 mb-1">Maximum Carryover</p>
                                <p className="text-sm sm:text-base text-gray-900">{sickLeaveData.maximumCarryover}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Eligibility Rule */}
                <Card className="border border-gray-200 w-full max-w-[484px]">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[16px]/[20px] sm:text-[18px]/[24px] font-medium text-gray-900">Eligibility Rule</h3>
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleEdit(3)}
                                className="text-white hover:text-[#0d978b] w-6 h-6 sm:w-7 sm:h-7"
                            >
                                <Pen className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </Button>
                        </div>
                        <div className="space-y-2 text-[12px]/[16px] sm:text-[14px]/[16px]">
                            <p className="text-black">Department<span className='text-gray-500'> is any of</span>  Data, Design and Engineering</p>

                            <p className="text-black">AND</p>
                            <p className="text-gray-900"><span className='text-gray-500'> is</span> NOT <span className='text-gray-500'> a</span> Manager</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Employee List Sheet */}
            <Sheet open={showEmployeeList} onOpenChange={setShowEmployeeList}>
                <SheetContent side="right" className="w-full sm:w-[400px] p-0" close={false}>
                    <SheetHeader className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <SheetTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                                Eligible Employees ({employees.length})
                            </SheetTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowEmployeeList(false)}
                                className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-gray-100 border border-gray-200"
                            >
                                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </div>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 sm:p-6">
                            <div className="space-y-0">
                                {employees.map((employee, index) => (
                                    <div key={employee.id} className="flex items-center gap-2 sm:gap-3 py-3 sm:py-4 border-b border-gray-100 last:border-b-0">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D6EEEC] flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs sm:text-sm font-medium text-[#053834]">
                                                {employee.initials}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{employee.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
