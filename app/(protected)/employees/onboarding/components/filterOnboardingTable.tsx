import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, X, MapPin, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";
import { Input } from "@/components/ui/input";

/**
 * FilterTool component
 *
 * This component renders a filter UI with popover dropdowns for Country, and Name filters. Each filter shows the number of
 * selected options or "All" if none selected. User selections are managed
 * with internal state arrays for each category.
 *
 * Returns:
 *  JSX.Element - The rendered filter tool component.
 */
export const FilterTool = ({
    selectedCountries,
    setSelectedCountries,
    nameFilter,
    setNameFilter
}: {
    selectedCountries?: number[],
    setSelectedCountries?: (value: number[]) => void,
    nameFilter?: string,
    setNameFilter?: (value: string) => void
}): JSX.Element => {
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [searchCountryQuery, setSearchCountryQuery] = useState('');


    const handleCountryChange = (checked: boolean, value: number): void => {
        if (setSelectedCountries && selectedCountries) {
            setSelectedCountries(checked ? [...selectedCountries, value] : selectedCountries.filter((v) => v !== value));
        }
    };

    const clearAllFilters = (): void => {
        setSelectedCountries?.([]);
        setNameFilter?.('');
    };



    const filteredCountries = [{
        id: 1,
        name: 'United States'
    }, {
        id: 2,
        name: 'Canada'
    }, {
        id: 3,
        name: 'United Kingdom'
    }];

    return (
        <div className="flex flex-wrap gap-[11px] mt-[5px] items-center">
            {/* Name Filter Input */}
            {nameFilter !== undefined && setNameFilter && (
                <div className="flex items-center gap-2">
                    <User className="size-[18px] text-[#4b4b4b]" />
                    <Input
                        placeholder="Filter by name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="w-48"
                    />
                </div>
            )}


            {/* Country Filter */}
            {selectedCountries !== undefined && setSelectedCountries && (
                <Popover open={isCountryOpen} onOpenChange={setIsCountryOpen}>
                    <PopoverTrigger asChild>
                        <div
                            className="cursor-pointer flex gap-[8px] py-[6px] px-[14px] border border-[#d2d2d2] rounded-[8px] transition-all duration-200 hover:border-[#4b4b4b]"
                        >
                            <MapPin className="size-[18px] text-[#4b4b4b]" />
                            <span className="text-[14px]/[20px] text-[#787878]">
                                {selectedCountries.length > 0
                                    ? "Country: " + selectedCountries.length + " selected"
                                    : "Country"}
                            </span>
                            <ChevronDown
                                className={`size-[18px] text-[#4b4b4b] transition-transform duration-200 ${isCountryOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3" align="start">
                        <div className="space-y-3">
                            <Input
                                placeholder="Search country"
                                value={searchCountryQuery}
                                onChange={(e) => setSearchCountryQuery(e.target.value)}
                            />
                            {filteredCountries.map((country: { id: number; name: string; }, index: number) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <Checkbox
                                        checked={selectedCountries.includes(country.id)}
                                        onCheckedChange={(checked) =>
                                            handleCountryChange(checked === true, country.id)
                                        }
                                    />
                                    <Label className="grow flex items-center justify-between font-normal gap-1.5">
                                        {country.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}

            {/* Clear All Button */}
            <button
                className="flex gap-[6px] cursor-pointer transition-all duration-200 hover:opacity-70"
                onClick={clearAllFilters}
            >
                <X className="size-[20px]" />
                <span className="text-[14px]/[20px] text-[#353535]">Clear All</span>
            </button>
        </div>
    );
};
