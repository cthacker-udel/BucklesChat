import React from "react";

import styles from "./ThreadMessage.module.css";
import { Image } from "react-bootstrap";
import { computeTodayDayDistance } from "@/helpers";

type ThreadMessageProperties = {
    content: string;
    createdAt: Date;
    left: boolean;
    id: number;
    receiver: string;
    sender: string;
    senderProfilePictureUrl?: string;
    thread?: number;
    threadOrder?: number;
};

/**
 *
 * @returns
 */
export const ThreadMessage = ({
    content,
    createdAt,
    left,
    id,
    receiver,
    sender,
    senderProfilePictureUrl,
    thread,
    threadOrder,
}: ThreadMessageProperties): JSX.Element => (
    <div
        className={styles.thread_message}
        style={{ flexDirection: left ? "row" : "row-reverse" }}
    >
        <div className={styles.thread_message_send_info}>
            <Image
                alt={`${sender} whom sent the thread's profile picture`}
                className={styles.thread_message_sender_pfp}
                src={senderProfilePictureUrl}
            />
            <div className={styles.thread_message_date_info}>
                {`${computeTodayDayDistance(new Date(createdAt))}d ago`}
            </div>
        </div>
        <div>{content}</div>
    </div>
);
