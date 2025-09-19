'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch, SwitchWrapper } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

export default function Company() {
    const [activeTab, setActiveTab] = useState('general');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        legalName: 'Zaid LLC',
        website: 'zaidllc.com',
        industry: 'Manufacturing',
        timezone: 'Hawaii',
        language: 'English',
        addresses: [
            '2972 Westheimer Rd. Santa Ana, Illinois, 85486, USA',
            '2972 Westheimer Rd. Santa Ana, Illinois, 85486, USA'
        ],
        emailNotification: true,
        pushNotification: true,
        smsNotification: true,
        recruitment: true,
        onboarding: true,
        leaveManagement: true,
        timeAttendance: true,
        payroll: true
    });
    const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0
    });
    const [activeSection, setActiveSection] = useState('general');
    // Validation functions
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.legalName.trim()) {
            newErrors.legalName = 'Legal name is required';
        }

        if (!formData.website.trim()) {
            newErrors.website = 'Website is required';
        } else if (!/^https?:\/\/.+\..+/.test(formData.website)) {
            newErrors.website = 'Please enter a valid website URL';
        }

        if (!formData.industry) {
            newErrors.industry = 'Industry is required';
        }

        if (!formData.timezone) {
            newErrors.timezone = 'Timezone is required';
        }

        if (!formData.language) {
            newErrors.language = 'Language is required';
        }

        // Validate addresses
        const validAddresses = formData.addresses.filter(addr => addr.trim());
        if (validAddresses.length === 0) {
            newErrors.addresses = 'At least one address is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleAddressEdit = (index: number) => {
        // Handle address edit - could open a modal or inline edit
        const newAddress = prompt('Edit address:', formData.addresses[index]);
        if (newAddress !== null) {
            const newAddresses = [...formData.addresses];
            newAddresses[index] = newAddress;
            setFormData(prev => ({ ...prev, addresses: newAddresses }));
        }
    };

    const handleAddressDelete = (index: number) => {
        if (formData.addresses.length > 1) {
            const newAddresses = formData.addresses.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, addresses: newAddresses }));
        }
    };

    const handleAddAddress = () => {
        setFormData(prev => ({
            ...prev,
            addresses: [...prev.addresses, '']
        }));
    };

    const handleSaveChanges = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Here you would typically make an API call to save the data
            console.log('Saving changes:', formData);

            // Show success message (you could use a toast notification here)
            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Failed to save changes. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const sidebarItems = [
        { id: 'company-details', label: 'Company Details' },
        { id: 'security', label: 'Security' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'candidate-settings', label: 'Candidate Settings' }
    ];
    useEffect(() => {
        const activeTab = tabRefs.current[activeSection];
        if (activeTab) {
            const container = activeTab.parentElement;
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const tabRect = activeTab.getBoundingClientRect();
                setIndicatorStyle({
                    left: tabRect.left - containerRect.left,
                    width: tabRect.width
                });
            }
        }
    }, [activeSection]);
    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Header */}
            <h1 className="text-[24px]/[30px] font-semibold text-gray-900">Company</h1>
            <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px] mt-[20px] w-full overflow-x-auto relative'>
                <div className="flex items-center gap-[12px] relative">
                    <div
                        className="absolute bottom-0 h-[2px] bg-[#0d978b] transition-all duration-300 ease-in-out"
                        style={{
                            left: `${indicatorStyle.left}px`,
                            width: `${indicatorStyle.width}px`
                        }}
                    />

                    <div
                        ref={(el) => { tabRefs.current.general = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'general' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('general')}
                        data-testid="companyDetails-tab-button"
                    >
                        <p className='whitespace-nowrap'>General</p>
                    </div>
                    <div
                        ref={(el) => { tabRefs.current.integrations = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'integrations' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('integrations')}
                        data-testid="integrations-tab-button"
                    >
                        <p className='whitespace-nowrap'>Integrations</p>
                    </div>

                </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-[34px]">
                {/* Main Content */}
                <div className="flex-1 ">


                    <div className="space-y-8 md:w-[409px] w-full">
                        {/* Company Details Section */}

                        <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Company Details</p>
                        <div className="space-y-6">
                            {/* Company Logo */}
                            <div>
                                <p className='text-[12px]/[18px] text-[#8F8F8F]'>Company Logo</p>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-[4px]">
                                    <img src="/images/zaidLLC.png" alt="Company Logo" className="h-[32px] rounded-lg" />
                                    <Button variant="outline" className="w-fit">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload
                                    </Button>
                                </div>
                            </div>
                            {/* Form Fields */}
                            <div className="flex flex-col gap-[20px]">
                                <div className="space-y-2">
                                    <Label htmlFor="legalName">Legal Name</Label>
                                    <Input
                                        id="legalName"
                                        value={formData.legalName}
                                        onChange={(e) => handleInputChange('legalName', e.target.value)}
                                        className={errors.legalName ? 'border-red-500' : ''}
                                    />
                                    {errors.legalName && (
                                        <p className="text-sm text-red-600">{errors.legalName}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        value={formData.website}
                                        onChange={(e) => handleInputChange('website', e.target.value)}
                                        className={errors.website ? 'border-red-500' : ''}
                                    />
                                    {errors.website && (
                                        <p className="text-sm text-red-600">{errors.website}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Select Industry</Label>
                                    <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                                        <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                            <SelectItem value="Technology">Technology</SelectItem>
                                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                                            <SelectItem value="Finance">Finance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.industry && (
                                        <p className="text-sm text-red-600">{errors.industry}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Select Timezone</Label>
                                    <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                                        <SelectTrigger className={errors.timezone ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Hawaii">(UTC-10:00) Hawaii</SelectItem>
                                            <SelectItem value="PST">(UTC-8:00) Pacific Standard Time</SelectItem>
                                            <SelectItem value="EST">(UTC-5:00) Eastern Standard Time</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.timezone && (
                                        <p className="text-sm text-red-600">{errors.timezone}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language">Select Language</Label>
                                    <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                                        <SelectTrigger className={errors.language ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="English">English</SelectItem>
                                            <SelectItem value="Spanish">Spanish</SelectItem>
                                            <SelectItem value="French">French</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.language && (
                                        <p className="text-sm text-red-600">{errors.language}</p>
                                    )}
                                </div>
                            </div>

                            {/* Company Addresses */}
                            <div className="space-y-4">
                                <Label>Select Company Address(es)</Label>
                                <div className="space-y-3">
                                    {formData.addresses.map((address, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                            <span className="text-sm text-gray-700">{address}</span>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleAddressEdit(index)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleAddressDelete(index)}
                                                    disabled={formData.addresses.length <= 1}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={handleAddAddress}
                                        className="w-full"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Location
                                    </Button>
                                </div>
                                {errors.addresses && (
                                    <p className="text-sm text-red-600">{errors.addresses}</p>
                                )}
                            </div>
                        </div>

                        {/* Security Section */}
                        <div>
                            <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Security</p>
                            <div className="space-y-6 mt-[16px]">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className='text-[12px]/[18px] text-[#8f8f8f]'>Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value="************"
                                            readOnly
                                            className="pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                    <Button variant="outline" className=" h-[32px]">
                                        Change Password
                                    </Button>
                                </div>
                                <div className="space-y-2 flex flex-col items-start">
                                    <Label className='text-[12px]/[18px] text-[#8f8f8f]'>2FA Authentication</Label>
                                    <Button variant="outline" className="w-[75px] h-[32px]">
                                        Set up
                                    </Button>
                                </div>
                            </div>

                        </div>
                        {/* Notifications Section */}
                        <div>
                            <p className='text-[16px]/[24px] font-medium text-[#1c1c1c]'>Notifications</p>
                            <div className="space-y-6 mt-[16px]">
                                {/* Notification Toggles */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-[#e9e9e9] pb-[20px]">
                                        <div className="space-y-1">
                                            <Label>Email Notification</Label>
                                            <p className="text-sm text-gray-600">
                                                Sends this alert to your registered email address immediately or as part of a digest.
                                            </p>
                                        </div>
                                        <SwitchWrapper>
                                            <Switch
                                                checked={formData.emailNotification}
                                                shape="square"
                                                onCheckedChange={(checked) => handleInputChange('emailNotification', checked)}
                                            />
                                        </SwitchWrapper>
                                    </div>

                                    <div className="flex items-center justify-between border-b border-[#e9e9e9] pb-[20px]">
                                        <div className="space-y-1">
                                            <Label>Push Notification</Label>
                                            <p className="text-sm text-gray-600">
                                                Sends a real-time notification to your device, even when you're not actively using the platform. Works on supported browsers and mobile apps.
                                            </p>
                                        </div>
                                        <SwitchWrapper>
                                            <Switch
                                                shape="square"
                                                checked={formData.pushNotification}
                                                onCheckedChange={(checked) => handleInputChange('pushNotification', checked)}
                                            />
                                        </SwitchWrapper>
                                    </div>

                                    <div className="flex items-center justify-between ">
                                        <div className="space-y-1">
                                            <Label>SMS Notification</Label>
                                            <p className="text-sm text-gray-600">
                                                Delivers a brief text message to your phone for critical updates only. Standard rates may apply.
                                            </p>
                                        </div>
                                        <SwitchWrapper>
                                            <Switch
                                                shape="square"
                                                checked={formData.smsNotification}
                                                onCheckedChange={(checked) => handleInputChange('smsNotification', checked)}
                                            />
                                        </SwitchWrapper>
                                    </div>
                                </div>

                                {/* Notification Categories */}
                                <div className="mt-[27px]">
                                    <Label className='text-[14px]/[16px] text-[#1c1c1c]'>Notification Categories</Label>
                                    <div className="space-y-4 mt-[12px]">
                                        {[
                                            { key: 'recruitment', label: 'Recruitment', description: 'Alerts for job applications, interviews, and hiring updates.' },
                                            { key: 'onboarding', label: 'Onboarding', description: 'Updates about new hires, document submissions, training schedules, and onboarding progress.' },
                                            { key: 'leaveManagement', label: 'Leave Management', description: 'Stay informed on leave requests and approvals.' },
                                            { key: 'timeAttendance', label: 'Time & Attendance', description: 'Notifications for clock-ins, time tracking issues, shift changes, and time edit requests.' },
                                            { key: 'payroll', label: 'Payroll', description: 'Reminders and confirmations for payroll runs, payslip availability, salary changes, and tax actions.' }
                                        ].map((category) => (
                                            <div key={category.key} className="flex items-start gap-3">
                                                <Checkbox
                                                    checked={formData[category.key as keyof typeof formData] as boolean}
                                                    onCheckedChange={(checked) => handleInputChange(category.key, checked)}
                                                    className="mt-1"
                                                />
                                                <div className="space-y-1">
                                                    <Label className="text-sm font-medium">{category.label}</Label>
                                                    <p className="text-sm text-gray-600">{category.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-start">
                            <Button
                                onClick={handleSaveChanges}
                                className="px-8 py-3"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>


                </div>

                {/* Sidebar - Hidden on mobile, visible on desktop */}
                <div className="hidden lg:block w-64  p-6">
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
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
