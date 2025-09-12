/**
 * JobDescription.tsx
 *
 * This component provides a job description editor with rich text capabilities,
 * AI-based content generation with selectable tone styles, and file attachments.
 * It uses react-quill for text editing and supports validation, undo/redo, and file management.
 */

import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useState, useRef, JSX, useEffect } from 'react';
import { CheckLine, Cloud, File, HardDrive, Link, Loader2, Redo, Undo, Smile, ChevronLeft } from 'lucide-react';
import data from '@emoji-mart/data';
import { ChevronRight } from 'lucide-react';

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-[400px] bg-gray-100 rounded animate-pulse"></div>
});
const Picker = dynamic(() => import('@emoji-mart/react'), { ssr: false });

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getFileFromServer, uploadMedia } from '@/api/media';
import { customToast } from '@/components/common/toastr';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSpinner from '@/components/common/loading-spinner';
import { getDescription } from '@/api/job-posting';

interface JobData {
    title: string;
    department_id: string;
    employment_type_id: string;
    no_of_job_opening: string;
    skill_ids: string[];
    location_type_id: number;
    state: string;
    country_id?: string;
    salary: string;
    deadline: Date;
    description: string;
    media?: Array<{
        id: number;
        unique_name: string;
        original_name: string;
        extension: string;
        size: string;
        base_url: string;
    }>;
}

