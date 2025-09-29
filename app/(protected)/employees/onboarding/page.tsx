'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import OnboardingTable from "./components/onboarding-table";
import BackgroundCheck from "../manage-employees/components/background-check";
import { useState } from "react";
export default function Onboarding() {
    const [backgroundCheckOpen, setBackgroundCheckOpen] = useState(false);
    const [message, setMessage] = useState<string>('');
    return <div>
        <div className="w-full justify-between flex lg:flex-row flex-col gap-[10px]">
            <p className="text-[24px]/[30px] font-semibold text-[#1C1C1C]" data-testid="page-title" id="page-title">Onboarding</p>
            <div className="gap-[10px] flex items-center sm:flex-row flex-col">
                <div className="relative">
                    <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                    <Input
                        placeholder="Search by name, ID"
                        className="ps-9 md:w-[243px] w-full h-[42px]"
                        data-testid="search-input"
                    />
                </div>
                <Button
                    variant="outline"
                    className="h-[42px] text-[14px]/[22px] font-medium text-[#053834] border-[#053834] flex items-center gap-2"
                    onClick={() => setBackgroundCheckOpen(true)}
                >
                    <Settings className="size-4" />
                    Background Checks
                </Button>
            </div>
        </div>
        <div className="mt-[27px]">
            <OnboardingTable /></div>
        <BackgroundCheck open={backgroundCheckOpen} onOpenChange={setBackgroundCheckOpen} setMessage={setMessage} />
    </div>;
}