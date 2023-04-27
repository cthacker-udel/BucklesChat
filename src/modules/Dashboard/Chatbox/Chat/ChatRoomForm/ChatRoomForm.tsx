import React from "react";
import { Form, Modal } from "react-bootstrap";

import { ChatDisplay } from "./ChatDisplay";
import styles from "./ChatRoomForm.module.css";

type ChatRoomFormProperties = {
    createdAt?: Date;
    createdBy: string;
    description?: string;
    display: boolean;
    id?: number;
    name: string;
    onChatRoomFormClose: () => void;
    updatedAt?: Date;
};

/**
 *
 * @returns
 */
export const ChatRoomForm = ({
    createdAt,
    createdBy: _createdBy,
    description: _description,
    display,
    id,
    name,
    onChatRoomFormClose,
    updatedAt: _updatedAt,
}: ChatRoomFormProperties): JSX.Element => (
    <Modal
        contentClassName={styles.chat_room_form_modal_content}
        dialogClassName={styles.chat_room_form_dialog}
        onHide={onChatRoomFormClose}
        show={display}
    >
        <Modal.Header
            className={styles.chat_room_form_modal_header}
            closeButton
            closeVariant="white"
        />
        <Modal.Body>
            <Form.Group controlId={`${name}_form`}>
                <Form.Label>{name}</Form.Label>
                <ChatDisplay
                    closeModal={onChatRoomFormClose}
                    id={id ?? 0}
                    name={name}
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer className={styles.chat_room_form_modal_footer}>
            {`Created ${
                createdAt === undefined
                    ? "N/A"
                    : new Date(createdAt).toLocaleString()
            }`}
        </Modal.Footer>
    </Modal>
);
