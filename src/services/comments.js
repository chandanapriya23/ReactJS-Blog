import Request from "../utils/host";

const POST_URL = 'posts';

// API call for List all comments
export const getComments = (postId) => {
    return Request.get(`${POST_URL}/${postId}/comments`);
}

// API call for Creating a comment
export const createComment = (payload,token) => {
    return Request.post("comments", payload, {headers : {'Authorization': token}});
}

// API call for Editing the Comment
export const editCommentAPI = (payload, commentId, token) => {
    return Request.patch(`comments/${commentId}`, payload, {headers : {'Authorization': token}});
}

// API call for Deleting the Comment
export const deleteComment = (commentId, token) => {
    return Request.delete(`comments/${commentId}`, {headers : {'Authorization': token}});
}