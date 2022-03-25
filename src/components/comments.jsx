import React, {useEffect, useState, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../utils/icons";
import { getComments, createComment, deleteComment } from "../services/comments";
import UserContext from "./context";

export default props => {
    const [addComment, setAddComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const user = useContext(UserContext);
    const [mode, setMode] = useState('Read');


    const handleSubmit = async() => {
        try{
            const payload = {"comment": {"post_id": props.postId, "content": addComment}};
            await createComment(payload, user?.token);
            handleGetComments();
            setAddComment('');
        } catch(err){
            console.log("Create Comment Error :", err);
            // if(err?.response?.status == 401){
            //     navigate('/');
            // }
        }
    }

    const handleChange = (e) => {
        setAddComment(e.target.value);
    }

    // const handleEditComment = (id) =>{
    //     console.log("IDDD", id);
    //     setMode('Edit');
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
        try{
            await deleteComment(commentId, user?.token); 
            handleGetComments();
        } catch(err){
            console.log("Delete Comment Error :", err);
            // if(err?.response?.status == 401){
            //     navigate('/');
            // }
        }
    }

    useEffect( async () => { 
        handleGetComments();
    },[props.postId]);

    // console.log("Mode", mode);

    return (
        <div className="p-[1em] !important mx-[40px]">
            {
                allComments.map((comment) => <div key={comment.id} className="p-[1em] !important bg-[rgba(219,234,254,0.5)] rounded-[20px] mb-[12px]">
                        <h6 className="">{comment.user.display_name}</h6>
                        <p>{comment.content}</p>

                        {/* <div id={'comment' + comment.id}>{ mode == 'Read' ? <p>{comment.content}</p> :

                            <div>
                                <textarea rows="2" cols="50" value = {comment.content} onChange={handleChange}></textarea>
                            </div>

                        }</div> */}

                        {/* Displaying the Edit, Delete buttons */}
                        {user.data.id == comment.user.id ?
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

            <div> 
                <textarea id="textcomment" rows="2" cols="50" value = {addComment} placeholder="Type your comment here...." onChange={handleChange}></textarea>
                <button className="text-white p-[1em] !important rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br px-4 py-2" onClick= {handleSubmit}>Add Comment</button>
            </div>
        </div>
    )
} 