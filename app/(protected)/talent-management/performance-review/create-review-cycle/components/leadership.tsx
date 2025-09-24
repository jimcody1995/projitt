'use client';
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash } from "lucide-react";
import { useState } from "react";

interface Criteria {
    id: string;
    name: string;
}

export default function Leadership() {
    const [criterias, setCriterias] = useState<Criteria[]>([
        { id: '1', name: '' }
    ]);
    return (
        <div className="p-[20px] flex flex-col gap-[15px]">
            <button className="w-full border-[#053834] p-[14px] flex justify-center gap-[10px] border border-[#053834] rounded-[12px] cursor-pointer">
                <PlusCircle className="w-[20px] h-[20px] text-[#053834]" />
                <p className="text-[15px]/[20px] text-[#053834]">Add New Criteria</p>
            </button>
            {criterias.map((criteria) => (
                <div key={criteria.id} className="w-full bg-[#f5f5f5] border-[#e9e9e9] p-[12px] gap-[18px] flex justify-between items-center rounded-[12px]">
                    <Input
                        value={criteria.name}
                        onChange={(e) => setCriterias(criterias.map((c) => c.id === criteria.id ? { ...c, name: e.target.value } : c))}
                        className="w-full border-none"
                    />
                    <button className="w-[20px] h-[20px] text-[#787878]">
                        <Trash className="w-[12px] h-[12px]" />
                    </button>
                </div>
            ))}
        </div>

    )
}