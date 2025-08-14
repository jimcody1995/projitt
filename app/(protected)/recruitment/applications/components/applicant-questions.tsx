'use client'

export default function ApplicantQuestions({ questions }: { questions: any }) {
    return (
        <div className="w-full flex flex-col gap-[8px]">
            {questions.map((question: any, index: number) => (
                <div key={index} className="bg-white py-[20px] px-[24px]">
                    <p className="text-[12px]/[20px] text-[#787878]">{question.question_name}</p>
                    <p className="text-[14px]/[20px] text-[#353535]">{question.answer}</p>
                </div>
            ))}
        </div>
    );
}