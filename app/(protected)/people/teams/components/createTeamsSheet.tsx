'use client'
import { JSX, useState } from "react";
import { X, Search } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { customToast } from "@/components/common/toastr";

interface Employee {
    id: string;
    name: string;
    title: string;
    initials: string;
    selected: boolean;
}

interface CreateTeamSheetProps {
    children: React.ReactNode;
}

export const CreateTeamSheet = ({ children }: CreateTeamSheetProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [employees, setEmployees] = useState<Employee[]>([
        { id: '1', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: true },
        { id: '2', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: true },
        { id: '3', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: true },
        { id: '4', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: true },
        { id: '5', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: true },
        { id: '6', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: false },
        { id: '7', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: false },
        { id: '8', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: false },
        { id: '9', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: false },
        { id: '10', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: false },
        { id: '11', name: 'Alice Fernandez', title: 'Senior Data Analyst', initials: 'AF', selected: false },
    ]);

    const handleEmployeeToggle = (employeeId: string) => {
        setEmployees(prev =>
            prev.map(emp =>
                emp.id === employeeId
                    ? { ...emp, selected: !emp.selected }
                    : emp
            )
        );
    };


    const handleSave = () => {
        if (!teamName.trim()) {
            customToast("Error", "Please enter a team name", "error");
            return;
        }
        const selectedEmployees = employees.filter(emp => emp.selected);
        console.log('Creating team:', { teamName, selectedEmployees });
        customToast("Success", `Team "${teamName}" created with ${selectedEmployees.length} employees`, "success");
        setOpen(false);
        setTeamName("");
        setSearchQuery("");
    };

    const handleCancel = () => {
        setOpen(false);
        setTeamName("");
        setSearchQuery("");
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] p-0" close={false}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <SheetTitle className="text-[22px]/[30px]  text-[#353535]">
                            Create Team
                        </SheetTitle>
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
                    <div className="flex-1 overflow-y-auto py-6 px-6">
                        <div className="space-y-6">
                            {/* Team Name Input */}
                            <div className="space-y-[10px]">
                                <label className="text-[14px]/[20px] font-medium text-[#4b4b4b]">
                                    Team
                                </label>
                                <Input
                                    placeholder="Enter Team Name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    className="w-full h-[48px]"
                                />
                            </div>

                            {/* Select Employees Section */}
                            <div className="space-y-2">
                                <label className="text-[14px]/[20px] font-medium text-[#4b4b4b]">
                                    Select Employees
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search employee Name"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 w-full h-[40px]"
                                    />
                                </div>

                                {/* Employee List */}
                                <div className="overflow-y-auto space-y-1 border border-[#bcbcbc] rounded-[12px] py-[8px]">
                                    {filteredEmployees.map((employee) => (
                                        <div
                                            key={employee.id}
                                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <Checkbox
                                                id={`employee-${employee.id}`}
                                                checked={employee.selected}
                                                onCheckedChange={() => handleEmployeeToggle(employee.id)}
                                            />
                                            <div className="w-8 h-8 bg-[#D6EEEC] rounded-full flex items-center justify-center text-[#053834] text-sm font-medium">
                                                {employee.initials}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[14px]/[22px] font-medium text-[#353535]">
                                                    {employee.name}
                                                </div>
                                                <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                                    {employee.title}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200">
                        <Button
                            variant="ghost"
                            onClick={handleCancel}
                            className="text-gray-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="px-6  text-white"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
