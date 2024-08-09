import { ErrorMessage } from "formik";
import Field_ from "./field";
import Label from "./label";

const FieldBox = ({name , type , placeholder , children , className}) => {
    return(
        <div className="mb-1 pb-6 relative w-full">
                <Label >{children}</Label>
                <Field_ type={type} name={name} className={className} placeholder={placeholder} />
                {/* <ErrorMessage name={name} component="span" className=" text-red-600 absolute bottom-0 left-1 text-sm" /> */}
        </div>
    );
}
export default FieldBox