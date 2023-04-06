/* eslint-disable @typescript-eslint/indent -- disabled */
import { useRouter } from "next/router";
import React from "react";
import { Button, Form, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import {
    type FieldErrors,
    type SubmitErrorHandler,
    type SubmitHandler,
    useForm,
    type ValidateResult,
} from "react-hook-form";
import { toast } from "react-toastify";
import { v4 } from "uuid";

import { ClientSideApi } from "@/@classes";
import type { ApiResponse } from "@/@types";
import { Endpoints, TextConstants, ValidationConstants } from "@/assets";
import Background from "@/assets/background/signup/bg.gif";
import { Required } from "@/common";
import { millisecondsConverter, renderTooltip } from "@/helpers";
import { useLogger } from "@/hooks";
import { useBackground } from "@/hooks/useBackground";

import { PasswordRequirement } from "./PasswordRequirement";
import styles from "./SignUp.module.css";

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
    containsDigits: boolean;
    containsErrors: boolean;
    containsLowercase: boolean;
    containsSymbol: boolean;
    containsUppercase: boolean;
    greaterThanMinLength: boolean;
    lessThanMaxLength: boolean;
    matches: boolean;
    noSpaces: boolean;
};

const DEFAULT_PASSWORD_STATE: PASSWORD_STATES = {
    containsDigits: false,
    containsErrors: false,
    containsLowercase: false,
    containsSymbol: false,
    containsUppercase: false,
    greaterThanMinLength: false,
    lessThanMaxLength: false,
    matches: false,
    noSpaces: false,
};

/**
 * Validates the password entered in by the user
 *
 * @param password - The current password entered in
 * @param confirmPassword - The confirmation password entered in
 */
const validatePassword = (
    password: string,
    confirmPassword: string,
): PASSWORD_STATES => {
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
    newState.matches =
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword;

    newState.containsErrors = !(
        newState.containsDigits &&
        newState.containsLowercase &&
        newState.containsUppercase &&
        newState.containsSymbol &&
        newState.lessThanMaxLength &&
        newState.greaterThanMinLength &&
        newState.noSpaces &&
        newState.matches
    );

    return newState;
};

/**
 *
 * @returns
 */
export const SignUp = (): JSX.Element => {
    useBackground(Background);
    const { ...loggerApi } = useLogger();
    const router = useRouter();

    const { formState, handleSubmit, register, setError, trigger, watch } =
        useForm<FormValues>({
            criteriaMode: "all",
            defaultValues: FORM_DEFAULT_VALUES,
            delayError: millisecondsConverter(500),
            mode: "onSubmit",
            reValidateMode: "onBlur",
        });

    const { errors, dirtyFields, isValid, isValidating } = formState;

    const onSubmit: SubmitHandler<FormValues> = React.useCallback(
        async (data: FormValues, _event: unknown) => {
            await trigger();
            if (
                Object.keys(errors).length === 0 &&
                isValid &&
                !isValidating &&
                Object.values(dirtyFields).length === 3
            ) {
                try {
                    const request = ClientSideApi.post<ApiResponse<boolean>>(
                        `${Endpoints.USER.BASE}${Endpoints.USER.SIGNUP}`,
                        data,
                    );

                    const result = await toast.promise(request, {
                        error: "Failed to signup",
                        pending: "Signing up...",
                        success: "Successfully signed up!",
                    });

                    const { apiError, data: signUpResult } = result;

                    if (signUpResult && !apiError) {
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises -- disabled
                        router.push("dashboard");
                    } else if (apiError && apiError.code === 500) {
                        setError("root", {
                            message: "Server error, please try again later",
                        });
                    }
                } catch (error: unknown) {
                    await loggerApi.logException(error as Error, v4());
                }
            }
        },
        [
            dirtyFields,
            errors,
            isValid,
            isValidating,
            loggerApi,
            setError,
            router,
            trigger,
        ],
    );

    const onError: SubmitErrorHandler<FormValues> = React.useCallback(
        async (fieldErrors: FieldErrors<FormValues>, _event: unknown) => {
            await loggerApi.logException(
                new Error(
                    JSON.stringify(
                        Object.entries(fieldErrors)
                            .map((element) => element[1].message)
                            .join(", "),
                    ),
                ),
            );
        },
        [loggerApi],
    );

    const [passwordState, setPasswordState] = React.useState<PASSWORD_STATES>(
        DEFAULT_PASSWORD_STATE,
    );

    const [passwordValue, confirmPasswordValue] = watch([
        "password",
        "confirmPassword",
    ]);

    React.useEffect(() => {
        setPasswordState(
            validatePassword(passwordValue.trim(), confirmPasswordValue.trim()),
        );
    }, [passwordValue, confirmPasswordValue]);

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
                            autoComplete="off"
                            isInvalid={Boolean(errors.username)}
                            isValid={
                                !errors.username &&
                                dirtyFields.username &&
                                !isValidating
                            }
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
                                validate: {
                                    doesUsernameExist: async (
                                        username: string,
                                    ): Promise<ValidateResult> => {
                                        if (
                                            username.replace(/\W/gu, "").trim()
                                                .length > 0
                                        ) {
                                            const response =
                                                await ClientSideApi.get<
                                                    ApiResponse<boolean>
                                                >(
                                                    `${Endpoints.USER.BASE}${Endpoints.USER.DOES_EXIST}?username=${username}`,
                                                );

                                            const {
                                                apiError,
                                                data: isExisting,
                                            } = response;

                                            return (
                                                (apiError &&
                                                    "Server error, please try again later") ||
                                                !isExisting ||
                                                "Username already exists"
                                            );
                                        }
                                        return true;
                                    },
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            })}
                        />
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
                    <PasswordRequirement
                        isValid={passwordState.matches}
                        message={
                            TextConstants.VALIDATION.INVALID.SIGN_UP.PASSWORD
                                .MATCHING
                        }
                    />
                </div>
            </div>
        </div>
    );
};
