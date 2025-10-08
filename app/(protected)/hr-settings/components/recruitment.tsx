'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch, SwitchWrapper } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Edit, Trash2, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import TagInput from '@/components/ui/tag-input';

export default function Recruitment() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [activeSection, setActiveSection] = useState('candidate-settings');
    const [formData, setFormData] = useState({
        // Candidate Settings
        reconsiderationPeriod: 6,
        candidateEmails: [
            { email: 'hr@Zaid LLC.com', active: false },
            { email: 'hr@Zaid LLC.com', active: false }
        ],

        // Job Opening Settings
        allowRecruiterEdit: 'yes',
        autoReopenDays: 6,
        attachmentMandatory: {
            backfill: true,
            newHire: false,
            transfer: false
        },
        jobOpeningApprovals: ['Department Head', 'Recruitment Manager'],

        // Offer & Rejection
        rejectOfferTemplate: '',
        acceptOfferTemplate: '',
        offerAcceptanceByCandidate: 'yes',
        uploadSignedOfferCompulsory: 'yes',
        offerApprovals: ['Department Head', 'Recruitment Manager'],
        rejectionReasons: ['Continuing in the correct job', 'Offer came to late', 'Have got a better offer'],

        // Interview Settings
        interviewStages: ['Portfolio Review', 'Test', 'Phone Call']
    });

    const [newEmail, setNewEmail] = useState('');
    const [showAddEmailInput, setShowAddEmailInput] = useState(false);
    const [newJobApproval, setNewJobApproval] = useState('');
    const [newOfferApproval, setNewOfferApproval] = useState('');

    // Scroll spy functionality
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['candidate-settings', 'job-opening-settings', 'offer-rejection', 'interview-settings'];
            const scrollPosition = window.scrollY + 100; // Offset for better UX

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const elementPosition = element.offsetTop - 120; // Adjust offset to show section properly
            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
    };


    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleEmailToggle = (index: number) => {
        const newEmails = [...formData.candidateEmails];
        newEmails[index].active = !newEmails[index].active;
        setFormData(prev => ({ ...prev, candidateEmails: newEmails }));
    };


    const handleAddEmailFromInput = () => {
        if (newEmail.trim()) {
            setFormData(prev => ({
                ...prev,
                candidateEmails: [...prev.candidateEmails, { email: newEmail, active: false }]
            }));
            setNewEmail('');
            setShowAddEmailInput(false);
        }
    };

    const handleShowAddEmailInput = () => {
        setShowAddEmailInput(true);
    };

    const handleCancelAddEmail = () => {
        setNewEmail('');
        setShowAddEmailInput(false);
    };

    const handleRemoveEmail = (index: number) => {
        if (formData.candidateEmails.length > 1) {
            const newEmails = formData.candidateEmails.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, candidateEmails: newEmails }));
        }
    };


    const handleAddJobApproval = (value: string) => {
        if (value.trim()) {
            setFormData(prev => ({
                ...prev,
                jobOpeningApprovals: [...prev.jobOpeningApprovals, value]
            }));
            setNewJobApproval('');
        }
    };

    const handleRemoveJobApproval = (index: number) => {
        const newApprovals = formData.jobOpeningApprovals.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, jobOpeningApprovals: newApprovals }));
    };

    const handleAddOfferApproval = (value: string) => {
        if (value.trim()) {
            setFormData(prev => ({
                ...prev,
                offerApprovals: [...prev.offerApprovals, value]
            }));
        }
    };

    const handleRemoveOfferApproval = (index: number) => {
        const newApprovals = formData.offerApprovals.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, offerApprovals: newApprovals }));
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Saving HR settings:', formData);
            alert('HR Settings saved successfully!');
        } catch (error) {
            console.error('Error saving HR settings:', error);
            alert('Failed to save HR settings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const sidebarItems = [
        { id: 'candidate-settings', label: 'Candidate Settings' },
        { id: 'job-opening-settings', label: 'Job Opening Settings' },
        { id: 'offer-rejection', label: 'Offer & Rejection' },
        { id: 'interview-settings', label: 'Interview Settings' }
    ];

    return (
        <div className="flex flex-col lg:flex-row mt-[34px]">
            {/* Main Content */}
            <div className="flex-1">
                <div className="space-y-8 md:w-[504px] w-full">
                    {/* Candidate Settings Section */}
                    <div id="candidate-settings">
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Candidate Settings</p>
                        <div className="space-y-6 mt-[16px]">
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Reconsideration period after rejection</Label>
                                <div className="w-[278px] h-[40px] relative">
                                    <Input
                                        value={formData.reconsiderationPeriod}
                                        onChange={(e) => handleInputChange('reconsiderationPeriod', parseInt(e.target.value))}
                                        className="w-full h-full"
                                    />
                                    <span className="text-[13px]/[21px] text-[#bcbcbc] absolute right-[12px] top-[50%] translate-y-[-50%]">months</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Register emails for direct receipt of resumes through email</Label>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    {/* Table Header */}
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-[#EEF3F2]">
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">Email</th>
                                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">Activate</th>
                                                <th className="w-12 py-3 px-4 border-b border-gray-200"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.candidateEmails.map((emailData, index) => (
                                                <tr key={index} className="bg-white border-b border-gray-100 last:border-b-0">
                                                    <td className="py-4 px-4">
                                                        <p className='text-[13px]/[21px] text-[#353535]'>{emailData.email}</p>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <SwitchWrapper>
                                                            <Switch
                                                                shape="square"
                                                                checked={emailData.active}
                                                                onCheckedChange={() => handleEmailToggle(index)}
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
                                                                    onClick={() => handleRemoveEmail(index)}
                                                                    disabled={formData.candidateEmails.length <= 1}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Add Email Section */}
                                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                                        {!showAddEmailInput ? (
                                            <Button
                                                variant="ghost"
                                                onClick={handleShowAddEmailInput}
                                                className="text-[#0d978b] hover:text-[#0d978b]/80 hover:bg-[#0d978b]/5 p-0 h-auto font-normal"
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Email
                                            </Button>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <Input
                                                    value={newEmail}
                                                    onChange={(e) => setNewEmail(e.target.value)}
                                                    placeholder="Enter email address"
                                                    className="flex-1 border-gray-200 focus:border-[#0d978b] focus:ring-[#0d978b] bg-white"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleAddEmailFromInput();
                                                        } else if (e.key === 'Escape') {
                                                            handleCancelAddEmail();
                                                        }
                                                    }}
                                                    autoFocus
                                                />
                                                <Button
                                                    variant="ghost"
                                                    onClick={handleAddEmailFromInput}
                                                    className="text-[#0d978b] hover:text-[#0d978b]/80 hover:bg-[#0d978b]/5 p-2 h-auto font-normal"
                                                    disabled={!newEmail.trim()}
                                                >
                                                    Add
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    onClick={handleCancelAddEmail}
                                                    className="text-gray-500 hover:text-gray-700 p-2 h-auto font-normal"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Opening Settings Section */}
                    <div id="job-opening-settings">
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Job Opening Settings</p>
                        <div className="space-y-6 mt-[16px]">
                            <div className="space-y-2">
                                <Label>Allow Recruiter(s) to edit released Job Opening</Label>
                                <RadioGroup
                                    value={formData.allowRecruiterEdit}
                                    onValueChange={(value) => handleInputChange('allowRecruiterEdit', value)}
                                    className="flex gap-6 mt-[6px]"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes-edit" />
                                        <Label htmlFor="yes-edit">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no-edit" />
                                        <Label htmlFor="no-edit">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Auto-Reopen vacancy on early resignation</Label>
                                <div className="md:w-[278px] w-full h-[40px] flex items-center gap-2 relative mt-[6px]">
                                    <Input
                                        type="number"
                                        value={formData.autoReopenDays}
                                        onChange={(e) => handleInputChange('autoReopenDays', parseInt(e.target.value))}
                                        className="w-full h-full"
                                    />
                                    <span className="text-[13px]/[21px] text-[#bcbcbc] absolute right-[12px] top-[50%] translate-y-[-50%]">days</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Attachment mandatory while creating a job opening</Label>
                                <div className="flex gap-[26px] mt-[6px]">
                                    {[
                                        { key: 'backfill', label: 'Backfill' },
                                        { key: 'newHire', label: 'New Hire' },
                                        { key: 'transfer', label: 'Transfer' }
                                    ].map((option) => (
                                        <div key={option.key} className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={formData.attachmentMandatory[option.key as keyof typeof formData.attachmentMandatory]}
                                                onCheckedChange={(checked) =>
                                                    handleInputChange('attachmentMandatory', {
                                                        ...formData.attachmentMandatory,
                                                        [option.key]: checked
                                                    })
                                                }
                                            />
                                            <Label>{option.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Job Opening Approval(s)</Label>
                                <div className="space-y-3 mt-[6px]">
                                    <Select value={newJobApproval} onValueChange={handleAddJobApproval}>
                                        <SelectTrigger className="flex-1 md:w-[270px] w-full h-[40px]" >
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
                                        {formData.jobOpeningApprovals.map((approval, index) => (
                                            <Badge key={index} variant="secondary" className="bg-[#D6EEEC] text-[#0d978b] ">
                                                {approval}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="ml-2 h-auto p-0 hover:bg-transparent"
                                                    onClick={() => handleRemoveJobApproval(index)}
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

                    {/* Offer & Rejection Section */}
                    <div id="offer-rejection">
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Offer & Rejection</p>
                        <div className="space-y-6 mt-[16px]">
                            <div className="space-y-2">
                                <Label>Reject Offer Default Template</Label>
                                <Select value={formData.rejectOfferTemplate} onValueChange={(value) => handleInputChange('rejectOfferTemplate', value)}>
                                    <SelectTrigger className="md:w-[270px] w-full h-[40px]">
                                        <SelectValue placeholder="Select Template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="template1">Standard Rejection Template</SelectItem>
                                        <SelectItem value="template2">Professional Rejection Template</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Accept Offer Default Template</Label>
                                <Select value={formData.acceptOfferTemplate} onValueChange={(value) => handleInputChange('acceptOfferTemplate', value)}>
                                    <SelectTrigger className="md:w-[270px] w-full h-[40px]">
                                        <SelectValue placeholder="Select Template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="template1">Standard Acceptance Template</SelectItem>
                                        <SelectItem value="template2">Professional Acceptance Template</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Offer Acceptance/Rejection By Candidate</Label>
                                <RadioGroup
                                    value={formData.offerAcceptanceByCandidate}
                                    onValueChange={(value) => handleInputChange('offerAcceptanceByCandidate', value)}
                                    className="flex gap-6 mt-[6px]"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes-acceptance" />
                                        <Label htmlFor="yes-acceptance">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no-acceptance" />
                                        <Label htmlFor="no-acceptance">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label>Upload of signed offer letter compulsory</Label>
                                <RadioGroup
                                    value={formData.uploadSignedOfferCompulsory}
                                    onValueChange={(value) => handleInputChange('uploadSignedOfferCompulsory', value)}
                                    className="flex gap-6 mt-[6px]"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes-upload" />
                                        <Label htmlFor="yes-upload">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no-upload" />
                                        <Label htmlFor="no-upload">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label>Offer Approval(s)</Label>
                                <div className="space-y-3">
                                    <Select value={newOfferApproval} onValueChange={handleAddOfferApproval}>
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
                                        {formData.offerApprovals.map((approval, index) => (
                                            <Badge key={index} variant="secondary" className="bg-[#D6EEEC] text-[#0d978b] ">
                                                {approval}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="ml-2 h-auto p-0 hover:bg-transparent"
                                                    onClick={() => handleRemoveOfferApproval(index)}
                                                >
                                                    <X className="w-3 h-3 text-[#0d978b]" />
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Reasons for offer rejection</Label>
                                <p className="text-[11px]/[20px] text-[#8f8f8f] mt-[4px]">Create reasons for not joining for when a candidate rejects an offer.</p>
                                <div className="space-y-3 md:w-[413px] w-full">
                                    <TagInput
                                        tags={formData.rejectionReasons}
                                        setTags={(tags) => setFormData(prev => ({ ...prev, rejectionReasons: tags }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interview Settings Section */}
                    <div id="interview-settings">
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Interview Settings</p>
                        <div className="space-y-6 mt-[16px]">
                            <div className="space-y-2 mt-[6px]">
                                <Label>Interview Stages</Label>
                                <div className="space-y-3 md:w-[413px] w-full">
                                    <TagInput
                                        tags={formData.interviewStages}
                                        setTags={(tags) => setFormData(prev => ({ ...prev, interviewStages: tags }))}
                                    />
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

            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block w-64">
                <div className="sticky top-20 p-6">
                    <div className="space-y-4">
                        {sidebarItems.map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                onClick={() => scrollToSection(item.id)}
                                className={`w-full justify-start transition-colors duration-200 ${activeSection === item.id
                                    ? 'text-[#0d978b]'
                                    : 'text-[#353535] hover:text-[#0d978b]'
                                    }`}
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
        </div>
    );
}
