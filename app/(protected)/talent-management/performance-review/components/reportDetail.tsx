'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    X,
    ThumbsUp,
    ThumbsDown,
    ChevronDown,
    Star,
    RefreshCw,
    Briefcase,
    MapPin,
    PieChart
} from "lucide-react";

interface ReportDetailProps {
    isOpen: boolean;
    onClose: () => void;
    employee?: {
        id: number;
        name: string;
        position: string;
        location: string;
        department: string;
        employmentType: string;
        overallRating: number;
        status: string;
        peerAvg: number;
        managerScore: number;
        selfScore: number;
        initials: string;
    };
}

export default function ReportDetail({ isOpen, onClose, employee }: ReportDetailProps) {
    const [notes, setNotes] = useState("");
    const [selectedAction, setSelectedAction] = useState("");

    // Mock data for the employee
    const mockEmployee = employee || {
        id: 1,
        name: "Alice Fernandez",
        position: "Senior Data Analyst",
        location: "Chicago, USA",
        department: "Data",
        employmentType: "Fulltime",
        overallRating: 4.5,
        status: "High Potential",
        peerAvg: 4.5,
        managerScore: 3.9,
        selfScore: 4.7,
        initials: "AF"
    };

    const competencies = [
        { name: "Commercial Judgement", score: 4.5 },
        { name: "Behaviour", score: 4.5 },
        { name: "Policy Adherence", score: 4.5 },
        { name: "Proactiveness", score: 4.5 },
        { name: "Personal Appearance & Image", score: 4.5 }
    ];

    const strengths = [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    ];

    const opportunities = [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    ];

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

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case 'High Potential':
                return {
                    backgroundColor: '#fff3cd',
                    textColor: '#856404'
                };
            default:
                return {
                    backgroundColor: '#f8f9fa',
                    textColor: '#6c757d'
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

    const StatusBadge = ({ status }: { status: string }) => {
        const style = getStatusBadgeStyle(status);
        return (
            <div
                className="inline-flex items-center justify-center px-[12px] py-[4px] rounded-[6px] text-[14px] font-medium"
                style={{
                    backgroundColor: style.backgroundColor,
                    color: style.textColor
                }}
            >
                {status}
                <ChevronDown className="size-3 ml-1" />
            </div>
        );
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose} >
            <SheetContent className="!max-w-[668px] overflow-y-auto" close={false}>
                <SheetHeader className="pb-6">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8"
                        >
                            <X className="size-4" />
                        </Button>
                    </div>
                </SheetHeader>

                <div className="space-y-6">
                    {/* Header Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-[24px]/[32px] font-semibold text-[#0d978b]">
                                    {mockEmployee.name}
                                </h1>
                                <p className="text-[16px] text-[#8f8f8f]">
                                    {mockEmployee.position} ~ Chicago, USA
                                </p>
                            </div>
                            <div className="px-[12px] py-[9px] rounded-[20px] bg-[#FFDFC0] text-[#BE5E00] text-[12px]/[22px] flex gap-[4px]">
                                <span>High Potential</span>
                                <ChevronDown />
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-[14px] text-[#8f8f8f]">
                            <div className="flex items-center gap-2">
                                <PieChart className="size-4 text-[#00D47D]" />
                                <span>{mockEmployee.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase className="size-4" />
                                <span>Fulltime</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border"
                                style={{
                                    backgroundColor: '#C0FFE5',
                                    borderColor: '#00683D',
                                    color: '#00683D'
                                }}
                            >
                                <ThumbsUp className="size-4" />
                                <span className="font-medium">
                                    4.5 | Excellent
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Add Notes"
                            value={notes}
                            rows={1}
                            onChange={(e) => setNotes(e.target.value)}
                            className="resize-none bg-gray-50"
                        />
                    </div>

                    {/* Actions Section */}
                    <div className="space-y-[8px]">
                        <h3 className="text-[14px]/[22px] text-[#8F8F8F] uppercase">
                            ACTIONS
                        </h3>
                        <div className="space-y-3">
                            <Select value={selectedAction} onValueChange={setSelectedAction}>
                                <SelectTrigger className="w-full h-[48px]">
                                    <SelectValue placeholder="Select Action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="promotion">Promotion</SelectItem>
                                    <SelectItem value="training">Training</SelectItem>
                                    <SelectItem value="succession">Succession Planning</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="text-[14px] text-[#353535]">
                                <span className="text-[#8f8f8f]">Recommended: </span>
                                <span className="text-[#0d978b] cursor-pointer hover:underline">
                                    Add to Tech Lead Succession
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* AI Summary Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Star className="size-4 text-[#0d978b]" />
                            <h3 className="text-[16px] font-semibold text-[#0d978b] uppercase">
                                AI SUMMARY
                            </h3>
                        </div>
                        <p className="text-[14px] text-[#353535] leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when.
                        </p>
                    </div>

                    {/* Strengths Section */}
                    <div className="space-y-3">
                        <h3 className="text-[16px] font-semibold text-[#0d978b]">
                            Strengths
                        </h3>
                        <ul className="space-y-2">
                            {strengths.map((strength, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <ThumbsUp className="size-4 text-green-600 mt-1 flex-shrink-0" />
                                    <span className="text-[14px] text-[#353535]">{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Opportunities Section */}
                    <div className="space-y-3">
                        <h3 className="text-[16px] font-semibold text-red-600">
                            Opportunities
                        </h3>
                        <ul className="space-y-2">
                            {opportunities.map((opportunity, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <ThumbsDown className="size-4 text-red-600 mt-1 flex-shrink-0" />
                                    <span className="text-[14px] text-[#353535]">{opportunity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Score Breakdown Section */}
                    <div className="space-y-4">
                        <h3 className="text-[16px] font-semibold text-[#353535] uppercase">
                            SCORE BREAKDOWN
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#353535]">Peer Average</span>
                                <ScoreBadge score={mockEmployee.peerAvg} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#353535]">Manager Score</span>
                                <ScoreBadge score={3.9} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#353535]">Self Score</span>
                                <ScoreBadge score={4.7} />
                            </div>
                        </div>
                    </div>

                    {/* Avg Score by Competency Section */}
                    <div className="space-y-4">
                        <h3 className="text-[16px] font-semibold text-[#353535] uppercase">
                            AVG SCORE BY COMPETENCY
                        </h3>
                        <div className="space-y-3">
                            {competencies.map((competency, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-[14px] text-[#353535]">{competency.name}</span>
                                    <ScoreBadge score={competency.score} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Manager Section */}
                    <div className="space-y-4">
                        <h3 className="text-[16px] font-semibold text-[#353535] uppercase">
                            MANAGER
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Avatar className="size-8">
                                    <AvatarFallback className="bg-[#d6eeec] text-[#0d978b] text-[12px] font-medium">
                                        JB
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[14px] font-medium text-[#353535]">Joe Brady</p>
                                            <p className="text-[14px] text-[#353535] mt-1">
                                                Consistently owned UI work and collaborated deeply with devs.
                                            </p>
                                            <span className="text-[14px] text-[#0d978b] cursor-pointer hover:underline">
                                                View Full Feedback
                                                <ChevronDown className="size-3 inline ml-1" />
                                            </span>
                                        </div>
                                        <ScoreBadge score={4.5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Peer Feedback Section */}
                    <div className="space-y-4">
                        <h3 className="text-[16px] font-semibold text-[#353535] uppercase">
                            PEER FEEDBACK & COMMENTS
                        </h3>
                        <div className="space-y-4">
                            {/* Anonymous Peer */}
                            <div className="flex items-start gap-3">
                                <Avatar className="size-8">
                                    <AvatarFallback className="bg-[#d6eeec] text-[#0d978b] text-[12px] font-medium">
                                        A
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[14px] font-medium text-[#353535]">Anonymous</p>
                                            <p className="text-[14px] text-[#353535] mt-1">
                                                Consistently owned UI work and collaborated deeply with devs.
                                            </p>
                                            <span className="text-[14px] text-[#0d978b] cursor-pointer hover:underline">
                                                View Full Feedback
                                                <ChevronDown className="size-3 inline ml-1" />
                                            </span>
                                        </div>
                                        <ScoreBadge score={4.5} />
                                    </div>
                                </div>
                            </div>

                            {/* Tricia Takanawa */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Avatar className="size-8">
                                        <AvatarFallback className="bg-[#d6eeec] text-[#0d978b] text-[12px] font-medium">
                                            TT
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[14px] font-medium text-[#353535]">Tricia Takanawa</p>
                                            </div>
                                            <ScoreBadge score={4.5} />
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-11 space-y-3">
                                    <div>
                                        <p className="text-[14px] font-medium text-[#353535]">Personal Appearance & Image</p>
                                        <p className="text-[14px] text-[#353535] mt-1">
                                            Consistently owned UI work and collaborated deeply with devs.
                                        </p>
                                        <p className="text-[14px] text-green-600 mt-1">Score: 4.7 / 5</p>
                                    </div>

                                    <div>
                                        <p className="text-[14px] font-medium text-[#353535]">Commercial Judgement</p>
                                        <p className="text-[14px] text-[#353535] mt-1">
                                            Strong design feedback contributor. Needs to document tasks better.
                                        </p>
                                        <p className="text-[14px] text-orange-600 mt-1">Score: 3.7 / 5</p>
                                    </div>

                                    <div>
                                        <p className="text-[14px] font-medium text-[#353535]">Goal Performance</p>
                                        <p className="text-[14px] text-[#353535] mt-1">
                                            Completed 2/3 goals. Adapted well to scope creep.
                                        </p>
                                        <p className="text-[14px] text-green-600 mt-1">Score: 4.2 / 5</p>
                                    </div>

                                    <div>
                                        <p className="text-[14px] font-medium text-[#353535]">Strengths</p>
                                        <p className="text-[14px] text-[#353535] mt-1">
                                            Design systems. Calm under pressure. Mentors juniors well.
                                        </p>
                                        <p className="text-[14px] text-green-600 mt-1">Score: 4.2 / 5</p>
                                    </div>

                                    <div>
                                        <p className="text-[14px] font-medium text-[#353535]">Development Areas</p>
                                        <p className="text-[14px] text-[#353535] mt-1">
                                            Needs help with sprint estimation. Recommend agile workshop.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
