import React from "react";
import { toast } from "react-toastify";

import { FriendService } from "@/@classes";

import styles from "./FriendOptions.module.css";

type FriendOptionsProperties = {
    loggedInUsername: string;
    handle?: string;
    onMessageFriendOptionCallback: () => void;
    profileImageUrl?: string;
    username: string;
};

/**
 * The tools that display when the user clicks on the ellipsis by each friend's card, allows them to either remove the friend, block them, or message them.
 *
 * @param props - The overlay injected props + custom ones sent from the dashboard
 * @param props.handle - The handle of the user, if present is used in place of the username
 * @param props.loggedInUsername - The username of the currently logged in user
 * @param props.onMessageFriendOptionCallback - The callback that is fired when the user clicks the `message` option when selecting options for the users
 * @param props.profileImageUrl - The profile image url of the friend being displayed in the card
 * @param props.username - The username of the friend being displayed in the card
 */
export const FriendOptions = ({
    handle: _handle,
    loggedInUsername,
    onMessageFriendOptionCallback,
    profileImageUrl: _profileImageUrl,
    username,
}: FriendOptionsProperties): JSX.Element => (
    <div className={styles.friend_options_container}>
        <div className={styles.friend_options_container_button}>
            <div
                className={styles.friend_options_container_button_content}
                onClick={onMessageFriendOptionCallback}
            >
                <span>{"Message"}</span>
                <i className="fa-regular fa-message fa-sm" />
            </div>
        </div>
        <div className={styles.friend_options_container_button}>
            <div
                className={styles.friend_options_container_button_content}
                onClick={async (): Promise<void> => {
                    const removingToast = toast.loading(
                        `Removing ${username} as a friend...`,
                    );
                    const removeRequest = await FriendService.removeFriend(
                        loggedInUsername,
                        username,
                    );
                    toast.dismiss(removingToast);
                    if (removeRequest.data) {
                        toast.success(
                            `Successfully removed ${username} as a friend!`,
                        );
                    } else {
                        toast.error(
                            `There was an issue removing ${username} as a friend, please try again later.`,
                        );
                    }
                }}
            >
                <span>{"Remove"}</span>
                <i className="fa-solid fa-user-slash fa-sm" />
            </div>
        </div>
        <div className={styles.friend_options_container_button}>
            <div className={styles.friend_options_container_button_content}>
                <span>{"Block"}</span>
                <i className="fa-solid fa-ban fa-sm" />
            </div>
        </div>
    </div>
);
