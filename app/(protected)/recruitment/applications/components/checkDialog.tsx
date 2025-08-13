import { Dialog, DialogClose, DialogContent, div, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { JSX, ReactNode, useState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * CheckDialog component
 * 
 * This component renders a confirmation dialog with different messages and styles
 * depending on the `action` prop. It supports three actions: "unpublish", "close", and "delete".
 * For delete actions, it requires the user to type "DELETE" in an input field to confirm.
 * 
 * Props:
 *  - trigger: ReactNode - The element that triggers the dialog when clicked.
 *  - action: "unpublish" | "close" | "delete" - The action type to customize the dialog content and style.
 *  - onConfirm?: () => void - Optional callback function to execute when the action is confirmed.
 * 
 * Returns:
 *  JSX.Element - The rendered confirmation dialog.
 */
export default function CheckDialog({
    trigger,
    action,
    onConfirm,
}: {
    trigger: ReactNode;
    action: "unpublish" | "close" | "delete";
    onConfirm?: () => void;
}): JSX.Element {
    const [deleteInputValue, setDeleteInputValue] = useState("");
    const [showValidationError, setShowValidationError] = useState(false);

    const handleDeleteConfirm = () => {
        if (action === "delete") {
            if (deleteInputValue === "DELETE") {
                setShowValidationError(false);
                onConfirm?.();
            } else {
                setShowValidationError(true);
            }
        } else {
            onConfirm?.();
        }
    };

    const handleInputChange = (value: string) => {
        setDeleteInputValue(value);
        if (showValidationError && value === "DELETE") {
            setShowValidationError(false);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent
                className="w-[414px]"
                id={`check-dialog-content-${action}`}
                data-testid={`check-dialog-content-${action}`}
                onClick={(e) => e.stopPropagation()}
            >
                <DialogTitle>
                </DialogTitle>
                <div className="w-full flex flex-col items-center">
                    <div
                        className={`w-[40px] h-[40px] rounded-full ${action === "delete" ? "bg-[#C3060633]" : "bg-[#D6EEEC]"
                            } flex items-center justify-center`}
                        id={`check-dialog-icon-bg-${action}`}
                        data-testid={`check-dialog-icon-bg-${action}`}
                    >
                        <Info
                            className={`size-[20px] ${action === "delete" ? "text-[#C30606]" : "text-[#0d978b]"
                                }`}
                            id={`check-dialog-icon-${action}`}
                            data-testid={`check-dialog-icon-${action}`}
                        />
                    </div>
                </div>

                <p
                    className="mt-[18px] text-[#353535] text-[16px]/[20px] font-semibold text-center"
                    id={`check-dialog-title-text-${action}`}
                    data-testid={`check-dialog-title-text-${action}`}
                >
                    {action === "unpublish"
                        ? "Unpublish this Job?"
                        : action === "close"
                            ? "Close this Job Posting?"
                            : "Permanently Delete This Application?"}
                </p>

                <p
                    className="mt-[4px] text-[#787878] text-[14px]/[20px] text-center"
                    id={`check-dialog-description-${action}`}
                    data-testid={`check-dialog-description-${action}`}
                >
                    {action === "unpublish"
                        ? "Applicants will no longer be able to apply, but the job remains open internally and can be re-published from drafts anytime."
                        : action === "close"
                            ? "Applicants will no longer be able to apply, and the job will be marked as closed in your system."
                            : "This action will remove this application and all associated data. It cannot be undone! You can unpublish or close this job instead to remove temporarily."}
                </p>

                {action === "delete" && (
                    <div className="mt-[18px] w-full">
                        <Input
                            placeholder="Type DELETE to Confirm"
                            className={`${showValidationError ? 'border-red-500 focus:border-red-500' : ''}`}
                            id="check-dialog-delete-input"
                            data-testid="check-dialog-delete-input"
                            value={deleteInputValue}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                        {showValidationError && (
                            <p className="mt-1 text-red-500 text-sm">
                                Please type &quot;DELETE&quot; to confirm this action
                            </p>
                        )}
                    </div>
                )}

                <div
                    className="w-full flex justify-center gap-[12px] mt-[18px]"
                    id={`check-dialog-buttons-${action}`}
                    data-testid={`check-dialog-buttons-${action}`}
                >
                    <DialogClose asChild>
                        <Button
                            className="h-[36px]"
                            id={`check-dialog-cancel-button-${action}`}
                            data-testid={`check-dialog-cancel-button-${action}`}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    {action === "delete" ? (
                        <Button
                            className="h-[36px] bg-[#C30606] hover:bg-[#C30606]/80"
                            id="check-dialog-delete-button"
                            data-testid="check-dialog-delete-button"
                            onClick={handleDeleteConfirm}
                        >
                            Delete Application
                        </Button>
                    ) : (
                        <DialogClose asChild>
                            <Button
                                className="h-[36px]"
                                id={`check-dialog-confirm-button-${action}`}
                                data-testid={`check-dialog-confirm-button-${action}`}
                                onClick={handleDeleteConfirm}
                            >
                                {action === "unpublish"
                                    ? "Unpublish"
                                    : action === "close"
                                        ? "Close Job"
                                        : "Delete"}
                            </Button>
                        </DialogClose>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
