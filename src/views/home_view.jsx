import React, { useState, useEffect } from "react";
import ListPost from "../components/list_post";
import { Button  } from 'react-bootstrap';
import CreateEditModal from "../components/create_edit_modal";
import { createPost, getPosts, editPost } from "../services/posts";
import { CREATE_POST } from "../utils/constants";

export default props => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [posts, setPosts] = useState([]);
    const [editPostData, setEditPostData] = useState({"id":'', "title": '', "body":''});
    const [postId, setPostId] = useState('');

    const handleSave = async (data) => {
        if(modalMode == CREATE_POST){
            const createPayload = {"post": {"title": data?.title, "body": data?.body}}
            const response = await createPost(createPayload);
        } else {
            const editPayload = {"post" : {"title" : data?.title, "body" : data?.body }}
            const response = await editPost(postId, editPayload);
        }
    }

    const handleEdit = async (data) => {
        setEditPostData({"id": data?.post_id, "title" : data?.post_title, "body" : data?.post_body});
        setModalMode(data?.mode);
        setIsShowModal(true);
        setPostId(data?.post_id);
    }

    const handleModal = () => {
        setIsShowModal(true);
        setModalMode(CREATE_POST);
    }

    useEffect( async () => { 
        let response =  await getPosts();
        setPosts([...response?.data?.posts]);
    },[]);
    
    return (
        <>
            <figure className="h-full bg-amber-200">
            <Button onClick={() => handleModal()}>Create Post</Button>
            {isShowModal ? <CreateEditModal mode={modalMode} onSave={handleSave} editData={editPostData} show= {isShowModal} setIsShowModal={setIsShowModal}/> : ""}
            <ListPost posts = {posts} onEdit={handleEdit}></ListPost>
            </figure>
        </>
    )
}