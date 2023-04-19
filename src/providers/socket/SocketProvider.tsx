import React, { type ReactNode } from "react";
import { io } from "socket.io-client";

import type { ISocketContext } from "@/@types";
import { SocketContext } from "@/context";

type SocketProviderProperties = {
    children: ReactNode;
};

/**
 * The socket provider component that allows for all children to access it's socket instance
 *
 * @param props - The properties of the socket provider
 * @param props.children - The children or aka the "wrapped" component that this provider surrounds
 */
export const SocketProvider = ({
    children,
}: SocketProviderProperties): JSX.Element => {
    const properties: ISocketContext = React.useMemo(
        (): ISocketContext => ({
            socket: io(process.env.NEXT_PUBLIC_SOCKET_URL ?? ""),
        }),
        [],
    );

    return (
        <SocketContext.Provider value={properties}>
            {children}
        </SocketContext.Provider>
    );
};
