import React from "react";
import { Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";

import { FriendService } from "@/@classes/api/client/Friend";
import placeHolderPfp from "@/assets/placeholder/pfp.jpg";
import { computeTodayDayDistance } from "@/helpers";

import styles from "./PendingFriendRequest.module.css";

type PendingFriendRequestProperties = {
    createdAt: string;
    sender: string;
    senderProfileImageUrl?: string;
    username: string;
};

/**
 * Each individual pending friend request in the modal's accordion. This is a pending friend request which means it is a request from a user to become friends with the current user logged in
 *
 * @param props - The properties of the pending friend request
 * @param props.createdAt - When the friend request was initially created
 * @param props.sender - The sender of the friend request
 * @param props.senderProfileImageUrl - The url of the image of the sender pfp
 * @param props.username - The username of the user receiving the message
 * @returns The pending friend request from the user
 */
export const PendingFriendRequest = ({
    createdAt,
    sender,
    senderProfileImageUrl,
    username,
}: PendingFriendRequestProperties): JSX.Element => (
    <div
        className={styles.friend_request_item}
        key={`friend_request_${sender}`}
    >
        <div className={styles.friend_request_info_container}>
            <Image
                alt={`${sender}'s profile picture`}
                className={styles.friend_request_pfp}
                src={senderProfileImageUrl ?? placeHolderPfp.src}
            />
            <div className={styles.friend_request_info}>
                <div className={styles.username}>{sender}</div>
                <div className={styles.item_sent_time}>
                    {`${computeTodayDayDistance(new Date(createdAt))}d`}
                </div>
            </div>
        </div>
        <div className={styles.friend_request_actions}>
            <Button
                className={styles.friend_request_action}
                onClick={async (): Promise<void> => {
                    const acceptingToast = toast.loading(
                        `Accepting ${sender}'s friend request...`,
                    );
                    const result = await FriendService.processFriendRequest(
                        username,
                        sender,
                        true,
                    );
                    toast.dismiss(acceptingToast);
                    if (result.data) {
                        toast.success(`Accepted ${sender}'s friend request!`);
                    } else {
                        toast.error(
                            `Failed to accept ${sender}'s friend request.`,
                        );
                    }
                }}
                variant="outline-success"
            >
                <i className="fa-solid fa-check fa-xs" />
            </Button>
            <Button
                className={styles.friend_request_action}
                onClick={async (): Promise<void> => {
                    const rejectingToast = toast.loading(
                        `Rejecting ${sender}'s friend request...`,
                    );
                    const result = await FriendService.processFriendRequest(
                        username,
                        sender,
                        false,
                    );
                    toast.dismiss(rejectingToast);
                    if (result.data) {
                        toast.success(`Rejected ${sender}'s friend request!`);
                    } else {
                        toast.error(
                            `Failed to reject ${sender}'s friend request.`,
                        );
                    }
                }}
                variant="outline-danger"
            >
                <i className="fa-solid fa-xmark fa-xs" />
            </Button>
        </div>
    </div>
);
