import Request from "../utils/host";
const REGISTER_URL = 'users';
const LOGIN_URL = 'users/sign_in';
const POST_URL = 'posts';
// const COMMENTS_URL = "comments";

// API call for Creating New user
export const createUserAccount = async (payload) => {
    return await Request.post(REGISTER_URL, payload);
}

// API call for Login Existing user
export const loginUserAccount = async (payload) => {
    return await Request.post(LOGIN_URL, payload);
}

// API call for Creating Post
export const createPost = async (payload, token) => {
    return await Request.post(POST_URL, payload, {headers : {'Authorization': token}});
}

// API call for List all Posts 
export const getPosts = async (pageNum) => {
    return await Request.get(`${POST_URL}?page=${pageNum}`);
}

// API call for Editing the Post
export const editPost = async (postId,payload, token) => {
    return await Request.patch(`${POST_URL}/${postId}`, payload, {headers : {'Authorization': token}});
}

// API call for Deleting the Post
export const deletePost = async (postId, token) => {
    return await Request.delete(`${POST_URL}/${postId}`, {headers : {'Authorization': token}});
}
