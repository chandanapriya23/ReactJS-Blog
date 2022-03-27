import React, {useEffect, useState, useContext} from "react";
import { getComments, createComment } from "../services/comments";
import UserContext from "./context";
import { navigate } from "@reach/router";
import Comment from "./comment";

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
        setAddComment(e.target.value);
    }

    const handleGetComments = async () => {
        const response = await getComments(props.postId);
        setAllComments([...response?.data?.comments]);
    }

    const renderAddComment = () => {
        return(
            <div className="flex"> 
                <textarea className = "border transparent hover:border-indigo-300" id="textcomment" rows="2" cols="50" value = {addComment} placeholder="Type your comment here...." onChange={handleChange}></textarea>
                <button className="text-white p-[1em] !important rounded-lg bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br py-2" onClick= {handleSubmit}>Add Comment</button>
            </div>
        )
    }

    const onRefreshComments = () => {
        handleGetComments();
    }

    useEffect( async () => { 
        handleGetComments();
    },[props.postId]);


    return (
        <div className="p-[1em] !important mx-[40px]">
            {
                allComments.map((comment) => <div key={comment.id} className="p-[1em] !important bg-[rgba(219,234,254,0.5)] rounded-[20px] mb-[12px]">
                        <h6 className="">{comment.user.display_name}</h6>
                        <Comment commentData = {comment} userToken = {user?.token} userId = {user.data.id} refreshComments = {onRefreshComments}/>
                    </div>
                )
            }
            {renderAddComment()}
        </div>
    )
} 