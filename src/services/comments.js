import Request from "../utils/host";

const POST_URL = 'posts';

// API call for List all comments
export const getComments = async (postId) => {
    return await Request.get(`${POST_URL}/${postId}/comments`);
}

// API call for Creating a comment
export const createComment = async (payload,token) => {
    return await Request.post("comments", payload, {headers : {'Authorization': token}});
}

// API call for Editing the Comment
export const editCommentAPI = async (payload, commentId, token) => {
    return await Request.patch(`comments/${commentId}`, payload, {headers : {'Authorization': token}});
}

// API call for Deleting the Comment
export const deleteComment = async (commentId, token) => {
    return await Request.delete(`comments/${commentId}`, {headers : {'Authorization': token}});
}