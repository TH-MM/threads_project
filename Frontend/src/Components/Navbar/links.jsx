import { Link, useLocation } from "react-router-dom"
import { HeartIcon, HomeIcon, ProfileIcon, SearchIcon } from "../../svg/icons"
import { SquarePlus } from "lucide-react";
import { USER_DASHBOARD_URL } from "../../URLS/URLS.JSX";
import CreatPostForm from "../../pages/posts/create";
import { useState } from "react";
import { useUserContext } from "../../context/userContext/userContext";

const Links = () => {
    const currentLink = useLocation();
    const [displayForm , setDisplay] = useState();
    const {isAuth} = useUserContext();

    const toggleDisplayForm = () => {
        setDisplay(!displayForm)
    }
    return (
        <>
        <div className="flex justify-center gap-1"> 
             <Link to={"/"}><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <HomeIcon id="icon" strokeWidth="8" color="none" size="23" className={`${currentLink.pathname === "/" ? "fill-gray-600 stroke-none" : "stroke-gray-400 "}`}/></div></Link>
             <Link to={USER_DASHBOARD_URL}><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <ProfileIcon id="icon" strokeWidth="8" color="none" size="23" className={`${currentLink.pathname === "/user/dashboard" ? "fill-gray-800 stroke-none" : "stroke-gray-400 "}`}/></div></Link>
             <Link to={"/"}><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <SearchIcon id="icon" strokeWidth="8" color="none" size="23" className={' stroke-gray-400 fill-none'}/></div></Link>
             <Link to={"/"}><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <HeartIcon strokeWidth="8" color="none" size="23" className={' stroke-gray-400 '}/></div></Link>
             <button type="button" onClick={isAuth ? () => setDisplay(true) : null} disabled={!isAuth}  ><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <SquarePlus color="none" size="23" className={' stroke-gray-400 fill-none'}/></div></button>
             {/* <Link to={"/auth/login"} className="font-medium text-sm px-5 py-2.5 hover:text-orange-500 ease-out duration-300">login</Link> */}
        </div>
        <CreatPostForm displayForm={displayForm} toggleDisplayForm={toggleDisplayForm} />
        </>
    )
}

export default Links