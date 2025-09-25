'use client'
import { JSX, useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customToast } from "@/components/common/toastr";

interface TeamsDialogProps {
    children: React.ReactNode;
    type: 'create' | 'rename' | 'delete' | 'merge';
    departmentName?: string;
    mergeTeams?: string[];
    onConfirm: (data: { name: string }) => void;
}

export const TeamsDialog = ({
    children,
    type,
    departmentName = '',
    mergeTeams = [],
    onConfirm
}: TeamsDialogProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(departmentName);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (type === 'delete') {
            setLoading(true);
            try {
                await onConfirm({ name: inputValue.trim() });
                customToast("Success", "Team deleted successfully", "success");
                setOpen(false);
            } catch (error) {
                console.error(error);
                customToast("Error", "Failed to delete team", "error");
            } finally {
                setLoading(false);
            }
        } else {
            if (!inputValue.trim()) {
                customToast("Error", "Please enter a team name", "error");
                return;
            }

            setLoading(true);
            try {
                await onConfirm({ name: inputValue.trim() });
                customToast("Success", `Team ${type === 'create' ? 'created' : type === 'rename' ? 'renamed' : 'merged'} successfully`, "success");
                setOpen(false);
                setInputValue('');
            } catch (error) {
                console.error(error);
                customToast("Error", `Failed to ${type} team`, "error");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setInputValue(departmentName || '');
    };

    const getDialogContent = () => {
        switch (type) {
            case 'create':
                return {
                    title: "Create Team",
                    description: "Enter a name for the new team.",
                    placeholder: "Enter Team Name",
                    confirmText: "Save",
                    confirmVariant: "default" as const,
                    showInput: true
                };
            case 'rename':
                return {
                    title: "Rename Team",
                    placeholder: "Enter Team Name",
                    confirmText: "Save",
                    confirmVariant: "default" as const,
                    showInput: true
                };
            case 'delete':
                return {
                    title: "Are you sure you want to delete?",
                    description: "This action can't be undone.",
                    placeholder: "",
                    confirmText: "Yes, Delete",
                    confirmVariant: "destructive" as const,
                    showInput: false
                };
            case 'merge':
                return {
                    title: "Merge Team",
                    description: `Merge ${mergeTeams.join(' and ')} Team`,
                    placeholder: "Enter New Team Name",
                    confirmText: "Save",
                    confirmVariant: "default" as const,
                    showInput: true
                };
            default:
                return {
                    title: "",
                    description: "",
                    placeholder: "",
                    confirmText: "",
                    confirmVariant: "default" as const,
                    showInput: false
                };
        }
    };

    const content = getDialogContent();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={(e) => {
                e.stopPropagation();
            }}>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" close={false}>
                <div className="flex items-center gap-3">
                    {type === 'delete' && (
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#C3060633]">
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                        </div>
                    )}
                    <div className="flex-1">
                        <p className="text-lg font-medium">
                            {content.title}
                        </p>
                        <p className=" text-sm text-gray-600">
                            {content.description}
                        </p>
                    </div>
                </div>

                <div className="mt-[16px]">
                    {content.showInput && (
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={content.placeholder}
                            className="w-full h-[42px]"
                            autoFocus
                        />
                    )}
                </div>

                <div className={`flex ${content.confirmVariant === 'destructive' ? 'justify-end' : 'justify-between'} gap-[20px] mt-[30px]`}>
                    <Button
                        variant="outline"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCancel();
                        }}
                        disabled={loading}
                        className={`w-full ${content.confirmVariant === 'destructive' ? 'w-[100px]' : ''}`}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm();
                        }}
                        disabled={loading}
                        className={content.confirmVariant === 'destructive' ? 'bg-red-600 hover:bg-red-700' : 'w-full'}
                    >
                        {loading ? "Processing..." : content.confirmText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Individual dialog components for easier use
export const CreateTeamsDialog = ({ children, onConfirm }: { children: React.ReactNode; onConfirm: (data?: { name: string }) => void }) => (
    <TeamsDialog type="create" onConfirm={onConfirm}>
        {children}
    </TeamsDialog>
);

export const RenameTeamsDialog = ({ children, departmentName, onConfirm }: { children: React.ReactNode; departmentName: string; onConfirm: (data: { name: string }) => void }) => (
    <TeamsDialog type="rename" departmentName={departmentName} onConfirm={onConfirm}>
        {children}
    </TeamsDialog>
);

export const DeleteTeamsDialog = ({ children, onConfirm }: { children: React.ReactNode; onConfirm: () => void }) => (
    <TeamsDialog type="delete" onConfirm={onConfirm}>
        {children}
    </TeamsDialog>
);

export const MergeTeamsDialog = ({ children, mergeTeams, onConfirm }: { children: React.ReactNode; mergeTeams: string[]; onConfirm: (data: { name: string }) => void }) => (
    <TeamsDialog type="merge" mergeTeams={mergeTeams} onConfirm={onConfirm}>
        {children}
    </TeamsDialog>
);
