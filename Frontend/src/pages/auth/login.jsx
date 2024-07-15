import { USER_DASHBOARD_URL } from "../../URLS/URLS.JSX";

// ------------------------------------------------------------------------------------------------------------------>

import { Form, Formik } from "formik";
import FieldBox from "../../Components/FormComponents/fieldBox";
import Button from "../../Components/Ui/button";
import * as Yup from 'yup';
import Logo from "../../Components/Navbar/logo";
import Link_ from "../../Components/Ui/links";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircleIcon } from "lucide-react";

import { useUserContext } from "../../context/userContext/userContext";
import { FRONT_REGISTER_URL } from "../../URLS/URLS.JSX";


const Login = () => {
    const context = useUserContext();
    const navigator = useNavigate()

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8),
    });

    const loginSubmition = async (values , {setSubmitting , setErrors}) => {
        await context.login(values.email , values.password).then((response) => {
                if (response.status === 204) {
                    context.setIsAuth_(true);
                    navigator(USER_DASHBOARD_URL)
                }
            })
            .catch((error) => {
                setErrors({mymessage : error.response.data.message})
            }).finally(() => {
                setSubmitting(false)
            })
    }


    return (
        <div className="h-200 flex items-center">
            <Formik
                validationSchema={validationSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={loginSubmition}
            >
                {({ errors, isSubmitting }) => (
                    <Form className="p-fp rounded-xl flex flex-col items-center w-fw mx-auto border border-solid border-spacing-1">
                        <Link to={"/"}><Logo className="text-center mb-12" /></Link>
                        <div className="relative w-full">
                            <FieldBox type="text" name="email" placeholder="Email">Email</FieldBox>
                            {errors.mymessage && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.mymessage}</div>}
                        </div>
                        <FieldBox type="password" name="password" placeholder="Password">Password</FieldBox>
                        <Button disabled={isSubmitting} className={`w-full ${isSubmitting ? "bg-red-300 " : ''} bg-red-500 ${isSubmitting ? "" : 'hover:bg-red-600'} mt-2`}>
                            {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : "Login"}
                        </Button>
                        <p className="text-sm mt-3">Don't have an account? <Link_ to={FRONT_REGISTER_URL} className="text-red-400">Register</Link_></p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
