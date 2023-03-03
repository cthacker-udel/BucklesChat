import React from "react";

import styles from "./Required.module.css";

type RequiredProperties = {
    paddingLeft?: boolean;
};

/**
 * The required component, with applied styles to ease with having to hard-code red asterisks for every required field
 *
 *
 * @returns - The required component, which consists of an red asterisk denoting the field is required
 */
export const Required = ({ paddingLeft }: RequiredProperties): JSX.Element => (
    <span
        className={`${styles.required_content} ${
            paddingLeft && styles.required_content_pad_left
        }`}
    >
        {"*"}
    </span>
);
