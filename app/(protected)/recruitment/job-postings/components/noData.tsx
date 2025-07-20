import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const NoData = () => {
    return (
        <div className='w-full mt-[170px] flex flex-col justify-center items-center '>
            <img src="/images/common/table-nodata.png" alt="" className="w-[80px] h-[80px]" />
            <p className="text-[24px]/[30px] font-semibold text-[#1C1C1C] mt-[14px]">No Jobs Posted Yet</p>
            <p className="text-[16px]/[26px] text-[#4b4b4b] mt-[8px]">Start attracting the right talent by creating your first job listing.</p>
            <Button className='h-[42px] font-semibold text-[14px]/[20px] mt-[28px]'>
                <Plus className='size-[18px]' />
                Create New Job
            </Button>
        </div>
    );
};