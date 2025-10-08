import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { Switch, SwitchWrapper } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';

interface GeneralProps {
    formData: {
        legalName: string;
        website: string;
        industry: string;
        timezone: string;
        language: string;
        addresses: string[];
        emailNotification: boolean;
        pushNotification: boolean;
        smsNotification: boolean;
        recruitment: boolean;
        onboarding: boolean;
        leaveManagement: boolean;
        timeAttendance: boolean;
        payroll: boolean;
    };
    errors: Record<string, string>;
    isLoading: boolean;
    handleInputChange: (field: string, value: any) => void;
    handleAddressEdit: (index: number) => void;
    handleAddressDelete: (index: number) => void;
    handleAddAddress: () => void;
    handleSaveChanges: () => void;
}

export default function General({
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleAddressEdit,
    handleAddressDelete,
    handleAddAddress,
    handleSaveChanges
}: GeneralProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [activeSidebarItem, setActiveSidebarItem] = useState('company-details');

    const sidebarItems = [
        { id: 'company-details', label: 'Company Details' },
        { id: 'security', label: 'Security' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'candidate-settings', label: 'Candidate Settings' }
    ];

    // Scroll spy effect
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['company-details', 'security', 'notifications', 'candidate-settings'];
            const headerHeight = 120; // Same offset as scroll function
            const scrollPosition = window.scrollY + headerHeight + 50; // Add some buffer

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSidebarItem(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once to set initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 120; // Approximate height of header + tabs
            const elementPosition = element.offsetTop - headerHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };
    return (
        <>
            <div className='flex-1'>
                <div className="space-y-8 md:w-[409px] w-full">
                    {/* Company Details Section */}
                    <div id="company-details">
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
                                    {formData.addresses.map((address: any, index: any) => (
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
                    </div>

                    {/* Security Section */}
                    <div id="security">
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
                </div>
                {/* Notifications Section */}
                <div id="notifications">
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
            </div>
            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block w-64 p-6 sticky  top-20 h-fit">
                <div className="space-y-4">
                    {sidebarItems.map((item) => {
                        const isActive = activeSidebarItem === item.id;
                        return (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className={`w-full justify-start transition-colors duration-200 ${isActive
                                    ? 'text-[#0d978b] '
                                    : 'text-[#353535] hover:text-[#0d978b] hover:bg-[#0d978b]/5'
                                    }`}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </Button>
                        );
                    })}
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
        </>
    );
}