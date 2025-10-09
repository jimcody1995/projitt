'use client'
import { JSX, useState } from "react";
import { X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { customToast } from "@/components/common/toastr";
import Image from "next/image";

interface Department {
    id: string;
    name: string;
    selected: boolean;
}

interface CreateDepartmentSheetProps {
    children: React.ReactNode;
}

export const CreateDepartmentSheet = ({ children }: CreateDepartmentSheetProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [departments, setDepartments] = useState<Department[]>([
        { id: '1', name: 'HR', selected: true },
        { id: '2', name: 'Product', selected: true },
        { id: '3', name: 'Sales', selected: true },
        { id: '4', name: 'Customer Success', selected: true },
        { id: '5', name: 'C Suite', selected: true },
        { id: '6', name: 'Marketing', selected: true },
        { id: '7', name: 'Accounting', selected: true },
        { id: '8', name: 'UI/UX', selected: true },
        { id: '9', name: 'Software & Tech', selected: true },
        { id: '10', name: 'Design', selected: false },
        { id: '11', name: 'Engineering', selected: true },
        { id: '12', name: 'Human Resources', selected: true },
        { id: '13', name: 'Manning', selected: true },
    ]);

    const handleDepartmentToggle = (departmentId: string) => {
        setDepartments(prev =>
            prev.map(dept =>
                dept.id === departmentId
                    ? { ...dept, selected: !dept.selected }
                    : dept
            )
        );
    };

    const handleSelectAll = () => {
        setDepartments(prev =>
            prev.map(dept => ({ ...dept, selected: true }))
        );
    };

    const handleDeselectAll = () => {
        setDepartments(prev =>
            prev.map(dept => ({ ...dept, selected: false }))
        );
    };

    const handleAddAll = () => {
        const selectedDepartments = departments.filter(dept => dept.selected);
        console.log('Adding departments:', selectedDepartments);
        customToast("Success", `${selectedDepartments.length} departments added successfully`, "success");
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const selectedCount = departments.filter(dept => dept.selected).length;

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
                            <Image
                                src="/images/icons/ai-line.png"
                                alt="AI Icon"
                                width={20}
                                height={20}
                                id="ai-icon"
                                data-testid="ai-icon"
                            />
                            <SheetTitle className="text-xl font-semibold text-gray-900">
                                Create Department
                            </SheetTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancel}
                            className="h-8 w-8 p-0 border border-[#8C8E8E]"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto py-3 px-6">
                        <div className="space-y-2">
                            {departments.map((department) => (
                                <div
                                    key={department.id}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Checkbox
                                        id={`department-${department.id}`}
                                        checked={department.selected}
                                        onCheckedChange={() => handleDepartmentToggle(department.id)}
                                        className="h-4 w-4"
                                    />
                                    <label
                                        htmlFor={`department-${department.id}`}
                                        className="flex-1 text-sm font-medium text-gray-900 cursor-pointer"
                                    >
                                        {department.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200">
                        <Button
                            variant="ghost"
                            onClick={handleCancel}
                            className="px-6 text-primary-950 font-semibold"
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
