/* eslint-disable @typescript-eslint/indent -- fixed */
import type { NextApiRequest, NextApiResponse } from "next";

import type { ApiResponse, EventLog, ExceptionLog } from "@/@types";
import { Endpoints } from "@/assets";

import { ServerSideApi } from "../../ServerSideApi";

/**
 * The server-side api for sending requests to the backend to be logged
 */
export class LoggerApi extends ServerSideApi {
    /**
     * Logs an exception to be stored in the mongo database
     *
     * @param request - The request from the client
     * @param response - The response from the backend
     */
    public static logException = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const postedResult = await super.post<
                ApiResponse<boolean>,
                ExceptionLog
            >(
                `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EXCEPTION}`,
                request.body as ExceptionLog,
            );

            response.status(postedResult.data ? 200 : 400);
            response.json(postedResult);
        } catch {
            response.status(500);
            response.json({});
        }
    };

    /**
     * Logs an event to be stored in the mongo database
     *
     * @param request - The client request
     * @param response - The response from the backend
     */
    public static logEvent = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const postedResult = await super.post<EventLog>(
                `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EVENT}`,
                JSON.parse(request.body),
            );

            response.status(postedResult === undefined ? 400 : 200);
            response.json(postedResult);
        } catch {
            response.status(500);
            response.json({});
        }
    };

    /**
     * Pings the status of the logger endpoint
     *
     * @param _request - The client request
     * @param response - The response to the client
     */
    public static logStatus = async (
        _request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const loggerStatus = await super.get<ApiResponse<boolean>>(
                `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.STATUS}`,
            );

            response.status(loggerStatus.data ? 200 : 400);
            response.json(loggerStatus);
        } catch {
            response.status(500);
            response.send({});
        }
    };
}
