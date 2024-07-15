import { createContext, useContext, useState } from "react";
import AxiosClient from "../../axios/api";
import { GET_CSRF_TOKEN_URL } from "../../URLS/URLS.JSX";
import { LOGIN_URL } from "../../URLS/URLS.JSX";
import { userApi } from "../../services/userApi";

const UserContext = createContext({
    user: {},
    isAuth: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    login: () => { },
    register: () => { },
    logout: () => { },
})

const UserContext_ = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(JSON.parse(window.localStorage.getItem('ACCESS_TOKEN')) || false);

    const login = async (email, password) => {
        return await userApi.login(email, password);
    }

    const register = async (name, username, email, password, password_confirmation) => {
        return await userApi.register(name, username, email, password, password_confirmation);
    }

    const logout = async () => {
        return await userApi.logout();
    }

    const setIsAuth_ = (isAuth) => {
        setIsAuth(isAuth);
        window.localStorage.setItem("ACCESS_TOKEN", JSON.stringify(isAuth))
    }

    return (
        <UserContext.Provider value={{ user, isAuth, setIsAuth_, login, register, logout ,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext_;

export const useUserContext = () => { return useContext(UserContext) };