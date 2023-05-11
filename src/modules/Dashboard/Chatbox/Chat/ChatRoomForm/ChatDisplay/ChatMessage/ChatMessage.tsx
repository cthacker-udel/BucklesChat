import React from "react";
import { Image, ListGroup, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import type { ChatRoomMessage } from "@/@types";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";
import { renderTooltip } from "@/helpers";

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
    senderHandle,
    senderProfilePictureUrl,
    senderUsername,
}: ChatRoomMessageProperties): JSX.Element => (
    <ListGroup.Item className={styles.chat_message_item} variant="light">
        <div className={styles.chat_message_content}>
            <OverlayTrigger
                overlay={(properties: OverlayInjectedProps): JSX.Element =>
                    renderTooltip(properties, {
                        title: senderHandle ?? senderUsername,
                    })
                }
                placement="left"
            >
                <Image
                    alt={`${sender}'s profile picture`}
                    className={styles.chat_message_pfp}
                    src={senderProfilePictureUrl ?? placeholderPfp.src}
                />
            </OverlayTrigger>
            <span className={styles.chat_message_content}>{content}</span>
        </div>
        <span className={styles.chat_message_created_date}>
            {createdAt === undefined
                ? new Date().toLocaleString()
                : new Date(createdAt).toLocaleString()}
        </span>
    </ListGroup.Item>
);
