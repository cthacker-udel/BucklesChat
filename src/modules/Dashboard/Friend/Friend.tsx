import React from "react";
import { Button, Image, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import _OfflineIndicator from "@/assets/placeholder/offlineindicator.png";
import OnlineIndicator from "@/assets/placeholder/onlineindicator.png";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";

import styles from "./Friend.module.css";
import { createFriendOptions } from "./FriendOptions/createFriendOption";

type FriendProperties = {
    profileImageUrl?: string;
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
    profileImageUrl,
    username,
}: FriendProperties): JSX.Element => (
    <div className={styles.friend_info_container}>
        <div className={styles.friend_info_item}>
            <div className={styles.friend_pfp_container}>
                <Image
                    alt="profile picture of friend of current user"
                    className={styles.friend_pfp}
                    src={profileImageUrl ?? placeholderPfp.src}
                />
                <Image
                    alt="Online Indicator, which shows if someone is online"
                    className={styles.online_indicator}
                    src={OnlineIndicator.src}
                />
            </div>
            <div className={styles.friend_info_display}>
                {handle ?? username}
            </div>
        </div>
        <div className={styles.friend_info_actions}>
            <OverlayTrigger
                overlay={(properties: OverlayInjectedProps): JSX.Element =>
                    createFriendOptions(
                        username as unknown as string,
                        properties,
                        handle,
                        profileImageUrl,
                    )
                }
                placement="top-end"
                trigger="click"
            >
                <Button
                    className={styles.friend_info_options_button}
                    variant="outline-secondary"
                >
                    <i className="fa-solid fa-ellipsis fa-sm" />
                </Button>
            </OverlayTrigger>
        </div>
    </div>
);
