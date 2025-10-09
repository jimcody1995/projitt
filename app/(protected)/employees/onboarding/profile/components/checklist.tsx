import { Button } from "@/components/ui/button";

export default function Checklist() {
    return <div>
        <div className="md:w-[703px] w-full p-[16px] bg-white rounded-[12px] border border-[#e9e9e9] flex flex-col gap-[12px]">
            <div className="h-[44px] flex w-full justify-between">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#626262]">Background Check</p>
                    <p className="text-[14px]/[20px] text-[#A5A5A5]">Criminal, Employment, Education, Credit, Identity</p>
                </div>

                <button className="text-[#0d978b] text-[14px]/[22px]">Mark as Completed</button>
            </div>
            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
            <div className="h-[40px] flex w-full justify-between items-center">
                <p className="text-[14px]/[22px] text-[#626262]">Email Id Creation</p>

                <Button className="h-[32px] rounded-[8px]">Completed</Button>
            </div>
            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
            <div className="h-[40px] flex w-full justify-between items-center">
                <p className="text-[14px]/[22px] text-[#626262]">Background Check</p>

                <button className="text-[#0d978b] text-[14px]/[22px]">Mark as Completed</button>
            </div>
            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
            <div className="h-[40px] flex w-full justify-between items-center">
                <p className="text-[14px]/[22px] text-[#626262]">Background Check</p>

                <button className="text-[#0d978b] text-[14px]/[22px]">Mark as Completed</button>
            </div>
        </div>
    </div>;
}