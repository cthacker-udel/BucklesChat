/* eslint-disable react/no-array-index-key -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { Button, Form, ListGroup, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Key } from "ts-key-enum";

import { MessageService } from "@/@classes";
import type { ChatRoomMessage } from "@/@types/api/message/ChatRoomMessage";
import { Endpoints, TextConstants, ValidationConstants } from "@/assets";
import { renderTooltip } from "@/helpers";

import styles from "./ChatDisplay.module.css";
import { ChatMessage } from "./ChatMessage";

type ChatDisplayProperties = {
    closeModal: () => void;
    id: number;
    name: string;
};

type FormValues = {
    content: string;
};

const FORM_DEFAULT_VALUES: FormValues = {
    content: "",
};

/**
 * This component houses the form and action buttons to submit a message to the chat room, as well as
 * the chats themselves within the chat room
 *
 * @param props - The properties of the ChatDisplay component
 * @param props.closeModal - The callback function that closes the modal containing the form to submit this message
 * @param props.id - The id of the chat room
 * @param props.name - The name of the chat room
 * @returns The chat display modal component
 */
export const ChatDisplay = ({
    closeModal,
    id,
    name,
}: ChatDisplayProperties): JSX.Element => {
    const { data: chatMessages, mutate } = useSWR<
        ChatRoomMessage[],
        ChatRoomMessage[],
        string
    >(
        `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.MESSAGES}?id=${id}`,
    );

    const { clearErrors, control, formState, register, reset } =
        useForm<FormValues>({
            criteriaMode: "all",
            defaultValues: FORM_DEFAULT_VALUES,
            delayError: 250,
            mode: "all",
            reValidateMode: "onChange",
        });

    const [content] = useWatch<FormValues>({
        control,
        defaultValue: FORM_DEFAULT_VALUES,
        name: ["content"],
    });

    const { dirtyFields, errors, isValidating } = formState;

    const sender = "a";

    const sendMessage = React.useCallback(async () => {
        if (
            errors.content === undefined &&
            !isValidating &&
            chatMessages !== undefined
        ) {
            const sendingMessageToast = toast.loading("Sending message");
            const addingMessage = await MessageService.addMessage({
                content,
                sender,
            });
            const { data } = addingMessage;
            if (data > 0) {
                const addingToChat = await MessageService.addMessageToChatRoom(
                    id,
                    data,
                );
                const { data: createdChatMessage } = addingToChat;
                if (Object.keys(createdChatMessage).length > 0) {
                    reset();
                    clearErrors();
                    await mutate([
                        ...chatMessages,
                        createdChatMessage as ChatRoomMessage,
                    ]);
                    toast.update(sendingMessageToast, {
                        autoClose: 500,
                        isLoading: false,
                        render: "Successfully sent message",
                        type: "success",
                    });
                } else {
                    toast.update(sendingMessageToast, {
                        autoClose: 700,
                        isLoading: false,
                        render: "Failed to create message in chat",
                        type: "error",
                    });
                }
            } else {
                toast.update(sendingMessageToast, {
                    autoClose: 700,
                    isLoading: false,
                    render: "Failed to create message",
                    type: "error",
                });
            }
        }
    }, [
        chatMessages,
        clearErrors,
        content,
        errors,
        id,
        isValidating,
        mutate,
        reset,
    ]);

    return (
        <div className={styles.chat_room_messages}>
            {chatMessages && chatMessages.length > 0 && (
                <ListGroup
                    className={styles.chat_room_message_list_group}
                    variant="flush"
                >
                    {chatMessages?.map(
                        (
                            eachChatMessage: ChatRoomMessage,
                            eachChatMessageIndex: number,
                        ) => (
                            <ChatMessage
                                key={`${name}_message_${eachChatMessageIndex}`}
                                {...eachChatMessage}
                            />
                        ),
                    )}
                </ListGroup>
            )}
            <Form.Control
                as="textarea"
                className={styles.chat_room_form_control}
                isInvalid={errors.content !== undefined}
                isValid={dirtyFields.content && errors.content === undefined}
                onKeyDown={async (
                    event: React.KeyboardEvent<HTMLInputElement>,
                ): Promise<void> => {
                    const { key } = event;
                    if (key === Key.Enter) {
                        event.preventDefault();
                        await sendMessage();
                    }
                }}
                placeholder="Start a conversation!"
                type="text"
                {...register("content", {
                    maxLength: {
                        message:
                            TextConstants.VALIDATION.INVALID.CHAT.ADD_MESSAGE
                                .MAX_LENGTH,
                        value: ValidationConstants.CHAT.ADD_MESSAGE.MAX_LENGTH,
                    },
                    required: {
                        message:
                            TextConstants.VALIDATION.INVALID.CHAT.ADD_MESSAGE
                                .REQUIRED,
                        value: ValidationConstants.CHAT.ADD_MESSAGE.REQUIRED,
                    },
                })}
            />
            {errors.content && (
                <Form.Control.Feedback type="invalid">
                    {errors.content.message}
                </Form.Control.Feedback>
            )}
            <div className={styles.chat_room_message_options}>
                <OverlayTrigger
                    overlay={(properties: OverlayInjectedProps): JSX.Element =>
                        renderTooltip(properties, { title: "Cancel" })
                    }
                    placement="left"
                >
                    <Button
                        className={styles.chat_room_message_option_button}
                        onClick={(): void => {
                            clearErrors();
                            reset();
                            closeModal();
                        }}
                        variant="outline-secondary"
                    >
                        <i className="fa-solid fa-xmark" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={(properties: OverlayInjectedProps): JSX.Element =>
                        renderTooltip(properties, { title: "Send" })
                    }
                    placement="right"
                >
                    <Button
                        className={styles.chat_room_message_option_button}
                        onClick={sendMessage}
                        variant={
                            dirtyFields.content === undefined
                                ? "outline-secondary"
                                : errors.content === undefined
                                ? "outline-success"
                                : "outline-danger"
                        }
                    >
                        <i className="fa-solid fa-check" />
                    </Button>
                </OverlayTrigger>
            </div>
        </div>
    );
};
