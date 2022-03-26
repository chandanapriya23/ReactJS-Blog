import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../utils/icons";
import DeleteModal from "./delete_modal";
import { deletePost } from "../services/posts";
import Comments from "./comments";
import UserContext from "./context";
import { navigate } from "@reach/router";

export default props => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postId, setPostId] = useState('');
    const user = useContext(UserContext);

    // Editing the post and sending it to parent
    const handleEdit = (data) => {
        props ?.onEdit({ "mode": 'Edit Post', "post_id": data ?.postId, "post_title": data ?.postTitle, "post_body": data ?.postBody});
    }

    // Handling Delete Model
    const handleDelete = (id) => {
        setShowDeleteModal(true);
        setPostId(id);
    }

    // Deleting the Post
    const confirmDelete = async () => {
        try {
            await deletePost(postId, user ?.token);
            setShowDeleteModal(false);
            props ?.onGetPosts();
        } catch (err) {
            console.log("Delete Post Error :", err);
            if (err ?.response ?.status == 401) {
                navigate('/');
            }
        }

    }

    // Displaying the Comments based on Post
    const handleComment = (id) => {
        if (document.getElementById('post' + id).style.display == "none") {
            document.getElementById('post' + id).style.display = 'block';
        } else {
            document.getElementById('post' + id).style.display = 'none';
        }
    }

    const renderUserInfo = (name) => {
        return (
            <div className="flex flex-row items-center m-2">
                <div className="m-1 mr-2 w-8 h-8 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase">
                    {name.charAt(0).toUpperCase()}
                </div>
                <h6 className="pl-1 dark:text-white mb-[0px]">{name.charAt(0).toUpperCase() + name.slice(1)}</h6>
            </div>
        )
    }

    const renderPostTitle = (title) => {
        return (
            <div className="flex flex-row items-center m-2">
                <h4 className="pl-1 dark:text-white">{title}</h4>
            </div>
        )
    }

    const renderPostBody = (body) => {
        return (
            <div className="flex flex-row items-center m-2">
                {/* <p className="pl-1 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap max-w-6xl">{post.body}</p> */}
                <p className="pl-1 dark:text-white">{body}</p>
            </div>
        )
    }

    const renderPostEditBtn = (id, title, body) => {
        return (
            <div className="inline-block flex-row items-center m-2" onClick={() => handleEdit({ "postId": id, "postTitle": title, "postBody": body })}>
                <button><FontAwesomeIcon icon={icons.actions["edit"]} className="text-blue-700" />
                    <span className="pl-1 dark:text-white text-blue-700">Edit</span></button>
            </div>
        )
    }

    const renderPostPostDeleteBtn = (id) => {
        return (
            <div className="inline-block flex-row items-center m-2" onClick={() => handleDelete(id)}>
                <button><FontAwesomeIcon icon={icons.actions["delete"]} className="text-red-500" />
                    <span className="pl-1 dark:text-white text-red-500">Delete</span></button>
            </div>
        )
    }

    const renderPostCommentBtn = (id, commentCount) => {
        return (
            <div className="inline-block flex-row items-center m-2" onClick={() => handleComment(id)}>
                <button><FontAwesomeIcon icon={icons.actions["comment"]} className="text-amber-600" />
                    <span className="pl-1 dark:text-white text-amber-600"> Comments({commentCount})</span></button>
            </div>
        )
    }

    return (
        <>
            <div >

                {
                    props.posts.map((post) => <div key={post.id} className="h-full w-auto mr-2 rounded-2xl bg-white mt-2 ml-4 shadow-[10px_5px_10px_gray] mb-[30px]">

                        <div className="pt-4 pr-2 pl-2 inline-block flex-row justify-around flex-wrap">

                            {renderUserInfo(post ?.user ?.display_name)}
                            {renderPostTitle(post ?.title)}
                            {renderPostBody(post.body)}

                            {user ?.data ?.id == post.user ?.id ?
                                <>
                                    {renderPostEditBtn(post ?.id, post ?.title, post ?.body)}
                                    {renderPostPostDeleteBtn(post.id)}
                                </> : "" }

                            {renderPostCommentBtn(post.id, post.comment_count)}
                        </div>

                        <div id={'post' + post.id} style={{ display: "none" }}><Comments postId={post.id} /></div>
                    </div>)
                }
            </div>
            {showDeleteModal ? <DeleteModal onDelete={confirmDelete} show={showDeleteModal} setShowDeleteModal={setShowDeleteModal} /> : ""}
        </>

    )
}