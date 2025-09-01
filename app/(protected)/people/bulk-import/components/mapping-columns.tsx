import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MappingColumns() {
    return (
        <div>
            <p className="text-[20px]/[30px] font-semibold text-[#1c1c1c]">Mapping  Columns</p>
            <p className="text-[14px]/[20px] text-[#787878]">Confirm each column header in Projitt matches the column headers in your files. <br />Not required columns can be skipped.</p>
            <div className="mt-[19px]">
                <div className="bg-[#eef3f2] w-full rounded-t-[12px] h-[60px] flex items-center">
                    <div className="w-[25%] px-[16px] text-[#8c8e8e] text-[14px]/[22px]">
                        Column Data in Projitt
                    </div>
                    <div className="w-[25%] px-[16px] text-[#8c8e8e] text-[14px]/[22px]">
                        CSV Column
                    </div>
                    <div className="w-[50%] px-[16px] text-[#8c8e8e] text-[14px]/[22px]">
                        CSV Example Data
                    </div>
                </div>
                <div className="w-full  h-[60px] flex items-center border-b border-[#e9e9e9]">
                    <div className="w-[25%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        First Name
                    </div>
                    <div className="w-[25%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        <Select>
                            <SelectTrigger className="h-[42px]">
                                <SelectValue placeholder="Select CSV Column" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="first_name">First Name</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[50%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        John
                    </div>
                </div>
                <div className="w-full  h-[60px] flex items-center border-b border-[#e9e9e9]">
                    <div className="w-[25%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        Last Name
                    </div>
                    <div className="w-[25%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        <Select>
                            <SelectTrigger className="h-[42px]">
                                <SelectValue placeholder="Select CSV Column" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="last_name">Last Name</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[50%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        Doe
                    </div>
                </div>
                <div className="w-full  h-[60px] flex items-center border-b border-[#e9e9e9]">
                    <div className="w-[25%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        Email
                    </div>
                    <div className="w-[25%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        <Select>
                            <SelectTrigger className="h-[42px]">
                                <SelectValue placeholder="Select CSV Column" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[50%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        john.doe@example.com
                    </div>
                </div>
            </div>
        </div >
    )
}