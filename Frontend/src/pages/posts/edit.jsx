import { Field, Form, Formik } from "formik"
import { Link, useNavigate, useParams } from "react-router-dom"
import FieldBox from "../../Components/FormComponents/fieldBox"
import Button from "../../Components/Ui/button"
import { Logo } from "../../svg/icons"
import { LoaderCircleIcon } from "lucide-react"
import { usePostContext } from "../../context/postContext/postContext"
import { useEffect, useState } from "react"

const EditPostForm = () => {
    const { id } = useParams()
    const context = usePostContext();
    const [post, setPost] = useState([]);
    const navigator = useNavigate()
    useEffect(() => {
        const foundedpost = context.posts.find((item) => (item.id == id))
        if (foundedpost) {
            setPost(foundedpost)
        }

    }, [context.posts])

    const updatePost = async (values , {setSubmitting}) => {
        await context.updatePost(values , post.id)
        .then((response) => {
            console.log("response : " + response)
            navigator('/')
        }).catch((error) => {
            console.log("error : " + error)
        }).finally(() => { setSubmitting(false) })
    }

    console.log(post)
    return (
        <div className="h-200 flex items-center">
            <Formik
                initialValues={{ content: post.content }}
                onSubmit={updatePost}
                enableReinitialize={true}
            >
                {({ errors, isSubmitting }) => (
                    <Form className="p-fp rounded-xl flex flex-col items-center w-fw mx-auto border border-solid border-spacing-1">
                        <Link to={"/"}><Logo size={38} className="text-center mb-12 fill-gray-800 stroke-none" /></Link>
                        <div className="relative w-full">
                        <Field type="text" name="content" placeholder="Write Something ...">
                                {({ field }) => (
                                    <FieldBox label="Content:" {...field} />
                                )}
                            </Field>
                            {errors.name && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.name}</div>}
                        </div>
                        <Button disabled={isSubmitting} className={`w-full text-white ${isSubmitting ? "bg-gray-500 " : 'bg-gray-900 hover:bg-black'} mt-2`}>
                            {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : "Edit"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default EditPostForm