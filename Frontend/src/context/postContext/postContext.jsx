import { createContext, useContext, useState } from "react";
import { postApi } from "../../services/postApi";

const PostContext = createContext({
    posts: [],
    setPosts: () => { },
    getPosts: () => { },
    updatePost: () => { },
    likePost: () => { },
})

const PostContext_ = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        return await postApi.posts();
    };

    const updatePost = async (values , id) => {
        return await postApi.update(values , id);
    };

    const likePost = async (postId)=>{
        return await postApi.like(postId);
    }

    return (
        <PostContext.Provider value={{ posts,setPosts , getPosts ,updatePost , likePost}}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContext_;

export const usePostContext = () => { return useContext(PostContext) };