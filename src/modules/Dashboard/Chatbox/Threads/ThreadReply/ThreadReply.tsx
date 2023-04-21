import React from "react";
import {
    Button,
    Form,
    Image,
    InputGroup,
    OverlayTrigger,
} from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { useForm } from "react-hook-form";

import { renderTooltip } from "@/helpers";

import styles from "./ThreadReply.module.css";

type ThreadReplyProperties = {
    left: boolean;
    username: string;
    usernameProfilePictureUrl?: string;
};

type FormValues = {
    content: string;
};

const FORM_DEFAULT_VALUES: FormValues = {
    content: "",
};

/**
 *
 * @returns
 */
export const ThreadReply = ({
    left,
    username,
    usernameProfilePictureUrl,
}: ThreadReplyProperties): JSX.Element => {
    const { register, reset } = useForm<FormValues>({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        mode: "all",
        reValidateMode: "onBlur",
    });

    const [sendingMessage, setSendingMessage] = React.useState<boolean>(false);

    return (
        <div
            className={styles.thread_reply}
            style={{ flexDirection: left ? "row" : "row-reverse" }}
        >
            <div className={styles.thread_reply_send_info}>
                <Image
                    alt={`Current logged in ${username}'s profile picture`}
                    className={styles.thread_reply_pfp}
                    src={usernameProfilePictureUrl}
                />
            </div>
            {sendingMessage ? (
                <div
                    className={styles.thread_reply_form_container}
                    style={{ opacity: sendingMessage ? "100%" : "0%" }}
                >
                    <Form.Group controlId="message_content_form">
                        <Form.Control
                            as="textarea"
                            className={styles.thread_reply_form_control}
                            {...register("content")}
                        />
                    </Form.Group>
                    <div className={styles.thread_reply_form_options}>
                        <OverlayTrigger
                            overlay={(
                                properties: OverlayInjectedProps,
                            ): JSX.Element =>
                                renderTooltip(properties, { title: "Send" })
                            }
                            placement="right"
                        >
                            <Button
                                className={styles.thread_reply_form_option}
                                variant="outline-light"
                            >
                                <i className="fa-solid fa-share fa-sm" />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={(
                                properties: OverlayInjectedProps,
                            ): JSX.Element =>
                                renderTooltip(properties, { title: "Discard" })
                            }
                            placement="right"
                        >
                            <Button
                                className={styles.thread_reply_form_option}
                                onClick={(): void => {
                                    reset();
                                    setSendingMessage(false);
                                }}
                                variant="outline-danger"
                            >
                                <i className="fa-solid fa-ban fa-sm" />
                            </Button>
                        </OverlayTrigger>
                    </div>
                </div>
            ) : (
                <OverlayTrigger
                    delay={{ hide: 0, show: 350 }}
                    overlay={(properties: OverlayInjectedProps): JSX.Element =>
                        renderTooltip(properties, { title: "Reply" })
                    }
                    placement="bottom"
                >
                    <div
                        className={styles.thread_reply_icon}
                        onClick={(): void => {
                            setSendingMessage(true);
                        }}
                    >
                        <i className="fa-solid fa-reply" />
                    </div>
                </OverlayTrigger>
            )}
        </div>
    );
};
