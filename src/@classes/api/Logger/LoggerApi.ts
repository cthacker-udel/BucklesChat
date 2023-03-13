/* eslint-disable @typescript-eslint/indent -- fixed */
import type { NextApiRequest, NextApiResponse } from "next";

import type { ApiResponse, EventLog, ExceptionLog } from "@/@types";
import { Endpoints } from "@/assets";

import { ServerSideApi } from "../ServerSideApi";

/**
 *
 */
export class LoggerApi extends ServerSideApi {
    public static logException = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const postedResult = await super.post<
                ApiResponse<string>,
                ExceptionLog
            >(
                `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EXCEPTION}`,
                request.body as ExceptionLog,
            );

            console.log(postedResult);
            response.json(postedResult);
        } catch (error: unknown) {
            console.log("error =", error);
            response.json({});
        }
    };

    public static logEvent = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const postedResult = await super.post<EventLog>(
                `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EVENT}`,
                JSON.parse(request.body),
            );
            response.json(postedResult);
        } catch (error: unknown) {
            response.json({
                apiError: { code: 500, message: (error as Error).message },
                data: false,
            });
        }
    };

    public static logStatus = async (
        _request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const loggerStatus = await super.get<ApiResponse<boolean>>(
                `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.STATUS}`,
            );
            response.json(loggerStatus);
        } catch (error: unknown) {
            response.json({
                apiError: { code: 500, message: (error as Error).message },
                data: false,
            });
        }
    };
}
