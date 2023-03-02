import React from "react";
import { ReactNode } from "react";
import { Tooltip } from "react-bootstrap";
import styles from "./renderTooltip.module.css";
import { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

type RenderTooltipOptions = {
  id?: string;
  title?: string | ReactNode;
  titleClassNameOverride?: string;
  body?: string | ReactNode;
  bodyClassNameOverride?: string;
  footer?: string | ReactNode;
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
  options?: RenderTooltipOptions
): JSX.Element => (
  <Tooltip {...properties} id={options?.id ?? `${Date.now() + Math.random()}`}>
    <div className={styles.tooltip_content}>
      {options?.title && (
        <div
          className={`${styles.tooltip_title} ${
            options.titleClassNameOverride ?? ""
          }`}
        >
          {options.title}
        </div>
      )}
      {options?.body && (
        <div
          className={`${styles.tooltip_body} ${
            options.bodyClassNameOverride ?? ""
          }`}
        >
          {options.body}
        </div>
      )}
      {options?.footer && (
        <div
          className={`${styles.tooltip_footer} ${options.footerClassNameOverride}`}
        >
          {options.footer}
        </div>
      )}
    </div>
  </Tooltip>
);
