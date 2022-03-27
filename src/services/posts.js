import Request from "../utils/host";
const REGISTER_URL = 'users';
const LOGIN_URL = 'users/sign_in';
const POST_URL = 'posts';

// API call for Creating New user
export const createUserAccount = (payload) => {
    return Request.post(REGISTER_URL, payload);
}

// API call for Login Existing user
export const loginUserAccount =  (payload) => {
    return  Request.post(LOGIN_URL, payload);
}

// API call for Creating Post
export const createPost = (payload, token) => {
    return Request.post(POST_URL, payload, {headers : {'Authorization': token}});
}

// API call for List all Posts 
export const getPosts = (pageNum) => {
    return Request.get(`${POST_URL}?page=${pageNum}`);
}

// API call for Editing the Post
export const editPost = (postId,payload, token) => {
    return Request.patch(`${POST_URL}/${postId}`, payload, {headers : {'Authorization': token}});
}

// API call for Deleting the Post
export const deletePost = (postId, token) => {
    return Request.delete(`${POST_URL}/${postId}`, {headers : {'Authorization': token}});
}
