'use client';

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactQuill from 'react-quill-new';
import { Redo, Undo } from "lucide-react";

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
    const quillRef = useRef<ReactQuill | null>(null);

    /**
     * @description
     * Performs an undo operation on the ReactQuill editor.
     * It accesses the editor instance via the `quillRef` and calls the `undo()` method on the history module.
     */
    const handleUndo = (): void => {
        const editor = quillRef.current?.getEditor();
        editor?.history.undo();
    };

    /**
     * @description
     * Performs a redo operation on the ReactQuill editor.
     * It accesses the editor instance via the `quillRef` and calls the `redo()` method on the history module.
     */
    const handleRedo = (): void => {
        const editor = quillRef.current?.getEditor();
        editor?.history.redo();
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
                <DialogContent close={false} className="!w-[830px] max-w-[830px]">
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
                        <div className="mt-[16px]">
                            <div
                                id="custom-toolbar"
                                data-testid="custom-toolbar"
                                className="w-full flex justify-between flex-wrap"
                            >
                                <div className="flex sm:gap-[14px] items-center">
                                    <button className="ql-bold" data-testid="bold-button" />
                                    <button className="ql-italic" data-testid="italic-button" />
                                    <button className="ql-underline" data-testid="underline-button" />
                                    <button className="ql-align" value="" data-testid="align-left-button" />
                                    <button className="ql-align" value="center" data-testid="align-center-button" />
                                    <button className="ql-align" value="right" data-testid="align-right-button" />
                                    <button className="ql-align" value="justify" data-testid="align-justify-button" />
                                    <button className="ql-link" data-testid="link-button" />
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

                            <ReactQuill
                                ref={quillRef}
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
