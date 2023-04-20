import React from "react";

import type { _useSocket, ISocketContext } from "@/@types";
import { SocketContext } from "@/context";

/**
 * Fetches and returns the current value of the socket context, if used by a child of the SocketProvider component
 * As the socket state is memoized, the components should not undergo re-rendering from state change
 *
 * @returns The socket context if it is used correctly
 */
export const useSocket: _useSocket = (): ISocketContext => {
    const socketContext = React.useContext(SocketContext);

    if (socketContext === undefined) {
        throw new Error(
            "Invalid usage of socket context, must be a child component of the SocketProvider component",
        );
    }

    return { ...socketContext };
};
