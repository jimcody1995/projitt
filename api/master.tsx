import axios from "axios";

export const getTypes = async (data: any): Promise<any> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/master/list-with-filters`, { params: data });
    return response.data;
}