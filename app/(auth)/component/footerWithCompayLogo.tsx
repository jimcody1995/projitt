const FooterWithCompanyLogo = () => {
    return (
        <div>
            <div className="w-full flex justify-center md:mb-[-25px] mb-0">
                <img src="/images/poweredBy.png" alt="logo" className="h-[28px]" />
            </div>
            <div className=" w-full pb-[50px] pl-[80px] pr-[80px] flex md:flex-row flex-col items-center justify-between gap-[10px] md:mt-0 mt-[10px]">
                <div className="flex gap-[16px]">
                    <span className="text-[14px]/[22px] underline text-[#a19e9e]">Terms of Service</span>
                    <div className="w-[1px] h-[20px] bg-[#a19e9e]"></div>
                    <span className="text-[14px]/[22px] underline text-[#a19e9e]">Privacy Policy</span>
                </div>

                <span className="text-[14px]/[22px] text-[#a19e9e]">© 2025 Projitt</span>
            </div>
        </div>
    );
};

export default FooterWithCompanyLogo;