import { Button } from "@/components/ui/button";
import { useState } from "react";
import DocumentItem from "../../employees/manage-employees/detail/components/documentItem";
import { useRouter } from "next/navigation";

export default function Documents() {
    const [activeTab, setActiveTab] = useState<'documents' | 'templates'>('documents');
    const router = useRouter();
    const documents = [
        {
            id: '1',
            url: '/1.pdf',
            filename: 'Offer Letter'
        },
        {
            id: '2',
            url: '/2.pdf',
            filename: 'Offer Letter'
        },
        {
            id: '3',
            url: '/3.pdf',
            filename: 'Offer Letter'
        },

        {
            id: '4',
            url: '/4.pdf',
            filename: 'Offer Letter'
        },

        {
            id: '5',
            url: '/5.pdf',
            filename: 'Offer Letter'
        },

    ];
    const templates = [
        {
            id: '1',
            url: '/1.pdf',
            filename: 'Offer Letter'
        },
    ];
    return (
        <div className="pt-[20px]">
            <div className="w-full flex justify-between">
                <div className="flex items-center bg-[#e9e9e9] rounded-[6px]  relative h-[32px]">
                    {/* Animated background slider */}
                    <div
                        className={`absolute  h-[32px] w-[131px] bg-[#0d978b] rounded-[6px] transition-all duration-300 ease-in-out transform ${activeTab === 'documents' ? 'translate-x-0' : 'translate-x-[131px]'
                            }`}
                    />
                    <div
                        className={`relative w-[131px] h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${activeTab === 'documents' ? 'text-white' : 'text-[#a5a5a5]'
                            }`}
                        onClick={() => setActiveTab('documents')}
                    >
                        <p className="text-[14px]/[22px] font-medium transition-all duration-300 ease-in-out">Documents</p>
                    </div>
                    <div
                        className={`relative w-[131px] h-[32px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${activeTab === 'templates' ? 'text-white' : 'text-[#a5a5a5]'
                            }`}
                        onClick={() => setActiveTab('templates')}
                    >
                        <p className="text-[14px]/[22px] font-medium transition-all duration-300 ease-in-out">Templates</p>
                    </div>
                </div>
                {activeTab === 'documents' && <Button className="h-[40px]">
                    Upload Files
                </Button>}
                {activeTab === 'templates' && <Button className="h-[40px]" onClick={() => router.push('/company/new-template')}>
                    Create New Template
                </Button>}
            </div>

            <div className="mt-[22px] flex flex-wrap gap-[24px] justify-between">
                {activeTab === 'documents' && documents.map((document) => (
                    <DocumentItem key={document.id} {...document} />
                ))}
                {activeTab === 'templates' && templates.map((template) => (
                    <DocumentItem key={template.id} {...template} />
                ))}
            </div>
        </div>
    )
}