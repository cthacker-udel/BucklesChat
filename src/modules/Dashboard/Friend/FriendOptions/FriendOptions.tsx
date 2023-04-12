import React from "react";
import { Button, Tooltip } from "react-bootstrap";

import styles from "./FriendOptions.module.css";

type FriendOptionsProperties = {
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
            <div className={styles.friend_options_container_button_content}>
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
