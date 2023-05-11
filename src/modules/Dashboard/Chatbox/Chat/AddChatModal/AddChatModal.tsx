import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Key } from "ts-key-enum";

import { MessageService } from "@/@classes";
import { TextConstants, ValidationConstants } from "@/assets";
import { numericalConverter } from "@/helpers";

import styles from "./AddChatModal.module.css";

type AddChatModalProperties = {
    addChatModalOnClose: () => void;
    showAddChatModal: boolean;
};

type FormValues = {
    description: string;
    name: string;
};

const FORM_DEFAULT_VALUES: FormValues = {
    description: "",
    name: "",
};

/**
 * The modal to add a chat to the database, asks for the user to enter in the name of the chat they want to create, and a brief description
 *
 * @param props - The properties of this modal, which are passed in from the Chat component
 * @param props.addChatModalOnClose - The callback function that toggles the display of the modal
 * @param props.showAddChatModal - The boolean that controls whether the modal is displayed or not
 * @returns The add chat modal which allows the user to create a chat
 */
export const AddChatModal = ({
    addChatModalOnClose,
    showAddChatModal,
}: AddChatModalProperties): JSX.Element => {
    const { clearErrors, formState, getValues, register, reset } =
        useForm<FormValues>({
            criteriaMode: "all",
            defaultValues: FORM_DEFAULT_VALUES,
            delayError: numericalConverter.seconds.toMilliseconds(0.5),
            mode: "all",
            reValidateMode: "onChange",
        });

    const { dirtyFields, errors, isDirty, isValid, isValidating } = formState;

    const closeForm = React.useCallback(() => {
        reset();
        clearErrors();
        addChatModalOnClose();
    }, [addChatModalOnClose, clearErrors, reset]);

    const createChat = React.useCallback(async () => {
        if (
            isValid &&
            isDirty &&
            !isValidating &&
            Object.keys(errors).length === 0
        ) {
            const creatingChatToast = toast.loading("Creating chat...");
            const { description, name } = getValues();
            const response = await MessageService.createChatRoom(
                name,
                description,
            );
            const { data } = response;

            if (data) {
                toast.update(creatingChatToast, {
                    autoClose: 1000,
                    isLoading: false,
                    render: "Successfully added chat!",
                    type: "success",
                });
                closeForm();
            } else {
                toast.update(creatingChatToast, {
                    autoClose: 1000,
                    isLoading: false,
                    render: "Failed to add chat",
                    type: "error",
                });
            }
        }
    }, [closeForm, errors, getValues, isDirty, isValid, isValidating]);

    return (
        <Modal
            contentClassName={styles.add_chat_modal_content}
            onHide={closeForm}
            show={showAddChatModal}
        >
            <Modal.Header closeButton closeVariant="white">
                {"Add Chat"}
            </Modal.Header>
            <Modal.Body>
                <div
                    className={styles.add_chat_modal_form}
                    onKeyDown={async (
                        event: React.KeyboardEvent<HTMLDivElement>,
                    ): Promise<void> => {
                        const { key } = event;
                        if (key === Key.Enter) {
                            await createChat();
                        }
                    }}
                >
                    <Form.Group controlId="chat_name">
                        <Form.Label>{"Name"}</Form.Label>
                        <Form.Control
                            className={styles.add_chat_form_control}
                            isInvalid={dirtyFields.name && Boolean(errors.name)}
                            isValid={dirtyFields.name && !errors.name}
                            type="text"
                            {...register("name", {
                                maxLength: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .CREATE_CHAT.NAME.MAX_LENGTH,
                                    value: ValidationConstants.CREATE_CHAT.NAME
                                        .MAX_LENGTH,
                                },
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .CREATE_CHAT.NAME.REQUIRED,
                                    value: ValidationConstants.CREATE_CHAT.NAME
                                        .REQUIRED,
                                },
                            })}
                        />
                        {errors.name && (
                            <Form.Control.Feedback type="invalid">
                                {errors.name.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group controlId="chat_description">
                        <Form.Label>{"Description"}</Form.Label>
                        <Form.Control
                            as="textarea"
                            className={styles.add_chat_form_control}
                            isInvalid={
                                dirtyFields.description &&
                                Boolean(errors.description)
                            }
                            isValid={
                                dirtyFields.description && !errors.description
                            }
                            {...register("description", {
                                maxLength: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .CREATE_CHAT.DESCRIPTION.MAX_LENGTH,
                                    value: ValidationConstants.CREATE_CHAT
                                        .DESCRIPTION.MAX_LENGTH,
                                },
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .CREATE_CHAT.DESCRIPTION.REQUIRED,
                                    value: ValidationConstants.CREATE_CHAT
                                        .DESCRIPTION.REQUIRED,
                                },
                            })}
                        />
                    </Form.Group>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeForm} variant="outline-secondary">
                    {"Cancel"}
                </Button>
                <Button onClick={createChat} variant="outline-success">
                    {"Create"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
