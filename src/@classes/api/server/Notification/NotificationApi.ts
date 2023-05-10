/* eslint-disable @typescript-eslint/indent -- disabled */
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type { ApiResponse, ExceptionLog, FetchedNotification } from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";
import { ServerSideApi } from "../../ServerSideApi";

/**
 * All methods involving communication directly with the server and notification entities
 */
export class NotificationApi extends ServerSideApi {
    /**
     * Fetches all notifications from the database for the user requesting them
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static fetchAllNotifications = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const allNotifications = await super.get<
                ApiResponse<FetchedNotification[]>
            >(
                `${Endpoints.NOTIFICATION.BASE}${Endpoints.NOTIFICATION.ALL_NOTIFICATIONS}`,
                undefined,
                request.headers,
                response,
            );

            response.json(allNotifications);
        } catch (error: unknown) {
            const convertedError = error as Error;
            try {
                await ClientSideApi.post<ApiResponse<string>, ExceptionLog>(
                    `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EXCEPTION}`,
                    {
                        id: v4().toString(),
                        message: convertedError.message,
                        stackTrace: convertedError.stack,
                        timestamp: Date.now(),
                    },
                );
            } finally {
                response.status(500);
                response.json({
                    apiError: { code: 500, message: (error as Error).message },
                    data: false,
                });
            }
        }
    };
}
