'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Vendor {
    id: string;
    vendor: string;
    email: string;
    website: string;
    category: string;
    rating: number;
}

interface VendorsTableProps {
    searchTerm: string;
}

export default function VendorsTable({ searchTerm }: VendorsTableProps) {
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    const vendors: Vendor[] = [
        {
            id: 'V-001',
            vendor: 'Treyne & Sons Ltd.',
            email: 'contact@treynesons.com',
            website: 'treynesons.com',
            category: 'Supplier',
            rating: 4.9
        },
        {
            id: 'V-002',
            vendor: 'TechCorp Solutions',
            email: 'info@techcorp.com',
            website: 'techcorp.com',
            category: 'Freelance',
            rating: 4.7
        },
        {
            id: 'V-003',
            vendor: 'Global Research Inc.',
            email: 'research@globalresearch.com',
            website: 'globalresearch.com',
            category: 'Research Firm',
            rating: 4.8
        },
        {
            id: 'V-004',
            vendor: 'Supply Chain Masters',
            email: 'orders@supplymasters.com',
            website: 'supplymasters.com',
            category: 'Supplier',
            rating: 4.6
        },
        {
            id: 'V-005',
            vendor: 'Creative Design Studio',
            email: 'hello@creativestudio.com',
            website: 'creativestudio.com',
            category: 'Freelance',
            rating: 4.9
        },
        {
            id: 'V-006',
            vendor: 'Market Analytics Pro',
            email: 'analytics@marketpro.com',
            website: 'marketpro.com',
            category: 'Research Firm',
            rating: 4.5
        },
        {
            id: 'V-007',
            vendor: 'Industrial Supplies Co.',
            email: 'sales@industrialsupplies.com',
            website: 'industrialsupplies.com',
            category: 'Supplier',
            rating: 4.4
        },
        {
            id: 'V-008',
            vendor: 'Digital Marketing Agency',
            email: 'contact@digitalmarketing.com',
            website: 'digitalmarketing.com',
            category: 'Freelance',
            rating: 4.8
        },
        {
            id: 'V-009',
            vendor: 'Business Intelligence Ltd.',
            email: 'info@bintelligence.com',
            website: 'bintelligence.com',
            category: 'Research Firm',
            rating: 4.7
        },
        {
            id: 'V-010',
            vendor: 'Office Equipment Solutions',
            email: 'support@officeequipment.com',
            website: 'officeequipment.com',
            category: 'Supplier',
            rating: 4.3
        },
        {
            id: 'V-011',
            vendor: 'Web Development Hub',
            email: 'dev@webhub.com',
            website: 'webhub.com',
            category: 'Freelance',
            rating: 4.9
        },
        {
            id: 'V-012',
            vendor: 'Consumer Insights Group',
            email: 'insights@consumergroup.com',
            website: 'consumergroup.com',
            category: 'Research Firm',
            rating: 4.6
        },
        {
            id: 'V-013',
            vendor: 'Manufacturing Partners',
            email: 'partners@manufacturing.com',
            website: 'manufacturing.com',
            category: 'Supplier',
            rating: 4.5
        },
        {
            id: 'V-014',
            vendor: 'Content Creation Studio',
            email: 'content@creationstudio.com',
            website: 'creationstudio.com',
            category: 'Freelance',
            rating: 4.8
        },
        {
            id: 'V-015',
            vendor: 'Economic Research Center',
            email: 'research@economiccenter.com',
            website: 'economiccenter.com',
            category: 'Research Firm',
            rating: 4.7
        },
        {
            id: 'V-016',
            vendor: 'Raw Materials Corp',
            email: 'materials@rawmaterials.com',
            website: 'rawmaterials.com',
            category: 'Supplier',
            rating: 4.4
        },
        {
            id: 'V-017',
            vendor: 'UI/UX Design Collective',
            email: 'design@uicollective.com',
            website: 'uicollective.com',
            category: 'Freelance',
            rating: 4.9
        },
        {
            id: 'V-018',
            vendor: 'Social Media Analytics',
            email: 'analytics@socialmedia.com',
            website: 'socialmedia.com',
            category: 'Research Firm',
            rating: 4.6
        },
        {
            id: 'V-019',
            vendor: 'Logistics Solutions Inc.',
            email: 'logistics@solutions.com',
            website: 'logisticsolutions.com',
            category: 'Supplier',
            rating: 4.5
        },
        {
            id: 'V-020',
            vendor: 'Brand Strategy Consultants',
            email: 'strategy@brandconsultants.com',
            website: 'brandconsultants.com',
            category: 'Freelance',
            rating: 4.8
        },
        {
            id: 'V-021',
            vendor: 'Market Research Associates',
            email: 'research@marketassociates.com',
            website: 'marketassociates.com',
            category: 'Research Firm',
            rating: 4.7
        },
        {
            id: 'V-022',
            vendor: 'Equipment Rental Services',
            email: 'rental@equipmentservices.com',
            website: 'equipmentservices.com',
            category: 'Supplier',
            rating: 4.3
        },
        {
            id: 'V-023',
            vendor: 'Mobile App Developers',
            email: 'apps@mobiledevs.com',
            website: 'mobiledevs.com',
            category: 'Freelance',
            rating: 4.9
        },
        {
            id: 'V-024',
            vendor: 'Data Science Institute',
            email: 'data@datascience.com',
            website: 'datascience.com',
            category: 'Research Firm',
            rating: 4.8
        },
        {
            id: 'V-025',
            vendor: 'Construction Materials Ltd.',
            email: 'materials@construction.com',
            website: 'construction.com',
            category: 'Supplier',
            rating: 4.4
        },
        {
            id: 'V-026',
            vendor: 'Graphic Design Studio',
            email: 'design@graphicstudio.com',
            website: 'graphicstudio.com',
            category: 'Freelance',
            rating: 4.7
        },
        {
            id: 'V-027',
            vendor: 'Financial Research Group',
            email: 'finance@researchgroup.com',
            website: 'researchgroup.com',
            category: 'Research Firm',
            rating: 4.6
        },
        {
            id: 'V-028',
            vendor: 'IT Hardware Suppliers',
            email: 'hardware@itsuppliers.com',
            website: 'itsuppliers.com',
            category: 'Supplier',
            rating: 4.5
        },
        {
            id: 'V-029',
            vendor: 'Video Production House',
            email: 'video@productionhouse.com',
            website: 'productionhouse.com',
            category: 'Freelance',
            rating: 4.8
        },
        {
            id: 'V-030',
            vendor: 'Healthcare Analytics',
            email: 'healthcare@analytics.com',
            website: 'healthcareanalytics.com',
            category: 'Research Firm',
            rating: 4.9
        },
        {
            id: 'V-031',
            vendor: 'Office Furniture Plus',
            email: 'furniture@officeplus.com',
            website: 'officeplus.com',
            category: 'Supplier',
            rating: 4.2
        },
        {
            id: 'V-032',
            vendor: 'SEO Optimization Experts',
            email: 'seo@optimization.com',
            website: 'optimization.com',
            category: 'Freelance',
            rating: 4.7
        },
        {
            id: 'V-033',
            vendor: 'Technology Trends Research',
            email: 'trends@techresearch.com',
            website: 'techresearch.com',
            category: 'Research Firm',
            rating: 4.8
        },
        {
            id: 'V-034',
            vendor: 'Packaging Solutions Co.',
            email: 'packaging@solutions.com',
            website: 'packagingsolutions.com',
            category: 'Supplier',
            rating: 4.4
        },
        {
            id: 'V-035',
            vendor: 'Copywriting Services',
            email: 'copy@writingservices.com',
            website: 'writingservices.com',
            category: 'Freelance',
            rating: 4.6
        },
        {
            id: 'V-036',
            vendor: 'Environmental Research Lab',
            email: 'environment@researchlab.com',
            website: 'researchlab.com',
            category: 'Research Firm',
            rating: 4.7
        },
        {
            id: 'V-037',
            vendor: 'Cleaning Supplies Direct',
            email: 'cleaning@suppliesdirect.com',
            website: 'suppliesdirect.com',
            category: 'Supplier',
            rating: 4.3
        },
        {
            id: 'V-038',
            vendor: 'Photography Studio',
            email: 'photo@photostudio.com',
            website: 'photostudio.com',
            category: 'Freelance',
            rating: 4.9
        },
        {
            id: 'V-039',
            vendor: 'Consumer Behavior Studies',
            email: 'behavior@consumerstudies.com',
            website: 'consumerstudies.com',
            category: 'Research Firm',
            rating: 4.5
        },
        {
            id: 'V-040',
            vendor: 'Safety Equipment Corp',
            email: 'safety@equipmentcorp.com',
            website: 'equipmentcorp.com',
            category: 'Supplier',
            rating: 4.6
        },
        {
            id: 'V-041',
            vendor: 'Translation Services',
            email: 'translate@services.com',
            website: 'translationservices.com',
            category: 'Freelance',
            rating: 4.8
        },
        {
            id: 'V-042',
            vendor: 'Market Intelligence Bureau',
            email: 'intelligence@marketbureau.com',
            website: 'marketbureau.com',
            category: 'Research Firm',
            rating: 4.7
        },
        {
            id: 'V-043',
            vendor: 'Energy Solutions Provider',
            email: 'energy@solutionsprovider.com',
            website: 'solutionsprovider.com',
            category: 'Supplier',
            rating: 4.5
        },
        {
            id: 'V-044',
            vendor: 'Voice Over Artists',
            email: 'voice@overartists.com',
            website: 'overartists.com',
            category: 'Freelance',
            rating: 4.9
        },
        {
            id: 'V-045',
            vendor: 'Competitive Analysis Group',
            email: 'analysis@competitivegroup.com',
            website: 'competitivegroup.com',
            category: 'Research Firm',
            rating: 4.6
        },
        {
            id: 'V-046',
            vendor: 'Maintenance Supplies Inc.',
            email: 'maintenance@suppliesinc.com',
            website: 'suppliesinc.com',
            category: 'Supplier',
            rating: 4.4
        },
        {
            id: 'V-047',
            vendor: 'Social Media Management',
            email: 'social@mediamanagement.com',
            website: 'mediamanagement.com',
            category: 'Freelance',
            rating: 4.7
        },
        {
            id: 'V-048',
            vendor: 'Industry Benchmarking',
            email: 'benchmarking@industry.com',
            website: 'industry.com',
            category: 'Research Firm',
            rating: 4.8
        },
        {
            id: 'V-049',
            vendor: 'Security Systems Ltd.',
            email: 'security@systemsltd.com',
            website: 'systemsltd.com',
            category: 'Supplier',
            rating: 4.5
        },
        {
            id: 'V-050',
            vendor: 'Podcast Production Team',
            email: 'podcast@productionteam.com',
            website: 'productionteam.com',
            category: 'Freelance',
            rating: 4.8
        }
    ];

    const filteredVendors = vendors.filter(vendor =>
        vendor.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentVendors = filteredVendors.slice(startIndex, endIndex);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedVendors(currentVendors.map(vendor => vendor.id));
        } else {
            setSelectedVendors([]);
        }
    };

    const handleSelectVendor = (vendorId: string, checked: boolean) => {
        if (checked) {
            setSelectedVendors(prev => [...prev, vendorId]);
        } else {
            setSelectedVendors(prev => prev.filter(id => id !== vendorId));
        }
    };

    // Reset to page 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="w-full ">
            {/* Table */}
            <div className="overflow-x-auto bg-white mb-4 rounded-lg border border-[#E5E7EB]">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-[#EEF3F2] border-b border-[#E5E7EB]">
                        <tr>
                            <th className="px-6 py-4 text-left w-[52px] ">
                                <Checkbox
                                    checked={selectedVendors.length === currentVendors.length && currentVendors.length > 0}
                                    onCheckedChange={handleSelectAll}
                                    className='w-[13.3px] h-[13.3px]  bg-[#EEF3F2]'
                                />
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] #8C8E8E] px-[16px] py-[19px]">
                                ID
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] w#8C8E8E] px-[16px] py-[19px]">
                                Vendor
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] w#8C8E8E] px-[16px] py-[19px]">
                                Website
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] w#8C8E8E] px-[16px] py-[19px]">
                                Categories
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#8C8E8E] px-[16px] py-[19px]">
                                Rating
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                        {currentVendors.map((vendor, index) => (
                            <tr key={`${vendor.id}-${index}`} className="hover:bg-[#F9FAFB]">
                                <td className="px-6 py-4 w-[50px] text-[#EEF3F2]">
                                    <Checkbox
                                        checked={selectedVendors.includes(`${vendor.id}-${index}`)}
                                        onCheckedChange={(checked) => handleSelectVendor(`${vendor.id}-${index}`, checked as boolean)}
                                        className='w-[13.3px] h-[13.3px] '
                                    />
                                </td>
                                <td className="px-[16px] py-[19px] text-[14px]/[22px] text-[#0D978B] font-medium">
                                    {vendor.id}
                                </td>
                                <td className="px-[16px]">
                                    <div>
                                        <div className="text-[14px]/[22px] text-[#353535] font-medium">
                                            {vendor.vendor}
                                        </div>
                                        <div className="text-[11px]/[14px] text-[#A5A5A5]">
                                            {vendor.email}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-[16px] text-[14px]/[22px] text-[#353535]">
                                    {vendor.website}
                                </td>
                                <td className="px-[16px]">
                                    <span className="inline-flex items-center px-2.5 py-0.5 text-[14px]/[22px] font-medium text-[#374151]">
                                        {vendor.category}
                                    </span>
                                </td>
                                <td className="px-[16px]">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-[#FFA750] fill-[#FFA750]" />
                                        <span className="text-[14px]/[22px] text-[#353535] font-medium">
                                            {vendor.rating}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-[#E5E7EB] border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[13px]/[18px] sm:text-[14px]/[20px] text-[#6B7280]">Show per page</span>
                        <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                            setItemsPerPage(parseInt(value));
                            setCurrentPage(1); // Reset to first page when changing items per page
                        }}>
                            <SelectTrigger className="w-16 h-7 rounded-[6px] bg-transparent">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <span className="text-[13px]/[18px] sm:text-[14px]/[20px] text-[#6B7280] sm:ml-4">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredVendors.length)} of {filteredVendors.length} vendors
                    </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="h-9 sm:h-10 w-[90px] sm:w-[112px] p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] hover:bg-[#F9FAFB] flex-shrink-0"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Previous</span>
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 overflow-x-auto">
                        {(() => {
                            const maxVisiblePages = 5; // Will be responsive via CSS
                            const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                            const pages = [];

                            // Show first page and ellipsis if needed
                            if (startPage > 1) {
                                pages.push(
                                    <Button
                                        key={1}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(1)}
                                        className="h-9 sm:h-10 w-9 sm:w-10 p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] text-[#6B7280] hover:bg-[#F9FAFB] flex-shrink-0"
                                    >
                                        1
                                    </Button>
                                );
                                if (startPage > 2) {
                                    pages.push(
                                        <span key="ellipsis1" className="text-[#6B7280] px-1 sm:px-2 text-[12px] sm:text-[14px]">...</span>
                                    );
                                }
                            }

                            // Show visible pages
                            for (let i = startPage; i <= endPage; i++) {
                                pages.push(
                                    <Button
                                        key={i}
                                        variant={currentPage === i ? "primary" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(i)}
                                        className={`h-9 sm:h-10 w-9 sm:w-10 p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] flex-shrink-0 ${currentPage === i
                                            ? 'bg-[#D6EEEC] text-[#0D978B]'
                                            : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                                            }`}
                                    >
                                        {i}
                                    </Button>
                                );
                            }

                            // Show last page and ellipsis if needed
                            if (endPage < totalPages) {
                                if (endPage < totalPages - 1) {
                                    pages.push(
                                        <span key="ellipsis2" className="text-[#6B7280] px-1 sm:px-2 text-[12px] sm:text-[14px]">...</span>
                                    );
                                }
                                pages.push(
                                    <Button
                                        key={totalPages}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(totalPages)}
                                        className="h-9 sm:h-10 w-9 sm:w-10 p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] text-[#6B7280] hover:bg-[#F9FAFB] flex-shrink-0"
                                    >
                                        {totalPages}
                                    </Button>
                                );
                            }

                            return pages;
                        })()}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="h-9 sm:h-10 w-[70px] sm:w-[85px] p-0 text-[13px]/[18px] sm:text-[14px]/[20px] text-gray-900 rounded-[8px] hover:bg-[#F9FAFB] flex-shrink-0"
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Next</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}