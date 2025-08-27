import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
    GripVertical,
    Plus,
    Copy,
    Trash2,
    X,
    CircleQuestionMark,
    CirclePlus,
    FileText,
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
import { Textarea } from '@/components/ui/textarea';
import TagInput from '@/components/ui/tag-input';
import { errorHandlers } from '@/utils/error-handler';
import { LoadingSpinner } from '@/components/common/loading-spinner';

import { getAssessmentDetails, addQuestionItem, editQuestionItem, getQuestionDetails, addCodingQuestionItem, editCodingQuestionItem, getAllPsychometricQuestions, getAllCodingQuestions } from '@/api/assessment';

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
    language: string[];
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
    setAssessmentData?: React.Dispatch<React.SetStateAction<QuestionsProps['assessmentData']>>;
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
    saveQuestions: () => Promise<Question[]>;
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
    const mapAnswerTypeToComponentType = (answerType: string | undefined): Question['type'] => {
        if (!answerType) return 'short-answer';

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

                    // Load question details for each question based on assessment type
                    for (const assessmentQuestion of apiQuestions) {
                        try {
                            if (assessmentData.type === 'psychometric') {
                                // Load psychometric questions
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
                            } else if (assessmentData.type === 'coding') {
                                // Load coding questions - data is already in the response
                                if (assessmentQuestion.question) {
                                    const questionData = assessmentQuestion.question;
                                    transformedQuestions.push({
                                        id: questionData.id.toString(),
                                        title: questionData.title,
                                        type: 'short-answer' as Question['type'],
                                        required: false,
                                        point: questionData.total_point.toString(),
                                        reverseScoring: false,
                                    });
                                }
                            }
                        } catch (error) {
                            console.error(`Error loading question ${assessmentQuestion.question_id}:`, error);
                        }
                    }

                    if (assessmentData.type === 'psychometric') {
                        // Update sections with loaded questions for psychometric
                        setSections([
                            {
                                id: '1',
                                title: 'Cognitive',
                                questions: transformedQuestions,
                            },
                        ]);
                    } else if (assessmentData.type === 'coding') {
                        // Update codingData with loaded questions for coding
                        const codingQuestions: CodingSection[] = [];
                        for (const assessmentQuestion of apiQuestions) {
                            if (assessmentQuestion.question) {
                                const questionData = assessmentQuestion.question;
                                codingQuestions.push({
                                    id: questionData.id.toString(),
                                    title: questionData.title,
                                    instructions: questionData.description,
                                    language: questionData.language || [],
                                    totalPoint: questionData.total_point.toString(),
                                    limit: questionData.time_limit.toString(),
                                    autoGradeWithAI: false,
                                });
                            }
                        }
                        setCodingData(codingQuestions);
                    }

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
    }, [assessmentId, assessmentData.type]);



    const [codingData, setCodingData] = useState<CodingSection[]>([]);
    const [showLoadExistingDialog, setShowLoadExistingDialog] = useState<boolean>(false);
    const [existingQuestions, setExistingQuestions] = useState<Array<{
        id: number;
        question_name?: string;
        title?: string;
        answer_type?: string;
        options?: string[] | null;
        is_required?: boolean;
        language?: string[];
        total_point?: number;
        time_limit?: number;
    }>>([]);
    const [loadingExistingQuestions, setLoadingExistingQuestions] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentQuestionContext, setCurrentQuestionContext] = useState<{
        sectionId: string;
        questionId: string;
        isCoding: boolean;
    } | null>(null);

    const questionTypes = [
        { value: 'short-answer', label: 'Short answer' },
        { value: 'paragraph', label: 'Paragraph' },
        { value: 'dropdown', label: 'Multiple choice' },
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'file-upload', label: 'File Upload' },
    ];

    // Filter questions based on search query
    const filteredQuestions = existingQuestions.filter(question => {
        if (!searchQuery.trim()) return true;

        const query = searchQuery.toLowerCase();
        if (currentQuestionContext?.isCoding) {
            // Search in coding questions
            return (
                (question.title?.toLowerCase().includes(query) || false) ||
                (question.language?.some(lang => lang.toLowerCase().includes(query)) || false)
            );
        } else {
            // Search in psychometric questions
            return (
                (question.question_name?.toLowerCase().includes(query) || false) ||
                (question.answer_type?.toLowerCase().includes(query) || false) ||
                (question.options?.some(option => option.toLowerCase().includes(query)) || false)
            );
        }
    });


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
                ? { ...section, questions: [...section.questions, newQuestion] }
                : section
        );
        setSections(updatedSections);
    };

    /**
     * Adds a new coding question to the assessment
     */
    const addQuestionForCoding = (): void => {
        const newQuestion: CodingSection = {
            id: Date.now().toString(),
            title: '',
            instructions: '',
            language: [],
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

    /** Saves questions to the API and returns processed questions with IDs */
    const saveQuestions = async (): Promise<Question[]> => {
        try {
            // Handle different question types based on assessment type
            if (assessmentData.type === 'psychometric') {
                return await savePsychometricQuestions();
            } else if (assessmentData.type === 'coding') {
                return await saveCodingQuestions();
            }

            return [];
        } catch (error) {
            errorHandlers.custom(error, 'Error saving questions');
            return [];
        }
    };

    /** Saves psychometric questions */
    const savePsychometricQuestions = async (): Promise<Question[]> => {
        const currentQuestions = sections[0]?.questions || [];
        const newQuestions: Question[] = [];
        const editedQuestions: Question[] = [];
        const processedQuestions: Question[] = [];

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
                processedQuestions.push(question); // Keep existing question with its ID
            } else {
                // New question
                newQuestions.push(question);
            }
        });

        // Add new questions first
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
                // Add the question with its new ID from the API response
                processedQuestions.push({
                    ...question,
                    id: response.data.id.toString()
                });
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
        }

        // Update original questions for future comparisons
        setOriginalQuestions(processedQuestions);

        // Call onSave with the processed questions (with proper IDs)
        if (onSave) {
            onSave(processedQuestions);
        }

        return processedQuestions;
    };

    /** Saves coding questions */
    const saveCodingQuestions = async (): Promise<Question[]> => {
        const currentQuestions = codingData;
        const newQuestions: CodingSection[] = [];
        const editedQuestions: CodingSection[] = [];
        const processedQuestions: Question[] = [];

        // Separate new and edited questions
        currentQuestions.forEach(question => {
            const originalQuestion = originalQuestions.find(q => q.id === question.id);
            if (originalQuestion) {
                // Check if question was modified
                if (
                    originalQuestion.title !== question.title ||
                    originalQuestion.point !== question.totalPoint
                ) {
                    editedQuestions.push(question);
                }
                processedQuestions.push({
                    id: question.id,
                    title: question.title,
                    type: 'short-answer' as Question['type'],
                    required: false,
                    point: question.totalPoint
                }); // Keep existing question with its ID
            } else {
                // New question
                newQuestions.push(question);
            }
        });

        // Add new coding questions first
        for (const question of newQuestions) {
            const payload = {
                title: question.title,
                description: question.instructions,
                language: question.language || [],
                total_point: parseInt(question.totalPoint || '0'),
                time_limit: parseInt(question.limit || '0')
            };

            const response = await addCodingQuestionItem(payload);
            if (response.status === true) {
                // Add the question with its new ID from the API response
                processedQuestions.push({
                    id: response.message.id.toString(),
                    title: question.title,
                    type: 'short-answer' as Question['type'],
                    required: false,
                    point: question.totalPoint
                });
            }
        }

        // Edit existing coding questions
        for (const question of editedQuestions) {
            const payload = {
                id: parseInt(question.id),
                title: question.title,
                description: question.instructions,
                language: question.language || [],
                total_point: parseInt(question.totalPoint || '0'),
                time_limit: parseInt(question.limit || '0')
            };

            await editCodingQuestionItem(payload);
        }

        // Update original questions for future comparisons
        setOriginalQuestions(processedQuestions);

        // Call onSave with the processed questions (with proper IDs)
        if (onSave) {
            onSave(processedQuestions);
        }

        return processedQuestions;
    };

    /** Loads existing questions from API based on assessment type */
    const loadExistingQuestionsFromAPI = async (isCoding: boolean) => {
        try {
            setLoadingExistingQuestions(true);
            if (isCoding) {
                const response = await getAllCodingQuestions();
                if (response.status === true && response.data) {
                    setExistingQuestions(response.data);
                }
            } else {
                const response = await getAllPsychometricQuestions();
                if (response.status === true && response.data) {
                    setExistingQuestions(response.data);
                }
            }
        } catch (error) {
            errorHandlers.custom(error, 'Error loading existing questions');
        } finally {
            setLoadingExistingQuestions(false);
        }
    };

    /** Opens the load existing questions dialog */
    const openLoadExistingDialog = (sectionId: string, questionId: string, isCoding: boolean) => {
        setCurrentQuestionContext({ sectionId, questionId, isCoding });
        setSearchQuery(''); // Clear search when opening dialog
        setShowLoadExistingDialog(true);
        loadExistingQuestionsFromAPI(isCoding);
    };

    /** Replaces current question with existing question */
    const replaceWithExistingQuestion = (existingQuestion: {
        id: number;
        question_name?: string;
        title?: string;
        answer_type?: string;
        options?: string[] | null;
        is_required?: boolean;
        language?: string[];
        total_point?: number;
        time_limit?: number;
    }, sectionId: string, questionId: string, isCoding: boolean) => {
        if (isCoding) {
            // Handle coding question replacement
            if (existingQuestion.title && existingQuestion.total_point !== undefined && existingQuestion.time_limit !== undefined) {
                const updatedQuestion: CodingSection = {
                    id: questionId, // Keep the same ID to maintain the question in the section
                    title: existingQuestion.title,
                    instructions: '', // Coding questions don't have description in the list API
                    language: existingQuestion.language || [],
                    totalPoint: existingQuestion.total_point.toString(),
                    limit: existingQuestion.time_limit.toString(),
                    autoGradeWithAI: false,
                };
                updateQuestionForCoding(questionId, updatedQuestion);
            }
        } else {
            // Handle psychometric question replacement
            if (existingQuestion.question_name && existingQuestion.answer_type && existingQuestion.is_required !== undefined) {
                const mappedType = mapAnswerTypeToComponentType(existingQuestion.answer_type);
                const updatedQuestion: Question = {
                    id: questionId, // Keep the same ID to maintain the question in the section
                    title: existingQuestion.question_name,
                    type: mappedType,
                    required: existingQuestion.is_required,
                    options: existingQuestion.options || undefined,
                };
                updateQuestion(sectionId, questionId, updatedQuestion);
            }
        }
        setShowLoadExistingDialog(false);
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
                                                                            onClick={() => openLoadExistingDialog(section.id, question.id, false)}
                                                                            className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                                            data-testid={`load-existing-button-${question.id}`}
                                                                            title="Load existing question"
                                                                        >
                                                                            <FileText className="w-4 h-4" />
                                                                            Load Existing
                                                                        </button>
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
                            {isLoadingQuestions ? (
                                <LoadingSpinner content="Loading coding questions..." />
                            ) : (
                                <>
                                    <button
                                        onClick={addQuestionForCoding}
                                        className="w-full py-3 border border-[#053834] rounded-[12px] text-[15px] font-medium text-[#053834] hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center gap-2"
                                        data-testid="add-coding-question-button"
                                    >
                                        <CirclePlus className="w-5 h-5" />
                                        Add New Question
                                    </button>

                                    {codingData.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>No coding questions added yet.</p>
                                            <p className="text-sm mt-2">Click &quot;Add New Question&quot; to get started.</p>
                                        </div>
                                    ) : (
                                        codingData.map((question) => (
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
                                                                <TagInput
                                                                    tags={question.language || []}
                                                                    setTags={(tags) => updateQuestionForCoding(question.id, { language: tags })}
                                                                    suggestions={[
                                                                        { id: 'python', name: 'Python' },
                                                                        { id: 'javascript', name: 'JavaScript' },
                                                                        { id: 'java', name: 'Java' },
                                                                        { id: 'c', name: 'C' },
                                                                        { id: 'c++', name: 'C++' },
                                                                        { id: 'c#', name: 'C#' },
                                                                        { id: 'php', name: 'PHP' },
                                                                        { id: 'ruby', name: 'Ruby' },
                                                                        { id: 'go', name: 'Go' },
                                                                        { id: 'rust', name: 'Rust' },
                                                                        { id: 'swift', name: 'Swift' },
                                                                        { id: 'kotlin', name: 'Kotlin' },
                                                                        { id: 'scala', name: 'Scala' },
                                                                        { id: 'typescript', name: 'TypeScript' },
                                                                        { id: 'html', name: 'HTML' },
                                                                        { id: 'css', name: 'CSS' },
                                                                        { id: 'sql', name: 'SQL' }
                                                                    ]}
                                                                    restrictToSuggestions={true}
                                                                />
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
                                                                    onClick={() => openLoadExistingDialog('', question.id, true)}
                                                                    className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-[12px]/[20px] transition-colors cursor-pointer"
                                                                    data-testid={`load-existing-coding-button-${question.id}`}
                                                                    title="Load existing question"
                                                                >
                                                                    <FileText className="w-4 h-4" />
                                                                    Load Existing
                                                                </button>
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
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div >

            {/* Load Existing Questions Dialog */}
            {showLoadExistingDialog && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Load Existing Questions - {currentQuestionContext?.isCoding ? 'Coding' : 'Psychometric'}
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
                                Select an existing question to replace the current one.
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
                                                replaceWithExistingQuestion(question, currentQuestionContext.sectionId || '', currentQuestionContext.questionId, currentQuestionContext.isCoding);
                                            }
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">
                                                    {currentQuestionContext?.isCoding ? (question.title || 'Untitled') : (question.question_name || 'Untitled')}
                                                </p>
                                                {!currentQuestionContext?.isCoding && (
                                                    <p className="text-sm text-gray-500">
                                                        Type: {mapAnswerTypeToComponentType(question.answer_type)} |
                                                        Required: {question.is_required !== undefined ? (question.is_required ? 'Yes' : 'No') : 'Unknown'}
                                                    </p>
                                                )}
                                                {currentQuestionContext?.isCoding && (
                                                    <p className="text-sm text-gray-500">
                                                        Languages: {question.language?.join(', ') || 'None'} |
                                                        Points: {question.total_point !== undefined ? question.total_point : 'Unknown'} |
                                                        Time Limit: {question.time_limit !== undefined ? question.time_limit : 'Unknown'}s
                                                    </p>
                                                )}
                                                {!currentQuestionContext?.isCoding && question.options && question.options.length > 0 && (
                                                    <p className="text-sm text-gray-500">
                                                        Options: {question.options.filter(Boolean).join(', ')}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (currentQuestionContext) {
                                                        replaceWithExistingQuestion(question, currentQuestionContext.sectionId || '', currentQuestionContext.questionId, currentQuestionContext.isCoding);
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
        </>
    );
});

export default Questions;