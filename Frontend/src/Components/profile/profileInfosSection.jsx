import { useNavigate } from "react-router-dom";
import Button from "../Ui/button"

const ProfileInfosSection = ({name , username , bio , website , src , showButton = true}) => {
    const navigate = useNavigate();
    return(
        <div className="p-5">
        <div className="info-picture flex justify-between items-center">
            <div className="infos ">
                <h1 className="text-2xl font-bold ">{name}</h1>
                <p className="text-sm font-normal text-gray-400 mt-1">@{username}</p>
            </div>
            <div className="picture ">
                <img className="w-20 h-20 rounded-full object-cover" src={src} alt="" />
            </div>
        </div>
        <div className="bio w-4/5 mt-2">
           {bio}
        </div>
        <a href={website} className="bio w-4/5 mt-2">
           {website}
        </a>
        {
            showButton ? (<Button onClick={() => {navigate("/user/profile/edit")}} className={"border text-gray-900 w-full mt-5"}>Edit Profile</Button>) : ""
        }
        
    </div>
    )
}
export default ProfileInfosSection