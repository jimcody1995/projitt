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
import General from './components/general';
import Documents from './components/documents';

export default function Company() {
    const [activeTab, setActiveTab] = useState('general');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
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
                        ref={(el) => { tabRefs.current.documents = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'documents' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('documents')}
                        data-testid="companyDetails-tab-button"
                    >
                        <p className='whitespace-nowrap'>Documents</p>
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
                {activeSection === 'general' && (
                    <General
                        formData={formData}
                        errors={errors}
                        isLoading={isLoading}
                        handleInputChange={handleInputChange}
                        handleAddressEdit={handleAddressEdit}
                        handleAddressDelete={handleAddressDelete}
                        handleAddAddress={handleAddAddress}
                        handleSaveChanges={handleSaveChanges}
                    />
                )}
                {activeSection === 'documents' && <Documents />}
            </div>


        </div>


    );
}
