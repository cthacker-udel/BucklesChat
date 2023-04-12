import React from "react";
import { Image } from "react-bootstrap";

import _OfflineIndicator from "@/assets/placeholder/offlineindicator.png";
import OnlineIndicator from "@/assets/placeholder/onlineindicator.png";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";

import styles from "./Friend.module.css";

type FriendProperties = {
    profilePictureUrl?: string;
    handle?: string;
    username?: string;
};

/**
 * An individual friend belonging to a user
 *
 * @returns An individual friend in the friends list which displays when the user accesses the dashboard
 */
export const Friend = ({
    handle,
    profilePictureUrl,
    username,
}: FriendProperties): JSX.Element => (
    <div className={styles.friend_info_container}>
        <div className={styles.friend_pfp_container}>
            <Image
                alt="profile picture of friend of current user"
                className={styles.friend_pfp}
                src={profilePictureUrl ?? placeholderPfp.src}
            />
            <Image
                alt="Online Indicator, which shows if someone is online"
                className={styles.online_indicator}
                src={OnlineIndicator.src}
            />
        </div>
        <div className={styles.friend_info_display}>{handle ?? username}</div>
    </div>
);
