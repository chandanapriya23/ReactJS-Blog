import React, {useEffect, useState, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../utils/icons";
import { getComments, createComment, deleteComment } from "../services/posts";
import UserContext from "./context";

export default props => {
    const [isShow, setIsShow] = useState(false);
    const [addComment, setAddComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const user = useContext(UserContext);
    // const [mode, setMode] = useState('Read');

    const handleAddComment = () => {
        setIsShow(true);
    }

    const handleSubmit = async() => {
        const payload = {"comment": {"post_id": props.postId, "content": addComment}};
        const response = await createComment(payload);
        handleGetComments();
        setAddComment('');
    }

    const handleChange = (e) => {
        setAddComment(e.target.value);
    }

    // const handleEditComment = (id) =>{
    //     // setMode('Edit');
    //     console.log("COMMENET", document.getElementById('comment' + id));
    //     if(document.getElementById('comment' + id).style.display == "none"){
    //         document.getElementById('comment' + id).style.display = 'block';
    //     } else {
    //         document.getElementById('comment' + id).style.display = 'none';
    //     }
        
    // }

    const handleGetComments = async () => {
        const response = await getComments(props.postId);
        setAllComments([...response?.data?.comments]);
    }

    const handleDeleteComment = async(commentId) => {
        const response = await deleteComment(commentId); 
        handleGetComments();
    }

    useEffect( async () => { 
        handleGetComments();
    },[props.postId]);

    return (
        <div className="p-[1em] !important mx-[40px]">
            {
                allComments.map((comment) => <div key={comment.id} className="p-[1em] !important bg-blue-100 mb-[12px]">
                        <h6>{comment.user.display_name}</h6>
                        <p>{comment.content}</p>
                        {/* <div id={'comment' + comment.id}>{ mode == 'Read' ? <p>{comment.content}</p> : } */}

                            {/* <div> */}
                                {/* <textarea rows="2" cols="50" value = {comment.content} onChange={handleChange}></textarea> */}
                            {/* </div> */}

                        {/* }</div> */}
                        {user.id == comment.user.id ?
                        <div>
                            <button className="mr-[30px]">
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

            {isShow ? <div> <textarea id="textcomment" rows="2" cols="50" value = {addComment} placeholder="Type your comment here...." onChange={handleChange}></textarea> 
                <button className = "rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br px-4 py-2 text-white" onClick={handleSubmit}>Submit</button></div> : ""
            }

            <div>
                <button className="text-white p-[1em] !important rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br px-4 py-2" onClick= {handleAddComment}>Add Comment</button>
            </div>
        </div>
    )
}        

{/* <span><button onClick = {() => handleEditComment(comment.id)}></button> */}
// class="rounded-full bg-indigo-500 px-4 py-2 text-white
// bg-indigo-500 px-2 py-1 text-white
// rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br px-4 py-2 text-white