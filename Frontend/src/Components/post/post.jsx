import { ChefHatIcon, MessageCircle, MessageSquare, Pencil, Repeat, Send, Share } from "lucide-react"
import { HeartIcon } from "../../svg/icons"
import Link_ from "../Ui/links"

const Post = ({ to, iconsSize = '21', children, name, src, user_id = 0, post_user_id }) => {

    return (
        <div className="post flex gap-5 p-4 border-b">
            <img className="w-10 h-10 rounded-full object-cover" src="https://occ-0-114-116.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABc_IAP39hj-kZ8BSec3IQ3zMRFLQvuxISsTH0WbVmISwOd7_gNPUA19gEwg5EkWJFdPrVyeOrDxhCFi08qjHYzABVNdsJHmlQjpw.jpg?r=920" alt="" />
            <div className="post-infos w-full">
                <div className="flex justify-between w-full items-center">
                    <h1 className="text-base font-bold ">{name}</h1>
                    {
                        user_id === post_user_id ? (<Link_ className={"flex h-7 w-7 items-center justify-center"} to={to}><Pencil size={18} className="stroke-gray-500 hover:stroke-gray-700 ease-linear duration-200" /></Link_>) : ""
                    }
                </div>
                <p className="thread text-sm mt-1 mb-2">{children}</p>
                <img className="rounded-xl" src={src} alt="" />
                <div className="react-icons mt-3 pl-2 flex gap-6">
                    <HeartIcon size={iconsSize} className="cursor-pointer fill-none stroke-gray-500" />
                    <MessageCircle size={iconsSize} className="cursor-pointer fill-none stroke-gray-500" />
                    <Repeat size={iconsSize} className="cursor-pointer fill-none stroke-gray-500" />
                    <Send size={iconsSize} className="cursor-pointer fill-none stroke-gray-500" />
                </div>
            </div>
        </div>
    )
}
export default Post