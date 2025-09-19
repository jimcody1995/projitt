'use client'
import { JSX, useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { addTeam, getEmployees } from "@/api/employee";

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    job_title?: string;
    selected: boolean;
}

interface CreateTeamSheetProps {
    children: React.ReactNode;
    onTeamCreated?: () => void;
}

export const CreateTeamSheet = ({ children, onTeamCreated }: CreateTeamSheetProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [employees, setEmployees] = useState<Employee[]>([
        { id: 1, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 2, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 3, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 4, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 5, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 6, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 7, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 8, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 9, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 10, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
        { id: 11, first_name: 'Alice', last_name: 'Fernandez', job_title: 'Senior Data Analyst', selected: false },
    ])
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmployeeToggle = (employeeId: number) => {
        setEmployees(prev =>
            prev.map(emp =>
                emp.id === employeeId
                    ? { ...emp, selected: !emp.selected }
                    : emp
            )
        );
    };

    // Fetch employees when component mounts
    // useEffect(() => {
    //     const fetchEmployees = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await getEmployees();
    //             if (response.status) {
    //                 const employeesWithSelection = response.data.map((emp: any) => ({
    //                     id: emp.id,
    //                     first_name: emp.first_name,
    //                     last_name: emp.last_name,
    //                     job_title: emp.job_title?.name || 'No Title',
    //                     selected: false
    //                 }));
    //                 setEmployees(employeesWithSelection);
    //             }
    //         } catch (error) {
    //             customToast("Error", "Failed to fetch employees", "error");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (open) {
    //         fetchEmployees();
    //     }
    // }, [open]);


    const handleSave = async () => {
        if (!teamName.trim()) {
            customToast("Error", "Please enter a team name", "error");
            return;
        }

        const selectedEmployees = employees.filter(emp => emp.selected);
        if (selectedEmployees.length === 0) {
            customToast("Error", "Please select at least one employee", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const teamData = {
                name: teamName,
                description: description,
                user_ids: [3, 7, 12]
            };

            const response = await addTeam(teamData);

            if (response.status) {
                customToast("Success", `Team "${teamName}" created successfully`, "success");
                setOpen(false);
                setTeamName("");
                setDescription("");
                setSearchQuery("");
                setEmployees(prev => prev.map(emp => ({ ...emp, selected: false })));
                // Call the callback to refresh teams data
                onTeamCreated?.();
            } else {
                customToast("Error", response.message || "Failed to create team", "error");
            }
        } catch (error: any) {
            customToast("Error", error.response?.data?.message || "Failed to create team. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setTeamName("");
        setDescription("");
        setSearchQuery("");
        setEmployees(prev => prev.map(emp => ({ ...emp, selected: false })));
    };

    const filteredEmployees = employees.filter(emp => {
        const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
        const jobTitle = emp.job_title?.toLowerCase() || '';
        const searchLower = searchQuery.toLowerCase();
        return fullName.includes(searchLower) || jobTitle.includes(searchLower);
    });

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
                            <div className="space-y-[10px]">
                                <label className="text-[14px]/[20px] font-medium text-[#4b4b4b]">
                                    Description
                                </label>
                                <Textarea
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={2}
                                    className="w-full"
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
                                    {loading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="text-[14px] text-[#8F8F8F]">Loading employees...</div>
                                        </div>
                                    ) : filteredEmployees.length === 0 ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="text-[14px] text-[#8F8F8F]">
                                                {searchQuery ? 'No employees found matching your search.' : 'No employees available.'}
                                            </div>
                                        </div>
                                    ) : (
                                        filteredEmployees.map((employee) => {
                                            const initials = `${employee.first_name.charAt(0)}${employee.last_name.charAt(0)}`.toUpperCase();
                                            const fullName = `${employee.first_name} ${employee.last_name}`;

                                            return (
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
                                                        {initials}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-[14px]/[22px] font-medium text-[#353535]">
                                                            {fullName}
                                                        </div>
                                                        <div className="text-[11px]/[14px] text-[#8F8F8F]">
                                                            {employee.job_title}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
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
                            className="px-6 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Save'}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
