import Post from "../Components/post/post"
import { usePostContext } from "../context/postContext/postContext"
import { useUserContext } from "../context/userContext/userContext"

const Home = () => {
    const context = usePostContext()

    return (
        <div className="flex justify-center mt-5" >
            <div className="w-profile border border-solid rounded-2xl " >
                {
                    context.posts.map((post, key) => (
                        <>
                            <Post to={`/post/edit/${post.id}`} key={key} post_user_id={post.user.id} name={post.user.name}>{post.content} </Post>
                        </>
                    ))
                }
            </div>
        </div>
    )
}
export default Home