interface JobDescriptionProps {
    jobData: JobData;
    setJobData: React.Dispatch<React.SetStateAction<JobData>>;
    errors?: Record<string, string>;
    triggerValidation?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

export default function JobDescription({
    jobData,
    setJobData,
    errors = {},
    triggerValidation = false,
    loading = false,
    disabled = false,
}: JobDescriptionProps): JSX.Element {
    const [selectedStyle, setSelectedStyle] = useState<string>('Formal');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [fileUploading, setFileUploading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [totalPgae, setTotalPgae] = useState<number>(1);
    const [files, setFiles] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const quillRef = useRef<HTMLDivElement | null>(null);
    const [isSelectFileFromServer, setIsSelectFileFromServer] = useState<boolean>(false);
    const [filesLoading, setFilesLoading] = useState<boolean>(false);
    const [loadingDescription, setLoadingDescription] = useState<boolean>(false);
    /**
     * Handles file input changes
     */
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const media = e.target.files;
        if (!media) return;
        const formData = new FormData();
        formData.append('media', media[0]);
        setFileUploading(true);
        try {
            const response = await uploadMedia(formData);
            console.log(response);
            if (response.data?.status && response.data?.data?.[0]?.id) {
                const mediaId = response.data.data[0].id;

                // Update job data with new media
                const newMedia = {
                    id: mediaId,
                    unique_name: response.data.data[0].unique_name,
                    original_name: response.data.data[0].original_name,
                    extension: response.data.data[0].extension,
                    size: response.data.data[0].size,
                    base_url: response.data.data[0].base_url
                };

                setJobData((prev: JobData) => ({
                    ...prev,
                    media: [...(prev.media || []), newMedia]
                }));
                customToast('Success', 'File uploaded successfully!', 'success');
            }
            setFileUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            customToast('Error', 'Error uploading file. Please try again.', 'error');
            setFileUploading(false);
        }
    };

    useEffect(() => {
        handleGetFileFromServer();
    }, [page]);

    const handleGetFileFromServer = async (): Promise<void> => {
        setFiles([]);
        setFilesLoading(true);
        const response = await getFileFromServer(page);
        if (response.data?.status && response.data?.data) {
            setFiles(response.data.data.data);
            setTotalPgae(response.data.data.last_page);
        }
        setFilesLoading(false);
    }

    useEffect(() => {
        handleGetLastDescription();
    }, []);

    const handleGetLastDescription = async (): Promise<void> => {
        setLoadingDescription(true)
        try {
            const response = await getDescription();
            if (response.data?.status && response.data?.data) {
                setJobData((prev: JobData) => ({ ...prev, description: response.data.data }));
            }
        } catch (error) {
            console.error('Error getting last description:', error);
            customToast('Error', 'Error getting last description. Please try again.', 'error');
        }
        finally {
            setLoadingDescription(false)
        }
    }

    /**
     * Inserts emoji at cursor position in Quill editor
     */
    const insertEmoji = (emoji: { native: string }): void => {
        // Since we can't access the editor directly without ref, we'll append to the message
        setJobData(prev => ({ ...prev, description: prev.description + emoji.native }));
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

    return (
        <div
            id="job-description-component"
            data-testid="job-description-component"
        >
            <h1
                className="text-[20px]/[30px] font-semibold text-[#353535]"
                id="job-description-title"
                data-testid="job-description-title"
            >
                Job Description
            </h1>

            <div className="flex justify-between mt-[34px] relative">
                {loading && (
                    <>
                        <Skeleton className="h-5 w-32" />
                        <div className="flex gap-[8px] items-center">
                            <Skeleton className="w-5 h-5" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    </>
                )}
                {!loading && (
                    <>
                        <p
                            className="text-[#1c1c1c] text-[14px]/[16px]"
                            id="job-description-label"
                            data-testid="job-description-label"
                        >
                            Job Description *
                        </p>

                        <div
                            className="flex gap-[8px] items-center cursor-pointer"
                            id="write-with-ai-group"
                            data-testid="write-with-ai-group"
                        >
                            <img
                                src="/images/icons/ai-line.png"
                                alt=""
                                className="w-[20px] h-[20px]"
                                id="ai-icon"
                                data-testid="ai-icon"
                            />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <p
                                        className="text-[14px]/[16px] text-[#0d978b]"
                                        id="write-with-ai-trigger"
                                        data-testid="write-with-ai-trigger"
                                    >
                                        Write with AI
                                    </p>
                                </DialogTrigger>
                                <DialogTitle />
                                <DialogContent
                                    className="w-[90%] md:w-[406px]  pl-0 pr-0 pt-0 pb-0 !rounded-[16px]"
                                    id="ai-dialog"
                                    data-testid="ai-dialog"
                                >
                                    <div className="flex items-center gap-[8px] border-b border-[#e9e9e9] pb-[16px] pl-[18px] pt-[20px]">
                                        <img
                                            src="/images/icons/ai-line.png"
                                            alt=""
                                            className="w-[18px] h-[18px]"
                                        />
                                        <p className="text-[14px]/[16px] text-[#353535]">Generate</p>
                                    </div>
                                    <div className="px-[15px] py-[12px]">
                                        <div className="flex gap-[8px] items-center flex-wrap">
                                            {['✍️ Formal', '😎 Friendly', '💪 Inspirational'].map(style => (
                                                <span
                                                    key={style}
                                                    className={`px-[12px] py-[4px] rounded-[21px] cursor-pointer text-[12px]/[16px] text-[#626262] ${selectedStyle === style
                                                        ? 'bg-[#0d978b] text-[#fff]'
                                                        : 'bg-[#e9e9e9]'
                                                        }`}
                                                    onClick={() => setSelectedStyle(style)}
                                                    id={`ai-tone-${style.toLowerCase()}`}
                                                    data-testid={`ai-tone-${style.toLowerCase()}`}
                                                >
                                                    {style}
                                                </span>
                                            ))}
                                        </div>
                                        <textarea
                                            className="w-full h-[140px] mt-[12px] focus:outline-none focus:ring-0 focus:border-none"
                                            placeholder="Enter any additional context"
                                            id="ai-context-textarea"
                                            data-testid="ai-context-textarea"
                                        />
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="mt-[12px] w-full h-[42px] font-semibold text-[14px]/[20px]"
                                                    id="ai-generate-button"
                                                    data-testid="ai-generate-button"
                                                >
                                                    Generate
                                                </Button>
                                            </DialogTrigger>
                                            <DialogTitle />
                                            <DialogContent close={false} className="w-[90%] md:w-[406px] px-0 pt-[16px] pb-0 !rounded-[16px] ">
                                                <div className='h-[300px] overflow-y-auto  px-[18px]'>
                                                    <p className='text-[12px]/[24px] font-bold text-[#353535]'>Senior Data Analyst Position Overview</p>
                                                    <p className='text-[12px]/[24px] text-[#353535]'>We are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will transform complex data into actionable insights that drive business decisions.</p>
                                                </div>
                                                <div className='py-[16.5px] px-[49.5px] grid grid-cols-2'>
                                                    <div className='text-[#0d978b] flex items-center gap-[8px] justify-center text-[14px]/[16px] border-r border-[#e9e9e9] cursor-pointer'><CheckLine className='size-[20px]' /> Accept & Insert</div>
                                                    <div className='text-[#4b4b4b] flex items-center gap-[8px] justify-center text-[14px]/[16px] cursor-pointer'><Redo className='size-[20px]' /> Try again</div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-[12px]">
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

                {loading || loadingDescription ? (
                    <Skeleton className="w-full h-[400px] rounded-[12px]" />
                ) : (
                    <div ref={quillRef}>
                        <ReactQuill
                            value={jobData.description || ''}
                            onChange={(value) => setJobData({ ...jobData, description: value })}
                            placeholder="Enter the job description..."
                            theme="snow"
                            modules={modules}
                            className="w-full h-[400px] rounded-[12px]"
                            id="job-description-editor"
                            data-testid="job-description-editor"
                            readOnly={disabled}
                        />
                    </div>
                )}

                {triggerValidation && errors.description && (
                    <span
                        className="text-red-500 text-xs"
                        id="job-description-error"
                        data-testid="job-description-error"
                    >
                        {errors.description}
                    </span>
                )}

                <input
                    id="fileInput"
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    data-testid="job-description-file-input"
                    disabled={disabled}
                />

                {/* Attachment container moved below HTML editor */}
                {jobData.media && jobData.media.length > 0 && (
                    <div
                        className="flex flex-wrap gap-2 mt-4 p-4 border border-[#e9e9e9] rounded-[12px] bg-[#FAFAFA]"
                        id="file-list"
                        data-testid="job-description-file-list"
                    >
                        <div className="w-full mb-2">
                            <h4 className="text-sm font-medium text-[#4b4b4b]">Attached Files:</h4>
                        </div>
                        {jobData.media?.map((media, index) => (
                            <div
                                key={`media-${media.id}`}
                                className="flex items-center min-w-[210px] justify-between border-[#e9e9e9] bg-white px-[16px] py-[12px] border rounded-[6.52px] shadow-sm"
                                id={`job-description-media-${media.id}`}
                                data-testid={`job-description-media-${media.id}`}
                            >
                                <div className="flex items-center">
                                    <File className="size-[16px] text-[#0d978b]" />
                                    <span className="text-sm truncate max-w-[200px] ml-[5px]">
                                        {media.original_name}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        setJobData((prev: JobData) => ({
                                            ...prev,
                                            media: prev.media?.filter((_, i) => i !== index) || []
                                        }));
                                    }}
                                    className="ml-2 text-[#4b4b4b] cursor-pointer hover:text-red-500 transition-colors"
                                    id={`remove-media-${media.id}`}
                                    data-testid={`remove-media-${media.id}`}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-between items-center mt-[70px]">
                        <Skeleton className="h-10 w-32" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-5 w-40" />
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex justify-between items-center mt-6"
                    >
                        <Dialog>
                            <DialogTrigger asChild>
                                <button
                                    type="button"
                                    className="flex items-center gap-[4px] text-[#4b4b4b]"
                                    id="attach-files-button"
                                    data-testid="attach-files-button"
                                    disabled={disabled}
                                >
                                    <Link className="size-[16px]" />
                                    <span className="text-[14px]/[20px]">Attach Files</span>
                                </button>
                            </DialogTrigger>
                            <DialogTitle />
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Attach Files</DialogTitle>
                                </DialogHeader>
                                <div className='flex gap-[10px] w-full mt-[10px]'>
                                    <button className='flex flex-col w-full items-center gap-[10px] border-[#717171] border-dashed border rounded-[6.52px] py-[10px] hover:border-[#0d978b] hover:bg-[#dcfffc] cursor-pointer' onClick={() => { fileInputRef.current?.click() }}>
                                        <HardDrive className="size-[25px] text-[#0d978b]" />
                                        <span className="text-[14px]/[20px] text-[#4b4b4b]">{fileUploading ? <><Loader2 className="size-[20px] animate-spin" /></> : 'From Local'}</span>
                                    </button>
                                    <button className='flex flex-col w-full items-center gap-[10px] border-[#717171] border-dashed border rounded-[6.52px] py-[10px] hover:border-[#0d978b] hover:bg-[#dcfffc] cursor-pointer' onClick={() => { setIsSelectFileFromServer(true) }}>
                                        <Cloud className="size-[25px] text-[#0d978b]" />
                                        <span className="text-[14px]/[20px] text-[#4b4b4b]">From Server</span>
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isSelectFileFromServer} onOpenChange={setIsSelectFileFromServer}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Select File from the server</DialogTitle>
                                </DialogHeader>
                                <div className='flex flex-col gap-[10px] w-full mt-[10px]'>
                                    {filesLoading ? <LoadingSpinner content='Loading files...' /> : files.map((file) => (
                                        <div key={file.id} className='flex items-center gap-[10px] cursor-pointer border border-[#e9e9e9] rounded-[6.52px] px-[10px] py-[5px] hover:border-[#0d978b] hover:bg-[#dcfffc]' onClick={() => { setJobData((prev: JobData) => ({ ...prev, media: [...(prev.media || []), file] })); setIsSelectFileFromServer(false) }}>
                                            <File className="size-[16px] text-[#0d978b]" />
                                            <span>{file.original_name}</span>
                                        </div>
                                    ))}
                                    <div className='flex justify-center gap-[10px] items-center mt-[10px]'>
                                        <Button variant='outline' onClick={() => { setPage(page - 1) }} disabled={page === 1}><ChevronLeft className="size-[16px]" /></Button>
                                        <Button variant='outline'>Page {page} of {totalPgae}</Button>
                                        <Button variant='outline' onClick={() => { setPage(page + 1) }} disabled={page === totalPgae}><ChevronRight className="size-[16px]" /></Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <div className="gap-[4px] flex items-center">
                            <input
                                type="checkbox"
                                className="accent-[#0d978b] size-[13px]"
                                id="default-template-checkbox"
                                data-testid="default-template-checkbox"
                            />
                            <p className="text-[14px]/[20px] text-[#4b4b4b]">
                                Set as default template
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
