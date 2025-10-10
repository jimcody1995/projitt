import { Download } from "lucide-react";


export const Summary = () => {
    return (
        <div>
            {/* Basic Info Section */}
            <div className="mb-[40px]">
                <h3 className="text-[18px]/[24px] font-semibold text-[#353535] mb-[19px]">
                    Basic Info
                </h3>
                <div className="space-y-[20px]">
                    <div>
                        <label className="text-[15px]/[16px] text-[#8F8F8F] mb-[9px] block">
                            Leave Type
                        </label>
                        <p className="text-[15px]/[16px] text-[#353535] font-medium">
                            Vacation
                        </p>
                    </div>
                    <div>
                        <label className="text-[15px]/[16px] text-[#8F8F8F] mb-[9px] block">
                            Description
                        </label>
                        <p className="text-[15px]/[20px] font-medium text-[#353535] leading-[20px] w-[388px]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                        </p>
                    </div>
                    <div>
                        <label className="text-[15px]/[16px] text-[#8F8F8F] mb-[9px] block">
                            Minimum Notice Period
                        </label>
                        <p className="text-[15x]/[20px] text-black font-medium">
                            12 days
                        </p>
                    </div>
                    <div>
                        <label className="text-[15px]/[16px] text-[#8F8F8F] mb-[9px] block">
                            Leave Usage waiting period
                        </label>
                        <p className="text-[15px]/[16px] text-gray-900 font-semibold">
                            90 days
                        </p>
                    </div>
                    <div>
                        <label className="text-[15px]/[16px] text-gray-700 mb-[9px] block">
                            Require document submission
                        </label>
                        <p className="text-[15px]/[16px] text-gray-950 font-seemibold">
                            Yes, require document for leave request
                        </p>
                    </div>
                    <div>
                        <label className="text-[15px]/[16px] text-gray-700 mb-[9px] block">
                            Policy Document
                        </label>
                        <div className="flex items-center gap-[8px]">
                            <Download className="size-4 text-[#0d978b]" />
                            <span className="text-4 text-[#0d978b] font-medium cursor-pointer hover:underline">
                                Leave Policy.pdf
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Allowance & Accrual Section */}
            <div>
                <h3 className="text-[18px] font-semibold text-[#353535] mb-[19px]">
                    Allowance & Accrual
                </h3>
                <div className="space-y-[20px]">
                    <div>
                        <label className="text-[14px]/[16px] text-gray-700 mb-[9px] block">
                            Total hours per year
                        </label>
                        <p className="text-[14px]/[16px] text-gray-950 font-medium">
                            30 hours
                        </p>
                    </div>
                    <div>
                        <label className="text-[14px]/[16px] text-gray-700 mb-[9px] block">
                            Accrual Method
                        </label>
                        <p className="text-[14px]/[16px] text-gray-950 font-medium ">
                            Monthly - 2.5hours/month
                        </p>
                    </div>
                    <div>
                        <label className="text-[14px]/[16px] text-gray-700 mb-[9px] block">
                            Carryover
                        </label>
                        <p className="text-[14px]/[16px] text-gray-950 font-medium">
                            Yes, allow carryover
                        </p>
                    </div>
                    <div>
                        <label className="text-[14px]/[16px] text-gray-700 mb-[9px] block">
                            Maximum Carryover
                        </label>
                        <p className="text-[14px]/[16px] text-gray-950 font-medium">
                            20 hours
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
