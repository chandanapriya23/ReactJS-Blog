import Request from "../utils/host";
const REGISTER_URL = 'users';
const LOGIN_URL = 'users/sign_in';
const POST_URL = 'posts';
// const COMMENTS_URL = "comments";
let token;

// API call for Creating New user
export const createUserAccount = async (payload) => {
    const result = await Request.post(REGISTER_URL, payload);
    token = result?.headers?.authorization;
    localStorage.setItem("token", token);
    return result;
}

// API call for Login Existing user
export const loginUserAccount = async (payload) => {
    const result = await Request.post(LOGIN_URL, payload);
    console.log("LOGIN RESULTTT", result);
    token = result?.headers?.authorization;
    localStorage.setItem("token", token);
    return result;
}

// API call for Creating Post
export const createPost = async (payload) => {
    return await Request.post(POST_URL, payload, {headers : {'Authorization': localStorage.getItem("token")}});
}

// API call for List all Posts
export const getPosts = async () => {
    return await Request.get(`${POST_URL}?page=2`);
}

// API call for Editing the Post
export const editPost = async (postId,payload) => {
    return await Request.patch(`${POST_URL}/${postId}`, payload, {headers : {'Authorization': localStorage.getItem("token")}});
}

// API call for Deleting the Post
export const deletePost = async (postId) => {
    return await Request.delete(`${POST_URL}/${postId}`, {headers : {'Authorization': localStorage.getItem("token")}});
}

// API call for List all comments
export const getComments = async (postId) => {
    return await Request.get(`${POST_URL}/${postId}/comments`);
}

// API call for Creating a comment
export const createComment = async (payload) => {
    return await Request.post("comments", payload, {headers : {'Authorization': localStorage.getItem("token")}});
}

// API call for Deleting the Comment
export const deleteComment = async (commentId) => {
    return await Request.delete(`comments/${commentId}`, {headers : {'Authorization': localStorage.getItem("token")}});
}
