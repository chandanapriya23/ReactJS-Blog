import React from 'react';
import { Modal, Button } from "react-bootstrap";

export default props => {

    const handleConfirm = () => {
        props.onDelete();
    }

    return(
        <>
            <Modal show={props.show} onHide={() => props.setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Do you want to delete the post?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setShowDeleteModal(false)}>No</Button>
                    <Button variant="primary" onClick={handleConfirm}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}