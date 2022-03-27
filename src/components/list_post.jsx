import React, { useState, useContext } from 'react';
import DeleteModal from "./delete_modal";
import { deletePost } from "../services/posts";
import UserContext from "./context";
import { navigate } from "@reach/router";
import Post from "./post";

export default props => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postId, setPostId] = useState('');
    const user = useContext(UserContext);

    // Editing the post and sending it to parent
    const handleEdit = (data) => {
        props?.onEdit({ "mode": 'Edit Post', "post_id": data?.postId, "post_title": data?.postTitle, "post_body": data?.postBody});
    }

    // Handling Delete Model
    const handleDelete = (id) => {
        setShowDeleteModal(true);
        setPostId(id);
    }

    // Deleting the Post
    const confirmDelete = async () => {
        try {
            await deletePost(postId, user?.token);
            setShowDeleteModal(false);
            props?.deleteAlertMessage();
            props?.onGetPosts();
        } catch (err) {
            console.log("Delete Post Error :", err);
            if (err ?.response ?.status == 401) {
                navigate('/');
            }
        }
    }

    return (
        <>
            <div >
                {
                    props.posts.map((post) => <div key={post.id} className="h-full w-auto mr-2 rounded-2xl bg-white mt-2 ml-4 shadow-[10px_5px_10px_gray] mb-[30px]">
                        <Post postData = {post} userToken = {user?.token} userPostId = {user?.data?.id} onEdit={props?.onEdit} deleteModal={handleDelete}/>
                    </div>)
                }
            </div>
            {showDeleteModal ? <DeleteModal onDelete={confirmDelete} show={showDeleteModal} setShowDeleteModal={setShowDeleteModal} onGetPosts={props?.onGetPosts} deleteAlertMessage={props?.deleteAlertMessage}/> : ""}
        </>
    )
}