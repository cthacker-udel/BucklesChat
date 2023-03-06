/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";

import { LoggerEvent } from "@/@classes/logger/LoggerEvent";
import { LogTypes } from "@/assets";
import Background from "@/assets/background/homepage/bg.gif";
import { TextConstants } from "@/assets/str/TextConstants";
import { useLogger } from "@/hooks";
import { useBackground } from "@/hooks/useBackground";

import styles from "./HomePage.module.css";

/**
 * The index page of the application.
 *
 * @returns The home page
 */
export const HomePage = (): JSX.Element => {
    useBackground(Background, { backgroundOpacity: 0.75 });
    const router = useRouter();
    const { ...loggerApi } = useLogger();

    return (
        <div className={styles.home_page_content} id="homepage_main">
            <div className={styles.home_page_welcome_text} id="homepage_header">
                <div
                    className={styles.home_page_title}
                    id="homepage_header_title"
                >
                    {TextConstants.CONTENT.HOME_PAGE.TITLE}
                </div>
                <div
                    className={styles.home_page_description}
                    id="homepage_header_description"
                >
                    {TextConstants.CONTENT.HOME_PAGE.DESCRIPTION}
                </div>
            </div>
            <div
                className={styles.home_page_option_buttons}
                id="homepage_button_toolbar"
            >
                <Button
                    id="homepage_button_1"
                    onClick={(): void => {
                        router.push("signup");
                    }}
                    variant="primary"
                >
                    {TextConstants.CONTENT.HOME_PAGE.BUTTON_1_TEXT}
                </Button>
                <Button
                    id="homepage_button_2"
                    onClick={(): void => {
                        loggerApi.logEvent(
                            new LoggerEvent(LogTypes.LOG_IN, "User logged in"),
                        );
                    }}
                    variant="success"
                >
                    {TextConstants.CONTENT.HOME_PAGE.BUTTON_2_TEXT}
                </Button>
            </div>
        </div>
    );
};
