import React from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

import { FriendService } from "@/@classes";
import type { ApiResponse } from "@/@types";
import { Endpoints } from "@/assets";

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
    const { mutate } = useSWRConfig();
    const [selectedFriends, setSelectedFriends] = React.useState<Set<number>>(
        new Set(),
    );

    const onSelectFriend = React.useCallback((selectedId: number): void => {
        if (selectedId !== undefined) {
            setSelectedFriends((oldSelectedFriends: Set<number>) => {
                const newSelectedFriends = new Set(oldSelectedFriends);
                if (newSelectedFriends.has(selectedId)) {
                    newSelectedFriends.delete(selectedId);
                } else {
                    newSelectedFriends.add(selectedId);
                }
                return newSelectedFriends;
            });
        }
    }, []);

    const onSearch = React.useCallback(
        (handleOrUsername: string, handleLookup: Map<string, number>) => {
            const friendList = document.querySelector("#friend_list");
            if (handleLookup.has(handleOrUsername) && friendList !== null) {
                const foundId = handleLookup.get(handleOrUsername);
                const foundDocuments = document.querySelectorAll(
                    `#userid_${foundId}`,
                );

                if (foundDocuments.length > 0) {
                    foundDocuments[0]?.scrollIntoView({ behavior: "smooth" });
                    foundDocuments[0]?.animate(
                        [
                            { borderColor: "green" },
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

    const sendRequestToSelectedFriends = React.useCallback(async () => {
        const requests: Promise<ApiResponse<boolean>>[] = [];
        for (const eachId of selectedFriends.values()) {
            requests.push(FriendService.sendFriendRequest(eachId, username));
        }
        const sendingRequestsToast = toast.loading("Sending friend requests");
        const successfullySentRequests = await Promise.all(requests);
        const userIds = [...selectedFriends.values()];

        let index = 0;
        for (const eachResult of successfullySentRequests) {
            const currentUserId = userIds[index];
            const foundUser = document.querySelector(
                `#userid_${currentUserId}`,
            ) as unknown as HTMLElement;
            if (eachResult.data) {
                toast.success(
                    `Successfully sent a friend request to ${
                        foundUser.dataset.handle ?? foundUser.dataset.username
                    }`,
                    { autoClose: 3000 },
                );
            } else {
                toast.error(
                    `Failed to send a friend request to ${
                        foundUser.dataset.handle ?? foundUser.dataset.username
                    }`,
                    { autoClose: 3000 },
                );
            }
            index += 1;
        }
        toast.dismiss(sendingRequestsToast);
        await mutate(
            `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.AVAILABLE_FRIENDS}`,
        );
    }, [mutate, selectedFriends, username]);

    return (
        <Modal
            className={styles.add_user_modal}
            contentClassName={styles.add_friend_modal_content}
            onHide={addUserModalOnClose}
            show={showAddUserModal}
        >
            <Modal.Header
                className={styles.add_friend_modal_header}
                closeButton
            >
                <Modal.Title>{"Add Friends"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FriendMultiSelect
                    onSearch={onSearch}
                    onSelectFriend={onSelectFriend}
                    selectedFriends={selectedFriends}
                />
            </Modal.Body>
            <Modal.Footer className={styles.add_friend_modal_footer}>
                <Button
                    onClick={(): void => {
                        addUserModalOnClose();
                    }}
                >
                    {"Close"}
                </Button>
                <Button
                    onClick={async (): Promise<void> => {
                        addUserModalOnClose();
                        await sendRequestToSelectedFriends();
                        selectedFriends.clear();
                    }}
                    variant="success"
                >
                    {`Send ${selectedFriends.size} Requests`}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
