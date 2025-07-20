import { Ban, Trash, Upload } from "lucide-react";

export const SelectedDialog = ({ selectedRows, totalCount }: { selectedRows: string[]; totalCount: number; }) => {
    return (
        <div className='w-full flex justify-center items-center absolute bottom-[40px] z-[1000]'>
            <div className='bg-[#053834] px-[20px] py-[12px] w-[670px] rounded-[12px] flex justify-between'>
                <div className='flex items-center'>
                    <div className='pr-[16px] border-r text-[15px]/[20px] border-[#626262] text-[#d2d2d2] py-[4px]'>
                        {selectedRows.length} of <span className='text-[#fff] '>{totalCount}</span> selected
                    </div>
                    <button className='text-[15px]/[20px] pl-[16px] text-white'>
                        Select all
                    </button>
                </div>
                <div className='flex items-center'>
                    <button className='text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px]'>
                        <Ban className='size-[16px]' />
                        Close
                    </button>
                    <button className='text-[15px]/[20px] pl-[16px] text-white py-[4px] border-r border-[#626262] px-[16px] flex items-center gap-[6px]'>
                        <Trash className='size-[16px]' />
                        Delete
                    </button>
                    <button className='text-[15px]/[20px] pl-[16px] text-white py-[4px] px-[16px] flex items-center gap-[6px]'>
                        <Upload className='size-[16px]' />
                        Export CSV
                    </button>
                </div>
            </div>
        </div>
    );
};