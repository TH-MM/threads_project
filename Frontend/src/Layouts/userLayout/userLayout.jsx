import { Outlet, useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/userContext/userContext"
import Navbar from "../../Components/Navbar"
import { useEffect } from "react"
import AxiosClient from "../../axios/api"
import { USER_DATA_URL } from "../../URLS/URLS.JSX"
import { FRONT_LOGIN_URL } from "../../URLS/URLS.JSX"

const UserLayout = () => {
    const context = useUserContext()
    const navigator = useNavigate()


    useEffect(() => {
        AxiosClient.get(USER_DATA_URL)
            .then((response) => {
                context.setUser(response.data);
            })

        if (!context.isAuth) {
            navigator(FRONT_LOGIN_URL , { replace: true })
        }
    } , [])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default UserLayout