'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Payroll() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        // Company Specific Setup options
        cancellationOfConfirmedPayroll: 'yes',
        isCompanyParticipatingInEPF: 'yes',
        areVPFDeclarationsAllowed: 'yes',
        allowClosureOfVPFDeclaration: 'yes',
        deductPFOnSalaryArrears: 'yes',
        allowChangesToOtherIncomeDeclaration: 'yes',
        emailTaxStatementWithSalarySlip: 'yes',
        uploadSupportingDocumentMandatory: 'yes',

        // Payroll Cutoff Day
        payrollCutoffDay: 'lastDay',
        customCutoffDay: 15
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Saving payroll settings:', formData);
            alert('Company Specific Setup saved successfully!');
        } catch (error) {
            console.error('Error saving payroll settings:', error);
            alert('Failed to save payroll settings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row mt-[34px]">
            {/* Main Content */}
            <div className="flex-1">
                <div className="space-y-8 md:w-[504px] w-full">
                    {/* Company Specific Setup Section */}
                    <div>
                        <div className="flex flex-col gap-[10px] mb-4">
                            <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Company Specific Setup</p>
                            <div className="flex flex-col gap-[24px]">
                                {/* Cancellation of confirmed payroll / Finalized full and final */}
                                <div className="space-y-2">
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Cancellation of confirmed payroll / Finalized full and final</Label>
                                    <RadioGroup
                                        value={formData.cancellationOfConfirmedPayroll}
                                        onValueChange={(value) => handleInputChange('cancellationOfConfirmedPayroll', value)}
                                        className="flex gap-6 mt-[6px]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes-cancellation" />
                                            <Label htmlFor="yes-cancellation" className={formData.cancellationOfConfirmedPayroll === 'yes' ? 'text-[#0D978B]' : 'text-[#787878]'}>Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no-cancellation" />
                                            <Label htmlFor="no-cancellation" className={formData.cancellationOfConfirmedPayroll === 'no' ? 'text-[#0D978B]' : 'text-[#787878]'}>No</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Is Company Participating in EPF */}
                                <div className="space-y-2">
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Is Company Participating in EPF</Label>
                                    <RadioGroup
                                        value={formData.isCompanyParticipatingInEPF}
                                        onValueChange={(value) => handleInputChange('isCompanyParticipatingInEPF', value)}
                                        className="flex gap-6 mt-[6px]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes-epf" />
                                            <Label htmlFor="yes-epf" className={formData.isCompanyParticipatingInEPF === 'yes' ? 'text-[#0D978B]' : 'text-[#787878]'}>Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no-epf" />
                                            <Label htmlFor="no-epf" className={formData.isCompanyParticipatingInEPF === 'no' ? 'text-[#0D978B]' : 'text-[#787878]'}>No</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Are Voluntary Provident Fund Declarations Allowed */}
                                <div className="space-y-2">
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Are Voluntary Provident Fund Declarations Allowed</Label>
                                    <RadioGroup
                                        value={formData.areVPFDeclarationsAllowed}
                                        onValueChange={(value) => handleInputChange('areVPFDeclarationsAllowed', value)}
                                        className="flex gap-6 mt-[6px]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes-vpf" />
                                            <Label htmlFor="yes-vpf" className={formData.areVPFDeclarationsAllowed === 'yes' ? 'text-[#0D978B]' : 'text-[#787878]'}>Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no-vpf" />
                                            <Label htmlFor="no-vpf" className={formData.areVPFDeclarationsAllowed === 'no' ? 'text-[#0D978B]' : 'text-[#787878]'}>No</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Allow closure of VPF declaration in middle of financial year */}
                                <div className="space-y-2">
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Allow closure of VPF declaration in middle of financial year</Label>
                                    <RadioGroup
                                        value={formData.allowClosureOfVPFDeclaration}
                                        onValueChange={(value) => handleInputChange('allowClosureOfVPFDeclaration', value)}
                                        className="flex gap-6 mt-[6px]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes-vpf-closure" />
                                            <Label htmlFor="yes-vpf-closure" className={formData.allowClosureOfVPFDeclaration === 'yes' ? 'text-[#0D978B]' : 'text-[#787878]'}>Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no-vpf-closure" />
                                            <Label htmlFor="no-vpf-closure" className={formData.allowClosureOfVPFDeclaration === 'no' ? 'text-[#0D978B]' : 'text-[#787878]'}>No</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Deduct PF On Salary Arrears */}
                                <div className="space-y-2">
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Deduct PF On Salary Arrears</Label>
                                    <RadioGroup
                                        value={formData.deductPFOnSalaryArrears}
                                        onValueChange={(value) => handleInputChange('deductPFOnSalaryArrears', value)}
                                        className="flex gap-6 mt-[6px]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes-pf-arrears" />
                                            <Label htmlFor="yes-pf-arrears" className={formData.deductPFOnSalaryArrears === 'yes' ? 'text-[#0D978B]' : 'text-[#787878]'}>Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no-pf-arrears" />
                                            <Label htmlFor="no-pf-arrears" className={formData.deductPFOnSalaryArrears === 'no' ? 'text-[#0D978B]' : 'text-[#787878]'}>No</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Allow changes to Other Income Declaration Multiple Times */}
                                <div className="space-y-2">
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Allow changes to Other Income Declaration Multiple Times</Label>
                                    <RadioGroup
                                        value={formData.allowChangesToOtherIncomeDeclaration}
                                        onValueChange={(value) => handleInputChange('allowChangesToOtherIncomeDeclaration', value)}
                                        className="flex gap-6 mt-[6px]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes-income-changes" />
                                            <Label htmlFor="yes-income-changes" className={formData.allowChangesToOtherIncomeDeclaration === 'yes' ? 'text-[#0D978B]' : 'text-[#787878]'}>Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no-income-changes" />
                                            <Label htmlFor="no-income-changes" className={formData.allowChangesToOtherIncomeDeclaration === 'no' ? 'text-[#0D978B]' : 'text-[#787878]'}>No</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Email the Tax Statement With Salary Slip */}
                                <div className="space-y-2">
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Email the Tax Statement With Salary Slip</Label>
                                    <RadioGroup
                                        value={formData.emailTaxStatementWithSalarySlip}
                                        onValueChange={(value) => handleInputChange('emailTaxStatementWithSalarySlip', value)}
                                        className="flex gap-6 mt-[6px]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes-email-tax" />
                                            <Label htmlFor="yes-email-tax" className={formData.emailTaxStatementWithSalarySlip === 'yes' ? 'text-[#0D978B]' : 'text-[#787878]'}>Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no-email-tax" />
                                            <Label htmlFor="no-email-tax" className={formData.emailTaxStatementWithSalarySlip === 'no' ? 'text-[#0D978B]' : 'text-[#787878]'}>No</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Upload of supporting document mandatory for tax saving submissions */}
                                <div className="space-y-2">
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Upload of supporting document mandatory for tax saving submissions</Label>
                                    <RadioGroup
                                        value={formData.uploadSupportingDocumentMandatory}
                                        onValueChange={(value) => handleInputChange('uploadSupportingDocumentMandatory', value)}
                                        className="flex gap-6 mt-[6px]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="yes-upload-doc" />
                                            <Label htmlFor="yes-upload-doc" className={formData.uploadSupportingDocumentMandatory === 'yes' ? 'text-[#0D978B]' : 'text-[#787878]'}>Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="no-upload-doc" />
                                            <Label htmlFor="no-upload-doc" className={formData.uploadSupportingDocumentMandatory === 'no' ? 'text-[#0D978B]' : 'text-[#787878]'}>No</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Payroll Cutoff Day */}
                                <div className="space-y-2">
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Payroll claim/Reimbursement cutoff Day</Label>
                                    <RadioGroup
                                        value={formData.payrollCutoffDay}
                                        onValueChange={(value) => handleInputChange('payrollCutoffDay', value)}
                                        className="flex flex-row gap-3 mt-[6px]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="lastDay" id="last-day" />
                                            <Label htmlFor="last-day" className={formData.payrollCutoffDay === 'lastDay' ? 'text-[#0D978B]' : 'text-[#787878]'}>Last day of the month</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="customDay" id="custom-day" />
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    value={formData.customCutoffDay}
                                                    onChange={(e) => handleInputChange('customCutoffDay', parseInt(e.target.value) || 1)}
                                                    className="w-10 h-6 rounded-[4px] bg-gray-400"
                                                    type="text"
                                                />
                                                <Label className={formData.payrollCutoffDay === 'customDay' ? 'text-[#0D978B]' : 'text-[#787878]'}>Day of the Every Month</Label>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-start">
                        <Button
                            onClick={handleSaveChanges}
                            className="px-8 py-3 bg-[#0d978b] hover:bg-[#0d978b]/90"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
