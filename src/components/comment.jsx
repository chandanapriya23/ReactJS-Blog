import { editCommentAPI, deleteComment } from "../services/comments";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../utils/icons";
import { navigate } from "@reach/router";

export default props => {

    const [edit, setEdit] = useState(false);
    const [editComment, setEditComment] = useState('');

    const handleEditComment = (id, content) => {
        setEditComment(content);
        setEdit(true);
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId, props.userToken);
            props.refreshComments();
        } catch (err) {
            console.log("Delete Comment Error :", err);
            if (err ?.response ?.status == 401) {
                navigate('/');
            }
        }
    }

    const renderEditDeleteComment = (commentUserId, commentId, commentContent) => {
        return (
            <>
                {props.userId == props.commentData.user.id ?
                    <div>
                        <button className="mr-[30px]" onClick={() => handleEditComment(commentId, commentContent)}>
                            <FontAwesomeIcon icon={icons.actions["edit"]} className="text-blue-700" />
                            <span className="pl-1 dark:text-white text-blue-700">Edit</span>
                        </button>
                        <button onClick={() => handleDeleteComment(commentId)}>
                            <FontAwesomeIcon icon={icons.actions["delete"]} className="text-amber-600" />
                            <span className="pl-1 dark:text-white text-red-500">Delete</span>
                        </button>
                    </div>
                    : ""}
            </>
        )
    }

    const handleEditSubmit = async (commentId) => {
        try {
            const payload = { "comment": { "contents": editComment } };
            const response = await editCommentAPI(payload, commentId, props.userToken);
            props.refreshComments();
            setEdit(false);
        } catch (err) {
            console.log("Edit Comment Error :", err);
            if (err ?.response ?.status == 401) {
                navigate('/');
            }
        }

    }

    const handleChange = (e) => {
        setEditComment(e.target.value);
    }

    return (
        <>
            {!edit && <p>{props.commentData.content}</p>}
            {edit && <div className="flex">
                <textarea className="border border-slate-300 hover:border-indigo-300" value={editComment} onChange={(e) => handleChange(e)} />
                <button className="py-2 rounded-md p-[0.5em] bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br text-white" onClick={() => handleEditSubmit(props.commentData.id)}> Save </button>
            </div>}
            {renderEditDeleteComment(props.commentData.user.id, props.commentData.id, props.commentData.content)}
        </>
    )

}