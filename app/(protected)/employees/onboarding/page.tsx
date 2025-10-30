'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, Users, X } from "lucide-react";
import OnboardingTable from "./components/onboarding-table";
import BackgroundCheck from "../manage-employees/components/background-check";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Onboarding() {
    const router = useRouter();
    const [backgroundCheckOpen, setBackgroundCheckOpen] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    return <div className="py-[15px] px-[10px]">
        <div className="w-full flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
            <p className="text-xl font-semibold text-[#1C1C1C] lg:text-[24px]/[30px]" data-testid="page-title" id="page-title">Onboarding</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2 sm:items-center w-full lg:w-auto">
                <div className="relative w-full sm:w-[200px]">
                    <Search
                        className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                        data-testid="search-icon"
                        id="search-icon"
                    />
                    <Input
                        placeholder="Search by name, ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-9 h-[42px] w-full"
                        data-testid="search-input"
                        id="search-input"
                    />
                    {searchQuery.length > 0 && (
                        <Button
                            mode="icon"
                            variant="ghost"
                            className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                            onClick={() => setSearchQuery('')}
                            data-testid="clear-search-button"
                            id="clear-search-button"
                        >
                            <X />
                        </Button>
                    )}
                </div>
                <Button
                    variant="outline"
                    className="h-[42px] w-full sm:w-auto text-[14px]/[22px] lg:text-[13px]/[20px] font-medium text-[#053834] border-[#053834] flex items-center justify-center gap-2 lg:gap-1 px-4 lg:px-2"
                    onClick={() => router.push('/employees/onboarding/references')}
                >
                    <Users className="size-4" />
                    References
                </Button>
                <Button
                    variant="outline"
                    className="h-[42px] w-full sm:w-auto text-[14px]/[22px] lg:text-[13px]/[20px] font-medium text-[#053834] border-[#053834] flex items-center justify-center gap-2 lg:gap-1 px-4 lg:px-2"
                    onClick={() => router.push('/employees/onboarding/background-checks')}
                >
                    <Settings className="size-4" />
                    Background Checks
                </Button>
            </div>
        </div>
        <div className="mt-[27px]">
            <OnboardingTable searchQuery={searchQuery} /></div>
    </div>;
}