/* eslint-disable @typescript-eslint/indent -- disabled */
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type {
    ApiResponse,
    DirectMessage,
    DmPayload,
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
            const requestData = JSON.parse(
                request.body,
            ) as FriendRequestPayload;
            const sendFriendRequestResponse = await super.post<
                ApiResponse<boolean>,
                FriendRequestPayload
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

            if (
                requestPayload.usernameFrom === undefined ||
                requestPayload.usernameTo === undefined
            ) {
                throw new Error("Must send usernames to accept requests");
            }

            const { usernameTo, usernameFrom } = requestPayload;
            const sendResult = await super.post<
                ApiResponse<boolean>,
                FriendRequestPayload
            >(`${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.ACCEPT_REQUEST}`, {
                usernameFrom,
                usernameTo,
            });

            response.status(sendResult.data === undefined ? 400 : 200);
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

            if (
                requestPayload.usernameFrom === undefined ||
                requestPayload.usernameTo === undefined
            ) {
                throw new Error("Must send usernames to reject requests");
            }

            const { usernameTo, usernameFrom } = requestPayload;
            const sendResult = await super.post<
                ApiResponse<boolean>,
                FriendRequestPayload
            >(`${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.REJECT_REQUEST}`, {
                usernameFrom,
                usernameTo,
            });

            response.status(sendResult.data === undefined ? 400 : 200);
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

            if (
                requestPayload.recipient === undefined ||
                requestPayload.sender === undefined
            ) {
                throw new Error(
                    "Must supply both usernames to remove a friend",
                );
            }

            const { recipient, sender } = requestPayload;

            const removalRequest = await super.post<
                ApiResponse<boolean>,
                FriendPayload
            >(`${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.REMOVE_FRIEND}`, {
                recipient,
                sender,
            });

            response.status(removalRequest.data ? 200 : 400);
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

    /**
     * Sends a direct message to a user in the application
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static sendDM = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const messagePayload = JSON.parse(request.body) as DmPayload;

            if (
                messagePayload.receiver === undefined ||
                messagePayload.sender === undefined ||
                messagePayload.content === undefined
            ) {
                throw new Error(
                    "Must supply sender and receiver when sending direct message",
                );
            }

            const { content, receiver, sender, senderProfilePictureURL } =
                messagePayload;

            const dmSendResponse = await super.post<
                ApiResponse<boolean>,
                DmPayload
            >(
                `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.SEND_DIRECT_MESSAGE}`,
                {
                    content,
                    receiver,
                    sender,
                    senderProfilePictureURL,
                },
            );

            response.status(dmSendResponse.data ? 200 : 400);
            response.send(dmSendResponse);
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
     * Retrieves all pending messages for the username supplied
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static pendingDirectMessages = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const username = request.query.username as string;

            if (username === undefined) {
                throw new Error(
                    "Must supply username to retrieve direct messages",
                );
            }

            const fetchedDirectMessages = await super.get<
                ApiResponse<DirectMessage[]>
            >(`friend/pendingDirectMessages?username=${username}`);

            response.status(
                fetchedDirectMessages.data === undefined ? 400 : 200,
            );
            response.send(fetchedDirectMessages);
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
