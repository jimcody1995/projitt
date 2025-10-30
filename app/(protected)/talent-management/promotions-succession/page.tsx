'use client';

import { useRef, useState } from 'react';
import { Search, Filter, MoreHorizontal, X, ListFilter, Download, MoreVertical, ArrowLeft, ArrowRight, Mail, Phone, Calendar, User, Target, Award, Users, ChevronDown, Sparkles, CircleCheck, CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, InputWrapper } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetBody, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import PromoteSheet from './components/promte';
import StartPinSheet from './components/startPip';
import AddSuccessionPlanSheet from './components/addSuccessionSheet';

// Employee card component
interface EmployeeCardProps {
    id: string;
    name: string;
    role: string;
    avatar: string;
    retentionRisk: 'Low' | 'Medium' | 'High';
    performanceScore: number;
    onClick?: () => void;
}

// Extended employee profile interface for the sheet
interface EmployeeProfile extends EmployeeCardProps {
    manager: string;
    department: string;
    email: string;
    phone: string;
    joinDate: string;
    lastPromotion: string;
    goals: Array<{
        title: string;
        progress: number;
        status: 'Completed' | 'In Progress' | 'Pending';
    }>;
    skills: Array<{
        name: string;
        level: 'Beginner' | 'Intermediate' | 'Advanced';
    }>;
    successors: Array<{
        name: string;
        readiness: string;
    }>;
}

