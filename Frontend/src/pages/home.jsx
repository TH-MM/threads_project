import React, { useEffect, useState } from "react"
import Post from "../Components/post/post"
import { usePostContext } from "../context/postContext/postContext"
import { useUserContext } from "../context/userContext/userContext"

const Home = () => {
    const context = usePostContext()
    const {isAuth , user} = useUserContext()

    const formatContent = (text) => {
        if (text) {
            return text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ));
        }

    };

    const likeit = async (postid) => {
        if(isAuth){
            context.setPosts((prevState) => {
                return  prevState.map((post) => {
                    const liked = post.likes.some((like) => like.user_id === user.id)
                    if (post.id === postid) {
                        return {
                            ...post,
                            likes_count: liked ? post.likes_count - 1 : post.likes_count + 1 ,
                            likes: liked ? post.likes.filter((like) => like.user_id !== user.id) : [...post.likes, { user_id: user.id }],
                        };
                    }
                    return post;
                })
            })
            await context.likePost(postid)
        } 
    }

    return (
        <div className="flex justify-center mt-5" >
            <div className="w-profile border border-solid rounded-2xl " >
                {
                    context.posts.map((post, key) => (
                        <>
                            <Post
                                to={`/post/edit/${post.id}`}
                                src={`http://localhost:8000/storage/${post.user.profile_picture}`}
                                postsrc={`http://localhost:8000/storage/${post.image}`}
                                key={key}
                                post_user_id={post.user.id}
                                name={post.user.username}
                                likeit={() => likeit(post.id)} 
                                likes={post.likes_count}
                                isLiked={post.likes.some((like) => like.user_id === user.id)}
                            >
                                {formatContent(post.content)}
                            </Post>
                        </>
                    ))
                }
            </div>
        </div>
    )
}
export default Home