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
import { FRONT_LOGIN_URL } from "../../URLS/URLS.JSX";


const Register = () => {
    const context = useUserContext();
    const navigator = useNavigate()

    // const validationSchema = Yup.object().shape({
    //     name: Yup.string().required(),
    //     username: Yup.string().required(),
    //     email: Yup.string().email().required(),
    //     password: Yup.string().required().min(8),
    // });

    const registerSubmition = async (values, { setSubmitting, setErrors }) => {
        await context.register(values.name, values.username, values.email, values.password, values.password_confirmation).then((response) => {
            if (response.status === 204) {
                context.setIsAuth_(true);
                navigator(USER_DASHBOARD_URL)
            }
        })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            }).finally(() => {
                setSubmitting(false)
            })
    }


    return (
        <div className="h-200 flex items-center">
            <Formik
                initialValues={{ name: "", username: "", email: "", password: "", password_confirmation: "" }}
                onSubmit={registerSubmition}
            >
                {({ errors, isSubmitting }) => (
                    <Form className="p-fp rounded-xl flex flex-col items-center w-fw mx-auto border border-solid border-spacing-1">
                        <Link to={"/"}><Logo className="text-center mb-12" /></Link>
                        <div className="relative w-full">
                            <FieldBox type="text" name="name" placeholder="Name">Name</FieldBox>
                            {errors.name && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.name}</div>}
                        </div>
                        <div className="relative w-full">
                            <FieldBox type="text" name="username" placeholder="username">Username</FieldBox>
                            {errors.username && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.username}</div>}
                        </div>
                        <div className="relative w-full">
                            <FieldBox type="text" name="email" placeholder="Email">Email</FieldBox>
                            {errors.email && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.email}</div>}
                        </div>
                        <div className="relative w-full">
                            <FieldBox type="password" name="password" placeholder="Password">Password</FieldBox>
                            {errors.password && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.password}</div>}
                        </div>
                        <div className="relative w-full">
                            <FieldBox type="password" name="password_confirmation" placeholder="password_confirmation">Password Confirmation</FieldBox>
                            {errors.password_confirmation && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.password_confirmation}</div>}
                        </div>
                        <Button disabled={isSubmitting} className={`w-full ${isSubmitting ? "bg-red-300 " : ''} bg-red-500 ${isSubmitting ? "" : 'hover:bg-red-600'} mt-2`}>
                            {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : "Login"}
                        </Button>
                        <p className="text-sm mt-3">Don't have an account? <Link_ to={FRONT_LOGIN_URL} className="text-red-400">login</Link_></p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
