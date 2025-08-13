import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
    GripVertical,
    Plus,
    Copy,
    Trash2,
    X,
    CircleQuestionMark,
    CirclePlus,
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
import { Textarea } from '@/components/ui/textarea';
import { errorHandlers } from '@/utils/error-handler';
import { LoadingSpinner } from '@/components/common/loading-spinner';

import { getAssessmentDetails, addQuestionItem, editQuestionItem, getQuestionDetails } from '@/api/assessment';

export interface Question {
    id: string;
    title: string;
    type: 'short-answer' | 'paragraph' | 'dropdown' | 'checkbox' | 'file-upload' | undefined;
    required: boolean;
    options?: string[];
    point?: string;
    reverseScoring?: boolean;
}

interface Section {
    id: string;
    title: string;
    questions: Question[];
}

interface CodingSection {
    id: string;
    title: string;
    instructions: string;
    language: string;
    totalPoint: string;
    limit: string;
    autoGradeWithAI: boolean;
}

interface QuestionsProps {
    assessmentData: {
        name?: string;
        description?: string;
        type?: string;
        duration?: string | number;
        time_duration?: number;
        type_id?: number;
        points?: number;
        questions?: Array<{ question_id: number; point: number }>;
    };
    setAssessmentData: (data: QuestionsProps['assessmentData']) => void;
    assessmentId?: string;
    onSave?: (questions: Question[]) => void;
    errors?: {
        name?: string;
        description?: string;
        type?: string;
        duration?: string;
    };
    triggerValidation?: boolean;
}

export interface QuestionsRef {
    saveQuestions: () => Promise<void>;
}
/**
 * AssessmentQuestionsEditor - A component for creating and managing assessment questions.
 * 
 * This component provides a comprehensive interface for adding, editing, and organizing questions
 * for different types of assessments (psychometric and coding). It supports various question types
 * with appropriate controls and validation.
 */

