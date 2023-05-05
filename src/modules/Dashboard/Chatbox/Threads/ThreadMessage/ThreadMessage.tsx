import React from "react";
import { Image } from "react-bootstrap";

import placeholderPfp from "@/assets/placeholder/pfp.jpg";
import { computeTodayDayDistance } from "@/helpers";

import styles from "./ThreadMessage.module.css";

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
    id: _id,
    receiver: _receiver,
    sender,
    senderProfilePictureUrl,
    thread: _thread,
    threadOrder: _threadOrder,
}: ThreadMessageProperties): JSX.Element => (
    <div
        className={styles.thread_message}
        style={{ flexDirection: left ? "row" : "row-reverse" }}
    >
        <div className={styles.thread_message_send_info}>
            <Image
                alt={`${sender} whom sent the thread's profile picture`}
                className={styles.thread_message_sender_pfp}
                src={senderProfilePictureUrl ?? placeholderPfp.src}
            />
            <div className={styles.thread_message_date_info}>
                {`${computeTodayDayDistance(new Date(createdAt))}d ago`}
            </div>
        </div>
        <div>{content}</div>
    </div>
);
