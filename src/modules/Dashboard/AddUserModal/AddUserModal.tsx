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
}: FormValues): JSX.Element => {
    const [selectedFriends, setSelectedFriends] = React.useState<Set<string>>(
        new Set(),
    );

    const onSelectFriend = React.useCallback(
        (selectedUsername: string): void => {
            if (selectedUsername !== undefined) {
                setSelectedFriends((oldSelectedFriends: Set<string>) => {
                    const newSelectedFriends = new Set(oldSelectedFriends);
                    if (newSelectedFriends.has(selectedUsername)) {
                        newSelectedFriends.delete(selectedUsername);
                    } else {
                        newSelectedFriends.add(selectedUsername);
                    }
                    return newSelectedFriends;
                });
            }
        },
        [],
    );

    const onSearch = React.useCallback(
        (handleOrUsername: string, handleLookup: Map<string, string>) => {
            const friendList = document.querySelector("#friend_list");
            if (handleLookup.has(handleOrUsername) && friendList !== null) {
                const foundUsername = handleLookup.get(handleOrUsername);

                const foundDocuments = document.querySelectorAll(
                    `#username_${foundUsername}`,
                );

                if (foundDocuments.length > 0) {
                    foundDocuments[0]?.scrollIntoView({ behavior: "smooth" });
                    foundDocuments[0]?.animate(
                        [
                            { borderColor: "blue" },
                            { borderColor: "rgba(0, 0, 0, 0.25)" },
                        ],
                        {
                            duration: 1200,
                            easing: "ease-in-out",
                            fill: "forwards",
                        },
                    );
                }
            } else if (friendList !== null) {
                const foundDocuments = document.querySelectorAll(
                    `#username_${handleOrUsername}`,
                );
                if (foundDocuments.length > 0) {
                    foundDocuments[0]?.scrollIntoView({ behavior: "smooth" });
                    foundDocuments[0]?.animate(
                        [
                            { borderColor: "blue" },
                            { borderColor: "rgba(0, 0, 0, 0.25)" },
                        ],
                        {
                            duration: 1200,
                            easing: "ease-in-out",
                            fill: "forwards",
                        },
                    );
                }
            }
        },
        [],
    );

    return (
        <Modal
            className={styles.add_user_modal}
            onHide={addUserModalOnClose}
            show={showAddUserModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>{"Add Friends"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FriendMultiSelect
                    onSearch={onSearch}
                    onSelectFriend={onSelectFriend}
                    selectedFriends={selectedFriends}
                    username={username}
                />
            </Modal.Body>
            <Modal.Footer className={styles.add_friend_modal_footer}>
                <Button>{"Close"}</Button>
                <Button variant="outline-success">{`Send ${selectedFriends.size} Requests`}</Button>
            </Modal.Footer>
        </Modal>
    );
};
