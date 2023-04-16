/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { TextConstants, ValidationConstants } from "@/assets";

import styles from "./ReplyToModal.module.css";

type ReplyToModalProperties = {
    receiver: string;
    replyToModalOnHide: () => void;
    sender: string;
    showReplyToModal: boolean;
};

type FormValues = {
    content: string;
};

const FORM_DEFAULT_VALUES = {
    content: "",
};

/**
 * Modal dedicated to replying to DMs the user chooses to reply to
 *
 * @param props - The properties of the ReplyToModal component, which are passed from the InboxOffCanvas component
 * @param props.showReplyToModal - Boolean indicating whether to show the modal
 * @returns The modal used for replying to an inbox message
 */
export const ReplyToModal = ({
    receiver,
    replyToModalOnHide,
    sender,
    showReplyToModal,
}: ReplyToModalProperties): JSX.Element => {
    const { formState, register, reset } = useForm<FormValues>({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        delayError: 250,
        mode: "all",
        reValidateMode: "onBlur",
    });

    const { dirtyFields, errors } = formState;

    return (
        <Modal
            contentClassName={styles.reply_to_modal_content}
            onHide={replyToModalOnHide}
            show={showReplyToModal}
        >
            <Modal.Header
                className={styles.reply_to_modal_header}
                closeButton
                closeVariant="white"
            >
                <Modal.Title>
                    {"Reply to "}{" "}
                    <span className={styles.reply_to_user}>{sender}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    as="textarea"
                    isInvalid={Boolean(errors.content)}
                    isValid={dirtyFields.content && !errors.content}
                    placeholder="Enter in reply..."
                    {...register("content", {
                        maxLength: {
                            message:
                                TextConstants.VALIDATION.INVALID
                                    .REPLY_MESSAGE_MODAL.CONTENT.MAX_LENGTH,
                            value: ValidationConstants.REPLY_MESSAGE_MODAL
                                .CONTENT.MAX_LENGTH,
                        },
                        required: {
                            message:
                                TextConstants.VALIDATION.INVALID
                                    .REPLY_MESSAGE_MODAL.CONTENT.REQUIRED,
                            value: ValidationConstants.REPLY_MESSAGE_MODAL
                                .CONTENT.REQUIRED,
                        },
                    })}
                />
                {errors.content && (
                    <Form.Control.Feedback type="invalid">
                        {errors.content.message}
                    </Form.Control.Feedback>
                )}
                {dirtyFields.content && !errors.content && (
                    <Form.Control.Feedback type="valid">
                        {
                            TextConstants.VALIDATION.VALID
                                .REPLY_TO_MESSAGE_MODAL.CONTENT
                        }
                    </Form.Control.Feedback>
                )}
            </Modal.Body>
            <Modal.Footer className={styles.reply_to_modal_footer}>
                <Button
                    onClick={(): void => {
                        reset();
                        replyToModalOnHide();
                    }}
                    variant="outline-secondary"
                >
                    {"Close"}
                </Button>
                <Button
                    disabled={!dirtyFields.content || Boolean(errors.content)}
                    variant={
                        !dirtyFields.content && !errors.content
                            ? "outline-secondary"
                            : errors.content
                            ? "outline-danger"
                            : "outline-success"
                    }
                >
                    <i className="fa-solid fa-reply fa-xs" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
