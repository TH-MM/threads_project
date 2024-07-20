import Button from "../Ui/button"

const ProfileInfosSection = ({name , username , bio}) => {
    return(
        <div className="p-5">
        <div className="info-picture flex justify-between items-center">
            <div className="infos ">
                <h1 className="text-2xl font-bold ">{name}</h1>
                <p className="text-sm font-normal text-gray-400 mt-1">@{username}</p>
            </div>
            <div className="picture ">
                <img className="w-20 h-20 rounded-full object-cover" src="https://occ-0-114-116.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABc_IAP39hj-kZ8BSec3IQ3zMRFLQvuxISsTH0WbVmISwOd7_gNPUA19gEwg5EkWJFdPrVyeOrDxhCFi08qjHYzABVNdsJHmlQjpw.jpg?r=920" alt="" />
            </div>
        </div>
        <div className="bio w-4/5 mt-2">
           {bio}
        </div>
        <Button className={"border text-gray-900 w-full mt-5"}>Edit Profile</Button>
    </div>
    )
}
export default ProfileInfosSection