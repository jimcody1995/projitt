'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, X } from "lucide-react";
import OnboardingTable from "./components/onboarding-table";
import BackgroundCheck from "../manage-employees/components/background-check";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Onboarding() {
    const router = useRouter();
    const [backgroundCheckOpen, setBackgroundCheckOpen] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    return <div>
        <div className="w-full justify-between flex lg:flex-row flex-col gap-[10px]">
            <p className="text-[24px]/[30px] font-semibold text-[#1C1C1C]" data-testid="page-title" id="page-title">Onboarding</p>
            <div className="gap-[10px] flex items-center sm:flex-row flex-col">
                <div className="relative">
                    <Search
                        className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                        data-testid="search-icon"
                        id="search-icon"
                    />
                    <Input
                        placeholder="Search by name, ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-9 w-[243px] h-[42px]"
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
                    className="h-[42px] text-[14px]/[22px] font-medium text-[#053834] border-[#053834] flex items-center gap-2"
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