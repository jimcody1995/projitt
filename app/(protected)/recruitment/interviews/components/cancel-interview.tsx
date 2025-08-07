'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Info } from "lucide-react";

export default function CancelInterview({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent close={false} className="max-w-[383px]">
            <div className="flex flex-col items-center justify-center">
                <div className="w-[40px] h-[40px] rounded-full bg-[#C3060626] flex items-center justify-center">
                    <Info className="size-[20px] text-[#c30606]" />
                </div>
                <p className="mt-[18px] text-[16px]/[20px] font-semibold text-[#353535]">Cancel Interview</p>
                <p className="text-[14px]/[20px] text-[#787878] mt-[4px]">Are you sure you want to cancel this interview?</p>
                <div className="w-full flex gap-[12px] mt-[24px]">
                    <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>No, Go Back</Button>
                    <Button className="w-full" onClick={() => setOpen(false)}>Yes, Cancel Interview</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>;
}