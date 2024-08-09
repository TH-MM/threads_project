import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { usePostContext } from "../context/postContext/postContext"
import { useEffect } from "react"
import { useUserContext } from "../context/userContext/userContext"
import AxiosClient from "../axios/api"
import { USER_DATA_URL } from "../URLS/URLS.JSX"

const Layout = () => {
    const context = usePostContext()
    const { setUser, user, isAuth, setIsAuth_ , shouldRefresh , setShoulsRefresh } = useUserContext()

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

        context.getPosts().then((response) => {
            context.setPosts(response.data.posts)
        }).catch((error) => { console.log(error) })
    }, [isAuth , shouldRefresh])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout