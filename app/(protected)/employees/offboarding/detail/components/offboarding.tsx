import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function Offboarding() {
    return <div>
        <Button className="h-[42px] sm:w-[312px] w-full">
            Complete Offboarding
        </Button>
        <div className="md:w-[635px] w-full p-[16px] bg-white rounded-[12px] mt-[38px] border border-[#e9e9e9] flex flex-col gap-[12px]">
            <p className="text-[14px]/[20px] text-[#353535]">Offboarding Checklist</p>
            <div className="h-[32px] flex w-full justify-between mt-[16px]">
                <p className="text-[14px]/[22px] text-[#626262]">Background Check</p>

                <button className="text-[#0d978b] text-[14px]/[22px]">Mark as Completed</button>
            </div>
            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
            <div className="h-[32px] flex w-full justify-between">
                <p className="text-[14px]/[22px] text-[#626262]">Email Id Creation</p>

                <Button className="h-[32px]">Completed</Button>
            </div>
            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
            <div className="h-[32px] flex w-full justify-between">
                <p className="text-[14px]/[22px] text-[#626262]">Background Check</p>

                <button className="text-[#0d978b] text-[14px]/[22px]">Mark as Completed</button>
            </div>
            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
            <div className="h-[32px] flex w-full justify-between">
                <p className="text-[14px]/[22px] text-[#626262]">Background Check</p>

                <button className="text-[#0d978b] text-[14px]/[22px]">Mark as Completed </button>
            </div>
        </div>
        <div className="md:w-[635px] w-full p-[16px] bg-white rounded-[12px] mt-[38px] border border-[#e9e9e9] flex flex-col gap-[12px]">
            <p className="text-[14px]/[20px] text-[#353535]">Offboarding Documents</p>
            <div className="h-[32px] flex w-full justify-between mt-[16px]">
                <p className="text-[14px]/[22px] text-[#626262]">Offer Letter</p>

                <button className="text-[#0d978b] text-[14px]/[22px] flex items-center gap-[5px]">View Submitted Document <ArrowUpRight className="size-[16px] " /></button>
            </div>
            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
            <div className="h-[32px] flex w-full justify-between">
                <p className="text-[14px]/[22px] text-[#626262]">Non Disclosure Agreement</p>

                <p className="text-[#626262] text-[14px]/[22px]">Pending</p>
            </div>
            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
            <div className="h-[32px] flex w-full justify-between">
                <p className="text-[14px]/[22px] text-[#626262]">Employee Agreement</p>

                <button className="text-[#0d978b] text-[14px]/[22px]  flex items-center gap-[5px]">View Submitted Document <ArrowUpRight className="size-[16px] " /></button>
            </div>
        </div>
    </div>;
}