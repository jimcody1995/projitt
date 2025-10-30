"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Plus, Calendar, DollarSign, AlertCircle, CircleAlert, X } from "lucide-react";

export default function PayrollOperations() {
    const [tasks, setTasks] = useState([
        {
            batchId: "PRJ-53",
            title: "Display Earnings & Deductions Summary",
            badge: "M",
            role: "Payroll Manager",
            status: "To Do"
        },
        {
            batchId: "PRJ-295",
            title: "Error Handling & Validation Alerts",
            badge: "H",
            role: "System Admin",
            status: "To Do"
        },
        {
            batchId: "PRJ-148",
            title: "Generate Payroll Tax Filing Reports",
            badge: "H",
            role: "Finance Lead",
            status: "In Progress"
        },
        {
            batchId: "PRJ-199",
            title: "Update Employee Benefits",
            badge: "M",
            role: "HR Specialist",
            status: "To Do"
        }
    ]);

    // Add Task Modal State
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        batchId: "",
        title: "",
        badge: "M",
        role: "",
        status: "To Do"
    });

    const handleStatusChange = (batchId: string, newStatus: string) => {
        setTasks(prev => prev.map(task =>
            task.batchId === batchId
                ? { ...task, status: newStatus }
                : task
        ));
    };

    // Add Task Functions
    const handleAddTask = () => {
        setIsAddTaskModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddTaskModalOpen(false);
        setNewTask({
            batchId: "",
            title: "",
            badge: "M",
            role: "",
            status: "To Do"
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setNewTask(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitTask = () => {
        // Validate required fields
        if (!newTask.batchId.trim() || !newTask.title.trim() || !newTask.role.trim()) {
            alert("Please fill in all required fields");
            return;
        }

        // Add new task to the list
        setTasks(prev => [...prev, { ...newTask }]);

        // Close modal and reset form
        handleCloseModal();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Progress":
                return "bg-gray-100 text-gray-700";
            case "To Do":
                return "bg-blue-100 text-blue-700";
            case "Done":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className=" min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-[20px] sm:text-[24px] font-semibold text-gray-900">Payroll Operations Dashboard</h1>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Upcoming Pay Runs Card */}
                    <Card className="bg-white rounded-lg shadow-sm px-5">
                        <CardHeader className="py-1 border-gray-200 px-0">
                            <CardTitle className="text-lg font-semibold text-gray-900 ">Upcoming Pay Runs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 px-0">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-b-0">
                                <div>
                                    <p className="font-medium text-gray-900">Mar 1 - Mar 15</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">Mar 15, 2024</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pb-2">
                                <div>
                                    <p className="font-medium text-gray-900">Feb 16 - Feb 29</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">Feb 29, 2024</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Deductions Card */}
                    <Card className="bg-white rounded-lg shadow-sm px-5">
                        <CardHeader className="py-1 border-gray-200 px-0">
                            <CardTitle className="text-lg font-semibold text-gray-900 ">Pending Deductions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 px-0">
                            <div className="flex justify-between items-center pb-2 ">
                                <div>
                                    <p className="font-medium text-2xl font-semibold text-gray-900">$1,780</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">$1,200</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pb-2">
                                <div>
                                    <p className="font-medium  font-normal text-gray-900">Healthcare</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium  font-normal text-gray-900">$200</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pb-2">
                                <div>
                                    <p className="font-medium  font-normal text-gray-900">Healthcare</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium  font-normal text-gray-900">$200</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Validation Alerts Card */}
                    <Card className="bg-white rounded-lg shadow-sm px-5">
                        <CardHeader className="py-1 border-gray-200 px-0">
                            <div className="flex justify-between items-center w-full">
                                <CardTitle className="text-lg font-semibold text-gray-900">Validation Alerts</CardTitle>
                                <div className="text-md font-semibold text-gray-900">
                                    2 Issues
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-1 px-0 pt-2">
                            <div className="flex items-center gap-3">
                                <CircleAlert className="h-5 w-5 text-white fill-[#f4746e]" />
                                <span className="text-sm font-medium text-gray-900">PRJ-153 Error Handling Alert</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CircleAlert className="h-5 w-5 text-white fill-[#f4746e]" />
                                <span className="text-sm font-medium text-gray-900">PRJ-298 Validation Alert</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Payroll Tasks */}
                <div>
                    <Card className="bg-white rounded-lg shadow-sm px-5">
                        <CardHeader className="py-1 border-gray-200 px-0">
                            <div className="flex justify-between items-center w-full">
                                <CardTitle className="text-lg font-semibold text-gray-900 font-semibold">Payroll tasks</CardTitle>
                                <Button
                                    onClick={handleAddTask}
                                    className="bg-primary hover:bg-primary/90 text-white h-8 text-sm"
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Task
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-1 px-0 pt-2">
                            {tasks.map((task) => (
                                <div key={task.batchId} className="flex flex-col items-center justify-between gap-3 py-3 border-b border-gray-200 last:border-b-0">
                                    <div className="flex flex-row justify-between w-full">
                                        <p className="font-medium text-gray-900 text-md">
                                            <span className="font-semibold">{task.batchId}</span>
                                        </p>
                                        <p className="font-medium text-gray-900 text-md">
                                            {task.title}
                                        </p>
                                    </div>
                                    <div className="flex  flex-row justify-between w-full gap-2 mt-1">
                                        <div className="flex flex-row items-center gap-2">
                                            <Avatar className="h-7 w-7">
                                                <AvatarFallback className={`${task.badge === "M"
                                                    ? "bg-yellow-100"
                                                    : "bg-pink-100"
                                                    } text-sm font-medium text-gray-900`}>
                                                    {task.badge}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-gray-900">{task.role}</span>
                                        </div>
                                        <Select
                                            value={task.status}
                                            onValueChange={(value) => handleStatusChange(task.batchId, value)}
                                        >
                                            <SelectTrigger className="w-30 h-8 text-xs px-3">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="To Do">To Do</SelectItem>
                                                <SelectItem value="In Progress">In Progress</SelectItem>
                                                <SelectItem value="Review">Review</SelectItem>
                                                <SelectItem value="Done">Done</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Add Task Modal */}
            <Dialog open={isAddTaskModalOpen} onOpenChange={setIsAddTaskModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            Add New Task
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Batch ID */}
                        <div className="space-y-2">
                            <Label htmlFor="batchId" className="text-sm font-medium">
                                Batch ID *
                            </Label>
                            <Input
                                id="batchId"
                                placeholder="e.g., PRJ-200"
                                value={newTask.batchId}
                                onChange={(e) => handleInputChange("batchId", e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* Task Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium">
                                Task Title *
                            </Label>
                            <Textarea
                                id="title"
                                placeholder="Enter task description..."
                                value={newTask.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                className="w-full min-h-[80px]"
                            />
                        </div>

                        {/* Badge Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="badge" className="text-sm font-medium">
                                Assignee Badge
                            </Label>
                            <Select
                                value={newTask.badge}
                                onValueChange={(value) => handleInputChange("badge", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">M - Manager</SelectItem>
                                    <SelectItem value="H">H - Head/Lead</SelectItem>
                                    <SelectItem value="A">A - Admin</SelectItem>
                                    <SelectItem value="S">S - Specialist</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-sm font-medium">
                                Role *
                            </Label>
                            <Input
                                id="role"
                                placeholder="e.g., Payroll Manager"
                                value={newTask.role}
                                onChange={(e) => handleInputChange("role", e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-sm font-medium">
                                Initial Status
                            </Label>
                            <Select
                                value={newTask.status}
                                onValueChange={(value) => handleInputChange("status", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Review">Review</SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleCloseModal}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitTask}
                            className="flex-1 bg-primary hover:bg-primary/90"
                        >
                            Add Task
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}