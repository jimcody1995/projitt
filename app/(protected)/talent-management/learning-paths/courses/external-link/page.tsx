'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExternalLink() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        url: 'https://youtube.com/xyz',
        title: '',
        duration: '',
        description: '',
        category: '',
    });
    const [tags, setTags] = useState(['Leadership', 'Team Management']);
    const [newTag, setNewTag] = useState('Effective Communical');
    const [isUrlValid, setIsUrlValid] = useState(true);

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

        // Validate URL
        if (field === 'url') {
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            setIsUrlValid(urlPattern.test(value));
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
                        <span className="text-[#0d978b]"> / External Link</span>
                    </p>
                    <p className="text-[24px]/[30px] font-semibold text-[#353535]">External Link</p>
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
                    {/* Paste Course URL */}
                    <div >
                        <Label htmlFor="url" className="text-[14px]/[20px] font-medium text-[#353535]">
                            Paste Course URL
                        </Label>
                        <div className="relative mt-[12px]">
                            <Input
                                id="url"
                                type="url"
                                value={formData.url}
                                onChange={(e) => handleInputChange('url', e.target.value)}
                                className="pr-[40px] h-[48px] text-[14px] bg-[#fafafa]"
                                placeholder="https://youtube.com/xyz"
                            />
                            {isUrlValid && formData.url && (
                                <Check className="absolute right-[12px] top-1/2 transform -translate-y-1/2 size-[20px] text-green-500" />
                            )}
                        </div>
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