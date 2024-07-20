import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { usePostContext } from "../context/postContext/postContext"
import { useEffect } from "react"

const Layout = () => {
    const context = usePostContext()

    useEffect(() => {
        context.getPosts().then((response) => {
            context.setPosts(response.data.posts)
            console.log(context.posts)
        }).catch((error) => { console.log(error) })
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout