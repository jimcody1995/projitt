'use client';
import { Import, FileText, X, FilePlus } from "lucide-react";
import { useState, useRef } from "react";
import Leadership from "./leadership";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog";

export default function Criteria() {
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef<{ leadership: HTMLDivElement | null, teamwork: HTMLDivElement | null, communication: HTMLDivElement | null, competence: HTMLDivElement | null }>({ leadership: null, teamwork: null, communication: null, competence: null });
    const [activeTab, setActiveTab] = useState('leadership');
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    return (
        <div>
            <div className="w-full justify-between items-center flex">
                <button className="flex items-center gap-2 text-[#0d978b] text-[14px]/[16px]">
                    <img src="/images/icons/ai-line.png" alt="AI icon" className="h-[20px] w-[20px]" />
                    Generate Questions
                </button>
                <button
                    className="flex items-center gap-2 text-[#0d978b] text-[14px]/[16px]"
                    onClick={() => setIsImportModalOpen(true)}
                >
                    <Import className="h-[20px] w-[20px]" />
                    Import Questions
                </button>
            </div>
            <div className="w-full border border-[#e9e9e9] bg-white rounded-[12px] mt-[20px]">
                <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  w-full overflow-x-auto relative'>
                    {/* Sliding underline */}
                    <div className="flex items-center gap-[12px] relative">
                        <div
                            className="absolute bottom-0 h-[2px] bg-[#0d978b] transition-all duration-300 ease-in-out"
                            style={{
                                left: `${indicatorStyle.left}px`,
                                width: `${indicatorStyle.width}px`
                            }}
                        />

                        <div
                            ref={(el) => { tabRefs.current.leadership = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'leadership' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                            onClick={() => setActiveTab('leadership')}
                            data-testid="active-tab-button"
                        >
                            <p className='whitespace-nowrap'>Leadership</p>
                        </div>
                        <div
                            ref={(el) => { tabRefs.current.teamwork = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'teamwork' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                            onClick={() => setActiveTab('teamwork')}
                            data-testid="completed-tab-button"
                        >
                            <p className='whitespace-nowrap'>Teamwork</p>
                        </div>
                        <div
                            ref={(el) => { tabRefs.current.communication = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'communication' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                            onClick={() => setActiveTab('communication')}
                            data-testid="draft-tab-button"
                        >
                            <p className='whitespace-nowrap'>Communication</p>
                        </div>
                        <div
                            ref={(el) => { tabRefs.current.competence = el; }}
                            className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeTab === 'competence' ? 'text-[#0d978b] border-b-2 border-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                            onClick={() => setActiveTab('competence')}
                            data-testid="draft-tab-button"
                        >
                            <p className='whitespace-nowrap'>Competence</p>
                        </div>
                    </div>
                </div>
                {activeTab === "leadership" && <Leadership />}
            </div>

            {/* Import Questions Modal */}
            <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
                <DialogContent
                    className="w-[480px] h-[370px] p-6 flex flex-col" close={false}>
                    <DialogHeader>
                        <DialogTitle className="text-[22px]/[30px] font-medium">Import Question</DialogTitle>
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