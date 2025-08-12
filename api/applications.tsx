import axios from "axios";

export const getApplicantJobs = async (id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/job/get-applicant-jobs?applicant_id=${id}`);
    return response.data;
}
