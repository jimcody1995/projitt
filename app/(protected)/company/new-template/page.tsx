'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, ChevronDown, Undo, Redo, Smile } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useRouter } from 'next/navigation';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse rounded border" />
});

export default function CreateTemplate() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        templateName: 'Offer Letter',
        templateType: 'Employee Offer Letter',
        setAsDefault: false,
        content: `Hello <strong>FirstName</strong>,

Thank you for applying for the <strong>Job Title</strong> role at <strong>Company Name</strong>. We were impressed with your profile and would like to move forward by inviting you to the next stage of the hiring process.

Here are the interview details:
- Date: <strong>Interview Date</strong>
- Time: <strong>Interview Time</strong>
- Location/Link: <strong>InterviewLocationOrLink</strong>

Please confirm your availability by replying to this email or clicking the confirmation link below.

We're excited to learn more about you and discuss how you could contribute to our team.

Best regards,
HR Team`
    });
    const [disabled, setDisabled] = useState<boolean>(false);

    const quillRef = useRef<HTMLDivElement | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showEmojiPicker && !(event.target as Element).closest('.emoji-picker-container')) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiPicker]);
    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveTemplate = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Saving template:', formData);
            alert('Template saved successfully!');
        } catch (error) {
            console.error('Error saving template:', error);
            alert('Failed to save template. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const insertEmoji = (emoji: { native: string }): void => {
        // Since we can't access the editor directly without ref, we'll append to the message
        setFormData(prev => ({ ...prev, content: prev.content + emoji.native }));
        // Access the ReactQuill editor through the DOM
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
     * Performs undo operation on Quill editor
     */
    const handleUndo = (): void => {
        // Simplified undo - in a real implementation, you might want to use a different approach
        // Access the ReactQuill editor through the DOM
        const quillEditor = quillRef.current?.querySelector('.ql-editor') as HTMLElement;
        if (quillEditor) {
            // Use document.execCommand for undo (fallback approach)
            document.execCommand('undo');
        }
    };

    /**
     * @description
     * Performs a redo operation on the ReactQuill editor.
     * It accesses the editor instance via the DOM and uses document.execCommand for redo.
     */
    const handleRedo = (): void => {
        // Access the ReactQuill editor through the DOM
        const quillEditor = quillRef.current?.querySelector('.ql-editor') as HTMLElement;
        if (quillEditor) {
            // Use document.execCommand for redo (fallback approach)
            document.execCommand('redo');
        }
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

    const smartTextOptions = [
        'FirstName',
        'LastName',
        'Job Title',
        'Company Name',
        'Interview Date',
        'Interview Time',
        'InterviewLocationOrLink',
        'Department',
        'Salary',
        'Start Date',
        'Manager Name',
        'HR Contact'
    ];

    const insertSmartText = (text: string) => {
        const quillEditor = quillRef.current?.querySelector('.ql-editor') as HTMLElement;
        if (quillEditor) {
            // Focus the editor first
            quillEditor.focus();

            // Get current selection or set to end of content
            const selection = window.getSelection();
            let range;

            if (selection && selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
            } else {
                range = document.createRange();
                range.selectNodeContents(quillEditor);
                range.collapse(false); // Move to end
            }

            // Insert the smart text with bold formatting
            const textNode = document.createTextNode(text);
            range.insertNode(textNode);

            // Apply bold formatting to the inserted text
            const boldRange = document.createRange();
            boldRange.setStartBefore(textNode);
            boldRange.setEndAfter(textNode);

            // Create a strong element and wrap the text
            const strong = document.createElement('strong');
            try {
                boldRange.surroundContents(strong);
            } catch (e) {
                // If surroundContents fails, try a different approach
                const parent = textNode.parentNode;
                if (parent) {
                    const strongElement = document.createElement('strong');
                    strongElement.appendChild(textNode);
                    parent.insertBefore(strongElement, textNode.nextSibling);
                }
            }

            // Move cursor after the inserted text
            const newRange = document.createRange();
            newRange.setStartAfter(textNode);
            newRange.setEndAfter(textNode);
            selection?.removeAllRanges();
            selection?.addRange(newRange);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <div className="">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[12px]/[20px] text-[#A5A5A5]"><span className="cursor-pointer " onClick={() => router.push('/company')}>Documents</span> <span className="text-[#0d978b]">/ Create Templates</span></p>
                        <p className="text-[24px]/[30px] font-semibold text-[#353535] mt-[4px]">Create Templates</p>
                    </div>
                    <Button
                        onClick={handleSaveTemplate}
                        className="bg-[#0d978b] hover:bg-[#0d978b]/90 text-white px-6 py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Template'}
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row mt-[21px]  bg-white rounded-lg overflow-hidden">
                {/* Left Panel - Template Settings */}
                <div className="lg:w-80 space-y-6 border-r border-[#e9e9e9]">
                    <div className="px-[32px] py-[24px] space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[14px]/[16px] font-medium text-gray-700">Template Name</Label>
                            <Input
                                value={formData.templateName}
                                onChange={(e) => handleInputChange('templateName', e.target.value)}
                                placeholder="Enter template name"
                                className="w-full h-[48px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Template Type</Label>
                            <Select value={formData.templateType} onValueChange={(value) => handleInputChange('templateType', value)}>
                                <SelectTrigger className="w-full h-[48px]">
                                    <SelectValue placeholder="Select template type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Employee Offer Letter">Employee Offer Letter</SelectItem>
                                    <SelectItem value="Interview Invitation">Interview Invitation</SelectItem>
                                    <SelectItem value="Rejection Letter">Rejection Letter</SelectItem>
                                    <SelectItem value="Welcome Email">Welcome Email</SelectItem>
                                    <SelectItem value="Onboarding Checklist">Onboarding Checklist</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={formData.setAsDefault}
                                    onCheckedChange={(checked) => handleInputChange('setAsDefault', checked)}
                                />
                                <Label className="text-sm font-medium text-gray-700">Set as Default</Label>
                            </div>
                            <p className="text-[14px]/[20px] text-[#787878]">
                                Set as Default makes a template the primary one used for that email use case unless manually changed during sending.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Template Editor */}
                <div className="flex-1 py-[24px] pl-[32px] pr-[41px]">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-[#787878] mb-4">
                                Customize your template below. Then, highlight the sections that change for each candidate (like title or compensation) and use the smart text drop-down to create fields that you can quickly update for each new hire.
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                                <span className='py-[4px] px-[8px] border border-[#e9e9e9] rounded-[4px] bg-[#f9f9f9]'>Smart Text Fields</span> will be populated later when you send out the document.
                            </p>
                        </div>

                        <div className="flex sm:items-center items-start justify-between sm:flex-row flex-col sm:gap-[14px] gap-2">
                            <Select onValueChange={insertSmartText}>
                                <SelectTrigger className="w-[310px] h-[32px] rounded-[4px]">
                                    <SelectValue placeholder="Insert Smart Text" />
                                </SelectTrigger>
                                <SelectContent>
                                    {smartTextOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                variant="outline"
                                className="text-[#0d978b] border-[#0d978b] hover:bg-[#0d978b] hover:text-white flex items-center gap-1 px-4 py-2 h-[32px]"
                            >
                                <Sparkles className="h-4 w-4 mr-2" />
                                Write with AI
                            </Button>
                        </div>

                        {/* Rich Text Editor */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden relative">
                            <div
                                id="custom-toolbar"
                                data-testid="custom-toolbar"
                                className="w-full flex justify-between flex-wrap !px-[16px] !py-[17px]"
                            >
                                <div className="flex sm:gap-[14px] items-center">
                                    <button className="ql-bold" />
                                    <button className="ql-italic" />
                                    <button className="ql-underline" />

                                    <button className="ql-align" value="" />
                                    <button className="ql-align" value="center" />
                                    <button className="ql-align" value="right" />
                                    <button className="ql-align" value="justify" />
                                    <button className="ql-link" />
                                    <button className="ql-list" value="ordered" data-testid="ordered-list-button" />
                                    <button className="ql-list" value="bullet" data-testid="unordered-list-button" />
                                    <button
                                        type="button"
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded"
                                        title="Insert emoji"
                                    >
                                        <Smile className="size-4 text-[#4b4b4b]" />
                                    </button>
                                </div>
                                <div className="flex sm:gap-[14px] items-center">
                                    <button type="button" onClick={handleUndo} data-testid="undo-button">
                                        <Undo className="text-[#4b4b4b]" />
                                    </button>
                                    <button type="button" onClick={handleRedo} data-testid="redo-button">
                                        <Redo className="text-[#4b4b4b]" />
                                    </button>
                                </div>
                            </div>
                            {showEmojiPicker && (
                                <div className="absolute z-50 mt-2 right-0 emoji-picker-container">
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
                                    value={formData.content}
                                    onChange={(value) => handleInputChange('content', value)}
                                    placeholder="Enter your template content here..."
                                    theme="snow"
                                    modules={modules}
                                    className="w-full h-[400px]"
                                    id="template-editor"
                                    data-testid="template-editor"
                                    readOnly={disabled}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
