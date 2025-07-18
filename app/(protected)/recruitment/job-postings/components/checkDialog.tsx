import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CheckDialog({ trigger, action }: { trigger: ReactNode; action: "unpublish" | "close" | "delete" }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent className="w-[414px]">
                <div className="w-full flex flex-col items-center">
                    <div className={`w-[40px] h-[40px] rounded-full ${action === "delete" ? "bg-[#C3060633]" : "bg-[#D6EEEC]"} flex items-center justify-center`}>
                        <Info className={`size-[20px] ${action === "delete" ? "text-[#C30606]" : "text-[#0d978b]"}`} />
                    </div>
                </div>
                <p className="mt-[18px] text-[#353535] text-[16px]/[20px] font-semibold text-center">{action === "unpublish" ? "Unpublish this Job?" : action === "close" ? "Close this Job Posting?" : "Permanently Delete This Job?"}</p>
                <p className="mt-[4px] text-[#787878] text-[14px]/[20px] text-center">
                    {action === "unpublish" ? "Applicants will no longer be able to apply, but the job remains open internally and can be re-published from drafts anytime." :
                        action === "close" ? "Applicants will no longer be able to apply, and the job will be marked as closed in your system." :
                            "This action will remove this job posting and all associated data. It cannot be undone! You can unpublish or close this job instead to remove temporarily."}
                </p>
                {action === "delete" && <Input placeholder="Type DELETE to Confirm" className="mt-[18px]" />}
                <div className="w-full flex justify-center gap-[12px] mt-[18px]">
                    <DialogClose asChild>
                        <Button className="h-[36px]" variant="outline">Cancel</Button>
                    </DialogClose>
                    {action === "delete" ? <DialogClose asChild>
                        <Button className="h-[36px] bg-[#C30606] hover:bg-[#C30606]/80">Delete Job</Button>
                    </DialogClose> : <DialogClose asChild>
                        <Button className="h-[36px]">{action === "unpublish" ? "Unpublish" : action === "close" ? "Close Job" : "Delete"}</Button>
                    </DialogClose>}
                </div>
            </DialogContent>
        </Dialog>
    );
}