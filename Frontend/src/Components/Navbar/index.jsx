import { useNavigate } from "react-router-dom";
import Button from "../Ui/button";
import Links from "./links";
import Logo from "./logo";
import { Formik, Form } from "formik";
import { useUserContext } from "../../context/userContext/userContext";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FRONT_LOGIN_URL } from "../../URLS/URLS.JSX";




const Navbar = () => {
    const navigator = useNavigate()
    const context = useUserContext();
    const [isAuth , setIsAuth] = useState();

    useEffect(() => {
        if(context.isAuth){
            setIsAuth(context.isAuth)
        }else{
            setIsAuth(context.isAuth)
        }
    })

    return (
        <Formik
            initialValues={{}}
            onSubmit={ ({setSubmitting}) => {
                if(isAuth){
                    context.logout()
                    .then(() => {
                        context.setIsAuth_(false);
                        navigator(FRONT_LOGIN_URL)
                    }).catch((error) => {
                        console.log(error)
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
                }else{
                    navigator(FRONT_LOGIN_URL)
                }
                
            }}
        >{({isSubmitting}) => (
            <Form>
                <nav className="flex items-center justify-around h-16" >
                    <Logo />
                    <div>
                        <Links />
                    </div>
                    {
                        isAuth ? (<Button disabled={isSubmitting} className={`${isSubmitting ? "bg-red-300 " : ''} bg-red-500 ${isSubmitting ? "" : 'hover:bg-red-600'} mt-2`}>
                            {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : "Logout"}
                        </Button>) : (<Button disabled={isSubmitting} className={`${isSubmitting ? "bg-red-300 " : ''} bg-red-500 ${isSubmitting ? "" : 'hover:bg-red-600'} mt-2`}>
                            {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : "Login"}
                        </Button>)
                    }

                    
                </nav>
            </Form>
        )}

        </Formik>
    );
}

export default Navbar;
