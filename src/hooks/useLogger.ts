import React from "react";

import type { ILoggerContext } from "@/@types";
import { LoggerContext } from "@/context";

/**
 *
 * @returns
 */
export const useLogger = (): ILoggerContext | undefined => {
    const loggingContext = React.useContext<ILoggerContext | undefined>(
        LoggerContext,
    );
    if (loggingContext === undefined) {
        throw new Error(
            "Invalid usage, must call context within a child component of the component that renders the LoggingContext.Provider component",
        );
    }
    return loggingContext;
};
