'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Info } from "lucide-react";

/**
 * @description
 * This component, `CancelInterview`, is a confirmation dialog for canceling an interview. 
 * It's designed to be a simple, centered modal that presents the user with a clear question and two options: "No, Go Back" to close the dialog, and "Yes, Cancel Interview" to proceed with the action.
 * The dialog's visibility is controlled by `open` and `setOpen` props from a parent component.
 * It provides a visual cue with an `Info` icon to indicate that the user is about to perform a significant action.
 * Unique `data-testid` and `id` attributes have been added to the buttons and main dialog content to support UI test automation.
 */
export default function CheckInterview({ open, setOpen, message }: { open: boolean, setOpen: (open: boolean) => void, message: string }) {
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent close={false} className="max-w-[284px] p-[27px]" data-testid="cancel-interview-dialog">
            <div className="flex flex-col items-center justify-center">
                <div className="w-[40px] h-[40px] rounded-full bg-[#D6EEEC] flex items-center justify-center">
                    <Info className="size-[20px] text-[#0d978b]" />
                </div>
                <p className="text-[14px]/[20px] text-[#353535] mt-[18px]" data-testid="dialog-message">{message}</p>
                <div className="w-full flex gap-[12px] mt-[18px]">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setOpen(false)}
                        data-testid="no-go-back-button"
                        id="no-go-back-button"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-full"
                        onClick={() => setOpen(false)}
                        data-testid="yes-cancel-button"
                        id="yes-cancel-button"
                    >
                        Yes, Confirm
                    </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>;
}
