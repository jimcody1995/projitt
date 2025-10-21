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
import { Upload, Edit, Trash2, Plus, Eye, EyeOff, Diamond, X } from 'lucide-react';
import General from './components/general';
import Documents from './components/documents';
import FacilityManagement from './components/facility-management';
import Integrations from './components/integrations';
import { useRouter } from 'next/navigation';
import OrgIcon from './components/orgIcon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Company() {
    const [activeTab, setActiveTab] = useState('general');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [showAddLocationModal, setShowAddLocationModal] = useState(false);
    const [locationFormData, setLocationFormData] = useState({
        addressLine1: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });
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

    const handleAddLocation = () => {
        setShowAddLocationModal(true);
    };

    const handleLocationFormChange = (field: string, value: string) => {
        setLocationFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleLocationSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Combine all form values into a single address string
        const { addressLine1, city, state, zip, country } = locationFormData;
        const combinedAddress = `${addressLine1}, ${city}, ${state}, ${zip}, ${country}`;

        // Add the combined address to the formData.addresses array
        setFormData(prev => ({
            ...prev,
            addresses: [...prev.addresses, combinedAddress]
        }));

        // Reset the location form data
        setLocationFormData({
            addressLine1: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        });

        // Close the modal
        setShowAddLocationModal(false);
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
            <div className='flex items-center justify-between flex-col sm:flex-row gap-4'>
                <h1 className="text-[24px]/[30px] font-semibold text-gray-900">Company</h1>
                <Button variant='outline' className='h-[42px] text-[14px]/[22px] font-medium text-[#053834] border-[#053834] bg-transparent' onClick={() => router.push('/company/org-chart')}>
                    <OrgIcon />
                    <span className='text-[14px]/[20px] font-semibold'>Org Chart</span>
                </Button>
            </div>
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
                        ref={(el) => { tabRefs.current['facility-management'] = el; }}
                        className={`py-[11px] px-[32px] text-[15px]/[20px] font-medium flex items-center gap-[4px] cursor-pointer transition-colors duration-200 ${activeSection === 'facility-management' ? 'text-[#0d978b]' : 'text-[#353535] hover:text-[#0d978b]'}`}
                        onClick={() => setActiveSection('facility-management')}
                        data-testid="facility-management-tab-button"
                    >
                        <p className='whitespace-nowrap'>Facility Management</p>
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
                        handleAddLocation={handleAddLocation}
                        handleSaveChanges={handleSaveChanges}
                    />
                )}
            </div>
            {activeSection === 'documents' && <Documents />}
            {activeSection === 'integrations' && <Integrations />}
            {activeSection === 'facility-management' && <FacilityManagement />}

            {showAddLocationModal &&
                <>
                    <Dialog
                        open={showAddLocationModal}
                        onOpenChange={setShowAddLocationModal}
                    >
                        <DialogContent className='sm:max-w-[460px] p-7 rounded-[16px]' close={false}>
                            <DialogTitle className='text-[20px]/[20px] font-semibold text-[#353535] flex justify-between items-center'>
                                <span>Add Location</span>

                                <Button variant='ghost' className='text-[14px]/[22px] font-medium text-[#353535] border-[#053834] bg-transparent' onClick={() => setShowAddLocationModal(false)}>
                                    <X className='w-4 h-4' />
                                </Button>
                            </DialogTitle>

                            {/* Modal body for Add Location */}

                            <form
                                className="flex flex-col gap-6 mt-7"
                                onSubmit={handleLocationSubmit}
                            >
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="addressLine1">Address Line 1</Label>
                                    <Input
                                        id="addressLine1"
                                        type="text"
                                        value={locationFormData.addressLine1}
                                        onChange={(e) => handleLocationFormChange('addressLine1', e.target.value)}
                                        required
                                        className='bg-transparent text-[14px]/[20px] text[#4B4B4B] border border-[#BCBCBC] rounded-[8px] h-10'
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            type="text"
                                            value={locationFormData.city}
                                            onChange={(e) => handleLocationFormChange('city', e.target.value)}
                                            required
                                            className='bg-transparent text-[14px]/[20px] text[#4B4B4B] border border-[#BCBCBC] rounded-[8px] h-10'
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            type="text"
                                            value={locationFormData.state}
                                            onChange={(e) => handleLocationFormChange('state', e.target.value)}
                                            required
                                            className='bg-transparent text-[14px]/[20px] text[#4B4B4B] border border-[#BCBCBC] rounded-[8px] h-10'
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <Label htmlFor="zip">Zip Code</Label>
                                        <Input
                                            id="zip"
                                            type="text"
                                            value={locationFormData.zip}
                                            onChange={(e) => handleLocationFormChange('zip', e.target.value)}
                                            required
                                            className='bg-transparent text-[14px]/[20px] text[#4B4B4B] border border-[#BCBCBC] rounded-[8px] h-10'
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <Label htmlFor="country">Country</Label>
                                        <Select
                                            value={locationFormData.country}
                                            onValueChange={(value) => handleLocationFormChange('country', value)}
                                        >
                                            <SelectTrigger id="country" className='bg-transparent text-[14px]/[20px] text[#4B4B4B] border border-[#BCBCBC] rounded-[8px] h-10'>
                                                <SelectValue placeholder="Select Country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USA">USA</SelectItem>
                                                <SelectItem value="Canada">Canada</SelectItem>
                                                <SelectItem value="UK">UK</SelectItem>
                                                <SelectItem value="Australia">Australia</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full mt-4 bg-[#0d978b] hover:bg-[#0b8277] text-white font-semibold h-10 rounded-[8px]"
                                >
                                    Add Location
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </>
            }

        </div>


    );
}
