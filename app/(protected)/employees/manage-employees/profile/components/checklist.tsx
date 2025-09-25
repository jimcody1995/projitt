import { Button } from "@/components/ui/button";

export default function Checklist() {
    return <div>
        <div className="md:w-[703px] w-full p-[16px] bg-white rounded-[12px] border border-[#e9e9e9] flex flex-col gap-[12px]">
            <div className="h-[32px] flex w-full justify-between">
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

                <button className="text-[#0d978b] text-[14px]/[22px]">Mark as Completed</button>
            </div>
        </div>
    </div>;
}