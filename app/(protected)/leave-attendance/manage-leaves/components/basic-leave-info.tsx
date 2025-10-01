'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, FilePlus, X } from 'lucide-react';

export default function BasicLeaveInfo() {
    const [formData, setFormData] = useState({
        leaveName: 'Sick Leave',
        description: '',
        minimumNoticePeriod: '',
        allowApplyDuringNoticePeriod: 'yes',
        leaveUsageWaitingPeriod: '',
        requireDocumentSubmission: 'yes',
        leaveGiftingAllowed: 'yes'
    });

    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
    });

    return (
        <div className="space-y-8 md:w-[480px] w-full px-[45px] py-[42px]">
            <div>
                <h2 className="text-[22px]/[30px] font-semibold text-[#353535] mb-6">Basic Info</h2>

                <div className="space-y-7">
                    {/* Leave Name */}
                    <div className="space-y-3">
                        <Label className="text-[14px]/[16px] text-black font-medium">Leave Name</Label>
                        <Input
                            placeholder={formData.leaveName}
                            onChange={(e) => handleInputChange('leaveName', e.target.value)}
                            className="w-full h-[48px] border-gray-300 focus:border-[#0d978b] focus:ring-[#0d978b]"
                        />
                        {errors.leaveName && (
                            <p className="text-red-500 text-sm">{errors.leaveName}</p>
                        )}
                    </div>

                    {/* Upload Policy Document */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-black font-medium">Upload Policy Document</Label>
                        <div className="mt-2">
                            {file && (
                                <div className="w-full border border-[#bcbcbc] rounded-[8px] p-[20px] cursor-pointer">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-[10px]">
                                            <FileText className="size-[20px]" />
                                            <p className="text-[14px]/[20px] text-[#353535]">{file.name}</p>
                                        </div>
                                        <button className='cursor-pointer' onClick={() => setFile(null)}>
                                            <X className="size-[20px]" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {!file && (
                                <div
                                    {...getRootProps()}
                                    className="mt-[6px] w-full border-1 border-dashed rounded-xl p-[15px] text-center cursor-pointer transition border-gray-300 hover:border-teal-400"
                                    data-test-id="file-drop-zone"
                                >
                                    <input {...getInputProps()} data-test-id="file-input" />
                                    <div className="flex flex-row items-center justify-start text-gray-400" data-test-id="file-drop-content">
                                        <FilePlus className="size-6 text-gray-400" />
                                        <p className="text-[14px]/[20px]" data-test-id="file-drop-instruction">
                                            {isDragActive ? (
                                                <span className="font-medium text-[#0D978B]">
                                                    Drop file here...
                                                </span>
                                            ) : (
                                                <>
                                                    Drop file or{' '}
                                                    <span className="font-medium text-[#0D978B]">
                                                        click to upload
                                                    </span>
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-black font-medium">Description</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Enter a brief purpose or scope"
                            className="w-full min-h-[100px] border-gray-300 focus:border-[#0d348b] focus:ring-[#0d978b] resize-none rounded-[10px] px-3 py-4 text-[14px]/[20px]"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
                    </div>

                    {/* Minimum Notice Period */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-black font-medium">Minimum Notice Period</Label>
                        <p className="text-[12px]/[12px] text-gray-600">How early an employee can apply for leave after joining company</p>
                        <div className="relative">
                            <Input
                                value={formData.minimumNoticePeriod}
                                onChange={(e) => handleInputChange('minimumNoticePeriod', e.target.value)}
                                placeholder=""
                                className="w-full h-[48px] border-gray-300 focus:border-[#0d348b] focus:ring-[#0d978b] pr-12 rounded-[10px] px-3 py-4 text-[14px]/[20px]"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[14px]/[20px] text-gray-400 pointer-events-none">days</span>
                        </div>
                        {errors.minimumNoticePeriod && (
                            <p className="text-red-500 text-sm">{errors.minimumNoticePeriod}</p>
                        )}
                    </div>

                    {/* Allow to apply leave during notice period */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-blackfont-medium">Allow to apply leave during notice period</Label>
                        <RadioGroup
                            value={formData.allowApplyDuringNoticePeriod}
                            onValueChange={(value) => handleInputChange('allowApplyDuringNoticePeriod', value)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="notice-yes" />
                                <Label htmlFor="notice-yes" className="text-[14px]/[16px] text-[#353535]">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="notice-no" />
                                <Label htmlFor="notice-no" className="text-[14px]/[16px] text-[#353535]">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Leave Usage waiting period */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-black font-medium">Leave Usage waiting period</Label>
                        <p className="text-[12px]/[12px] text-gray-600">Time after hire before an employee becomes eligible</p>
                        <div className="relative">
                            <Input
                                value={formData.leaveUsageWaitingPeriod}
                                onChange={(e) => handleInputChange('leaveUsageWaitingPeriod', e.target.value)}
                                placeholder=""
                                className="w-full h-[48px] border-gray-300 focus:border-[#0d978b] focus:ring-[#0d978b] pr-12"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[13px]/[21px] text-gray-400 pointer-events-none">days</span>
                        </div>
                        {errors.leaveUsageWaitingPeriod && (
                            <p className="text-red-500 text-sm">{errors.leaveUsageWaitingPeriod}</p>
                        )}
                    </div>

                    {/* Require document submission */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-black font-medium">Require document submission</Label>
                        <p className="text-[12px]/[18px] text-[#8F8F8F]">Is a document (e.g., medical note) mandatory for approval?</p>
                        <RadioGroup
                            value={formData.requireDocumentSubmission}
                            onValueChange={(value) => handleInputChange('requireDocumentSubmission', value)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="doc-yes" />
                                <Label htmlFor="doc-yes" className="text-[14px]/[16px] text-[#353535]">Yes, require document for leave request</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="doc-no" />
                                <Label htmlFor="doc-no" className="text-[14px]/[16px] text-[#353535]">No, don't require documents</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Leave Gifting Allowed */}
                    <div className="space-y-2">
                        <Label className="text-[14px]/[16px] text-black font-medium">Leave Gifting Allowed</Label>
                        <RadioGroup
                            value={formData.leaveGiftingAllowed}
                            onValueChange={(value) => handleInputChange('leaveGiftingAllowed', value)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="gift-yes" />
                                <Label htmlFor="gift-yes" className="text-[14px]/[16px] text-[#353535]">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="gift-no" />
                                <Label htmlFor="gift-no" className="text-[14px]/[16px] text-[#353535]">No</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </div>
    );
}
