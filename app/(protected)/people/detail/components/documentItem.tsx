import { Button } from "@/components/ui/button";
import { Download, Maximize2 } from "lucide-react";
import PdfViewer from "@/components/ui/pdf-viewer";

export default function DocumentItem({
    filename,
    url,
}: {
    filename: string;
    url: string;
}) {
    return (
        <div className="w-[254px] rounded-[16px] overflow-hidden border border-[#E9E9E9]">
            <div id="pdf-view" className="h-[180px] w-full overflow-hidden bg-[#f0f0f0]">
                <PdfViewer url={url} />
            </div>
            <div className="w-full bg-white p-[16px] flex items-center justify-between">
                <p className="text-[14px]/[22px] text-[#1c1c1c] font-medium">{filename}</p>
                <div className="flex gap-[8.4px]">
                    <Button className="w-[28px] h-[28px]">
                        <Download className="size-[14px] text-white" />
                    </Button>
                    <Button className="w-[28px] h-[28px]">
                        <Maximize2 className="size-[14px] text-white" />
                    </Button>
                </div>
            </div>
        </div>
    )
}