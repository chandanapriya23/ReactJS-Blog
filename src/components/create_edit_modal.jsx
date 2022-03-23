import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { CREATE_POST } from "../utils/constants";

export default props => {

    const modalMode = props?.mode;
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [error, setError] = useState(false);

    const handlePostTitle = (e) => {
        setPostTitle(e?.target?.value);
    }

    const handlePostBody = (e) => {
        setPostBody(e?.target?.value);
    }

    const handleSave = (e) => {
        props?.onSave({"title" : postTitle, "body" : postBody});
        // if(postTitle == '' || postBody == ''){
        //     setError(true);
        // }
    }

    useEffect( () => { 
    },[props?.editData]);

    return(
        <>
            <Modal show ={props.show} onHide={() => props.setIsShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMode}</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Form className="login-form">
                        <Container>
                        <Row>
                            <Col>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter your post title" defaultValue={props.mode == CREATE_POST ? postTitle  : props.editData?.title} onChange={(evt) => handlePostTitle(evt)}/>
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Body</Form.Label>
                                <Form.Control type="text" placeholder="Enter your message" defaultValue={props.mode == CREATE_POST ? postBody : props.editData?.body} onChange={handlePostBody}/>
                            </Form.Group>
                            </Col>
                        </Row>
                        </Container>
                        </Form>
                </Modal.Body>
                {/* {console.log("TITLEEE", postTitle)} */}
                {/* {console.log("BODY", postBody)} */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setIsShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={() => handleSave()} >Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}