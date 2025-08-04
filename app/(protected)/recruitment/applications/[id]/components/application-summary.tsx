import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, Linkedin } from "lucide-react";

export default function ApplicationSummary() {
    return (
        <div>
            <div className="flex items-center gap-[10px]">
                <div className="w-[24px] h-[24px] rounded-full bg-[#0d978b] flex items-center justify-center">
                    <Linkedin className="size-[12px] text-white" />
                </div>
                <div className="h-[14px] border-[1.2px] border-[#626262]"></div>
                <div className="flex gap-[4px] items-center">
                    <span className="text-[12px]/[20px] font-medium text-[#4b4b4b]">Website</span>
                    <Link className="size-[16px] text-[#4b4b4b]" />
                </div>
                <div className="h-[14px] border-[1.2px] border-[#626262]"></div>
                <div className="flex gap-[4px] items-center">
                    <span className="text-[12px]/[20px] font-medium text-[#4b4b4b]">Other Link 1</span>
                    <Link className="size-[16px] text-[#4b4b4b]" />
                </div>
                <div className="h-[14px] border-[1.2px] border-[#626262]"></div>
                <div className="flex gap-[4px] items-center">
                    <span className="text-[12px]/[20px] font-medium text-[#4b4b4b]">Other Link 2</span>
                    <Link className="size-[16px] text-[#4b4b4b]" />
                </div>
            </div>
            <div className="flex flex-col gap-[32px] w-full">
                <Collapsible className="w-full">
                    <CollapsibleTrigger className="w-full flex justify-between items-center">
                        <p className="text-[13px]/[20px] font-medium text-[#4b4b4b]">Personal Information</p>
                        <span className="text-[18px] font-medium text-[#4b4b4b]">+</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full">
                        <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">Application Summary</p>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
}