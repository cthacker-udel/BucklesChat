/* eslint-disable @typescript-eslint/indent -- disabled */
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type {
    AddChatRoomMessageDto,
    AddMessageToThreadPayload,
    ApiResponse,
    ChatRoom,
    ChatRoomMessage,
    ChatRoomStats,
    CreateChatRoomDto,
    CreateThreadPayload,
    DirectMessage,
    DmPayload,
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
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

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
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

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
                request.headers as { [key: string]: string },
                response,
            );

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
            const getAllMessagesResponse = await super.get<
                ApiResponse<ThreadMessages[]>
            >(
                `${Endpoints.MESSAGE.THREAD.BASE}${Endpoints.MESSAGE.THREAD.ALL_MESSAGES}`,
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

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

            if (body.content === undefined) {
                throw new Error(
                    "Invalid properties sent to add a message to the database",
                );
            }

            const { content, receiver } = body;

            const addMessageResult = await super.post<
                ApiResponse<number>,
                Partial<DirectMessage>
            >(
                `${Endpoints.MESSAGE.BASE}${Endpoints.MESSAGE.ADD}`,
                {
                    content,
                    receiver,
                },
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

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
            const fetchedDirectMessages = await super.get<
                ApiResponse<DirectMessage[]>
            >(
                `${Endpoints.MESSAGE.BASE}${Endpoints.MESSAGE.PENDING_DIRECT_MESSAGES}`,
                undefined,
                request.headers as { [key: string]: string },
                response,
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
                undefined,
                undefined,
                response,
            );

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
                undefined,
                response,
            );

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

    /**
     * Gets all the messages associated with the chat room
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static getChatRoomMessages = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const chatRoomId = request.query.id;

            if (chatRoomId === undefined) {
                throw new Error("Must supply chat room id to fetch messages");
            }

            const chatMessages = await super.get<ChatRoomMessage[]>(
                `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.MESSAGES}?id=${chatRoomId}`,
                undefined,
                undefined,
                response,
            );

            response.send(chatMessages);
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
     * Adds a message to a chat room
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static addChatRoomMessage = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const payload = JSON.parse(request.body) as AddChatRoomMessageDto;

            if (
                payload.chatRoomId === undefined ||
                payload.messageId === undefined
            ) {
                throw new Error(
                    "Must supply valid chat room id and message id when adding a message",
                );
            }

            const { chatRoomId, messageId } = payload;

            const result = await super.post<
                ApiResponse<Partial<ChatRoomMessage>>,
                AddChatRoomMessageDto
            >(
                `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.ADD_MESSAGE}`,
                { chatRoomId, messageId },
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
                messagePayload.content === undefined
            ) {
                throw new Error(
                    "Must supply sender and receiver when sending direct message",
                );
            }

            const { content, receiver } = messagePayload;

            const dmSendResponse = await super.post<
                ApiResponse<boolean>,
                DmPayload
            >(
                `${Endpoints.MESSAGE.BASE}${Endpoints.MESSAGE.SEND_DIRECT_MESSAGE}`,
                {
                    content,
                    receiver,
                },
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

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
     * Creates a chat room in the database
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static createChatRoom = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const { description, name } = JSON.parse(
                request.body,
            ) as CreateChatRoomDto;

            if (name === undefined) {
                throw new Error("Must supply name when creating chat room");
            }

            const createChatRoomResponse = await super.post<
                ApiResponse<boolean>,
                CreateChatRoomDto
            >(
                `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.CREATE}`,
                { description, name },
                undefined,
                request.headers,
                response,
            );

            response.json(createChatRoomResponse);
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
