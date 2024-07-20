import { Link, useLocation } from "react-router-dom"
import { HeartIcon, HomeIcon, ProfileIcon, SearchIcon } from "../../svg/icons"
import { SquarePlus } from "lucide-react";

const Links = () => {
    const currentLink = useLocation();
    return (
        <div className="flex justify-center gap-1"> 
             <Link to={"/"}><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <HomeIcon id="icon" strokeWidth="8" color="none" size="23" className={`${currentLink.pathname === "/" ? "fill-gray-600 stroke-none" : "stroke-gray-400 "}`}/></div></Link>
             <Link to={"/user/dashboard"}><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <ProfileIcon id="icon" strokeWidth="8" color="none" size="23" className={`${currentLink.pathname === "/user/dashboard" ? "fill-gray-800 stroke-none" : "stroke-gray-400 "}`}/></div></Link>
             <Link to={"/"}><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <SearchIcon id="icon" strokeWidth="8" color="none" size="23" className={' stroke-gray-400 fill-none'}/></div></Link>
             <Link to={"/"}><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <HeartIcon strokeWidth="8" color="none" size="23" className={' stroke-gray-400 '}/></div></Link>
             <Link to={"/post/create"}><div className="py-5 px-8 flex rounded-md items-center justify-center hover:bg-gray-100"> <SquarePlus color="none" size="23" className={' stroke-gray-400 fill-none'}/></div></Link>
             {/* <Link to={"/auth/login"} className="font-medium text-sm px-5 py-2.5 hover:text-orange-500 ease-out duration-300">login</Link> */}
        </div>
    )
}

export default Links