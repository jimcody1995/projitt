import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useState, useRef } from 'react';
import { File, Link, Redo, Undo } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function JobDescription({ jobData, setJobData, errors = {}, triggerValidation = false }: any) {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedStyle, setSelectedStyle] = useState<string>('Formal');
    const quillRef = useRef<ReactQuill | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const removeFile = (index: number) => {
        const updated = [...files];
        updated.splice(index, 1);
        setFiles(updated);
    };

    const handleUndo = () => {
        const editor = quillRef.current?.getEditor();
        editor?.history.undo();
    };

    const handleRedo = () => {
        const editor = quillRef.current?.getEditor();
        editor?.history.redo();
    };

    const modules = {
        toolbar: {
            container: "#custom-toolbar"
        },
        history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true
        }
    };

    return (
        <div>
            <h1 className="text-[20px]/[30px] font-semibold text-[#353535]">Job Description</h1>

            <div className="flex justify-between mt-[34px]">
                <p className="text-[#1c1c1c] text-[14px]/[16px]">Job Description *</p>
                <div className="flex gap-[8px] items-center cursor-pointer">
                    <img src="/images/icons/ai-line.png" alt="" className="w-[20px] h-[20px]" />
                    <Dialog>
                        <DialogTrigger asChild>
                            <p className="text-[14px]/[16px] text-[#0d978b]">Write with AI</p>
                        </DialogTrigger>
                        <DialogTitle></DialogTitle>
                        <DialogContent className="w-[406px] pl-0 pr-0 pt-0">
                            <div className='flex items-center gap-[8px] border-b border-[#e9e9e9] pb-[16px] pl-[18px] pt-[20px]'>
                                <img src="/images/icons/ai-line.png" alt="" className="w-[18px] h-[18px]" />
                                <p className="text-[14px]/[16px] text-[#353535]">Generate</p>
                            </div>
                            <div className='px-[15px] py-[12px]'>
                                <div className='flex gap-[8px] items-center'>
                                    <span className={`px-[12px] py-[4px] rounded-[21px] cursor-pointer text-[12px]/[16px] text-[#626262] ${selectedStyle === 'Formal' ? 'bg-[#0d978b] text-[#fff]' : 'bg-[#e9e9e9]'}`} onClick={() => setSelectedStyle('Formal')}>Formal</span>
                                    <span className={`px-[12px] py-[4px] rounded-[21px] cursor-pointer text-[12px]/[16px] text-[#626262] ${selectedStyle === 'Friendly' ? 'bg-[#0d978b] text-[#fff]' : 'bg-[#e9e9e9]'}`} onClick={() => setSelectedStyle('Friendly')}>Friendly</span>
                                    <span className={`px-[12px] py-[4px] rounded-[21px] cursor-pointer text-[12px]/[16px] text-[#626262] ${selectedStyle === 'Inspirational' ? 'bg-[#0d978b] text-[#fff]' : 'bg-[#e9e9e9]'}`} onClick={() => setSelectedStyle('Inspirational')}>Inspirational</span>
                                </div>
                                <textarea className='w-full h-[200px] mt-[12px] focus:outline-none focus:ring-0 focus:border-none ' placeholder='Enter any additional context' />
                                <Button className='mt-[12px] w-full h-[42px] font-semibold text-[14px]/[20px] ' >Generate</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="mt-[12px]">
                <div id="custom-toolbar" className='w-full flex justify-between'>
                    <div className='flex sm:gap-[14px] items-center'>
                        <button className="ql-bold" />
                        <button className="ql-italic" />
                        <button className="ql-underline" />
                        <button className="ql-align" value="" />
                        <button className="ql-align" value="center" />
                        <button className="ql-align" value="right" />
                        <button className="ql-align" value="justify" />
                        <button className="ql-link" />
                    </div>
                    <div className='flex sm:gap-[14px] items-center'>
                        <button type="button" onClick={handleUndo}><Undo className='text-[#4b4b4b]' /></button>
                        <button type="button" onClick={handleRedo}><Redo className='text-[#4b4b4b]' /></button>
                    </div>
                </div>
                <ReactQuill
                    ref={quillRef}
                    value={jobData.description || ''}
                    onChange={(value) => setJobData({ ...jobData, description: value })}
                    placeholder="Enter the job description..."
                    theme="snow"
                    modules={modules}
                    className="w-full h-[400px] rounded-[12px]"
                />
                {triggerValidation && errors.description && (
                    <span className="text-red-500 text-xs ">{errors.description}</span>
                )}

                <input
                    id="fileInput"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
                <div className="flex flex-wrap gap-2 ml-2 mt-[-15px] relative z-[10]">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center min-w-[210px] justify-between border-[#e9e9e9] bg-[#FAFAFA] px-[16px] py-[12px] border rounded-[6.52px]"
                        >
                            <div className='flex items-center'>
                                <File className='size-[16px] text-[#0d978b]' />
                                <span className="text-sm truncate max-w-[200px] ml-[5px]">{file.name}</span>
                            </div>
                            <button
                                onClick={() => removeFile(index)}
                                className="ml-2 text-[#4b4b4b] cursor-pointer"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <div className={`flex justify-between items-center ${files.length > 0 ? 'mt-[20px]' : 'mt-[70px]'}`}>
                    <button
                        type="button"
                        onClick={() => document.getElementById('fileInput')?.click()}
                        className='flex items-center gap-[4px] text-[#4b4b4b] '
                    >
                        <Link className='size-[16px]' />
                        <span className='text-[14px]/[20px]'>Attach Files</span>
                    </button>
                    <div className='gap-[4px] flex items-center'>
                        <input type="checkbox" className='accent-[#0d978b] size-[13px]' />
                        <p className='text-[14px]/[20px] text-[#4b4b4b]'>Set as default template</p>
                    </div>
                </div>
            </div>
        </div >
    );
}
