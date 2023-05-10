import React from "react";
import { Modal } from "react-bootstrap";

import styles from "./AddChatModal.module.css";

type AddChatModalProperties = {
    addChatModalOnClose: () => void;
    showAddChatModal: boolean;
};

/**
 *
 * @param param0
 * @returns
 */
export const AddChatModal = ({
    addChatModalOnClose,
    showAddChatModal,
}: AddChatModalProperties): JSX.Element => (
    <Modal
        contentClassName={styles.add_chat_modal_content}
        onHide={addChatModalOnClose}
        show={showAddChatModal}
    >
        <Modal.Header>{"Add Chat"}</Modal.Header>
    </Modal>
);
