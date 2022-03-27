import React, { useState, useEffect } from "react";
import ListPost from "../components/list_post";
import CreateEditModal from "../components/create_edit_modal";
import { createPost, getPosts, editPost } from "../services/posts";
import { CREATE_POST, DELETE_POST } from "../utils/constants";
import UserContext from "../components/context";
import Alert from "../components/alert";
import { navigate } from "@reach/router";
import BBLogo from "../images/BBLogo.png";

export default props => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [posts, setPosts] = useState([]);
    const [editPostData, setEditPostData] = useState({ "id": '', "title": '', "body": '' });
    const [postId, setPostId] = useState('');
    const [spinner, showSpinner] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Creating & Editing Post API call
    const handleSave = async (data) => {
        try {
            if (modalMode === CREATE_POST) {
                const createPayload = { "post": { "title": data ?.title, "body": data ?.body} };
                showSpinner(true);
                const response = await createPost(createPayload, data ?.token);
                // if (response ?.error && (response.error == "Signature has expired")) {
                //     navigate('/');
                // }
                setIsShowModal(false);
                showSpinner(false);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
                handleGetPosts();
            } else {
                const editPayload = { "post": { "title": data ?.title, "body": data ?.body } };
                showSpinner(true);
                const response = await editPost(postId, editPayload, data ?.token);
                setIsShowModal(false);
                showSpinner(false);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
                handleGetPosts();
            }
        } catch (err) {
            console.log("ERROR :", err);
            if (err ?.response ?.status == 401) {
                navigate('/');
            }
        }
    }

    const handleEdit = async (data) => {
        setEditPostData({ "id": data ?.post_id, "title": data ?.post_title, "body": data ?.post_body});
        setModalMode(data ?.mode);
        setIsShowModal(true);
        setPostId(data ?.post_id);
    }

    const handleModal = () => {
        setIsShowModal(true);
        setModalMode(CREATE_POST);
    }

    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    }

    const renderNavigationHeader = () => {
        return (
            <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-6">
                {renderLogoTitle()}
                {renderUserPtofile()}
            </nav>
        )
    }

    const renderLogoTitle = () => {
        return (
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                {/* <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg> */}
                {/* <img src="https://brivitymktg.wpengine.com/wp-content/uploads/2019/09/Brivity-Platform-600px-logo.png" width="54" height="54" alt="Brivity" id="logo" data-height-percentage="52" data-actual-width="597" data-actual-height="166"/> */}
                <img src={BBLogo} width="70" height="65" />
                <span className="font-semibold text-4xl tracking-tight">Brivtter</span>
            </div>
        )
    }

    const renderUserPtofile = () => {
        return (
            <div className="hidden w-full block lg:flex items-center w-auto" id="menu">
                <h5 className="pl-1 text-emerald-100 pr-[0.5em]">{props ?.location ?.state ?.data ?.display_name}</h5>
                <div className="w-12 h-12 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase">
                    {props ?.location ?.state ?.data ?.display_name.charAt(0).toUpperCase()}
                </div>
            </div>
        )
    }

    const renderPagination = () => {
        return (
            <div className="col-4 mt-[1em] cursor-pointer">
                <nav>
                    <ul className="inline-flex -space-x-px float-right">
                        <li>
                            {currentPage!==1 && <a onClick={() => handleCurrentPage(currentPage - 1)} className="py-2 px-3 ml-0 leading-tight text-black bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>}
                        </li>
                        {Array.from(Array(totalPages), (e, i) => {
                            return <li key={i}><a onClick={() => handleCurrentPage(i+1)} className={`py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage == i+1 ? 'text-white bg-cyan-800' : 'text-black bg-white'}`}>{i+1}</a></li>
                        })}
                        <li>
                           {totalPages !== currentPage && <a onClick={() => handleCurrentPage(currentPage + 1)} className="py-2 px-3 leading-tight text-black bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>}
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    const renderCreatePostBtn = () => {
        return (
            <div className="col-2 mt-[0.5em]">
                <button className="rounded-lg bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br py-2 px-4 text-white" onClick={() => handleModal()}>Create Post</button>
            </div>
        )
    }

    const renderAlertMessage = () => {
        return (
            <div className="col-6">
                {showMessage && <Alert message={modalMode == CREATE_POST ? "Post has been successfully created." : modalMode == DELETE_POST ? "Post has been successfully deleted" : "Post has been successfully updated."} />}
            </div>
        )
    }

    const renderFooterHeader = () => {
        return (
            <footer className="py-3 bg-gray-700 text-center text-white">
                Copyright © 2022 Brivtter. All rights reserved
            </footer>
        )
    }

    const handleGetPosts = async () => {
        const response = await getPosts(currentPage);
        setPosts([...response ?.data ?.posts]);
        const metaData = response?.data?.meta;
        setTotalPages(Math.ceil(metaData.total_entries/metaData.per_page));
    }

    const deleteAlertMessage = () => {
        setModalMode(DELETE_POST);
        setShowMessage(true);
        renderAlertMessage();
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    }

    useEffect(async () => {
        if (props ?.location ?.state ?.data == undefined || props ?.location ?.state ?.data == null) {
            navigate('/');
        } else {
            handleGetPosts();
        }
    }, [currentPage]);

    return (
        <>
            <UserContext.Provider value={props.location.state}>
                <div className="bg-gray-200">
                    {renderNavigationHeader()}
                    <div className="p-4 row">
                        {renderCreatePostBtn()}
                        {renderAlertMessage()}
                        {renderPagination()}
                    </div>
                    {isShowModal ? <CreateEditModal spinner={spinner} mode={modalMode} onSave={handleSave} editData={editPostData} show={isShowModal} setIsShowModal={setIsShowModal} /> : ""}
                    <ListPost posts={posts} onEdit={handleEdit} onGetPosts={handleGetPosts} deleteAlertMessage={deleteAlertMessage}></ListPost>
                    {renderFooterHeader()}
                </div>
            </UserContext.Provider>
        </>
    )
}