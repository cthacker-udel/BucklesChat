import React from "react";

import type { ILoggerContext } from "@/@types";

export const LoggerContext: React.Context<ILoggerContext | undefined> =
    React.createContext<ILoggerContext | undefined>(undefined);
