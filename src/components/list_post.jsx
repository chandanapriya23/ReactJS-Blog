import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../utils/icons";
import DeleteModal from "./delete_modal";
import { deletePost } from "../services/posts";
import Comments from "./comments";

export default props => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postId, setPostId] = useState('');

    const handleEdit = (data) => {
        props?.onEdit({"mode" : 'Edit Post', "post_id" : data?.postId, "post_title": data?.postTitle, "post_body" : data?.postBody});
    }

    const handleDelete = (id) => {
        setShowDeleteModal(true);
        setPostId(id);
    }

    const confirmDelete = async () => {
        await deletePost(postId);
    }

    const handleComment = (id) => {
        if(document.getElementById('post' + id).style.display == "none"){
            document.getElementById('post' + id).style.display = 'block';
        } else {
            document.getElementById('post' + id).style.display = 'none';
        }
    }

    return(
        <>
            <h3 className="m-2 text-xl font-bold dark:text-white"> All Posts </h3>
            <div className="mb-20">

                {
                    props.posts.map((post) => <div key = {post.id} className="h-full w-auto mr-2 rounded-2xl bg-white mt-2 ml-4 shadow-[10px_5px_10px_gray] mb-[30px]">
                        <div  className="pt-4 pr-2 pl-2 inline-block flex-row justify-around flex-wrap">

                            <div className="flex flex-row items-center m-2">
                                <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase">
                                    {post.user.display_name.charAt(0).toUpperCase()}
                                </div>
                                <h6 className="pl-1 dark:text-white">{post.user.display_name}</h6> 
                            </div>

                            <div className="flex flex-row items-center m-2">
                                <h4 className="pl-1 dark:text-white">{post.title}</h4>
                            </div>
                            
                            <div className="flex flex-row items-center m-2">
                                {/* <p className="pl-1 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap max-w-6xl">{post.body}</p> */}
                                <p className="pl-1 dark:text-white">{post.body}</p>
                            </div>

                            <div className="inline-block flex-row items-center m-2" onClick={() => handleEdit({"postId" : post.id, "postTitle" : post.title, "postBody" : post.body})}>
                                <button><FontAwesomeIcon icon = {icons.actions["edit"]} className= "text-blue-700"/>
                                <span className="pl-1 dark:text-white text-blue-700">Edit</span></button>
                            </div>

                            <div className="inline-block flex-row items-center m-2" onClick={() => handleDelete(post.id)}>
                                <button><FontAwesomeIcon icon = {icons.actions["delete"]} className= "text-red-500"/>
                                <span className="pl-1 dark:text-white text-red-500">Delete</span></button>
                            </div>

                            <div className="inline-block flex-row items-center m-2" onClick={() => handleComment(post.id)}>
                                <button><FontAwesomeIcon icon = {icons.actions["comment"]} className= "text-amber-600"/>
                                <span className="pl-1 dark:text-white text-amber-600"> Comments({post.comment_count})</span></button>
                            </div>
                            
                        </div>
                        <div id={'post'+post.id} style={{display:"none"}}><Comments postId = {post.id}/></div>
                    </div>)
                }
            </div>
            {showDeleteModal ? <DeleteModal onDelete = {confirmDelete} show={showDeleteModal} setShowDeleteModal={setShowDeleteModal}/> : ""}
        </>
        
    )
}