import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type { ApiResponse, ExceptionLog } from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";
import { ServerSideApi } from "../../ServerSideApi";

/**
 * Represents all operations on the friend side of the API
 */
export class FriendApi extends ServerSideApi {
    public static availableFriends = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const username = request.query.username;
            const allAvailableFriends = await super.get<ApiResponse<string[]>>(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.AVAILABLE_FRIENDS}?username=${username}`,
            );

            response.status(200);
            response.json(allAvailableFriends);
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
