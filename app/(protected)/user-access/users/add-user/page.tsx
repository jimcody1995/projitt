'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, ChevronUp, ArrowLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// Type definitions
interface Permission {
    name: string;
    selected: boolean;
}

interface SubCategory {
    expanded: boolean;
    permissions: Permission[];
}

interface CategoryData {
    total: number;
    selected: number;
    expanded: boolean;
    permissions: string[] | Record<string, SubCategory>;
}

type PermissionsData = Record<string, CategoryData>;

// Sample permissions data (same as create-roles page)
const permissionsData = {
    'General': {
        total: 12,
        selected: 0,
        expanded: false,
        permissions: {
            'General Permissions': {
                expanded: true,
                permissions: [
                    { name: 'View Dashboard', selected: false },
                    { name: 'Manage Settings', selected: false },
                    { name: 'Access Reports', selected: false },
                    { name: 'User Management', selected: false },
                    { name: 'System Configuration', selected: false },
                    { name: 'Audit Logs', selected: false },
                    { name: 'Notifications', selected: false },
                    { name: 'Backup & Restore', selected: false },
                    { name: 'Security Settings', selected: false },
                    { name: 'API Management', selected: false },
                    { name: 'Integration Settings', selected: false },
                    { name: 'Maintenance Mode', selected: false }
                ]
            }
        }
    },
    'HR Management': {
        total: 12,
        selected: 5,
        expanded: true,
        permissions: {
            'Recruitment': {
                expanded: true,
                permissions: [
                    { name: 'Create & Edit Job Posting', selected: true },
                    { name: 'Create Assessments', selected: true },
                    { name: 'Manage Applications', selected: true },
                    { name: 'Manage Interviews', selected: false },
                    { name: 'Start Hire', selected: false }
                ]
            },
            'Onboarding': {
                expanded: true,
                permissions: [
                    { name: 'Start Hire', selected: true }
                ]
            },
            'Talent Management': {
                expanded: false,
                permissions: [
                    { name: 'Performance Reviews', selected: false },
                    { name: 'Goal Setting', selected: false },
                    { name: 'Career Development', selected: false }
                ]
            },
            'Leave & Attendance': {
                expanded: false,
                permissions: [
                    { name: 'Leave Requests', selected: false },
                    { name: 'Attendance Tracking', selected: false },
                    { name: 'Schedule Management', selected: false }
                ]
            },
            'Payroll': {
                expanded: false,
                permissions: [
                    { name: 'Salary Management', selected: false },
                    { name: 'Benefits Administration', selected: false },
                    { name: 'Tax Management', selected: false }
                ]
            },
            'Settings': {
                expanded: false,
                permissions: [
                    { name: 'HR Configuration', selected: false },
                    { name: 'Policy Management', selected: false }
                ]
            }
        }
    },
    'Vendor Management': {
        total: 12,
        selected: 0,
        expanded: false,
        permissions: {
            'Vendor Permissions': {
                expanded: true,
                permissions: [
                    { name: 'Vendor Registration', selected: false },
                    { name: 'Contract Management', selected: false },
                    { name: 'Performance Tracking', selected: false },
                    { name: 'Payment Processing', selected: false },
                    { name: 'Document Management', selected: false },
                    { name: 'Compliance Monitoring', selected: false },
                    { name: 'Vendor Communication', selected: false },
                    { name: 'Risk Assessment', selected: false },
                    { name: 'Supplier Evaluation', selected: false },
                    { name: 'Purchase Orders', selected: false },
                    { name: 'Invoice Management', selected: false },
                    { name: 'Vendor Reports', selected: false }
                ]
            }
        }
    },
    'Finance & Operations': {
        total: 12,
        selected: 0,
        expanded: false,
        permissions: {
            'Finance Permissions': {
                expanded: true,
                permissions: [
                    { name: 'Financial Planning', selected: false },
                    { name: 'Budget Management', selected: false },
                    { name: 'Expense Tracking', selected: false },
                    { name: 'Revenue Management', selected: false },
                    { name: 'Financial Reporting', selected: false },
                    { name: 'Audit Management', selected: false },
                    { name: 'Tax Compliance', selected: false },
                    { name: 'Investment Management', selected: false },
                    { name: 'Risk Management', selected: false },
                    { name: 'Cost Analysis', selected: false },
                    { name: 'Financial Forecasting', selected: false },
                    { name: 'Compliance Reporting', selected: false }
                ]
            }
        }
    },
    'Asset & Facility Management': {
        total: 12,
        selected: 0,
        expanded: false,
        permissions: {
            'Asset Permissions': {
                expanded: true,
                permissions: [
                    { name: 'Asset Registration', selected: false },
                    { name: 'Maintenance Scheduling', selected: false },
                    { name: 'Asset Tracking', selected: false },
                    { name: 'Facility Management', selected: false },
                    { name: 'Space Planning', selected: false },
                    { name: 'Equipment Management', selected: false },
                    { name: 'Asset Valuation', selected: false },
                    { name: 'Disposal Management', selected: false },
                    { name: 'Compliance Tracking', selected: false },
                    { name: 'Maintenance Reports', selected: false },
                    { name: 'Asset Audits', selected: false },
                    { name: 'Facility Security', selected: false }
                ]
            }
        }
    }
};

