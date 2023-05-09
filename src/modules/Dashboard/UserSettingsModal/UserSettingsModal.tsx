import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

import styles from "./UserSettingsModal.module.css";
import { useForm } from "react-hook-form";
import { numericalConverter } from "@/helpers";

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
    const [_isPending, startTransition] = React.useTransition();

    const { register } = useForm<ConfirmPasswordValues>({
        criteriaMode: "all",
        defaultValues: FORM_DEFAULT_VALUES,
        delayError: numericalConverter.seconds.toMilliseconds(0.5),
        mode: "all",
        reValidateMode: "onChange",
    });

    const [hoveringOverChangePassword, setHoveringOverChangePassword] =
        React.useState<boolean>(false);
    const [hoveringOverDeleteAccount, setHoveringOverDeleteAccount] =
        React.useState<boolean>(false);
    const [confirmChangePasswordButton, setConfirmChangePasswordButton] =
        React.useState<boolean>(false);

    const [displayChangePasswordForm, setDisplayChangePasswordForm] =
        React.useState<boolean>(false);

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
                        className={styles.user_settings_change_password_button}
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
                            style={{
                                opacity: displayChangePasswordForm
                                    ? "100%"
                                    : "0%",
                            }}
                        >
                            <Form.Label>{"Change Password"}</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("password")}
                            />
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
