'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    ChevronLeft,
    ChevronRight,
    Filter,
    Clock,
    User,
    Save,
    Search,
    Plus,
    MoreVertical,
    Edit,
    Trash2,
    ListFilter,
    ChevronDown,
    X,
    Calendar
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';


interface Employee {
    id: string;
    name: string;
    initials: string;
    avatar?: string;
    department: string;
    role: string;
}

interface Shift {
    id: string;
    time: string;
    location: string;
    color: string;
    status: 'scheduled' | 'pending' | 'completed';
}

interface ScheduleData {
    employee: Employee;
    monday: Shift | null;
    tuesday: Shift | null;
    wednesday: Shift | null;
    thursday: Shift | null;
    friday: Shift | null;
}

const employees: Employee[] = [
    { id: '1', name: 'Alice Fernadez', initials: 'AF', department: 'Engineering', role: 'Senior Developer' },
    { id: '2', name: 'Floyd Miles', initials: 'FM', department: 'Design', role: 'UX Designer' },
    { id: '3', name: 'Kathryn Murphy', initials: 'KM', department: 'Engineering', role: 'Frontend Developer' },
    { id: '4', name: 'Jerome Bell', initials: 'JB', department: 'Operations', role: 'Project Manager' },
    { id: '5', name: 'Brooklyn Simmons', initials: 'BS', department: 'Design', role: 'UI Designer' },
    { id: '6', name: 'Cody Fisher', initials: 'CF', department: 'Engineering', role: 'Backend Developer' },
    { id: '7', name: 'Esther Howard', initials: 'EH', department: 'Operations', role: 'Team Lead' },
    { id: '8', name: 'Jacob Jones', initials: 'JJ', department: 'Engineering', role: 'DevOps Engineer' },
];

const defaultShift: Shift = {
    id: 'default',
    time: '8:00pm-5:00pm',
    location: 'Airport Construction',
    color: 'bg-[#D6EEEC] border-green-200',
    status: 'scheduled'
};

