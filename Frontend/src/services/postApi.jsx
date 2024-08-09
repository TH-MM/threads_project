import { GET_CSRF_TOKEN_URL } from "../URLS/URLS.JSX";
import AxiosClient from "../axios/api";
import { GET_POSTS } from "../URLS/URLS.JSX";
import { UPDATE_POST } from "../URLS/URLS.JSX";
import { LIKE_POST } from "../URLS/URLS.JSX";
import { LIKES } from "../URLS/URLS.JSX";

export const postApi = {
    posts: async () => {
        await AxiosClient.get(GET_CSRF_TOKEN_URL);
        return await AxiosClient.get(GET_POSTS)
    },
    update: async (values , id) => {
        await AxiosClient.get(GET_CSRF_TOKEN_URL);
        return await AxiosClient.put(UPDATE_POST + '/' + id , values)
    },
    like: async (id) => {
        return await AxiosClient.get(LIKE_POST + '/' + id )
    },
    likes: async () => {
        return await AxiosClient.get(LIKES)
    },
}