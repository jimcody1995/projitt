'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import OffboardingTable from "./components/offboarding-table";

export default function Onboarding() {
    return <div>
        <div className="w-full justify-between flex">
            <p className="text-[24px]/[30px] font-semibold text-[#1C1C1C]" data-testid="page-title" id="page-title">Offboarding</p>
        </div>
        <div className="mt-[27px]">
            <OffboardingTable /></div>
    </div>;
}