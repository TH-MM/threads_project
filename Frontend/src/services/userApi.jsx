import { GET_CSRF_TOKEN_URL } from "../URLS/URLS.JSX";
import { LOGIN_URL } from "../URLS/URLS.JSX";
import AxiosClient from "../axios/api";
import { USER_DATA_URL } from "../URLS/URLS.JSX";
import { LOGOUT_URL } from "../URLS/URLS.JSX";
import { REGISTER_URL } from "../URLS/URLS.JSX";
import { USER_Edit_URL } from "../URLS/URLS.JSX";

export const userApi = {
    login: async (values) => {
        await AxiosClient.get(GET_CSRF_TOKEN_URL);
        return await AxiosClient.post(LOGIN_URL, values)
    },
    logout: async () => {
        await AxiosClient.get(GET_CSRF_TOKEN_URL);
        return await AxiosClient.post(LOGOUT_URL)
    },
    register: async (name, username, email, password, password_confirmation) => {
        await AxiosClient.get(GET_CSRF_TOKEN_URL);
        return await AxiosClient.post(REGISTER_URL , {name, username, email, password, password_confirmation})
    },
    getUser: async () => {
        await AxiosClient.get(GET_CSRF_TOKEN_URL);
        return await AxiosClient.get(USER_DATA_URL)
    },
    update: async (values) => {
        return await AxiosClient.post(USER_Edit_URL, values , {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
}