/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
import { useRouter } from "next/router";
import React from "react";
import {
    Button,
    Form,
    InputGroup,
    Modal,
    OverlayTrigger,
} from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { Key } from "ts-key-enum";

import { UserService } from "@/@classes";
import { RegexConstants, TextConstants, ValidationConstants } from "@/assets";
import { numericalConverter, renderTooltip } from "@/helpers";

import styles from "./UserSettingsModal.module.css";

type UserSettingsModalProperties = {
    userSettingsModalOnClose: () => void;
    showUserSettingsModal: boolean;
};

type ConfirmPasswordValues = {
    confirmPassword: string;
    password: string;
};

const FORM_DEFAULT_VALUES: ConfirmPasswordValues = {
    confirmPassword: "",
    password: "",
};

/**
 * User settings modal, modal for editing the user settings
 *
 * @param props - The properties of the user settings modal
 * @param props.userSettingsModalOnClose - The callback function that fires when the modal closes
 * @param props.showUserSettingsModal - Boolean that controls whether the modal opens or closes
 * @returns
 */
export const UserSettingsModal = ({
    showUserSettingsModal,
    userSettingsModalOnClose,
}: UserSettingsModalProperties): JSX.Element => {
    const router = useRouter();
    const { control, formState, getValues, register } =
        useForm<ConfirmPasswordValues>({
            criteriaMode: "all",
            defaultValues: FORM_DEFAULT_VALUES,
            delayError: numericalConverter.seconds.toMilliseconds(0.5),
            mode: "all",
            reValidateMode: "onChange",
        });

    const [isPending, startTransition] = React.useTransition();

    const [hoveringOverChangePassword, setHoveringOverChangePassword] =
        React.useState<boolean>(false);
    const [hoveringOverDeleteAccount, setHoveringOverDeleteAccount] =
        React.useState<boolean>(false);
    const [confirmChangePasswordButton, setConfirmChangePasswordButton] =
        React.useState<boolean>(false);

    const [displayChangePasswordForm, setDisplayChangePasswordForm] =
        React.useState<boolean>(false);

    const [showPasswords, setShowPasswords] = React.useState<boolean>(false);

    const { errors } = formState;

    const onChangePassword = React.useCallback(async (): Promise<void> => {
        const { password } = getValues();

        if (Object.keys(errors).length === 0) {
            const changingPasswordToast = toast.loading("Changing password...");

            const changePasswordResult = await UserService.changePassword(
                password,
            );

            const { data: changeResult } = changePasswordResult;

            if (changeResult) {
                toast.update(changingPasswordToast, {
                    autoClose: 1000,
                    isLoading: false,
                    render: "Successfully changed password",
                    type: "success",
                });
                await UserService.logout();
                router.push("/login");
            } else {
                toast.update(changingPasswordToast, {
                    autoClose: 1000,
                    isLoading: false,
                    render: "Failed to change password",
                    type: "error",
                });
            }
        } else {
            const { password: passwordError } = errors;
            if (passwordError === undefined) {
                const { confirmPassword: confirmPasswordError } = errors;
                toast.error(confirmPasswordError?.message, { autoClose: 1000 });
            } else {
                toast.error(passwordError.message, { autoClose: 1000 });
            }
        }
    }, [errors, getValues, router]);

    const passwordValue = useWatch({ control, name: "password" });

    return (
        <Modal
            contentClassName={styles.user_settings_modal_content}
            onHide={(): void => {
                startTransition(() => {
                    setHoveringOverChangePassword(false);
                    setHoveringOverDeleteAccount(false);
                    setConfirmChangePasswordButton(false);
                    setDisplayChangePasswordForm(false);
                });
                userSettingsModalOnClose();
            }}
            show={showUserSettingsModal}
        >
            <Modal.Header
                className={styles.user_settings_modal_header}
                closeButton
                closeVariant="white"
            >
                <div className={styles.user_settings_modal_title}>
                    <span className={styles.user_settings_modal_title_content}>
                        {"User Settings"}
                    </span>
                    <i className="fa-solid fa-cog fa-spin" />
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.user_settings_modal_body}>
                    <Button
                        className={
                            displayChangePasswordForm
                                ? styles.user_settings_change_password_button
                                : ""
                        }
                        onClick={(): void => {
                            if (confirmChangePasswordButton) {
                                startTransition(() => {
                                    setConfirmChangePasswordButton(false);
                                    setDisplayChangePasswordForm(true);
                                    setHoveringOverChangePassword(false);
                                });
                            } else {
                                setConfirmChangePasswordButton(true);
                            }
                        }}
                        onMouseEnter={(): void => {
                            setHoveringOverChangePassword(true);
                        }}
                        onMouseLeave={(): void => {
                            setHoveringOverChangePassword(false);
                        }}
                        style={{
                            opacity: isPending ? "0%" : "100%",
                        }}
                        variant={`${
                            confirmChangePasswordButton
                                ? "outline-danger"
                                : "outline-secondary"
                        }`}
                    >
                        <div
                            className={styles.user_settings_modal_option_button}
                        >
                            {"Change Password"}
                            <i
                                className={`fa-solid fa-key ${
                                    hoveringOverChangePassword ? "fa-shake" : ""
                                }`}
                            />
                            {confirmChangePasswordButton && (
                                <span className={styles.confirm_text}>
                                    {"(Are you sure?)"}
                                </span>
                            )}
                        </div>
                    </Button>
                    {displayChangePasswordForm && (
                        <Form.Group
                            className={styles.change_password_form}
                            controlId="change_password_form"
                            onKeyDown={async (
                                event: React.KeyboardEvent<HTMLDivElement>,
                            ): Promise<void> => {
                                const { key } = event;
                                if (key === Key.Enter) {
                                    await onChangePassword();
                                }
                            }}
                        >
                            <Form.Label>{"Change Password"}</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    className={
                                        styles.change_password_form_control
                                    }
                                    placeholder="New Password"
                                    type={showPasswords ? "text" : "password"}
                                    {...register("password", {
                                        maxLength: {
                                            message:
                                                TextConstants.VALIDATION.INVALID
                                                    .SIGN_UP.PASSWORD
                                                    .MAX_LENGTH,
                                            value: ValidationConstants.SIGN_UP
                                                .FORM.PASSWORD.MAX_LENGTH,
                                        },
                                        minLength: {
                                            message:
                                                TextConstants.VALIDATION.INVALID
                                                    .SIGN_UP.PASSWORD
                                                    .MIN_LENGTH,
                                            value: ValidationConstants.SIGN_UP
                                                .FORM.PASSWORD.MIN_LENGTH,
                                        },
                                        required: {
                                            message:
                                                TextConstants.VALIDATION.INVALID
                                                    .SIGN_UP.CONFIRM_PASSWORD
                                                    .REQUIRED,
                                            value: ValidationConstants.SIGN_UP
                                                .FORM.CONFIRM_PASSWORD.REQUIRED,
                                        },
                                        validate: {
                                            containsDigit: (
                                                password: string,
                                            ) => {
                                                const result =
                                                    RegexConstants.CONTAINS_DIGIT.test(
                                                        password,
                                                    );
                                                return result
                                                    ? true
                                                    : TextConstants.VALIDATION
                                                          .INVALID.SIGN_UP
                                                          .PASSWORD
                                                          .CONTAINS_DIGIT;
                                            },
                                            containsLowercase: (
                                                password: string,
                                            ) => {
                                                const result =
                                                    RegexConstants.CONTAINS_LOWERCASE.test(
                                                        password,
                                                    );

                                                return result
                                                    ? true
                                                    : TextConstants.VALIDATION
                                                          .INVALID.SIGN_UP
                                                          .PASSWORD
                                                          .CONTAINS_LOWERCASE;
                                            },
                                            containsSpaces: (
                                                password: string,
                                            ) => {
                                                const result =
                                                    RegexConstants.NO_SPACES.test(
                                                        password,
                                                    );

                                                return result
                                                    ? TextConstants.VALIDATION
                                                          .INVALID.SIGN_UP
                                                          .PASSWORD.NO_SPACES
                                                    : true;
                                            },
                                            containsUppercase: (
                                                password: string,
                                            ) => {
                                                const result =
                                                    RegexConstants.CONTAINS_UPPERCASE.test(
                                                        password,
                                                    );

                                                return result
                                                    ? true
                                                    : TextConstants.VALIDATION
                                                          .INVALID.SIGN_UP
                                                          .PASSWORD
                                                          .CONTAINS_UPPERCASE;
                                            },
                                            noSymbols: (password: string) => {
                                                const result =
                                                    RegexConstants.NO_SYMBOLS.test(
                                                        password,
                                                    );

                                                return result
                                                    ? TextConstants.VALIDATION
                                                          .INVALID.SIGN_UP
                                                          .PASSWORD
                                                          .CONTAINS_SYMBOL
                                                    : true;
                                            },
                                        },
                                    })}
                                />
                                <Form.Control
                                    className={
                                        styles.change_password_form_control
                                    }
                                    placeholder="Re-type"
                                    type={showPasswords ? "text" : "password"}
                                    {...register("confirmPassword", {
                                        required: {
                                            message:
                                                TextConstants.VALIDATION.INVALID
                                                    .SIGN_UP.CONFIRM_PASSWORD
                                                    .REQUIRED,
                                            value: ValidationConstants.SIGN_UP
                                                .FORM.CONFIRM_PASSWORD.REQUIRED,
                                        },
                                        validate: {
                                            sameAsPassword: (
                                                confirmPasswordValue: string,
                                            ) => {
                                                const result =
                                                    confirmPasswordValue ===
                                                    passwordValue;

                                                return result
                                                    ? true
                                                    : TextConstants.VALIDATION
                                                          .INVALID.SIGN_UP
                                                          .CONFIRM_PASSWORD
                                                          .MATCHING;
                                            },
                                        },
                                    })}
                                />
                                <OverlayTrigger
                                    overlay={(
                                        properties: OverlayInjectedProps,
                                    ): JSX.Element =>
                                        renderTooltip(properties, {
                                            title: showPasswords
                                                ? "Hide"
                                                : "Show",
                                        })
                                    }
                                    placement="top"
                                >
                                    <Button
                                        onClick={(): void => {
                                            setShowPasswords(
                                                (oldValue: boolean) =>
                                                    !oldValue,
                                            );
                                        }}
                                        variant={`${
                                            showPasswords
                                                ? "outline-success"
                                                : "outline-warning"
                                        }`}
                                    >
                                        <i
                                            className={`fa-solid ${
                                                showPasswords
                                                    ? "fa-eye-slash"
                                                    : "fa-eye"
                                            } fa-xs`}
                                        />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    overlay={(
                                        properties: OverlayInjectedProps,
                                    ): JSX.Element =>
                                        renderTooltip(properties, {
                                            title: "Confirm",
                                        })
                                    }
                                    placement="right"
                                >
                                    <Button variant="outline-success">
                                        <i className="fa-solid fa-check" />
                                    </Button>
                                </OverlayTrigger>
                            </InputGroup>
                        </Form.Group>
                    )}
                    <Button
                        onMouseEnter={(): void => {
                            setHoveringOverDeleteAccount(true);
                        }}
                        onMouseLeave={(): void => {
                            setHoveringOverDeleteAccount(false);
                        }}
                        variant="outline-warning"
                    >
                        <div
                            className={styles.user_settings_modal_option_button}
                        >
                            {"Delete Account"}
                            <i
                                className={`fa-solid fa-trash ${
                                    hoveringOverDeleteAccount ? "fa-bounce" : ""
                                } ${styles.delete_account_icon}`}
                            />
                        </div>
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer className={styles.user_settings_modal_footer}>
                <Button
                    className={styles.user_settings_close_button}
                    onClick={userSettingsModalOnClose}
                    variant="outline-secondary"
                >
                    {"Close"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
