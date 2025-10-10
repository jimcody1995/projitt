'use client';

import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface StartPipSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function StartPipSheet({ open, onOpenChange }: StartPipSheetProps) {
    const [timeline, setTimeline] = useState('');
    const [setGoal, setSetGoal] = useState('');
    const [learningPath, setLearningPath] = useState('');
    const [assignedMentor, setAssignedMentor] = useState('');
    const [checkIns, setCheckIns] = useState('');

    const handleSubmit = () => {
        // Handle form submission
        console.log({
            timeline,
            setGoal,
            learningPath,
            assignedMentor,
            checkIns,
        });
        // Reset form and close sheet
        setTimeline('');
        setSetGoal('');
        setLearningPath('');
        setAssignedMentor('');
        setCheckIns('');
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="!max-w-[610px] p-0" close={false}>
                <SheetHeader className="p-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col gap-[18px]">
                        <X className="h-8 w-8 p-[6px] text-[#787878] border border-[#787878] rounded-[6px]" onClick={() => onOpenChange(false)} />
                        <SheetTitle className="text-[22px]/[30px] font-semibold text-gray-900">
                            PIP:Alice Fernadez
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <div className="pl-[32px] pr-[32px] pb-[32px] pt-[20px] space-y-6">
                    {/* Set goal */}
                    <div className="space-y-2">
                        <Label htmlFor="setGoal" className="text-[14px]/[16px] font-medium">
                            Set Goal(SMART)
                        </Label>
                        <Textarea
                            id="setGoal"
                            placeholder="Set Goal(SMART)"
                            value={setGoal}
                            onChange={(e) => setSetGoal(e.target.value)}
                            className="min-h-[80px] resize-none text-[14px]/[20px] rounded-[10px]"
                        />
                    </div>
                    {/* Add to Learning Path */}
                    <div className="space-y-2">
                        <Label htmlFor="learningPath" className="text-[14px]/[16px] font-medium">
                            Add to Learning Path
                        </Label>
                        <Select value={learningPath} onValueChange={setLearningPath}>
                            <SelectTrigger className="h-[42px] text-[14px]/[20px] rounded-[10px]">
                                <SelectValue placeholder="Select Learning Path" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="leadership-fundamentals">Leadership Fundamentals</SelectItem>
                                <SelectItem value="management-essentials">Management Essentials</SelectItem>
                                <SelectItem value="strategic-thinking">Strategic Thinking</SelectItem>
                                <SelectItem value="communication-skills">Communication Skills</SelectItem>
                                <SelectItem value="technical-leadership">Technical Leadership</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Assign Mentor */}
                    <div className="space-y-2">
                        <Label htmlFor="mentor" className="text-[14px]/[16px] font-medium">
                            Assign Mentor
                        </Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="mentor"
                                placeholder="Search by employee name or ID"
                                value={assignedMentor}
                                onChange={(e) => setAssignedMentor(e.target.value)}
                                className="pl-10 h-[42px] text-[14px]/[20px] rounded-[10px]"
                            />
                        </div>
                    </div>
                    {/*Timeline*/}
                    <div className="space-y-2">
                        <Label htmlFor="timeline" className="text-[14px]/[16px] font-medium">
                            Timeline
                        </Label>
                        <Select value={timeline} onValueChange={setTimeline}>
                            <SelectTrigger className="h-[42px] text-[14px]/[20px] rounded-[10px]">
                                <SelectValue placeholder="Select Timeline" />
                            </SelectTrigger>
                        </Select>
                    </div>
                    {/* Check Ins */}
                    <div className="space-y-2">
                        <Label htmlFor="checkIns" className="text-[14px]/[16px] font-medium">
                            Check Ins
                        </Label>
                        <Select value={checkIns} onValueChange={setCheckIns}>
                            <SelectTrigger className="h-[42px] text-[14px]/[20px] rounded-[10px]">
                                <SelectValue placeholder="Select Check Ins" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0-6">Monthly</SelectItem>
                                <SelectItem value="6-12">6-12 months</SelectItem>
                                <SelectItem value="12-18">12-18 months</SelectItem>
                                <SelectItem value="18-24">18-24 months</SelectItem>
                                <SelectItem value="24+">24+ months</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button
                            onClick={handleSubmit}
                            className="w-[100px] h-[42px] bg-[#0D978B] hover:bg-[#0a7a6f] text-white font-medium"
                        >
                            Start PIP
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}