import { Button } from "@/components/ui/button";

export default function Forms() {
    return <div className="flex flex-col gap-[40px]">
        <div className="w-full rounded-[20px] ">
            <div className="bg-[#EEF3F2] pt-[24px] pl-[24px] pb-[20px]">
                <p className="text-[15px]/[20px] font-medium text-[#787878] uppercase">Personal Information</p>
            </div>
            <div className="bg-white p-[28px] pb-[56px] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-[32px] gap-y-[36px]">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Full Name</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Alice Fernadez</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Email address</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">alicefernadez@yahoo.com</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Phone Number</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">801 9316 4356</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Gender</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Male</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Date of Birth</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">12/03/1990</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Nationality</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">USA</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >City</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">New York</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >National ID</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">1234567890</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Marital Status</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Divorced</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Residential Addresss</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">8502 Preston Rd. Inglewood, Maine 98380</p>
                </div>
            </div>
        </div>
        <div className="w-full rounded-[20px] ">
            <div className="bg-[#EEF3F2] pt-[24px] pl-[24px] pb-[20px]">
                <p className="text-[15px]/[20px] font-medium text-[#787878] uppercase">PAYROLL</p>
            </div>
            <div className="bg-white p-[28px] pb-[56px] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-[32px] gap-y-[36px]">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Payment Method</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Bank Transfer</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Bank Name</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Alice Fernadez</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Bank Country</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">United States</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Account Name</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Alice Fernadez</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Account Number</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">1232249218</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Bank Code / SWIFT</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">235</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Currency</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">United State Dollars (USD)</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Routing Number</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">1232249218</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Marital Status</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Divorced</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Residential Addresss</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">8502 Preston Rd. Inglewood, Maine 98380</p>
                </div>
            </div>
        </div>
        <div className="w-full rounded-[20px] ">
            <div className="bg-[#EEF3F2] pt-[24px] pl-[24px] pb-[20px]">
                <p className="text-[15px]/[20px] font-medium text-[#787878] uppercase">Tax</p>
            </div>
            <div className="bg-white p-[28px] pb-[56px] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-[32px] gap-y-[36px]">
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Taxpayer ID/TIN</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">1232249218</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >National Insurance # / SSN</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Bank Transfer</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Dependents</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">2</p>
                </div>
                <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px]/[22px] text-[#4B4B4B]" >Tax Residency Country</p>
                    <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">United States</p>
                </div>
            </div>
        </div>
        <div className="w-full rounded-[20px] ">
            <div className="bg-[#EEF3F2] pt-[24px] pl-[24px] pb-[20px]">
                <p className="text-[15px]/[20px] font-medium text-[#787878] uppercase">BENEFITS ENROLLED</p>
            </div>
            <div className="bg-white grid md:grid-cols-2 grid-cols-1 gap-x-[149px] gap-y-[28px]  p-[28px] pb-[40px]">
                <div className="flex flex-col gap-[28px] w-full">
                    <div className="flex justify-between items-center">
                        <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">401K</p>
                        <Button className="h-[32px]">Enrolled</Button>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Life Insurance</p>
                        <button className="h-[32px] px-[12px] rounded-[8px] bg-[#D2D2D2] text-[14px]/[22px] text-[#4b4b4b]">Not Enrolled</button>
                    </div>
                </div>
                <div className="flex flex-col gap-[28px] w-full">
                    <div className="flex justify-between items-center">
                        <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">Health Insurance</p>
                        <Button className="h-[32px]">Enrolled</Button>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-[14px]/[22px] text-[#4B4B4B] font-semibold">ROTH IRA</p>
                        <Button className="h-[32px]">Enrolled</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}