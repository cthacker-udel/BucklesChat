import React, { type ReactElement } from "react";

import styles from "./Layout.module.css";

type LayoutProperties = {
    children: ReactElement;
    styleOverride?: string;
};

/**
 * The common Layout component that allows for consistent styling across pages
 *
 * @param props - The properties of the Layout component
 * @param props.children - The component the Layout is wrapping
 * @param props.styleOverride - The overrides provided by the user
 * @returns
 */
export const Layout = ({
    children,
    styleOverride,
}: LayoutProperties): JSX.Element => (
    <div className={`${styles.layout} ${styleOverride}`}>{children}</div>
);
