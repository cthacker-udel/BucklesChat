import React from "react";
import { Image, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import placeholderPfp from "@/assets/placeholder/pfp.jpg";
import { computeTodayDayDistance, renderTooltip } from "@/helpers";

import styles from "./ThreadMessage.module.css";

type ThreadMessageProperties = {
    content: string;
    createdAt: Date;
    left: boolean;
    id: number;
    receiver: string;
    sender: string;
    senderHandle?: string;
    senderUsername?: string;
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
    senderHandle,
    senderUsername,
    senderProfilePictureUrl,
    thread: _thread,
    threadOrder: _threadOrder,
}: ThreadMessageProperties): JSX.Element => (
    <div
        className={styles.thread_message}
        style={{ flexDirection: left ? "row" : "row-reverse" }}
    >
        <OverlayTrigger
            overlay={(properties: OverlayInjectedProps): JSX.Element =>
                renderTooltip(properties, {
                    title: senderHandle ?? senderUsername,
                })
            }
            placement="left"
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
        </OverlayTrigger>
        <div>{content}</div>
    </div>
);
