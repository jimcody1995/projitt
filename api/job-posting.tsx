import axios from "axios";

export const addNewDetailJob = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/add`, data);
    return response.data;
}

export const getJobPostings = async (data: any) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/list-with-filters`, { params: data });
    return response.data;
}

export const editJobDescription = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/edit-description`, data);
    return response.data;
}

export const editDetailJob = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/edit`, data);
    return response.data;
}

export const getJobDetails = async (id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/single/${id}`);
    return response.data;
}

export const deleteJob = async (ids: string[]) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/delete`, { data: { ids } });
    return response.data;
}

export const publishJob = async (id: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/publish`, { id });
    return response.data;
}

export const duplicateJob = async (id: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/duplicate`, { id });
    return response.data;
}

export const changeJobStatus = async (id: string, status: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/change-status`, { id, status });
    return response.data;
}

// Question management APIs
export const addQuestionItem = async (data: {
    question_name: string;
    answer_type: string;
    options?: string[] | null;
    is_required: boolean;
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
}

export const editQuestionItem = async (data: {
    id: number;
    question_name: string;
    answer_type: string;
    options?: string[] | null;
    is_required: boolean;
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
}

export const editJobQuestions = async (data: {
    id: number;
    question_ids: number[];
}): Promise<{
    status: boolean;
    message: string;
    data: unknown;
}> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/edit-questions`, data);
    return response.data;
}


export const getAssessments = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/list-with-filters`);
    return response.data;
}

export const getAssessmentDetails = async (id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/single/${id}`);
    return response.data;
}

export const createAssessment = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/add`, data);
    return response.data;
}

export const editAssessment = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/edit`, data);
    return response.data;
}

export const deleteAssessment = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/delete/${id}`);
    return response.data;
}

export const closeAssessment = async (id: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/close`, { id });
    return response.data;
}

export const unpublishAssessment = async (id: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/assessment/unpublish`, { id });
    return response.data;
}
