import React, {useEffect, useState, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../utils/icons";
import { getComments, createComment, deleteComment, editCommentAPI } from "../services/comments";
import UserContext from "./context";
import { navigate } from "@reach/router";

export default props => {
    const [addComment, setAddComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const user = useContext(UserContext);
    const [mode, setMode] = useState('create');
    const [editComment, setEditComment] = useState('');

    const handleSubmit = async() => {
        try{
            const payload = {"comment": {"post_id": props.postId, "content": addComment}};
            await createComment(payload, user?.token);
            handleGetComments();
            setAddComment('');
        } catch(err){
            console.log("Create Comment Error :", err);
            if(err?.response?.status == 401){
                navigate('/');
            }
        }
    }

    const handleChange = (e) => {
        if(mode == 'create'){
            setAddComment(e.target.value);
        } else{
            setEditComment(e.target.value);
        }
    }

    const handleEditComment = (id, content) =>{
        setEditComment(content);
        document.getElementById('comment' + id).style.display ="none";
        document.getElementById('editcomment' + id).style.display = 'block';
        setMode('edit');
    }

    const handleGetComments = async () => {
        const response = await getComments(props.postId);
        setAllComments([...response?.data?.comments]);
    }

    const handleDeleteComment = async(commentId) => {
        try{
            await deleteComment(commentId, user?.token); 
            handleGetComments();
        } catch(err){
            console.log("Delete Comment Error :", err);
            if(err?.response?.status == 401){
                navigate('/');
            }
        }
    }

    const handleEditSubmit = async (commentId) => {
        try{
            const payload = {"comment": {"contents": editComment}};
            const response = await editCommentAPI(payload, commentId, user?.token);
            document.getElementById('editcomment' + commentId).style.display = 'none';
            document.getElementById('comment' + commentId).style.display ="block";
            handleGetComments();
            setMode('create');
        } catch(err){
            console.log("Edit Comment Error :", err);
            if(err?.response?.status == 401){
                navigate('/');
            }
        }
        
    }

    const renderAddComment = () => {
        return(
            <div className="flex"> 
                <textarea className = "border transparent hover:border-indigo-300" id="textcomment" rows="2" cols="50" value = {addComment} placeholder="Type your comment here...." onChange={handleChange}></textarea>
                <button className="text-white p-[1em] !important rounded-lg bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br py-2" onClick= {handleSubmit}>Add Comment</button>
            </div>
        )
    }

    const renderEditDeleteComment = (commentUserId, commentId, commentContent) => {
        return(
            <>
                {user.data.id == commentUserId ?
                    <div>
                        <button className="mr-[30px]" onClick={() => handleEditComment(commentId, commentContent)}>
                            <FontAwesomeIcon icon = {icons.actions["edit"]} className= "text-blue-700"/>
                            <span className="pl-1 dark:text-white text-blue-700">Edit</span>
                        </button>
                        <button onClick = {() => handleDeleteComment(commentId)}>
                            <FontAwesomeIcon icon = {icons.actions["delete"]} className= "text-amber-600"/>
                            <span className="pl-1 dark:text-white text-red-500">Delete</span>
                        </button>
                    </div> 
                : ""}
            </>
        )
    }

    useEffect( async () => { 
        handleGetComments();
    },[props.postId]);


    return (
        <div className="p-[1em] !important mx-[40px]">
            {
                allComments.map((comment) => <div key={comment.id} className="p-[1em] !important bg-[rgba(219,234,254,0.5)] rounded-[20px] mb-[12px]">
                        <h6 className="">{comment.user.display_name}</h6>
                        <p id ={'comment' + comment.id }>{comment.content}</p>

                        <div id={'editcomment' + comment.id} style={{display:"none"}}>
                            <textarea className = "border border-slate-300 hover:border-indigo-300" id = {'textarea' + comment.id} rows="2" cols="50" value = {editComment} onChange={(e) => handleChange(e)}>
                            </textarea>
                            <button className = "py-2 rounded-md p-[0.5em] bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br text-white" onClick = {() => handleEditSubmit(comment.id)}> Save </button>
                        </div>

                        {renderEditDeleteComment(comment.user.id, comment.id, comment.content)}
                    </div>
                )
            }
            {renderAddComment()}
        </div>
    )
} 