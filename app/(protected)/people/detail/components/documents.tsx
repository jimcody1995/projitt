import { Search, Upload, X } from "lucide-react";
import DocumentItem from "./documentItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Documents() {
    const [searchQuery, setSearchQuery] = useState('');
    const documents = [
        {
            id: '1',
            url: '/1.pdf',
            filename: 'Offer Letter'
        },
        {
            id: '2',
            url: '/2.pdf',
            filename: 'Offer Letter'
        },
        {
            id: '3',
            url: '/3.pdf',
            filename: 'Offer Letter'
        },

        {
            id: '4',
            url: '/4.pdf',
            filename: 'Offer Letter'
        },

        {
            id: '5',
            url: '/5.pdf',
            filename: 'Offer Letter'
        },

    ];

    return (
        <div>
            <div className="w-full flex justify-between md:flex-row flex-col gap-[10px]">
                <div className="relative md:w-[229px] w-full">
                    <Search
                        className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"
                        data-testid="search-icon"
                    />
                    <Input
                        placeholder="Search Documents"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-9 sm:w-[243px] w-full h-[42px]"
                        data-testid="search-input"
                    />
                    {searchQuery.length > 0 && (
                        <Button
                            mode="icon"
                            variant="ghost"
                            className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                            onClick={() => setSearchQuery('')}
                            data-testid="clear-search-button"
                        >
                            <X />
                        </Button>
                    )}
                </div>
                <Button
                    variant="outline"
                    className="text-[#053834] px-[12px] py-[6px] flex items-center gap-[6px] font-semibold transition-all duration-300"
                >
                    <Upload className="size-[20px]" />
                    Upload Document
                </Button>
            </div>
            <div className="mt-[22px] flex flex-wrap gap-[24px] justify-between">
                {documents.map((document) => (
                    <DocumentItem key={document.id} {...document} />
                ))}
            </div>
        </div>
    )
}