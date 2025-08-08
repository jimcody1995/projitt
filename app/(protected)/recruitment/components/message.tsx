import { Dialog, DialogContent, div, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactQuill from 'react-quill-new';
import { useRef } from "react";
import { Redo, Undo } from "lucide-react";

export default function Message({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const [message, setMessage] = useState('');
    const quillRef = useRef<ReactQuill | null>(null);
    const handleUndo = (): void => {
        const editor = quillRef.current?.getEditor();
        editor?.history.undo();
    };

    /**
     * Performs redo operation on Quill editor
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
                <DialogContent close={false} className="md:max-w-[830px] w-full">
                    <DialogTitle></DialogTitle>
                    <div>
                        <div className="flex justify-center">
                            <p className="text-[14px]/[22px]">Communications/<span className="text-[#0d978b]">Offer Rejection Template</span></p>
                        </div>
                        <div className="mt-[19px] flex justify-between">
                            <p className="text-[22px]/[30px] text-[#1c1c1c] font-bold">Message Title</p>
                            <Select value="smart">
                                <SelectTrigger className="w-[200px]" >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="smart">Insert Smart Text</SelectItem>
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
                                    <button className="ql-bold" />
                                    <button className="ql-italic" />
                                    <button className="ql-underline" />
                                    <button className="ql-align" value="" />
                                    <button className="ql-align" value="center" />
                                    <button className="ql-align" value="right" />
                                    <button className="ql-align" value="justify" />
                                    <button className="ql-link" />
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
                                <input type="checkbox" className="accent-[#0d978b]" />
                                <p className="text-[14px]/[20px] text-[#4b4b4b]">Update Template </p>
                            </div>
                            <Button className="w-[158px] h-[42px]" onClick={() => onOpenChange(false)}>Send Message</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}