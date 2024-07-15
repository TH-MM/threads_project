import { useUserContext } from "../../context/userContext/userContext"

const UserDashboard = () => {
    const context = useUserContext();

    return(
        <h1> {context.user.name} USER DASHBOARD</h1>
    )
}

export default UserDashboard