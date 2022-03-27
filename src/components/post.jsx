import { editCommentAPI, deleteComment } from "../services/comments";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../utils/icons";
import { navigate } from "@reach/router";
import Comments from "./comments";

export default props => {

    const [postId, setPostId] = useState('');
    const [isShow, setIsShow] = useState(false);

    const handleEdit = (data) => {
        props?.onEdit({ "mode": 'Edit Post', "post_id": data?.postId, "post_title": data?.postTitle, "post_body": data?.postBody});
    }

    // Handling Delete Model
    const handleDelete = (id) => {
        props?.deleteModal(id);
    }

    // Displaying the Comments based on Post
    const handleComment = (id) => {
        setIsShow(true);
    }

    const renderUserInfo = (name) => {
        return (
            <div className="flex flex-row items-center m-2">
                <div className="m-1 mr-2 w-8 h-8 relative flex justify-center items-center rounded-full text-xl text-white uppercase bg-orange-500">
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

    const renderPostInfo = (displayName, postId, postTitle, postBody, commentCount, postUserId) => {
        return (
            <>
                <div className="pt-4 pr-2 pl-2 inline-block flex-row justify-around flex-wrap">

                    {renderUserInfo(displayName)}
                    {renderPostTitle(postTitle)}
                    {renderPostBody(postBody)}

                    {props.userPostId == postUserId ?
                        <>
                            {renderPostEditBtn(postId, postTitle, postBody)}
                            {renderPostPostDeleteBtn(postId)}
                        </> : "" }

                    {renderPostCommentBtn(postId, commentCount)}
                </div>

                {isShow && <div><Comments postId={postId} /></div>}
            </>
        )
    }

    return(
        <>
            {renderPostInfo(props.postData?.user?.display_name, props.postData?.id, props.postData?.title, props.postData?.body, props.postData?.comment_count, props.postData?.user?.id)}
        </> 
    ) 
}