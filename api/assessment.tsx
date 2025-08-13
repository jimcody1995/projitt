import axios from 'axios';

// Get assessment details by ID
export const getAssessmentDetails = async (assessmentId: string): Promise<{
    status: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        description: string;
        time_duration: number;
        type_id: number;
        points: number;
        created_by: number;
        updated_by: number;
        deleted_by: number | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        questions: Array<{
            id: number;
            assessment_id: number;
            question_id: number;
            point: number;
            created_at: string;
            updated_at: string;
            question: any | null;
        }>;
    };
}> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/single/${assessmentId}`);
    return response.data;
};

// Get question details by ID
export const getQuestionDetails = async (questionId: string): Promise<{
    status: boolean;
    message: string;
    data: {
        id: number;
        question_name: string;
        answer_type: string;
        options: string[] | null;
        is_required: boolean;
        correct_answer: string | null;
        tags: string[];
        created_at: string;
        updated_at: string;
    };
}> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/question/single/${questionId}`);
    return response.data;
};

// Add new question
export const addQuestionItem = async (data: {
    question_name: string;
    answer_type: string;
    options?: string[] | null;
    is_required: boolean;
    point?: number;
    reverse_scoring?: boolean;
    tags: string[];
}): Promise<{
    status: boolean;
    message: string;
    data: {
        id: number;
        question_name: string;
        answer_type: string;
        options: string[] | null;
        is_required: boolean;
        correct_answer: string | null;
        tags: string[];
        created_at: string;
        updated_at: string;
    };
}> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/question/add`, data);
    return response.data;
};

// Edit existing question
export const editQuestionItem = async (data: {
    id: number;
    question_name: string;
    answer_type: string;
    options?: string[] | null;
    is_required: boolean;
    point?: number;
    reverse_scoring?: boolean;
    tags: string[];
}): Promise<{
    status: boolean;
    message: string;
    data: {
        id: number;
        question_name: string;
        answer_type: string;
        options: string[] | null;
        is_required: boolean;
        correct_answer: string | null;
        tags: string[];
        created_at: string;
        updated_at: string;
    };
}> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/question/edit`, data);
    return response.data;
};

// Update assessment with questions
export const editAssessmentQuestions = async (data: {
    id: number;
    name: string;
    description: string;
    time_duration: number;
    type_id: number;
    points: number;
    questions: Array<{
        question_id: number;
        point: number;
    }>;
}): Promise<{
    status: boolean;
    message: string;
    data: any;
}> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/edit`, data);
    return response.data;
};

// Create new assessment
export const createAssessment = async (data: {
    name: string;
    description: string;
    time_duration: number;
    type_id: number;
    points: number;
    questions: Array<{
        question_id: number;
        point: number;
    }>;
}): Promise<{
    status: boolean;
    message: string;
    data: any;
}> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/add`, data);
    return response.data;
};

// Edit existing assessment
export const editAssessment = async (data: {
    id: number;
    name: string;
    description: string;
    time_duration: number;
    type_id: number;
    points: number;
    questions: Array<{
        question_id: number;
        point: number;
    }>;
}): Promise<{
    status: boolean;
    message: string;
    data: any;
}> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/edit`, data);
    return response.data;
};
