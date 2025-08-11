'use client'
export default function JobSummary() {
    const qadata = [{
        que: "Why are you interested in this role?",
        ans: "Short Answer"
    },
    {
        que: "Describe a recent challenge you solved at work.",
        ans: "Long Paragraph"
    },
    {
        que: "What’s your expected salary range for this role?",
        ans: "Long Paragraph"
    },
    {
        que: "How soon can you start if hired?",
        ans: "Multiple choice: Immediately, 1–2 weeks, 1 month, Other"
    },
    {
        que: "Have you worked in a team setting before?",
        ans: "Multiple choice: Yes/No "
    },
    ]
    return (
        <div className="mt-[29px] w-full">
            <p className="text-[16px]/[24px] font-medium text-[#4b4b4b]">Job Details</p>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-[30px] sm:w-[536px] pr-[80px]">
                <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Job Title</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">Senior Data Analyst</p>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Department</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">Sales</p>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Employment Type</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">Full- Time</p>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">No. of Openings</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">3</p>
                </div>
                <div className="flex flex-col gap-[2px] text-warp">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Skills</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">Data Analysis, UI/UX Prototyping, Wireframing</p>
                </div>
                <div className="flex flex-col gap-[2px] text-warp">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Location Type</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">Onsite (California, United States)</p>
                </div>
                <div className="flex flex-col gap-[2px] text-warp">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Salary</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">$173,000 — $187,400</p>
                </div>
                <div className="flex flex-col gap-[2px] text-warp">
                    <p className="text-[14px]/[20px] font-medium text-[#a5a5a5]">Deadline</p>
                    <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">10 June 2025</p>
                </div>
            </div>
            <div className="mt-[32px] md:w-[600px] w-full">
                <p className="text-[16px]/[24px] font-medium text-[#4b4b4b]">Job Description</p>
                <p className="text-[14px]/[22px] font-medium text-[#a5a5a5] mt-[6px]">Data Analysis, UI/UX Prototyping, Wireframing</p>
                <p className="text-[14px]/[22px] font-medium text-[#4b4b4b] mt-[2px]">Senior Data Analyst Position Overview<br />
                    We are seeking an experienced Senior Data Analyst to join our growing analytics team. The ideal candidate will transform complex data into actionable insights that drive business decisions.
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
            <div className="md:w-[364px] w-full  mt-[32px] ">
                <p className="text-[16px]/[24px] font-medium text-[#4b4b4b]">Applicant Questions</p>
                <div className="mt-[6px] flex flex-col gap-[14px] w-full">
                    {qadata.map((item, index) => (
                        <div key={index}>
                            <p className="text-[14px]/[22px] font-medium text-[#4b4b4b]">{item.que}</p>
                            <p className="text-[14px]/[22px] font-medium text-[#a5a5a5] break-words">{item.ans}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}