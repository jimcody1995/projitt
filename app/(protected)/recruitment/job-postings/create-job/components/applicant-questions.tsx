/**
 * ApplicantQuestions.tsx
 *
 * This component allows the creation and editing of applicant question sections and questions.
 * Each section can contain multiple questions of various types (e.g., short answer, paragraph, multiple-choice, etc.).
 * Users can dynamically add/remove/edit questions and their options. Suitable for form builders.
 */

import React, { JSX, useState, useEffect } from 'react';
import {
    GripVertical,
    Plus,
    Copy,
    Trash2,
    X,
    FileText,
    BriefcaseBusiness,
    CircleQuestionMark,
    BookOpenText,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import WorkExperience from './work-experience';
import Resume from './resume';
import Education from './education';
import { getJobDetails } from '@/api/job-posting';
import { errorHandlers } from '@/utils/error-handler';
import { fa } from 'zod/v4/locales';
export interface Question {
    id: string;
    title: string;
    type: 'short-answer' | 'paragraph' | 'dropdown' | 'checkbox' | 'file-upload';
    required: boolean;
    options?: string[];
}

interface Section {
    id: string;
    title: string;
    questions: Question[];
}

interface ApplicantQuestionsProps {
    jobId?: string;
}

/**
 * Main functional component that manages question sections and renders dynamic UI
 */
export default function ApplicantQuestions({ jobId }: ApplicantQuestionsProps): JSX.Element {
    const [activeSection, setActiveSection] = useState<string | null>('1');
    const [sections, setSections] = useState<Section[]>([
        {
            id: '1',
            title: 'Applicant Questions',
            questions: [],
        },
    ]);

    const questionTypes = [
        { value: 'short-answer', label: 'Short answer' },
        { value: 'paragraph', label: 'Paragraph' },
        { value: 'dropdown', label: 'Multiple choice' },
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'file-upload', label: 'File Upload' },
    ];

    // Map API answer_type to component type
    const mapAnswerTypeToComponentType = (answerType: string): Question['type'] => {
        switch (answerType) {
            case 'short':
                return 'short-answer';
            case 'long_detail':
                return 'paragraph';
            case 'dropdown':
                return 'dropdown';
            case 'checkbox':
                return 'checkbox';
            case 'file_upload':
                return 'file-upload';
            default:
                return 'short-answer';
        }
    };

    // Load existing questions when jobId is provided
    useEffect(() => {
        const loadExistingQuestions = async () => {
            if (!jobId) return;

            try {
                const response = await getJobDetails(jobId);
                if (response.status === true && response.data.questions) {
                    const apiQuestions = response.data.questions;

                    // Transform API questions to component format
                    const transformedQuestions: Question[] = apiQuestions.map((apiQuestion: {
                        id: number;
                        question_name: string;
                        answer_type: string;
                        is_required: boolean;
                        options?: string[] | null;
                    }) => ({
                        id: apiQuestion.id.toString(),
                        title: apiQuestion.question_name,
                        type: mapAnswerTypeToComponentType(apiQuestion.answer_type),
                        required: apiQuestion.is_required,
                        options: apiQuestion.options || undefined,
                    }));

                    // Update sections with loaded questions
                    setSections([
                        {
                            id: '1',
                            title: 'Applicant Questions',
                            questions: transformedQuestions,
                        },
                    ]);
                }
            } catch (error) {
                errorHandlers.custom(error, 'Error loading existing questions');
            }
        };

        loadExistingQuestions();
    }, [jobId]);

    /** Adds a new question section */
    const addSection = (): void => {
        const newSection: Section = {
            id: Date.now().toString(),
            title: `Applicant Question ${sections.length + 1}`,
            questions: [],
        };
        setSections([...sections, newSection]);
    };

    /** Adds a new default question to a section */
    const addQuestion = (sectionId: string): void => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            title: 'Question',
            type: 'short-answer',
            required: false,
        };
        setSections(sections.map(section =>
            section.id === sectionId
                ? { ...section, questions: [...section.questions, newQuestion] }
                : section
        ));
    };

    /** Updates a question�s properties */
    const updateQuestion = (
        sectionId: string,
        questionId: string,
        updates: Partial<Question>
    ): void => {
        setSections(sections.map(section =>
            section.id === sectionId
                ? {
                    ...section,
                    questions: section.questions.map(question =>
                        question.id === questionId ? { ...question, ...updates } : question
                    ),
                }
                : section
        ));
    };

    /** Duplicates a question */
    const duplicateQuestion = (sectionId: string, questionId: string): void => {
        const section = sections.find(s => s.id === sectionId);
        const question = section?.questions.find(q => q.id === questionId);
        if (question) {
            const duplicated: Question = {
                ...question,
                id: Date.now().toString(),
            };
            setSections(sections.map(s =>
                s.id === sectionId
                    ? { ...s, questions: [...s.questions, duplicated] }
                    : s
            ));
        }
    };

    /** Deletes a question from a section */
    const deleteQuestion = (sectionId: string, questionId: string): void => {
        setSections(sections.map(section =>
            section.id === sectionId
                ? {
                    ...section,
                    questions: section.questions.filter(q => q.id !== questionId),
                }
                : section
        ));
    };

    /** Adds a new option to a multiple-choice or checkbox question */
    const addOption = (sectionId: string, questionId: string): void => {
        const section = sections.find(s => s.id === sectionId);
        const question = section?.questions.find(q => q.id === questionId);
        if (question) {
            const newOption = `Option ${(question.options?.length || 0) + 1}`;
            const updatedOptions = [...(question.options || []), newOption];
            updateQuestion(sectionId, questionId, { options: updatedOptions });
        }
    };

    /** Updates an existing option value */
    const updateOption = (
        sectionId: string,
        questionId: string,
        optionIndex: number,
        value: string
    ): void => {
        const section = sections.find(s => s.id === sectionId);
        const question = section?.questions.find(q => q.id === questionId);
        if (question?.options) {
            const updatedOptions = [...question.options];
            updatedOptions[optionIndex] = value;
            updateQuestion(sectionId, questionId, { options: updatedOptions });
        }
    };

    /** Removes an option from a multiple-choice or checkbox question */
    const removeOption = (
        sectionId: string,
        questionId: string,
        optionIndex: number
    ): void => {
        const section = sections.find(s => s.id === sectionId);
        const question = section?.questions.find(q => q.id === questionId);
        if (question?.options) {
            const updatedOptions = question.options.filter((_, i) => i !== optionIndex);
            updateQuestion(sectionId, questionId, { options: updatedOptions });
        }
    };


    return (
        <div
            id="applicant-question-builder"
            data-testid="applicant-question-builder-root">
            <div className="flex items-center justify-between gap-[8px] w-full">
                <p className="text-[20px]/[30px] font-semibold text-[#353535]">Applicant Questions</p>
                {/* <div className="flex items-center gap-[9px] cursor-pointer">
                    <input type="checkbox" className="accent-[#0d978b] size-[13px]" />
                    <span className="text-[14px]/[16px] text-[#4b4b4b]">Set as Default</span>
                </div> */}
            </div>
            <div className='mt-[33px] '>
                <div className="min-h-screen w-full bg-white border border-[#e9e9e9] rounded-[12px] ">
                    <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px]  w-full overflow-x-auto'>
                        <div className={`py-[8.5px] px-[6px] text-[14px] font-medium flex items-center gap-[8px] cursor-pointer ${activeSection === 'resume' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('resume')}>
                            <FileText className='size-[20px] ' />
                            {activeSection === 'resume' && <p className='whitespace-nowrap'>Resume</p>}
                        </div>
                        <div className={`py-[8.5px] px-[6px] text-[14px] font-medium flex items-center gap-[8px] cursor-pointer ${activeSection === 'work' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('work')}>
                            <BriefcaseBusiness className='size-[20px] ' />
                            {activeSection === 'work' && <p className='whitespace-nowrap'>Work Experience</p>}
                        </div>
                        <div className={`py-[8.5px] px-[6px] text-[14px] font-medium flex items-center gap-[8px] cursor-pointer ${activeSection === 'education' ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} onClick={() => setActiveSection('education')}>
                            <BookOpenText className='size-[20px] ' />
                            {activeSection === 'education' && <p className='whitespace-nowrap'>Education</p>}
                        </div>
                        {sections.map((section) => (
                            <div className={`py-[8.5px] px-[6px]  text-[14px] font-medium flex items-center gap-[8px] cursor-pointer ${activeSection === section.id ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`} key={section.id} onClick={() => setActiveSection(section.id)}>
                                <CircleQuestionMark className='size-[20px] ' />
                                <p className='whitespace-nowrap'>{section.title}</p>
                            </div>
                        ))}

                        {/* Tempary Remove the Add Section Button */}
                        {/* <div className='py-[8.5px] px-[6px] text-[#353535] text-[14px] font-medium flex items-center gap-[8px] cursor-pointer' onClick={addSection}>
                            <Plus className='size-[20px] text-[#353535]' />
                            <p className='whitespace-nowrap'>Add Section</p>
                        </div> */}

                    </div>
                    <div className="max-w-4xl mx-auto py-[31px] px-[25px]">
                        {activeSection === 'resume' && (
                            <div>
                                <Resume />
                            </div>
                        )}
                        {activeSection === 'work' && (
                            <div>
                                <WorkExperience />
                            </div>
                        )}
                        {activeSection === 'education' && (
                            <div>
                                <Education />
                            </div>
                        )}
                        {(activeSection !== 'resume' && activeSection !== 'work' && activeSection !== 'education') && sections.filter((section) => section.id === activeSection).map((section) => (
                            <div key={section.id} className="mb-8">
                                <div className="space-y-4">
                                    {section.questions.map((question) => (
                                        <div key={question.id} className="bg-[#F5F5F5] rounded-lg shadow-sm border border-[#e9e9e9] group hover:shadow-md transition-shadow">
                                            <div className="">
                                                <div className="flex items-start gap-4 py-[20px] px-[16px]">
                                                    <button className="mt-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                                                        <GripVertical className="w-5 h-5" />
                                                    </button>
                                                    <div className='flex w-full items-start gap-4 sm:flex-row flex-col'>
                                                        <div className="lg:flex-1 w-full">
                                                            <Input
                                                                type="text"
                                                                value={question.title}
                                                                onChange={(e) => updateQuestion(section.id, question.id, { title: e.target.value })}
                                                                className="h-[48px]"
                                                                placeholder="Question"
                                                            />
                                                        </div>
                                                        <Select
                                                            value={question.type}
                                                            onValueChange={(e) => updateQuestion(section.id, question.id, {
                                                                type: e as Question['type'],
                                                                options: ['dropdown', 'checkbox'].includes(e) ? ['Option 1'] : undefined
                                                            })}
                                                        >
                                                            <SelectTrigger className="h-[48px] lg:w-[200px] w-full">
                                                                <SelectValue placeholder="Select a type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {questionTypes.map((type) => (
                                                                    <SelectItem key={type.value} value={type.value}>
                                                                        {type.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className='bg-white px-[20px] py-[16px]'>
                                                    {/* Question Options for Dropdown/Checkbox */}
                                                    {(question.type === 'dropdown' || question.type === 'checkbox') && (
                                                        <div className="sm:ml-9 ml-0 space-y-3 mb-4">
                                                            {question.options?.map((option, index) => (
                                                                <div key={index} className="flex w-full items-center justify-between gap-3">
                                                                    {question.type === 'dropdown' ? (
                                                                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                                                                    ) : (
                                                                        <div className="w-4 h-4 border-2 border-gray-300 rounded flex-shrink-0"></div>
                                                                    )}
                                                                    <input
                                                                        type="text"
                                                                        value={option}
                                                                        onChange={(e) => updateOption(section.id, question.id, index, e.target.value)}
                                                                        className="w-full bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-teal-500"
                                                                    />
                                                                    {question.options && question.options.length > 1 && (
                                                                        <button
                                                                            onClick={() => removeOption(section.id, question.id, index)}
                                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                                        >
                                                                            <X className="w-4 h-4" />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            <button
                                                                onClick={() => addOption(section.id, question.id)}
                                                                className=" text-[#0D978B] hover:text-[#0D978B]/80 text-[12px]/[20px]  flex items-center gap-[6px] cursor-pointer"
                                                            >
                                                                <Plus className="w-4 h-4 border rounded-full" />
                                                                Add options
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Question Footer */}
                                                    <div className="flex items-center justify-between border-t border-[#d9d9d9] pt-[14px]">
                                                        <div className="flex items-center gap-3">
                                                            <label className="flex items-center gap-2 text-[12px]/[16px] text-[#4b4b4b]">
                                                                <Switch
                                                                    checked={question.required}
                                                                    onCheckedChange={(checked) => updateQuestion(section.id, question.id, { required: checked })}
                                                                    shape="square"
                                                                />
                                                                Required
                                                            </label>
                                                        </div>

                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => duplicateQuestion(section.id, question.id)}
                                                                className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                            >
                                                                <Copy className="w-4 h-4" />
                                                                Duplicate
                                                            </button>
                                                            <button
                                                                onClick={() => deleteQuestion(section.id, question.id)}
                                                                className="flex items-center gap-1 px-3 py-1 text-[#c30606] hover:bg-[#c30606]/10 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    }

                                    {/* Add New Question Button */}
                                    <button
                                        onClick={() => addQuestion(section.id)}
                                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Create New Question
                                    </button>
                                </div >
                            </div >
                        ))}
                    </div >
                </div >
            </div >
        </div >
    );
}