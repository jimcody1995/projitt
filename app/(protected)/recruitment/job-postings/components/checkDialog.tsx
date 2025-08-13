import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { JSX, ReactNode, useState } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { changeJobStatus, deleteJob } from "@/api/job-posting";
import { customToast } from "@/components/common/toastr";

/**
 * CheckDialog component
 * 
 * This component renders a confirmation dialog with different messages and styles
 * depending on the `action` prop. It supports three actions: "unpublish", "close", and "delete".
 * 
 * Props:
 *  - trigger: ReactNode - The element that triggers the dialog when clicked.
 *  - action: "unpublish" | "close" | "delete" - The action type to customize the dialog content and style.
 * 
 * Returns:
 *  JSX.Element - The rendered confirmation dialog.
 */
export default function CheckDialog({
    trigger,
    action,
    id,
    getData,
}: {
    trigger: ReactNode;
    action: "unpublish" | "close" | "delete" | "open";
    id: string;
    getData: () => void;
}): JSX.Element {
    const [loading, setLoading] = useState(false);
    const handleDeleteJob = async () => {
        console.log(id);
        setLoading(true);
        try {
            await deleteJob([id]);
            customToast("Success", "Job deleted successfully", "success");
            getData();
        } catch (error: any) {
            customToast("Error", error.response.data.message, "error");
        }
        finally {
            setLoading(false);
        }
    }
    const handleCloseJob = async () => {
        setLoading(true);
        try {
            await changeJobStatus(id, "closed");
            customToast("Success", "Job closed successfully", "success");
            getData();
        } catch (error: any) {
            customToast("Error", error.response.data.message, "error");
        }
        finally {
            setLoading(false);
        }
    }
    const handleUnpublishJob = async () => {
        setLoading(true);
        try {
            await changeJobStatus(id, "hold");
            customToast("Success", "Job unpublished successfully", "success");
            getData();
        } catch (error: any) {
            customToast("Error", error.response.data.message, "error");
        }
        finally {
            setLoading(false);
        }
    }
    const handleOpenJob = async () => {
        setLoading(true);
        try {
            await changeJobStatus(id, "open");
            customToast("Success", "Job opened successfully", "success");
            getData();
        } catch (error: any) {
            customToast("Error", error.response.data.message, "error");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogTitle
                id={`check-dialog-title-${action}`}
                data-testid={`check-dialog-title-${action}`}
                className="sr-only"
            >
                {/* Title visually hidden since content below serves as dialog content */}
                {action === "unpublish"
                    ? "Unpublish Confirmation"
                    : action === "close"
                        ? "Close Confirmation"
                        : "Delete Confirmation"}
            </DialogTitle>

            <DialogContent
                className="sm:w-[414px] w-full"
                id={`check-dialog-content-${action}`}
                data-testid={`check-dialog-content-${action}`}
            >
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
                            : action === "open"
                                ? "Open this Job Posting?"
                                : "Permanently Delete This Job?"}
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
                            : action === "open"
                                ? "Applicants will be able to apply again, and the job will be marked as open in your system."
                                : "This action will remove this job posting and all associated data. It cannot be undone! You can unpublish or close this job instead to remove temporarily."}
                </p>

                {action === "delete" && (
                    <Input
                        placeholder="Type DELETE to Confirm"
                        className="mt-[18px]"
                        id="check-dialog-delete-input"
                        data-testid="check-dialog-delete-input"
                    />
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
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    {action === "delete" ? (
                        <Button
                            className="h-[36px] bg-[#C30606] hover:bg-[#C30606]/80"
                            id="check-dialog-delete-button"
                            data-testid="check-dialog-delete-button"
                            onClick={handleDeleteJob}
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Delete Job"}
                        </Button>
                    ) : (
                        <Button
                            className="h-[36px]"
                            id={`check-dialog-confirm-button-${action}`}
                            data-testid={`check-dialog-confirm-button-${action}`}
                            onClick={action === "close" ? handleCloseJob : action === "open" ? handleOpenJob : handleUnpublishJob}
                            disabled={loading}
                        >
                            {action === "unpublish"
                                ? (loading ? "Unpublishing..." : "Unpublish")
                                : action === "close"
                                    ? (loading ? "Closing..." : "Close Job")
                                    : action === "open"
                                        ? (loading ? "Opening..." : "Open Job")
                                        : (loading ? "Deleting..." : "Delete")}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
