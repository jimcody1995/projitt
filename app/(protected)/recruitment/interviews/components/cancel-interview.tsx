'use client';

import { cancelInterviewApi } from "@/api/interviews";
import { customToast } from "@/components/common/toastr";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Info, Loader2 } from "lucide-react";
import { useState } from "react";

/**
 * @description
 * This component, `CancelInterview`, is a confirmation dialog for canceling an interview. 
 * It's designed to be a simple, centered modal that presents the user with a clear question and two options: "No, Go Back" to close the dialog, and "Yes, Cancel Interview" to proceed with the action.
 * The dialog's visibility is controlled by `open` and `setOpen` props from a parent component.
 * It provides a visual cue with an `Info` icon to indicate that the user is about to perform a significant action.
 * Unique `data-testid` and `id` attributes have been added to the buttons and main dialog content to support UI test automation.
 */
export default function CancelInterview({ getData, open, setOpen, selectedCancel }: { getData: () => void, open: boolean, setOpen: (open: boolean) => void, selectedCancel: any }) {
    const [loading, setLoading] = useState(false);
    const cancelInterview = async () => {
        setLoading(true);
        try {
            await cancelInterviewApi({ id: selectedCancel, status: 'cancel' });
            customToast('Success', 'Interview cancelled successfully', 'success');
            setOpen(false);
            getData();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            customToast('Error', errorMessage, 'error');
        }
        finally {
            setLoading(false);
        }
    }
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent close={false} className="max-w-[383px]" data-testid="cancel-interview-dialog">
            <div className="flex flex-col items-center justify-center">
                <div className="w-[40px] h-[40px] rounded-full bg-[#C3060626] flex items-center justify-center">
                    <Info className="size-[20px] text-[#c30606]" />
                </div>
                <p className="mt-[18px] text-[16px]/[20px] font-semibold text-[#353535]" data-testid="dialog-title">Cancel Interview</p>
                <p className="text-[14px]/[20px] text-[#787878] mt-[4px]" data-testid="dialog-message">Are you sure you want to cancel this interview?</p>
                <div className="w-full flex gap-[12px] mt-[24px]">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setOpen(false)}
                        data-testid="no-go-back-button"
                        id="no-go-back-button"
                        disabled={loading}
                    >
                        No, Go Back
                    </Button>
                    <Button
                        className="w-full"
                        onClick={() => {
                            cancelInterview();
                        }}
                        data-testid="yes-cancel-button"
                        id="yes-cancel-button"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="size-[16px] animate-spin" /> : "Yes, Cancel Interview"}
                    </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>;
}
