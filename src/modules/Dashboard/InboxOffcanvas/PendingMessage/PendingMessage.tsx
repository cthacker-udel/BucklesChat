import React from "react";
import { Button, Image, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import placeHolderPfp from "@/assets/placeholder/pfp.jpg";
import { computeTodayDayDistance, renderTooltip } from "@/helpers";

import { ReplyToModal } from "../ReplyToModal";
import styles from "./PendingMessage.module.css";

type PendingMessageProperties = {
    content: string;
    createdAt: Date;
    id: number;
    receiver: string;
    sender: string;
    senderProfilePictureUrl?: string;
    removeMessageFromCache: (_messageId: number) => Promise<void>;
};

/**
 * @deprecated Removed due to direct messaging automatically creating thread with user
 * Represents a message that has not been replied to, and is a result of a direct message with the user
 *
 * @param props - The properties of the Pending Message that are passed in from InboxOffCanvas
 * @param props.content - The content of the message
 * @param props.createdAt - The date that the message was created
 * @param props.id - The id of the message
 * @param props.receiver - The person that is receiving the message
 * @param props.sender - The person that is sending the message
 * @param props.senderProfilePictureUrl - The profile picture url for the person that is sending the message
 * @returns The displayed pending message with all the above attributes properly displayed
 */
export const PendingMessage = ({
    content,
    createdAt,
    id,
    receiver,
    removeMessageFromCache,
    sender,
    senderProfilePictureUrl,
}: PendingMessageProperties): JSX.Element => {
    const [showReplyToModal, setShowReplyToModal] =
        React.useState<boolean>(false);

    const replyToModalOnHide = React.useCallback(() => {
        setShowReplyToModal(false);
    }, []);

    return (
        <>
            <div className={styles.pending_message_item}>
                <div className={styles.pending_message_info_container}>
                    <Image
                        alt={`${sender}'s profile picture`}
                        className={styles.pending_message_pfp}
                        src={senderProfilePictureUrl ?? placeHolderPfp.src}
                    />
                    <div className={styles.pending_message_info}>
                        <div className={styles.username}>{sender}</div>
                        <div className={styles.item_sent_time}>
                            {`${computeTodayDayDistance(new Date(createdAt))}d`}
                        </div>
                    </div>
                </div>
                <div className={styles.pending_message_content}>
                    <span>{content}</span>
                    <OverlayTrigger
                        overlay={(
                            properties: OverlayInjectedProps,
                        ): JSX.Element =>
                            renderTooltip(properties, { title: "Reply" })
                        }
                        placement="top-start"
                        trigger={["hover", "focus"]}
                    >
                        <Button
                            className={styles.pending_message_reply_button}
                            onClick={(): void => {
                                setShowReplyToModal(true);
                            }}
                            variant="outline-secondary"
                        >
                            <i className="fa-solid fa-reply fa-xs" />
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>
            <ReplyToModal
                id={id}
                receiver={receiver}
                removeMessageFromCache={removeMessageFromCache}
                replyToModalOnHide={replyToModalOnHide}
                sender={sender}
                showReplyToModal={showReplyToModal}
            />
        </>
    );
};
