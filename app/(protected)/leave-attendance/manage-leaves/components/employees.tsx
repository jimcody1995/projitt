import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Employees = ({ filteredEmployees }: { filteredEmployees: any }) => {
    return (
        <div>
            {/* Employee Table */}
            <Card className="bg-white border border-[#E9E9E9] rounded-[12px] overflow-hidden">
                <Table>
                    <TableHeader className="bg-[#EEF3F2] border-b !border-[#f1f1f1]">
                        <TableRow className="!border-none">
                            <TableHead className="py-[12px] px-[32px] text-[14px]/[22px] font-medium text-[#8F8F8F] tracking-wide">
                                Employee Name
                            </TableHead>
                            <TableHead className="py-[12px] px-[16px] text-[14px]/[22px] font-medium text-[#8F8F8F] tracking-wide">
                                Employee ID
                            </TableHead>
                            <TableHead className="py-[12px] px-[16px] text-[14px]/[22px] font-medium text-[#8F8F8F] tracking-wide">
                                Department
                            </TableHead>
                            <TableHead className="py-[12px] px-[16px] text-[14px]/[22px] font-medium text-[#8F8F8F] tracking-wide">
                                Enrolled Date
                            </TableHead>
                            <TableHead className="py-[12px] px-[16px] text-[14px]/[22px] font-medium text-[#8F8F8F] tracking-wide">
                                Leave Balance
                            </TableHead>
                            <TableHead className="py-[12px] px-[16px] text-[14px]/[22px] font-medium text-[#8F8F8F] tracking-wide">
                                Total Balance
                            </TableHead>
                            <TableHead className="py-[12px] px-[16px] text-[14px]/[22px] font-medium text-[#8F8F8F] tracking-wide">
                                Last Leave
                            </TableHead>
                            <TableHead className="py-[12px] px-[16px] text-[14px]/[22px] font-medium text-[#8F8F8F] tracking-wide w-[50px]">
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEmployees.map((employee: any, index: any) => (
                            <TableRow key={employee.id} className="border-b border-[#F1F1F1] hover:bg-[#FAFAFA]">
                                <TableCell className="py-[12px] px-[32px]">
                                    <div className="flex items-center gap-[12px]">
                                        <Avatar className="size-7">
                                            <AvatarFallback className="bg-[#d6eeec] text-[#0d978b] text-[11px] font-medium">
                                                {employee.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-[14px] font-medium text-[#353535]">
                                                {employee.name}
                                            </p>
                                            <p className="text-[12px] text-[#8f8f8f]">
                                                {employee.position}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-[12px] px-[16px]">
                                    <span className="text-[14px] text-[#353535] font-medium">
                                        {employee.employeeId || `EMP${String(employee.id).padStart(3, '0')}`}
                                    </span>
                                </TableCell>
                                <TableCell className="py-[12px] px-[16px]">
                                    <span className="text-[14px] text-[#353535]">
                                        {employee.department}
                                    </span>
                                </TableCell>
                                <TableCell className="py-[12px] px-[16px]">
                                    <span className="text-[14px] text-[#353535]">
                                        {employee.enrolledDate}
                                    </span>
                                </TableCell>
                                <TableCell className="py-[12px] px-[16px]">
                                    <span className="text-[14px] text-[#353535]">
                                        {employee.leaveBalance}
                                    </span>
                                </TableCell>
                                <TableCell className="py-[12px] px-[16px]">
                                    <span className="text-[14px] text-[#353535]">
                                        {employee.totalBalance}
                                    </span>
                                </TableCell>
                                <TableCell className="py-[12px] px-[16px]">
                                    <span className="text-[14px] text-[#353535]">
                                        {employee.lastLeave}
                                    </span>
                                </TableCell>
                                <TableCell className="py-[12px] px-[16px]">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-[24px] w-[24px] hover:bg-[#E9E9E9] rounded-[4px]"
                                            >
                                                <MoreHorizontal className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Edit Balance
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                Remove
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};
