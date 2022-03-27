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
                    <Button variant="secondary" className="rounded-md bg-white text-gray-700 hover:bg-gray-50" onClick={() => props.setShowDeleteModal(false)}>No</Button>
                    <Button variant="primary" className = "rounded-md bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 hover:bg-gradient-to-br" onClick={handleConfirm}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}