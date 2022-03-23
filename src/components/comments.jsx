import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../utils/icons";
import { getComments, createComment } from "../services/posts";

export default props => {
    const [isShow, setIsShow] = useState(false);
    const [addComment, setAddComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [mode, setMode] = useState('Read');

    const handleAddComment = () => {
        setIsShow(true);
    }

    const handleSubmit = async() => {
       const payload = {"comment": {"post_id": props.postId, "content": addComment}};
       const response = await createComment(payload);
       const refreshComments = await getComments(props.postId);
       setAllComments(refreshComments?.data?.comments);
       setAddComment('');
    }

    const handleChange = (e) => {
        setAddComment(e.target.value);
    }

    const handleEditComment = (id) =>{
        // setMode('Edit');
        console.log("COMMENET", document.getElementById('comment' + id));
        if(document.getElementById('comment' + id).style.display == "none"){
            document.getElementById('comment' + id).style.display = 'block';
        } else {
            document.getElementById('comment' + id).style.display = 'none';
        }
        
    }

    useEffect( async () => { 
        let response =  await getComments(props.postId);
        setAllComments([...response?.data?.comments]);
    },[props.postId]);

    return (
        <div>
            {
                allComments.map((comment) => <div key={comment.id}>
                        <h6>{comment.user.display_name}</h6>
                        <div id={'comment' + comment.id} >
                        {
                            mode == 'Read' ? <p>{comment.content}</p> 
                            : 
                            // <div id={'comment' + comment.id} >
                                <textarea rows="2" cols="50" value = {comment.content} onChange={handleChange}></textarea>
                            // </div>
                        }
                        </div>
                        <div>
                            <span><button onClick = {() => handleEditComment(comment.id)}><FontAwesomeIcon icon = {icons.actions["edit"]} className= "text-blue-700"/></button></span>
                            <span><button><FontAwesomeIcon icon = {icons.actions["delete"]} className= "text-amber-600"/></button></span>
                        </div>
                    </div>
                )
            }

            {isShow ? <div> <textarea id="textcomment" rows="2" cols="50" value = {addComment} placeholder="Type your comment here...." onChange={handleChange}></textarea> 
                <button onClick={handleSubmit}>Post</button></div> : ""
            }

            <div>
                <button className="text-blue" onClick= {handleAddComment}>Add Comment</button>
            </div>
        </div>
    )
}        