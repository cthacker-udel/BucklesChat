import React from "react";
import { Button, Image, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import { MessageService } from "@/@classes";
import _OfflineIndicator from "@/assets/placeholder/offlineindicator.png";
import OnlineIndicator from "@/assets/placeholder/onlineindicator.png";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";

import styles from "./Friend.module.css";
import { createFriendOptions } from "./FriendOptions/createFriendOption";
import { MessageFriend } from "./MessageFriend";

type FriendProperties = {
    handle?: string;
    id?: number;
    profileImageUrl?: string;
    username?: string;
};

/**
 * An individual friend belonging to a user
 *
 * @param props - The properties passed into the Friend component from the Dashboard component
 * @param props.handle - The handle of the friend
 * @param props.profileImageUrl - The profile image url of the friend
 * @param props.username - The username of the selected friend
 *
 * @returns An individual friend in the friends list which displays when the user accesses the dashboard
 */
export const Friend = ({
    handle,
    id,
    profileImageUrl,
    username,
}: FriendProperties): JSX.Element => {
    const [show, setShow] = React.useState<boolean>(false);
    const [showMessageFriendModal, setShowMessageFriendModal] =
        React.useState<boolean>(false);

    const onMessageOptionClick = React.useCallback(() => {
        setShowMessageFriendModal(true);
    }, []);

    const onMessageSend = React.useCallback(
        async (receiver: number, content: string): Promise<boolean> => {
            try {
                const { data } = await MessageService.sendDM(receiver, content);
                return data;
            } catch {
                return false;
            }
        },
        [],
    );

    return (
        <>
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
                        overlay={(
                            properties: OverlayInjectedProps,
                        ): JSX.Element =>
                            createFriendOptions(
                                onMessageOptionClick,
                                username as unknown as string,
                                properties,
                                id,
                                handle,
                                profileImageUrl,
                            )
                        }
                        placement="top-end"
                        show={show}
                        trigger="click"
                    >
                        <Button
                            className={styles.friend_info_options_button}
                            onBlur={(): void => {
                                setShow(false);
                            }}
                            onClick={(): void => {
                                setShow((oldValue: boolean) => !oldValue);
                            }}
                            variant="outline-secondary"
                        >
                            <i className="fa-solid fa-ellipsis fa-sm" />
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>
            <MessageFriend
                friendId={id}
                handle={handle}
                messageFriendOnHide={(): void => {
                    setShowMessageFriendModal(false);
                }}
                onMessageSend={onMessageSend}
                receiver={username as unknown as string}
                showMessageFriend={showMessageFriendModal}
            />
        </>
    );
};
