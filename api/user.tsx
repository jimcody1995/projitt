import axios from "axios"
import { customToast } from "@/components/common/toastr"
export const login = async ({ email, password }: { email: string; password: string }) => {
    return axios.put(`${process.env.NEXT_PUBLIC_BASE_PATH}/user/login`, { email, password })
}

export const resetPassword = async ({ token, email, password }: { token: string; email: string; password: string }) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/user/password-reset`, { token, email, password, password_confirmation: password })
}

export const forgotPasssword = async ({ email }: { email: string }) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/user/forgot-password`, { email, type_id: 1 })

}