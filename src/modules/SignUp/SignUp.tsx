/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { Button, Form, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import {
    type FieldErrors,
    type SubmitErrorHandler,
    type SubmitHandler,
    useForm,
} from "react-hook-form";

import { Endpoints, TextConstants, ValidationConstants } from "@/assets";
import Background from "@/assets/background/signup/bg.gif";
import { Required } from "@/common";
import { renderTooltip } from "@/helpers";
import { useBackground } from "@/hooks/useBackground";

import { PasswordRequirement } from "./PasswordRequirement";
import styles from "./SignUp.module.css";
import axios from "axios";

type FormValues = {
    username: string;
    password: string;
    confirmPassword: string;
};

const FORM_DEFAULT_VALUES: FormValues = {
    confirmPassword: "",
    password: "",
    username: "",
};

type PASSWORD_STATES = {
    containsErrors: boolean;
    noSpaces: boolean;
    greaterThanMinLength: boolean;
    lessThanMaxLength: boolean;
    containsSymbol: boolean;
    containsLowercase: boolean;
    containsUppercase: boolean;
    containsDigits: boolean;
};

const DEFAULT_PASSWORD_STATE: PASSWORD_STATES = {
    containsDigits: false,
    containsErrors: false,
    containsLowercase: false,
    containsSymbol: false,
    containsUppercase: false,
    greaterThanMinLength: false,
    lessThanMaxLength: false,
    noSpaces: false,
};

/**
 *
 * @param password
 */
const validatePassword = (password: string): PASSWORD_STATES => {
    const newState = { ...DEFAULT_PASSWORD_STATE };
    newState.containsDigits = new RegExp(
        ValidationConstants.SIGN_UP.FORM.PASSWORD.CONTAINS_DIGIT,
        "u",
    ).test(password);
    newState.containsLowercase = new RegExp(
        ValidationConstants.SIGN_UP.FORM.PASSWORD.CONTAINS_LOWERCASE,
        "u",
    ).test(password);
    newState.containsUppercase = new RegExp(
        ValidationConstants.SIGN_UP.FORM.PASSWORD.CONTAINS_UPPERCASE,
        "u",
    ).test(password);
    newState.containsSymbol = new RegExp(
        ValidationConstants.SIGN_UP.FORM.PASSWORD.CONTAINS_SYMBOL,
        "u",
    ).test(password);
    newState.lessThanMaxLength =
        password.length <
            ValidationConstants.SIGN_UP.FORM.PASSWORD.MAX_LENGTH &&
        password.length > 0;
    newState.greaterThanMinLength =
        password.length > ValidationConstants.SIGN_UP.FORM.PASSWORD.MIN_LENGTH;
    newState.noSpaces =
        !new RegExp(
            ValidationConstants.SIGN_UP.FORM.PASSWORD.NO_SPACES,
            "u",
        ).test(password) && password.length > 0;

    newState.containsErrors = !(
        newState.containsDigits &&
        newState.containsLowercase &&
        newState.containsUppercase &&
        newState.containsSymbol &&
        newState.lessThanMaxLength &&
        newState.greaterThanMinLength &&
        newState.noSpaces
    );

    return newState;
};

/**
 *
 * @returns
 */
export const SignUp = (): JSX.Element => {
    useBackground(Background);

    const { formState, handleSubmit, register, watch } = useForm<FormValues>({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        mode: "all",
        reValidateMode: "onChange",
    });

    const { errors, dirtyFields, isValid, isValidating } = formState;

    const onSubmit: SubmitHandler<FormValues> = React.useCallback(
        async (data: FormValues, _event: unknown) => {
            if (
                !(Boolean(errors) || false) &&
                isValid &&
                !isValidating &&
                Object.values(dirtyFields).length === 3
            ) {
                const result = await axios.post(
                    `${process.env.SERVICE_URL}${Endpoints.USER.BASE}${Endpoints.USER.CREATE}`,
                    data,
                );
                if (result.status === 400) {
                }
            }
        },
        [dirtyFields, errors, isValid, isValidating],
    );

    const onError: SubmitErrorHandler<FormValues> = React.useCallback(
        (errors: FieldErrors<FormValues>, _event: unknown) => {
            console.log(errors);
        },
        [],
    );

    const [passwordState, setPasswordState] = React.useState<PASSWORD_STATES>(
        DEFAULT_PASSWORD_STATE,
    );

    const passwordValue = watch("password");

    React.useEffect(() => {
        setPasswordState(validatePassword(passwordValue));
    }, [passwordValue]);

    return (
        <div className={styles.sign_up_layout}>
            <div className={styles.sign_up_content}>
                <div className={styles.sign_up_header}>
                    {TextConstants.CONTENT.SIGN_UP.TITLE}
                    <OverlayTrigger
                        overlay={(
                            properties: OverlayInjectedProps,
                        ): JSX.Element =>
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
                <Form
                    className={styles.sign_up_form_content}
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    <Form.Group controlId="username_form">
                        <Form.Label>
                            {TextConstants.CONTENT.SIGN_UP.USERNAME_LABEL}
                            <Required paddingLeft />
                        </Form.Label>
                        <Form.Control
                            isInvalid={Boolean(errors.username)}
                            isValid={!errors.username && dirtyFields.username}
                            placeholder={
                                TextConstants.CONTENT.SIGN_UP
                                    .USERNAME_PLACEHOLDER
                            }
                            type="text"
                            {...register("username", {
                                maxLength: {
                                    message:
                                        TextConstants.VALIDATION.INVALID.SIGN_UP
                                            .USERNAME.MAX_LENGTH,
                                    value: ValidationConstants.SIGN_UP.FORM
                                        .USERNAME.MAX_LENGTH,
                                },
                                pattern: {
                                    message:
                                        TextConstants.VALIDATION.INVALID.SIGN_UP
                                            .USERNAME.PATTERN,
                                    value: ValidationConstants.SIGN_UP.FORM
                                        .USERNAME.PATTERN,
                                },
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID.SIGN_UP
                                            .USERNAME.REQUIRED,
                                    value: ValidationConstants.SIGN_UP.FORM
                                        .USERNAME.REQUIRED,
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
                                {
                                    TextConstants.VALIDATION.VALID.SIGN_UP
                                        .USERNAME
                                }
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group controlId="password_form">
                        <Form.Label>
                            {TextConstants.CONTENT.SIGN_UP.PASSWORD_LABEL}
                            <Required paddingLeft />
                        </Form.Label>
                        <Form.Control
                            placeholder={
                                TextConstants.CONTENT.SIGN_UP
                                    .PASSWORD_PLACEHOLDER
                            }
                            type="password"
                            {...register("password", {
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID.SIGN_UP
                                            .PASSWORD.REQUIRED,
                                    value: ValidationConstants.SIGN_UP.FORM
                                        .PASSWORD.REQUIRED,
                                },
                            })}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirm_password_form">
                        <Form.Label>
                            {
                                TextConstants.CONTENT.SIGN_UP
                                    .CONFIRM_PASSWORD_LABEL
                            }
                            <Required paddingLeft />
                        </Form.Label>
                        <Form.Control
                            isInvalid={Boolean(errors.confirmPassword)}
                            isValid={
                                !errors.confirmPassword &&
                                dirtyFields.confirmPassword
                            }
                            placeholder={
                                TextConstants.CONTENT.SIGN_UP
                                    .CONFIRM_PASSWORD_PLACEHOLDER
                            }
                            type="password"
                            {...register("confirmPassword", {
                                required: {
                                    message:
                                        TextConstants.VALIDATION.INVALID.SIGN_UP
                                            .CONFIRM_PASSWORD.REQUIRED,
                                    value: ValidationConstants.SIGN_UP.FORM
                                        .CONFIRM_PASSWORD.REQUIRED,
                                },
                                validate: {
                                    samePasswords: (value: string) => {
                                        if (value.length > 0) {
                                            return (
                                                value === passwordValue ||
                                                TextConstants.VALIDATION.INVALID
                                                    .SIGN_UP.CONFIRM_PASSWORD
                                                    .MATCHING
                                            );
                                        }
                                        return true;
                                    },
                                },
                            })}
                        />
                        {errors.confirmPassword && (
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword.message}
                            </Form.Control.Feedback>
                        )}
                        {!errors.confirmPassword &&
                            dirtyFields.confirmPassword && (
                                <Form.Control.Feedback type="valid">
                                    {
                                        TextConstants.VALIDATION.VALID.SIGN_UP
                                            .CONFIRM_PASSWORD
                                    }
                                </Form.Control.Feedback>
                            )}
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        {TextConstants.CONTENT.SIGN_UP.FORM_SUBMIT_BUTTON_TEXT}
                    </Button>
                </Form>
            </div>
            <div className={styles.sign_up_password_requirements}>
                <div className={styles.sign_up_password_requirements_header}>
                    {"Password Requirements"}
                </div>
                <div className={styles.sign_up_password_requirements_list}>
                    <PasswordRequirement
                        isValid={passwordState.lessThanMaxLength}
                        message={
                            TextConstants.VALIDATION.INVALID.SIGN_UP.PASSWORD
                                .MAX_LENGTH
                        }
                    />
                    <PasswordRequirement
                        isValid={passwordState.greaterThanMinLength}
                        message={
                            TextConstants.VALIDATION.INVALID.SIGN_UP.PASSWORD
                                .MIN_LENGTH
                        }
                    />
                    <PasswordRequirement
                        isValid={passwordState.containsDigits}
                        message={
                            TextConstants.VALIDATION.INVALID.SIGN_UP.PASSWORD
                                .CONTAINS_DIGIT
                        }
                    />
                    <PasswordRequirement
                        isValid={passwordState.containsLowercase}
                        message={
                            TextConstants.VALIDATION.INVALID.SIGN_UP.PASSWORD
                                .CONTAINS_LOWERCASE
                        }
                    />
                    <PasswordRequirement
                        isValid={passwordState.containsUppercase}
                        message={
                            TextConstants.VALIDATION.INVALID.SIGN_UP.PASSWORD
                                .CONTAINS_UPPERCASE
                        }
                    />
                    <PasswordRequirement
                        isValid={passwordState.containsSymbol}
                        message={
                            TextConstants.VALIDATION.INVALID.SIGN_UP.PASSWORD
                                .CONTAINS_SYMBOL
                        }
                    />
                    <PasswordRequirement
                        isValid={passwordState.noSpaces}
                        message={
                            TextConstants.VALIDATION.INVALID.SIGN_UP.PASSWORD
                                .NO_SPACES
                        }
                    />
                </div>
            </div>
        </div>
    );
};
