'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch, SwitchWrapper } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Plus, X, MoreVertical, Sparkles } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import TagInput from '@/components/ui/tag-input';

export default function Onboarding() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        // Onboarding Settings
        onboardingInviteEmail: '',
        companyDeclaration: {
            enabled: true,
            heading: '',
            content: ''
        },
        defaultOnboardingTemplates: '',

        // Onboarding Configuration
        onboardingChecklist: [
            { id: 'upload-id', label: 'Upload ID & Certifications', checked: false },
            { id: 'personal-info', label: 'Complete Personal Information', checked: false },
            { id: 'bank-tax', label: 'Submit Bank & Tax info', checked: false },
            { id: 'training', label: 'Training & Orientation', checked: false },
            { id: 'background', label: 'Background Checks', checked: false },
            { id: 'benefits', label: 'Benefits', checked: false }
        ],
        defaultTrainingPath: 'New Employee Onboarding Videos',
        benefits: [
            { id: 'health-1', label: 'Health Benefit', checked: true },
            { id: 'health-2', label: 'Health Benefit', checked: true },
            { id: '401k', label: '401k', checked: true }
        ],
        activities: [
            { id: 'email-id', name: 'Email ID Creation' },
            { id: 'laptop', name: 'Laptop Issue' },
            { id: 'office-tour', name: 'Office Tour' }
        ],
        onboardingDays: 7,
        onboardingApprovals: ['Department Head', 'Recruitment Manager'],

        // Documents to be Issued by Company
        allowBackgroundChecks: 'yes',
        companyDocuments: [
            { id: 'nda', name: 'NDA', signatureRequired: true },
            { id: 'code-conduct', name: 'Code of Conduct.pdf', signatureRequired: false }
        ],

        // Documents to be Uploaded by Employee
        employeeDocuments: [
            { id: 'gov-id', name: 'Government-issued ID', required: true },
            { id: 'academic', name: 'Academic Certifications', required: true },
            { id: 'work-permit', name: 'Work Permit', required: true },
            { id: 'passport-photo', name: 'Passport Photo', required: true }
        ],

        // Offboarding Settings
        offboardingDocuments: [
            { id: 'nda-off', name: 'NDA', signatureRequired: true },
            { id: 'code-conduct-off', name: 'Code of Conduct.pdf', signatureRequired: false }
        ],
        offboardingActivities: [
            { id: 'assets', name: 'Assets returned' },
            { id: 'documents', name: 'Documents signed' },
            { id: 'exit-interview', name: 'Exit interview completed' }
        ]
    });

    const [newActivity, setNewActivity] = useState('');
    const [newApproval, setNewApproval] = useState('');
    const [newCompanyDoc, setNewCompanyDoc] = useState('');
    const [newEmployeeDoc, setNewEmployeeDoc] = useState('');
    const [newOffboardingDoc, setNewOffboardingDoc] = useState('');
    const [newOffboardingActivity, setNewOffboardingActivity] = useState('');

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleChecklistChange = (index: number, checked: boolean) => {
        const newChecklist = [...formData.onboardingChecklist];
        newChecklist[index].checked = checked;
        setFormData(prev => ({ ...prev, onboardingChecklist: newChecklist }));
    };

    const handleBenefitChange = (index: number, checked: boolean) => {
        const newBenefits = [...formData.benefits];
        newBenefits[index].checked = checked;
        setFormData(prev => ({ ...prev, benefits: newBenefits }));
    };

    const handleAddActivity = () => {
        if (newActivity.trim()) {
            setFormData(prev => ({
                ...prev,
                activities: [...prev.activities, { id: Date.now().toString(), name: newActivity }]
            }));
            setNewActivity('');
        }
    };

    const handleRemoveActivity = (index: number) => {
        const newActivities = formData.activities.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, activities: newActivities }));
    };

    const handleAddApproval = (value: string) => {
        if (value.trim()) {
            setFormData(prev => ({
                ...prev,
                onboardingApprovals: [...prev.onboardingApprovals, value]
            }));
            setNewApproval('');
        }
    };

    const handleRemoveApproval = (index: number) => {
        const newApprovals = formData.onboardingApprovals.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, onboardingApprovals: newApprovals }));
    };

    const handleAddCompanyDoc = () => {
        if (newCompanyDoc.trim()) {
            setFormData(prev => ({
                ...prev,
                companyDocuments: [...prev.companyDocuments, { id: Date.now().toString(), name: newCompanyDoc, signatureRequired: false }]
            }));
            setNewCompanyDoc('');
        }
    };

    const handleRemoveCompanyDoc = (index: number) => {
        const newDocs = formData.companyDocuments.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, companyDocuments: newDocs }));
    };

    const handleCompanyDocSignatureToggle = (index: number) => {
        const newDocs = [...formData.companyDocuments];
        newDocs[index].signatureRequired = !newDocs[index].signatureRequired;
        setFormData(prev => ({ ...prev, companyDocuments: newDocs }));
    };

    const handleAddEmployeeDoc = () => {
        if (newEmployeeDoc.trim()) {
            setFormData(prev => ({
                ...prev,
                employeeDocuments: [...prev.employeeDocuments, { id: Date.now().toString(), name: newEmployeeDoc, required: true }]
            }));
            setNewEmployeeDoc('');
        }
    };

    const handleRemoveEmployeeDoc = (index: number) => {
        const newDocs = formData.employeeDocuments.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, employeeDocuments: newDocs }));
    };

    const handleEmployeeDocRequiredToggle = (index: number) => {
        const newDocs = [...formData.employeeDocuments];
        newDocs[index].required = !newDocs[index].required;
        setFormData(prev => ({ ...prev, employeeDocuments: newDocs }));
    };

    const handleAddOffboardingDoc = () => {
        if (newOffboardingDoc.trim()) {
            setFormData(prev => ({
                ...prev,
                offboardingDocuments: [...prev.offboardingDocuments, { id: Date.now().toString(), name: newOffboardingDoc, signatureRequired: false }]
            }));
            setNewOffboardingDoc('');
        }
    };

    const handleRemoveOffboardingDoc = (index: number) => {
        const newDocs = formData.offboardingDocuments.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, offboardingDocuments: newDocs }));
    };

    const handleOffboardingDocSignatureToggle = (index: number) => {
        const newDocs = [...formData.offboardingDocuments];
        newDocs[index].signatureRequired = !newDocs[index].signatureRequired;
        setFormData(prev => ({ ...prev, offboardingDocuments: newDocs }));
    };

    const handleAddOffboardingActivity = () => {
        if (newOffboardingActivity.trim()) {
            setFormData(prev => ({
                ...prev,
                offboardingActivities: [...prev.offboardingActivities, { id: Date.now().toString(), name: newOffboardingActivity }]
            }));
            setNewOffboardingActivity('');
        }
    };

    const handleRemoveOffboardingActivity = (index: number) => {
        const newActivities = formData.offboardingActivities.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, offboardingActivities: newActivities }));
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Saving onboarding settings:', formData);
            alert('Onboarding Settings saved successfully!');
        } catch (error) {
            console.error('Error saving onboarding settings:', error);
            alert('Failed to save onboarding settings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const sidebarItems = [
        { id: 'onboarding-settings', label: 'Onboarding Settings' },
        { id: 'onboarding-config', label: 'Onboarding Configuration' },
        { id: 'onboarding-documents', label: 'Onboarding Documents' },
        { id: 'offboarding-settings', label: 'Offboarding Settings' }
    ];

    return (
        <div className="flex flex-col lg:flex-row mt-[34px]">
            {/* Main Content */}
            <div className="flex-1">
                <div className="space-y-8 md:w-[504px] w-full">
                    {/* Onboarding Settings Section */}
                    <div>
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Onboarding Settings</p>
                        <div className="space-y-6 mt-[16px]">
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Onboarding Invite Email</Label>
                                <Select value={formData.onboardingInviteEmail} onValueChange={(value) => handleInputChange('onboardingInviteEmail', value)}>
                                    <SelectTrigger className="md:w-[270px] w-full h-[40px] mt-[6px]">
                                        <SelectValue placeholder="Select Template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="template1">Standard Onboarding Template</SelectItem>
                                        <SelectItem value="template2">Professional Onboarding Template</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={formData.companyDeclaration.enabled}
                                        onCheckedChange={(checked) =>
                                            handleInputChange('companyDeclaration', { ...formData.companyDeclaration, enabled: checked })
                                        }
                                    />
                                    <Label className='text-[13px]/[21px] text-[#353535]'>Company Declaration</Label>
                                </div>
                                <Input
                                    value={formData.companyDeclaration.heading}
                                    onChange={(e) => handleInputChange('companyDeclaration', { ...formData.companyDeclaration, heading: e.target.value })}
                                    placeholder="Declaration Heading"
                                    className="w-full h-[40px]"
                                />
                                <div className="relative flex flex-col items-end">
                                    <Button
                                        variant="ghost"
                                        className="text-[#0d978b] hover:text-[#0d978b]/80"
                                    >
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        Write with AI
                                    </Button>
                                    <Textarea
                                        value={formData.companyDeclaration.content}
                                        onChange={(e) => handleInputChange('companyDeclaration', { ...formData.companyDeclaration, content: e.target.value })}
                                        placeholder="Enter declaration content..."
                                        className="w-full min-h-[120px] resize-none"
                                    />

                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Default Onboarding Templates</Label>
                                <Select value={formData.defaultOnboardingTemplates} onValueChange={(value) => handleInputChange('defaultOnboardingTemplates', value)}>
                                    <SelectTrigger className="md:w-[270px] w-full h-[40px]">
                                        <SelectValue placeholder="Select Template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="template1">Standard Template</SelectItem>
                                        <SelectItem value="template2">Comprehensive Template</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Onboarding Configuration Section */}
                    <div>
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Onboarding Configuration</p>
                        <div className="space-y-6 mt-[16px]">
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Default Onboarding Checklist Template</Label>
                                <div className="space-y-3 mt-[6px]">
                                    {formData.onboardingChecklist.map((item, index) => (
                                        <div key={item.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={item.checked}
                                                onCheckedChange={(checked) => handleChecklistChange(index, checked as boolean)}
                                            />
                                            <Label className='text-[13px]/[21px] text-[#353535]'>{item.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#1c1c1c]'>Select Default Training Learning Path</Label>
                                <div className="relative mt-[6px]">
                                    <Input
                                        value={formData.defaultTrainingPath}
                                        onChange={(e) => handleInputChange('defaultTrainingPath', e.target.value)}
                                        placeholder="New Employee Onboarding Videos"
                                        className="w-full h-[40px] pl-10"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>What benefits does new hires have? (can be overwritten per hire)</Label>
                                <div className="space-y-3 mt-[6px]">
                                    {formData.benefits.map((benefit, index) => (
                                        <div key={benefit.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={benefit.checked}
                                                onCheckedChange={(checked) => handleBenefitChange(index, checked as boolean)}
                                            />
                                            <Label className='text-[13px]/[21px] text-[#353535]'>{benefit.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Onboarding Activities</Label>
                                <div className="space-y-3 mt-[6px]">
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-[#EEF3F2]">
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">Activities</th>
                                                    <th className="w-12 py-3 px-4 border-b border-gray-200"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.activities.map((doc, index) => (
                                                    <tr key={doc.id} className="bg-white border-b border-gray-100 last:border-b-0">
                                                        <td className="py-4 px-4">
                                                            <p className='text-[12px]/[22px] text-[#4b4b4b]'>{doc.name}</p>
                                                        </td>
                                                        <td className="py-4 px-4 text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-8 w-8 p-0 hover:bg-gray-100"
                                                                    >
                                                                        <MoreVertical className="h-4 w-4 text-gray-500" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleRemoveActivity(index)}
                                                                        className="text-red-600 focus:text-red-600"
                                                                    >
                                                                        <X className="h-4 w-4 mr-2" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={handleAddActivity}
                                        className="text-[#0d978b] hover:text-[#0d978b]/80 hover:bg-[#0d978b]/5 p-0 h-auto font-normal"
                                        disabled={!newActivity.trim()}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add New
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'># of days for onboarding to be completed</Label>
                                <div className="w-[278px] h-[40px] relative">
                                    <Input
                                        value={formData.onboardingDays}
                                        onChange={(e) => handleInputChange('onboardingDays', parseInt(e.target.value))}
                                        className="w-full h-full"
                                    />
                                    <span className="text-[13px]/[21px] text-[#bcbcbc] absolute right-[12px] top-[50%] translate-y-[-50%]">days</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Onboarding Approval</Label>
                                <div className="space-y-3 mt-[6px]">
                                    <Select value={newApproval} onValueChange={handleAddApproval}>
                                        <SelectTrigger className="flex-1 md:w-[270px] w-full h-[40px]">
                                            <SelectValue placeholder="Choose Option(s)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Department Head">Department Head</SelectItem>
                                            <SelectItem value="Recruitment Manager">Recruitment Manager</SelectItem>
                                            <SelectItem value="HR Manager">HR Manager</SelectItem>
                                            <SelectItem value="CEO">CEO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.onboardingApprovals.map((approval, index) => (
                                            <Badge key={index} variant="secondary" className="bg-[#D6EEEC] text-[#0d978b]">
                                                {approval}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="ml-2 h-auto p-0 hover:bg-transparent"
                                                    onClick={() => handleRemoveApproval(index)}
                                                >
                                                    <X className="w-3 h-3 text-[#0d978b]" />
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Onboarding Documents Section */}
                    <div>
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Onboarding Documents</p>
                        <div className="space-y-6 mt-[16px]">
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Allow Background Checks</Label>
                                <RadioGroup
                                    value={formData.allowBackgroundChecks}
                                    onValueChange={(value) => handleInputChange('allowBackgroundChecks', value)}
                                    className="flex gap-6 mt-[6px]"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes-bg" />
                                        <Label htmlFor="yes-bg">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no-bg" />
                                        <Label htmlFor="no-bg">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Documents to be Issued by Company for Signing</Label>
                                <p className="text-[11px]/[20px] text-[#8f8f8f] mt-[4px]">What documents should the system send to the employee for e-signature or acknowledgment?</p>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-[#EEF3F2]">
                                                <th className="text-left py-3 px-4 text-sm font-medium text-[#8C8E8E] border-b border-gray-200">Document Name</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-[#8C8E8E] border-b border-gray-200">Signature?</th>
                                                <th className="w-12 py-3 px-4 border-b border-gray-200"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.companyDocuments.map((doc, index) => (
                                                <tr key={doc.id} className="bg-white border-b border-gray-100 last:border-b-0">
                                                    <td className="py-4 px-4">
                                                        <Input
                                                            value={doc.name}
                                                            onChange={(e) => {
                                                                const newDocs = [...formData.companyDocuments];
                                                                newDocs[index].name = e.target.value;
                                                                setFormData(prev => ({ ...prev, companyDocuments: newDocs }));
                                                            }}
                                                            className="border-gray-200 focus:border-[#0d978b] focus:ring-[#0d978b] bg-gray-50"
                                                            placeholder="Document name"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <SwitchWrapper>
                                                            <Switch
                                                                shape="square"
                                                                checked={doc.signatureRequired}
                                                                onCheckedChange={() => handleCompanyDocSignatureToggle(index)}
                                                                size="sm"
                                                            />
                                                        </SwitchWrapper>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                                                >
                                                                    <MoreVertical className="h-4 w-4 text-gray-500" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem
                                                                    onClick={() => handleRemoveCompanyDoc(index)}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <X className="h-4 w-4 mr-2" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={handleAddCompanyDoc}
                                    className="text-[#0d978b] hover:text-[#0d978b]/80 hover:bg-[#0d978b]/5 p-2 h-auto font-normal"
                                    disabled={!newCompanyDoc.trim()}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Documents to be Uploaded by Employee Section */}
                    <div>
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Documents to be Uploaded by Employee</p>
                        <div className="space-y-1 mt-[16px]">
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#EEF3F2]">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-[#8C8E8E] border-b border-gray-200">Document Name</th>
                                            <th className="text-right py-3 px-4 text-sm font-medium text-[#8C8E8E] border-b border-gray-200">Required</th>
                                            <th className="w-12 py-3 px-4 border-b border-gray-200"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.employeeDocuments.map((doc, index) => (
                                            <tr key={doc.id} className="bg-white border-b border-gray-100 last:border-b-0">
                                                <td className="py-4 px-4">
                                                    <Input
                                                        value={doc.name}
                                                        onChange={(e) => {
                                                            const newDocs = [...formData.employeeDocuments];
                                                            newDocs[index].name = e.target.value;
                                                            setFormData(prev => ({ ...prev, employeeDocuments: newDocs }));
                                                        }}
                                                        className="border-gray-200 focus:border-[#0d978b] focus:ring-[#0d978b] bg-gray-50"
                                                        placeholder="Document name"
                                                    />
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <SwitchWrapper>
                                                        <Switch
                                                            shape="square"
                                                            checked={doc.required}
                                                            onCheckedChange={() => handleEmployeeDocRequiredToggle(index)}
                                                            size="sm"
                                                        />
                                                    </SwitchWrapper>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                                            >
                                                                <MoreVertical className="h-4 w-4 text-gray-500" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={() => handleRemoveEmployeeDoc(index)}
                                                                className="text-red-600 focus:text-red-600"
                                                            >
                                                                <X className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Button
                                variant="ghost"
                                onClick={handleAddEmployeeDoc}
                                className="text-[#0d978b] hover:text-[#0d978b]/80 hover:bg-[#0d978b]/5 p-2 h-auto font-normal"
                                disabled={!newEmployeeDoc.trim()}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add New
                            </Button>
                        </div>
                    </div>

                    {/* Offboarding Settings Section */}
                    <div>
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Offboarding Settings</p>
                        <div className="space-y-6 mt-[16px]">
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Documents to be Issued on Offboarding</Label>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-[#EEF3F2]">
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">Document Name</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">Signature?</th>
                                                <th className="w-12 py-3 px-4 border-b border-gray-200"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.offboardingDocuments.map((doc, index) => (
                                                <tr key={doc.id} className="bg-white border-b border-gray-100 last:border-b-0">
                                                    <td className="py-4 px-4">
                                                        <Input
                                                            value={doc.name}
                                                            onChange={(e) => {
                                                                const newDocs = [...formData.offboardingDocuments];
                                                                newDocs[index].name = e.target.value;
                                                                setFormData(prev => ({ ...prev, offboardingDocuments: newDocs }));
                                                            }}
                                                            className="border-gray-200 focus:border-[#0d978b] focus:ring-[#0d978b] bg-gray-50"
                                                            placeholder="Document name"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <SwitchWrapper>
                                                            <Switch
                                                                shape="square"
                                                                checked={doc.signatureRequired}
                                                                onCheckedChange={() => handleOffboardingDocSignatureToggle(index)}
                                                                size="sm"
                                                            />
                                                        </SwitchWrapper>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                                                >
                                                                    <MoreVertical className="h-4 w-4 text-gray-500" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem
                                                                    onClick={() => handleRemoveOffboardingDoc(index)}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <X className="h-4 w-4 mr-2" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={handleAddOffboardingDoc}
                                    className="text-[#0d978b] hover:text-[#0d978b]/80 hover:bg-[#0d978b]/5 p-2 h-auto font-normal"
                                    disabled={!newOffboardingDoc.trim()}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Off-boarding Activities Section */}
                    <div>
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Off-boarding Activities</p>
                        <div className="space-y-1 mt-[16px]">
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#EEF3F2]">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">Activities</th>
                                            <th className="w-12 py-3 px-4 border-b border-gray-200"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.offboardingActivities.map((activity, index) => (
                                            <tr key={activity.id} className="bg-white border-b border-gray-100 last:border-b-0">
                                                <td className="py-4 px-4">
                                                    <Input
                                                        value={activity.name}
                                                        onChange={(e) => {
                                                            const newActivities = [...formData.offboardingActivities];
                                                            newActivities[index].name = e.target.value;
                                                            setFormData(prev => ({ ...prev, offboardingActivities: newActivities }));
                                                        }}
                                                        className="border-gray-200 focus:border-[#0d978b] focus:ring-[#0d978b] bg-gray-50"
                                                        placeholder="Activity name"
                                                    />
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                                            >
                                                                <MoreVertical className="h-4 w-4 text-gray-500" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={() => handleRemoveOffboardingActivity(index)}
                                                                className="text-red-600 focus:text-red-600"
                                                            >
                                                                <X className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Button
                                variant="ghost"
                                onClick={handleAddOffboardingActivity}
                                className="text-[#0d978b] hover:text-[#0d978b]/80 hover:bg-[#0d978b]/5 p-2 h-auto font-normal"
                                disabled={!newOffboardingActivity.trim()}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add New
                            </Button>
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

            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block w-64 p-6">
                <div className="space-y-4">
                    {sidebarItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full justify-start text-[#353535] hover:text-[#0d978b]"
                        >
                            {item.label}
                        </Button>
                    ))}
                    <div className="pt-4">
                        <Button
                            onClick={handleSaveChanges}
                            className="w-full bg-[#0d978b] hover:bg-[#0d978b]/90"
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
