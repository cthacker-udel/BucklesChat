import React, { type ReactNode } from "react";
import { Tooltip } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import styles from "./renderTooltip.module.css";

type RenderTooltipOptions = {
    id?: string;
    title?: ReactNode | string;
    titleClassNameOverride?: string;
    body?: ReactNode | string;
    bodyClassNameOverride?: string;
    footer?: ReactNode | string;
    footerClassNameOverride?: string;
};

/**
 * Renders a tooltip with options to provide to customize the tooltip as well
 *
 * @param options - The options for rendering the tooltip
 * @returns The formatted tooltip
 */
export const renderTooltip = (
    properties: OverlayInjectedProps,
    options?: RenderTooltipOptions,
): JSX.Element => (
    <Tooltip
        {...properties}
        id={options?.id ?? `${Math.round(Date.now() + Math.random())}`}
    >
        <div className={styles.tooltip_content}>
            {Boolean(options?.title) && (
                <div
                    className={`${styles.tooltip_title} ${
                        options?.titleClassNameOverride ?? ""
                    }`}
                >
                    {options?.title}
                </div>
            )}
            {Boolean(options?.body) && (
                <div
                    className={`${styles.tooltip_body} ${
                        options?.bodyClassNameOverride ?? ""
                    }`}
                >
                    {options?.body}
                </div>
            )}
            {Boolean(options?.footer) && (
                <div
                    className={`${styles.tooltip_footer} ${options?.footerClassNameOverride}`}
                >
                    {options?.footer}
                </div>
            )}
        </div>
    </Tooltip>
);
