export default function DataImport() {
    return (
        <div className="md:w-[560px] w-full">
            <p className="text-[20px]/[30px] font-semibold text-[#1c1c1c]">Data Import</p>
            <p className="text-[14px]/[20px] text-[#787878]">All new employees will be invited to Projitt to complete their onboarding</p>
            <div className="mt-[36px]">
                <div className="w-full h-[64px] flex items-center border-b border-[#e9e9e9]">
                    <div className="w-[40%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        File Name
                    </div>
                    <div className="w-[60%] px-[16px] text-[#0d978b] text-[14px]/[22px]">
                        [File Name]
                    </div>
                </div>
                <div className="w-full h-[64px] flex items-center border-b border-[#e9e9e9]">
                    <div className="w-[40%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        Total Records
                    </div>
                    <div className="w-[60%] px-[16px] text-[#0d978b] text-[14px]/[22px]">
                        58 employees detected
                    </div>
                </div>
                <div className="w-full h-[64px] flex items-center border-b border-[#e9e9e9]">
                    <div className="w-[40%] px-[16px] text-[#353535] text-[14px]/[22px]">
                        Mapped Fields
                    </div>
                    <div className="w-[60%] px-[16px] text-[#0d978b] text-[14px]/[22px]">
                        15 of 15 columns successfully mapped
                    </div>
                </div>
            </div>
        </div>
    )
}