// Sample existing users data
const existingUsers = [
    { id: 1, name: 'Alice Fernadez', email: 'alicefernadez@gmail.com', avatar: '/images/employee/employee.svg' },
    { id: 2, name: 'Brooklyn Simmons', email: 'brooklynsimmons@gmail.com', avatar: '/images/employee/employee.svg' },
    { id: 3, name: 'Kristin Watson', email: 'kristinwatson@gmail.com', avatar: '/images/employee/employee.svg' }
];

// Available roles
const availableRoles = [
    'Chief Financial Officer',
    'Recruitment Manager',
    'Asset Manager',
    'Financial Clerk',
    'Talent Manager'
];

export default function AddUser() {
    const router = useRouter();
    const [userType, setUserType] = useState<'new' | 'existing'>('new');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>(['Chief Financial Officer']);
    const [searchQuery, setSearchQuery] = useState('');
    const [permissions, setPermissions] = useState<PermissionsData>(permissionsData);
    const [selectAll, setSelectAll] = useState(false);

    // Function to calculate if all permissions are selected
    const calculateSelectAll = () => {
        const allCategories = Object.values(permissions);
        const totalPermissions = allCategories.reduce((total, category) => {
            if (typeof category.permissions === 'object' && !Array.isArray(category.permissions)) {
                // Handle sub-categories
                const subCategories = category.permissions as Record<string, SubCategory>;
                return total + Object.values(subCategories).reduce((subTotal, subCat) =>
                    subTotal + subCat.permissions.length, 0);
            } else {
                // Handle direct permissions
                return total + (category.permissions as string[]).length;
            }
        }, 0);

        const selectedPermissions = allCategories.reduce((selected, category) => {
            if (typeof category.permissions === 'object' && !Array.isArray(category.permissions)) {
                // Handle sub-categories
                const subCategories = category.permissions as Record<string, SubCategory>;
                return selected + Object.values(subCategories).reduce((subSelected, subCat) =>
                    subSelected + subCat.permissions.filter(perm => perm.selected).length, 0);
            } else {
                // Handle direct permissions - for now we'll assume they're not individually selectable
                return selected + category.selected;
            }
        }, 0);

        return totalPermissions > 0 && selectedPermissions === totalPermissions;
    };

    // Sync selectAll state when permissions change
    useEffect(() => {
        setSelectAll(calculateSelectAll());
    }, [permissions]);

    // Filter permissions based on search query
    const filteredPermissions = () => {
        if (!searchQuery.trim()) {
            return permissions;
        }

        const query = searchQuery.toLowerCase();
        const filtered: PermissionsData = {};

        Object.entries(permissions).forEach(([category, data]) => {
            // Check if category name matches
            if (category.toLowerCase().includes(query)) {
                filtered[category] = data;
                return;
            }

            // Check if any subcategory or permission matches
            if (typeof data.permissions === 'object' && !Array.isArray(data.permissions)) {
                // Handle sub-categories
                const subCategories = data.permissions as Record<string, SubCategory>;
                const matchingSubCategories: Record<string, SubCategory> = {};
                let hasMatches = false;

                Object.entries(subCategories).forEach(([subCategory, subData]) => {
                    // Check subcategory name
                    if (subCategory.toLowerCase().includes(query)) {
                        matchingSubCategories[subCategory] = subData;
                        hasMatches = true;
                        return;
                    }

                    // Check permissions within subcategory
                    const matchingPermissions = subData.permissions.filter(permission =>
                        permission.name.toLowerCase().includes(query)
                    );

                    if (matchingPermissions.length > 0) {
                        matchingSubCategories[subCategory] = {
                            ...subData,
                            permissions: matchingPermissions
                        };
                        hasMatches = true;
                    }
                });

                if (hasMatches) {
                    filtered[category] = {
                        ...data,
                        expanded: true, // Auto-expand when there are search matches
                        permissions: matchingSubCategories
                    };
                }
            } else {
                // Handle direct permissions
                const directPermissions = data.permissions as string[];
                const matchingPermissions = directPermissions.filter(permission =>
                    permission.toLowerCase().includes(query)
                );

                if (matchingPermissions.length > 0) {
                    filtered[category] = {
                        ...data,
                        expanded: true, // Auto-expand when there are search matches
                        permissions: matchingPermissions
                    };
                }
            }
        });

        return filtered;
    };

    const handleBack = () => {
        router.push('/user-access');
    };

    const handleUserTypeChange = (value: string) => {
        setUserType(value as 'new' | 'existing');
        setSelectedUser(null);
        setUserSearchQuery('');
    };

    const handleUserSelect = (user: any) => {
        setSelectedUser(user);
        setUserSearchQuery(user.name);
    };

    const handleRemoveSelectedUser = () => {
        setSelectedUser(null);
        setUserSearchQuery('');
    };

    const handleRoleToggle = (role: string) => {
        setSelectedRoles(prev =>
            prev.includes(role)
                ? prev.filter(r => r !== role)
                : [...prev, role]
        );
    };

    const toggleCategory = (category: string) => {
        setPermissions(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                expanded: !prev[category].expanded
            }
        }));
    };

    const toggleSubCategory = (category: string, subCategory: string) => {
        setPermissions(prev => {
            const categoryData = prev[category];
            const subCategories = categoryData.permissions as Record<string, SubCategory>;
            const subData = subCategories[subCategory];
            const allSelected = subData.permissions.every(perm => perm.selected);

            const updatedSubCategories = {
                ...subCategories,
                [subCategory]: {
                    ...subData,
                    permissions: subData.permissions.map(perm => ({
                        ...perm,
                        selected: !allSelected
                    }))
                }
            };

            // Calculate new selected count for the category
            const newSelectedCount = Object.values(updatedSubCategories).reduce((total, subCat) =>
                total + subCat.permissions.filter(perm => perm.selected).length, 0);

            return {
                ...prev,
                [category]: {
                    ...categoryData,
                    selected: newSelectedCount,
                    permissions: updatedSubCategories
                }
            };
        });
    };

    const togglePermission = (category: string, subCategory: string, index: number) => {
        setPermissions(prev => {
            const categoryData = prev[category];
            const subCategories = categoryData.permissions as Record<string, SubCategory>;
            const subData = subCategories[subCategory];

            const updatedSubCategories = {
                ...subCategories,
                [subCategory]: {
                    ...subData,
                    permissions: subData.permissions.map((perm, i) =>
                        i === index ? { ...perm, selected: !perm.selected } : perm
                    )
                }
            };

            // Calculate new selected count for the category
            const newSelectedCount = Object.values(updatedSubCategories).reduce((total, subCat) =>
                total + subCat.permissions.filter(perm => perm.selected).length, 0);

            return {
                ...prev,
                [category]: {
                    ...categoryData,
                    selected: newSelectedCount,
                    permissions: updatedSubCategories
                }
            };
        });
    };

    const handleExpandAll = () => {
        setPermissions(prev => {
            const updated = { ...prev };
            const allExpanded = Object.values(updated).every(category => category.expanded);

            Object.keys(updated).forEach(category => {
                updated[category] = { ...updated[category], expanded: !allExpanded };
            });
            return updated;
        });
    };

    // Function to determine if all categories are expanded
    const areAllExpanded = () => {
        return Object.values(permissions).every(category => category.expanded);
    };

    const handleSendInvite = () => {
        console.log('Sending invite...');
        // Add your invite logic here
    };

    // Check if permissions should be enabled (only when existing user is selected)
    const permissionsEnabled = userType === 'existing' && selectedUser !== null;

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="text-[14px]/[20px] text-[#8C8E8E]"><span onClick={handleBack} className="cursor-pointer"  >User Access</span><span className="text-[#0D978B]"  > / Add User</span></div>
                            <h1 className="text-[24px]/[32px] font-semibold text-[#282A33]">Add User</h1>
                        </div>
                    </div>
                    <Button
                        onClick={handleSendInvite}
                        className="h-[48px] px-4 bg-[#0D978B] hover:bg-[#086159] text-white font-semibold rounded-[8px]"
                    >
                        Send Invite
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px] bg-white rounded-[12px] border border-[#E9E9E9]">
                    {/* Left Section - User Details and Role Assignment */}
                    <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-[#E9E9E9]">
                        <div className="p-4 sm:p-5">
                            {/* Add User Section */}
                            <div className="mb-6">
                                <h3 className="text-[13px]/[21px] text-[#353535] mb-[6px]">Add User</h3>

                                <div className="mb-5">
                                    <Select value={userType} onValueChange={handleUserTypeChange}>
                                        <SelectTrigger className="h-[40px] border border-[#BCBCBC] rounded-[10px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">New User</SelectItem>
                                            <SelectItem value="existing">Existing User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {userType === 'new' ? (
                                    <div className="space-y-5">
                                        <div className="flex flex-col sm:flex-row justify-between gap-[10px]">
                                            <div className="flex-1">
                                                <label className="block text-[13px]/[21px] text-[#353535] mb-[6px]">
                                                    First Name
                                                </label>
                                                <Input
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="h-[40px] border border-[#BCBCBC] rounded-[10px] w-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-[13px]/[21px] text-[#353535] mb-[6px]">
                                                    Last Name
                                                </label>
                                                <Input
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="h-[40px] border border-[#BCBCBC] rounded-[10px] w-full"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[13px]/[21px]  text-[#353535] mb-[6px]">
                                                Email Address
                                            </label>
                                            <Input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-[40px] border border-[#BCBCBC] rounded-[10px]"
                                                placeholder="Enter email address"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-[13px]/[21px]  text-[#353535] mb-[6px]">
                                            Select User
                                        </label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input
                                                placeholder={selectedUser ? "" : "Search by employee name, ID"}
                                                value={selectedUser ? "" : userSearchQuery}
                                                onChange={(e) => setUserSearchQuery(e.target.value)}
                                                className="pl-9 h-[40px] border border-[#BCBCBC] rounded-[10px]"
                                            />
                                            {selectedUser && (
                                                <div className="absolute top-1/2 left-9 transform -translate-y-1/2 flex items-center gap-2 bg-[#D6EEEC] rounded-[4px] px-2 py-1">
                                                    <img
                                                        src={selectedUser.avatar}
                                                        alt={selectedUser.name}
                                                        className="w-5 h-5 rounded-full"
                                                    />
                                                    <span className="text-[13px]/[18px] text-[#4B4B4B]">
                                                        {selectedUser.name}
                                                    </span>
                                                    <button
                                                        onClick={handleRemoveSelectedUser}
                                                        className="p-0.5 hover:bg-gray-200 rounded-full"
                                                    >
                                                        <X className="h-3 w-3 text-gray-500" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>



                                        {userSearchQuery && !selectedUser && (
                                            <div className="mt-2 border border-[#E9E9E9] rounded-[8px] bg-white max-h-48 overflow-y-auto">
                                                {existingUsers
                                                    .filter(user =>
                                                        user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                                                        user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
                                                    )
                                                    .map(user => (
                                                        <div
                                                            key={user.id}
                                                            onClick={() => handleUserSelect(user)}
                                                            className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                                                        >
                                                            <img
                                                                src={user.avatar}
                                                                alt={user.name}
                                                                className="w-8 h-8 rounded-full"
                                                            />
                                                            <div>
                                                                <div className="text-[13px]/[21px] text-[#4B4B4B]">
                                                                    {user.name}
                                                                </div>
                                                                <div className="text-[13px]/[21px] text-[#8C8E8E]">
                                                                    {user.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Assign Roles Section */}
                            <div>
                                <h3 className="text-[13px]/[21px]  text-[#353535] mb-[6px]">Assign Roles</h3>
                                <div className="space-y-3">
                                    {availableRoles.map((role) => (
                                        <div key={role} className="flex items-center gap-1">
                                            <Checkbox
                                                checked={selectedRoles.includes(role)}
                                                onCheckedChange={() => handleRoleToggle(role)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-[13px]/[20px] text-[#4B4B4B]">{role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Permissions */}
                    <div className="lg:col-span-3">
                        <div className="overflow-hidden">
                            {/* Search */}
                            <div className='p-4 border-b border-[#E9E9E9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                                <div className="relative w-full sm:w-[300px]">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 h-[32px] border border-[#BCBCBC] rounded-[10px] w-full"
                                    />
                                </div>
                                <button className="text-[14px]/[18px] sm:text-[16px]/[20px] text-[#0D978B] hover:underline cursor-pointer">
                                    Reset Permissions
                                </button>
                            </div>

                            {/* Select All and Expand All */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-[13px] border-b border-[#E9E9E9] gap-3 sm:gap-0">
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={calculateSelectAll()}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                // Select all permissions
                                                setPermissions(prev => {
                                                    const updated = { ...prev };
                                                    Object.keys(updated).forEach(category => {
                                                        const categoryData = updated[category];
                                                        if (typeof categoryData.permissions === 'object' && !Array.isArray(categoryData.permissions)) {
                                                            // Handle sub-categories
                                                            const subCategories = categoryData.permissions as Record<string, SubCategory>;
                                                            const updatedSubCategories: Record<string, SubCategory> = {};
                                                            Object.keys(subCategories).forEach(subCat => {
                                                                updatedSubCategories[subCat] = {
                                                                    ...subCategories[subCat],
                                                                    permissions: subCategories[subCat].permissions.map(perm => ({
                                                                        ...perm,
                                                                        selected: true
                                                                    }))
                                                                };
                                                            });
                                                            updated[category] = {
                                                                ...categoryData,
                                                                selected: categoryData.total,
                                                                permissions: updatedSubCategories
                                                            };
                                                        } else {
                                                            // All permissions are now in subcategory format
                                                            // This case should not occur anymore
                                                        }
                                                    });
                                                    return updated;
                                                });
                                            } else {
                                                // Deselect all permissions
                                                setPermissions(prev => {
                                                    const updated = { ...prev };
                                                    Object.keys(updated).forEach(category => {
                                                        const categoryData = updated[category];
                                                        if (typeof categoryData.permissions === 'object' && !Array.isArray(categoryData.permissions)) {
                                                            // Handle sub-categories
                                                            const subCategories = categoryData.permissions as Record<string, SubCategory>;
                                                            const updatedSubCategories: Record<string, SubCategory> = {};
                                                            Object.keys(subCategories).forEach(subCat => {
                                                                updatedSubCategories[subCat] = {
                                                                    ...subCategories[subCat],
                                                                    permissions: subCategories[subCat].permissions.map(perm => ({
                                                                        ...perm,
                                                                        selected: false
                                                                    }))
                                                                };
                                                            });
                                                            updated[category] = {
                                                                ...categoryData,
                                                                selected: 0,
                                                                permissions: updatedSubCategories
                                                            };
                                                        } else {
                                                            // All permissions are now in subcategory format
                                                            // This case should not occur anymore
                                                        }
                                                    });
                                                    return updated;
                                                });
                                            }
                                        }}
                                        className="w-4 h-4"
                                        disabled={!permissionsEnabled}
                                    />
                                    <span className="text-[12px]/[18px] sm:text-[13px]/[20px] text-gray-800">Select all permissions</span>
                                </div>
                                <div className="flex items-center gap-4">

                                    <button
                                        onClick={handleExpandAll}
                                        className="text-[12px]/[18px] sm:text-[13px]/[21px] text-[#0D978B] hover:underline cursor-pointer"
                                    >
                                        {areAllExpanded() ? 'Collapse all' : 'Expand all'}
                                    </button>
                                </div>
                            </div>

                            {/* Permission Categories */}
                            <div className="space-y-0">
                                {Object.entries(filteredPermissions()).map(([category, data], index) => (
                                    <div key={category} className="border-b border-[#E9E9E9] last:border-b-0">
                                        {/* Category Header */}
                                        <div className={`flex items-center justify-between px-4 py-[13px] border-b border-[#E9E9E9] ${data.expanded ? 'bg-[#FAFAFA]' : ''}`}>
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    checked={data.selected === data.total}
                                                    onCheckedChange={() => {
                                                        // Toggle individual category
                                                        const allSelected = data.selected === data.total;
                                                        setPermissions(prev => {
                                                            const categoryData = prev[category];
                                                            // All permissions are now in subcategory format
                                                            const permissionsObj = categoryData.permissions as Record<string, SubCategory>;
                                                            const updatedPermissions: Record<string, SubCategory> = {};
                                                            Object.keys(permissionsObj).forEach(subCat => {
                                                                updatedPermissions[subCat] = {
                                                                    ...permissionsObj[subCat],
                                                                    permissions: permissionsObj[subCat].permissions.map(perm => ({
                                                                        ...perm,
                                                                        selected: !allSelected
                                                                    }))
                                                                };
                                                            });

                                                            return {
                                                                ...prev,
                                                                [category]: {
                                                                    ...categoryData,
                                                                    selected: !allSelected ? categoryData.total : 0,
                                                                    permissions: updatedPermissions
                                                                }
                                                            };
                                                        });
                                                    }}
                                                    className={`w-4 h-4 ${data.expanded ? 'bg-[#FAFAFA]' : ''}`}
                                                    disabled={!permissionsEnabled}
                                                />
                                                <span className="text-[13px]/[20px] font-medium text-gray-800">{category}</span>
                                            </div>
                                            <div className='flex items-center gap-4'>
                                                <span className="text-[13px]/[21px] text-gray-800">{data.selected}/{data.total}</span>
                                                <button
                                                    onClick={() => toggleCategory(category)}
                                                    className="p-1 hover:bg-gray-100 rounded"
                                                >
                                                    {data.expanded ? (
                                                        <ChevronUp className="h-4 w-4 text-gray-800" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-gray-800" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Category Content */}
                                        {data.expanded && (
                                            <div className="pb-4">
                                                {/* All permissions are now in subcategory format */}
                                                <div className="space-y-0">
                                                    {Object.entries(data.permissions as Record<string, SubCategory>).map(([subCategory, subData], subIndex) => (
                                                        <div key={subCategory} className="ml-4 border-b border-[#F5F5F5] last:border-b-0">
                                                            <div className="flex items-center justify-between py-3">
                                                                <div className="flex items-center gap-3">
                                                                    <Checkbox
                                                                        checked={subData.permissions.every(perm => perm.selected)}
                                                                        onCheckedChange={() => toggleSubCategory(category, subCategory)}
                                                                        className="w-4 h-4"
                                                                        disabled={!permissionsEnabled}
                                                                    />
                                                                    <span className="text-[14px]/[20px] font-medium text-gray-700">{subCategory}</span>
                                                                </div>
                                                            </div>

                                                            {/* Sub-permissions */}
                                                            <div className="ml-4 pb-3 space-y-2">
                                                                {subData.permissions.map((permission, index) => (
                                                                    <div key={index} className="flex items-center gap-3 py-1">
                                                                        <Checkbox
                                                                            checked={permission.selected}
                                                                            onCheckedChange={() => togglePermission(category, subCategory, index)}
                                                                            className="w-4 h-4"
                                                                            disabled={!permissionsEnabled}
                                                                        />
                                                                        <span className="text-[13px]/[18px] text-gray-600">{permission.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
