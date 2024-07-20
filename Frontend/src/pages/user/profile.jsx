import { useUserContext } from "../../context/userContext/userContext"
import Button from "../../Components/Ui/button"
import ProfileInfosSection from "../../Components/profile/profileInfosSection"
import Post from "../../Components/post/post"
import { useEffect, useState } from "react"

const UserProfile = () => {
    const context = useUserContext()

    
    return (
        <div className="flex justify-center mt-5">
            <div className="w-profile border border-solid rounded-2xl">
                <ProfileInfosSection name={context.user.name} username={context.user.username} bio={'New BIO HH'} />
                <div className="flex">
                    <Button className={"border-b border-b-black text-base text-black w-full mt-5 rounded-none"}>Threads</Button>
                    <Button className={"border-b text-base text-black w-full mt-5 rounded-none"}>Replies</Button>
                </div>
                {
                    context.user.posts ? (
                        context.user.posts.map((post, key) => (
                            <Post 
                                to={`/post/edit/${post.id}`} 
                                key={key} 
                                user_id={context.user.id} 
                                post_user_id={context.user.id} 
                                name={context.user.name}
                            >
                                {post.content}
                            </Post>
                        ))
                    ) : (
                        <p>Loading posts...</p>
                    )
                }
            </div>
        </div>
    )
}

export default UserProfile
