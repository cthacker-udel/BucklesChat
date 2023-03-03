import React from "react";

import styles from "./PasswordRequirement.module.css";

type PasswordRequirementsProperties = {
    message: string;
    isValid: boolean;
};

/**
 *
 * @param param0
 * @returns
 */
export const PasswordRequirement = ({
    message,
    isValid,
}: PasswordRequirementsProperties): JSX.Element => (
    <div className={styles.password_requirement}>
        <i
            className={`fa-solid ${styles.password_requirement_icon} ${
                isValid
                    ? `fa-circle-check ${styles.password_requirement_valid}`
                    : `fa-circle ${styles.password_requirement_invalid}`
            }`}
        />{" "}
        {message}
    </div>
);
