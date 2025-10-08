'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Contractors {
    id: string;
    name: string;
    role: string;
    level: string;
    dateOfEmployment: string;
    dateOfBirth: string;
    manager: string;
    department: string;
    avatar?: string;
    managerAvatar?: string;
}

interface ContractorsTableProps {
    searchTerm: string;
}

export default function ContractorsTable({ searchTerm }: ContractorsTableProps) {
    const [selectedContractors, setSelectedContractors] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    const contractors: Contractors[] = [
        {
            id: '#C0001',
            name: 'Alice Fernandez',
            role: 'Senior Data Analyst',
            level: 'Mid',
            dateOfEmployment: '04 Aug, 2020',
            dateOfBirth: '15 Mar, 1985',
            manager: 'Sarah Johnson',
            department: 'Data'
        },
        {
            id: '#C0002',
            name: 'Michael Chen',
            role: 'Software Engineer',
            level: 'Senior',
            dateOfEmployment: '12 Sep, 2020',
            dateOfBirth: '22 Jul, 1988',
            manager: 'David Wilson',
            department: 'Engineering'
        },
        {
            id: '#C0003',
            name: 'Floyd Miles',
            role: 'Chief Executive Officer',
            level: 'Executive',
            dateOfEmployment: '02 Aug, 2020',
            dateOfBirth: '10 Jan, 1975',
            manager: 'Board of Directors',
            department: 'Executive'
        },
        {
            id: '#C0004',
            name: 'Kathryn Murphy',
            role: 'Marketing Manager',
            level: 'Senior',
            dateOfEmployment: '01 Aug, 2020',
            dateOfBirth: '05 Nov, 1982',
            manager: 'Jennifer Lee',
            department: 'Marketing'
        },
        {
            id: '#C0005',
            name: 'Jerome Bell',
            role: 'Project Manager',
            level: 'Senior',
            dateOfEmployment: '30 Jul, 2020',
            dateOfBirth: '18 Apr, 1980',
            manager: 'Robert Taylor',
            department: 'Operations'
        },
        {
            id: '#C0006',
            name: 'Brooklyn Simmons',
            role: 'Graphic Designer',
            level: 'Mid',
            dateOfEmployment: '28 Jul, 2020',
            dateOfBirth: '03 Dec, 1990',
            manager: 'Lisa Anderson',
            department: 'Design'
        },
        {
            id: '#C0007',
            name: 'Cody Fisher',
            role: 'Business Analyst',
            level: 'Mid',
            dateOfEmployment: '25 Jul, 2020',
            dateOfBirth: '14 Jun, 1987',
            manager: 'Amanda Brown',
            department: 'Business'
        },
        {
            id: '#C0008',
            name: 'Esther Howard',
            role: 'UX Designer',
            level: 'Senior',
            dateOfEmployment: '22 Jul, 2020',
            dateOfBirth: '27 Sep, 1983',
            manager: 'Mark Davis',
            department: 'Design'
        },
        {
            id: '#C0009',
            name: 'Jacob Jones',
            role: 'DevOps Engineer',
            level: 'Senior',
            dateOfEmployment: '20 Jul, 2020',
            dateOfBirth: '08 Feb, 1981',
            manager: 'Kevin Martinez',
            department: 'IT'
        },
        {
            id: '#C0010',
            name: 'Leslie Alexander',
            role: 'Frontend Developer',
            level: 'Mid',
            dateOfEmployment: '18 Jul, 2020',
            dateOfBirth: '19 May, 1989',
            manager: 'Rachel Green',
            department: 'Engineering'
        },
        {
            id: '#C0011',
            name: 'Kristin Watson',
            role: 'Product Designer',
            level: 'Senior',
            dateOfEmployment: '15 Jul, 2020',
            dateOfBirth: '11 Aug, 1984',
            manager: 'Tom Wilson',
            department: 'Product'
        },
        {
            id: '#C0012',
            name: 'Marcus Thompson',
            role: 'Backend Developer',
            level: 'Senior',
            dateOfEmployment: '10 Jul, 2020',
            dateOfBirth: '25 Oct, 1986',
            manager: 'Steve Rogers',
            department: 'Engineering'
        },
        {
            id: '#C0013',
            name: 'Natalie Garcia',
            role: 'Data Scientist',
            level: 'Senior',
            dateOfEmployment: '08 Jul, 2020',
            dateOfBirth: '16 Jan, 1985',
            manager: 'Dr. Emily White',
            department: 'Data'
        },
        {
            id: '#C0014',
            name: 'Oliver Rodriguez',
            role: 'Mobile Developer',
            level: 'Mid',
            dateOfEmployment: '05 Jul, 2020',
            dateOfBirth: '02 Mar, 1991',
            manager: 'Alex Kim',
            department: 'Engineering'
        },
        {
            id: '#C0015',
            name: 'Patricia Martinez',
            role: 'Content Strategist',
            level: 'Mid',
            dateOfEmployment: '03 Jul, 2020',
            dateOfBirth: '09 Jul, 1988',
            manager: 'Sophie Turner',
            department: 'Marketing'
        },
        {
            id: '#C0016',
            name: 'Quentin Lee',
            role: 'Security Engineer',
            level: 'Senior',
            dateOfEmployment: '01 Jul, 2020',
            dateOfBirth: '13 Apr, 1982',
            manager: 'James Bond',
            department: 'Security'
        },
        {
            id: '#C0017',
            name: 'Rebecca Clark',
            role: 'QA Engineer',
            level: 'Mid',
            dateOfEmployment: '28 Jun, 2020',
            dateOfBirth: '21 Nov, 1989',
            manager: 'John Smith',
            department: 'Quality'
        },
        {
            id: '#C0018',
            name: 'Samuel Wright',
            role: 'System Administrator',
            level: 'Senior',
            dateOfEmployment: '25 Jun, 2020',
            dateOfBirth: '07 Dec, 1983',
            manager: 'Mike Johnson',
            department: 'IT'
        },
        {
            id: '#C0019',
            name: 'Tina Foster',
            role: 'Digital Marketing Specialist',
            level: 'Mid',
            dateOfEmployment: '22 Jun, 2020',
            dateOfBirth: '30 May, 1990',
            manager: 'Emma Stone',
            department: 'Marketing'
        },
        {
            id: '#C0020',
            name: 'Ulysses Grant',
            role: 'Technical Writer',
            level: 'Junior',
            dateOfEmployment: '20 Jun, 2020',
            dateOfBirth: '17 Aug, 1992',
            manager: 'Anna Taylor',
            department: 'Documentation'
        },
        {
            id: '#C0021',
            name: 'Victoria Adams',
            role: 'Financial Analyst',
            level: 'Senior',
            dateOfEmployment: '18 Jun, 2020',
            dateOfBirth: '04 Feb, 1987',
            manager: 'Chris Brown',
            department: 'Finance'
        },
        {
            id: '#C0022',
            name: 'William Turner',
            role: 'Sales Engineer',
            level: 'Senior',
            dateOfEmployment: '15 Jun, 2020',
            dateOfBirth: '26 Sep, 1984',
            manager: 'Lisa Garcia',
            department: 'Sales'
        },
        {
            id: '#C0023',
            name: 'Xavier Moore',
            role: 'Cloud Architect',
            level: 'Executive',
            dateOfEmployment: '12 Jun, 2020',
            dateOfBirth: '12 Jan, 1979',
            manager: 'David Lee',
            department: 'Cloud'
        },
        {
            id: '#C0024',
            name: 'Yolanda King',
            role: 'HR Specialist',
            level: 'Mid',
            dateOfEmployment: '10 Jun, 2020',
            dateOfBirth: '23 Jun, 1986',
            manager: 'Jennifer Wilson',
            department: 'Human Resources'
        },
        {
            id: '#C0025',
            name: 'Zachary Scott',
            role: 'Database Administrator',
            level: 'Senior',
            dateOfEmployment: '08 Jun, 2020',
            dateOfBirth: '15 Oct, 1981',
            manager: 'Robert Kim',
            department: 'Database'
        },
        {
            id: '#C0026',
            name: 'Amanda White',
            role: 'UI Designer',
            level: 'Mid',
            dateOfEmployment: '05 Jun, 2020',
            dateOfBirth: '28 Mar, 1988',
            manager: 'Sarah Davis',
            department: 'Design'
        },
        {
            id: '#C0027',
            name: 'Brandon Young',
            role: 'Network Engineer',
            level: 'Senior',
            dateOfEmployment: '03 Jun, 2020',
            dateOfBirth: '06 Nov, 1983',
            manager: 'Kevin Brown',
            department: 'Network'
        },
        {
            id: '#C0028',
            name: 'Catherine Hall',
            role: 'Business Intelligence Analyst',
            level: 'Senior',
            dateOfEmployment: '01 Jun, 2020',
            dateOfBirth: '14 Jul, 1985',
            manager: 'Michael Green',
            department: 'Analytics'
        },
        {
            id: '#C0029',
            name: 'Daniel Allen',
            role: 'Full Stack Developer',
            level: 'Senior',
            dateOfEmployment: '29 May, 2020',
            dateOfBirth: '20 Dec, 1982',
            manager: 'Rachel Martinez',
            department: 'Engineering'
        },
        {
            id: '#C0030',
            name: 'Elena Baker',
            role: 'Product Manager',
            level: 'Senior',
            dateOfEmployment: '27 May, 2020',
            dateOfBirth: '01 Apr, 1987',
            manager: 'Tom Anderson',
            department: 'Product'
        },
        {
            id: '#C0031',
            name: 'Frank Nelson',
            role: 'Machine Learning Engineer',
            level: 'Senior',
            dateOfEmployment: '25 May, 2020',
            dateOfBirth: '18 Sep, 1984',
            manager: 'Dr. Sarah Kim',
            department: 'AI/ML'
        },
        {
            id: '#C0032',
            name: 'Grace Carter',
            role: 'Social Media Manager',
            level: 'Mid',
            dateOfEmployment: '22 May, 2020',
            dateOfBirth: '11 May, 1989',
            manager: 'Emma Wilson',
            department: 'Marketing'
        },
        {
            id: '#C0033',
            name: 'Henry Mitchell',
            role: 'Infrastructure Engineer',
            level: 'Senior',
            dateOfEmployment: '20 May, 2020',
            dateOfBirth: '29 Jan, 1986',
            manager: 'John Davis',
            department: 'Infrastructure'
        },
        {
            id: '#C0034',
            name: 'Iris Perez',
            role: 'Customer Success Manager',
            level: 'Mid',
            dateOfEmployment: '18 May, 2020',
            dateOfBirth: '22 Aug, 1988',
            manager: 'Lisa Taylor',
            department: 'Customer Success'
        },
        {
            id: '#C0035',
            name: 'Jack Roberts',
            role: 'API Developer',
            level: 'Mid',
            dateOfEmployment: '15 May, 2020',
            dateOfBirth: '05 Mar, 1990',
            manager: 'Alex Johnson',
            department: 'Engineering'
        },
        {
            id: '#C0036',
            name: 'Kelly Torres',
            role: 'Event Coordinator',
            level: 'Junior',
            dateOfEmployment: '13 May, 2020',
            dateOfBirth: '16 Oct, 1991',
            manager: 'Maria Garcia',
            department: 'Events'
        },
        {
            id: '#C0037',
            name: 'Liam Phillips',
            role: 'Cybersecurity Analyst',
            level: 'Senior',
            dateOfEmployment: '10 May, 2020',
            dateOfBirth: '08 Jun, 1983',
            manager: 'Security Team Lead',
            department: 'Security'
        },
        {
            id: '#C0038',
            name: 'Maya Campbell',
            role: 'Brand Manager',
            level: 'Senior',
            dateOfEmployment: '08 May, 2020',
            dateOfBirth: '13 Feb, 1985',
            manager: 'Creative Director',
            department: 'Brand'
        },
        {
            id: '#C0039',
            name: 'Noah Parker',
            role: 'Site Reliability Engineer',
            level: 'Senior',
            dateOfEmployment: '05 May, 2020',
            dateOfBirth: '27 Nov, 1981',
            manager: 'SRE Team Lead',
            department: 'SRE'
        },
        {
            id: '#C0040',
            name: 'Olivia Evans',
            role: 'Research Analyst',
            level: 'Mid',
            dateOfEmployment: '03 May, 2020',
            dateOfBirth: '19 Apr, 1987',
            manager: 'Research Director',
            department: 'Research'
        },
        {
            id: '#C0041',
            name: 'Peter Edwards',
            role: 'Technical Lead',
            level: 'Executive',
            dateOfEmployment: '01 May, 2020',
            dateOfBirth: '03 Dec, 1978',
            manager: 'CTO',
            department: 'Engineering'
        },
        {
            id: '#C0042',
            name: 'Quinn Collins',
            role: 'Content Creator',
            level: 'Mid',
            dateOfEmployment: '28 Apr, 2020',
            dateOfBirth: '25 Jul, 1989',
            manager: 'Content Manager',
            department: 'Content'
        },
        {
            id: '#C0043',
            name: 'Ruby Stewart',
            role: 'Operations Manager',
            level: 'Senior',
            dateOfEmployment: '26 Apr, 2020',
            dateOfBirth: '12 Jan, 1984',
            manager: 'COO',
            department: 'Operations'
        },
        {
            id: '#C0044',
            name: 'Sebastian Sanchez',
            role: 'Integration Specialist',
            level: 'Mid',
            dateOfEmployment: '24 Apr, 2020',
            dateOfBirth: '07 Sep, 1986',
            manager: 'Integration Lead',
            department: 'Integration'
        },
        {
            id: '#C0045',
            name: 'Tessa Morris',
            role: 'Training Coordinator',
            level: 'Junior',
            dateOfEmployment: '22 Apr, 2020',
            dateOfBirth: '14 Mar, 1992',
            manager: 'HR Manager',
            department: 'Training'
        },
        {
            id: '#C0046',
            name: 'Ulysses Rogers',
            role: 'Performance Engineer',
            level: 'Senior',
            dateOfEmployment: '20 Apr, 2020',
            dateOfBirth: '21 Oct, 1980',
            manager: 'Performance Lead',
            department: 'Performance'
        },
        {
            id: '#C0047',
            name: 'Violet Reed',
            role: 'Compliance Officer',
            level: 'Senior',
            dateOfEmployment: '18 Apr, 2020',
            dateOfBirth: '09 May, 1983',
            manager: 'Legal Director',
            department: 'Compliance'
        },
        {
            id: '#C0048',
            name: 'Wesley Cook',
            role: 'Automation Engineer',
            level: 'Mid',
            dateOfEmployment: '15 Apr, 2020',
            dateOfBirth: '31 Aug, 1988',
            manager: 'Automation Lead',
            department: 'Automation'
        },
        {
            id: '#C0049',
            name: 'Xara Bailey',
            role: 'Vendor Relations Manager',
            level: 'Mid',
            dateOfEmployment: '13 Apr, 2020',
            dateOfBirth: '26 Nov, 1985',
            manager: 'Procurement Director',
            department: 'Procurement'
        },
        {
            id: '#C0050',
            name: 'Yusuf Rivera',
            role: 'Technical Consultant',
            level: 'Senior',
            dateOfEmployment: '10 Apr, 2020',
            dateOfBirth: '17 Feb, 1982',
            manager: 'Consulting Director',
            department: 'Consulting'
        }
    ];

    const filteredContractors = contractors.filter(contractor =>
        contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredContractors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentContractors = filteredContractors.slice(startIndex, endIndex);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedContractors(currentContractors.map(contractor => contractor.id));
        } else {
            setSelectedContractors([]);
        }
    };

    const handleSelectContractor = (contractorId: string, checked: boolean) => {
        if (checked) {
            setSelectedContractors(prev => [...prev, contractorId]);
        } else {
            setSelectedContractors(prev => prev.filter(id => id !== contractorId));
        }
    };

    // Reset to page 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="w-full ">
            {/* Table */}
            <div className="overflow-x-auto bg-white mb-4 rounded-lg border border-[#E5E7EB]">
                <table className="w-full min-w-[1200px]">
                    <thead className="bg-[#EEF3F2] border-b border-[#E5E7EB]">
                        <tr>
                            <th className="px-6 py-4 text-left w-[52px] ">
                                <Checkbox
                                    checked={selectedContractors.length === currentContractors.length && currentContractors.length > 0}
                                    onCheckedChange={handleSelectAll}
                                    className='w-[13.3px] h-[13.3px]  bg-[#EEF3F2]'
                                />
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] #8C8E8E] px-[16px] py-[19px]">
                                ID
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] w#8C8E8E] px-[16px] py-[19px]">
                                Name
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] w#8C8E8E] px-[16px] py-[19px]">
                                Role
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] w#8C8E8E] px-[16px] py-[19px]">
                                Level
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] w#8C8E8E] px-[16px] py-[19px]">
                                Date of Employment
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] w#8C8E8E] px-[16px] py-[19px]">
                                Date of Birth
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#6B7280] w#8C8E8E] px-[16px] py-[19px]">
                                Manager
                            </th>
                            <th className=" text-left text-[14px]/[22px] font-medium text-[#8C8E8E] px-[16px] py-[19px]">
                                Department
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                        {currentContractors.map((contractor) => (
                            <tr key={contractor.id} className="hover:bg-[#F9FAFB]">
                                <td className="px-6 py-4 w-[50px] text-[#EEF3F2]">
                                    <Checkbox
                                        checked={selectedContractors.includes(contractor.id)}
                                        onCheckedChange={(checked) => handleSelectContractor(contractor.id, checked as boolean)}
                                        className='w-[13.3px] h-[13.3px] '
                                    />
                                </td>
                                <td className="px-[16px] py-[19px] text-[14px]/[22px] text-[#353535] font-medium">
                                    {contractor.id}
                                </td>
                                <td className="px-[16px]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-[#0D978B] flex items-center justify-center text-white text-[12px] font-medium">
                                            {getInitials(contractor.name)}
                                        </div>
                                        <span className="text-[14px]/[22px] text-[#353535] font-medium">
                                            {contractor.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-[16px]">
                                    <div>
                                        <div className="text-[14px]/[22px] text-[#353535] font-medium">
                                            {contractor.role}
                                        </div>
                                        <div className="text-[11px]/[14px] text-[#A5A5A5]">
                                            USA
                                        </div>
                                    </div>
                                </td>
                                <td className="px-[16px]">
                                    <span className="inline-flex items-center px-2.5 py-0.5  text-[14px]/[22px] font-medium text-[#353535]">
                                        {contractor.level}
                                    </span>
                                </td>
                                <td className="px-[16px] text-[14px]/[22px] text-[#353535]">
                                    {contractor.dateOfEmployment}
                                </td>
                                <td className="px-[16px] text-[14px]/[22px] text-[#353535]">
                                    {contractor.dateOfBirth}
                                </td>
                                <td className="px-[16px]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#0D978B] flex items-center justify-center text-white text-[10px] font-medium">
                                            {getInitials(contractor.manager)}
                                        </div>
                                        <span className="text-[14px]/[22px] text-[#353535]">
                                            {contractor.manager}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-[16px] text-[14px]/[22px] text-[#353535]">
                                    {contractor.department}
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
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredContractors.length)} of {filteredContractors.length} contractors
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
