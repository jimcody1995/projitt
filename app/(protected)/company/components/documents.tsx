import { Button } from "@/components/ui/button";
import { useState } from "react";
import DocumentItem from "../../employees/manage-employees/detail/components/documentItem";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog";
import { FilePlus, FileText, X } from "lucide-react";

export default function Documents() {
    const [activeTab, setActiveTab] = useState<'documents' | 'templates'>('documents');
    const router = useRouter();
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
        <div className="">
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
                {activeTab === 'documents' && <Button className="h-[40px]" onClick={() => setIsImportModalOpen(true)}>
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
            {/* Import Questions Modal */}
            <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
                <DialogContent
                    className="w-[480px] h-[370px] p-6 flex flex-col" close={false}>
                    <DialogHeader>
                        <DialogTitle className="text-[22px]/[30px] font-medium">Upload File</DialogTitle>
                    </DialogHeader>

                    <DialogBody className="h-[140px] w-full">
                        {/* File Drop Zone */}
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0d978b] transition-colors cursor-pointer flex-1 flex flex-col items-center justify-center flex flex-row justify-center gap-[10px]"
                            onClick={() => document.getElementById('file-input')?.click()}
                        >
                            <div className="text-gray-400">
                                <FilePlus className="h-10 w-10 mx-auto" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-[14px]/[20px]">
                                    Drop file or <span className="text-[#0d978b] cursor-pointer">click to upload</span>
                                </p>
                                <p className="text-[12px]/[18px] text-gray-400">Max size: 50mb</p>
                            </div>

                        </div>

                        {/* Hidden file input */}
                        <input
                            id="file-input"
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setSelectedFile(file);
                                }
                            }}
                        />

                        {/* Selected File Display */}
                        {selectedFile && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between h-[60px]">
                                <div className="flex items-center gap-3">
                                    <div className="text-[#0d978b]">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm text-gray-950">{selectedFile.name}</span>
                                </div>
                                <button
                                    onClick={() => setSelectedFile(null)}
                                    className="text-gray-900 hover:text-gray-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </DialogBody>

                    <DialogFooter className="flex flex-row justify-end gap-3 border-t border-[#e9e9e9] pt-[10px]">
                        <button
                            onClick={() => setIsImportModalOpen(false)}
                            className=" px-4 py-2 border border-gray-300 text-[#053834]  font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                // Handle upload logic here
                                console.log('Uploading file:', selectedFile);
                                setIsImportModalOpen(false);
                                setSelectedFile(null);
                            }}
                            className=" px-4 py-2 bg-[#0d978b] text-white rounded-lg hover:bg-[#0a7a6f] transition-colors font-semibold"
                        >
                            Upload
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}