import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/layout";
import Login from "../pages/auth/login";
import AuthLayout from "../Layouts/auth/authLayout";
import UserLayout from "../Layouts/userLayout/userLayout";
import Register from "../pages/auth/register";
import CreatPostForm from "../pages/posts/create";
import UserProfile from "../pages/user/profile";
import Home from "../pages/home";
import EditPostForm from "../pages/posts/edit";
import EditProfle from "../pages/user/edit";
import UsersProfile from "../pages/usersProfile";

const Routes = createBrowserRouter([
    {
        path: '/' ,
        element:<Layout />,
        children:[
            {
                path:"/",
                element:<Home />
            },
            {
                path:"/post/create",
                element:<CreatPostForm />
            },
            {
                path:"/post/edit/:id",
                element:<EditPostForm />
            },
            {
                path:"/user/:username",
                element:<UsersProfile />
            },
        ]
    },
    {
        path: '/auth' ,
        element:<AuthLayout />,
        children:[
            {
                path:"/auth/login",
                element:<Login />
            },
            {
                path:"/auth/register",
                element:<Register />
            },
        ]
    },
    {
        path: '/user' ,
        element:<UserLayout />,
        children:[
            {
                path:"/user/profile",
                element:<UserProfile />
            },
            {
                path:"/user/profile/edit",
                element:<EditProfle />
            }
            
        ]
    }
])

export default Routes