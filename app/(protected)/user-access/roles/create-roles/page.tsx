'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';

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

// Sample permissions data
const permissionsData = {
    'General': {
        total: 12,
        selected: 0,
        expanded: false,
        permissions: [
            'View Dashboard',
            'Manage Settings',
            'Access Reports',
            'User Management',
            'System Configuration',
            'Audit Logs',
            'Notifications',
            'Backup & Restore',
            'Security Settings',
            'API Management',
            'Integration Settings',
            'Maintenance Mode'
        ]
    },
    'HR Management': {
        total: 23,
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
        permissions: [
            'Vendor Registration',
            'Contract Management',
            'Payment Processing',
            'Performance Tracking',
            'Document Management',
            'Communication Hub',
            'Approval Workflows',
            'Vendor Evaluation',
            'Risk Assessment',
            'Compliance Monitoring',
            'Reporting & Analytics',
            'Integration Management'
        ]
    },
    'Finance & Operations': {
        total: 12,
        selected: 0,
        expanded: false,
        permissions: [
            'Budget Planning',
            'Expense Management',
            'Financial Reporting',
            'Invoice Processing',
            'Payment Management',
            'Cost Center Management',
            'Financial Analytics',
            'Audit Trail',
            'Compliance Reporting',
            'Tax Management',
            'Asset Management',
            'Financial Controls'
        ]
    },
    'Asset & Facility Management': {
        total: 12,
        selected: 0,
        expanded: false,
        permissions: [
            'Asset Registration',
            'Maintenance Scheduling',
            'Facility Booking',
            'Inventory Management',
            'Asset Tracking',
            'Maintenance History',
            'Facility Management',
            'Space Planning',
            'Equipment Management',
            'Compliance Tracking',
            'Reporting & Analytics',
            'Integration Management'
        ]
    }
};

export default function CreateRoles() {
    const router = useRouter();
    const [roleName, setRoleName] = useState('Chief Financial Officer');
    const [description, setDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [permissions, setPermissions] = useState<PermissionsData>(permissionsData);
    const [selectAll, setSelectAll] = useState(false);

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

    const handleCreateRole = () => {
        console.log('Creating role:', { roleName, description, permissions });
        // Add your create role logic here
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
            if (typeof categoryData.permissions === 'object' && !Array.isArray(categoryData.permissions)) {
                return {
                    ...prev,
                    [category]: {
                        ...categoryData,
                        permissions: {
                            ...categoryData.permissions,
                            [subCategory]: {
                                ...categoryData.permissions[subCategory],
                                expanded: !categoryData.permissions[subCategory].expanded
                            }
                        }
                    }
                };
            }
            return prev;
        });
    };

    const toggleSubCategorySelection = (category: string, subCategory: string) => {
        setPermissions(prev => {
            const categoryData = prev[category];
            if (typeof categoryData.permissions === 'object' && !Array.isArray(categoryData.permissions)) {
                const allSelected = categoryData.permissions[subCategory].permissions.every(perm => perm.selected);
                const updatedPermissions = categoryData.permissions[subCategory].permissions.map(perm => ({
                    ...perm,
                    selected: !allSelected
                }));

                // Count total selected in the main category
                let totalSelectedInCategory = 0;
                const permissionsObj = categoryData.permissions as Record<string, SubCategory>;
                Object.keys(permissionsObj).forEach(subCat => {
                    if (subCat === subCategory) {
                        totalSelectedInCategory += updatedPermissions.filter((perm: Permission) => perm.selected).length;
                    } else {
                        totalSelectedInCategory += permissionsObj[subCat].permissions.filter((perm: Permission) => perm.selected).length;
                    }
                });

                return {
                    ...prev,
                    [category]: {
                        ...categoryData,
                        selected: totalSelectedInCategory,
                        permissions: {
                            ...categoryData.permissions,
                            [subCategory]: {
                                ...categoryData.permissions[subCategory],
                                permissions: updatedPermissions
                            }
                        }
                    }
                };
            }
            return prev;
        });
    };

    const togglePermission = (category: string, subCategory: string, permissionIndex: number) => {
        setPermissions(prev => {
            const categoryData = prev[category];
            if (typeof categoryData.permissions === 'object' && !Array.isArray(categoryData.permissions)) {
                const updatedPermissions = categoryData.permissions[subCategory].permissions.map((perm: Permission, index: number) =>
                    index === permissionIndex ? { ...perm, selected: !perm.selected } : perm
                );

                // Count selected permissions in this sub-category
                const selectedInSubCategory = updatedPermissions.filter(perm => perm.selected).length;
                const totalInSubCategory = updatedPermissions.length;

                // Count total selected in the main category
                let totalSelectedInCategory = 0;
                const permissionsObj = categoryData.permissions as Record<string, SubCategory>;
                Object.keys(permissionsObj).forEach(subCat => {
                    if (subCat === subCategory) {
                        totalSelectedInCategory += selectedInSubCategory;
                    } else {
                        totalSelectedInCategory += permissionsObj[subCat].permissions.filter((perm: Permission) => perm.selected).length;
                    }
                });

                return {
                    ...prev,
                    [category]: {
                        ...categoryData,
                        selected: totalSelectedInCategory,
                        permissions: {
                            ...categoryData.permissions,
                            [subCategory]: {
                                ...categoryData.permissions[subCategory],
                                permissions: updatedPermissions
                            }
                        }
                    }
                };
            }
            return prev;
        });
    };

    const handleSelectAll = () => {
        const newSelectAllState = !selectAll;
        setSelectAll(newSelectAllState);

        setPermissions(prev => {
            const updated = { ...prev };

            Object.keys(updated).forEach(category => {
                // Update main category checkbox
                updated[category] = {
                    ...updated[category],
                    selected: newSelectAllState ? updated[category].total : 0
                };

                if (typeof updated[category].permissions === 'object' && !Array.isArray(updated[category].permissions)) {
                    // Handle sub-categories (like HR Management)
                    const permissionsObj = updated[category].permissions as Record<string, SubCategory>;
                    Object.keys(permissionsObj).forEach(subCategory => {
                        permissionsObj[subCategory] = {
                            ...permissionsObj[subCategory],
                            permissions: permissionsObj[subCategory].permissions.map(permission => ({
                                ...permission,
                                selected: newSelectAllState
                            }))
                        };
                    });
                } else {
                    // Handle direct permissions (like General, Vendor, etc.)
                    // For direct permissions, we don't need to update individual items
                    // as they're handled by the main category selection
                }
            });

            return updated;
        });
    };

    const handleExpandAll = () => {
        setPermissions(prev => {
            const updated = { ...prev };
            const allExpanded = Object.values(updated).every(category => category.expanded);

            Object.keys(updated).forEach(category => {
                updated[category] = {
                    ...updated[category],
                    expanded: !allExpanded
                };
                if (typeof updated[category].permissions === 'object' && !Array.isArray(updated[category].permissions)) {
                    const permissionsObj = updated[category].permissions as Record<string, SubCategory>;
                    Object.keys(permissionsObj).forEach(subCategory => {
                        permissionsObj[subCategory] = {
                            ...permissionsObj[subCategory],
                            expanded: !allExpanded
                        };
                    });
                }
            });
            return updated;
        });
    };

    return (
        <div className="">
            {/* Header */}
            <div className="mb-7 flex justify-between items-center">
                {/* Breadcrumb */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center text-[14px]/[20px]">
                        <button
                            onClick={handleBack}
                            className="cursor-pointer text-[#8F8F8F] "
                        >
                            <span>User Access</span>
                        </button>
                        <div className="text-[#0D978B]" > / Create Role</div>


                    </div>
                    <div className="text-[24px]/[30px] font-semibold text-[#353535]">
                        Create Role
                    </div>

                </div>

                {/* Create Button */}
                <div className="">
                    <Button
                        onClick={handleCreateRole}
                        className="h-[48px] px-4 bg-[#0D978B] hover:bg-[#086159] text-white font-semibold rounded-[8px]"
                    >
                        Create Role
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-5 bg-white rounded-[12px] border border-[#E9E9E9]  min-h-[600px]">
                {/* Left Section - Role Details */}
                <div className="space-y-6 lg:col-span-2 lg:border-r border-[#E9E9E9] pr-5 pl-9 py-9">
                    {/* Role Name */}
                    <div>
                        <label className="block text-[13px]/[21px] text-gray-900 mb-[6px]">
                            Role Name
                        </label>
                        <Input
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            className="h-[40px] border border[#BCBCBC] px-4 text-gray-800 text-[14px]/[20px]"
                            placeholder="Enter role name"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-[13px]/[21px] text-gray-900 mb-[6px]">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-24 px-3 py-2 border border-[#BCBCBC] rounded-[10px] px-4 text-gray-800 text-[14px]/[20px] resize-none focus:outline-none focus:ring-2 focus:ring-[#0D978B] focus:border-transparent"
                            placeholder="Enter role description"
                        />
                    </div>
                </div>

                {/* Right Section - Permissions */}
                <div className="lg:col-span-3">
                    {/* Search */}
                    <div className='p-4 border-b border-[#E9E9E9]'>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-[32px] border border-[#BCBCBC] rounded-[10px]"
                            />
                        </div>

                    </div>
                    {/* Select All */}
                    <div className="flex items-center justify-between px-4 py-[13px] border-b border-[#E9E9E9]">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={selectAll}
                                onCheckedChange={handleSelectAll}
                                className="w-4 h-4"
                            />
                            <span className="text-[13px]/[20px] text-gray-800">Select all permissions</span>
                        </div>
                        <button
                            onClick={handleExpandAll}
                            className="text-[13px]/[21px] text-[#0D978B] hover:underline cursor-pointer"
                        >
                            Expand all
                        </button>
                    </div>

                    {/* Permission Categories */}
                    <div className="space-y-0">
                        {Object.entries(filteredPermissions()).map(([category, data], index) => (
                            <div key={category} className="border-b border-[#E9E9E9] last:border-b-0">
                                {/* Category Header */}
                                <div className={`flex items-center justify-between px-4 py-[13px] border-b border-[#E9E9E9]  ${data.expanded ? 'bg-[#E9E9E9]' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            checked={data.selected === data.total}
                                            onCheckedChange={() => {
                                                // Toggle individual category
                                                const allSelected = data.selected === data.total;
                                                setPermissions(prev => {
                                                    const categoryData = prev[category];
                                                    if (typeof categoryData.permissions === 'object' && !Array.isArray(categoryData.permissions)) {
                                                        // Handle sub-categories
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
                                                    } else {
                                                        // Handle direct permissions
                                                        return {
                                                            ...prev,
                                                            [category]: {
                                                                ...categoryData,
                                                                selected: !allSelected ? categoryData.total : 0
                                                            }
                                                        };
                                                    }
                                                });
                                            }}
                                            className={`w-4 h-4 ${data.expanded ? 'bg-[#E9E9E9]' : ''}`}
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
                                        {typeof data.permissions === 'object' && !Array.isArray(data.permissions) ? (
                                            // Sub-categories (like HR Management)
                                            <div className="space-y-0">
                                                {Object.entries(data.permissions as Record<string, SubCategory>).map(([subCategory, subData], subIndex) => (
                                                    <div key={subCategory} className="ml-4 ">
                                                        <div className="flex items-center justify-between py-3">
                                                            <div className="flex items-center gap-3">
                                                                <Checkbox
                                                                    checked={subData.permissions.every(perm => perm.selected)}
                                                                    onCheckedChange={() => toggleSubCategorySelection(category, subCategory)}
                                                                    className="w-[15px] h-[15px]"
                                                                />
                                                                <span className="text-[14px]/[20px] font-medium text-gray-700">{subCategory}</span>
                                                            </div>
                                                        </div>

                                                        {/* Sub-permissions */}
                                                        <div className="ml-6 pb-3 space-y-2">
                                                            {subData.permissions.map((permission, index) => (
                                                                <div key={index} className="flex items-center gap-3 py-1">
                                                                    <Checkbox
                                                                        checked={permission.selected}
                                                                        onCheckedChange={() => togglePermission(category, subCategory, index)}
                                                                        className="w-4 h-4"
                                                                    />
                                                                    <span className="text-[13px]/[18px] text-gray-600">{permission.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            // Direct permissions (like General, Vendor, etc.)
                                            <div className="ml-6 space-y-2">
                                                {(data.permissions as string[]).map((permission, index) => (
                                                    <div key={index} className="flex items-center gap-3 py-1">
                                                        <Checkbox
                                                            className="w-4 h-4"
                                                        />
                                                        <span className="text-[13px]/[18px] text-gray-600">{permission}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}   