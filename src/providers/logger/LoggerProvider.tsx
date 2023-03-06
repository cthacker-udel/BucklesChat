/* eslint-disable @typescript-eslint/indent -- disabled */
import React, { type ReactNode } from "react";

import { ClientSideApi, LoggerException } from "@/@classes";
import type { ApiResponse, EventLog, ILoggerContext } from "@/@types";
import { Endpoints } from "@/assets";
import { LoggerContext } from "@/context";

type LoggingProviderProperties = {
    children: ReactNode;
};

/**
 *
 * @param param0
 */
export const LoggerProvider = ({
    children,
}: LoggingProviderProperties): JSX.Element => {
    const clientSideApi: ClientSideApi = React.useMemo(
        () => new ClientSideApi(),
        [],
    );

    const functionalProperties: ILoggerContext = React.useMemo(
        (): ILoggerContext => ({
            logEvent: async (_event: EventLog, _id?: number): Promise<void> => {
                const postResult = await clientSideApi.post<
                    ApiResponse<string>,
                    EventLog
                >(`${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EVENT}`, _event);

                return postResult.data;
            },
            logException: async (
                _exception: Error,
                _id?: number,
            ): Promise<void> => {
                const postResult = await clientSideApi.post<
                    ApiResponse<string>,
                    LoggerException
                >(
                    `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EXCEPTION}`,
                    new LoggerException(_exception),
                );

                return postResult.data;
            },
            logOnline: async (): Promise<boolean> => {
                const statusResult = await clientSideApi.get<
                    ApiResponse<boolean>
                >(`${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.STATUS}`);
                return statusResult.data;
            },
        }),
        [clientSideApi],
    );

    const constructedProperties = React.useMemo(
        () => ({ ...functionalProperties }),
        [functionalProperties],
    );

    return (
        <LoggerContext.Provider value={constructedProperties}>
            {children}
        </LoggerContext.Provider>
    );
};
