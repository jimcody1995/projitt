'use client';

import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface PromteSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PromteSheet({ open, onOpenChange }: PromteSheetProps) {
    const [currentRole, setCurrentRole] = useState('');
    const [justification, setJustification] = useState('');
    const [proposedRole, setProposedRole] = useState('');
    const [compensation, setCompensation] = useState('');
    const [approval, setApproval] = useState('');

    const handleSubmit = () => {
        // Reset form and close sheet
        setCurrentRole('');
        setJustification('');
        setProposedRole('');
        setCompensation('');
        setApproval('');
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="!max-w-[610px] p-0" close={false}>
                <SheetHeader className="p-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col gap-[18px]">
                        <X className="h-8 w-8 p-[6px] text-[#787878] border border-[#787878] rounded-[6px]" onClick={() => onOpenChange(false)} />
                        <SheetTitle className="text-[22px]/[30px] font-semibold text-gray-900">
                            Promote:Alice Fernadez
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <div className="pl-[32px] pr-[32px] pb-[32px] pt-[20px] space-y-6">
                    {/* Current Role */}
                    <div className="space-y-2">
                        <Label htmlFor="currentRole" className="text-[14px]/[16px] font-medium">
                            Current Role
                        </Label>
                        <div className="relative">
                            <Input
                                id="currentRole"
                                placeholder="Senior Data Analyst"
                                value={currentRole}
                                onChange={(e) => setCurrentRole(e.target.value)}
                                className="h-[42px] text-[14px]/[20px] rounded-[10px] bg-gray-50"
                            />
                        </div>
                    </div>
                    {/* Justification Field */}
                    <div className="space-y-2">
                        <Label htmlFor="justification" className="text-[14px]/[16px] font-medium">
                            Justification Field
                        </Label>
                        <div className="relative">
                            <Input
                                id="justification"
                                placeholder="Sarah has consistently exceeded expectations in her role"
                                value={justification}
                                onChange={(e) => setJustification(e.target.value)}
                                className="bg-gray-50 h-[56px] text-[14px]/[20px] rounded-[10px]"
                            />
                        </div>
                    </div>

                    {/* Proposed Role */}
                    <div className="space-y-2">
                        <Label htmlFor="roleReadiness" className="text-[14px]/[16px] font-medium">
                            Proposed Role
                        </Label>
                        <Select value={proposedRole} onValueChange={setProposedRole}>
                            <SelectTrigger className="h-[42px] text-[14px]/[20px] rounded-[10px]">
                                <SelectValue placeholder="Select Target Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="senior-manager">Senior Manager</SelectItem>
                                <SelectItem value="director">Director</SelectItem>
                                <SelectItem value="vp">Vice President</SelectItem>
                                <SelectItem value="head-of-marketing">Head of Marketing</SelectItem>
                                <SelectItem value="team-lead">Team Lead</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Add Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-[14px]/[16px] flex flex-row justify-between font-medium">
                            <p className="text-[14px]/[16px] font-medium">Compensation Adjustment</p>
                            <p className="text-[12px]/[16px] text-gray-500">Current Salary: $100,000</p>
                        </Label>
                        <Input
                            id="compensation"
                            placeholder="Add notes for Alice, like development suggestions etc..."
                            value={compensation}
                            onChange={(e) => setCompensation(e.target.value)}
                            className="h-[42px] text-[14px]/[20px] rounded-[10px]"
                        />
                        <Label htmlFor="notes" className="text-[14px]/[16px] font-medium">
                            <p className="text-[14px]/[16px] font-medium text-gray-600">Suggested Salary: $100,000</p>
                        </Label>
                    </div>

                    {/* Approval Workflow */}
                    <div className="space-y-2">
                        <Label htmlFor="approval" className="text-[14px]/[16px] font-medium">
                            Approval Workflow
                        </Label>
                        <Select value={approval} onValueChange={setApproval}>
                            <SelectTrigger className="h-[42px] text-[14px]/[20px] rounded-[10px]">
                                <SelectValue placeholder="Select Approval Workflow" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="leadership-fundamentals">Leadership Fundamentals</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="director">Director</SelectItem>
                                <SelectItem value="vp">Vice President</SelectItem>
                                <SelectItem value="ceo">CEO</SelectItem>
                                <SelectItem value="technical-leadership">Technical Leadership</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button
                            onClick={handleSubmit}
                            className="w-[185px] h-[42px] bg-[#0D978B] hover:bg-[#0a7a6f] text-white font-medium"
                        >
                            Submit for Approval
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}