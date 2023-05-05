import React from "react";
import { Button, Form, Image, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { Key } from "ts-key-enum";

import { MessageService } from "@/@classes";
import type { DirectMessage } from "@/@types";
import placeholderPfp from "@/assets/placeholder/pfp.jpg";
import { renderTooltip } from "@/helpers";

import styles from "./ThreadReply.module.css";

type ThreadReplyProperties = {
    addMessage: (
        _threadId: number,
        _threadMessage: DirectMessage,
    ) => Promise<void>;
    left: boolean;
    receiver: string;
    sender: string;
    senderProfilePictureUrl?: string;
    threadId: number;
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
    addMessage,
    left,
    receiver,
    sender,
    senderProfilePictureUrl,
    threadId,
}: ThreadReplyProperties): JSX.Element => {
    const { control, register, reset } = useForm<FormValues>({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        mode: "all",
        reValidateMode: "onBlur",
    });

    const [content] = useWatch({
        control,
        defaultValue: { content: "" },
        name: ["content"],
    });

    const [sendingMessage, setSendingMessage] = React.useState<boolean>(false);

    const submitMessage = React.useCallback(async () => {
        const addedMessage = await MessageService.addMessage({
            content,
            receiver,
            sender,
            senderProfilePictureUrl,
        });
        if (addedMessage.data >= 0) {
            const addingMessageToThreadToast = toast.loading(
                "Adding message to thread...",
            );
            const addMessageToThreadRequest =
                await MessageService.addMessageToThread(
                    addedMessage.data,
                    threadId,
                );
            toast.dismiss(addingMessageToThreadToast);
            if (addMessageToThreadRequest.data) {
                toast.success("Added message to thread successfully!");
                await addMessage(threadId, {
                    content,
                    createdAt: new Date(Date.now()),
                    id: addedMessage.data,
                    receiver,
                    sender,
                    senderProfilePictureUrl,
                });
                reset();
                setSendingMessage(false);
            } else {
                toast.error("Failed to add message to thread.");
            }
        }
    }, [
        addMessage,
        content,
        receiver,
        reset,
        sender,
        senderProfilePictureUrl,
        threadId,
    ]);

    return (
        <div
            className={styles.thread_reply}
            id={`thread_reply_${receiver}_${sender}`}
            style={{ flexDirection: left ? "row" : "row-reverse" }}
        >
            <div className={styles.thread_reply_send_info}>
                <Image
                    alt={`Current logged in ${sender}'s profile picture`}
                    className={styles.thread_reply_pfp}
                    src={senderProfilePictureUrl ?? placeholderPfp.src}
                />
            </div>
            {sendingMessage ? (
                <div
                    className={styles.thread_reply_form_container}
                    style={{ opacity: sendingMessage ? "100%" : "0%" }}
                >
                    <Form.Group
                        className={styles.thread_reply_form_group}
                        controlId="message_content_form"
                    >
                        <Form.Control
                            as="textarea"
                            className={styles.thread_reply_form_control}
                            onKeyDown={async (
                                event: React.KeyboardEvent<HTMLInputElement>,
                            ): Promise<void> => {
                                if (event.key === Key.Enter) {
                                    event.preventDefault();
                                    await submitMessage();
                                }
                            }}
                            placeholder="Enter reply here"
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
                                onClick={submitMessage}
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
