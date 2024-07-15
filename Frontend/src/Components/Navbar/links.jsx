import { Link } from "react-router-dom"
import LinkItem from "./linkItem"

const Links = () => {
    return (
        <>
             <Link to={"/"} className="font-medium text-sm px-5 py-2.5 hover:text-orange-500 ease-out duration-300">Home</Link>
             {/* <Link to={"/auth/login"} className="font-medium text-sm px-5 py-2.5 hover:text-orange-500 ease-out duration-300">login</Link> */}
        </>
    )
}

export default Links