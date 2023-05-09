import React from "react";
import { Button, Modal } from "react-bootstrap";

import styles from "./UserSettingsModal.module.css";

type UserSettingsModalProperties = {
    userSettingsModalOnClose: () => void;
    showUserSettingsModal: boolean;
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
    const [hoveringOverChangePassword, setHoveringOverChangePassword] =
        React.useState<boolean>(false);
    const [hoveringOverDeleteAccount, setHoveringOverDeleteAccount] =
        React.useState<boolean>(false);

    return (
        <Modal
            contentClassName={styles.user_settings_modal_content}
            onHide={userSettingsModalOnClose}
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
                        onMouseEnter={(): void => {
                            setHoveringOverChangePassword(true);
                        }}
                        onMouseLeave={(): void => {
                            setHoveringOverChangePassword(false);
                        }}
                        variant="outline-secondary"
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
                        </div>
                    </Button>
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
                    onClick={userSettingsModalOnClose}
                    variant="outline-secondary"
                >
                    {"Close"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
