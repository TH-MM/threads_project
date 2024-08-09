import { Form, Formik } from "formik"
import { Link } from "react-router-dom"
import FieldBox from "../../Components/FormComponents/fieldBox"
import Button from "../../Components/Ui/button"
import { Logo } from "../../svg/icons"
import Link_ from "../../Components/Ui/links"
import { LoaderCircleIcon } from "lucide-react"
import AxiosClient from "../../axios/api"
import { GET_CSRF_TOKEN_URL } from "../../URLS/URLS.JSX";
import { useState } from "react"

const CreatPostsForm = () => {
    const [postImage , setPostImage] = useState()

    const createPost = async (values, { setSubmitting }) => {
        const formData = new FormData()
        formData.append("content", values.content)
        formData.append("image", postImage)

        await AxiosClient.post("/api/posts", formData , {headers: {} }).then((response) => {
            console.log("response : " + response)
        }).catch((error) => {
            console.log("error : " + error)
        }).finally(() => { setSubmitting(false) })
    }
    return (
        <div className="h-200 flex items-center">
            <Formik
                initialValues={{ content: "" }}
                onSubmit={createPost}
            >
                {({ errors, isSubmitting }) => (
                    <Form className="p-fp rounded-xl flex flex-col items-center w-fw mx-auto border border-solid border-spacing-1">
                        <Link to={"/"}><Logo size={38} className="text-center mb-12 fill-gray-800 stroke-none" /></Link>
                        <div className="relative w-full">
                            <FieldBox type="text" name="content" placeholder="Write Somthing ...">Content :</FieldBox>
                            {errors.name && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.name}</div>}
                        </div>
                        <div className="mb-10 flex flex-col items-center">
                            <label htmlFor="image" className="cursor-pointer hover:opacity-50 duration-300 mb-2">Profile Picture</label>
                            <input id="image" name="image" type="file" className="hidden" onChange={(e) => setPostImage(e.target.files[0]) }/>
                            
                        </div>
                        <Button disabled={isSubmitting} className={`w-full text-white ${isSubmitting ? "bg-gray-500 " : 'bg-gray-900 hover:bg-black'} mt-2`}>
                            {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : "Register"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default CreatPostsForm