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
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/edit-description`, data);
    return response.data;
}
