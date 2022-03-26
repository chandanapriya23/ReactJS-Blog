import React, { useState, useEffect } from "react";
import ListPost from "../components/list_post";
import CreateEditModal from "../components/create_edit_modal";
import { createPost, getPosts, editPost } from "../services/posts";
import { CREATE_POST } from "../utils/constants";
import UserContext from "../components/context";
import Alert from "../components/alert";
import { navigate } from "@reach/router";

export default props => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [posts, setPosts] = useState([]);
    const [editPostData, setEditPostData] = useState({"id":'', "title": '', "body":''});
    const [postId, setPostId] = useState('');
    const [spinner, showSpinner] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Creating & Editing Post API call
    const handleSave = async (data) => {
        try{
            if(modalMode === CREATE_POST){
                const createPayload = {"post": {"title": data?.title, "body": data?.body}}
                // showSpinner(true);
                const response = await createPost(createPayload, data?.token);
                console.log("Response", response);
                if(response?.error && (response.error == "Signature has expired")){
                    navigate('/');
                }
                setIsShowModal(false);
                // showSpinner(false);
                setShowMessage(true);
                handleGetPosts();
            } else {
                const editPayload = {"post" : {"title" : data?.title, "body" : data?.body }}
                const response = await editPost(postId, editPayload, data?.token);
                console.log("EDIT PST RESPONSE", response);
                setIsShowModal(false);
                handleGetPosts();
            }
        } catch (err){
            console.log("ERROR :", err);
            if(err?.response?.status == 401){
                navigate('/');
            }
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

    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    }

    const renderNavigationHeader = () => {
        return(
            <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                    <span className="font-semibold text-3xl tracking-tight italic">Brivity Blog</span>
                </div>

                <div className="hidden w-full block lg:flex items-center w-auto" id="menu">
                    <h5 className="pl-1 text-emerald-100 pr-[0.5em] italic">{props?.location?.state?.data?.display_name}</h5>
                    <div className="w-12 h-12 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase">
                        {props?.location?.state?.data?.display_name.charAt(0).toUpperCase()}
                    </div>
                </div>
            </nav>
        )
    }

    const renderPagination = () => {
        return (
            <div className="col-3 mt-[1em]">
                <nav>
                    <ul className="inline-flex -space-x-px">
                        <li>
                            <a onClick = {() => handleCurrentPage(currentPage - 1)} className="py-2 px-3 ml-0 leading-tight text-fuchsia-400 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a onClick = {() => handleCurrentPage(1)} className="py-2 px-3 leading-tight text-fuchsia-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a onClick = {() => handleCurrentPage(2)} className="py-2 px-3 leading-tight text-fuchsia-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a onClick = {() => handleCurrentPage(currentPage + 1)} className="py-2 px-3 leading-tight text-fuchsia-400 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    const renderCreatePostBtn = () => {
        return (
            <div className="col-3 mt-[0.5em]"> 
                <button className = "rounded bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 hover:bg-gradient-to-br py-2 px-4 text-white" onClick={() => handleModal()}>Create Post</button>
            </div>
        )
    }

    const renderAlertMessage = () => {
        return (
            <div className = "col-6">
                {showMessage && <Alert message = {modalMode == CREATE_POST ? "Post has been successfully created." : "Post has been successfully updated."}/>}
            </div>
        )
    }

    const renderFooterHeader = () => {
        return (
            <footer className="py-3 bg-gray-700 text-center text-white">
                Copyright © 2022 Brivity. All rights reserved
            </footer>
        )
    }

    const handleGetPosts = async() => {
        let response =  await getPosts(currentPage);
        setPosts([...response?.data?.posts]);
    }

    useEffect( async () => { 
        if(props?.location?.state?.data == undefined || props?.location?.state?.data == null){
            navigate('/');
        } else {
            // handleGetPosts();
            let response =  await getPosts(currentPage);
            setPosts([...response?.data?.posts]);
        }
    },[currentPage]);
    
    return (
        <>
            <UserContext.Provider value = {props.location.state}>
                <div className = "bg-gray-200"> 
                    {renderNavigationHeader()}
                    <div className="p-4 row">
                        {renderCreatePostBtn()}
                        {renderAlertMessage()}
                        {renderPagination()}
                    </div>
                    {isShowModal ? <CreateEditModal spinner = {spinner} mode={modalMode} onSave={handleSave} editData={editPostData} show= {isShowModal} setIsShowModal={setIsShowModal}/> : ""}
                    <ListPost posts = {posts} onEdit={handleEdit} onGetPosts = {handleGetPosts}></ListPost>
                    {renderPagination()}
                    {renderFooterHeader()}
                </div>
            </UserContext.Provider>
        </>
    )
}