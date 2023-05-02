import React from "react";
import { Image } from "react-bootstrap";

import loadingGif from "@/assets/loading/loading.gif";

import styles from "./Loading.module.css";

/**
 * The loading component, which is a component that represents the page is loading
 *
 *
 * @returns The loading component, which displays while the page is loading or any api calls are taking place
 */
export const Loading = (): JSX.Element => (
    <div className={styles.loading_container} id="loading_spinner">
        <Image
            alt="The loading icon for the buckles chat website"
            className={styles.loading_icon}
            src={loadingGif.src}
        />
    </div>
);
