'use client'
import parse from "html-react-parser";
import moment from "moment";

export default function JobSummary({ selected }: { selected: any }) {
    console.log(selected);

    return (
        <div className="mt-[29px] w-full">
            <p className="text-[16px]/[24px] font-medium text-[#4b4b4b]">Job Details</p>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-[30px] sm:w-[536px] pr-[80px]">
                <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Job Title</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{selected?.title}</p>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Department</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{selected?.department?.name}</p>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Employment Type</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{selected?.employment_type?.name}</p>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">No. of Openings</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{selected?.no_of_job_opening}</p>
                </div>
                <div className="flex flex-col gap-[2px] text-warp">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Skills</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{selected?.skills?.map((item: any) => item.name).join(', ')}</p>
                </div>
                <div className="flex flex-col gap-[2px] text-warp">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Location Type</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{selected?.location_type?.name}</p>
                </div>
                <div className="flex flex-col gap-[2px] text-warp">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Salary</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{"$" + selected?.salary_from + " - $" + selected?.salary_to}</p>
                </div>
                <div className="flex flex-col gap-[2px] text-warp">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Deadline</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{moment(selected?.deadline).format('DD MMM YYYY')}</p>
                </div>
            </div>
            <div className="mt-[32px] md:w-[600px] w-full">
                <p className="text-[16px]/[24px] font-medium text-[#4b4b4b]">Job Description</p>
                <p className="text-[14px]/[22px] font-medium text-[#a5a5a5] mt-[6px]">{selected?.skills?.map((item: any) => item.name).join(', ')}</p>

                <div className="text-[14px]/[22px] font-medium text-[#4b4b4b] mt-[2px]">
                    {selected?.description && typeof selected.description === 'string' ? parse(selected.description) : selected?.description || ''}
                </div>
            </div>
            <div className="md:w-[364px] w-full  mt-[32px] ">
                <p className="text-[16px]/[24px] font-medium text-[#4b4b4b]">Applicant Questions</p>
                <div className="mt-[6px] flex flex-col gap-[14px] w-full">
                    {selected?.questions.map((item: any, index: number) => (
                        <div key={index}>
                            <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{item.question_name}</p>
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5] break-words">
                                {item.answer_type === "short" && "Short Answer"}
                                {item.answer_type === "long" && "Long Paragraph"}
                                {item.answer_type === "checkbox" && "Multiple choice : " + item.options?.map((option: any) => option).join(', ')}
                                {item.answer_type === "radio" && "Single choice : " + item.options?.map((option: any) => option).join(', ')}
                                {item.answer_type === "file" && "File"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}