const Questions = forwardRef<QuestionsRef, QuestionsProps>(({
    assessmentData,
    setAssessmentData,
    assessmentId,
    onSave,
}, ref) => {
    Questions.displayName = 'Questions';
    const [activeSection, setActiveSection] = useState<string | null>('1');
    const [sections, setSections] = useState<Section[]>([
        {
            id: '1',
            title: 'Cognitive',
            questions: [],
        },
    ]);
    const [originalQuestions, setOriginalQuestions] = useState<Question[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);

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

    // Load existing questions when assessmentId is provided
    useEffect(() => {
        const loadExistingQuestions = async () => {
            if (!assessmentId) return;

            setIsLoadingQuestions(true);
            try {
                const response = await getAssessmentDetails(assessmentId);
                if (response.status === true && response.data.questions) {
                    const apiQuestions = response.data.questions;
                    const transformedQuestions: Question[] = [];

                    // Load question details for each question
                    for (const assessmentQuestion of apiQuestions) {
                        try {
                            const questionResponse = await getQuestionDetails(assessmentQuestion.question_id.toString());
                            if (questionResponse.status === true && questionResponse.data) {
                                const questionData = questionResponse.data;
                                transformedQuestions.push({
                                    id: questionData.id.toString(),
                                    title: questionData.question_name,
                                    type: mapAnswerTypeToComponentType(questionData.answer_type),
                                    required: questionData.is_required,
                                    options: questionData.options || undefined,
                                    point: assessmentQuestion.point.toString(),
                                    reverseScoring: false, // Default value, adjust based on your API
                                });
                            }
                        } catch (error) {
                            console.error(`Error loading question ${assessmentQuestion.question_id}:`, error);
                        }
                    }

                    // Update sections with loaded questions
                    setSections([
                        {
                            id: '1',
                            title: 'Cognitive',
                            questions: transformedQuestions,
                        },
                    ]);

                    // Store original questions for comparison
                    setOriginalQuestions(transformedQuestions);
                }
            } catch (error) {
                errorHandlers.custom(error, 'Error loading existing questions');
            } finally {
                setIsLoadingQuestions(false);
            }
        };

        loadExistingQuestions();
    }, [assessmentId]);

    // Sync questions data with parent component
    const syncQuestionsWithParent = (updatedSections: Section[]) => {
        const questions = updatedSections.flatMap(section =>
            section.questions
                .filter(q => q.point && q.point !== '')
                .map(q => ({
                    question_id: parseInt(q.id),
                    point: parseInt(q.point || '0')
                }))
        );

        setAssessmentData({
            ...assessmentData,
            questions: questions
        });
    };

    const [codingData, setCodingData] = useState<CodingSection[]>([
        {
            id: '1',
            title: '',
            instructions: '',
            language: '',
            totalPoint: '',
            limit: '',
            autoGradeWithAI: false,
        },
    ]);

    const questionTypes = [
        { value: 'short-answer', label: 'Short answer' },
        { value: 'paragraph', label: 'Paragraph' },
        { value: 'dropdown', label: 'Multiple choice' },
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'file-upload', label: 'File Upload' },
    ];


    /**
     * Adds a new section to the assessment
     */
    const addSection = (): void => {
        const newSection: Section = {
            id: Date.now().toString(),
            title: `Applicant Question ${sections.length + 1}`,
            questions: [],
        };
        setSections([...sections, newSection]);
    };

    /**
     * Adds a new question to a specified section
     * @param sectionId - The ID of the section to add the question to
     */
    const addQuestion = (sectionId: string): void => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            title: '',
            type: 'short-answer',
            required: false,
        };
        const updatedSections = sections.map(section =>
            section.id === sectionId
                ? { ...section, questions: [newQuestion, ...section.questions] }
                : section
        );
        setSections(updatedSections);
        syncQuestionsWithParent(updatedSections);
    };

    /**
     * Adds a new coding question to the assessment
     */
    const addQuestionForCoding = (): void => {
        const newQuestion: CodingSection = {
            id: Date.now().toString(),
            title: '',
            instructions: '',
            language: '',
            totalPoint: '',
            limit: '',
            autoGradeWithAI: false,
        };
        setCodingData([...codingData, newQuestion]);
    };

    /**
     * Updates a question's properties
     * @param sectionId - The ID of the section containing the question
     * @param questionId - The ID of the question to update
     * @param updates - The partial question object with updated properties
     */
    const updateQuestion = (
        sectionId: string,
        questionId: string,
        updates: Partial<Question>
    ): void => {
        const updatedSections = sections.map(section =>
            section.id === sectionId
                ? {
                    ...section,
                    questions: section.questions.map(q =>
                        q.id === questionId ? { ...q, ...updates } : q
                    ),
                }
                : section
        );
        setSections(updatedSections);
        syncQuestionsWithParent(updatedSections);
    };

    /**
     * Updates a coding question's properties
     * @param questionId - The ID of the question to update
     * @param updates - The partial coding question object with updated properties
     */
    const updateQuestionForCoding = (questionId: string, updates: Partial<CodingSection>): void => {
        setCodingData(codingData.map(question =>
            question.id === questionId ? { ...question, ...updates } : question
        ));
    };

    /**
     * Duplicates a question within a section
     * @param sectionId - The ID of the section containing the question
     * @param questionId - The ID of the question to duplicate
     */
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

    /**
     * Deletes a question from a section
     * @param sectionId - The ID of the section containing the question
     * @param questionId - The ID of the question to delete
     */
    const deleteQuestion = (sectionId: string, questionId: string): void => {
        const updatedSections = sections.map(section =>
            section.id === sectionId
                ? {
                    ...section,
                    questions: section.questions.filter(q => q.id !== questionId),
                }
                : section
        );
        setSections(updatedSections);
        syncQuestionsWithParent(updatedSections);
    };

    /**
     * Duplicates a coding question
     * @param questionId - The ID of the coding question to duplicate
     */
    const duplicateQuestionForCoding = (questionId: string): void => {
        const question = codingData.find(q => q.id === questionId);
        if (question) {
            const duplicated: CodingSection = {
                ...question,
                id: Date.now().toString(),
            };
            setCodingData([...codingData, duplicated]);
        }
    };

    /**
     * Deletes a coding question
     * @param questionId - The ID of the coding question to delete
     */
    const deleteQuestionForCoding = (questionId: string): void => {
        setCodingData(codingData.filter(q => q.id !== questionId));
    };

    /**
     * Adds a new option to a dropdown or checkbox question
     * @param sectionId - The ID of the section containing the question
     * @param questionId - The ID of the question to add the option to
     */
    const addOption = (sectionId: string, questionId: string): void => {
        const section = sections.find(s => s.id === sectionId);
        const question = section?.questions.find(q => q.id === questionId);
        if (question?.options) {
            const updatedOptions = [...question.options, `Option ${question.options.length + 1}`];
            updateQuestion(sectionId, questionId, { options: updatedOptions });
        }
    };

    /**
     * Updates an option in a dropdown or checkbox question
     * @param sectionId - The ID of the section containing the question
     * @param questionId - The ID of the question containing the option
     * @param optionIndex - The index of the option to update
     * @param newValue - The new value for the option
     */
    const updateOption = (
        sectionId: string,
        questionId: string,
        optionIndex: number,
        newValue: string
    ): void => {
        const section = sections.find(s => s.id === sectionId);
        const question = section?.questions.find(q => q.id === questionId);
        if (question?.options) {
            const updatedOptions = [...question.options];
            updatedOptions[optionIndex] = newValue;
            updateQuestion(sectionId, questionId, { options: updatedOptions });
        }
    };

    /**
     * Removes an option from a dropdown or checkbox question
     * @param sectionId - The ID of the section containing the question
     * @param questionId - The ID of the question containing the option
     * @param optionIndex - The index of the option to remove
     */
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
        if (!assessmentId) return;

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
                        originalQuestion.point !== question.point ||
                        originalQuestion.reverseScoring !== question.reverseScoring ||
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
                    point?: number;
                    reverse_scoring?: boolean;
                    options?: string[] | null;
                    tags: string[];
                } = {
                    question_name: question.title,
                    answer_type: mapComponentTypeToAnswerType(question.type),
                    is_required: question.required,
                    tags: ["Assessment", "Psychometric", "Cognitive"]
                };

                // Add point if provided
                if (question.point && question.point !== '') {
                    payload.point = parseInt(question.point);
                }

                // Add reverse scoring if applicable
                if (question.reverseScoring !== undefined) {
                    payload.reverse_scoring = question.reverseScoring;
                }

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
                    point?: number;
                    reverse_scoring?: boolean;
                    options?: string[] | null;
                    tags: string[];
                } = {
                    id: parseInt(question.id),
                    question_name: question.title,
                    answer_type: mapComponentTypeToAnswerType(question.type),
                    is_required: question.required,
                    tags: ["Assessment", "Psychometric", "Cognitive"]
                };

                // Add point if provided
                if (question.point && question.point !== '') {
                    payload.point = parseInt(question.point);
                }

                // Add reverse scoring if applicable
                if (question.reverseScoring !== undefined) {
                    payload.reverse_scoring = question.reverseScoring;
                }

                // Only include options for dropdown and checkbox questions
                if (question.type === 'dropdown' || question.type === 'checkbox') {
                    payload.options = question.options || null;
                }

                await editQuestionItem(payload);
                questionIds.push(parseInt(question.id));
            }

            // Note: Assessment questions are saved through the parent component's editAssessment function
            // which handles the complete assessment update including questions

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
        <>
            <div className='sm:w-[760px] w-full' data-testid="assessment-questions-editor">
                <div className='flex justify-between mb-[16px]'>
                    <p className='text-[16px]/[26px] text-[#4b4b4b]' data-testid="total-score">Total Score: 80</p>
                    <div
                        className="flex gap-[8px] items-center cursor-pointer"
                        id="write-with-ai-group"
                        data-testid="write-with-ai-group"
                    >
                        <img
                            src="/images/icons/ai-line.png"
                            alt="AI icon"
                            className="w-[20px] h-[20px]"
                            id="ai-icon"
                            data-testid="ai-icon"
                        />
                        <p
                            className="text-[14px]/[16px] text-[#0d978b]"
                            id="write-with-ai-trigger"
                            data-testid="write-with-ai-trigger"
                        >
                            Generate Questions
                        </p>
                    </div>
                </div>

                <div className="min-h-screen w-full bg-white border border-[#e9e9e9] rounded-[12px]">
                    {assessmentData.type === 'psychometric' && (
                        <>
                            <div className='border-b border-[#e9e9e9] pl-[15px] pt-[9px] flex gap-[12px] w-full overflow-x-auto'>
                                {sections.map((section) => (
                                    <div
                                        key={section.id}
                                        className={`py-[8.5px] px-[6px] text-[14px] font-medium flex items-center gap-[8px] cursor-pointer ${activeSection === section.id ? 'text-[#0d978b] border-b-[2px] border-[#0d978b]' : 'text-[#353535]'}`}
                                        onClick={() => setActiveSection(section.id)}
                                        data-testid={`section-tab-${section.id}`}
                                    >
                                        <CircleQuestionMark className='size-[20px]' />
                                        <p className='whitespace-nowrap'>{section.title}</p>
                                    </div>
                                ))}
                                <div
                                    className='py-[8.5px] px-[6px] text-[#353535] text-[14px] font-medium flex items-center gap-[8px] cursor-pointer'
                                    onClick={addSection}
                                    data-testid="add-section-button"
                                >
                                    <Plus className='size-[20px] text-[#353535]' />
                                    <p className='whitespace-nowrap'>Add Section</p>
                                </div>
                            </div>

                            <div className="w-full mx-auto py-[31px] px-[25px]">
                                {isLoadingQuestions ? (
                                    <LoadingSpinner content="Loading questions..." />
                                ) : (
                                    sections.filter((section) => section.id === activeSection).map((section) => (
                                        <div key={section.id} className="mb-8" data-testid={`section-content-${section.id}`}>
                                            <div className="space-y-4">
                                                <button
                                                    onClick={() => addQuestion(section.id)}
                                                    className="w-full py-3 border border-[#053834] rounded-[12px] text-[15px] font-medium text-[#053834] hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center gap-2"
                                                    data-testid={`add-question-button-${section.id}`}
                                                >
                                                    <CirclePlus className="w-5 h-5" />
                                                    Add New Question
                                                </button>

                                                {section.questions.map((question) => (
                                                    <div
                                                        key={question.id}
                                                        className="bg-[#F5F5F5] rounded-lg shadow-sm border border-[#e9e9e9] group hover:shadow-md transition-shadow"
                                                        data-testid={`question-container-${question.id}`}
                                                    >
                                                        <div className="">
                                                            <div className="flex items-start gap-4 py-[20px] px-[16px]">
                                                                <button
                                                                    className="mt-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                                                                    data-testid={`drag-handle-${question.id}`}
                                                                >
                                                                    <GripVertical className="w-5 h-5" />
                                                                </button>
                                                                <div className='flex items-start gap-4 sm:flex-row flex-col w-full'>
                                                                    <div className="lg:flex-1 w-full">
                                                                        <Input
                                                                            type="text"
                                                                            value={question.title}
                                                                            onChange={(e) => updateQuestion(section.id, question.id, { title: e.target.value })}
                                                                            className="h-[48px]"
                                                                            placeholder="Question"
                                                                            data-testid={`question-title-input-${question.id}`}
                                                                        />
                                                                    </div>
                                                                    <Select
                                                                        value={question.type}
                                                                        onValueChange={(e) => updateQuestion(section.id, question.id, {
                                                                            type: e as Question['type'],
                                                                            options: ['dropdown', 'checkbox'].includes(e) ? ['Option 1'] : undefined
                                                                        })}
                                                                        data-testid={`question-type-select-${question.id}`}
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
                                                                <div className="sm:ml-9 ml-0 space-y-3 mb-4">
                                                                    <div>
                                                                        <p className='text-[12px]/[18px] text-[#1c1c1c]'>Mark as point</p>
                                                                        <Input
                                                                            value={question.point}
                                                                            onChange={(e) => updateQuestion(section.id, question.id, { point: e.target.value })}
                                                                            className="h-[28px] w-[165px] mt-[4px]"
                                                                            placeholder="Point"
                                                                            data-testid={`question-point-input-${question.id}`}
                                                                        />
                                                                    </div>
                                                                </div>

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
                                                                                    data-testid={`option-input-${question.id}-${index}`}
                                                                                />
                                                                                {question.options && question.options.length > 1 && (
                                                                                    <button
                                                                                        onClick={() => removeOption(section.id, question.id, index)}
                                                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                                                        data-testid={`remove-option-button-${question.id}-${index}`}
                                                                                    >
                                                                                        <X className="w-4 h-4" />
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                        <button
                                                                            onClick={() => addOption(section.id, question.id)}
                                                                            className="text-[#0D978B] hover:text-[#0D978B]/80 text-[12px]/[20px] flex items-center gap-[6px] cursor-pointer"
                                                                            data-testid={`add-option-button-${question.id}`}
                                                                        >
                                                                            <Plus className="w-4 h-4 border rounded-full" />
                                                                            Add options
                                                                        </button>
                                                                    </div>
                                                                )}

                                                                <div className="flex items-center sm:flex-row flex-col gap-[10px] justify-between border-t border-[#d9d9d9] pt-[14px]">
                                                                    {(question.type === 'short-answer' || question.type === 'paragraph') ? (
                                                                        <div className="flex items-center gap-3">
                                                                            <label className="flex items-center gap-2 text-[12px]/[16px] text-[#4b4b4b]">
                                                                                <Switch
                                                                                    shape="square"
                                                                                    checked={question.reverseScoring}
                                                                                    onCheckedChange={(checked) => updateQuestion(section.id, question.id, { reverseScoring: checked })}
                                                                                    data-testid={`reverse-scoring-switch-${question.id}`}
                                                                                />
                                                                                Reverse Scoring
                                                                            </label>
                                                                        </div>
                                                                    ) : <div></div>}

                                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <button
                                                                            onClick={() => duplicateQuestion(section.id, question.id)}
                                                                            className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                                            data-testid={`duplicate-question-button-${question.id}`}
                                                                        >
                                                                            <Copy className="w-4 h-4" />
                                                                            Duplicate
                                                                        </button>
                                                                        <button
                                                                            onClick={() => deleteQuestion(section.id, question.id)}
                                                                            className="flex items-center gap-1 px-3 py-1 text-[#c30606] hover:bg-[#c30606]/10 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                                            data-testid={`delete-question-button-${question.id}`}
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {assessmentData.type === 'coding' && (
                        <div className="space-y-4 p-[20px]">
                            <button
                                onClick={addQuestionForCoding}
                                className="w-full py-3 border border-[#053834] rounded-[12px] text-[15px] font-medium text-[#053834] hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center gap-2"
                                data-testid="add-coding-question-button"
                            >
                                <CirclePlus className="w-5 h-5" />
                                Add New Question
                            </button>

                            {codingData.map((question) => (
                                <div
                                    key={question.id}
                                    className="bg-[#F5F5F5] rounded-lg shadow-sm border border-[#e9e9e9] group hover:shadow-md transition-shadow"
                                    data-testid={`coding-question-container-${question.id}`}
                                >
                                    <div className="">
                                        <div className="flex items-center gap-4 py-[20px] px-[16px]">
                                            <button
                                                className="mt-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                                                data-testid={`coding-drag-handle-${question.id}`}
                                            >
                                                <GripVertical className="w-5 h-5" />
                                            </button>
                                            <div className='flex flex-col gap-[20px] w-full'>
                                                <Input
                                                    type="text"
                                                    placeholder="Problem Title"
                                                    className="h-[40px]"
                                                    value={question.title}
                                                    onChange={(e) => updateQuestionForCoding(question.id, { title: e.target.value })}
                                                    data-testid={`coding-title-input-${question.id}`}
                                                />
                                                <Textarea
                                                    placeholder="Instructions"
                                                    className="h-[135px]"
                                                    value={question.instructions}
                                                    onChange={(e) => updateQuestionForCoding(question.id, { instructions: e.target.value })}
                                                    data-testid={`coding-instructions-textarea-${question.id}`}
                                                />
                                                <div className='flex gap-[10px] sm:flex-row flex-col'>
                                                    <Select
                                                        value={question.language}
                                                        onValueChange={(value) => updateQuestionForCoding(question.id, { language: value })}
                                                        data-testid={`coding-language-select-${question.id}`}
                                                    >
                                                        <SelectTrigger className="h-[40px]">
                                                            <SelectValue placeholder="Language Allowed" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="python">Python</SelectItem>
                                                            <SelectItem value="javascript">JavaScript</SelectItem>
                                                            <SelectItem value="java">Java</SelectItem>
                                                            <SelectItem value="c">C</SelectItem>
                                                            <SelectItem value="c++">C++</SelectItem>
                                                            <SelectItem value="c#">C#</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Input
                                                        type="text"
                                                        placeholder="Total Point"
                                                        className="h-[40px]"
                                                        value={question.totalPoint}
                                                        onChange={(e) => updateQuestionForCoding(question.id, { totalPoint: e.target.value })}
                                                        data-testid={`coding-point-input-${question.id}`}
                                                    />
                                                    <div className='relative w-full'>
                                                        <Input
                                                            type="text"
                                                            placeholder="Limit"
                                                            className="h-[40px]"
                                                            value={question.limit}
                                                            onChange={(e) => updateQuestionForCoding(question.id, { limit: e.target.value })}
                                                            data-testid={`coding-limit-input-${question.id}`}
                                                        />
                                                        <span className="absolute text-[12px]/[18px] right-[16px] top-1/2 transform -translate-y-1/2 text-[#a5a5a5]">sec</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='bg-white px-[20px] py-[16px]'>
                                            <div className="flex items-center justify-between border-t border-[#d9d9d9] pt-[14px] sm:flex-row flex-col gap-[10px]">
                                                <div className="flex items-center gap-3">
                                                    <label className="flex items-center gap-2 text-[12px]/[16px] text-[#4b4b4b]">
                                                        <Switch
                                                            shape="square"
                                                            checked={question.autoGradeWithAI}
                                                            onCheckedChange={(checked) => setCodingData(codingData.map((q) => q.id === question.id ? { ...q, autoGradeWithAI: checked } : q))}
                                                            data-testid={`auto-grade-switch-${question.id}`}
                                                        />
                                                        Auto-grade with AI
                                                    </label>
                                                </div>

                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => duplicateQuestionForCoding(question.id)}
                                                        className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                        data-testid={`duplicate-coding-button-${question.id}`}
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                        Duplicate
                                                    </button>
                                                    <button
                                                        onClick={() => deleteQuestionForCoding(question.id)}
                                                        className="flex items-center gap-1 px-3 py-1 text-[#c30606] hover:bg-[#c30606]/10 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                        data-testid={`delete-coding-button-${question.id}`}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div >
        </>
    );
});

export default Questions;