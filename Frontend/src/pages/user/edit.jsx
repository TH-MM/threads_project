import { Field, Form, Formik } from "formik";
import FieldBox from "../../Components/FormComponents/fieldBox";
import Button from "../../Components/Ui/button";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircleIcon } from "lucide-react";
import { Logo } from "../../svg/icons";
import { useUserContext } from "../../context/userContext/userContext";
import { useState } from "react";

const EditProfile = () => {
    const { user, update ,refresh_ , setUser } = useUserContext();
    const [file, setFile] = useState(null);
    const navigator= useNavigate();


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        username: Yup.string().required("Username is required"),
        website: Yup.string().url("Invalid URL"),
        bio: Yup.string(),
        email: Yup.string().email("Invalid email").required("Email is required"),
    });

    const onSubmission = async (values , {setErrors , setSubmitting}) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("username", values.username);
        formData.append("website", values.website);
        formData.append("bio", values.bio);
        formData.append("email", values.email);

        if (file) {
            formData.append("profile_picture", file);
        }

        await update(formData).then(res => {
            setUser((prevState) => {
                return {
                    ...prevState,
                    name: values.name,
                    username: values.username,
                    website: values.website,
                    bio: values.bio,
                    email: values.email,
                    profile_picture: `profile/images/profile_picture_user_${user.username}.jpg`
                }
            })
            navigator("/user/profile")
            // refresh_()
        }).catch(err => {
            setErrors(err.response.data.errors);
        }).finally(() => {
            setSubmitting(false)
        });
    }

    return (
        <div className="flex justify-center mt-5">
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    name: user.name || "",
                    username: user.username || "",
                    email: user.email || "",
                    website: user.website || "",
                    bio: user.bio || "",
                    profile_picture: user.profile_picture || "",
                }}
                onSubmit={onSubmission}
                enableReinitialize={true}
            >
                {({ errors, isSubmitting }) => (
                    <Form className="p-fp flex flex-col items-center mx-auto border-spacing-1 w-profile border border-solid rounded-2xl" encType="multipart/form-data">
                        <div className="mb-10 flex flex-col items-center">
                            <label htmlFor="profile_picture" className="cursor-pointer hover:opacity-50 duration-300 mb-2">
                                <img className="w-20 h-20 rounded-full object-cover" src={file ? URL.createObjectURL(file) : `http://localhost:8000/storage/${user.profile_picture}` || ""} alt="profile picture" />
                            </label>
                            <input id="profile_picture" name="profile_picture" type="file" className="hidden"
                                onChange={handleFileChange} />
                            <p className="text-gray-400 font-semibold text-sm">Profile Picture</p>
                        </div>
                        <div className="relative w-full">
                            <FieldBox type="text" placeholder={"Name"} name="name">Name</FieldBox>
                            {errors.name && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.name}</div>}
                        </div>
                        <div className="relative w-full">
                            <FieldBox type="text" placeholder={"username"} name="username">Username</FieldBox>
                            {errors.username && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.username}</div>}
                        </div>
                        <div className="relative w-full">
                            <FieldBox type="text" placeholder={"bio"} name="bio">Bio</FieldBox>
                            {errors.bio && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.bio}</div>}
                        </div>
                        <div className="relative w-full">
                            <FieldBox type="text" placeholder={"Website"} name="website">Website</FieldBox>
                            {errors.website && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.website}</div>}
                        </div>
                        <div className="relative w-full">
                            <FieldBox type="text" placeholder={"email"} name="email">Email</FieldBox>
                            {errors.email && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.email}</div>}
                        </div>
                        <Button disabled={isSubmitting} className={`w-full text-white ${isSubmitting ? "bg-gray-500" : 'bg-gray-900 hover:bg-black'} mt-2`}>
                            {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : "Save Changes"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfile;
