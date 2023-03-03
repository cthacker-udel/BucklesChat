/* eslint-disable @typescript-eslint/indent -- disabled */
import { validate } from "email-validator";
import React from "react";
import { Form, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { useForm } from "react-hook-form";

import { TextConstants, ValidationConstants } from "@/assets";
import Background from "@/assets/background/signup/bg.gif";
import { renderTooltip } from "@/helpers";
import { useBackground } from "@/hooks/useBackground";

import styles from "./SignUp.module.css";

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    handle: string;
    dob: number;
    password: string;
    confirmPassword: string;
};

const FORM_DEFAULT_VALUES: FormValues = {
    confirmPassword: "",
    dob: Date.now(),
    email: "",
    firstName: "",
    handle: "",
    lastName: "",
    password: "",
    username: "",
};

/**
 *
 * @returns
 */
export const SignUp = (): JSX.Element => {
    useBackground(Background);

    const { formState, register } = useForm<FormValues>({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        mode: "all",
        reValidateMode: "onChange",
    });

    const { errors, dirtyFields, isValid } = formState;

    console.log(errors, isValid);

    return (
        <div className={styles.sign_up_content}>
            <div className={styles.sign_up_header}>
                {TextConstants.CONTENT.SIGN_UP.TITLE}
                <OverlayTrigger
                    overlay={(properties: OverlayInjectedProps): JSX.Element =>
                        renderTooltip(properties, {
                            title: "Back to Home Page",
                        })
                    }
                    placement="top"
                >
                    <i
                        className={`fa-solid fa-circle-arrow-left ${styles.sign_up_back_button}`}
                        onClick={(): void => {
                            window.location.href = window.location.origin;
                        }}
                    />
                </OverlayTrigger>
            </div>
            <Form className={styles.sign_up_form_content}>
                <Form.Group controlId="first_name_form">
                    <Form.Label>
                        {TextConstants.CONTENT.SIGN_UP.FORM_1_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={Boolean(errors.firstName)}
                        isValid={
                            Boolean(dirtyFields.firstName) && !errors.firstName
                        }
                        placeholder={
                            TextConstants.CONTENT.SIGN_UP.FORM_1_PLACEHOLDER
                        }
                        type="text"
                        {...register("firstName", {
                            maxLength: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_1.MAX_LENGTH,
                                value: ValidationConstants.SIGN_UP.FORM
                                    .FIRST_NAME.MAX_LENGTH,
                            },
                            pattern: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_1.PATTERN,
                                value: ValidationConstants.SIGN_UP.FORM
                                    .FIRST_NAME.PATTERN,
                            },
                            required: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_1.REQUIRED,
                                value: ValidationConstants.SIGN_UP.FORM
                                    .FIRST_NAME.REQUIRED,
                            },
                        })}
                    />
                    {errors.firstName && (
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName.message}
                        </Form.Control.Feedback>
                    )}
                    {errors.firstName === undefined &&
                        dirtyFields.firstName && (
                            <Form.Control.Feedback type="valid">
                                {TextConstants.VALIDATION.VALID.SIGN_UP.FORM_1}
                            </Form.Control.Feedback>
                        )}
                </Form.Group>
                <Form.Group controlId="last_name_form">
                    <Form.Label>
                        {TextConstants.CONTENT.SIGN_UP.FORM_2_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={Boolean(errors.lastName)}
                        isValid={!errors.lastName && dirtyFields.lastName}
                        placeholder={
                            TextConstants.CONTENT.SIGN_UP.FORM_2_PLACEHOLDER
                        }
                        type="text"
                        {...register("lastName", {
                            maxLength: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_2.MAX_LENGTH,
                                value: ValidationConstants.SIGN_UP.FORM
                                    .LAST_NAME.MAX_LENGTH,
                            },
                            pattern: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_2.PATTERN,
                                value: ValidationConstants.SIGN_UP.FORM
                                    .LAST_NAME.PATTERN,
                            },
                            required: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_2.REQUIRED,
                                value: ValidationConstants.SIGN_UP.FORM
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
                            {TextConstants.VALIDATION.VALID.SIGN_UP.FORM_2}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="email_form">
                    <Form.Label>
                        {TextConstants.CONTENT.SIGN_UP.FORM_3_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={Boolean(errors.email)}
                        isValid={!errors.email && dirtyFields.email}
                        placeholder={
                            TextConstants.CONTENT.SIGN_UP.FORM_3_PLACEHOLDER
                        }
                        type="email"
                        {...register("email", {
                            maxLength: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_3.MAX_LENGTH,
                                value: ValidationConstants.SIGN_UP.FORM.EMAIL
                                    .MAX_LENGTH,
                            },
                            required: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_3.REQUIRED,
                                value: ValidationConstants.SIGN_UP.FORM.EMAIL
                                    .REQUIRED,
                            },
                            validate: {
                                isValidEmail: (email) =>
                                    validate(email) ||
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_3.PATTERN,
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
                            {TextConstants.VALIDATION.VALID.SIGN_UP.FORM_3}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="username_form">
                    <Form.Label>
                        {TextConstants.CONTENT.SIGN_UP.FORM_4_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={Boolean(errors.username)}
                        isValid={!errors.username && dirtyFields.username}
                        placeholder={
                            TextConstants.CONTENT.SIGN_UP.FORM_4_PLACEHOLDER
                        }
                        type="text"
                        {...register("username", {
                            maxLength: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_4.MAX_LENGTH,
                                value: ValidationConstants.SIGN_UP.FORM.USERNAME
                                    .MAX_LENGTH,
                            },
                            pattern: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_4.PATTERN,
                                value: ValidationConstants.SIGN_UP.FORM.USERNAME
                                    .PATTERN,
                            },
                            required: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_4.REQUIRED,
                                value: ValidationConstants.SIGN_UP.FORM.USERNAME
                                    .REQUIRED,
                            },
                        })}
                    />
                    {errors.username && (
                        <Form.Control.Feedback type="invalid">
                            {errors.username.message}
                        </Form.Control.Feedback>
                    )}
                    {!errors.username && (
                        <Form.Control.Feedback type="valid">
                            {TextConstants.VALIDATION.VALID.SIGN_UP.FORM_4}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group controlId="handle_form">
                    <Form.Label>
                        {TextConstants.CONTENT.SIGN_UP.FORM_5_LABEL}
                    </Form.Label>
                    <Form.Control
                        isInvalid={Boolean(errors.handle)}
                        isValid={!errors.handle && dirtyFields.handle}
                        placeholder={
                            TextConstants.CONTENT.SIGN_UP.FORM_5_PLACEHOLDER
                        }
                        type="text"
                        {...register("handle", {
                            maxLength: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_5.MAX_LENGTH,
                                value: ValidationConstants.SIGN_UP.FORM.HANDLE
                                    .MAX_LENGTH,
                            },
                            pattern: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_5.PATTERN,
                                value: ValidationConstants.SIGN_UP.FORM.HANDLE
                                    .PATTERN,
                            },
                            required: {
                                message:
                                    TextConstants.VALIDATION.INVALID.SIGN_UP
                                        .FORM_5.REQUIRED,
                                value: ValidationConstants.SIGN_UP.FORM.HANDLE
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
                            {TextConstants.VALIDATION.VALID.SIGN_UP.FORM_5}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
            </Form>
        </div>
    );
};
