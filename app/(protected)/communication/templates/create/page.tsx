'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import dynamic from 'next/dynamic';
import { Textarea } from '@/components/ui/textarea';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="min-h-[120px] bg-gray-50 animate-pulse rounded border" />
});

import { Redo, Smile, Undo, Lightbulb, SparklesIcon, X, Check, RotateCcw, Briefcase, CheckLine } from "lucide-react";

export default function CreateTemplatePage() {
    const router = useRouter();
    const [templateName, setTemplateName] = useState('New Hire Onboarding');
    const [useCase, setUseCase] = useState('Offer Letter');
    const [isDefault, setIsDefault] = useState(false);
    const [message, setMessage] = useState('Hello **FirstName** ,\n\nThank you for applying for the **Job Title** role at **Company Name**. We were impressed with your profile and would like to move forward by inviting you to the next stage of the hiring process.\n\nHere are the interview details:\nDate: **Interview Date**\nTime: **Interview Time**\nLocation/Link: **InterviewLocationOrLink**\n\nPlease confirm your availability by replying to this email or clicking the confirmation link below.\n\nWe\'re excited to learn more about you and discuss how you could contribute to our team.\n\nTalent Team, **Company Name**');
    const quillRef = useRef<HTMLDivElement | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showGenerateDialog, setShowGenerateDialog] = useState(false);
    const [showResultDialog, setShowResultDialog] = useState(false);
    const [selectedTone, setSelectedTone] = useState('inspirational');
    const [description, setDescription] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');

    /**
     * Inserts emoji at cursor position in Quill editor
     */
    const insertEmoji = (emoji: { native: string }): void => {
        setMessage(prev => prev + emoji.native);
        const quillEditor = quillRef.current?.querySelector('.ql-editor') as HTMLElement;
        if (quillEditor) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const textNode = document.createTextNode(emoji.native);
                range.insertNode(textNode);
                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            setShowEmojiPicker(false);
        }
    };

    /**
     * Performs an undo operation on the ReactQuill editor.
     */
    const handleUndo = (): void => {
        console.log('Undo functionality would be implemented here');
        const quillEditor = quillRef.current?.querySelector('.ql-editor') as HTMLElement;
        if (quillEditor) {
            document.execCommand('undo');
        }
    };

    /**
     * Performs a redo operation on the ReactQuill editor.
     */
    const handleRedo = (): void => {
        console.log('Redo functionality would be implemented here');
        const quillEditor = quillRef.current?.querySelector('.ql-editor') as HTMLElement;
        if (quillEditor) {
            document.execCommand('redo');
        }
    };

    const handleGenerateClick = () => {
        setShowGenerateDialog(true);
    };

    const handleGenerate = () => {
        // Simulate AI generation
        const sampleContent = `
            <h1>Senior Data Analyst Position Overview</h1>
            <p>We are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will transform complex data into actionable insights that drive business decisions.</p>
            <h3>Key Responsibilities:</h3>
            <ul>
                <li>Lead complex data analysis projects and develop comprehensive reporting solutions</li>
                <li>Build and maintain advanced statistical models and data visualization dashboards</li>
                <li>Collaborate with stakeholders to identify business needs and translate them into analytical solutions</li>
                <li>Mentor junior analysts and promote best practices in data analysis and visualization</li>
            </ul>
        `;
        setGeneratedContent(sampleContent);
        setShowGenerateDialog(false);
        setShowResultDialog(true);
    };

    const handleAcceptAndInsert = () => {
        setMessage(generatedContent);
        setShowResultDialog(false);
    };

    const handleTryAgain = () => {
        setShowResultDialog(false);
        setShowGenerateDialog(true);
    };

    const modules = {
        toolbar: {
            container: '#custom-toolbar',
        },
        history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true,
        },
    };

    const formats = [
        'bold', 'italic', 'underline', 'strike',
        'align', 'list', 'bullet',
        'link', 'color', 'background',
        'font', 'size', 'script',
        'indent', 'direction'
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="w-full sm:w-auto">
                        <p className="text-[12px]/[20px] text-gray-500 mb-1"><span className="cursor-pointer hover:text-[#0d978b]" onClick={() => router.push('/communication')}>Communication</span> <span className="text-[#353535]">/ Create Templates</span></p>
                        <h1 className="text-[20px]/[26px] sm:text-[24px]/[30px] font-semibold text-[#353535]">Create Templates</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <Button
                            variant="ghost"
                            className="h-[40px] sm:h-[42px] px-4 border-gray-300 text-[#353535] text-[14px]/[20px] hover:bg-gray-50 font-semibold w-full sm:w-auto"
                        >
                            Save as Draft
                        </Button>
                        <Button className="bg-[#0D978B] hover:bg-teal-700 text-white h-[40px] sm:h-[42px] rounded-[8px] text-[14px]/[20px] px-4 font-semibold w-full sm:w-auto">
                            Publish Template
                        </Button>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 bg-white rounded-[12px] border border-[#E9E9E9]">
                {/* Left Column - Template Details */}
                <div className="lg:col-span-1">
                    <div className="p-4 sm:p-6">
                        {/* Template Name */}
                        <div className="mb-4">
                            <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-[6px]">
                                Template Name
                            </label>
                            <Input
                                type="text"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                className="w-full h-[40px] border border-[#BCBCBC] rounded-[8px] px-4 text-[14px]/[20px] text-[#4B4B4B]"
                                placeholder="Enter template name"
                            />
                        </div>

                        {/* Use Case */}
                        <div className="mb-4">
                            <label className="block text-[14px]/[16px] text-[#1C1C1C] mb-[6px]">
                                Use Case
                            </label>
                            <Select value={useCase} onValueChange={setUseCase}>
                                <SelectTrigger className="w-full h-[40px] border border-[#BCBCBC] rounded-[8px] px-4 text-[14px]/[20px] text-[#4B4B4B]">
                                    <SelectValue placeholder="Select use case" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Offer Letter">Offer Letter</SelectItem>
                                    <SelectItem value="Interview Invite">Interview Invite</SelectItem>
                                    <SelectItem value="Onboarding Welcome">Onboarding Welcome</SelectItem>
                                    <SelectItem value="Reference Request">Reference Request</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Set as Default */}
                        <div className="mb-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="default"
                                    checked={isDefault}
                                    onCheckedChange={(checked) => setIsDefault(checked === true)}
                                    className='w-4 h-4'
                                />
                                <label htmlFor="default" className="text-[14px]/[20px] text-[#4B4B4B]">
                                    Set as Default
                                </label>
                            </div>
                            <p className="text-[14px]/[20px] text-gray-600 mt-[14px]">
                                Set as Default makes a template the primary one used for that email use case unless manually changed during sending
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Message Editor */}
                <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-[#E9E9E9]">
                    <div className="p-4 sm:p-6">
                        {/* Smart Text Info */}
                        <div className="mb-[34px]">
                            <p className="text-[14px]/[20px] text-[#787878]">
                                Smart text fields lets you personalize your email templates, dynamic fields like ((EmployeeName)) will auto-fill with real data when the email is sent. Use the dropdown to insert them into your message.
                            </p>
                        </div>

                        {/* Message Title and Smart Text */}
                        <div className='border border-[#E9E9E9] bg-[#F9F9F9] rounded-[12px] p-0'>
                            <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-4">
                                <p className="text-[18px]/[24px] sm:text-[22px]/[30px] text-[#1c1c1c] font-bold" data-testid="message-title">Message Title</p>
                                <Select value="smart" data-testid="smart-text-select">
                                    <SelectTrigger className="w-full sm:w-[200px] h-[32px]" id="smart-text-select-trigger" data-testid="smart-text-select-trigger">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent data-testid="smart-text-select-content">
                                        <SelectItem value="smart" data-testid="smart-text-select-item">Insert Smart Text</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full ">
                                <div
                                    id="custom-toolbar"
                                    data-testid="custom-toolbar"
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center !px-4 sm:!px-6 bg-white border border-[#E9E9E9] !rounded-none !py-[12px] sm:!py-[16px] min-h-[80px] sm:min-h-[60px] gap-3 sm:gap-0"
                                >
                                    <div className="flex flex-wrap items-center min-w-0 gap-1 sm:gap-2">
                                        <button className="ql-bold w-4 h-4 " data-testid="bold-button" />
                                        <button className="ql-italic w-4 h-4 " data-testid="italic-button" />
                                        <button className="ql-underline w-4 h-4 " data-testid="underline-button" />
                                        <button className="ql-align w-4 h-4 " value="" data-testid="align-left-button" />
                                        <button className="ql-align w-4 h-4 " value="center" data-testid="align-center-button" />
                                        <button className="ql-align w-4 h-4 " value="right" data-testid="align-right-button" />
                                        <button className="ql-align w-4 h-4 " value="justify" data-testid="align-justify-button" />
                                        <button className="ql-link w-4 h-4 " data-testid="link-button" />
                                        <button className="ql-list w-4 h-4 " value="ordered" title="Ordered List" data-testid="ordered-list-button" />
                                        <button className="ql-list w-4 h-4 " value="bullet" title="Unordered List" data-testid="unordered-list-button" />
                                        <button
                                            type="button"
                                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                            className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded"
                                            title="Insert emoji"
                                        >
                                            <Smile className="size-4 text-[#4b4b4b]" />
                                        </button>
                                        <button type="button" onClick={handleUndo} data-testid="undo-button" className="w-4 h-4">
                                            <Undo className="text-[#4b4b4b] w-4 h-4" />
                                        </button>
                                        <button type="button" onClick={handleRedo} data-testid="redo-button" className="w-4 h-4">
                                            <Redo className="text-[#4b4b4b] w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center w-full sm:w-auto">
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-2 py-1 h-auto min-w-[106px] text-sm w-full sm:w-auto justify-center sm:justify-start"
                                            onClick={handleGenerateClick}
                                        >
                                            <SparklesIcon
                                                className="w-4 h-4 text-[#0D978B] mr-1"
                                            />
                                            <span
                                                className="font-medium bg-gradient-to-r from-[#0D978B] to-[#04312D] bg-clip-text text-transparent"
                                                style={{ background: 'linear-gradient(90deg, #0D978B 0%, #04312D 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                            >
                                                Write with AI
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                                {showEmojiPicker && (
                                    <div className="absolute z-50 mt-2">
                                        <Picker
                                            data={data}
                                            onEmojiSelect={insertEmoji}
                                            theme="light"
                                            set="native"
                                            previewPosition="none"
                                            skinTonePosition="none"
                                        />
                                    </div>
                                )}

                                <div ref={quillRef}>
                                    <ReactQuill
                                        value={message || ''}
                                        onChange={(value) => setMessage(value)}
                                        placeholder="Enter the job description..."
                                        theme="snow"
                                        modules={modules}
                                        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-white border border-[#E9E9E9]"
                                        id="job-description-editor"
                                        data-testid="job-description-editor"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Generate Dialog */}
            <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
                <DialogContent className="w-[95vw] max-w-[400px] min-h-[320px] sm:min-h-[290px] p-0 mx-auto" close={false}>
                    <DialogTitle className="text-[14px]/[16px] border-b border-[#E9E9E9] flex items-center justify-between p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                            <SparklesIcon
                                className="w-4 h-4 text-[#0D978B]"
                            />
                            <p className="text-[#353535] font-semibold text-[14px]/[16px]">Generate</p>
                        </div>
                        <button
                            onClick={() => setShowGenerateDialog(false)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                            <X className="w-4 h-4 sm:w-3 sm:h-3 text-[#787878]" />
                        </button>
                    </DialogTitle>

                    <div className="space-y-4 p-3 sm:p-4">
                        {/* Tone Selection */}
                        <div className="space-y-3 mb-4">
                            <p className="text-[13px]/[16px] sm:text-[14px]/[18px] text-[#4B4B4B] font-medium">Select Tone:</p>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                <button
                                    onClick={() => setSelectedTone('formal')}
                                    className={`flex h-8 sm:h-6 items-center gap-1 sm:gap-2 px-3 sm:px-3 py-2 rounded-full text-[11px]/[14px] sm:text-[12px]/[16px] font-medium transition-colors ${selectedTone === 'formal'
                                        ? 'bg-[#0D978B] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <span className="text-[14px] sm:text-[12px]">✍️</span>
                                    <span className="hidden sm:inline">Formal</span>
                                    <span className="sm:hidden">Formal</span>
                                </button>
                                <button
                                    onClick={() => setSelectedTone('friendly')}
                                    className={`flex h-8 sm:h-6 items-center gap-1 sm:gap-2 px-3 sm:px-3 py-2 rounded-full text-[11px]/[14px] sm:text-[12px]/[16px] font-medium transition-colors ${selectedTone === 'friendly'
                                        ? 'bg-[#0D978B] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <span className="text-[14px] sm:text-[12px]">😎</span>
                                    <span className="hidden sm:inline">Friendly</span>
                                    <span className="sm:hidden">Friendly</span>
                                </button>
                                <button
                                    onClick={() => setSelectedTone('inspirational')}
                                    className={`flex h-8 sm:h-6 items-center gap-1 sm:gap-2 px-3 sm:px-3 py-2 rounded-full text-[11px]/[14px] sm:text-[12px]/[16px] font-medium transition-colors ${selectedTone === 'inspirational'
                                        ? 'bg-[#0D978B] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <span className="text-[14px] sm:text-[12px]">💪</span>
                                    <span className="hidden sm:inline">Inspirational</span>
                                    <span className="sm:hidden">Inspire</span>
                                </button>
                            </div>
                        </div>

                        {/* Description Input */}
                        <div className="space-y-2">
                            <p className="text-[13px]/[16px] sm:text-[14px]/[18px] text-[#4B4B4B] font-medium">Description:</p>
                            <Textarea
                                placeholder="Describe the type of template you want to create"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-[80px] sm:h-[100px] border border-gray-200 rounded-[8px] shadow-none resize-none px-3 py-2 text-[13px]/[18px] sm:text-[14px]/[20px] text-[#4B4B4B] focus:border-[#0D978B] focus:ring-1 focus:ring-[#0D978B] focus:outline-none"
                            />
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={handleGenerate}
                            className="w-full h-[44px] sm:h-[42px] bg-[#0D978B] hover:bg-[#0D978B]/90 text-white text-[14px]/[20px] font-semibold rounded-[8px] mt-4"
                        >
                            Generate Template
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Result Dialog */}
            <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
                <DialogContent className="w-[95vw] max-w-[405px] max-h-[450px] sm:max-h-[400px] !rounded-[16px] p-0 mx-auto" close={false}>
                    <div >
                        {/* Generated Content */}
                        <div className="max-h-[300px] sm:max-h-[400px] p-3 sm:p-4 lg:p-6 overflow-y-auto border-b border-[#E9E9E9]">
                            <div
                                className="prose prose-sm max-w-none text-[13px]/[18px] sm:text-[14px]/[20px] text-[#4B4B4B]"
                                dangerouslySetInnerHTML={{ __html: generatedContent }}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 p-3 sm:p-4">
                            <Button
                                variant="ghost"
                                onClick={handleAcceptAndInsert}
                                className="flex items-center justify-center gap-2 text-[#0D978B] sm:border-r border-b sm:border-b-0 border-[#E9E9E9] font-medium text-[13px]/[18px] sm:text-[14px]/[20px] h-[44px] sm:h-auto py-3 sm:py-2"
                            >
                                <CheckLine className="w-4 h-4" />
                                <span className="hidden sm:inline">Accept & Insert</span>
                                <span className="sm:hidden">Accept & Insert</span>
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleTryAgain}
                                className="flex items-center justify-center gap-2 font-medium text-[13px]/[18px] sm:text-[14px]/[20px] h-[44px] sm:h-auto py-3 sm:py-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span className="hidden sm:inline">Try again</span>
                                <span className="sm:hidden">Try again</span>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>


    );
}
