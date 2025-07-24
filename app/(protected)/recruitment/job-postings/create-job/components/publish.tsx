import { Edit } from "lucide-react";

export default function Publish() {
    return (
        <div
            id="job-description-component"
            data-testid="job-description-component"
        >
            <h1
                className="text-[20px]/[30px] font-semibold text-[#353535]"
                id="job-description-title"
                data-testid="job-description-title"
            >
                Review & Publish
            </h1>
            <div className="md:w-[650px] w-full flex flex-col gap-[36px] mt-[50px]">
                <div className="border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] p-[20px]">
                    <div className="flex justify-between">
                        <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Job Details</p>
                        <button className=" font-medium bg-[#0d978b] text-white rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"><Edit className="size-[16px]" /></button>
                    </div>
                    <div className="grid grid-cols-3 mt-[12px] gap-[42px]">
                        <div className="flex flex-col">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Job Title</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">Software Engineer</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Department</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">Sales</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Employment Type</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">Full-time</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">No. of Openings</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">3</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Skills</p>
                            <div>
                                <p className="text-[14px]/[22px] font-medium text-[#353535]">Data Analysis, UI/UX </p>
                                <p className="text-[14px]/[22px] font-medium text-[#353535]">Prototyping</p>
                                <p className="text-[14px]/[22px] font-medium text-[#353535]">Wireframing</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Location Type</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">Onsite (California, United States)</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Salary</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">$5000 - $6000</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Deadline</p>
                            <p className="text-[14px]/[22px] font-medium text-[#353535]">10 June 2025</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-[650px] w-full flex flex-col gap-[36px] mt-[50px]">
                <div className="border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] p-[20px]">
                    <div className="flex justify-between">
                        <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Job Description</p>
                        <button className=" font-medium bg-[#0d978b] text-white rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"><Edit className="size-[16px]" /></button>
                    </div>
                    <div className="flex flex-col mt-[16px]">
                        <p className="text-[14px]/[22px] font-medium text-[#a5a5a5]">Job Description</p>
                        <p className="text-[14px]/[22px] font-medium text-[#353535]">Senior Data Analyst Position Overview<br />
                            We are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will transform complex data into actionable insights that drive business decisions.<br />
                            Key Responsibilities:<br />
                            Lead complex data analysis projects and develop comprehensive reporting solutions<br />
                            Build and maintain advanced statistical models and data visualization dashboards<br />
                            Collaborate with stakeholders to identify business needs and translate them into analytical solutions<br />
                            Mentor junior analysts and promote best practices in data analysis<br />
                            Design and implement data quality processes and validation procedures<br />
                            Required Qualifications:<br />
                            Bachelor's degree in Statistics, Mathematics, Computer Science, or related field<br />
                            5+ years of experience in data analysis and visualization<br />
                            Expert proficiency in SQL, Python, or R<br />
                            Strong experience with BI tools (Tableau, Power BI, or similar)<br />
                            Proven track record of delivering data-driven solutions</p>
                    </div>
                </div>
            </div>
            <div className="md:w-[650px] w-full flex flex-col gap-[36px] mt-[50px]">
                <div className="border border-[#e9e9e9] rounded-[12px] bg-[#fafafa] p-[20px]">
                    <div className="flex justify-between">
                        <p className="text-[16px]/[24px] font-medium text-[#1c1c1c]">Applicant Questions</p>
                        <button className=" font-medium bg-[#0d978b] text-white rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"><Edit className="size-[16px]" /></button>
                    </div>
                    <div className="flex flex-col mt-[16px] gap-[14px]">
                        <div className="text-[14px]/[22px] font-medium text-[#353535]">
                            <p>Why are you interested in this role?</p>
                            <p className="text-[#a5a5a5]">Short Answer</p>
                        </div>
                        <div className="text-[14px]/[22px] font-medium text-[#353535]">
                            <p>Describe a recent challenge you solved at work.</p>
                            <p className="text-[#a5a5a5]">Long Paragraph</p>
                        </div>
                        <div className="text-[14px]/[22px] font-medium text-[#353535]">
                            <p>What’s your expected salary range for this role?</p>
                            <p className="text-[#a5a5a5]">Long Paragraph</p>
                        </div>
                        <div className="text-[14px]/[22px] font-medium text-[#353535]">
                            <p>How soon can you start if hired?</p>
                            <p className="text-[#a5a5a5]">Multiple choice: Immediately, 1–2 weeks, 1 month, Other</p>
                        </div>
                        <div className="text-[14px]/[22px] font-medium text-[#353535]">
                            <p>Have you worked in a team setting before?</p>
                            <p className="text-[#a5a5a5]">Multiple choice: Yes/No </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}