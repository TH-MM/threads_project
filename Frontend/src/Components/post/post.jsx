import { ChefHatIcon, MessageCircle, MessageSquare, Pencil, Repeat, Send, Share } from "lucide-react"
import { HeartIcon } from "../../svg/icons"
import Link_ from "../Ui/links"
import { Link } from "react-router-dom"

const Post = ({ 
    to, 
    iconsSize = '18', 
    children, 
    name, 
    src, 
    postsrc, 
    user_id = 0,
    post_user_id, 
    showEditButton = true , 
    likeit , 
    likes = 0 , 
    isLiked

    }) => {

    return (
        <div className="post flex gap-5 p-4 border-b">
            <img className="w-10 h-10 rounded-full object-cover" src={src} alt="" />
            <div className="post-infos w-full">
                <div className="flex justify-between w-full items-center">
                    <Link to={`/user/${name}`} ><h1 className="text-base font-bold ">{name}</h1></Link>
                    {
                        showEditButton ? (user_id === post_user_id ? (<Link_ className={"flex h-7 w-7 items-center justify-center"} to={to}><Pencil size={18} className="stroke-gray-500 hover:stroke-gray-700 ease-linear duration-200" /></Link_>) : "") : ""
                    }
                </div>
                <p className="thread text-sm mt-1 mb-2">{children}</p>
                <img className="rounded-xl" width={430} src={postsrc} alt="" />
                <div className="react-icons mt-4 pl-2 flex gap-7">
                    <div className={`flex gap-2 items-center text-gray-500`} onClick={likeit}><HeartIcon size={iconsSize} className={`cursor-pointer fill-none stroke-gray-500 ${isLiked ? "stroke-red-500 fill-red-500" : ""}`} /><p>{likes}</p></div>
                    <div><MessageCircle size={iconsSize} className="cursor-pointer fill-none stroke-gray-500" /></div>
                    <div><Repeat size={iconsSize} className="cursor-pointer fill-none stroke-gray-500" /></div>
                    <div><Send size={iconsSize} className="cursor-pointer fill-none stroke-gray-500" /></div>

                </div>
            </div>
        </div>
    )
}
export default Post