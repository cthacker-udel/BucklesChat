/* eslint-disable @typescript-eslint/indent -- disabled */

import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import type { User } from "@/@types";
import { TextConstants, ValidationConstants } from "@/assets";

import styles from "./EditUserModal.module.css";

type EditUserModalProperties = {
    editModalOnClose: () => void;
    showEditModal: boolean;
    username: string;
};

type FormValues = {
    dob: number;
    email: string;
    firstName: string;
    handle: string;
    lastName: string;
};

const FORM_DEFAULT_VALUES: Partial<User> = {
    dob: 0,
    email: "",
    firstName: "",
    handle: "",
    lastName: "",
};

/**
 * The modal that displays when the user clicks the pencil button that appears when the user profile
 * is hovered over
 *
 * @returns - The modal for editing the user
 */
export const EditUserModal = ({
    editModalOnClose,
    showEditModal,
    username,
}: EditUserModalProperties): JSX.Element => {
    const { data } = useSWR<Partial<User>, Partial<User>, string>(
        `user/details?username=${username}`,
    );

    const { formState, register, reset, watch } = useForm<FormValues>({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        delayError: 250,
        mode: "all",
        reValidateMode: "onBlur",
    });

    React.useEffect(() => {
        if (data !== undefined) {
            reset({ ...data });
        }
    }, [data, reset]);

    const { dirtyFields, errors, isValidating } = formState;

    return (
        <Modal onHide={editModalOnClose} show={showEditModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className={styles.edit_modal_title}>
                        <span>{"Edit User"}</span>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={styles.edit_modal_form}>
                    <Form.Group controlId="username_form">
                        <Form.Label>{"Username"}</Form.Label>
                        <Form.Control
                            className={styles.username_form}
                            readOnly
                            type="text"
                            value={username}
                        />
                    </Form.Group>
                    <Form.Group controlId="first_name_form">
                        <Form.Label>{"First Name"}</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("firstName", {
                                maxLength: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.FIRST_NAME.MAX_LENGTH,
                                    value: ValidationConstants.EDIT_MODAL
                                        .FIRST_NAME.MAX_LENGTH,
                                },
                                pattern: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.FIRST_NAME.PATTERN,
                                    value: ValidationConstants.EDIT_MODAL
                                        .FIRST_NAME.PATTERN,
                                },
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.FIRST_NAME.REQUIRED,
                                    value: ValidationConstants.EDIT_MODAL
                                        .FIRST_NAME.REQUIRED,
                                },
                            })}
                        />
                    </Form.Group>
                    <Form.Group controlId="last_name_form">
                        <Form.Label>{"Last Name"}</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("lastName", {
                                maxLength: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.LAST_NAME.MAX_LENGTH,
                                    value: ValidationConstants.EDIT_MODAL
                                        .LAST_NAME.MAX_LENGTH,
                                },
                                pattern: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.LAST_NAME.PATTERN,
                                    value: ValidationConstants.EDIT_MODAL
                                        .LAST_NAME.PATTERN,
                                },
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.LAST_NAME.REQUIRED,
                                    value: ValidationConstants.EDIT_MODAL
                                        .LAST_NAME.REQUIRED,
                                },
                            })}
                        />
                    </Form.Group>
                    <Form.Group controlId="email_form">
                        <Form.Label>{"Email"}</Form.Label>
                        <Form.Control
                            type="email"
                            {...register("email", {
                                maxLength: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.EMAIL.MAX_LENGTH,
                                    value: ValidationConstants.EDIT_MODAL.EMAIL
                                        .MAX_LENGTH,
                                },
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.EMAIL.REQUIRED,
                                    value: ValidationConstants.EDIT_MODAL.EMAIL
                                        .REQUIRED,
                                },
                            })}
                        />
                    </Form.Group>
                    <Form.Group controlId="handle_form">
                        <Form.Label>{"Handle"}</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("handle", {
                                maxLength: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.HANDLE.MAX_LENGTH,
                                    value: ValidationConstants.EDIT_MODAL.HANDLE
                                        .MAX_LENGTH,
                                },
                                pattern: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.HANDLE.PATTERN,
                                    value: ValidationConstants.EDIT_MODAL.HANDLE
                                        .PATTERN,
                                },
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.HANDLE.REQUIRED,
                                    value: ValidationConstants.EDIT_MODAL.HANDLE
                                        .REQUIRED,
                                },
                            })}
                        />
                    </Form.Group>
                    <Form.Group controlId="date_of_birth_form">
                        <Form.Label>{"Date of Birth"}</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("dob", {
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.DATE_OF_BIRTH.REQUIRED,
                                    value: ValidationConstants.EDIT_MODAL
                                        .DATE_OF_BIRTH.REQUIRED,
                                },
                            })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.edit_modal_footer}>
                <Button variant="outline-secondary">{"Cancel"}</Button>
                <Button variant="outline-success">{"Confirm"}</Button>
            </Modal.Footer>
        </Modal>
    );
};
