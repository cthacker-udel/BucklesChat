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
    receiver: string;
    sender: string;
    senderProfilePictureUrl?: string;
};

/**
 *
 * @param param0
 * @returns
 */
export const PendingMessage = ({
    content,
    createdAt,
    receiver,
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
                receiver={receiver}
                replyToModalOnHide={replyToModalOnHide}
                sender={sender}
                showReplyToModal={showReplyToModal}
            />
        </>
    );
};
