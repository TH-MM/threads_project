import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import FieldBox from "../../Components/FormComponents/fieldBox";
import Button from "../../Components/Ui/button";
import { Logo } from "../../svg/icons";
import Link_ from "../../Components/Ui/links";
import { Image, ImagePlus, LoaderCircleIcon } from "lucide-react";
import AxiosClient from "../../axios/api";
import { GET_CSRF_TOKEN_URL } from "../../URLS/URLS.JSX";
import { useEffect, useState } from "react";

const CreatePostForm = ({ displayForm = false, toggleDisplayForm = () => { } }) => {
  const [postImage, setPostImage] = useState()

  const createPost = async (values, { setSubmitting }) => {
    const formData = new FormData()
    formData.append("content", values.content)
    formData.append("image", postImage)

    await AxiosClient.post("/api/posts", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      console.log("response : " + response)
    }).catch((error) => {
      console.log("error : " + error)
    }).finally(() => { setSubmitting(false) })
  }

  return (
    <div className={`h-screen w-full absolute top-0 left-0 z-10 duration-200 flex items-center ${displayForm ? "" : "hidden"}`}>
      <div className={`h-screen w-full absolute top-0 left-0 z-10 bg-gray-950 opacity-80 duration-200 flex items-center ${displayForm ? "" : "hidden"}`}>
        <button type="button" onClick={toggleDisplayForm} className="w-full h-full bg-transparent outline-none"></button>
      </div>
      <Formik
        initialValues={{ content: "" }}
        onSubmit={createPost}
      >
        {({ errors, isSubmitting }) => (
          <Form className={`p-fp rounded-xl flex flex-col items-center w-fw mx-auto border border-solid border-spacing-1 z-20 bg-white ${displayForm ? "" : "w-0 h-0 duration-300 hidden overflow-hidden"}`}>
            <div className="relative w-full">
              <Field as="textarea" className="w-full text-lg p-2 outline-none border resize-none bg-gray-50 height:auto" name="content" id="content" rows="4" placeholder="What is happening ?!" />
              {errors.content && <div className="text-red-500 absolute bottom-1 left-1 text-sm">{errors.content}</div>}
            </div>
            <div className="mb-1 w-full">
              <label htmlFor="image" className="cursor-pointer block w-3 text-left mb-2">
                <ImagePlus className="stroke-slate-500 hover:stroke-slate-700 duration-300" size={20} />
              </label>
              <input id="image" name="image" type="file" className="hidden" onChange={e => setPostImage(e.target.files[0])} />
            </div>
            <Button disabled={isSubmitting} className={`w-full text-white ${isSubmitting ? "bg-gray-500 " : "bg-gray-900 hover:bg-black"} mt-2`}>
              {isSubmitting ? (<LoaderCircleIcon className="inline mr-2 animate-spin" />) : "Create Post"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePostForm;
