/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
import { useRouter } from "next/router";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Key } from "ts-key-enum";

import { UserService } from "@/@classes";
import type { User } from "@/@types";
import {
    Endpoints,
    RegexConstants,
    TextConstants,
    ValidationConstants,
} from "@/assets";

import styles from "./EditUserModal.module.css";

type EditUserModalProperties = {
    editModalOnClose: () => void;
    mutateHandle: (_handleValue: string) => Promise<void>;
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
    mutateHandle,
    showEditModal,
    username,
}: EditUserModalProperties): JSX.Element => {
    const router = useRouter();

    const { clearErrors, formState, getValues, register, reset, resetField } =
        useForm<FormValues>({
            criteriaMode: "all",
            defaultValues: FORM_DEFAULT_VALUES,
            delayError: 250,
            mode: "all",
            reValidateMode: "onBlur",
        });

    const { data, error, isLoading } = useSWR<Partial<User>, Error, string>(
        `${Endpoints.USER.BASE}${Endpoints.USER.DETAILS}`,
    );

    const { dirtyFields, errors, isValidating, isDirty } = formState;

    React.useEffect(() => {
        if (data !== undefined) {
            const resetValues: { [key: string]: number | string } = {
                ...FORM_DEFAULT_VALUES,
            };
            for (const [key, value] of Object.entries(data)) {
                if (value !== null) {
                    resetValues[key] = value;
                }
            }
            reset({ ...resetValues });
        }
    }, [data, reset]);

    const canceledEdit = React.useCallback((): void => {
        if (data !== undefined) {
            for (const eachKey of Object.keys(data)) {
                resetField(
                    eachKey as
                        | "dob"
                        | "email"
                        | "firstName"
                        | "handle"
                        | "lastName",
                    {
                        defaultValue: (data as { [key: string]: string })[
                            eachKey
                        ],
                    },
                );
                clearErrors(
                    eachKey as
                        | "dob"
                        | "email"
                        | "firstName"
                        | "handle"
                        | "lastName",
                );
            }
        }

        editModalOnClose();
    }, [clearErrors, data, editModalOnClose, resetField]);

    const editUser = React.useCallback(async (): Promise<void> => {
        const formValues = getValues() as unknown as FormValues & {
            [key: string]: string;
        };
        const values: { [key: string]: unknown } = {};

        if (formValues.handle !== undefined) {
            await mutateHandle(formValues.handle);
        }

        for (const eachDirtyField of Object.keys(dirtyFields)) {
            values[eachDirtyField] = formValues[eachDirtyField];
        }

        if (Object.keys(values).length > 0) {
            for (const eachKey of Object.keys(values)) {
                resetField(
                    eachKey as
                        | "dob"
                        | "email"
                        | "firstName"
                        | "handle"
                        | "lastName",
                    {
                        defaultValue: values[eachKey] as string,
                    },
                );
                clearErrors(
                    eachKey as
                        | "dob"
                        | "email"
                        | "firstName"
                        | "handle"
                        | "lastName",
                );
            }

            const updateToast = toast.loading("Updating profile...");
            const { data: didUpdate } = await UserService.editUser({
                ...values,
                username,
            });
            toast.dismiss(updateToast);
            if (didUpdate) {
                toast.success("Updated profile!");
                editModalOnClose();
            } else {
                toast.error("Failed to update profile.");
            }
        } else {
            toast.info("No values were changed");
        }
    }, [
        clearErrors,
        dirtyFields,
        editModalOnClose,
        getValues,
        mutateHandle,
        resetField,
        username,
    ]);

    if (error !== undefined) {
        router.push("/login");
    }

    if (data === undefined || isLoading) {
        return <span />;
    }

    return (
        <Modal
            contentClassName={styles.edit_modal_content}
            onHide={editModalOnClose}
            show={showEditModal}
        >
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>
                    <div className={styles.edit_modal_title}>
                        <span>{"Edit User"}</span>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    className={styles.edit_modal_form}
                    onKeyDown={async (
                        event: React.KeyboardEvent<HTMLFormElement>,
                    ): Promise<void> => {
                        const { key } = event;
                        if (
                            key === Key.Enter &&
                            !isValidating &&
                            Object.keys(errors).length === 0 &&
                            isDirty
                        ) {
                            await editUser();
                        }
                    }}
                >
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
                            isInvalid={Boolean(errors.firstName)}
                            isValid={dirtyFields.firstName && !errors.firstName}
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
                        {errors.firstName && (
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName.message}
                            </Form.Control.Feedback>
                        )}
                        {!errors.firstName && dirtyFields.firstName && (
                            <Form.Control.Feedback type="valid">
                                {
                                    TextConstants.VALIDATION.VALID.EDIT_MODAL
                                        .FIRST_NAME
                                }
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group controlId="last_name_form">
                        <Form.Label>{"Last Name"}</Form.Label>
                        <Form.Control
                            isInvalid={Boolean(errors.lastName)}
                            isValid={dirtyFields.lastName && !errors.lastName}
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
                        {errors.lastName && (
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName.message}
                            </Form.Control.Feedback>
                        )}
                        {!errors.lastName && dirtyFields.lastName && (
                            <Form.Control.Feedback type="valid">
                                {
                                    TextConstants.VALIDATION.VALID.EDIT_MODAL
                                        .LAST_NAME
                                }
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group controlId="email_form">
                        <Form.Label>{"Email"}</Form.Label>
                        <Form.Control
                            isInvalid={Boolean(errors.email)}
                            isValid={dirtyFields.email && !errors.email}
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
                                validate: {
                                    isEmailValid: async (email: string) => {
                                        if (email === "") {
                                            return true;
                                        }

                                        if (!RegexConstants.EMAIL.test(email)) {
                                            return "Email is invalid (format incorrect)";
                                        }

                                        const result =
                                            await UserService.isEmailValid(
                                                email,
                                            );

                                        if (result === undefined) {
                                            return "Email is invalid (unable to verify)";
                                        }
                                        const { data: isEmailValidData } =
                                            result;

                                        if (isEmailValidData) {
                                            return true;
                                        }

                                        return "Email is invalid (not an actual email)";
                                    },
                                },
                            })}
                        />
                        {errors.email && (
                            <Form.Control.Feedback type="invalid">
                                {errors.email.message}
                            </Form.Control.Feedback>
                        )}
                        {!errors.email && dirtyFields.email && (
                            <Form.Control.Feedback type="valid">
                                {
                                    TextConstants.VALIDATION.VALID.EDIT_MODAL
                                        .EMAIL
                                }
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group controlId="handle_form">
                        <Form.Label>{"Handle"}</Form.Label>
                        <Form.Control
                            isInvalid={Boolean(errors.handle)}
                            isValid={dirtyFields.handle && !errors.handle}
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
                        {errors.handle && (
                            <Form.Control.Feedback type="invalid">
                                {errors.handle.message}
                            </Form.Control.Feedback>
                        )}
                        {!errors.handle && dirtyFields.handle && (
                            <Form.Control.Feedback type="valid">
                                {
                                    TextConstants.VALIDATION.VALID.EDIT_MODAL
                                        .HANDLE
                                }
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group controlId="date_of_birth_form">
                        <Form.Label>{"Date of Birth"}</Form.Label>
                        <Form.Control
                            isInvalid={Boolean(errors.dob)}
                            isValid={dirtyFields.dob && !errors.dob}
                            type="date"
                            {...register("dob", {
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID
                                            .EDIT_MODAL.DATE_OF_BIRTH.REQUIRED,
                                    value: ValidationConstants.EDIT_MODAL
                                        .DATE_OF_BIRTH.REQUIRED,
                                },
                                validate: {
                                    noFuture: (dateString: number | string) => {
                                        if (
                                            typeof dateString === "string" &&
                                            dateString.length === 0
                                        ) {
                                            return true;
                                        }

                                        const parsedDate = new Date(dateString);
                                        return (
                                            parsedDate.getTime() < Date.now() ||
                                            TextConstants.VALIDATION.INVALID
                                                .EDIT_MODAL.DATE_OF_BIRTH
                                                .NO_FUTURE
                                        );
                                    },
                                    noOneHundredPlus: (
                                        dateString: number | string,
                                    ) => {
                                        if (
                                            typeof dateString === "string" &&
                                            dateString.length === 0
                                        ) {
                                            return true;
                                        }

                                        const parsedDate = new Date(dateString);
                                        return (
                                            new Date(
                                                Date.now(),
                                            ).getUTCFullYear() -
                                                parsedDate.getUTCFullYear() <
                                                100 ||
                                            TextConstants.VALIDATION.INVALID
                                                .EDIT_MODAL.DATE_OF_BIRTH
                                                .NO_100_PLUS
                                        );
                                    },
                                },
                            })}
                        />
                        {errors.dob && (
                            <Form.Control.Feedback type="invalid">
                                {errors.dob.message}
                            </Form.Control.Feedback>
                        )}
                        {!errors.dob && dirtyFields.dob && (
                            <Form.Control.Feedback type="valid">
                                {
                                    TextConstants.VALIDATION.VALID.EDIT_MODAL
                                        .DATE_OF_BIRTH
                                }
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.edit_modal_footer}>
                <Button onClick={canceledEdit} variant="outline-secondary">
                    {"Cancel"}
                </Button>
                <Button
                    disabled={
                        !isValidating &&
                        (Object.keys(errors).length > 0 || !isDirty)
                    }
                    onClick={editUser}
                    variant={
                        !isValidating && Object.keys(errors).length === 0
                            ? "success"
                            : "secondary"
                    }
                >
                    {"Confirm"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
