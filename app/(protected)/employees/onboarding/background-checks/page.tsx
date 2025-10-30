'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Settings } from "lucide-react";
import OnboardingTable from "../components/onboarding-table";
import BackgroundCheck from "../../manage-employees/components/background-check";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackgroundCheckTable from "../components/backgroundCheckTable";
export default function Onboarding() {
    const router = useRouter();
    const [backgroundCheckOpen, setBackgroundCheckOpen] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    return <div className="py-[15px] px-[10px]">
        <div className="w-full flex flex-col gap-4 xl:flex-row lg:justify-between  xl:items-center">
            <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] rounded-full border border-[#E9E9E9] flex justify-center items-center cursor-pointer" onClick={() => router.push('/employees/onboarding')}>
                    <ArrowLeft className="size-[12px] text-[#4B4B4B]" />
                </div>
                <p className="text-xl font-semibold text-[#1C1C1C] lg:text-[24px]/[30px]" data-testid="page-title" id="page-title">
                    Background Checks</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 w-full lg:w-auto">
                <div className="relative w-full sm:w-[200px]">
                    <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                    <Input
                        placeholder="Search by name, ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-9 h-[42px] w-full"
                        data-testid="search-input"
                    />
                </div>
                <Button
                    variant="outline"
                    className="h-[42px] w-full sm:w-auto text-[14px]/[22px] font-medium text-[#053834] text-white bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 px-[25px] rounded-[8px]"
                    onClick={() => setBackgroundCheckOpen(true)}
                >
                    Start Background Check
                </Button>
            </div>
        </div>
        <div className="mt-[27px]">
            <BackgroundCheckTable searchQuery={searchQuery} /></div>
        <BackgroundCheck open={backgroundCheckOpen} onOpenChange={setBackgroundCheckOpen} setMessage={setMessage} />
    </div>;
}