import { Outlet, useNavigate } from "react-router-dom"
import { USER_DASHBOARD_URL } from "../../URLS/URLS.JSX"
import { useUserContext } from "../../context/userContext/userContext"
import { useEffect } from "react"

const AuthLayout = () => {
    const context = useUserContext()
    const navigator = useNavigate()

    useEffect(() => {
        if(context.isAuth){
            navigator(USER_DASHBOARD_URL)
        }
    })

    return (
        <>
            <Outlet />
        </>
    )
}

export default AuthLayout