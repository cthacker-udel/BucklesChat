import React from "react";
import { Button, Modal } from "react-bootstrap";

import styles from "./AddUserModal.module.css";
import { FriendMultiSelect } from "./FriendMultiselect";

type FormValues = {
    addUserModalOnClose: () => void;
    showAddUserModal: boolean;
    username: string;
};

/**
 * The Add User Modal, which houses all functionality for users to add each-other as friends
 *
 * @param props - The properties passed into the AddUserModal passed from the Dashboard component
 * @returns The add user modal
 */
export const AddUserModal = ({
    addUserModalOnClose,
    showAddUserModal,
    username,
}: FormValues): JSX.Element => (
    <Modal onHide={addUserModalOnClose} show={showAddUserModal}>
        <Modal.Header closeButton>
            <Modal.Title>{"Add Friends"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FriendMultiSelect username={username} />
            {
                "Autocomplete text form goes here, search for user, if they  are connected, place check next to them, if not, place empty check, click on user to total selection, and make a button that's disabled at first, and counts up the total requests, and can be clicked to bulk send requests"
            }
        </Modal.Body>
        <Modal.Footer className={styles.add_friend_modal_footer}>
            <Button>{"Close"}</Button>
            <Button variant="outline-success">{"Send 0 Requests"}</Button>
        </Modal.Footer>
    </Modal>
);
