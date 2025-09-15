import { BookMinus, BriefcaseBusiness, Edit, User } from "lucide-react";

export default function PersonalInfomation() {
    return <div>
        <div className="w-full flex gap-[24px]">
            <div className="w-[428px] flex flex-col gap-[24px]">
                <div className="w-full rounded-[12px] bg-white border border-[#e9e9e9] p-[20px] pb-[39px]">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-[6px]">
                            <BookMinus className="size-[16px] text-[#8f8f8f]" />
                            <p className="text-[16px]/[20px] font-semibold text-[#353535]">Contact Information</p>
                        </div>
                        <button
                            className="font-medium bg-[#0d978b] text-white rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"
                            id="edit-personal-information"
                            data-testid="edit-personal-information"
                        >
                            <Edit className="size-[16px]" />
                        </button>
                    </div>

                    <div className="mt-[24px]">
                        <div className="flex flex-col gap-[16px] mt-[24px]">
                            <div className="flex">
                                <div className="w-[60%] flex flex-col gap-[4px]">
                                    <p className="text-[12px]/[18px] text-[#8f8f8f]">Email address</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#0d978b]">alicefernadez@gmail.com</p>
                                </div>
                                <div className="w-[40%]">
                                    <p className="text-[12px]/[18px] font-medium text-[#8f8f8f]">Email</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">alicefernadez@gmail.com</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
                            <div className="flex flex-col gap-[4px]">
                                <p className="text-[12px]/[18px] text-[#8f8f8f]">Residential Addresss</p>
                                <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">8502 Preston Rd. Inglewood, Maine 98380</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full rounded-[12px] bg-white border border-[#e9e9e9] p-[20px] pb-[39px]">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-[6px]">
                            <BriefcaseBusiness className="size-[16px] text-[#8f8f8f]" />
                            <p className="text-[16px]/[20px] font-semibold text-[#353535]">Employment Overview</p>
                        </div>
                        {/* <button
                            className="font-medium bg-[#0d978b] text-white rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"
                            id="edit-personal-information"
                            data-testid="edit-personal-information"
                        >
                            <Edit className="size-[16px]" />
                        </button> */}
                    </div>

                    <div className="mt-[24px]">
                        <div className="flex flex-col gap-[16px] mt-[24px]">
                            <div className="flex">
                                <div className="w-[60%] flex flex-col gap-[4px]">
                                    <p className="text-[12px]/[18px] text-[#8f8f8f]">Job Role</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">Senior Data Analyst</p>
                                </div>
                                <div className="w-[40%]">
                                    <p className="text-[12px]/[18px] font-medium text-[#8f8f8f]">Department</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">Data</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
                            <div className="flex">
                                <div className="w-[60%] flex flex-col gap-[4px]">
                                    <p className="text-[12px]/[18px] text-[#8f8f8f]">Employment Type</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">Full Time</p>
                                </div>
                                <div className="w-[40%]">
                                    <p className="text-[12px]/[18px] font-medium text-[#8f8f8f]">Date Started</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">Jun 2025 - Present</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
                            <div className="flex flex-col gap-[4px]">
                                <p className="text-[12px]/[18px] text-[#8f8f8f]">Manager</p>
                                <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">John Dauda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="w-full rounded-[12px] bg-white border border-[#e9e9e9] p-[20px] pb-[39px]">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-[6px]">
                            <User className="size-[16px] text-[#8f8f8f]" />
                            <p className="text-[16px]/[20px] font-semibold text-[#353535]">Personal Information</p>
                        </div>
                        <button
                            className="font-medium bg-[#0d978b] text-white rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"
                            id="edit-personal-information"
                            data-testid="edit-personal-information"
                        >
                            <Edit className="size-[16px]" />
                        </button>
                    </div>

                    <div className="mt-[24px]">
                        <div className="flex flex-col gap-[16px] mt-[24px]">
                            <div className="flex">
                                <div className="w-[60%] flex flex-col gap-[4px]">
                                    <p className="text-[12px]/[18px] text-[#8f8f8f]">Full Name</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">Alice Fernadez</p>
                                </div>
                                <div className="w-[40%]">
                                    <p className="text-[12px]/[18px] font-medium text-[#8f8f8f]">Gender </p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">Male</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
                            <div className="flex">
                                <div className="w-[60%] flex flex-col gap-[4px]">
                                    <p className="text-[12px]/[18px] text-[#8f8f8f]">Date of Birth</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">12/06/1990</p>
                                </div>
                                <div className="w-[40%]">
                                    <p className="text-[12px]/[18px] font-medium text-[#8f8f8f]">Age</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">23</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
                            <div className="flex">
                                <div className="w-[60%] flex flex-col gap-[4px]">
                                    <p className="text-[12px]/[18px] text-[#8f8f8f]">Marital Status</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">Divorced</p>
                                </div>
                                <div className="w-[40%]">
                                    <p className="text-[12px]/[18px] font-medium text-[#8f8f8f]">National ID</p>
                                    <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">1234567890</p>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-[#e9e9e9]"></div>
                            <div className="w-full  flex flex-col gap-[4px]">
                                <p className="text-[12px]/[18px] text-[#8f8f8f]">Nationality</p>
                                <p className="text-[12px]/[22px] font-medium text-[#1c1c1c]">USA</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}