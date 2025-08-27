/**
 * ApplicantQuestions.tsx
 *
 * This component allows the creation and editing of applicant question sections and questions.
 * Each section can contain multiple questions of various types (e.g., short answer, paragraph, multiple-choice, etc.).
 * Users can dynamically add/remove/edit questions and their options. Suitable for form builders.
 */

import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
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
    Search,
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
import { getJobDetails, addQuestionItem, editQuestionItem, editJobQuestions, getAllQuestions } from '@/api/job-posting';
import { errorHandlers } from '@/utils/error-handler';
import { Skeleton } from '@/components/ui/skeleton';
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
    onSave?: (questions: Question[]) => void;
    disabled?: boolean;
}

/**
 * Main functional component that manages question sections and renders dynamic UI
 */
export interface ApplicantQuestionsRef {
    saveQuestions: () => Promise<void>;
}

const ApplicantQuestions = forwardRef<ApplicantQuestionsRef, ApplicantQuestionsProps>(({ jobId, onSave, disabled = false }, ref) => {
    ApplicantQuestions.displayName = 'ApplicantQuestions';
    const [activeSection, setActiveSection] = useState<string | null>('1');
    const [editSectionTitle, setEditSectionTitle] = useState<string>('');
    const [sections, setSections] = useState<Section[]>([
        {
            id: '1',
            title: 'Applicant Questions',
            questions: [],
        },
    ]);
    const [originalQuestions, setOriginalQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showLoadExistingDialog, setShowLoadExistingDialog] = useState<boolean>(false);
    const [existingQuestions, setExistingQuestions] = useState<Array<{
        id: number;
        question_name: string;
        answer_type: string;
        options: string[] | null;
        is_required: boolean;
        tags: string[];
    }>>([]);
    const [loadingExistingQuestions, setLoadingExistingQuestions] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentQuestionContext, setCurrentQuestionContext] = useState<{
        sectionId: string;
        questionId: string;
    } | null>(null);

    // Filter questions based on search query
    const filteredQuestions = existingQuestions.filter(question => {
        if (!searchQuery.trim()) return true;

        const query = searchQuery.toLowerCase();
        return (
            question.question_name.toLowerCase().includes(query) ||
            question.answer_type.toLowerCase().includes(query) ||
            (question.options && question.options.some(option => option.toLowerCase().includes(query))) ||
            question.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });

    /**
     * Handles drag start event for question reordering
     */
    const handleDragStart = (e: React.DragEvent, questionId: string) => {
        e.dataTransfer.setData('text/plain', questionId);
        (e.currentTarget as HTMLElement).style.opacity = '0.5';
    };

    /**
     * Handles drag over event
     */
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    /**
     * Handles drop event to reorder questions
     */
    const handleDrop = (e: React.DragEvent, dropQuestionId: string, sectionId: string) => {
        e.preventDefault();
        const dragQuestionId = e.dataTransfer.getData('text/plain');

        if (dragQuestionId === dropQuestionId) return;

        const section = sections.find(s => s.id === sectionId);
        if (!section) return;

        const newQuestions = [...section.questions];
        const dragIndex = newQuestions.findIndex(q => q.id === dragQuestionId);
        const dropIndex = newQuestions.findIndex(q => q.id === dropQuestionId);

        if (dragIndex === -1 || dropIndex === -1) return;

        const [draggedQuestion] = newQuestions.splice(dragIndex, 1);
        newQuestions.splice(dropIndex, 0, draggedQuestion);

        const updatedSections = sections.map(s =>
            s.id === sectionId ? { ...s, questions: newQuestions } : s
        );

        setSections(updatedSections);

        // Reset opacity
        const draggedElement = document.querySelector(`[data-drag-question="${dragQuestionId}"]`) as HTMLElement;
        if (draggedElement) {
            draggedElement.style.opacity = '1';
        }
    };

    /**
     * Handles drag end event
     */
    const handleDragEnd = (e: React.DragEvent) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
    };

    /**
     * Loads existing questions from API
     */
    const loadExistingQuestionsFromAPI = async () => {
        try {
            setLoadingExistingQuestions(true);
            const response = await getAllQuestions();
            if (response.status === true && response.data) {
                setExistingQuestions(response.data);
            }
        } catch (error) {
            errorHandlers.custom(error, 'Error loading existing questions');
        } finally {
            setLoadingExistingQuestions(false);
        }
    };

    /**
     * Opens the load existing questions dialog
     */
    const openLoadExistingDialog = (questionType: string, sectionId: string, questionId: string) => {
        setSearchQuery(''); // Clear search when opening dialog
        setShowLoadExistingDialog(true);
        loadExistingQuestionsFromAPI();
        // Store the current question context for replacement
        setCurrentQuestionContext({ sectionId, questionId });
    };

    /**
     * Replaces current question with existing question
     */
    const replaceWithExistingQuestion = (existingQuestion: {
        id: number;
        question_name: string;
        answer_type: string;
        options: string[] | null;
        is_required: boolean;
        tags: string[];
    }, sectionId: string, questionId: string) => {
        const mappedType = mapAnswerTypeToComponentType(existingQuestion.answer_type);

        const updatedQuestion: Question = {
            id: questionId, // Keep the same ID to maintain the question in the section
            title: existingQuestion.question_name,
            type: mappedType,
            required: existingQuestion.is_required,
            options: existingQuestion.options || undefined,
        };

        updateQuestion(sectionId, questionId, updatedQuestion);
        setShowLoadExistingDialog(false);
    };

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
                setLoading(true);
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

                    // Store original questions for comparison
                    setOriginalQuestions(transformedQuestions);
                    setLoading(false);
                }
            } catch (error) {
                errorHandlers.custom(error, 'Error loading existing questions');
            } finally {
                setLoading(false);
            }
        };

        loadExistingQuestions();
    }, [jobId]);



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

    /** Saves questions to the API */
    const saveQuestions = async (): Promise<void> => {
        if (!jobId) return;

        try {
            const currentQuestions = sections[0]?.questions || [];
            const newQuestions: Question[] = [];
            const editedQuestions: Question[] = [];
            const questionIds: number[] = [];

            // Separate new and edited questions
            currentQuestions.forEach(question => {
                const originalQuestion = originalQuestions.find(q => q.id === question.id);
                if (originalQuestion) {
                    // Check if question was modified
                    if (
                        originalQuestion.title !== question.title ||
                        originalQuestion.type !== question.type ||
                        originalQuestion.required !== question.required ||
                        JSON.stringify(originalQuestion.options) !== JSON.stringify(question.options)
                    ) {
                        editedQuestions.push(question);
                    }
                    questionIds.push(parseInt(question.id));
                } else {
                    // New question
                    newQuestions.push(question);
                }
            });

            // Add new questions
            for (const question of newQuestions) {
                const payload: {
                    question_name: string;
                    answer_type: string;
                    is_required: boolean;
                    tags: string[];
                    options?: string[] | null;
                } = {
                    question_name: question.title,
                    answer_type: mapComponentTypeToAnswerType(question.type),
                    is_required: question.required,
                    tags: ["HR", "Business_development", "IT", "Accounts"]
                };

                // Only include options for dropdown and checkbox questions
                if (question.type === 'dropdown' || question.type === 'checkbox') {
                    payload.options = question.options || null;
                }

                const response = await addQuestionItem(payload);
                if (response.status === true) {
                    questionIds.push(response.data.id);
                }
            }

            // Edit existing questions
            for (const question of editedQuestions) {
                const payload: {
                    id: number;
                    question_name: string;
                    answer_type: string;
                    is_required: boolean;
                    tags: string[];
                    options?: string[] | null;
                } = {
                    id: parseInt(question.id),
                    question_name: question.title,
                    answer_type: mapComponentTypeToAnswerType(question.type),
                    is_required: question.required,
                    tags: ["HR", "Business_development", "IT", "Accounts"]
                };

                // Only include options for dropdown and checkbox questions
                if (question.type === 'dropdown' || question.type === 'checkbox') {
                    payload.options = question.options || null;
                }

                await editQuestionItem(payload);
                questionIds.push(parseInt(question.id));
            }

            // Update job questions
            if (questionIds.length > 0) {
                await editJobQuestions({
                    id: parseInt(jobId),
                    question_ids: questionIds
                });
            }

            // Update original questions for future comparisons
            const updatedQuestions = currentQuestions.map(q => {
                const newQuestion = newQuestions.find(nq => nq.title === q.title && nq.type === q.type);
                if (newQuestion) {
                    return { ...q, id: newQuestion.id };
                }
                return q;
            });
            setOriginalQuestions(updatedQuestions);

            if (onSave) {
                onSave(currentQuestions);
            }
        } catch (error) {
            errorHandlers.custom(error, 'Error saving questions');
        }
    };

    /** Maps component type to API answer type */
    const mapComponentTypeToAnswerType = (type: Question['type']): string => {
        switch (type) {
            case 'short-answer':
                return 'short';
            case 'paragraph':
                return 'long_detail';
            case 'dropdown':
                return 'dropdown';
            case 'checkbox':
                return 'checkbox';
            case 'file-upload':
                return 'file_upload';
            default:
                return 'short';
        }
    };

    // Expose save function to parent component
    useImperativeHandle(ref, () => ({
        saveQuestions
    }));

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
            <div className='mt-[33px] relative'>
                {loading && (
                    <div className="min-h-screen w-full bg-white border border-[#e9e9e9] rounded-[12px]">
                        <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px] w-full overflow-x-auto'>
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-28" />
                            <Skeleton className="h-10 w-36" />
                        </div>
                        <div className="max-w-4xl mx-auto py-[31px] px-[25px] space-y-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="bg-[#F5F5F5] rounded-lg shadow-sm border border-[#e9e9e9] p-4">
                                    <div className="flex items-start gap-4">
                                        <Skeleton className="h-5 w-5 mt-2" />
                                        <div className="flex-1 space-y-3">
                                            <Skeleton className="h-12 w-full" />
                                            <Skeleton className="h-12 w-48" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {!loading && (
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

                                    {editSectionTitle === section.id ? (
                                        <input
                                            type="text"
                                            value={section.title}
                                            onChange={(e) => {
                                                const updatedSections = sections.map((s) =>
                                                    s.id === section.id ? { ...s, title: e.target.value } : s
                                                );
                                                setSections(updatedSections);
                                            }}
                                            onBlur={() => setEditSectionTitle('')}
                                            className="ml-2 w-[100px]"
                                        />
                                    ) : (
                                        <p className='whitespace-nowrap' onDoubleClick={() => { setEditSectionTitle(section.id) }}>{section.title}</p>
                                    )}
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
                                            <div
                                                key={question.id}
                                                className="bg-[#F5F5F5] rounded-lg shadow-sm border border-[#e9e9e9] group hover:shadow-md transition-shadow cursor-move"
                                                data-drag-question={question.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, question.id)}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDrop(e, question.id, section.id)}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <div className="">
                                                    <div className="flex items-start gap-4 py-[20px] px-[16px]">
                                                        <div className="mt-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                                                            <GripVertical className="w-5 h-5" />
                                                        </div>
                                                        <div className='flex w-full items-start gap-4 sm:flex-row flex-col'>
                                                            <div className="lg:flex-1 w-full">
                                                                <Input
                                                                    type="text"
                                                                    value={question.title}
                                                                    onChange={(e) => updateQuestion(section.id, question.id, { title: e.target.value })}
                                                                    className="h-[48px]"
                                                                    placeholder="Question"
                                                                    disabled={disabled}
                                                                />
                                                            </div>
                                                            <Select
                                                                value={question.type}
                                                                onValueChange={(e) => updateQuestion(section.id, question.id, {
                                                                    type: e as Question['type'],
                                                                    options: ['dropdown', 'checkbox'].includes(e) ? ['Option 1'] : undefined
                                                                })}
                                                                disabled={disabled}
                                                            >
                                                                <SelectTrigger className="h-[48px] lg:w-[200px] w-full" disabled={disabled}>
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
                                                                            disabled={disabled}
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
                                                                    disabled={disabled}
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
                                                                        disabled={disabled}
                                                                    />
                                                                    Required
                                                                </label>
                                                            </div>

                                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    onClick={() => openLoadExistingDialog(question.type, section.id, question.id)}
                                                                    className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                                    disabled={disabled}
                                                                    title="Load existing question"
                                                                >
                                                                    <FileText className="w-4 h-4" />
                                                                    Load Existing
                                                                </button>
                                                                <button
                                                                    onClick={() => duplicateQuestion(section.id, question.id)}
                                                                    className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                                    disabled={disabled}
                                                                >
                                                                    <Copy className="w-4 h-4" />
                                                                    Duplicate
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteQuestion(section.id, question.id)}
                                                                    className="flex items-center gap-1 px-3 py-1 text-[#c30606] hover:bg-[#c30606]/10 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                                    disabled={disabled}
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
                )}
            </div >

            {/* Load Existing Questions Dialog */}
            {showLoadExistingDialog && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Load Existing Questions
                            </h3>
                            <button
                                onClick={() => setShowLoadExistingDialog(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-3">
                                Select an existing question to replace the current one. All available questions are shown.
                            </p>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Search className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d978b] focus:border-transparent"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            {searchQuery && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Found {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} matching &quot;{searchQuery}&quot;
                                </p>
                            )}
                        </div>

                        {loadingExistingQuestions ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0d978b]"></div>
                            </div>
                        ) : (
                            <div className="max-h-96 overflow-y-auto">
                                {filteredQuestions.map((question) => (
                                    <div
                                        key={question.id}
                                        className="p-3 border border-gray-200 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => {
                                            if (currentQuestionContext) {
                                                replaceWithExistingQuestion(question, currentQuestionContext.sectionId, currentQuestionContext.questionId);
                                            }
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{question.question_name}</p>
                                                <p className="text-sm text-gray-500">
                                                    Type: {mapAnswerTypeToComponentType(question.answer_type)} |
                                                    Required: {question.is_required ? 'Yes' : 'No'}
                                                </p>
                                                {question.options && question.options.length > 0 && (
                                                    <p className="text-sm text-gray-500">
                                                        Options: {question.options.join(', ')}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (currentQuestionContext) {
                                                        replaceWithExistingQuestion(question, currentQuestionContext.sectionId, currentQuestionContext.questionId);
                                                    }
                                                }}
                                                className="ml-2 px-3 py-1 bg-[#0d978b] text-white rounded text-sm hover:bg-[#0d978b]/80"
                                            >
                                                Use This
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {filteredQuestions.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        {searchQuery ? `No questions found matching "${searchQuery}"` : 'No existing questions found.'}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div >
    );
});

export default ApplicantQuestions;