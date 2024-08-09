import { Outlet, useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/userContext/userContext"
import Navbar from "../../Components/Navbar"
import { useEffect, useState } from "react"
import AxiosClient from "../../axios/api"
import { USER_DATA_URL } from "../../URLS/URLS.JSX"
import { FRONT_LOGIN_URL } from "../../URLS/URLS.JSX"

const UserLayout = () => {
    const { setUser, user, isAuth, setIsAuth_ , shouldRefresh , setShoulsRefresh } = useUserContext()
    const navigator = useNavigate()

    useEffect(() => {
        if (isAuth || shouldRefresh) {
            AxiosClient.get(USER_DATA_URL)
                .then((response) => {
                    setUser(response.data)
                    setShoulsRefresh(false)
                }).catch(err => {
                    setIsAuth_(false);
                    console.log(err);
                })
        }
    }, [isAuth , shouldRefresh]);

    useEffect(() => {
        if (!isAuth) {
            navigator(FRONT_LOGIN_URL, { replace: true });
        }
    }, [isAuth]);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default UserLayout