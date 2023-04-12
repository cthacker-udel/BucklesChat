import React from "react";
import { Button, Tooltip } from "react-bootstrap";

import styles from "./FriendOptions.module.css";
import { toast } from "react-toastify";
import { FriendService } from "@/@classes/api/client/Friend";

type FriendOptionsProperties = {
    loggedInUsername: string;
    handle?: string;
    profileImageUrl?: string;
    username: string;
};

/**
 * The tools that display when the user clicks on the ellipsis by each friend's card, allows them to either remove the friend, block them, or message them.
 *
 * @param props - The overlay injected props + custom ones sent from the dashboard
 * @param props.handle - The handle of the user, if present is used in place of the username
 * @param props.loggedInUsername - The username of the currently logged in user
 * @param props.profileImageUrl - The profile image url of the friend being displayed in the card
 * @param props.username - The username of the friend being displayed in the card
 */
export const FriendOptions = ({
    handle,
    loggedInUsername,
    profileImageUrl,
    username,
}: FriendOptionsProperties): JSX.Element => (
    <div className={styles.friend_options_container}>
        <div className={styles.friend_options_container_button}>
            <div className={styles.friend_options_container_button_content}>
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
