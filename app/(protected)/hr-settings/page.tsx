'use client';

import { useState, useEffect, useRef } from 'react';
import Recruitment from './components/recruitment';
import Onboarding from './components/onboarding';
import Leave from './components/leave';
import Documents from './components/documents';
import Payroll from './components/users';

export default function HRSettings() {
    const [activeTab, setActiveTab] = useState('recruitment');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
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
    const [newRejectionReason, setNewRejectionReason] = useState('');
    const [newInterviewStage, setNewInterviewStage] = useState('');
    const [newJobApproval, setNewJobApproval] = useState('');
    const [newOfferApproval, setNewOfferApproval] = useState('');

    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0
    });
    const [activeSection, setActiveSection] = useState('recruitment');

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

    const handleEmailChange = (index: number, value: string) => {
        const newEmails = [...formData.candidateEmails];
        newEmails[index].email = value;
        setFormData(prev => ({ ...prev, candidateEmails: newEmails }));
    };

    const handleAddEmail = () => {
        if (newEmail.trim()) {
            setFormData(prev => ({
                ...prev,
                candidateEmails: [...prev.candidateEmails, { email: newEmail, active: false }]
            }));
            setNewEmail('');
        }
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

    const handleAddRejectionReason = () => {
        if (newRejectionReason.trim()) {
            setFormData(prev => ({
                ...prev,
                rejectionReasons: [...prev.rejectionReasons, newRejectionReason]
            }));
            setNewRejectionReason('');
        }
    };

    const handleRemoveRejectionReason = (index: number) => {
        const newReasons = formData.rejectionReasons.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, rejectionReasons: newReasons }));
    };

    const handleAddInterviewStage = () => {
        if (newInterviewStage.trim()) {
            setFormData(prev => ({
                ...prev,
                interviewStages: [...prev.interviewStages, newInterviewStage]
            }));
            setNewInterviewStage('');
        }
    };

    const handleRemoveInterviewStage = (index: number) => {
        const newStages = formData.interviewStages.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, interviewStages: newStages }));
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

    useEffect(() => {
        const activeTab = tabRefs.current[activeSection];
        if (activeTab) {
            const container = activeTab.parentElement;
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const tabRect = activeTab.getBoundingClientRect();
                setIndicatorStyle({
                    left: tabRect.left - containerRect.left,
                    width: tabRect.width
                });
            }
        }
    }, [activeSection]);

    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <h1 className="text-[24px]/[30px] font-semibold text-gray-900">HR Settings</h1>

            {/* Tabs */}
            <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px] mt-[20px] w-full overflow-x-auto relative'>
                <div className="flex items-center gap-[12px] relative">
                    <div
                        className="absolute bottom-0 h-[2px] bg-[#0d978b] transition-all duration-300 ease-in-out"
                        style={{
                            left: `${indicatorStyle.left}px`,
                            width: `${indicatorStyle.width}px`
                        }}
                    />
                    <div
                        ref={(el) => { tabRefs.current.recruitment = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'recruitment' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('recruitment')}
                    >
                        <p className='whitespace-nowrap'>Recruitment</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.documents = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'documents' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('documents')}
                    >
                        <p className='whitespace-nowrap'>Documents</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.onboarding = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'onboarding' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('onboarding')}
                    >
                        <p className='whitespace-nowrap'>Onboarding & Offboarding</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.leave = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'leave' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('leave')}
                    >
                        <p className='whitespace-nowrap'>Leave & Attendance</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.payroll = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'payroll' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('payroll')}
                    >
                        <p className='whitespace-nowrap'>Payroll</p>
                    </div>
                </div>
            </div>

            {activeSection === 'recruitment' && <Recruitment />}
            {activeSection === 'documents' && <Documents />}
            {activeSection === 'onboarding' && <Onboarding />}
            {activeSection === 'leave' && <Leave />}
            {activeSection === 'payroll' && <Payroll />}
        </div>
    );
}
