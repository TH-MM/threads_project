import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/layout";
import Test from "../pages/test";
import Login from "../pages/auth/login";
import AuthLayout from "../Layouts/auth/authLayout";
import UserDashboard from "../pages/user/dashboard";
import UserLayout from "../Layouts/userLayout/userLayout";
import Register from "../pages/auth/register";

const Routes = createBrowserRouter([
    {
        path: '/' ,
        element:<Layout />,
        children:[
            {
                path:"/",
                element:<Test />
            }
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
                path:"/user/dashboard",
                element:<UserDashboard />
            }
        ]
    }
])

export default Routes