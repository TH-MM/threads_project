import { useUserContext } from "../../context/userContext/userContext"
import Button from "../../Components/Ui/button"
import ProfileInfosSection from "../../Components/profile/profileInfosSection"
import Post from "../../Components/post/post"
import React, { useEffect, useState } from "react"
import { usePostContext } from "../../context/postContext/postContext"

const UserProfile = () => {
    const context = useUserContext()
    const postContext = usePostContext()

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
        if (context.isAuth) {
            postContext.setPosts((prevState) => {
                return prevState.map((post) => {
                    const liked = post.likes.some((like) => like.user_id === context.user.id)
                    if (post.id === postid) {
                        return {
                            ...post,
                            likes_count: liked ? post.likes_count - 1 : post.likes_count + 1,
                            likes: liked ? post.likes.filter((like) => like.user_id !== context.user.id) : [...post.likes, { user_id: context.user.id }],
                        };
                    }
                    return post;
                });
            });
            await postContext.likePost(postid);
        }
    };


    return (
        <div className="flex justify-center mt-5">
            <div className="w-profile border border-solid rounded-2xl">
                <ProfileInfosSection src={`http://localhost:8000/storage/${context.user.profile_picture}`} name={context.user.name} username={context.user.username} bio={context.user.bio} website={context.user.website} />
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
                                postsrc={`http://localhost:8000/storage/${post.image}`}
                                src={`http://localhost:8000/storage/${context.user.profile_picture}`}
                                likeit={() => likeit(post.id)}
                                likes={post.likes_count}
                                isLiked={post.likes.some((like) => like.user_id === context.user.id)}
                            >
                                {formatContent(post.content)}
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
