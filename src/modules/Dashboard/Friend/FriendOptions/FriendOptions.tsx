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
 *
 * @param props - The overlay injected props
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
