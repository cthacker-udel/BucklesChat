import React from "react";
import { Image, ListGroup } from "react-bootstrap";

import type { ChatRoomMessage } from "@/@types";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";

import styles from "./ChatMessage.module.css";

type ChatRoomMessageProperties = ChatRoomMessage;

/**
 *
 * @param param0
 * @returns
 */
export const ChatMessage = ({
    content,
    createdAt,
    sender,
    senderProfilePictureUrl,
}: ChatRoomMessageProperties): JSX.Element => (
    <ListGroup.Item className={styles.chat_message_item} variant="light">
        <Image
            alt={`${sender}'s profile picture`}
            className={styles.chat_message_pfp}
            src={senderProfilePictureUrl ?? placeholderPfp.src}
        />
        <span className={styles.chat_message_content}>{content}</span>
        <span className={styles.chat_message_created_date}>
            {createdAt === undefined
                ? new Date().toLocaleString()
                : new Date(createdAt).toLocaleString()}
        </span>
    </ListGroup.Item>
);
