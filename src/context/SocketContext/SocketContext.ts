import React from "react";

import type { ISocketContext } from "@/@types";

export const SocketContext: React.Context<ISocketContext | undefined> =
    React.createContext<ISocketContext | undefined>(undefined);
