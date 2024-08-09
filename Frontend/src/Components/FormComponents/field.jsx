import { Field } from "formik"

const Field_ = ({type , name , id , placeholder , className }) =>{
    return(
        <Field type={type} name={name} id={id} placeholder={placeholder} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`} />
    )
}

export default Field_