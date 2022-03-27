import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { CREATE_POST } from "../utils/constants";
import { Rings } from 'react-loader-spinner';
import UserContext from "./context";

export default props => {

    const modalMode = props ?.mode;
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [error, setError] = useState(false);
    const ctx = useContext(UserContext);
    const [spinner, showSpinner] = useState(false);

    const handlePostTitle = (e) => {
        setPostTitle(e ?.target ?.value);
    }

    const handlePostBody = (e) => {
        setPostBody(e ?.target ?.value);
    }

    const handleSave = (e) => {
        props ?.onSave({ "title": postTitle, "body": postBody, "token": ctx ?.token});
    }

    const handleDisable = () => {
        return props.mode == CREATE_POST && (!postBody || !postTitle)
    }

    const renderModalHeader = () => {
        return (
            <Modal.Header closeButton>
                <Modal.Title>{modalMode}</Modal.Title>
            </Modal.Header>
        )
    }

    const renderModalBody = () => {
        return (
            <Modal.Body>
                {renderModalForm()}
            </Modal.Body>
        )
    }

    const renderModalForm = () => {
        return (
            <Form className="login-form">
                <Container>
                    <Row>
                        <Col>
                            {renderModalFormTitle()} &nbsp;
                            {renderModalFormMessage()}
                        </Col>
                    </Row>
                </Container>
            </Form>
        )
    }

    const renderModalFormTitle = () => {
        return (
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter your post title" defaultValue={props.mode == CREATE_POST ? postTitle : props.editData ?.title} onChange={(evt) => handlePostTitle(evt)} />
            </Form.Group>
        )
    }

    const renderModalFormMessage = () => {
        return (
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Body</Form.Label>
                <Form.Control type="text" placeholder="Enter your message" defaultValue={props.mode == CREATE_POST ? postBody : props.editData ?.body} onChange={handlePostBody} />
            </Form.Group>
        )
    }

    const renderModalFooter = () => {
        return (
            <Modal.Footer>
                <Button variant="secondary" className="rounded-md bg-white text-gray-700 hover:bg-gray-50" onClick={() => props.setIsShowModal(false)}>Close</Button>
                <Button variant="primary" className="rounded-md bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br" onClick={() => handleSave()} disabled={handleDisable()}>Save changes</Button>
            </Modal.Footer>
        )
    }

    useEffect(() => {
    }, [props ?.editData]);

    return (
        <>
            <Modal show={props.show} onHide={() => props.setIsShowModal(false)}>
                {renderModalHeader()}
                {renderModalBody()}
                {renderModalFooter()}
                {props.spinner && <Rings color="#00BFFF" height="10em" width="10em"/>}
            </Modal>
            
        </>
    )
}