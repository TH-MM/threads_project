import { useParams } from "react-router-dom";
import AxiosClient from "../axios/api";
import React, { useEffect, useState } from "react";
import ProfileInfosSection from "../Components/profile/profileInfosSection";
import Button from "../Components/Ui/button";
import Post from "../Components/post/post";
import { usePostContext } from "../context/postContext/postContext";
import { useUserContext } from "../context/userContext/userContext";

const UsersProfile = () => {
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState(null); // Renamed to avoid confusion with context user
    const [loading, setLoading] = useState(true);
    const context = usePostContext();
    const userContext = useUserContext();

    useEffect(() => {
        AxiosClient.get("/api/users/" + username)
            .then((response) => {
                setUserProfile(response.data.user);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching users:", error);
                setLoading(false);
            });
    }, [username]);

    const formatContent = (text) => {
        if (text) {
            return text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ));
        }
        return null;
    };

    const likeit = async (postid) => {
        if(userContext.isAuth){
            context.setPosts((prevState) => {
                return  prevState.map((post) => {
                    const liked = post.likes.some((like) => like.user_id === userContext.user.id)
                    if (post.id === postid) {
                        return {
                            ...post,
                            likes_count: liked ? post.likes_count - 1 : post.likes_count + 1 ,
                            likes: liked ? post.likes.filter((like) => like.user_id !== userContext.user.id) : [...post.likes, { user_id: userContext.user.id }],
                        };
                    }
                    return post;
                });
            });
            await context.likePost(postid);
        } 
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!userProfile) {
        return <p>User not found</p>;
    }

    return (
        <div className="flex justify-center mt-5">
            <div className="w-profile border border-solid rounded-2xl">
                <ProfileInfosSection
                    src={`http://localhost:8000/storage/${userProfile.profile_picture}`}
                    name={userProfile.name}
                    username={userProfile.username}
                    bio={userProfile.bio}
                    showButton={username === userContext.user.username ? false : true}
                />
                <div className="flex">
                    <Button className={"border-b border-b-black text-base text-black w-full mt-5 rounded-none"}>Threads</Button>
                    <Button className={"border-b text-base text-black w-full mt-5 rounded-none"}>Replies</Button>
                </div>
                {userProfile.posts ? (
                    userProfile.posts.map((post, key) => (
                        <Post
                            to={`/post/edit/${post.id}`}
                            key={key}
                            user_id={userProfile.id}
                            post_user_id={userProfile.id}
                            name={userProfile.name}
                            showEditButton={false}
                            postsrc={`http://localhost:8000/storage/${post.image}`}
                            src={`http://localhost:8000/storage/${userProfile.profile_picture}`}
                            likeit={() => likeit(post.id)}
                            likes={post.likes_count}
                            isLiked={post.likes.some((like) => like.user_id === userContext.user.id)}
                        >
                            {formatContent(post.content)}
                        </Post>
                    ))
                ) : (
                    <p>Loading posts...</p>
                )}
            </div>
        </div>
    );
}

export default UsersProfile;
