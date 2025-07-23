import { Label } from "@/components/ui/label";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { File, FileImage, FileText, FileUp } from "lucide-react";

export default function FileDropUpload({
    label,
    setFile,
    file,
}: {
    label: string;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    file: File | null;
}) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div>
            <div className="mt-[19px]">
                <Label className="text-[14px]/[22px] font-medium text-[#353535]">{label}</Label>
                <div
                    {...getRootProps()}
                    className="mt-[6px] sm:w-[464px] h-[150px] w-full border-1 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-teal-400 transition"
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        {file && (
                            <div className="flex flex-col items-center justify-center">
                                {file.type === 'application/pdf' && <FileText className="size-[56px] text-[#0D978B]" />}
                                {file.type === 'application/msword' && <FileText className="size-[56px] text-[#0D978B]" />}
                                {file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && <FileText className="size-[56px] text-[#0D978B]" />}
                                {file.type !== 'application/pdf' && file.type !== 'application/msword' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && <File className="size-[56px] text-[#0D978B]" />}
                                <p className="text-[14px]/[20px]">{file.name}</p>
                            </div>
                        )}
                        {!file && <><FileUp className="size-[56px] text-[#0D978B]" />
                            <p className="text-[14px]/[20px] mt-[10px]">
                                {isDragActive ? (
                                    <span className="text-[#0D978B] font-medium">Drop file here...</span>
                                ) : (
                                    <>
                                        Drop file or{' '}
                                        <span className="text-[#0D978B] font-medium">click to upload</span>
                                    </>
                                )}
                            </p></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}