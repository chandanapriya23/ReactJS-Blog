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
            setEditComment(e.target.value)
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
            console.log("PAYLOADD", payload);
            const response = await editCommentAPI(payload, commentId, user?.token);
            console.log("RESSS", response);
            document.getElementById('editcomment' + commentId).style.display = 'none';
            document.getElementById('comment' + commentId).style.display ="block";
            // setEditComment
            handleGetComments();
        } catch(err){
            console.log("Edit Comment Error :", err);
            if(err?.response?.status == 401){
                navigate('/');
            }
        }
        
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
                            <textarea id = {'textarea' + comment.id} rows="2" cols="50" value = {editComment} onChange={(e) => handleChange(e)}>
                            </textarea>
                            <button onClick = {() => handleEditSubmit(comment.id)}> EDIT </button>
                        </div>

                        {/* Displaying the Edit, Delete buttons */}
                        {user.data.id == comment.user.id ?
                        <div>
                            <button className="mr-[30px]" onClick={() => handleEditComment(comment.id, comment.content)}>
                                <FontAwesomeIcon icon = {icons.actions["edit"]} className= "text-blue-700"/>
                                <span className="pl-1 dark:text-white text-blue-700">Edit</span>
                            </button>
                            <button onClick = {() => handleDeleteComment(comment.id)}>
                                <FontAwesomeIcon icon = {icons.actions["delete"]} className= "text-amber-600"/>
                                <span className="pl-1 dark:text-white text-red-500">Delete</span>
                            </button>
                        </div> 
                        : ""}
                    </div>
                )
            }

            <div> 
                <textarea id="textcomment" rows="2" cols="50" value = {addComment} placeholder="Type your comment here...." onChange={handleChange}></textarea>
                <button className="text-white p-[1em] !important rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br px-4 py-2" onClick= {handleSubmit}>Add Comment</button>
            </div>
        </div>
    )
} 