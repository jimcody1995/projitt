import axios from "axios";

export const getCountry = async (): Promise<any> => {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/country`);
};