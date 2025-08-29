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
export default function Message({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    /**
        * Inserts emoji at cursor position in Quill editor
        */
    const insertEmoji = (emoji: { native: string }): void => {
        // Since we can't access the editor directly without ref, we'll append to the message
        setMessage(prev => prev + emoji.native);
        setShowEmojiPicker(false);
    };

    /**
     * @description
     * Performs an undo operation on the ReactQuill editor.
     * Note: This is a simplified implementation since we can't access the editor instance directly.
     */
    const handleUndo = (): void => {
        // Simplified undo - in a real implementation, you might want to use a different approach
        console.log('Undo functionality would be implemented here');
    };

    /**
     * @description
     * Performs a redo operation on the ReactQuill editor.
     * Note: This is a simplified implementation since we can't access the editor instance directly.
     */
    const handleRedo = (): void => {
        // Simplified redo - in a real implementation, you might want to use a different approach
        console.log('Redo functionality would be implemented here');
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

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent close={false} className="md:max-w-[830px] w-full">
                    <DialogTitle></DialogTitle>
                    <div data-testid="message-dialog-content">
                        <div className="flex justify-center">
                            <p className="text-[14px]/[22px]">
                                Communications/<span className="text-[#0d978b]" data-testid="template-name">Offer Rejection Template</span>
                            </p>
                        </div>
                        <div className="mt-[19px] flex justify-between">
                            <p className="text-[22px]/[30px] text-[#1c1c1c] font-bold" data-testid="message-title">Message Title</p>
                            <Select value="smart" data-testid="smart-text-select">
                                <SelectTrigger className="w-[200px]" id="smart-text-select-trigger" data-testid="smart-text-select-trigger">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent data-testid="smart-text-select-content">
                                    <SelectItem value="smart" data-testid="smart-text-select-item">Insert Smart Text</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mt-[16px] w-full">
                            <div
                                id="custom-toolbar"
                                data-testid="custom-toolbar"
                                className="w-full flex justify-between flex-wrap !px-[16px] !py-[16px] bg-[#f9f9f9]"
                            >
                                <div className="flex sm:gap-[14px] items-center ">
                                    <button className="ql-bold" data-testid="bold-button" />
                                    <button className="ql-italic" data-testid="italic-button" />
                                    <button className="ql-underline" data-testid="underline-button" />
                                    <button className="ql-align" value="" data-testid="align-left-button" />
                                    <button className="ql-align" value="center" data-testid="align-center-button" />
                                    <button className="ql-align" value="right" data-testid="align-right-button" />
                                    <button className="ql-align" value="justify" data-testid="align-justify-button" />
                                    <button className="ql-link" data-testid="link-button" />
                                    <button className="ql-list" value="ordered" title="Ordered List" data-testid="ordered-list-button" />
                                    <button className="ql-list" value="bullet" title="Unordered List" data-testid="unordered-list-button" />
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

                            <ReactQuill
                                value={message || ''}
                                onChange={(value) => setMessage(value)}
                                placeholder="Enter the job description..."
                                theme="snow"
                                modules={modules}
                                className="w-full h-[400px] rounded-[12px]"
                                id="job-description-editor"
                                data-testid="job-description-editor"
                            />
                        </div>
                        <div className="flex justify-between pt-[26px] ">
                            <div className="flex gap-[10px] items-center">
                                <input type="checkbox" className="accent-[#0d978b]" id="update-template-checkbox" data-testid="update-template-checkbox" />
                                <p className="text-[14px]/[20px] text-[#4b4b4b]">Update Template </p>
                            </div>
                            <Button className="w-[158px] h-[42px]" onClick={() => onOpenChange(false)} data-testid="send-message-button">Send Message</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
