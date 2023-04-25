/* eslint-disable @typescript-eslint/indent -- disabled */
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type {
    AddMessageToThreadPayload,
    ApiResponse,
    ChatRoom,
    ChatRoomStats,
    CreateThreadPayload,
    DirectMessage,
    ExceptionLog,
    Thread,
    ThreadMessages,
} from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";
import { ServerSideApi } from "../../ServerSideApi";

/**
 * All methods involving communicating with the backend regarding messages
 */
export class MessageApi extends ServerSideApi {
    /**
     * Creates a thread in the database given the creator and receiver
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static createThread = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const parsedRequest = JSON.parse(
                request.body,
            ) as CreateThreadPayload;

            const creationResult = await super.post<
                ApiResponse<boolean>,
                CreateThreadPayload
            >(
                `${Endpoints.MESSAGE.THREAD.BASE}${Endpoints.MESSAGE.THREAD.CREATE}`,
                parsedRequest,
            );

            response.status(creationResult?.data ? 200 : 400);
            response.json(creationResult);
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
     * Adds a message to a thread that exists within the database
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static addMessageToThread = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const body = JSON.parse(request.body) as AddMessageToThreadPayload;

            const addRequest = await super.post<
                ApiResponse<boolean>,
                AddMessageToThreadPayload
            >(
                `${Endpoints.MESSAGE.THREAD.BASE}${Endpoints.MESSAGE.THREAD.ADD_MESSAGE}`,
                body,
            );

            response.status(addRequest?.data ? 200 : 400);
            response.json(addRequest);
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
     * Gets all threads belonging to the user
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static getAllThreads = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const username = request.query.username as string;

            if (username === undefined) {
                throw new Error("Must supply username when fetching threads");
            }

            const allThreads = await super.get<ApiResponse<Thread[]>>(
                `${Endpoints.MESSAGE.THREAD.BASE}${Endpoints.MESSAGE.THREAD.ALL_THREADS}`,
                { username },
            );
            response.status(200);
            response.send(allThreads);
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
     * Bulk fetches thread ids passed in, and their respective messages
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static getAllThreadMessages = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const threadId = request.query.threadIds as string;

            if (threadId === undefined || threadId.length === 0) {
                throw new Error("Must supply thread id to fetch messages");
            }

            const result = await super.get<ApiResponse<ThreadMessages>>(
                `${Endpoints.MESSAGE.THREAD.BASE}${Endpoints.MESSAGE.THREAD.MESSAGES}`,
                { threadId },
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
     * Fetches all the user's threads messages using username supplied in the query string
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static getAllThreadsMessages = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const username = request.query.username as string;

            if (username === undefined || username.length === 0) {
                throw new Error(
                    "Must provide username to fetch all user's threads messages",
                );
            }

            const getAllMessagesResponse = await super.get<
                ApiResponse<ThreadMessages[]>
            >(
                `${Endpoints.MESSAGE.THREAD.BASE}${Endpoints.MESSAGE.THREAD.ALL_MESSAGES}`,
                { username },
            );

            response.status(200);
            response.send(getAllMessagesResponse);
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
     * Adds a message to the database
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static addMessage = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const body = JSON.parse(request.body) as Partial<DirectMessage>;

            if (
                body.content === undefined ||
                body.receiver === undefined ||
                body.sender === undefined
            ) {
                throw new Error(
                    "Invalid properties sent to add a message to the database",
                );
            }

            const { content, receiver, sender } = body;

            const addMessageResult = await super.post<
                ApiResponse<number>,
                Partial<DirectMessage>
            >(`${Endpoints.MESSAGE.BASE}${Endpoints.MESSAGE.ADD}`, {
                content,
                receiver,
                sender,
            });

            response.status(addMessageResult.data >= 0 ? 200 : 400);
            response.send(addMessageResult);
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
            >(
                `${Endpoints.MESSAGE.BASE}${Endpoints.MESSAGE.PENDING_DIRECT_MESSAGES}?username=${username}`,
            );

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

    /**
     * Fetches all chat-rooms from the database
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static getAllChatRooms = async (
        _request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const allChatRooms = await super.get<ApiResponse<ChatRoom[]>>(
                `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.ALL}`,
            );

            response.status(200);
            response.json(allChatRooms);
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
     * Fetches stats for chat rooms
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static getChatRoomStats = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const chatRoomId = request.query.chatRoomId as string;

            if (chatRoomId === undefined) {
                throw new Error(
                    "Must supply chat room id when attempting to fetch chat room stats",
                );
            }

            const chatRoomStats = await super.get<ChatRoomStats>(
                `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.STATS}`,
                { chatRoomId },
            );

            response.status(200);
            response.send(chatRoomStats);
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
