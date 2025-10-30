'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreVertical, Mail, ListFilter, AlertTriangle, CircleAlert } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import EditMessage from './components/editMessage';
import PreviewMessage from './components/previewMessage';
import { FilterTool } from './components/filter';

interface Template {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'default' | 'draft';
}

const templates: Template[] = [
    {
        id: '1',
        title: 'Offer Letter',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown...',
        category: 'Offer Letter',
        status: 'default'
    },
    {
        id: '2',
        title: 'Offer Letter 2',
        description: 'Thank you for applying for the ((JobTitle)) role at ((CompanyName)). We were impressed with your profile and would like to move forward by inviting you to the next inviting you to the next..',
        category: 'Offer Letter',
        status: 'default'
    },
    {
        id: '3',
        title: 'New Hire Onboarding',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown...',
        category: 'Onboarding Welcome',
        status: 'default'
    },
    {
        id: '4',
        title: 'Reference Request',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown...',
        category: '',
        status: 'draft'
    },
    {
        id: '5',
        title: 'Interview Invite',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown...',
        category: 'Interview Invite',
        status: 'default'
    }
];

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
    const [showPreviewDialog, setShowPreviewDialog] = useState(false);
    const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);
    const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
    const [selectedDefaults, setSelectedDefaults] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const router = useRouter();
    const filteredTemplates = templates.filter(template => {
        // Search filter
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());

        // Use Case filter
        const matchesUseCase = selectedUseCases.length === 0 ||
            selectedUseCases.some(useCase => {
                switch (useCase) {
                    case 'onboarding':
                        return template.category.toLowerCase().includes('onboarding');
                    case 'offer-letter':
                        return template.category.toLowerCase().includes('offer');
                    case 'interview':
                        return template.category.toLowerCase().includes('interview');
                    case 'rejection':
                        return template.category.toLowerCase().includes('rejection');
                    case 'welcome':
                        return template.category.toLowerCase().includes('welcome');
                    case 'reminder':
                        return template.category.toLowerCase().includes('reminder');
                    default:
                        return true;
                }
            });

        // Default filter
        const matchesDefault = selectedDefaults.length === 0 ||
            selectedDefaults.some(defaultVal => {
                if (defaultVal === 'yes') {
                    return template.status === 'default';
                } else if (defaultVal === 'no') {
                    return template.status !== 'default';
                }
                return true;
            });

        return matchesSearch && matchesUseCase && matchesDefault;
    });

    const handleDeleteClick = (template: Template) => {
        setTemplateToDelete(template);
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        // Here you would typically make an API call to delete the template
        console.log('Deleting template:', templateToDelete?.title);
        setShowDeleteDialog(false);
        setTemplateToDelete(null);
    };

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false);
        setTemplateToDelete(null);
    };

    const handleEditTemplate = (template: Template) => {
        setShowEditDialog(true);
    };

    const handleDuplicateTemplate = (template: Template) => {
        setShowDuplicateDialog(true);
    };

    const handlePreviewTemplate = (template: Template) => {
        setShowPreviewDialog(true);
    };

    return (
        <div className=" bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[12px]/[20px] text-[#A5A5A5] mb-1"><span className="cursor-pointer hover:text-[#0d978b]" onClick={() => router.push('/communication')}>Communication</span> <span className="text-[#353535]">/ Templates</span></p>
                        <h1 className="text-[24px]/[30px] font-semibold text-[#353535]">Templates</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            className="bg-[#0D978B] hover:bg-teal-700 text-white text-[14px]/[20px] font-semibold px-4 py-2 h-[42px]"
                            onClick={() => router.push('/communication/templates/create')}
                        >
                            Create Template
                        </Button>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center gap-4">
                        <div className="relative flex-1 max-w-[172px]">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Search Templates"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-8 bg-gray-10 border-gray-200 focus:border-gray-300 focus:ring-0"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="h-8 text-[#053834] font-semibold text-[14px]/[20px] px-4 flex items-center gap-2 bg-transparent border border-gray-300"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <ListFilter className="w-4 h-4 text-[#053834]" />
                            Filter
                        </Button>
                    </div>

                    {/* Filter Tool - Show/Hide based on showFilters state */}
                    {showFilters && (
                        <div className="flex items-center gap-2">
                            <FilterTool
                                selectedUseCases={selectedUseCases}
                                selectedDefaults={selectedDefaults}
                                setSelectedUseCases={setSelectedUseCases}
                                setSelectedDefaults={setSelectedDefaults}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                    <div key={template.id} className="bg-white rounded-[16px] border border-[#E9E9E9] p-6 hover:shadow-md transition-shadow">
                        {/* Card Header */}
                        <div className="flex justify-between items-center mb-[6px]">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-600" />
                                <h3 className="text-[16px]/[24px] font-medium text-gray-800">{template.title}</h3>
                            </div>
                            <div className="flex items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreVertical className="w-5 h-5 text-[#4B4B4B]" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[140px] rounded-[16px]">
                                        <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B]" onClick={() => handleEditTemplate(template)}>Edit Template</DropdownMenuItem>
                                        <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B]" >Duplicate</DropdownMenuItem>
                                        <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B]" onClick={() => handlePreviewTemplate(template)}>Preview</DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-[12px]/[18px] text-[#4B4B4B]"
                                            onClick={() => handleDeleteClick(template)}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-[#8F8F8F] text-[13px]/[20px] leading-relaxed mb-[18px] line-clamp-4">
                            {template.description}
                        </p>

                        {/* Footer */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                {template.category && (
                                    <span className="px-2.5 py-0.5 bg-[#D6EEEC] text-[#0D978B] text-[12px]/[20px]  rounded-full">
                                        {template.category}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {template.status === 'default' && (
                                    <span className="text-gray-700 text-[12px]/[20px]">Default</span>
                                )}
                                {template.status === 'draft' && (
                                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-800 text-[12px]/[20px] font-medium rounded-full">
                                        Draft
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or create a new template.</p>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                        Create Template
                    </Button>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="max-w-[354px]  py-6 px-0 max-h-[258px]  rounded-[12px]" close={false}>
                    <div className="flex flex-col items-center h-full">
                        {/* Warning Icon */}
                        <div className="w-10 h-10 bg-[#C3060633] rounded-full flex items-center justify-center mb-4.5">
                            <CircleAlert className="w-5 h-5 text-red-600" />
                        </div>

                        {/* Title */}
                        <h3 className="text-[16px]/[20px] font-medium text-gray-900 text-center mb-1">
                            Permanently Delete This Template
                        </h3>

                        {/* Warning Text */}
                        <p className="text-[14px]/[20px] text-gray-600 text-center mb-4.5">
                            This action cannot be undone!
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3 w-full justify-center">
                            <Button
                                variant="outline"
                                className="px-[26px] py-2 h-9 border-gray-300 text-gray-900 font-medium hover:bg-gray-50"
                                onClick={handleDeleteCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="px-[17.5px] py-2 h-9 bg-[#C30606] hover:bg-[#C30606]/80 text-white font-medium"
                                onClick={handleDeleteConfirm}
                            >
                                Yes, Delete
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {showEditDialog && <EditMessage open={showEditDialog} onOpenChange={setShowEditDialog} />}
            {showPreviewDialog && <PreviewMessage open={showPreviewDialog} onOpenChange={setShowPreviewDialog} />}
        </div>
    );
}
