import React, { useState, useEffect } from "react";
import ListPost from "../components/list_post";
// import { Button  } from 'react-bootstrap';
import CreateEditModal from "../components/create_edit_modal";
import { createPost, getPosts, editPost } from "../services/posts";
import { CREATE_POST } from "../utils/constants";
import UserContext from "../components/context";

export default props => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [posts, setPosts] = useState([]);
    const [editPostData, setEditPostData] = useState({"id":'', "title": '', "body":''});
    const [postId, setPostId] = useState('');

    const handleSave = async (data) => {
        if(modalMode === CREATE_POST){
            const createPayload = {"post": {"title": data?.title, "body": data?.body}}
            await createPost(createPayload);
            setIsShowModal(false);
        } else {
            const editPayload = {"post" : {"title" : data?.title, "body" : data?.body }}
            await editPost(postId, editPayload);
            setIsShowModal(false);
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
            <UserContext.Provider value = {props.location.state}>
            <div className = "bg-gray-200"> 
                <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-6">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                        <span className="font-semibold text-3xl tracking-tight italic">Brivity Blog</span>
                    </div>


                    <div className="hidden w-full block lg:flex items-center w-auto" id="menu">
                        <h5 className="pl-1 dark:text-white pr-[0.5em]">{props.location.state.display_name}</h5>
                        <div className="dropdown hover:block w-12 h-12 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase">
                            <button>{props.location.state.display_name.charAt(0).toUpperCase()} </button>
                                <ul className="dropdown-menu block absolute hidden text-gray-700 pt-1">
                                    <li className=""><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Logout</a></li>
                                </ul>
                        </div>
                    </div>
                </nav>

                <div className="p-4 row">
                    <div className="col-10">
                        <ul className="list-reset flex">
                            <li className="mr-1">
                                <a className="bg-white inline-block py-2 px-4 text-blue-800 font-semibold" href="#">All Posts</a>
                            </li>
                            <li className="mr-1">
                                <a className="bg-white inline-block py-2 px-4 text-blue-400 hover:text-blue-600 font-semibold" href="#">My Posts</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col"> 
                        <button className = "rounded bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br py-2 px-4 text-white" onClick={() => handleModal()}>Create Post</button>
                    </div>
                </div>

                {isShowModal ? <CreateEditModal mode={modalMode} onSave={handleSave} editData={editPostData} show= {isShowModal} setIsShowModal={setIsShowModal}/> : ""}
                <ListPost posts = {posts} onEdit={handleEdit}></ListPost>
                
                <div>
                    <nav>
                        <ul className="inline-flex -space-x-px">
                            <li>
                            <a href="#" className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            <li>
                            <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                            <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                            <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <footer className="py-3 bg-gray-700 text-center text-white">
                    Footer comes here.....
                </footer>
                </div>
            </UserContext.Provider>
        </>
    )
}

// bg-teal-500 (for hearder)
// bg-gray-200 - main page bg
// bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600