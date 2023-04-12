/* eslint-disable @typescript-eslint/indent -- disabled */
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type {
    ApiResponse,
    ExceptionLog,
    FriendRequest,
    SendFriendRequest,
} from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";
import { ServerSideApi } from "../../ServerSideApi";

/**
 * Represents all operations on the friend side of the API
 */
export class FriendApi extends ServerSideApi {
    /**
     * Fetches all available friends from the user
     *
     * @param request - The client request
     * @param response - The client response
     */
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

    /**
     * Sends a user a friend request
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static sendRequest = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const requestData = JSON.parse(request.body) as SendFriendRequest;
            const sendFriendRequestResponse = await super.post<
                ApiResponse<boolean>,
                SendFriendRequest
            >(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.SEND_REQUEST}`,
                requestData,
            );
            response.status(sendFriendRequestResponse.data ? 200 : 400);
            response.send(sendFriendRequestResponse);
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

    /**
     * Fetches all pending friend requests for the user specified by their username in the query string
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static pendingRequests = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const username = request.query.username;

            if (username === undefined) {
                throw new Error("Must supply username");
            }

            const result = await super.get<ApiResponse<FriendRequest[]>>(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.PENDING_REQUESTS}?username=${username}`,
            );

            response.status(200);
            response.send(result);
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
