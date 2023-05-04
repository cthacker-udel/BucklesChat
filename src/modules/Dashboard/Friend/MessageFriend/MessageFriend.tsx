/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { TextConstants, ValidationConstants } from "@/assets";

import styles from "./MessageFriend.module.css";

type MessageFriendProperties = {
    friendId?: number;
    handle?: string;
    messageFriendOnHide: () => void;
    onMessageSend: (_receiver: number, _content: string) => Promise<boolean>;
    receiver: string;
    showMessageFriend: boolean;
};

type FormValues = {
    content: string;
};

const FORM_DEFAULT_VALUES = {
    content: "",
};

/**
 * Constructs and sends a message to the user
 *
 * @param props - The properties of the MessageFriend component
 * @param props.messageFriendOnHide - The callback that fires when the modal is closed
 * @param props.onMessageSend - The callback that fires when the message is initiated as sending to the user
 * @param props.receiver - The person who will be receiving the message
 * @param props.sender - The person who is sending the message
 * @param props.senderProfilePicture - The url of the sender's pfp, null if does not exist
 * @param props.showMessageFriend - Boolean that controls whether the modal is closed or open
 * @returns The modal used for messaging the user
 */
export const MessageFriend = ({
    friendId,
    handle,
    messageFriendOnHide,
    onMessageSend,
    receiver,
    showMessageFriend,
}: MessageFriendProperties): JSX.Element => {
    const { formState, getValues, register, reset } = useForm<FormValues>({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        delayError: 250,
        mode: "all",
        reValidateMode: "onBlur",
        shouldFocusError: true,
    });

    const { dirtyFields, errors } = formState;

    return (
        <Modal
            className={styles.message_friend_modal}
            dialogClassName={styles.message_friend_modal_dialog}
            onHide={(): void => {
                reset();
                messageFriendOnHide();
            }}
            show={showMessageFriend}
        >
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title className={styles.message_friend_modal_title}>
                    {"Message "}
                    <span className={styles.message_receiver}>
                        {handle ?? receiver}
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="message_content_form">
                    <Form.Control
                        as="textarea"
                        className={styles.message_input}
                        isInvalid={Boolean(errors.content)}
                        isValid={!errors.content && dirtyFields.content}
                        placeholder="Type message here..."
                        rows={3}
                        {...register("content", {
                            maxLength: {
                                message:
                                    TextConstants.VALIDATION.INVALID
                                        .SEND_MESSAGE_MODAL.CONTENT.MAX_LENGTH,
                                value: ValidationConstants.SEND_MESSAGE_MODAL
                                    .CONTENT.MAX_LENGTH,
                            },
                            required: {
                                message:
                                    TextConstants.VALIDATION.INVALID
                                        .SEND_MESSAGE_MODAL.CONTENT.REQUIRED,
                                value: ValidationConstants.SEND_MESSAGE_MODAL
                                    .CONTENT.REQUIRED,
                            },
                        })}
                    />
                    {!errors.content && dirtyFields.content && (
                        <Form.Control.Feedback type="valid">
                            {
                                TextConstants.VALIDATION.VALID
                                    .SEND_MESSAGE_MODAL.CONTENT
                            }
                        </Form.Control.Feedback>
                    )}
                    {errors.content && (
                        <Form.Control.Feedback type="invalid">
                            {errors.content.message}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={(): void => {
                        reset();
                        messageFriendOnHide();
                    }}
                    variant="outline-secondary"
                >
                    {"Close"}
                </Button>
                <Button
                    disabled={!dirtyFields.content || Boolean(errors.content)}
                    onClick={async (): Promise<void> => {
                        if (friendId === undefined) {
                            reset();
                            messageFriendOnHide();
                            return;
                        }

                        const messageSendingToast = toast.loading(
                            `Sending message to ${receiver}...`,
                        );
                        const { content } = getValues();
                        reset();
                        const result = await onMessageSend(friendId, content);
                        toast.dismiss(messageSendingToast);

                        if (result) {
                            toast.success(
                                `Successfully sent message to ${receiver}!`,
                            );
                        } else {
                            toast.error(
                                `Failed to send message to ${receiver}.`,
                            );
                        }
                        messageFriendOnHide();
                    }}
                    variant={
                        !dirtyFields.content && !errors.content
                            ? "outline-secondary"
                            : errors.content
                            ? "outline-danger"
                            : "outline-success"
                    }
                >
                    {"Send"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
