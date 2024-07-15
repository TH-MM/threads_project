import { GET_CSRF_TOKEN_URL } from "../URLS/URLS.JSX";
import { LOGIN_URL } from "../URLS/URLS.JSX";
import AxiosClient from "../axios/api";
import { USER_DATA_URL } from "../URLS/URLS.JSX";
import { LOGOUT_URL } from "../URLS/URLS.JSX";
import { REGISTER_URL } from "../URLS/URLS.JSX";

export const userApi = {
    login: async (email, password) => {
        await AxiosClient.get(GET_CSRF_TOKEN_URL);
        return await AxiosClient.post(LOGIN_URL, { email, password })
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
    }
}