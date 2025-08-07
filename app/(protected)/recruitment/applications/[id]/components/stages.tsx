import { Button } from "@/components/ui/button";
import { Calendar, Camera, ThumbsDown, ThumbsUp, User, Video } from "lucide-react";

export default function Stages() {
    return (
        <div className="flex flex-col gap-[32px]">
            <div className="pt-[28px] pb-[24px] px-[18px] bg-white w-full border border-[#e9e9e9] rounded-[8px]">
                <div className="grid grid-cols-5 gap-[16px] ">
                    <div className="w-full h-[26px] border-b-[2px] border-[#0d978b] text-[12px]/[18px] text-[#4b4b4b]">
                        New
                    </div>
                    <div className="w-full h-[26px] border-b-[2px] border-[#0d978b] text-[12px]/[18px] text-[#4b4b4b]">
                        Screening
                    </div>
                    <div className="w-full h-[26px] border-b-[2px] border-[#bcbcbc] text-[12px]/[18px] text-[#4b4b4b]">
                        Portfolio Review
                    </div>
                    <div className="w-full h-[26px] border-b-[2px] border-[#bcbcbc] text-[12px]/[18px] text-[#4b4b4b]">
                        Cultural Fit
                    </div>
                    <div className="w-full h-[26px] border-b-[2px] border-[#bcbcbc] text-[12px]/[18px] text-[#4b4b4b]">
                        Coding Test
                    </div>
                </div>
                <div className="mt-[18px] flex justify-end">
                    <Button className="text-[12px]/[20px] font-semibold text-white">Move Stage &nbsp;&nbsp;&nbsp;&gt;</Button>
                </div>
            </div>
            <div className="w-full border-b border-[#d2d2d2]"></div>
            <div className="flex flex-col justify-center items-center">
                <div className="p-[20px] bg-white w-full border border-[#e9e9e9] rounded-[8px]">
                    <p className="text-[16px]/[24px] font-medium">Coding Test</p>
                    <p className="text-[14px]/[20px] text-[#0d978b] mt-[16px] underline">Javascript Array Test</p>
                    <p className="text-[12px]/[20px] text-[#4b4b4b] mt-[5px]">https://projitt.com/j/1234567890?pwd=xxxxxxxxxxxx</p>
                    <Button variant="outline" className="h-[32px] mt-[16px]">Send Test Link &nbsp;&nbsp;&gt;</Button>
                </div>
                <div className="w-[6px] h-[6px] rounded-full bg-[#d2d2d2]"></div>
                <div className="w-[1px] h-[30px] bg-[#d2d2d2]"></div>
                <div className="p-[20px] bg-white w-full border border-[#e9e9e9] rounded-[8px]">
                    <div className="flex justify-between">
                        <p className="text-[16px]/[24px] font-medium">Cultural Fit</p>
                        <div className="flex gap-[10px] items-center">
                            <span className="pr-[10px] border-r border-[#e9e9e9] text-[12px]/[18px] underline text-[#0d978b]">Review Answers</span>
                            <div className="flex gap-[10px] items-center">
                                <span className="text-[12px]/[18px]">Total Score : </span>
                                <span className="w-[40px] h-[24px] flex items-center justify-center rounded-[4px] bg-[#0d978b] text-white text-[14px]/[22px]">82%</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-[12px]/[18px] text-[#8f8f8f] mt-[3px]">Taken 5:00pm, Aug 23, 2025</p>
                    <div className="mt-[24px] flex gap-[19px]">
                        <div className="w-full">
                            <p className="text-[13px]/[20px] text-[#0d978b]">Strenghts</p>
                            <div className="flex flex-col gap-[4px] mt-[4px]">
                                <div className="flex gap-[8px]">
                                    <ThumbsUp className="size-[20px] text-[#0d978b]" />
                                    <span className="text-[13px]/[20px] text-[#4b4b4b]">High cognitive flexibility </span>
                                </div>
                                <div className="flex gap-[8px]">
                                    <ThumbsUp className="size-[20px] text-[#0d978b]" />
                                    <span className="text-[13px]/[20px] text-[#4b4b4b]">Strong conscientiousness </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-[13px]/[20px] text-[#c30606]">Opportunities</p>
                            <div className="flex flex-col gap-[4px] mt-[4px]">
                                <div className="flex gap-[8px]">
                                    <ThumbsDown className="size-[20px] text-[#c30606]" />
                                    <span className="text-[13px]/[20px] text-[#4b4b4b]">Moderate emotional reactivity </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" className="h-[32px] mt-[16px]">Move to Next Stage &nbsp;&nbsp;&gt;</Button>
                </div>
                <div className="w-[6px] h-[6px] rounded-full bg-[#d2d2d2]"></div>
                <div className="w-[1px] h-[30px] bg-[#d2d2d2]"></div>
                <div className="p-[20px] bg-white w-full border border-[#e9e9e9] rounded-[8px]">
                    <div className="flex justify-between">
                        <p className="text-[16px]/[24px] font-medium">Portfolio Review</p>
                        <p className="text-[12px]/[20px] text-[#053834]">Completed</p>
                    </div>
                    <div className="w-full border border-[#e9e9e9] rounded-[12px] p-[20px] flex flex-col gap-[12px] mt-[18px]">
                        <div className="flex gap-[6px]">
                            <Video className="size-[16px] text-[#4b4b4b]" />
                            <p className="text-[12px]/[20px] text-[#4b4b4b]">https://example.zoom.us/j/1234567890?pwd=xxxxxxxxxxxx</p>
                        </div>
                        <div className="border-b border-[#e9e9e9]"></div>
                        <div className="flex gap-[6px]">
                            <Calendar className="size-[16px] text-[#4b4b4b]" />
                            <p className="text-[12px]/[20px] text-[#4b4b4b]">20 Nov, 4:00pm</p>
                        </div>
                        <div className="border-b border-[#e9e9e9]"></div>
                        <div className="flex gap-[6px]">
                            <User className="size-[16px] text-[#4b4b4b]" />
                            <div className="flex gap-[7px]">
                                <span className="py-[3.75px] px-[6.25px] rounded-[5px] bg-[#ebebeb] text-[12px]/[12.5px] text-[#4b4b4b]">Abubakar Ali</span>
                                <span className="py-[3.75px] px-[6.25px] rounded-[5px] bg-[#ebebeb] text-[12px]/[12.5px] text-[#4b4b4b]">Steve Larry</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}