function EmployeeCard({ name, role, avatar, retentionRisk, performanceScore, onClick }: EmployeeCardProps) {
    const getPerformanceColor = (score: number) => {
        if (score >= 4.0) return 'bg-[#C0FFE5] text-[#00683D] border-[#00683D] border-[1px]';
        if (score >= 3.5) return 'bg-[#FFDFC0] text-[#934900] border-[#934900] border-[1px]';
        if (score <= 2.5) return 'bg-[#C306061A] text-[#C30606] border-[#C30606] border-[1px]';
        return 'bg-red-100 text-red-800 border-red-200 border-[1px]';
    };

    const getRiskColor = (risk: string) => {
        if (risk === 'Low') return 'text-gray-600';
        if (risk === 'Medium') return 'text-orange-600';
        return 'text-red-600';
    };

    return (
        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <CardContent className="p-[16px]">
                <div className="flex items-start justify-between mb-4" onClick={onClick}>
                    <div className="flex items-center gap-3">
                        <img
                            src={`https://i.pravatar.cc/40?img=${(1)}`}
                            alt="avatar"
                            className="w-[40px] h-[40px] rounded-full"
                        />
                        <div>
                            <h3 className="font-medium text-gray-900 text-[18px]/[24px]">{name}</h3>
                            <p className="text-sm text-gray-600 text-[14px]/[22px]">{role}</p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B]" onClick={(e) => e.stopPropagation()}>View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B]" onClick={(e) => e.stopPropagation()}>
                                Edit Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-[12px]/[18px] text-[#4B4B4B]" onClick={(e) => e.stopPropagation()}>Assign Successor</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>

                <div className="space-y-3" onClick={onClick}>
                    <div>
                        <p className="text-[14px]/[22px] text-gray-600 mb-1">Retention Risk: {retentionRisk}</p>
                    </div>
                    <div className="flex flex-row gap-[8px]">
                        <p className="text-[14px]/[22px] text-gray-600 mb-1">Performance Score:</p>
                        <Badge
                            variant="outline"
                            className={`${getPerformanceColor(performanceScore)} font-medium`}
                        >
                            {performanceScore.toFixed(1)}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Sample data - matches the image layout with variety
const employees: EmployeeProfile[] = [
    {
        id: '1',
        name: 'Alice Fernandez',
        role: 'Senior Data Analyst',
        avatar: 'AF',
        retentionRisk: 'Low',
        performanceScore: 4.5,
        manager: 'Joe Brady',
        department: 'Data Analytics',
        email: 'alice.fernandez@company.com',
        phone: '+1 (555) 123-4567',
        joinDate: '2020-01-15',
        lastPromotion: '2023-06-01',
        goals: [
            { title: 'Complete Advanced Analytics Certification', progress: 80, status: 'In Progress' },
            { title: 'Lead Q4 Data Migration Project', progress: 100, status: 'Completed' },
            { title: 'Mentor 3 Junior Analysts', progress: 60, status: 'In Progress' }
        ],
        skills: [
            { name: 'Python', level: 'Advanced' },
            { name: 'SQL', level: 'Advanced' },
            { name: 'Machine Learning', level: 'Intermediate' },
            { name: 'Data Visualization', level: 'Advanced' }
        ],
        successors: [
            { name: 'Sarah Connor', readiness: 'Ready in 6 months' },
            { name: 'Mike Johnson', readiness: 'Ready in 1 year' }
        ]
    },
    { id: '2', name: 'Bob Wilson', role: 'Marketing Manager', avatar: 'BW', retentionRisk: 'Medium', performanceScore: 3.8, manager: 'Jane Smith', department: 'Marketing', email: 'bob.wilson@company.com', phone: '+1 (555) 234-5678', joinDate: '2019-03-20', lastPromotion: '2022-08-15', goals: [{ title: 'Launch Q1 Campaign', progress: 90, status: 'In Progress' }], skills: [{ name: 'Digital Marketing', level: 'Advanced' }], successors: [{ name: 'Lisa Park', readiness: 'Ready in 8 months' }] },
    { id: '3', name: 'Carol Davis', role: 'Software Engineer', avatar: 'CD', retentionRisk: 'Low', performanceScore: 4.8, manager: 'Tom Brown', department: 'Engineering', email: 'carol.davis@company.com', phone: '+1 (555) 345-6789', joinDate: '2021-05-10', lastPromotion: '2023-12-01', goals: [{ title: 'Complete React Migration', progress: 75, status: 'In Progress' }], skills: [{ name: 'React', level: 'Advanced' }], successors: [{ name: 'Alex Kim', readiness: 'Ready in 1 year' }] },
    { id: '4', name: 'David Miller', role: 'Product Manager', avatar: 'DM', retentionRisk: 'Low', performanceScore: 4.9, manager: 'Sarah Johnson', department: 'Product', email: 'david.miller@company.com', phone: '+1 (555) 456-7890', joinDate: '2018-09-25', lastPromotion: '2022-11-30', goals: [{ title: 'Launch Mobile App v2.0', progress: 95, status: 'In Progress' }], skills: [{ name: 'Product Strategy', level: 'Advanced' }], successors: [{ name: 'Emily Chen', readiness: 'Ready in 6 months' }] },
    { id: '5', name: 'Eva Rodriguez', role: 'UX Designer', avatar: 'ER', retentionRisk: 'Low', performanceScore: 4.7, manager: 'Chris Lee', department: 'Design', email: 'eva.rodriguez@company.com', phone: '+1 (555) 567-8901', joinDate: '2020-11-08', lastPromotion: '2023-03-15', goals: [{ title: 'Redesign User Dashboard', progress: 85, status: 'In Progress' }], skills: [{ name: 'Figma', level: 'Advanced' }], successors: [{ name: 'Ryan Taylor', readiness: 'Ready in 10 months' }] },
    { id: '6', name: 'Frank Thompson', role: 'Sales Director', avatar: 'FT', retentionRisk: 'Medium', performanceScore: 4.2, manager: 'Linda White', department: 'Sales', email: 'frank.thompson@company.com', phone: '+1 (555) 678-9012', joinDate: '2017-06-12', lastPromotion: '2021-09-20', goals: [{ title: 'Achieve Q4 Sales Target', progress: 70, status: 'In Progress' }], skills: [{ name: 'Sales Strategy', level: 'Advanced' }], successors: [{ name: 'Grace Wong', readiness: 'Ready in 1 year' }] },
    { id: '7', name: 'Grace Lee', role: 'HR Specialist', avatar: 'GL', retentionRisk: 'High', performanceScore: 2.1, manager: 'Kevin Davis', department: 'Human Resources', email: 'grace.lee@company.com', phone: '+1 (555) 789-0123', joinDate: '2022-02-14', lastPromotion: 'N/A', goals: [{ title: 'Complete HR Certification', progress: 30, status: 'In Progress' }], skills: [{ name: 'Recruitment', level: 'Beginner' }], successors: [] },
    { id: '8', name: 'Henry Garcia', role: 'Finance Analyst', avatar: 'HG', retentionRisk: 'Low', performanceScore: 4.0, manager: 'Maria Lopez', department: 'Finance', email: 'henry.garcia@company.com', phone: '+1 (555) 890-1234', joinDate: '2019-08-30', lastPromotion: '2022-12-10', goals: [{ title: 'Automate Financial Reports', progress: 60, status: 'In Progress' }], skills: [{ name: 'Excel', level: 'Advanced' }], successors: [{ name: 'Ivy Chen', readiness: 'Ready in 8 months' }] },
    { id: '9', name: 'Iris Johnson', role: 'QA Engineer', avatar: 'IJ', retentionRisk: 'Low', performanceScore: 4.6, manager: 'Paul Green', department: 'Quality Assurance', email: 'iris.johnson@company.com', phone: '+1 (555) 901-2345', joinDate: '2020-07-22', lastPromotion: '2023-04-08', goals: [{ title: 'Implement Automation Tests', progress: 80, status: 'In Progress' }], skills: [{ name: 'Selenium', level: 'Advanced' }], successors: [{ name: 'Jack Wilson', readiness: 'Ready in 1 year' }] },
    { id: '10', name: 'Jack Brown', role: 'DevOps Engineer', avatar: 'JB', retentionRisk: 'Low', performanceScore: 4.4, manager: 'Nancy Wilson', department: 'Infrastructure', email: 'jack.brown@company.com', phone: '+1 (555) 012-3456', joinDate: '2021-01-18', lastPromotion: '2023-07-25', goals: [{ title: 'Migrate to Kubernetes', progress: 90, status: 'In Progress' }], skills: [{ name: 'Docker', level: 'Advanced' }], successors: [{ name: 'Kate Martinez', readiness: 'Ready in 6 months' }] },
    { id: '11', name: 'Kate Davis', role: 'Content Writer', avatar: 'KD', retentionRisk: 'Low', performanceScore: 4.3, manager: 'Oliver Smith', department: 'Marketing', email: 'kate.davis@company.com', phone: '+1 (555) 123-4567', joinDate: '2021-10-05', lastPromotion: '2023-09-12', goals: [{ title: 'Launch Content Strategy', progress: 75, status: 'In Progress' }], skills: [{ name: 'Content Marketing', level: 'Advanced' }], successors: [{ name: 'Leo Thompson', readiness: 'Ready in 10 months' }] },
    { id: '12', name: 'Leo Wilson', role: 'Business Analyst', avatar: 'LW', retentionRisk: 'Medium', performanceScore: 3.9, manager: 'Quinn Johnson', department: 'Business Intelligence', email: 'leo.wilson@company.com', phone: '+1 (555) 234-5678', joinDate: '2020-04-15', lastPromotion: '2022-10-30', goals: [{ title: 'Optimize Business Processes', progress: 65, status: 'In Progress' }], skills: [{ name: 'Business Analysis', level: 'Intermediate' }], successors: [{ name: 'Mia Garcia', readiness: 'Ready in 1 year' }] },
    { id: '13', name: 'Mia Rodriguez', role: 'Graphic Designer', avatar: 'MR', retentionRisk: 'Low', performanceScore: 4.4, manager: 'Rachel Davis', department: 'Design', email: 'mia.rodriguez@company.com', phone: '+1 (555) 345-6789', joinDate: '2021-12-20', lastPromotion: '2023-11-05', goals: [{ title: 'Rebrand Company Materials', progress: 85, status: 'In Progress' }], skills: [{ name: 'Adobe Creative Suite', level: 'Advanced' }], successors: [{ name: 'Noah Lee', readiness: 'Ready in 8 months' }] },
    { id: '14', name: 'Noah Martinez', role: 'Customer Success Manager', avatar: 'NM', retentionRisk: 'Low', performanceScore: 4.3, manager: 'Sophie Brown', department: 'Customer Success', email: 'noah.martinez@company.com', phone: '+1 (555) 456-7890', joinDate: '2019-11-12', lastPromotion: '2022-05-18', goals: [{ title: 'Increase Customer Retention', progress: 70, status: 'In Progress' }], skills: [{ name: 'Customer Relations', level: 'Advanced' }], successors: [{ name: 'Olivia Wilson', readiness: 'Ready in 6 months' }] },
    { id: '15', name: 'Olivia Garcia', role: 'Operations Manager', avatar: 'OG', retentionRisk: 'Low', performanceScore: 3.9, manager: 'Tyler Johnson', department: 'Operations', email: 'olivia.garcia@company.com', phone: '+1 (555) 567-8901', joinDate: '2018-07-25', lastPromotion: '2021-12-08', goals: [{ title: 'Streamline Operations', progress: 80, status: 'In Progress' }], skills: [{ name: 'Process Optimization', level: 'Advanced' }], successors: [{ name: 'Peter Davis', readiness: 'Ready in 1 year' }] },
    { id: '16', name: 'Peter Davis', role: 'Frontend Developer', avatar: 'PD', retentionRisk: 'Low', performanceScore: 4.2, manager: 'Sarah Wilson', department: 'Engineering', email: 'peter.davis@company.com', phone: '+1 (555) 678-9012', joinDate: '2021-03-10', lastPromotion: '2023-08-15', goals: [{ title: 'Master React Native', progress: 60, status: 'In Progress' }], skills: [{ name: 'React', level: 'Advanced' }], successors: [{ name: 'Quinn Martinez', readiness: 'Ready in 8 months' }] },
    { id: '17', name: 'Quinn Martinez', role: 'Backend Developer', avatar: 'QM', retentionRisk: 'Low', performanceScore: 4.5, manager: 'Tom Anderson', department: 'Engineering', email: 'quinn.martinez@company.com', phone: '+1 (555) 789-0123', joinDate: '2020-09-20', lastPromotion: '2023-05-30', goals: [{ title: 'Implement Microservices', progress: 75, status: 'In Progress' }], skills: [{ name: 'Node.js', level: 'Advanced' }], successors: [{ name: 'Rachel Brown', readiness: 'Ready in 1 year' }] },
    { id: '18', name: 'Rachel Brown', role: 'Data Scientist', avatar: 'RB', retentionRisk: 'Low', performanceScore: 4.7, manager: 'Kevin Lee', department: 'Data Science', email: 'rachel.brown@company.com', phone: '+1 (555) 890-1234', joinDate: '2019-12-05', lastPromotion: '2022-11-20', goals: [{ title: 'Build ML Pipeline', progress: 85, status: 'In Progress' }], skills: [{ name: 'Machine Learning', level: 'Advanced' }], successors: [{ name: 'Sam Wilson', readiness: 'Ready in 6 months' }] },
    { id: '19', name: 'Sam Wilson', role: 'Security Engineer', avatar: 'SW', retentionRisk: 'Medium', performanceScore: 3.8, manager: 'Lisa Garcia', department: 'Security', email: 'sam.wilson@company.com', phone: '+1 (555) 901-2345', joinDate: '2021-06-15', lastPromotion: '2023-02-28', goals: [{ title: 'Implement Zero Trust', progress: 70, status: 'In Progress' }], skills: [{ name: 'Cybersecurity', level: 'Advanced' }], successors: [{ name: 'Tina Johnson', readiness: 'Ready in 10 months' }] },
    { id: '20', name: 'Tina Johnson', role: 'Mobile Developer', avatar: 'TJ', retentionRisk: 'Low', performanceScore: 4.3, manager: 'Mike Davis', department: 'Engineering', email: 'tina.johnson@company.com', phone: '+1 (555) 012-3456', joinDate: '2020-11-30', lastPromotion: '2023-06-10', goals: [{ title: 'Launch iOS App', progress: 90, status: 'In Progress' }], skills: [{ name: 'Swift', level: 'Advanced' }], successors: [{ name: 'Uma Rodriguez', readiness: 'Ready in 8 months' }] },
    { id: '21', name: 'Uma Rodriguez', role: 'Cloud Architect', avatar: 'UR', retentionRisk: 'Low', performanceScore: 4.6, manager: 'David Smith', department: 'Infrastructure', email: 'uma.rodriguez@company.com', phone: '+1 (555) 123-4567', joinDate: '2018-04-12', lastPromotion: '2022-09-15', goals: [{ title: 'Migrate to AWS', progress: 80, status: 'In Progress' }], skills: [{ name: 'AWS', level: 'Advanced' }], successors: [{ name: 'Victor Lee', readiness: 'Ready in 1 year' }] },
    { id: '22', name: 'Victor Lee', role: 'Database Administrator', avatar: 'VL', retentionRisk: 'Low', performanceScore: 4.1, manager: 'Nancy Brown', department: 'Infrastructure', email: 'victor.lee@company.com', phone: '+1 (555) 234-5678', joinDate: '2019-08-25', lastPromotion: '2022-12-05', goals: [{ title: 'Optimize Database Performance', progress: 65, status: 'In Progress' }], skills: [{ name: 'PostgreSQL', level: 'Advanced' }], successors: [{ name: 'Wendy Garcia', readiness: 'Ready in 6 months' }] },
    { id: '23', name: 'Wendy Garcia', role: 'Technical Writer', avatar: 'WG', retentionRisk: 'Low', performanceScore: 4.0, manager: 'Paul Wilson', department: 'Documentation', email: 'wendy.garcia@company.com', phone: '+1 (555) 345-6789', joinDate: '2021-01-15', lastPromotion: '2023-04-20', goals: [{ title: 'Create API Documentation', progress: 75, status: 'In Progress' }], skills: [{ name: 'Technical Writing', level: 'Advanced' }], successors: [{ name: 'Xavier Martinez', readiness: 'Ready in 10 months' }] },
    { id: '24', name: 'Xavier Martinez', role: 'System Administrator', avatar: 'XM', retentionRisk: 'Medium', performanceScore: 3.7, manager: 'Kelly Johnson', department: 'IT Operations', email: 'xavier.martinez@company.com', phone: '+1 (555) 456-7890', joinDate: '2020-05-08', lastPromotion: '2022-08-30', goals: [{ title: 'Automate Server Management', progress: 60, status: 'In Progress' }], skills: [{ name: 'Linux', level: 'Advanced' }], successors: [{ name: 'Yara Davis', readiness: 'Ready in 1 year' }] },
    { id: '25', name: 'Yara Davis', role: 'Network Engineer', avatar: 'YD', retentionRisk: 'Low', performanceScore: 4.4, manager: 'Robert Brown', department: 'Infrastructure', email: 'yara.davis@company.com', phone: '+1 (555) 567-8901', joinDate: '2019-10-12', lastPromotion: '2023-01-25', goals: [{ title: 'Upgrade Network Infrastructure', progress: 85, status: 'In Progress' }], skills: [{ name: 'Network Security', level: 'Advanced' }], successors: [{ name: 'Zoe Wilson', readiness: 'Ready in 8 months' }] },
    { id: '26', name: 'Zoe Wilson', role: 'Product Designer', avatar: 'ZW', retentionRisk: 'Low', performanceScore: 4.5, manager: 'Jennifer Lee', department: 'Design', email: 'zoe.wilson@company.com', phone: '+1 (555) 678-9012', joinDate: '2021-07-20', lastPromotion: '2023-10-15', goals: [{ title: 'Design New User Interface', progress: 70, status: 'In Progress' }], skills: [{ name: 'UI/UX Design', level: 'Advanced' }], successors: [{ name: 'Adam Rodriguez', readiness: 'Ready in 6 months' }] },
    { id: '27', name: 'Adam Rodriguez', role: 'Business Intelligence Analyst', avatar: 'AR', retentionRisk: 'Low', performanceScore: 4.2, manager: 'Michelle Garcia', department: 'Business Intelligence', email: 'adam.rodriguez@company.com', phone: '+1 (555) 789-0123', joinDate: '2020-12-10', lastPromotion: '2023-03-05', goals: [{ title: 'Create Executive Dashboards', progress: 80, status: 'In Progress' }], skills: [{ name: 'Power BI', level: 'Advanced' }], successors: [{ name: 'Bella Johnson', readiness: 'Ready in 1 year' }] },
    { id: '28', name: 'Bella Johnson', role: 'Customer Support Manager', avatar: 'BJ', retentionRisk: 'Low', performanceScore: 3.9, manager: 'Daniel Smith', department: 'Customer Support', email: 'bella.johnson@company.com', phone: '+1 (555) 890-1234', joinDate: '2019-06-18', lastPromotion: '2022-10-12', goals: [{ title: 'Improve Response Time', progress: 75, status: 'In Progress' }], skills: [{ name: 'Customer Service', level: 'Advanced' }], successors: [{ name: 'Carlos Martinez', readiness: 'Ready in 8 months' }] },
    { id: '29', name: 'Carlos Martinez', role: 'Quality Assurance Lead', avatar: 'CM', retentionRisk: 'Low', performanceScore: 4.3, manager: 'Amanda Brown', department: 'Quality Assurance', email: 'carlos.martinez@company.com', phone: '+1 (555) 901-2345', joinDate: '2018-11-25', lastPromotion: '2022-07-20', goals: [{ title: 'Implement Test Automation', progress: 90, status: 'In Progress' }], skills: [{ name: 'Test Automation', level: 'Advanced' }], successors: [{ name: 'Diana Lee', readiness: 'Ready in 6 months' }] },
    { id: '30', name: 'Diana Lee', role: 'Scrum Master', avatar: 'DL', retentionRisk: 'Low', performanceScore: 4.1, manager: 'Steven Wilson', department: 'Engineering', email: 'diana.lee@company.com', phone: '+1 (555) 012-3456', joinDate: '2020-02-14', lastPromotion: '2023-05-08', goals: [{ title: 'Improve Team Velocity', progress: 65, status: 'In Progress' }], skills: [{ name: 'Agile Methodology', level: 'Advanced' }], successors: [{ name: 'Ethan Garcia', readiness: 'Ready in 10 months' }] },
    { id: '31', name: 'Ethan Garcia', role: 'DevOps Lead', avatar: 'EG', retentionRisk: 'Low', performanceScore: 4.6, manager: 'Patricia Davis', department: 'Infrastructure', email: 'ethan.garcia@company.com', phone: '+1 (555) 123-4567', joinDate: '2019-09-30', lastPromotion: '2022-12-18', goals: [{ title: 'Implement CI/CD Pipeline', progress: 85, status: 'In Progress' }], skills: [{ name: 'Jenkins', level: 'Advanced' }], successors: [{ name: 'Fiona Rodriguez', readiness: 'Ready in 1 year' }] },
    { id: '32', name: 'Fiona Rodriguez', role: 'UX Researcher', avatar: 'FR', retentionRisk: 'Low', performanceScore: 4.4, manager: 'Mark Johnson', department: 'Design', email: 'fiona.rodriguez@company.com', phone: '+1 (555) 234-5678', joinDate: '2021-04-22', lastPromotion: '2023-08-30', goals: [{ title: 'Conduct User Studies', progress: 70, status: 'In Progress' }], skills: [{ name: 'User Research', level: 'Advanced' }], successors: [{ name: 'George Wilson', readiness: 'Ready in 8 months' }] },
    { id: '33', name: 'George Wilson', role: 'API Developer', avatar: 'GW', retentionRisk: 'Low', performanceScore: 4.3, manager: 'Laura Brown', department: 'Engineering', email: 'george.wilson@company.com', phone: '+1 (555) 345-6789', joinDate: '2020-08-15', lastPromotion: '2023-02-10', goals: [{ title: 'Build RESTful APIs', progress: 80, status: 'In Progress' }], skills: [{ name: 'API Development', level: 'Advanced' }], successors: [{ name: 'Hannah Martinez', readiness: 'Ready in 6 months' }] },
    { id: '34', name: 'Hannah Martinez', role: 'Content Marketing Manager', avatar: 'HM', retentionRisk: 'Low', performanceScore: 4.0, manager: 'James Lee', department: 'Marketing', email: 'hannah.martinez@company.com', phone: '+1 (555) 456-7890', joinDate: '2019-12-08', lastPromotion: '2022-11-25', goals: [{ title: 'Launch Content Calendar', progress: 75, status: 'In Progress' }], skills: [{ name: 'Content Strategy', level: 'Advanced' }], successors: [{ name: 'Ian Davis', readiness: 'Ready in 1 year' }] },
    { id: '35', name: 'Ian Davis', role: 'Financial Analyst', avatar: 'ID', retentionRisk: 'Low', performanceScore: 4.2, manager: 'Susan Garcia', department: 'Finance', email: 'ian.davis@company.com', phone: '+1 (555) 567-8901', joinDate: '2021-01-20', lastPromotion: '2023-06-15', goals: [{ title: 'Financial Forecasting', progress: 65, status: 'In Progress' }], skills: [{ name: 'Financial Modeling', level: 'Advanced' }], successors: [{ name: 'Julia Wilson', readiness: 'Ready in 8 months' }] },
    { id: '36', name: 'Julia Wilson', role: 'Recruitment Specialist', avatar: 'JW', retentionRisk: 'Low', performanceScore: 3.8, manager: 'Thomas Rodriguez', department: 'Human Resources', email: 'julia.wilson@company.com', phone: '+1 (555) 678-9012', joinDate: '2020-06-12', lastPromotion: '2022-09-30', goals: [{ title: 'Improve Hiring Process', progress: 70, status: 'In Progress' }], skills: [{ name: 'Talent Acquisition', level: 'Advanced' }], successors: [{ name: 'Kevin Brown', readiness: 'Ready in 10 months' }] },
    { id: '37', name: 'Kevin Brown', role: 'Sales Engineer', avatar: 'KB', retentionRisk: 'Medium', performanceScore: 3.9, manager: 'Rachel Martinez', department: 'Sales', email: 'kevin.brown@company.com', phone: '+1 (555) 789-0123', joinDate: '2019-03-25', lastPromotion: '2022-08-15', goals: [{ title: 'Technical Sales Support', progress: 80, status: 'In Progress' }], skills: [{ name: 'Technical Sales', level: 'Advanced' }], successors: [{ name: 'Luna Garcia', readiness: 'Ready in 1 year' }] },
    { id: '38', name: 'Luna Garcia', role: 'Training Coordinator', avatar: 'LG', retentionRisk: 'Low', performanceScore: 4.1, manager: 'Michael Lee', department: 'Human Resources', email: 'luna.garcia@company.com', phone: '+1 (555) 890-1234', joinDate: '2021-05-18', lastPromotion: '2023-09-12', goals: [{ title: 'Develop Training Programs', progress: 75, status: 'In Progress' }], skills: [{ name: 'Training Development', level: 'Advanced' }], successors: [{ name: 'Marcus Wilson', readiness: 'Ready in 6 months' }] },
    { id: '39', name: 'Marcus Wilson', role: 'Compliance Officer', avatar: 'MW', retentionRisk: 'Low', performanceScore: 4.3, manager: 'Nicole Davis', department: 'Legal', email: 'marcus.wilson@company.com', phone: '+1 (555) 901-2345', joinDate: '2018-10-30', lastPromotion: '2022-06-20', goals: [{ title: 'Ensure Regulatory Compliance', progress: 85, status: 'In Progress' }], skills: [{ name: 'Compliance Management', level: 'Advanced' }], successors: [{ name: 'Nina Rodriguez', readiness: 'Ready in 8 months' }] },
    { id: '40', name: 'Nina Rodriguez', role: 'Vendor Manager', avatar: 'NR', retentionRisk: 'Low', performanceScore: 4.0, manager: 'Oscar Martinez', department: 'Procurement', email: 'nina.rodriguez@company.com', phone: '+1 (555) 012-3456', joinDate: '2020-11-05', lastPromotion: '2023-04-25', goals: [{ title: 'Optimize Vendor Relationships', progress: 70, status: 'In Progress' }], skills: [{ name: 'Vendor Management', level: 'Advanced' }], successors: [{ name: 'Oliver Johnson', readiness: 'Ready in 1 year' }] },
    { id: '41', name: 'Oliver Johnson', role: 'Facilities Manager', avatar: 'OJ', retentionRisk: 'Low', performanceScore: 3.9, manager: 'Paula Brown', department: 'Facilities', email: 'oliver.johnson@company.com', phone: '+1 (555) 123-4567', joinDate: '2019-07-22', lastPromotion: '2022-12-10', goals: [{ title: 'Improve Office Efficiency', progress: 65, status: 'In Progress' }], skills: [{ name: 'Facilities Management', level: 'Advanced' }], successors: [{ name: 'Penelope Davis', readiness: 'Ready in 10 months' }] },
    { id: '42', name: 'Penelope Davis', role: 'Event Coordinator', avatar: 'PD', retentionRisk: 'Low', performanceScore: 4.2, manager: 'Quentin Wilson', department: 'Marketing', email: 'penelope.davis@company.com', phone: '+1 (555) 234-5678', joinDate: '2021-02-14', lastPromotion: '2023-07-08', goals: [{ title: 'Organize Company Events', progress: 80, status: 'In Progress' }], skills: [{ name: 'Event Planning', level: 'Advanced' }], successors: [{ name: 'Quincy Garcia', readiness: 'Ready in 6 months' }] },
    { id: '43', name: 'Quincy Garcia', role: 'Research Analyst', avatar: 'QG', retentionRisk: 'Low', performanceScore: 4.4, manager: 'Rita Martinez', department: 'Research', email: 'quincy.garcia@company.com', phone: '+1 (555) 345-6789', joinDate: '2020-09-18', lastPromotion: '2023-01-30', goals: [{ title: 'Market Research Analysis', progress: 75, status: 'In Progress' }], skills: [{ name: 'Market Research', level: 'Advanced' }], successors: [{ name: 'Ryan Lee', readiness: 'Ready in 8 months' }] },
    { id: '44', name: 'Ryan Lee', role: 'Technical Support Lead', avatar: 'RL', retentionRisk: 'Low', performanceScore: 4.1, manager: 'Samuel Brown', department: 'Technical Support', email: 'ryan.lee@company.com', phone: '+1 (555) 456-7890', joinDate: '2019-04-12', lastPromotion: '2022-10-05', goals: [{ title: 'Improve Support Metrics', progress: 70, status: 'In Progress' }], skills: [{ name: 'Technical Support', level: 'Advanced' }], successors: [{ name: 'Sofia Wilson', readiness: 'Ready in 1 year' }] },
    { id: '45', name: 'Sofia Wilson', role: 'Brand Manager', avatar: 'SW', retentionRisk: 'Low', performanceScore: 4.3, manager: 'Tyler Rodriguez', department: 'Marketing', email: 'sofia.wilson@company.com', phone: '+1 (555) 567-8901', joinDate: '2021-08-25', lastPromotion: '2023-11-20', goals: [{ title: 'Brand Strategy Development', progress: 85, status: 'In Progress' }], skills: [{ name: 'Brand Management', level: 'Advanced' }], successors: [{ name: 'Tristan Martinez', readiness: 'Ready in 6 months' }] },
    { id: '46', name: 'Tristan Martinez', role: 'Integration Specialist', avatar: 'TM', retentionRisk: 'Low', performanceScore: 4.5, manager: 'Ursula Davis', department: 'Engineering', email: 'tristan.martinez@company.com', phone: '+1 (555) 678-9012', joinDate: '2020-12-08', lastPromotion: '2023-05-15', goals: [{ title: 'System Integration Projects', progress: 90, status: 'In Progress' }], skills: [{ name: 'System Integration', level: 'Advanced' }], successors: [{ name: 'Uma Johnson', readiness: 'Ready in 8 months' }] },
    { id: '47', name: 'Uma Johnson', role: 'Performance Analyst', avatar: 'UJ', retentionRisk: 'Low', performanceScore: 4.2, manager: 'Victor Garcia', department: 'Analytics', email: 'uma.johnson@company.com', phone: '+1 (555) 789-0123', joinDate: '2019-11-20', lastPromotion: '2022-07-30', goals: [{ title: 'Performance Optimization', progress: 75, status: 'In Progress' }], skills: [{ name: 'Performance Analysis', level: 'Advanced' }], successors: [{ name: 'Vincent Brown', readiness: 'Ready in 10 months' }] },
    { id: '48', name: 'Vincent Brown', role: 'Release Manager', avatar: 'VB', retentionRisk: 'Low', performanceScore: 4.4, manager: 'Wendy Lee', department: 'Engineering', email: 'vincent.brown@company.com', phone: '+1 (555) 890-1234', joinDate: '2021-03-15', lastPromotion: '2023-08-25', goals: [{ title: 'Streamline Release Process', progress: 80, status: 'In Progress' }], skills: [{ name: 'Release Management', level: 'Advanced' }], successors: [{ name: 'Willa Rodriguez', readiness: 'Ready in 1 year' }] },
    { id: '49', name: 'Willa Rodriguez', role: 'User Experience Designer', avatar: 'WR', retentionRisk: 'Low', performanceScore: 4.6, manager: 'Xavier Wilson', department: 'Design', email: 'willa.rodriguez@company.com', phone: '+1 (555) 901-2345', joinDate: '2020-06-30', lastPromotion: '2023-02-18', goals: [{ title: 'UX Design System', progress: 85, status: 'In Progress' }], skills: [{ name: 'UX Design', level: 'Advanced' }], successors: [{ name: 'Xander Martinez', readiness: 'Ready in 6 months' }] },
    { id: '50', name: 'Xander Martinez', role: 'Data Engineer', avatar: 'XM', retentionRisk: 'Low', performanceScore: 4.3, manager: 'Yara Davis', department: 'Data Engineering', email: 'xander.martinez@company.com', phone: '+1 (555) 012-3456', joinDate: '2019-08-12', lastPromotion: '2022-11-08', goals: [{ title: 'Data Pipeline Optimization', progress: 70, status: 'In Progress' }], skills: [{ name: 'Data Engineering', level: 'Advanced' }], successors: [{ name: 'Yolanda Garcia', readiness: 'Ready in 8 months' }] },
    { id: '51', name: 'Yolanda Garcia', role: 'Project Coordinator', avatar: 'YG', retentionRisk: 'Low', performanceScore: 4.1, manager: 'Zachary Wilson', department: 'Project Management', email: 'yolanda.garcia@company.com', phone: '+1 (555) 123-4567', joinDate: '2021-01-08', lastPromotion: '2023-06-30', goals: [{ title: 'Project Timeline Management', progress: 75, status: 'In Progress' }], skills: [{ name: 'Project Coordination', level: 'Advanced' }], successors: [{ name: 'Zane Brown', readiness: 'Ready in 1 year' }] },
    { id: '52', name: 'Zane Brown', role: 'Technical Consultant', avatar: 'ZB', retentionRisk: 'Low', performanceScore: 4.5, manager: 'Abigail Lee', department: 'Consulting', email: 'zane.brown@company.com', phone: '+1 (555) 234-5678', joinDate: '2020-10-25', lastPromotion: '2023-03-22', goals: [{ title: 'Client Technical Solutions', progress: 80, status: 'In Progress' }], skills: [{ name: 'Technical Consulting', level: 'Advanced' }], successors: [{ name: 'Aria Rodriguez', readiness: 'Ready in 6 months' }] },
    { id: '53', name: 'Aria Rodriguez', role: 'Learning & Development Specialist', avatar: 'AR', retentionRisk: 'Low', performanceScore: 4.2, manager: 'Benjamin Martinez', department: 'Human Resources', email: 'aria.rodriguez@company.com', phone: '+1 (555) 345-6789', joinDate: '2019-12-18', lastPromotion: '2022-09-15', goals: [{ title: 'Employee Development Programs', progress: 70, status: 'In Progress' }], skills: [{ name: 'Learning Development', level: 'Advanced' }], successors: [{ name: 'Blake Johnson', readiness: 'Ready in 10 months' }] },
    { id: '54', name: 'Blake Johnson', role: 'Infrastructure Engineer', avatar: 'BJ', retentionRisk: 'Low', performanceScore: 4.4, manager: 'Camila Davis', department: 'Infrastructure', email: 'blake.johnson@company.com', phone: '+1 (555) 456-7890', joinDate: '2021-05-30', lastPromotion: '2023-09-08', goals: [{ title: 'Infrastructure Scaling', progress: 85, status: 'In Progress' }], skills: [{ name: 'Infrastructure Management', level: 'Advanced' }], successors: [{ name: 'Cora Wilson', readiness: 'Ready in 8 months' }] },
    { id: '55', name: 'Cora Wilson', role: 'Digital Marketing Specialist', avatar: 'CW', retentionRisk: 'Low', performanceScore: 4.0, manager: 'Diego Garcia', department: 'Marketing', email: 'cora.wilson@company.com', phone: '+1 (555) 567-8901', joinDate: '2020-07-14', lastPromotion: '2023-01-12', goals: [{ title: 'Digital Campaign Optimization', progress: 75, status: 'In Progress' }], skills: [{ name: 'Digital Marketing', level: 'Advanced' }], successors: [{ name: 'Dante Martinez', readiness: 'Ready in 1 year' }] },
];

export default function PromotionsSuccession() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [showFilter, setShowFilter] = useState(false);
    const [progress, setProgress] = useState(0);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeProfile | null>(null);
    const [promoteOpen, setPromoteOpen] = useState(false);
    const [addSuccessionOpen, setAddSuccessionOpen] = useState(false);
    const [startPipOpen, setStartPipOpen] = useState(false);
    const router = useRouter();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const handleExport = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 100);
    }

    const handleEmployeeClick = (employee: EmployeeProfile) => {
        setSelectedEmployee(employee);
        setSheetOpen(true);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };


    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px]/[30px] font-semibold text-gray-900">Promotions/Succession</h1>
                </div>
                <div>
                    <Button className="bg-[#0D978B] hover:bg-[#0a7a6f] text-white h-[42px] w-[174px]" onClick={() => router.push('/talent-management/promotions-succession/succession')}>
                        Manage Successions
                    </Button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center justify-between sm:flex-row flex-col gap-[20px] ">
                <div className="relative ">
                    <Search
                        className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                        data-testid="search-icon"
                    />
                    <Input
                        placeholder="Search Applicant"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-9 w-[172px] h-[42px] bg-[#fafafa]"
                        data-testid="search-input"
                    />
                    {searchQuery.length > 0 && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                            onClick={() => setSearchQuery('')}
                            data-testid="clear-search-button"
                        >
                            <X />
                        </Button>
                    )}
                </div>
                <div className='flex gap-[16px]'>
                    <Button
                        variant="outline"
                        onClick={() => setShowFilter(!showFilter)}
                        className='text-[#053834] px-[16px] py-[11px] flex items-center gap-[6px] font-semibold w-[94px] h-[42px] bg-transparent'
                        data-testid="filter-button "
                    >
                        <ListFilter className={`size-[20px] transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} />
                        Filter
                    </Button>
                </div>
            </div>

            {/* Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                {paginatedEmployees.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        {...employee}
                        onClick={() => handleEmployeeClick(employee)}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap flex-col sm:flex-row justify-between items-center gap-4 py-4 px-6 border-t !border-gray-300 !bg-transparent">
                <div className="flex items-center gap-2 order-2 sm:order-1">
                    <span className="text-sm text-gray-600">Show per page</span>
                    <select
                        className="w-16 h-8 bg-white border border-gray-300 rounded text-sm"
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>

                <div className="flex items-center gap-1 order-1 sm:order-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-3 text-sm border-gray-300 hover:bg-gray-50"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ArrowLeft className="size-4 mr-1" />
                        Previous
                    </Button>

                    {/* Render page buttons with ellipsis logic */}
                    {(() => {
                        const paginationMoreLimit = 5;
                        const currentGroupStart = Math.floor((currentPage - 1) / paginationMoreLimit) * paginationMoreLimit;
                        const currentGroupEnd = Math.min(currentGroupStart + paginationMoreLimit, totalPages);

                        const buttons = [];

                        // Previous ellipsis
                        if (currentGroupStart > 0) {
                            buttons.push(
                                <Button
                                    key="prev-ellipsis"
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-sm text-gray-600 hover:bg-gray-100"
                                    onClick={() => setCurrentPage(currentGroupStart)}
                                >
                                    ...
                                </Button>
                            );
                        }

                        // Page buttons
                        for (let i = currentGroupStart; i < currentGroupEnd; i++) {
                            const pageNumber = i + 1;
                            buttons.push(
                                <Button
                                    key={pageNumber}
                                    size="sm"
                                    variant="ghost"
                                    className={`h-8 w-8 p-0 text-sm ${currentPage === pageNumber
                                        ? 'bg-[#D6EEEC] text-gray-800 hover:bg-[#D6EEEC]'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </Button>
                            );
                        }

                        // Next ellipsis
                        if (currentGroupEnd < totalPages) {
                            buttons.push(
                                <Button
                                    key="next-ellipsis"
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-sm text-gray-600 hover:bg-gray-100"
                                    onClick={() => setCurrentPage(currentGroupEnd + 1)}
                                >
                                    ...
                                </Button>
                            );
                        }

                        return buttons;
                    })()}

                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-3 text-sm border-gray-300 hover:bg-gray-50"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ArrowRight className="size-4 ml-1" />
                    </Button>
                </div>
            </div>

            {/* Employee Profile Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent
                    side="right"
                    className=" !max-w-[668px] overflow-y-auto p-0"
                    close={false}
                >
                    {selectedEmployee && (
                        <>
                            <SheetHeader className="p-[32px] bg-gray-100 sticky top-0 z-10 border-b border-[#e9e9e9]">
                                <X className="h-8 w-8 p-[6px] text-[#787878] border border-[#787878] rounded-[6px]" onClick={() => setSheetOpen(false)} />
                                <div className="flex items-center gap-[8px] mt-[21px] justify-between">
                                    <div>
                                        <SheetTitle className="text-[22px]/[30px] font-semibold text-primary">
                                            <span className="text-primary border-b-2 border-primary">
                                                {selectedEmployee.name}
                                            </span>
                                        </SheetTitle>
                                        <p className="text-[14px]/[22px] text-gray-800 mt-1">
                                            {selectedEmployee.role}
                                        </p>
                                        <p className="text-[14px]/[22px]  mt-1 text-gray-800">
                                            Manager:<span className="h-6 w-6 rounded-full bg-[#D6EEEC] text-primary-900 p-[5.5px] text-[13px]" >JB</span> Joe Brady
                                        </p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className='h-[42px] w-[108px] text-[14px]/[20px] font-medium '>
                                                Actions
                                                <ChevronDown className='size-[18px] ' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setPromoteOpen(true)}>
                                                <p >
                                                    Promote
                                                </p>

                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setAddSuccessionOpen(true)}>Add to Succession Plan</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setStartPipOpen(true)}>Start PIP</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </SheetHeader>
                            <PromoteSheet open={promoteOpen} onOpenChange={setPromoteOpen} />
                            <AddSuccessionPlanSheet open={addSuccessionOpen} onOpenChange={setAddSuccessionOpen} />
                            <StartPinSheet open={startPipOpen} onOpenChange={setStartPipOpen} />
                            <SheetBody className="space-y-6 p-[32px]">
                                {/* Promotion Tracking */}
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-[8px] p-3 bg-white">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="text-[13px]/[20px] text-gray-800">
                                                PROMOTION TO <span className="text-primary font-medium" >TECHNICAL LEAD</span>
                                            </div>
                                            <Badge className="bg-gray-100 text-gray-700 text-[14px]/[20px] rounded-[90px] font-medium p-2">
                                                Pending Approval
                                            </Badge>
                                        </div>
                                        <div className="space-y-2 mb-3">
                                            <p className="text-[13px]/[20px] text-gray-600">Exceeds campaign targets, mentors junior staff</p>
                                            <p className="text-sm text-gray-600">Compensation: $90k</p>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-[8px] p-4 bg-white">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <p className="text-[13px]/[20px] font-medium ">ACTIVE PIP</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[13px]/[20px] text-[#0D978B] font-medium">Day 12 of 90</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <p className="text-sm text-gray-800">Improve client proposal acceptance rate by 20% in 60 days</p>
                                            <p className="text-sm text-gray-800">Learning Path: <span className="text-[#0D978B] border-b border-[#0D978B] font-medium">Leadership Fundamentals</span></p>
                                            <p className="text-sm text-gray-800">Mentor: <span className="h-6 w-6 rounded-full bg-[#D6EEEC] text-primary-900 p-[5.5px] text-[13px]" >JB</span> Joe Brady</p>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-[8px] p-4 bg-white">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-[13px]/[20px] text-gray-800">
                                                SUCCESSION FOR <span className="text-primary font-medium" >SENIOR MARKETING MANAGER</span>
                                            </div>
                                            <Badge className="bg-[#FFDFC0] text-orange-800  text-[13px]/[20px] rounded-[21px] p-2">
                                                Ready in 3-6months
                                            </Badge>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <p className="text-sm text-gray-600">Added 12 Dec, 2025</p>
                                            <p className="text-sm text-gray-600">Learning Path: <span className="text-[#0D978B] border-b border-[#0D978B] font-medium">Leadership Fundamentals</span></p>
                                            <p className="text-sm text-gray-600">Mentor: <span className="h-6 w-6 rounded-full bg-[#D6EEEC] text-primary-900 p-[5.5px] text-[13px]" >JB</span> Joe Brady</p>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Summary */}
                                <div className="py-4">
                                    <h3 className="text-[14px]/[22px] font-semibold flex mb-2 items-center gap-2 text-[#0D978B]">
                                        <Sparkles className="size-[16px]" /> AI SUMMARY
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Alice is a highly skilled data analyst with a strong track record of success. She is a valuable asset to
                                        the team and is always willing to go the extra mile to ensure project success.
                                    </p>
                                </div>

                                {/* Performance Trends */}
                                <div className="py-4">
                                    <h3 className="text-[14px]/[22px] text-[#8F8F8F] mb-2">PERFORMANCE TRENDS</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-900">Review Ratings</span>
                                                <span className="text-sm text-gray-900">Goals Achieved</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[14px]/[20px] text-[#0D978B]">4.5/5 (last 3 reviews)</span>
                                                <span className="text-[14px]/[20px] text-[#0D978B]">82% this quarter</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Highlighted Peer Feedbacks */}
                                <div className="p-0">
                                    <h3 className="text-[14px]/[22px] text-gray-900 mb-4">Highlighted Peer Feedbacks</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <CircleCheck className="size-[20px] text-primary" />
                                            <p className="text-sm text-gray-700">
                                                "Alice is a team leader and always willing to help out. Her technical skills are top-notch,
                                                and she consistently delivers high-quality work."
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CircleCheck className="size-[20px] text-primary" />
                                            <p className="text-sm text-gray-700">
                                                "Alice is a team leader and always willing to help out. Her technical skills are top-notch,
                                                and she consistently delivers high-quality work."
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="py-4 ">
                                    <h3 className="text-sm font-semibold text-[#8F8F8F] mb-4">SKILLS</h3>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">Digital Marketing</span>
                                            <Badge className=" bg-[#C0FFE5] border-[#00683D] text-[#00683D] text-xs">
                                                Advanced
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">Analytics</span>
                                            <Badge className="bg-[#C0FFE5] border-[#00683D] text-[#00683D] text-xs">
                                                Advanced
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">SEO Optimization</span>
                                            <Badge className="bg-[#FFDFC0] text-[#683400] border-[#683400] text-xs">
                                                Intermediate
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">Team Leadership</span>
                                            <Badge className="bg-[#FFDFC0] text-[#683400] border-[#683400] text-xs">
                                                Intermediate
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes Section */}
                                <div className="py-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-semibold text-gray-900">NOTES</h3>
                                        <Button
                                            variant='ghost'
                                            className="text-[#0D978B]  bg-white text-xs h-7"
                                        >
                                            <CirclePlus className="size-[20px]" />
                                            Add Notes
                                        </Button>
                                    </div>

                                    <div className='bg-gray-50 rounded-[8px] p-3 min-h-[60px] flex flex-col items-center justify-center'>
                                        <Textarea className='!min-h-[93px] resize-none !bg-transparent text-[14px]/[20px] rounded-[10px]' placeholder='Add notes for Alice, like development suggestions etc...' />
                                        <div className="mt-[8px] flex justify-start flex-row">
                                            <Button variant='outline' className='text-[#0D978B]  bg-white text-xs h-[32px] w-[65px]'>
                                                Cancel
                                            </Button>
                                            <Button variant='outline' className='text-white bg-primary text-xs h-[32px] w-[65px]'>
                                                Save
                                            </Button>
                                        </div>


                                    </div>
                                </div>
                            </SheetBody>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}