import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX } from "react";

/**
 * NoData component displays a message and action when there are no jobs posted yet.
 * It shows an image, title, description, and a button to create a new job.
 * 
 * @returns JSX.Element - The UI for no data state in job listings.
 */
export const NoData = (): JSX.Element => {
    const router = useRouter();
    return (
        <div
            className="w-full mt-[170px] flex flex-col justify-center items-center"
            id="no-data-container"
            data-testid="no-data-container"
        >
            <img
                src="/images/common/table-nodata.png"
                alt="No jobs illustration"
                className="w-[80px] h-[80px]"
                id="no-data-image"
                data-testid="no-data-image"
            />
            <p
                className="text-[24px]/[30px] font-semibold text-[#1C1C1C] mt-[14px]"
                id="no-data-title"
                data-testid="no-data-title"
            >
                No interviews yet
            </p>
            <p
                className="text-[16px]/[26px] text-[#4b4b4b] mt-[8px]"
                id="no-data-description"
                data-testid="no-data-description"
            >
                Start scheduling interviews to find the perfect candidates for your positions.
            </p>
        </div>
    );
};
