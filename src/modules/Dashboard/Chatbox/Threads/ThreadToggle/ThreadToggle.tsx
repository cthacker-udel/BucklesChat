import React from "react";
import { Image, useAccordionButton } from "react-bootstrap";

import placeholderPfp from "@/assets/placeholder/pfp.jpg";

import styles from "./ThreadToggle.module.css";

type ThreadToggleProperties = {
    creatorProfilePictureUrl?: string;
    eventKey: string;
    receiverProfilePictureUrl?: string;
};

/**
 *
 * @param param0
 */
export const ThreadToggle = ({
    creatorProfilePictureUrl,
    eventKey,
    receiverProfilePictureUrl,
}: ThreadToggleProperties): JSX.Element => {
    const toggleAccordion = useAccordionButton(eventKey);

    return (
        <div className={styles.thread_user_pfps} onClick={toggleAccordion}>
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
