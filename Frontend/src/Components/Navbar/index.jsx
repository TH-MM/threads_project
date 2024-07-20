import { useNavigate } from "react-router-dom";
import Button from "../Ui/button";
import Links from "./links";
// import Logo from "./logo";
import { Formik, Form } from "formik";
import { useUserContext } from "../../context/userContext/userContext";
import { LoaderCircleIcon } from "lucide-react";
import { FRONT_LOGIN_URL } from "../../URLS/URLS.JSX";
import { Logo } from "../../svg/icons";




const Navbar = () => {
    const navigator = useNavigate()
    const context = useUserContext();

    return (
        <Formik
            initialValues={{}}
            onSubmit={({ setSubmitting }) => {
                if (context.isAuth) {
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
                } else {
                    navigator(FRONT_LOGIN_URL)
                }

            }}
        >{({ isSubmitting }) => (
            <Form>
                <nav className="flex items-center justify-around h-20" >
                    <div className="w-24 flex justify-center"><Logo size={35} className="fill-gray-600 stroke-none" /></div>
                    <div>
                        <Links />
                    </div>
                    <Button disabled={isSubmitting} className={`${isSubmitting ? "bg-gray-700 " : ''} bg-gray-900 ${isSubmitting ? "" : 'hover:bg-black'} mt-2 text-white`}>
                        {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : ""}{context.isAuth ? "Logout" : "Login"}
                    </Button>


                </nav>
            </Form>
        )}

        </Formik>
    );
}

export default Navbar;
