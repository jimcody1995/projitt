'use client'
import { JSX, useState } from "react";
import { X, Sparkles } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { customToast } from "@/components/common/toastr";

interface JobTitle {
    id: string;
    title: string;
    department: string;
    selected: boolean;
}

interface CreateJobTitleSheetProps {
    children: React.ReactNode;
}

export const CreateJobTitleSheet = ({ children }: CreateJobTitleSheetProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [jobTitles, setJobTitles] = useState<JobTitle[]>([
        { id: '1', title: 'Geologist', department: 'Department Name', selected: true },
        { id: '2', title: 'Hair stylist', department: 'Department Name', selected: true },
        { id: '3', title: 'Translator', department: 'Department Name', selected: true },
        { id: '4', title: 'Legal adviser', department: 'Department Name', selected: true },
        { id: '5', title: 'Interpreter', department: 'Department Name', selected: true },
        { id: '6', title: 'Judge', department: 'Department Name', selected: true },
        { id: '7', title: 'Postman', department: 'Department Name', selected: true },
        { id: '8', title: 'Managing director', department: 'Department Name', selected: true },
        { id: '9', title: 'Marketing manager', department: 'Department Name', selected: true },
        { id: '10', title: 'Graphic designer', department: 'Department Name', selected: true },
        { id: '11', title: 'Waitress', department: 'Department Name', selected: true },
        { id: '12', title: 'Flight engineer', department: 'Department Name', selected: true },
        { id: '13', title: 'Philosopher', department: 'Department Name', selected: false },
    ]);

    const handleJobTitleToggle = (jobTitleId: string) => {
        setJobTitles(prev =>
            prev.map(job =>
                job.id === jobTitleId
                    ? { ...job, selected: !job.selected }
                    : job
            )
        );
    };

    const handleAddAll = () => {
        const selectedJobTitles = jobTitles.filter(job => job.selected);
        console.log('Adding job titles:', selectedJobTitles);
        customToast("Success", `${selectedJobTitles.length} job titles added successfully`, "success");
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] p-0" close={false}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-[#0d978b]" />
                            <SheetTitle className="text-[22px]/[30px] text-[#0d978b] font-semibold">
                                Create Job Title
                            </SheetTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancel}
                            className="h-8 w-8 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="space-y-0">
                            {jobTitles.map((jobTitle, index) => (
                                <div key={jobTitle.id}>
                                    <div className="flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
                                        <Checkbox
                                            id={`job-title-${jobTitle.id}`}
                                            checked={jobTitle.selected}
                                            onCheckedChange={() => handleJobTitleToggle(jobTitle.id)}
                                            className="h-4 w-4"
                                        />
                                        <div className="flex-1 flex items-center">
                                            <span className="text-[14px] font-medium text-[#353535]">
                                                {jobTitle.title}
                                            </span>
                                            <span className="text-[14px] text-[#8F8F8F] mx-2">/</span>
                                            <span className="text-[14px] text-[#8F8F8F]">
                                                {jobTitle.department}
                                            </span>
                                        </div>
                                    </div>
                                    {index < jobTitles.length - 1 && (
                                        <div className="border-b border-gray-200 mx-4"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200">
                        <Button
                            variant="ghost"
                            onClick={handleCancel}
                            className="text-primary-950 font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddAll}
                            className="px-6 bg-[#0d978b] hover:bg-[#0d978b]/90 text-white font-semibold"
                        >
                            Add All
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
