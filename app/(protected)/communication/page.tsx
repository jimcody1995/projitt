'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, FileText, ChevronDown, ChevronLeft, ChevronRight, X, Send, Maximize2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Message from './components/message';
import EventsTable from './components/EventsTable';
import AnnouncementsTable from './components/AnnouncementsTable';
import CreateAnnouncementSheet from './components/CreateAnnouncementSheet';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    avatar?: string;
}

interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'other';
    timestamp: string;
}

export default function Communication() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Messages');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            text: 'REQUEST FOR REFERENCE\nHow many references do you need.',
            sender: 'other',
            timestamp: '7:15am, 22 May'
        },
        {
            id: '2',
            text: 'REQUEST FOR REFERENCE\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nHiring Team,\nZaid LLC',
            sender: 'other',
            timestamp: '12:36pm, 23 May'
        },
        {
            id: '3',
            text: 'Hey Alice,',
            sender: 'user',
            timestamp: '2:30pm, 23 May'
        },
        {
            id: '4',
            text: 'Please prepare for technical round',
            sender: 'user',
            timestamp: '2:31pm, 23 May'
        }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [showComposeModal, setShowComposeModal] = useState(false);
    const [showEventsPreviewSheet, setShowEventsPreviewSheet] = useState(false);
    const [showAnnouncementSheet, setShowAnnouncementSheet] = useState(false);

    const messages: Message[] = [
        {
            id: '1',
            name: 'Alice Fernadez',
            email: 'alicefernadez@gmail.com',
            message: 'Hi there 👋 Please prepare for technical round, ho...',
        },
        {
            id: '2',
            name: 'Alice Fernadez',
            email: 'alicefernadez@gmail.com',
            message: 'Hi there 👋 Please prepare for technical round, ho...',
        },
        {
            id: '3',
            name: 'Brooklyn Simmons',
            email: 'brooklynsimmons@gmail.com',
            message: 'Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsu...',
        },
        {
            id: '4',
            name: 'Kristin Watson',
            email: 'kristinwatson@gmail.com',
            message: 'Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsu...',
        },
        {
            id: '5',
            name: 'Jerome Bell',
            email: 'jeromebell@gmail.com',
            message: 'Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsu...',
        },
        {
            id: '6',
            name: 'Cody Fisher',
            email: 'codyfisher@gmail.com',
            message: 'Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsu...',
        },
        {
            id: '7',
            name: 'Kathryn Murphy',
            email: 'kathrynmurphy@gmail.com',
            message: 'Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsu...',
        },
        {
            id: '8',
            name: 'Floyd Miles',
            email: 'floydmiles@gmail.com',
            message: 'Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsu...',
        },
    ];

    // Filter messages based on search query
    const filteredMessages = messages.filter((message) =>
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMessages = filteredMessages.slice(startIndex, endIndex);

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const stripHtmlTags = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: ChatMessage = {
                id: Date.now().toString(),
                text: stripHtmlTags(newMessage.trim()),
                sender: 'user',
                timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }) + ', ' + new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short'
                })
            };
            setChatMessages(prev => [...prev, message]);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className=" bg-[#F8F9FA] min-h-screen">
            {/* Header */}
            <div className="mb-7">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="text-[20px]/[28px] sm:text-[24px]/[32px] font-semibold text-[#353535]">
                        Communications
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="h-[42px] text-[#053834] font-semibold px-3 flex items-center gap-2 bg-transparent border border-[#BCBCBC] w-full sm:w-auto"
                            onClick={() => router.push('/communication/templates')}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.72557 1.0508C3.7958 1.04975 2.90019 1.40119 2.21925 2.03428C1.53831 2.66737 1.12267 3.53504 1.05609 4.46243C0.989513 5.38982 1.27695 6.30797 1.86047 7.03184C2.44399 7.75571 3.28022 8.23147 4.20061 8.36325V9.42158C3.31626 9.32276 2.47778 8.97623 1.78169 8.42189C1.08559 7.86755 0.560168 7.12793 0.265886 6.28814C-0.028397 5.44836 -0.0795765 4.54254 0.118237 3.67495C0.316051 2.80737 0.754818 2.01326 1.38404 1.38404C2.01326 0.754818 2.80737 0.316051 3.67495 0.118237C4.54254 -0.0795765 5.44836 -0.028397 6.28814 0.265886C7.12793 0.560168 7.86755 1.08559 8.42189 1.78169C8.97623 2.47778 9.32276 3.31626 9.42158 4.20061H8.36325C8.237 3.32591 7.79975 2.52601 7.13165 1.94751C6.46354 1.36901 5.60933 1.05066 4.72557 1.0508ZM7.17542 4.90056C6.87668 4.90056 6.58087 4.9594 6.30487 5.07373C6.02887 5.18805 5.77809 5.35561 5.56685 5.56685C5.35561 5.77809 5.18805 6.02887 5.07373 6.30487C4.9594 6.58087 4.90056 6.87668 4.90056 7.17542V11.7251C4.90056 12.0239 4.9594 12.3197 5.07373 12.5957C5.18805 12.8717 5.35561 13.1225 5.56685 13.3337C5.77809 13.5449 6.02887 13.7125 6.30487 13.8268C6.58087 13.9412 6.87668 14 7.17542 14H11.7251C12.0239 14 12.3197 13.9412 12.5957 13.8268C12.8717 13.7125 13.1225 13.5449 13.3337 13.3337C13.5449 13.1225 13.7125 12.8717 13.8268 12.5957C13.9412 12.3197 14 12.0239 14 11.7251V7.17542C14 6.87668 13.9412 6.58087 13.8268 6.30487C13.7125 6.02887 13.5449 5.77809 13.3337 5.56685C13.1225 5.35561 12.8717 5.18805 12.5957 5.07373C12.3197 4.9594 12.0239 4.90056 11.7251 4.90056H7.17542ZM5.9505 7.17542C5.9505 6.49926 6.49926 5.9505 7.17542 5.9505H11.7251C12.4013 5.9505 12.9501 6.49926 12.9501 7.17542V11.7251C12.9501 12.05 12.821 12.3616 12.5913 12.5913C12.3616 12.821 12.05 12.9501 11.7251 12.9501H7.17542C6.85055 12.9501 6.53899 12.821 6.30927 12.5913C6.07955 12.3616 5.9505 12.05 5.9505 11.7251V7.17542Z" fill="#053834" />
                            </svg>

                            Templates
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="h-[42px] px-3 bg-[#0D978B] hover:bg-[#086159] text-white font-semibold flex items-center gap-2 w-full sm:w-auto">
                                    Actions
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => setShowAnnouncementSheet(true)}>New Announcement</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    setActiveTab('Events');
                                    setShowEventsPreviewSheet(true);
                                }}>New Event</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 items-start lg:items-center justify-between border-b border-gray-200 mb-6">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full lg:w-auto">
                        <button
                            onClick={() => setActiveTab('Messages')}
                            className={`py-[14px] px-4 sm:px-8 text-[14px]/[18px] sm:text-[15px]/[20px] font-medium border-b-2 transition-colors relative ${activeTab === 'Messages'
                                ? 'border-[#0D978B] text-[#0D978B]'
                                : 'border-transparent text-[#4B4B4B] hover:text-gray-700'
                                }`}
                        >
                            Messages
                            <span className={`ml-1 text-[12px]/[16px] px-2 py-1 rounded-full ${activeTab === 'Messages' ? 'bg-[#D6EEEC] text-[#0D978B]' : 'bg-[#E9E9E9] text-[#4B4B4B]'}`}>
                                13
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Announcements')}
                            className={`py-[14px] px-4 sm:px-8 text-[14px]/[18px] sm:text-[15px]/[20px] font-medium border-b-2 transition-colors ${activeTab === 'Announcements'
                                ? 'border-[#0D978B] text-[#0D978B]'
                                : 'border-transparent text-[#4B4B4B] hover:text-gray-700'
                                }`}
                        >
                            Announcements
                        </button>
                        <button
                            onClick={() => setActiveTab('Events')}
                            className={`py-[14px] px-4 sm:px-8 text-[14px]/[18px] sm:text-[15px]/[20px] font-medium border-b-2 transition-colors ${activeTab === 'Events'
                                ? 'border-[#0D978B] text-[#0D978B]'
                                : 'border-transparent text-[#4B4B4B] hover:text-gray-700'
                                }`}
                        >
                            Events
                        </button>
                    </div>
                    <div className="relative w-full sm:w-[200px] lg:w-[175px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search Message"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-[32px] sm:h-[42px] border border-[#BCBCBC] rounded-[10px] w-full text-[14px] sm:text-[16px]"
                        />
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'Messages' && (
                <>
                    {/* Messages Table */}
                    <div className="rounded-[12px] overflow-hidden bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead className="bg-[#EEF3F2] h-[50px] sm:h-[60px]">
                                    <tr>
                                        <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] font-medium py-[12px] sm:py-[19px] text-[#8C8E8E]">
                                            Name
                                        </th>
                                        <th className="px-[12px] sm:px-[16px] text-left text-[12px]/[18px] sm:text-[14px]/[22px] font-medium py-[12px] sm:py-[19px] text-[#8C8E8E]">
                                            Message
                                        </th>
                                        <th className="px-[12px] sm:px-[16px] text-right text-[12px]/[18px] sm:text-[14px]/[22px] py-[12px] sm:py-[19px] text-[#8C8E8E]">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentMessages.map((message) => (
                                        <tr key={message.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-[12px] sm:px-[16px] py-3 sm:py-4">
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <div>
                                                        <div className="text-[12px]/[18px] sm:text-[14px]/[22px] text-[#4B4B4B]">
                                                            {message.name}
                                                        </div>
                                                        <div className="text-[10px]/[16px] sm:text-[12px]/[22px] text-[#0D978B]">
                                                            {message.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-[12px] sm:px-[16px] py-3 sm:py-4">
                                                <div className="text-[12px]/[18px] sm:text-[14px]/[22px] font-medium text-[#353535] max-w-[200px] sm:max-w-[400px] truncate">
                                                    {message.message}
                                                </div>
                                            </td>
                                            <td className="px-[12px] sm:px-[16px] py-3 sm:py-4">
                                                <div className="flex justify-end">
                                                    <Button
                                                        variant="ghost"
                                                        className="text-[#0D978B] hover:text-[#086159] p-0 h-auto text-[12px]/[18px] sm:text-[14px]/[22px] hover:bg-transparent"
                                                        onClick={() => {
                                                            setSelectedMessage(message);
                                                        }}
                                                    >
                                                        <span className="hidden sm:inline">Send Message →</span>
                                                        <span className="sm:hidden">Send →</span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination at bottom of screen */}
                    <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 w-full mt-4 rounded-[12px] shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px]/[18px] sm:text-[14px]/[20px] text-[#6B7280]">Show per page</span>
                                    <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                                        setItemsPerPage(parseInt(value));
                                        setCurrentPage(1); // Reset to first page when changing items per page
                                    }}>
                                        <SelectTrigger className="w-16 h-7 rounded-[6px] bg-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="25">25</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                            <SelectItem value="100">100</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="h-9 sm:h-10 w-[90px] sm:w-[112px] p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] hover:bg-[#F9FAFB] flex-shrink-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="hidden sm:inline ml-1">Previous</span>
                                </Button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-1 overflow-x-auto">
                                    {(() => {
                                        const maxVisiblePages = 5;
                                        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                                        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                                        const pages = [];

                                        // Show first page and ellipsis if needed
                                        if (startPage > 1) {
                                            pages.push(
                                                <Button
                                                    key={1}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCurrentPage(1)}
                                                    className="h-9 sm:h-10 w-9 sm:w-10 p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] text-[#6B7280] hover:bg-[#F9FAFB] flex-shrink-0"
                                                >
                                                    1
                                                </Button>
                                            );
                                            if (startPage > 2) {
                                                pages.push(
                                                    <span key="ellipsis1" className="text-[#6B7280] px-1 sm:px-2 text-[12px] sm:text-[14px]">...</span>
                                                );
                                            }
                                        }

                                        // Show visible pages
                                        for (let i = startPage; i <= endPage; i++) {
                                            pages.push(
                                                <Button
                                                    key={i}
                                                    variant={currentPage === i ? "primary" : "outline"}
                                                    size="sm"
                                                    onClick={() => setCurrentPage(i)}
                                                    className={`h-9 sm:h-10 w-9 sm:w-10 p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] flex-shrink-0 ${currentPage === i
                                                        ? 'bg-[#D6EEEC] text-[#0D978B]'
                                                        : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                                                        }`}
                                                >
                                                    {i}
                                                </Button>
                                            );
                                        }

                                        // Show last page and ellipsis if needed
                                        if (endPage < totalPages) {
                                            if (endPage < totalPages - 1) {
                                                pages.push(
                                                    <span key="ellipsis2" className="text-[#6B7280] px-1 sm:px-2 text-[12px] sm:text-[14px]">...</span>
                                                );
                                            }
                                            pages.push(
                                                <Button
                                                    key={totalPages}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCurrentPage(totalPages)}
                                                    className="h-9 sm:h-10 w-9 sm:w-10 p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] text-[#6B7280] hover:bg-[#F9FAFB] flex-shrink-0"
                                                >
                                                    {totalPages}
                                                </Button>
                                            );
                                        }

                                        return pages;
                                    })()}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="h-9 sm:h-10 w-[70px] sm:w-[85px] p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] hover:bg-[#F9FAFB] flex-shrink-0"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="hidden sm:inline ml-1">Next</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Events Tab Content */}
            {activeTab === 'Events' && (
                <EventsTable
                    showPreviewSheet={showEventsPreviewSheet}
                    onClosePreviewSheet={() => setShowEventsPreviewSheet(false)}
                />
            )}

            {/* Announcements Tab Content */}
            {activeTab === 'Announcements' && (
                <AnnouncementsTable />
            )}

            {/* Chat Sheet */}
            <Sheet open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
                <SheetContent side="right" className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] p-0" close={false}>
                    <div className="flex flex-col h-full" >
                        {/* Chat Header */}
                        <SheetHeader className="px-4 sm:px-8 py-4 sm:py-7 border-b border-gray-200 bg-[#FAFAFA]">
                            <div className="flex items-center justify-between">
                                <SheetTitle className="text-[#0D978B] font-medium text-[18px]/[24px] sm:text-[22px]/[30px] border-b-2 border-[#0D978B]">
                                    {selectedMessage?.name}
                                </SheetTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedMessage(null)}
                                    className="h-8 w-8 p-0 border border-[#787878] rounded-[6px]"
                                >
                                    <X className="h-4 w-4 text-[#787878]" />
                                </Button>
                            </div>
                        </SheetHeader>

                        {/* Chat Messages */}
                        <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto">
                            {chatMessages.map((message) => (
                                <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                    {message.sender === 'other' && (
                                        <div className="w-8 h-8 rounded-full bg-[#0D978B] flex items-center justify-center text-white text-sm font-medium">
                                            AF
                                        </div>
                                    )}
                                    <div className={`flex-1 ${message.sender === 'user' ? 'max-w-[200px] sm:max-w-[280px]' : ''}`}>
                                        <div className={`bg-gray-100 rounded-lg p-2 sm:p-3 ${message.sender === 'user' ? 'ml-auto' : 'max-w-[200px] sm:max-w-[280px]'}`}>
                                            <div
                                                className="text-xs sm:text-sm text-gray-700 prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: message.text }}
                                            />
                                        </div>
                                        <div className={`text-[10px] sm:text-xs text-gray-500 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                                            {message.timestamp}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="px-4 sm:px-8 py-3 sm:py-4">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Input
                                        placeholder="Type your message"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="h-8 sm:h-9 border-gray-300 rounded-lg pr-16 sm:pr-20 bg-[#F1F1F1] text-[12px] sm:text-[14px]"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowComposeModal(true)}
                                        className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 p-0"
                                    >
                                        <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                                    </Button>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className="h-8 w-8 sm:h-10 sm:w-10 p-0"
                                >
                                    <Send className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Compose Modal */}
            {showComposeModal && (
                <Message
                    open={showComposeModal}
                    onOpenChange={setShowComposeModal}
                    onSendMessage={(message) => {
                        // Create a new chat message from the rich text editor
                        const chatMessage: ChatMessage = {
                            id: Date.now().toString(),
                            text: message, // Keep HTML formatting for rich text editor
                            sender: 'user',
                            timestamp: new Date().toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                            }) + ', ' + new Date().toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short'
                            })
                        };
                        setChatMessages(prev => [...prev, chatMessage]);
                    }}
                />
            )}

            {/* Create Announcement Sheet */}
            <CreateAnnouncementSheet
                open={showAnnouncementSheet}
                onOpenChange={setShowAnnouncementSheet}
            />
        </div>
    );
}