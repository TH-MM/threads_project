import { USER_DASHBOARD_URL } from "../../URLS/URLS.JSX";

// ------------------------------------------------------------------------------------------------------------------>

import { Form, Formik } from "formik";
import FieldBox from "../../Components/FormComponents/fieldBox";
import Button from "../../Components/Ui/button";
import * as Yup from 'yup';
import Link_ from "../../Components/Ui/links";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircleIcon } from "lucide-react";

import { useUserContext } from "../../context/userContext/userContext";
import { FRONT_REGISTER_URL , HOME_URL } from "../../URLS/URLS.JSX";
import { Logo } from "../../svg/icons";


const Login = () => {
    const context = useUserContext();
    const navigator = useNavigate()

    const validationSchema = Yup.object().shape({
        // email: Yup.string().email().required(),
        // password: Yup.string().required().min(8),
    });

    const loginSubmition = async (values , {setSubmitting , setErrors}) => {
        await context.login(values).then((response) => {
                if (response.status === 204) {
                    context.setIsAuth_(true);
                    navigator(HOME_URL)
                }
            })
            .catch((error) => {
                setErrors(error.response.data.errors)
                console.log(error.response.data.errors)
            }).finally(() => {
                setSubmitting(false)
            })
    }


    return (
        <div className="h-200 flex items-center">
            <Formik
                validationSchema={validationSchema}
                initialValues={{ login: '', password: '' }}
                onSubmit={loginSubmition}
            >
                {({ errors, isSubmitting }) => (
                    <Form className="p-fp rounded-xl flex flex-col items-center w-fw mx-auto border border-solid border-spacing-1">
                        <Link to={"/"}><Logo size={38} className="text-center mb-12 fill-gray-800 stroke-none" /></Link>
                        <div className="relative w-full">
                            <FieldBox type="text" name="login" placeholder="Email / Username">Email or Username</FieldBox>
                            {errors.login && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.login}</div>}
                        </div>
                        <div className="relative w-full">
                        <FieldBox type="password" name="password" placeholder="Password">Password</FieldBox>
                            {errors.password && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.password}</div>}
                        </div>
                        
                        <Button disabled={isSubmitting} className={`w-full text-white ${isSubmitting ? "bg-gray-500 " : 'bg-gray-900 hover:bg-black'} mt-2`}>
                            {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : "Login"}
                        </Button>
                        <p className="text-sm mt-3">Don't have an account? <Link_ to={FRONT_REGISTER_URL} className="text-gray-900">Register</Link_></p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
