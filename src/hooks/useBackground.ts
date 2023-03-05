import type { StaticImageData } from "next/image";
import React from "react";

import type { _useBackground } from "@/@types";
import { setBackground, type SetBackgroundConfiguration } from "@/helpers";

/**
 * Sets the background of the page, given an image
 *
 * @param image - The image to set as the background
 */
export const useBackground: _useBackground = (
    image: StaticImageData,
    options?: SetBackgroundConfiguration,
): void => {
    React.useEffect(() => {
        if (document !== null) {
            setBackground(document, image, options);
        }
    }, [image, options]);
};
