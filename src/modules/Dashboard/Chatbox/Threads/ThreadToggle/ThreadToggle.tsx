import React from "react";
import { Image, useAccordionButton } from "react-bootstrap";

import placeholderPfp from "@/assets/placeholder/pfp.jpg";

import styles from "./ThreadToggle.module.css";

type ThreadToggleProperties = {
    creatorProfilePictureUrl?: string;
    eventKey: string;
    receiver: string;
    receiverProfilePictureUrl?: string;
    sender: string;
};

/**
 *
 * @param param0
 */
export const ThreadToggle = ({
    creatorProfilePictureUrl,
    eventKey,
    receiver,
    receiverProfilePictureUrl,
    sender,
}: ThreadToggleProperties): JSX.Element => {
    const scrollToReplyOnToggle = React.useCallback(() => {
        const foundReplyElements = document.querySelectorAll(
            `#thread_reply_${receiver}_${sender}`,
        );

        if (foundReplyElements.length > 0) {
            const foundReplyElement = foundReplyElements[0];
            foundReplyElement.scrollIntoView({ behavior: "smooth" });
        }
    }, [receiver, sender]);

    const toggleAccordion = useAccordionButton(eventKey);

    return (
        <div
            className={styles.thread_user_pfps}
            onClick={(event: React.MouseEvent<HTMLDivElement>): void => {
                toggleAccordion(event);
                scrollToReplyOnToggle();
            }}
        >
            <Image
                alt="Creator's profile picture"
                className={styles.thread_user_pfp}
                src={creatorProfilePictureUrl ?? placeholderPfp.src}
            />
            <Image
                alt="Receiver's profile picture"
                className={styles.thread_user_pfp}
                src={receiverProfilePictureUrl ?? placeholderPfp.src}
            />
        </div>
    );
};
