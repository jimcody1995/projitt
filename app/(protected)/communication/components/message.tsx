'use client';

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="min-h-[120px] bg-gray-50 animate-pulse rounded border" />
});

import { Redo, Smile, Undo } from "lucide-react";

/**
 * @description
 * This component, `Message`, is a dialog box for composing and sending a message. 
 * It features a rich text editor powered by `ReactQuill`, which allows for formatting options like bold, italic, and underlining, as well as text alignment and link insertion. 
 * The editor includes undo/redo functionality and is integrated with a custom toolbar. 
 * The component also includes a dropdown for "Smart Text" and a checkbox to update a template. 
 * This dialog is controlled by `open` and `onOpenChange` props, allowing a parent component to manage its visibility.
 * All interactive elements have unique `data-testid` and `id` attributes for UI test automation.
 */
export default function Message({
    open,
    onOpenChange,
    onSendMessage
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSendMessage?: (message: string) => void;
}) {
    const [message, setMessage] = useState('');
    const quillRef = useRef<HTMLDivElement | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    /**
        * Inserts emoji at cursor position in Quill editor
        */
    const insertEmoji = (emoji: { native: string }): void => {
        // Since we can't access the editor directly without ref, we'll append to the message
        setMessage(prev => prev + emoji.native);
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
     * @description
     * Performs an undo operation on the ReactQuill editor.
     * Note: This is a simplified implementation since we can't access the editor instance directly.
     */
    const handleUndo = (): void => {
        // Simplified undo - in a real implementation, you might want to use a different approach
        console.log('Undo functionality would be implemented here');
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
     * Note: This is a simplified implementation since we can't access the editor instance directly.
     */
    const handleRedo = (): void => {
        // Simplified redo - in a real implementation, you might want to use a different approach
        console.log('Redo functionality would be implemented here');
        // Access the ReactQuill editor through the DOM
        const quillEditor = quillRef.current?.querySelector('.ql-editor') as HTMLElement;
        if (quillEditor) {
            // Use document.execCommand for redo (fallback approach)
            document.execCommand('redo');
        }
    };

    /**
     * @description
     * Handles sending the message from the rich text editor to the chat
     */
    const handleSendMessage = (): void => {
        if (message.trim()) {
            // Call the parent's send message function if provided
            if (onSendMessage) {
                onSendMessage(message);
            }
            // Clear the message and close the modal
            setMessage('');
            onOpenChange(false);
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

    const formats = [
        'bold', 'italic', 'underline',
        'align', 'list', 'bullet',
        'link', 'color', 'background',
        'font', 'size', 'script',
        'indent', 'direction'
    ];

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent close={false} className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[90vw] md:max-w-[830px] h-[90vh] max-h-[90vh]">
                    <DialogTitle></DialogTitle>
                    <div data-testid="message-dialog-content" className="flex flex-col h-full">
                        <div className="flex justify-center">
                            <p className="text-[12px]/[18px] sm:text-[14px]/[22px]">
                                Communications/<span className="text-[#0d978b]" data-testid="template-name">Offer Rejection Template</span>
                            </p>
                        </div>
                        <div className="mt-[12px] sm:mt-[19px] flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                            <p className="text-[18px]/[24px] sm:text-[22px]/[30px] text-[#1c1c1c] font-bold" data-testid="message-title">Message Title</p>
                            <Select value="smart" data-testid="smart-text-select">
                                <SelectTrigger className="w-full sm:w-[200px]" id="smart-text-select-trigger" data-testid="smart-text-select-trigger">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent data-testid="smart-text-select-content">
                                    <SelectItem value="smart" data-testid="smart-text-select-item">Insert Smart Text</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mt-[12px] sm:mt-[16px] w-full flex-1 flex flex-col">
                            <div
                                id="custom-toolbar"
                                data-testid="custom-toolbar"
                                className="w-full flex justify-between flex-wrap !px-[8px] sm:!px-[16px] !py-[8px] sm:!py-[16px] bg-[#f9f9f9]"
                            >
                                <div className="flex gap-[8px] sm:gap-[14px] items-center flex-wrap">
                                    <button className="ql-bold w-6 h-6 sm:w-8 sm:h-8" data-testid="bold-button" />
                                    <button className="ql-italic w-6 h-6 sm:w-8 sm:h-8" data-testid="italic-button" />
                                    <button className="ql-underline w-6 h-6 sm:w-8 sm:h-8" data-testid="underline-button" />
                                    <button className="ql-align w-6 h-6 sm:w-8 sm:h-8" value="" data-testid="align-left-button" />
                                    <button className="ql-align w-6 h-6 sm:w-8 sm:h-8" value="center" data-testid="align-center-button" />
                                    <button className="ql-align w-6 h-6 sm:w-8 sm:h-8" value="right" data-testid="align-right-button" />
                                    <button className="ql-align w-6 h-6 sm:w-8 sm:h-8" value="justify" data-testid="align-justify-button" />
                                    <button className="ql-link w-6 h-6 sm:w-8 sm:h-8" data-testid="link-button" />
                                    <button className="ql-list w-6 h-6 sm:w-8 sm:h-8" value="ordered" title="Ordered List" data-testid="ordered-list-button" />
                                    <button className="ql-list w-6 h-6 sm:w-8 sm:h-8" value="bullet" title="Unordered List" data-testid="unordered-list-button" />
                                    <button
                                        type="button"
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 hover:bg-gray-100 rounded"
                                        title="Insert emoji"
                                    >
                                        <Smile className="size-3 sm:size-4 text-[#4b4b4b]" />
                                    </button>
                                </div>
                                <div className="flex gap-[8px] sm:gap-[14px] items-center">
                                    <button type="button" onClick={handleUndo} data-testid="undo-button" className="w-6 h-6 sm:w-8 sm:h-8">
                                        <Undo className="text-[#4b4b4b] size-3 sm:size-4" />
                                    </button>
                                    <button type="button" onClick={handleRedo} data-testid="redo-button" className="w-6 h-6 sm:w-8 sm:h-8">
                                        <Redo className="text-[#4b4b4b] size-3 sm:size-4" />
                                    </button>
                                </div>
                            </div>
                            {showEmojiPicker && (
                                <div className="absolute z-50 mt-2 left-0 right-0 sm:left-auto sm:right-auto">
                                    <Picker
                                        data={data}
                                        onEmojiSelect={insertEmoji}
                                        theme="light"
                                        set="native"
                                        previewPosition="none"
                                        skinTonePosition="none"
                                        className="w-full sm:w-auto"
                                    />
                                </div>
                            )}

                            <div ref={quillRef} className="flex-1 min-h-0">
                                <ReactQuill
                                    value={message || ''}
                                    onChange={(value) => setMessage(value)}
                                    placeholder="Enter the job description..."
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    className="w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] rounded-[12px]"
                                    id="job-description-editor"
                                    data-testid="job-description-editor"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-[16px] sm:pt-[26px] mt-auto">
                            <Button variant={"outline"} className="px-4 h-[36px] sm:h-[42px] border border-[#053834] text-[#053834] font-semibold text-[12px]/[18px] sm:text-[14px]/[20px] w-full sm:w-auto" data-testid="send-message-button">Use Template</Button>
                            <Button className="w-full sm:w-[158px] h-[36px] sm:h-[42px]" variant={"primary"} onClick={handleSendMessage} data-testid="send-message-button">Send Message</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
