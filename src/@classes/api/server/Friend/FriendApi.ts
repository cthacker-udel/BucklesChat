/* eslint-disable @typescript-eslint/indent -- disabled */
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type {
    ApiResponse,
    ExceptionLog,
    FriendPayload,
    FriendRequest,
    FriendRequestPayload,
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
            const allAvailableFriends = await super.get<ApiResponse<string[]>>(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.AVAILABLE_FRIENDS}`,
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

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
            const requestData = JSON.parse(
                request.body,
            ) as FriendRequestPayload;
            const sendFriendRequestResponse = await super.post<
                ApiResponse<boolean>,
                FriendRequestPayload
            >(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.SEND_REQUEST}`,
                requestData,
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

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
            const result = await super.get<ApiResponse<FriendRequest[]>>(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.PENDING_REQUESTS}`,
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

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

    /**
     * Accepts a friend request
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static acceptRequest = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const requestPayload = JSON.parse(
                request.body,
            ) as FriendRequestPayload;

            if (requestPayload.userIdFrom === undefined) {
                throw new Error("Must send usernames to accept requests");
            }

            const { userIdFrom: usernameFrom } = requestPayload;
            const sendResult = await super.post<
                ApiResponse<boolean>,
                FriendRequestPayload
            >(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.ACCEPT_REQUEST}`,
                {
                    userIdFrom: usernameFrom,
                },
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

            response.send(sendResult);
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
     * Rejects a friend request
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static rejectRequest = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const requestPayload = JSON.parse(
                request.body,
            ) as FriendRequestPayload;

            if (requestPayload.userIdFrom === undefined) {
                throw new Error("Must send usernames to reject requests");
            }

            const { userIdFrom: usernameTo } = requestPayload;
            const sendResult = await super.post<
                ApiResponse<boolean>,
                FriendRequestPayload
            >(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.REJECT_REQUEST}`,
                {
                    userIdFrom: usernameTo,
                },
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

            response.send(sendResult);
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
     * Removes a friend from the database and the application, taking in the recipient of the friend request, and the sender of the friend request.
     * Removing both instances of (recipient) <--- sender and (sender) <--- recipient
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static removeFriend = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const requestPayload = JSON.parse(request.body) as FriendPayload;

            if (requestPayload.sender === undefined) {
                throw new Error(
                    "Must supply both usernames to remove a friend",
                );
            }

            const { sender } = requestPayload;

            const removalRequest = await super.post<
                ApiResponse<boolean>,
                FriendPayload
            >(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.REMOVE_FRIEND}`,
                {
                    sender,
                },
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

            response.send(removalRequest);
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
