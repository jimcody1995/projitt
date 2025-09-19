'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch, SwitchWrapper } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Plus, X, MoreVertical, Edit, Trash2, Check, CheckCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Leave() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        // Leave Policies
        leavePolicies: [
            { id: 'annual', name: 'Annual Leave', days: 21, carryForward: true },
            { id: 'sick', name: 'Sick Leave', days: 10, carryForward: false },
            { id: 'personal', name: 'Personal Leave', days: 5, carryForward: false }
        ],

        // Attendance Settings
        shiftHours: [
            { id: 'shift1', from: '8:00am', to: '5:00pm', isEditing: false }
        ],
        timesheetApproval: 'yes',
        includeBreaks: 'yes',
        excludeFromHours: {
            weekends: false,
            publicHolidays: false
        },
        timesheetDeadline: 'Every Friday',
        allowFutureSubmission: 'yes',
        allowUpdateApproved: 'yes'
    });

    const [newShiftFrom, setNewShiftFrom] = useState('8:00am');
    const [newShiftTo, setNewShiftTo] = useState('5:00pm');
    const [editingShift, setEditingShift] = useState<string | null>(null);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleExcludeChange = (field: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            excludeFromHours: { ...prev.excludeFromHours, [field]: checked }
        }));
    };

    const handleAddShift = () => {
        if (newShiftFrom.trim() && newShiftTo.trim()) {
            setFormData(prev => ({
                ...prev,
                shiftHours: [...prev.shiftHours, {
                    id: Date.now().toString(),
                    from: newShiftFrom,
                    to: newShiftTo,
                    isEditing: false
                }]
            }));
            setNewShiftFrom('8:00am');
            setNewShiftTo('5:00pm');
        }
    };

    const handleEditShift = (id: string) => {
        setEditingShift(id);
        setFormData(prev => ({
            ...prev,
            shiftHours: prev.shiftHours.map(shift =>
                shift.id === id ? { ...shift, isEditing: true } : shift
            )
        }));
    };

    const handleSaveShift = (id: string) => {
        setFormData(prev => ({
            ...prev,
            shiftHours: prev.shiftHours.map(shift =>
                shift.id === id ? { ...shift, isEditing: false } : shift
            )
        }));
        setEditingShift(null);
    };

    const handleUpdateShift = (id: string, field: 'from' | 'to', value: string) => {
        setFormData(prev => ({
            ...prev,
            shiftHours: prev.shiftHours.map(shift =>
                shift.id === id ? { ...shift, [field]: value } : shift
            )
        }));
    };

    const handleRemoveShift = (id: string) => {
        setFormData(prev => ({
            ...prev,
            shiftHours: prev.shiftHours.filter(shift => shift.id !== id)
        }));
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Saving leave settings:', formData);
            alert('Leave & Attendance Settings saved successfully!');
        } catch (error) {
            console.error('Error saving leave settings:', error);
            alert('Failed to save leave settings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const sidebarItems = [
        { id: 'leave-policies', label: 'Leave Policies' },
        { id: 'attendance', label: 'Attendance' },
    ];

    return (
        <div className="flex flex-col lg:flex-row mt-[34px]">
            {/* Main Content */}
            <div className="flex-1">
                <div className="space-y-8 md:w-[504px] w-full">
                    {/* Leave Policies Section */}
                    <div>
                        <div className="flex flex-col gap-[10px] mb-4">
                            <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Leave</p>
                            <Button
                                variant="outline"
                                className="md:w-[182px] w-full"
                            >
                                Manage Leave Policies
                            </Button>
                        </div>
                    </div>

                    {/* Attendance Settings Section */}
                    <div>
                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Attendance</p>
                        <div className="space-y-6 mt-[16px]">
                            {/* Shift Hours Configuration */}
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Shift Hours</Label>
                                <div className="space-y-3 mt-[6px]">
                                    {formData.shiftHours.map((shift) => (
                                        <div key={shift.id} className="flex items-center  md:w-[230px] w-full justify-between p-3 bg-gray-50 rounded-lg">
                                            {shift.isEditing ? (
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Label className='text-[13px]/[21px] text-[#353535]'>From</Label>
                                                        <Input
                                                            value={shift.from}
                                                            onChange={(e) => handleUpdateShift(shift.id, 'from', e.target.value)}
                                                            className="w-24 h-8"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label className='text-[13px]/[21px] text-[#353535]'>To</Label>
                                                        <Input
                                                            value={shift.to}
                                                            onChange={(e) => handleUpdateShift(shift.id, 'to', e.target.value)}
                                                            className="w-24 h-8"
                                                        />
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleSaveShift(shift.id)}
                                                        className="text-[#0d978b] hover:text-[#0d978b]/80 hover:bg-[#0d978b]/5 p-1 h-auto"
                                                    >
                                                        <Check className="h-4 w-4 mr-1" />
                                                        Done
                                                    </Button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className='text-[14px]/[210x] text-[#353535] font-bold'>{shift.from} - {shift.to}</span>
                                                    <div className="flex  items-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleEditShift(shift.id)}
                                                            className="h-8 w-8 p-0 hover:bg-gray-100"
                                                        >
                                                            <Edit className="h-4 w-4 text-gray-500" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleRemoveShift(shift.id)}
                                                            className="h-8 w-8 p-0 hover:bg-gray-100"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-gray-500" />
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}

                                    {/* Add New Shift */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col gap-2">
                                            <Label className='text-[13px]/[21px] text-[#353535]'>From</Label>
                                            <Input
                                                value={newShiftFrom}
                                                onChange={(e) => setNewShiftFrom(e.target.value)}
                                                className="w-24 h-8"
                                                placeholder="8:00am"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label className='text-[13px]/[21px] text-[#353535]'>To</Label>
                                            <Input
                                                value={newShiftTo}
                                                onChange={(e) => setNewShiftTo(e.target.value)}
                                                className="w-24 h-8"
                                                placeholder="5:00pm"
                                            />
                                        </div>
                                        {newShiftFrom && newShiftTo && (
                                            <div className='flex gap-[5px] items-center mt-[30px]'>
                                                <CheckCircle className='size-[12px] text-[#0d978b]' />
                                                <p className='text-[13px]/[21px] text-[#0d978b]'>Done</p>
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={handleAddShift}
                                        className="text-[#0d978b] hover:text-[#0d978b]/80 hover:bg-[#0d978b]/5 p-1 h-auto"
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Hours
                                    </Button>
                                </div>
                            </div>

                            {/* Timesheet Approval */}
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Timesheet are to be approved</Label>
                                <RadioGroup
                                    value={formData.timesheetApproval}
                                    onValueChange={(value) => handleInputChange('timesheetApproval', value)}
                                    className="flex gap-6 mt-[6px]"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes-approval" />
                                        <Label htmlFor="yes-approval">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no-approval" />
                                        <Label htmlFor="no-approval">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Shift Hours (Breaks Inclusion) */}
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Shift Hours</Label>
                                <RadioGroup
                                    value={formData.includeBreaks}
                                    onValueChange={(value) => handleInputChange('includeBreaks', value)}
                                    className="flex gap-6 mt-[6px]"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes-breaks" />
                                        <Label htmlFor="yes-breaks">Include Breaks</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no-breaks" />
                                        <Label htmlFor="no-breaks">Exclude Breaks</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Exclude From Available Hours */}
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Exclude From Available Hours</Label>
                                <div className="space-y-3 mt-[6px]">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={formData.excludeFromHours.weekends}
                                            onCheckedChange={(checked) => handleExcludeChange('weekends', checked as boolean)}
                                        />
                                        <Label className='text-[13px]/[21px] text-[#353535]'>Weekends</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={formData.excludeFromHours.publicHolidays}
                                            onCheckedChange={(checked) => handleExcludeChange('publicHolidays', checked as boolean)}
                                        />
                                        <Label className='text-[13px]/[21px] text-[#353535]'>Public Holidays</Label>
                                    </div>
                                </div>
                            </div>

                            {/* Timesheet Submission Deadline */}
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Timesheet Submission Deadline</Label>
                                <Select value={formData.timesheetDeadline} onValueChange={(value) => handleInputChange('timesheetDeadline', value)}>
                                    <SelectTrigger className="md:w-[270px] w-full h-[40px] mt-[6px]">
                                        <SelectValue placeholder="Select deadline" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Every Friday">Every Friday</SelectItem>
                                        <SelectItem value="Every Monday">Every Monday</SelectItem>
                                        <SelectItem value="End of Month">End of Month</SelectItem>
                                        <SelectItem value="Weekly">Weekly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Allow submission of Timesheet for future */}
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Allow submission of Timesheet for future</Label>
                                <RadioGroup
                                    value={formData.allowFutureSubmission}
                                    onValueChange={(value) => handleInputChange('allowFutureSubmission', value)}
                                    className="flex gap-6 mt-[6px]"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes-future" />
                                        <Label htmlFor="yes-future">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no-future" />
                                        <Label htmlFor="no-future">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Allow Update of Approved Timesheet */}
                            <div className="space-y-2">
                                <Label className='text-[13px]/[21px] text-[#353535]'>Allow Update of Approved Timesheet</Label>
                                <RadioGroup
                                    value={formData.allowUpdateApproved}
                                    onValueChange={(value) => handleInputChange('allowUpdateApproved', value)}
                                    className="flex gap-6 mt-[6px]"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="yes-update" />
                                        <Label htmlFor="yes-update">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no-update" />
                                        <Label htmlFor="no-update">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-start">
                        <Button
                            onClick={handleSaveChanges}
                            className="px-8 py-3 bg-[#0d978b] hover:bg-[#0d978b]/90"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block w-64 p-6">
                <div className="space-y-4">
                    {sidebarItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full justify-start text-[#353535] hover:text-[#0d978b]"
                        >
                            {item.label}
                        </Button>
                    ))}
                    <div className="pt-4">
                        <Button
                            onClick={handleSaveChanges}
                            className="w-full bg-[#0d978b] hover:bg-[#0d978b]/90"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
