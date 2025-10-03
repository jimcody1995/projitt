import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Completed() {
    const [expandedCycle, setExpandedCycle] = useState<number | null>(1);
    const router = useRouter();
    const reviewCycles = [
        {
            id: 1,
            title: "H1 2025 Mid-Year Review",
            dateRange: "April 1 - April 30",
            frequency: "Quarterly",
            employees: 112,
            progress: 100,
            competencies: "Leadership, Teamwork, Communication",
            reviewAssignment: "Self Review, Manager Reviews, Peer Reviews",
            isExpanded: expandedCycle === 1,
        },
        {
            id: 2,
            title: "H1 2025 Mid-Year Review",
            dateRange: "April 1 - April 30",
            frequency: "Monthly",
            employees: 6,
            progress: 100,
            competencies: "Leadership, Teamwork, Communication",
            reviewAssignment: "Self Review, Manager Reviews, Peer Reviews",
            isExpanded: expandedCycle === 2,
        }
    ];

    const employees = [
        {
            id: 1,
            name: "Alice Fernadez",
            position: "Senior Data Analyst",
            department: "Data",
            finalScore: 4.5,
            progress: 100,
            initials: "AF"
        },
        {
            id: 2,
            name: "Alice Fernadez",
            position: "Senior Data Analyst",
            department: "Data",
            finalScore: 3.9,
            progress: 100,
            initials: "AF"
        },
        {
            id: 3,
            name: "Alice Fernadez",
            position: "Senior Data Analyst",
            department: "Data",
            finalScore: 2.5,
            progress: 100,
            initials: "AF"
        },
        {
            id: 4,
            name: "Alice Fernadez",
            position: "Senior Data Analyst",
            department: "Data",
            finalScore: 4.5,
            progress: 100,
            initials: "AF"
        },
        {
            id: 5,
            name: "Alice Fernadez",
            position: "Senior Data Analyst",
            department: "Data",
            finalScore: 4.5,
            progress: 100,
            initials: "AF"
        },
        {
            id: 6,
            name: "Alice Fernadez",
            position: "Senior Data Analyst",
            department: "Data",
            finalScore: 4.5,
            progress: 100,
            initials: "AF"
        }
    ];

    const toggleExpanded = (cycleId: number) => {
        setExpandedCycle(expandedCycle === cycleId ? null : cycleId);
    };

    const ProgressCircle = ({ progress }: { progress: number }) => (
        <div className="relative w-4 h-4">
            <svg className="w-4 h-4 transform -rotate-90" viewBox="0 0 16 16">
                <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#e9e9e9"
                    strokeWidth="2"
                    fill="none"
                />
                <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#0d978b"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 6}`}
                    strokeDashoffset={`${2 * Math.PI * 6 * (1 - progress / 100)}`}
                />
            </svg>
        </div>
    );

    const getScoreBadgeStyle = (score: number) => {
        if (score >= 4.0) {
            return {
                backgroundColor: '#C0FFE5',
                borderColor: '#00683D',
                textColor: '#00683D'
            };
        } else if (score >= 3.0) {
            return {
                backgroundColor: '#FFDFC0',
                borderColor: '#934900',
                textColor: '#934900'
            };
        } else {
            return {
                backgroundColor: '#C306064D',
                borderColor: '#C30606',
                textColor: '#C30606'
            };
        }
    };

    const ScoreBadge = ({ score }: { score: number }) => {
        const style = getScoreBadgeStyle(score);
        return (
            <div
                className="inline-flex items-center justify-center px-[12px] py-[4px] rounded-[6px] text-[14px] font-medium border"
                style={{
                    backgroundColor: style.backgroundColor,
                    borderColor: style.borderColor,
                    color: style.textColor
                }}
            >
                {score}
            </div>
        );
    };

    const EmployeeActions = ({ employeeId }: { employeeId: number }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="size-7"
                    mode="icon"
                    variant="ghost"
                    onClick={e => e.stopPropagation()}
                >
                    <EllipsisVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                <div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                    View Details
                </div>
                <div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                    Edit Review
                </div>
                <div className="cursor-pointer hover:bg-[#e9e9e9] text-[12px]/[18px] py-[7px] px-[12px] rounded-[8px]">
                    Send Reminder
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <div className=" space-y-[16px]">
            {reviewCycles.map((cycle) => (
                <div key={cycle.id} className="bg-white rounded-[12px] border border-[#e9e9e9] shadow-sm">
                    {/* Cycle Header */}
                    <div
                        className="p-[24px] cursor-pointer w-full"
                        onClick={() => toggleExpanded(cycle.id)}
                    >
                        <div className="flex items-center justify-between gap-[12px] w-full bg-white">
                            {cycle.isExpanded ? (
                                <ChevronUp className="size-5 text-[#8f8f8f]" />
                            ) : (
                                <ChevronDown className="size-5 text-[#8f8f8f]" />
                            )}
                            <div className="flex-1 flex justify-between items-center w-full gap-[12px]">
                                <h3 className="text-[18px]/[24px] font-medium text-[#353535]">
                                    {cycle.title}
                                </h3>
                                <div className="text-[14px]/[22px] text-[#626262]">{cycle.dateRange}</div>
                                <div className="text-[14px]/[22px] text-[#626262]">{cycle.frequency}</div>
                                <div className="text-[14px]/[22px] text-[#626262]">{cycle.employees} employees</div>
                                <div className="flex items-center gap-[6px]">
                                    <span className="text-[#0d978b] text-[12px]/[14px]">{cycle.progress}% done</span>
                                    <ProgressCircle progress={cycle.progress} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expanded Details */}
                    {cycle.isExpanded && (
                        <div className="px-[24px] pb-[24px] border-t border-[#e9e9e9]">
                            <div className="pt-[24px] w-full ">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-[32px]">
                                        <div>
                                            <span className="text-[14px] text-[#8f8f8f]">Competencies:</span>
                                            <p className="text-[14px] text-[#353535] mt-[4px]">
                                                {cycle.competencies}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-[14px] text-[#8f8f8f]">Review Assignment</span>
                                            <p className="text-[14px] text-[#353535] mt-[4px]">
                                                {cycle.reviewAssignment}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Search and Send Reminder */}
                                    <div className="flex items-center gap-[16px]">
                                        <div className="relative flex-1 max-w-[300px]">
                                            <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                                            <Input
                                                placeholder="Search"
                                                className="ps-9 h-[40px]"
                                            />
                                        </div>
                                        <Button
                                            className="h-[40px] px-[16px]"
                                            onClick={() => router.push(`/talent-management/performance-review/reports`)}
                                        >
                                            View Reports
                                        </Button>
                                    </div>
                                </div>
                                {/* Employee Table */}
                                <div className="mt-[24px]">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-[#e9e9e9]">
                                                    <th className="text-left py-[12px] px-[16px] text-[14px] font-medium text-[#8f8f8f]">
                                                        Employee Name
                                                    </th>
                                                    <th className="text-left py-[12px] px-[16px] text-[14px] font-medium text-[#8f8f8f]">
                                                        Department
                                                    </th>
                                                    <th className="text-left py-[12px] px-[16px] text-[14px] font-medium text-[#8f8f8f]">
                                                        Final Score
                                                    </th>
                                                    <th className="text-left py-[12px] px-[16px] text-[14px] font-medium text-[#8f8f8f]">
                                                        Progress
                                                    </th>
                                                    <th className="w-[40px]"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employees.map((employee, index) => (
                                                    <tr key={employee.id} className="border-b border-[#e9e9e9] last:border-b-0">
                                                        <td className="py-[12px] px-[16px]">
                                                            <div className="flex items-center gap-[12px]">
                                                                <Avatar className="size-8">
                                                                    <AvatarFallback className="bg-[#d6eeec] text-[#0d978b] text-[12px] font-medium">
                                                                        {employee.initials}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="text-[14px] font-medium text-[#353535]">
                                                                        {employee.name}
                                                                    </p>
                                                                    <p className="text-[12px] text-[#8f8f8f]">
                                                                        {employee.position}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-[12px] px-[16px] text-[14px] text-[#353535]">
                                                            {employee.department}
                                                        </td>
                                                        <td className="py-[12px] px-[16px]">
                                                            <ScoreBadge score={employee.finalScore} />
                                                        </td>
                                                        <td className="py-[12px] px-[16px]">
                                                            <div className="flex items-center gap-[6px]">
                                                                <span className="text-[14px] text-[#0d978b]">
                                                                    {employee.progress}% done
                                                                </span>
                                                                <ProgressCircle progress={employee.progress} />
                                                            </div>
                                                        </td>
                                                        <td className="py-[12px] px-[16px]">
                                                            <EmployeeActions employeeId={employee.id} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}