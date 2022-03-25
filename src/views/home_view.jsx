import React, { useState, useEffect } from "react";
import ListPost from "../components/list_post";
import CreateEditModal from "../components/create_edit_modal";
import { createPost, getPosts, editPost } from "../services/posts";
import { CREATE_POST } from "../utils/constants";
import UserContext from "../components/context";
import Alert from "../components/alert";
import { navigate } from "@reach/router";
import { number } from "prop-types";

export default props => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [posts, setPosts] = useState([]);
    const [editPostData, setEditPostData] = useState({"id":'', "title": '', "body":''});
    const [postId, setPostId] = useState('');
    // const [spinner, showSpinner] = useState(false);
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
            } else {
                const editPayload = {"post" : {"title" : data?.title, "body" : data?.body }}
                const response = await editPost(postId, editPayload, data?.token);
                console.log("EDIT PST RESPONSE", response);
                setIsShowModal(false);
            }
        } catch (err){
            console.log("ERROR :", err);
            // if(err?.response?.status == 401){
            //     navigate('/');
            // }
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

    // Get Posts by Page - API Call
    const handlePostByPage = async (e) => {
        console.log("E VALUEEE", e);
        let pageNum;
        if(Number.isInteger(e)){
            pageNum = e;
            setCurrentPage(pageNum);
        } else{
            pageNum = e?.target?.innerText;
            setCurrentPage(pageNum);
        }
        let response =  await getPosts(pageNum);
        setPosts([...response?.data?.posts]);
    }

    const pageCalculate = (e) => {
        console.log("PAGE", e?.target?.innerText);
        if(e?.target?.innerText == "Previous"){
            console.log("PREVIOUS COMING");
            setCurrentPage(parseInt(currentPage) - 1);
        } else if(e?.target?.innerText == "Next"){
            console.log("NEXT COMING");
            setCurrentPage(parseInt(currentPage) + 1);
        } else {
            setCurrentPage(e?.target?.innerText);
        }
        console.log("CUREENET PAGE", currentPage);
        handlePostByPage(currentPage);
        // setCurrentPage(e?.target?.innerText);
    }

    const navigationHeader = () => {
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

    const pagination = () => {
        return (
            <div className="ml-[75%]">
                <nav>
                    <ul className="inline-flex -space-x-px">
                        <li>
                        <a onClick = {(e) => pageCalculate(e)} className="py-2 px-3 ml-0 leading-tight text-fuchsia-400 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                        <a onClick = {(e) => handlePostByPage(e)} className="py-2 px-3 leading-tight text-fuchsia-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                        <a onClick = {(e) => handlePostByPage(e)} className="py-2 px-3 leading-tight text-fuchsia-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                        <a onClick = {(e) => handlePostByPage(e)} className="py-2 px-3 leading-tight text-fuchsia-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                        </li>
                        <li>
                        <a onClick = {(e) => handlePostByPage(e)} className="py-2 px-3 leading-tight text-fuchsia-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                        <a onClick = {(e) => pageCalculate(e)} className="py-2 px-3 leading-tight text-fuchsia-400 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    const createPostBtn = () => {
        return (
            <div className="col-3"> 
                <button className = "rounded bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 hover:bg-gradient-to-br py-2 px-4 text-white" onClick={() => handleModal()}>Create Post</button>
            </div>
        )
    }

    const alertMessage = () => {
        return (
            <div className = "col-6">
                {showMessage && <Alert message = {modalMode == CREATE_POST ? "Post has been successfully created." : "Post has been successfully updated."}/>}
            </div>
        )
    }

    const footerHeader = () => {
        return (
            <footer className="py-3 bg-gray-700 text-center text-white">
                Copyright © 2022 Brivity. All rights reserved
            </footer>
        )
    }


    useEffect( async () => { 
        if(props?.location?.state?.data == undefined || props?.location?.state?.data == null){
            navigate('/');
        } else {
            let response =  await getPosts(1);
            setPosts([...response?.data?.posts]);
        }
    },[currentPage]);
    
    return (
        <>
            <UserContext.Provider value = {props.location.state}>
                <div className = "bg-gray-200"> 

                    {navigationHeader()}

                    <div className="p-4 row">
                        {createPostBtn()}
                        {alertMessage()}
                    </div>

                    {isShowModal ? <CreateEditModal mode={modalMode} onSave={handleSave} editData={editPostData} show= {isShowModal} setIsShowModal={setIsShowModal}/> : ""}
                    <ListPost posts = {posts} onEdit={handleEdit}></ListPost>
                    
                    {pagination()}
                    {footerHeader()}
                </div>
            </UserContext.Provider>
        </>
    )
}