const ShiftCell = ({ shift, onEdit, onDelete }: {
    shift: Shift | null;
    onEdit?: () => void;
    onDelete?: () => void;
}) => {
    if (!shift) {
        return (
            <div className="min-h-[50px] sm:min-h-[60px] lg:min-h-[80px] flex items-center justify-center group border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 p-0 hover:bg-gray-100"
                    onClick={onEdit}
                >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </div>
        );
    }

    return (
        <div className={`${shift.color} border rounded-lg p-2 sm:p-3 lg:p-4 min-h-[50px] sm:min-h-[60px] lg:min-h-[80px] flex flex-col justify-center group relative hover:shadow-sm transition-shadow`}>
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                    {shift.time}
                </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600 truncate">
                    {shift.location}
                </span>
            </div>

            {/* Action buttons on hover */}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 p-0 hover:bg-white/50"
                        >
                            <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={onEdit} className="text-xs sm:text-sm">
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                            Edit Shift
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} className="text-red-600 text-xs sm:text-sm">
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                            Delete Shift
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

const EmployeeCell = ({ employee }: { employee: Employee }) => (
    <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 border border-blue-200">
            <span className="text-xs sm:text-sm font-semibold text-blue-700">
                {employee.initials}
            </span>
        </div>
        <div className="min-w-0 flex-1">
            <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
                {employee.name}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 truncate">
                {employee.role}
            </div>
            <div className="text-xs text-gray-400 truncate">
                {employee.department}
            </div>
        </div>
    </div>
);

export default function SchedulingPage() {
    const [currentWeek, setCurrentWeek] = useState('Mar 21 - Mar 25, 2025');
    const [swapRequestsCount] = useState(25);
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showAutoSchedule, setShowAutoSchedule] = useState(false);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>(['Sales', 'Design']);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedTimeslots, setSelectedTimeslots] = useState<string[]>(['12am - 8am', '8am - 5pm']);
    const [startDate, setStartDate] = useState('Jun 3');
    const [endDate, setEndDate] = useState('Jun 21');
    const [showShiftDialog, setShowShiftDialog] = useState(false);
    const [selectedShift, setSelectedShift] = useState<{ employeeId: string, day: string } | null>(null);
    const [currentTimeslot, setCurrentTimeslot] = useState('8:00am - 5:00pm');
    const [currentProject, setCurrentProject] = useState('Airport Construction Project');
    const router = useRouter();
    // Generate schedule data
    const scheduleData: ScheduleData[] = useMemo(() => {
        return employees.map(employee => ({
            employee,
            monday: { ...defaultShift, id: `${employee.id}-monday` },
            tuesday: { ...defaultShift, id: `${employee.id}-tuesday` },
            wednesday: { ...defaultShift, id: `${employee.id}-wednesday` },
            thursday: { ...defaultShift, id: `${employee.id}-thursday` },
            friday: { ...defaultShift, id: `${employee.id}-friday` },
        }));
    }, []);

    // Filter data based on search and department filters
    const filteredData = useMemo(() => {
        return scheduleData.filter(item => {
            const matchesSearch = searchQuery === '' ||
                item.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.employee.role.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesDepartment = departmentFilter.length === 0 ||
                departmentFilter.includes(item.employee.department);

            return matchesSearch && matchesDepartment;
        });
    }, [scheduleData, searchQuery, departmentFilter]);

    const departments = useMemo(() => {
        return Array.from(new Set(employees.map(emp => emp.department)));
    }, []);

    const handlePreviousWeek = () => {
        console.log('Previous week');
    };

    const handleNextWeek = () => {
        console.log('Next week');
    };

    const handleAutoSchedule = () => {
        setShowAutoSchedule(true);
    };

    const handleSaveChanges = () => {
        console.log('Save changes');
    };

    const handleDepartmentFilter = (department: string) => {
        setDepartmentFilter(prev =>
            prev.includes(department)
                ? prev.filter(d => d !== department)
                : [...prev, department]
        );
    };

    const clearFilters = () => {
        setSearchQuery('');
        setDepartmentFilter([]);
    };

    const handleEditShift = (employeeId: string, day: string) => {
        setSelectedShift({ employeeId, day });
        setShowShiftDialog(true);
    };

    const handleDeleteShift = (employeeId: string, day: string) => {
        console.log('Delete shift for', employeeId, day);
        // Implement shift deletion logic
    };

    const handleAddShift = (employeeId: string, day: string) => {
        console.log('Add shift for', employeeId, day);
        // Implement shift addition logic
    };

    return (
        <div className="w-full h-full min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
                    {/* Title */}
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4">Scheduling</h1>

                    {/* Date Navigation and Actions */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                        {/* Date Navigation */}
                        <div className="flex items-center justify-center lg:justify-start">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePreviousWeek}
                                    className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 p-0 hover:bg-gray-100"
                                >
                                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                                <span className="text-sm sm:text-base font-medium text-gray-700 min-w-[140px] sm:min-w-[160px] lg:min-w-[180px] text-center px-2">
                                    {currentWeek}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNextWeek}
                                    className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 p-0 hover:bg-gray-100"
                                >
                                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                            {/* Filter Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                                className="h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 p-0 hover:bg-gray-50 border-gray-300 flex-shrink-0"
                            >
                                <ListFilter className="h-4 w-4" />
                            </Button>

                            {/* Button Row */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                {/* Swap Requests Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-9 sm:h-10 lg:h-11 px-3 sm:px-4 border-gray-300 hover:bg-gray-50 text-sm sm:text-base flex-1 sm:flex-none justify-between"
                                        >
                                            <span className="hidden sm:inline">Swap Requests</span>
                                            <span className="sm:hidden">Swap</span>
                                            <span className="ml-1">({swapRequestsCount})</span>
                                            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem onClick={() => router.push('/leave-attendance/scheduling/swap-request')}>
                                            View All Requests
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Pending Approvals</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Auto-Schedule Button */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAutoSchedule}
                                    className="h-9 sm:h-10 lg:h-11 px-3 sm:px-4 border-gray-300 hover:bg-gray-50 text-sm sm:text-base flex-1 sm:flex-none"
                                >
                                    <span className="hidden sm:inline">Auto-Schedule</span>
                                    <span className="sm:hidden">Auto</span>
                                </Button>

                                {/* Save Changes Button */}
                                <Button
                                    onClick={handleSaveChanges}
                                    className="h-9 sm:h-10 lg:h-11 px-3 sm:px-4 bg-primary hover:bg-green-700 text-white text-sm sm:text-base flex-1 sm:flex-none"
                                >
                                    <span className="hidden sm:inline">Save Changes</span>
                                    <span className="sm:hidden">Save</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Department:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {departments.map(dept => (
                                            <Button
                                                key={dept}
                                                variant={departmentFilter.includes(dept) ? "primary" : "outline"}
                                                size="sm"
                                                onClick={() => handleDepartmentFilter(dept)}
                                                className="h-7 sm:h-8 px-3 text-xs sm:text-sm"
                                            >
                                                {dept}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="h-7 sm:h-8 px-3 text-xs sm:text-sm text-gray-500 hover:text-gray-700 self-start sm:self-auto"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Schedule Grid */}
            <div className="p-3 sm:p-4 lg:p-6">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    {/* Mobile View - Card Layout */}
                    <div className="block lg:hidden">
                        <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-sm font-medium text-gray-700">Employee Schedule</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {filteredData.map(({ employee, monday, tuesday, wednesday, thursday, friday }, index) => (
                                <div key={employee.id} className="p-3 sm:p-4">
                                    <div className="mb-3">
                                        <EmployeeCell employee={employee} />
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                        <div className="space-y-1">
                                            <div className="text-xs font-medium text-gray-500">Monday</div>
                                            <ShiftCell
                                                shift={monday}
                                                onEdit={() => handleEditShift(employee.id, 'monday')}
                                                onDelete={() => handleDeleteShift(employee.id, 'monday')}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-xs font-medium text-gray-500">Tuesday</div>
                                            <ShiftCell
                                                shift={tuesday}
                                                onEdit={() => handleEditShift(employee.id, 'tuesday')}
                                                onDelete={() => handleDeleteShift(employee.id, 'tuesday')}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-xs font-medium text-gray-500">Wednesday</div>
                                            <ShiftCell
                                                shift={wednesday}
                                                onEdit={() => handleEditShift(employee.id, 'wednesday')}
                                                onDelete={() => handleDeleteShift(employee.id, 'wednesday')}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-xs font-medium text-gray-500">Thursday</div>
                                            <ShiftCell
                                                shift={thursday}
                                                onEdit={() => handleEditShift(employee.id, 'thursday')}
                                                onDelete={() => handleDeleteShift(employee.id, 'thursday')}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-xs font-medium text-gray-500">Friday</div>
                                            <ShiftCell
                                                shift={friday}
                                                onEdit={() => handleEditShift(employee.id, 'friday')}
                                                onDelete={() => handleDeleteShift(employee.id, 'friday')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop View - Table Layout */}
                    <div className="hidden lg:block">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className=" border-b border-gray-200">
                                        <TableHead className="w-[200px] xl:w-[250px] px-4 py-3 border-r border-gray-200 border-l-0 sticky left-0  z-10">
                                            <span className="text-sm font-medium text-gray-700">Name</span>
                                        </TableHead>
                                        <TableHead className="w-[150px] xl:w-[180px] px-4 py-3 border-r border-gray-200">
                                            <span className="text-sm font-medium text-gray-700">Monday</span>
                                        </TableHead>
                                        <TableHead className="w-[150px] xl:w-[180px] px-4 py-3 border-r border-gray-200">
                                            <span className="text-sm font-medium text-gray-700">Tuesday</span>
                                        </TableHead>
                                        <TableHead className="w-[150px] xl:w-[180px] px-4 py-3 border-r border-gray-200">
                                            <span className="text-sm font-medium text-gray-700">Wednesday</span>
                                        </TableHead>
                                        <TableHead className="w-[150px] xl:w-[180px] px-4 py-3 border-r border-gray-200">
                                            <span className="text-sm font-medium text-gray-700">Thursday</span>
                                        </TableHead>
                                        <TableHead className="w-[150px] xl:w-[180px] px-4 py-3 border-r-0">
                                            <span className="text-sm font-medium text-gray-700">Friday</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.map(({ employee, monday, tuesday, wednesday, thursday, friday }, index) => (
                                        <TableRow key={employee.id} className={`${index < filteredData.length - 1 ? 'border-b border-gray-200' : ''} hover:bg-gray-50`}>
                                            <TableCell className="px-4 py-4 border-r border-gray-200 border-l-0 sticky left-0 bg-white z-10">
                                                <EmployeeCell employee={employee} />
                                            </TableCell>
                                            <TableCell className="px-4 py-4 border-r border-gray-200">
                                                <ShiftCell
                                                    shift={monday}
                                                    onEdit={() => handleEditShift(employee.id, 'monday')}
                                                    onDelete={() => handleDeleteShift(employee.id, 'monday')}
                                                />
                                            </TableCell>
                                            <TableCell className="px-4 py-4 border-r border-gray-200">
                                                <ShiftCell
                                                    shift={tuesday}
                                                    onEdit={() => handleEditShift(employee.id, 'tuesday')}
                                                    onDelete={() => handleDeleteShift(employee.id, 'tuesday')}
                                                />
                                            </TableCell>
                                            <TableCell className="px-4 py-4 border-r border-gray-200">
                                                <ShiftCell
                                                    shift={wednesday}
                                                    onEdit={() => handleEditShift(employee.id, 'wednesday')}
                                                    onDelete={() => handleDeleteShift(employee.id, 'wednesday')}
                                                />
                                            </TableCell>
                                            <TableCell className="px-4 py-4 border-r border-gray-200">
                                                <ShiftCell
                                                    shift={thursday}
                                                    onEdit={() => handleEditShift(employee.id, 'thursday')}
                                                    onDelete={() => handleDeleteShift(employee.id, 'thursday')}
                                                />
                                            </TableCell>
                                            <TableCell className="px-4 py-4 border-r-0">
                                                <ShiftCell
                                                    shift={friday}
                                                    onEdit={() => handleEditShift(employee.id, 'friday')}
                                                    onDelete={() => handleDeleteShift(employee.id, 'friday')}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Auto-Schedule Modal */}
            <Sheet open={showAutoSchedule} onOpenChange={setShowAutoSchedule}>
                <SheetContent side="right" className="w-full sm:w-[400px] lg:w-[500px] xl:w-[600px] p-0" close={false}>
                    <SheetHeader className="py-4 sm:py-6 px-4 sm:px-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <SheetTitle className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                                Auto-Schedule
                            </SheetTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAutoSchedule(false)}
                                className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-gray-100 border border-gray-200"
                            >
                                <X className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </div>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                        <div className="space-y-4 sm:space-y-6">
                            {/* By Department Dropdown */}
                            <div>
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Schedule Type
                                </Label>
                                <Select>
                                    <SelectTrigger className="w-full h-10 sm:h-11">
                                        <SelectValue placeholder="By Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="department">By Department</SelectItem>
                                        <SelectItem value="role">By Role</SelectItem>
                                        <SelectItem value="individual">Individual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Select Department */}
                            <div>
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Select Department
                                </Label>
                                <Select onValueChange={(val: string) => setSelectedDepartments(prev => [...prev, val])}>
                                    <SelectTrigger className="w-full h-10 sm:h-11">
                                        <SelectValue placeholder="Choose Department(s)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sales">Sales</SelectItem>
                                        <SelectItem value="design">Design</SelectItem>
                                        <SelectItem value="engineering">Engineering</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Selected Department Tags */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {selectedDepartments.map((dept) => (
                                        <div key={dept} className="flex items-center gap-1 bg-[#D6EEEC] text-primary px-3 py-1.5 rounded-full text-sm">
                                            {dept}
                                            <button
                                                onClick={() => setSelectedDepartments(prev => prev.filter(d => d !== dept))}
                                                className="ml-1 hover:bg-teal-600 rounded-full p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Start Date
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="pl-10 h-10 sm:h-11 text-sm"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                        End Date
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="pl-10 h-10 sm:h-11 text-sm"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Select Days */}
                            <div>
                                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                    Select Days
                                </Label>
                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                                    {['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day) => (
                                        <div key={day} className="flex items-center gap-2">
                                            <Checkbox
                                                className='size-4'
                                                id={day}
                                                checked={selectedDays.includes(day)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedDays(prev => [...prev, day]);
                                                    } else {
                                                        setSelectedDays(prev => prev.filter(d => d !== day));
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={day} className="text-sm text-gray-700 cursor-pointer">
                                                {day}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Select Timeslots */}
                            <div>
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Select Timeslots
                                </Label>
                                <Select onValueChange={(val: string) => setSelectedTimeslots(prev => [...prev, val])}>
                                    <SelectTrigger className="w-full h-10 sm:h-11 text-sm text-gray-800">
                                        <SelectValue placeholder="Choose Timeslots" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="12am-8am">12am - 8am</SelectItem>
                                        <SelectItem value="8am-5pm">8am - 5pm</SelectItem>
                                        <SelectItem value="5pm-12am">5pm - 12am</SelectItem>
                                        <SelectItem value="custom">Custom</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Selected Timeslot Tags */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {selectedTimeslots.map((timeslot) => (
                                        <div key={timeslot} className="flex items-center gap-1 bg-[#D6EEEC] text-primary px-3 py-1.5 rounded-full text-sm">
                                            {timeslot}
                                            <button
                                                onClick={() => setSelectedTimeslots(prev => prev.filter(t => t !== timeslot))}
                                                className="ml-1 hover:bg-teal-600 rounded-full p-0.5 text-primary"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Assign to Employees Button */}
                            <div className="pt-4">
                                <Button
                                    onClick={() => {
                                        console.log('Assign to employees');
                                        setShowAutoSchedule(false);
                                    }}
                                    className="w-full h-11 sm:h-12 bg-primary hover:bg-green-700 text-white text-sm sm:text-base font-medium"
                                >
                                    Assign to Employees
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Shift Edit Dialog */}
            <Dialog open={showShiftDialog} onOpenChange={setShowShiftDialog}>
                <DialogContent className="w-[95vw] sm:w-[450px] lg:w-[500px] max-h-[90vh] p-0" close={false}>
                    <DialogHeader className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                            Edit Shift
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
                        {/* Current Timeslot Display */}
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 mb-1">
                                        Current Timeslot
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {currentTimeslot}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        // Handle timeslot change
                                        console.log('Change timeslot');
                                    }}
                                    className="text-xs sm:text-sm"
                                >
                                    Change
                                </Button>
                            </div>
                        </div>

                        {/* Current Project Display */}
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 mb-1">
                                        Current Project
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {currentProject}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        // Handle project change
                                        console.log('Change project');
                                    }}
                                    className="text-xs sm:text-sm"
                                >
                                    Change
                                </Button>
                            </div>
                        </div>

                        {/* Select Timeslots */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Select Timeslot
                            </Label>
                            <Select
                                value={currentTimeslot}
                                onValueChange={setCurrentTimeslot}
                            >
                                <SelectTrigger className="w-full h-10 sm:h-11">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="8:00am - 5:00pm">8:00am - 5:00pm</SelectItem>
                                    <SelectItem value="9:00am - 6:00pm">9:00am - 6:00pm</SelectItem>
                                    <SelectItem value="10:00am - 7:00pm">10:00am - 7:00pm</SelectItem>
                                    <SelectItem value="12:00am - 8:00am">12:00am - 8:00am</SelectItem>
                                    <SelectItem value="8:00am - 4:00pm">8:00am - 4:00pm</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Select Project */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Select Project
                            </Label>
                            <Select
                                value={currentProject}
                                onValueChange={setCurrentProject}
                            >
                                <SelectTrigger className="w-full h-10 sm:h-11">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Airport Construction Project">Airport Construction Project</SelectItem>
                                    <SelectItem value="Office Building Project">Office Building Project</SelectItem>
                                    <SelectItem value="Road Construction Project">Road Construction Project</SelectItem>
                                    <SelectItem value="Bridge Construction Project">Bridge Construction Project</SelectItem>
                                    <SelectItem value="Hospital Construction Project">Hospital Construction Project</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                onClick={() => setShowShiftDialog(false)}
                                variant="outline"
                                className="flex-1 h-10 sm:h-11 text-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    console.log('Save shift changes');
                                    setShowShiftDialog(false);
                                }}
                                className="flex-1 h-10 sm:h-11 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
