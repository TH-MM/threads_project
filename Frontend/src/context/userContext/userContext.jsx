import { createContext, useContext, useState } from "react";
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

    const login = async (values) => {
        return await userApi.login(values);
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