import axios from "axios";

export const getInterviews = async (data: any) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/interview/list-with-filters`, { params: data });
    return response.data;
}

export const addInterview = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/interview/add`, data);
    return response.data;
}