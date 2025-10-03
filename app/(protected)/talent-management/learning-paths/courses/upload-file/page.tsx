'use client';
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus, FilePlus2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadFile() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        file: null as File | null,
        title: '',
        duration: '',
        description: '',
        category: '',
    });
    const [tags, setTags] = useState(['Leadership', 'Team Management']);
    const [newTag, setNewTag] = useState('Effective Communica');
    const [isDragOver, setIsDragOver] = useState(false);

    const categories = [
        'Leadership',
        'Design',
        'Team Management',
        'Product',
        'Technology',
        'Communication',
        'Project Management',
        'Sales',
        'Marketing',
        'Finance'
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (file: File) => {
        setFormData(prev => ({ ...prev, file }));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileChange(files[0]);
        }
    };

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileChange(files[0]);
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags(prev => [...prev, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleCreateCourse = () => {
        console.log('Creating course with data:', { ...formData, tags });
        // Add course creation logic here
    };

    return (
        <div className="w-full h-full">
            <div className="flex w-full justify-between items-center px-[8px] py-[6px]">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[12px]/[20px] text-[#A5A5A5]">
                        <span className="cursor-pointer" onClick={() => router.push('/talent-management/learning-paths')}>
                            Learning Paths
                        </span>
                        <span className="cursor-pointer" onClick={() => router.push('/talent-management/learning-paths/courses')}> / Courses / Create New Courses</span>
                        <span className="text-[#0d978b]"> / Upload Custom Video</span>
                    </p>
                    <p className="text-[24px]/[30px] font-semibold text-[#353535]">Upload File</p>
                </div>
                <Button
                    className="h-[48px] w-[157px] text-[16px]/[20px] bg-[#0d978b] hover:bg-[#0b7a6f]"
                    onClick={handleCreateCourse}
                >
                    Create Course
                </Button>
            </div>

            <div className="mt-[32px] max-w-[555px]">
                <div className="space-y-[24px]">
                    {/* Upload File */}
                    <div>
                        <Label className="text-[14px]/[20px] font-medium text-[#353535]">
                            Upload File
                        </Label>
                        <div
                            className={`mt-[12px] border-2 border-dashed rounded-[8px] p-[60px] text-center cursor-pointer transition-colors ${isDragOver
                                ? 'border-[#0d978b] bg-[#f0fdfa]'
                                : 'border-[#e9e9e9] hover:border-[#0d978b] hover:bg-[#f9f9f9]'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleFileInputClick}
                        >
                            <div className="flex  items-center justify-center gap-[16px]">
                                <FilePlus2 className="size-[48px] text-[#8f8f8f]" />
                                <div className="text-[14px] text-[#8f8f8f]">
                                    Drop file or <span className="text-[#0d978b] cursor-pointer">click to upload</span>
                                </div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept="video/*,.mp4,.avi,.mov,.wmv,.flv,.webm"
                                onChange={handleFileInputChange}
                            />
                        </div>
                        {formData.file && (
                            <div className="mt-[8px] text-[12px] text-[#0d978b]">
                                Selected: {formData.file.name}
                            </div>
                        )}
                    </div>

                    {/* Course Title */}
                    <div >
                        <Label htmlFor="title" className="text-[14px]/[20px] font-medium text-[#353535]">
                            Course Title
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="h-[48px] text-[14px] mt-[12px] bg-[#fafafa]"
                            placeholder="e.g Leadership Fundamentals"
                        />
                    </div>

                    {/* Estimated Duration */}
                    <div>
                        <Label htmlFor="duration" className="text-[14px]/[20px] font-medium text-[#353535]">
                            Estimated Duration
                        </Label>
                        <div className="flex items-center gap-[8px] mt-[12px] relative">
                            <Input
                                id="duration"
                                value={formData.duration}
                                onChange={(e) => handleInputChange('duration', e.target.value)}
                                className="h-[48px] text-[14px] w-full bg-[#fafafa]"
                                placeholder="30"
                            />
                            <span className="text-[14px] text-[#8f8f8f] absolute right-[12px] top-[50%] translate-y-[-50%]">mins</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-[8px]">
                        <Label htmlFor="description" className="text-[14px]/[20px] font-medium text-[#353535]">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="min-h-[100px] text-[14px] resize-none bg-[#fafafa]"
                            placeholder="Enter a brief purpose or scope"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-[8px]">
                        <Label htmlFor="category" className="text-[14px]/[20px] font-medium text-[#353535]">
                            Category
                        </Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                            <SelectTrigger className="h-[48px] text-[14px] bg-[#fafafa]">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tags */}
                    <div className="space-y-[8px]">
                        <Label className="text-[14px]/[20px] font-medium text-[#353535]">
                            Tags
                        </Label>
                        <div className="min-h-[100px] border border-[#e9e9e9] rounded-[8px] p-[8px] flex flex-wrap gap-[8px] items-start">
                            {/* Existing Tags */}
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="inline-flex items-center gap-[4px] bg-[#d6eeec] text-[#0d978b] px-[8px] py-[4px] rounded-[4px] text-[12px] font-medium"
                                >
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="hover:bg-[#0d978b] hover:text-white rounded-full p-[2px] transition-colors"
                                    >
                                        <X className="size-[12px]" />
                                    </button>
                                </div>
                            ))}

                            {/* New Tag Input */}
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onBlur={handleAddTag}
                                className="flex-1 min-w-[120px] outline-none text-[14px] placeholder:text-[#8f8f8f]"
                                placeholder="Type to add tags..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}