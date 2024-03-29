/* eslint-disable @typescript-eslint/indent -- disabled */
import type {
    AddChatRoomMessageDto,
    AddMessageToThreadPayload,
    ApiResponse,
    ChatRoomMessage,
    CreateChatRoomDto,
    CreateThreadPayload,
    DirectMessage,
    DmPayload,
} from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";

/**
 * All client-side functionality regarding messages and contacting the server
 */
export class MessageService extends ClientSideApi {
    /**
     * Creates a thread
     *
     * @param receiver - The receiver of the thread
     * @param creator - The person who is creating the thread (by replying)
     */
    public static createThread = async (
        receiver: string,
        creator: string,
    ): Promise<ApiResponse<number>> => {
        if (receiver.length === 0 || creator.length === 0) {
            return { data: -1 };
        }

        const createRequest = await super.post<
            ApiResponse<number>,
            CreateThreadPayload
        >(
            `${Endpoints.MESSAGE.THREAD.BASE}${Endpoints.MESSAGE.THREAD.CREATE}`,
            {
                creator,
                receiver,
            },
        );

        return createRequest;
    };

    /**
     * Adds a message to the thread specified
     *
     * @param messageId - The id of the message to add to the thread
     * @param threadId - The id of the thread to add the message to
     * @returns Whether or not the message was added successfully
     */
    public static addMessageToThread = async (
        messageId: number,
        threadId: number,
    ): Promise<ApiResponse<boolean>> => {
        if (Number.isNaN(messageId)) {
            return { data: false };
        }

        const addRequest = await super.post<
            ApiResponse<boolean>,
            AddMessageToThreadPayload
        >(
            `${Endpoints.MESSAGE.THREAD.BASE}${Endpoints.MESSAGE.THREAD.ADD_MESSAGE}`,
            {
                messageId,
                threadId,
            },
        );

        return addRequest;
    };

    /**
     * Creates a message in the database and returns the id of the message that was created if created successfully
     *
     * @param payload - The message payload, which houses the creator, receiver, and the content of the message
     * @returns - The id of the message that was created
     */
    public static addMessage = async (
        payload: Partial<DirectMessage>,
    ): Promise<ApiResponse<number>> => {
        if (payload.content === undefined) {
            return { data: -1 };
        }

        const { content, receiver } = payload;

        const addMessageRequest = await super.post<
            ApiResponse<number>,
            Partial<DirectMessage>
        >(`${Endpoints.MESSAGE.BASE}${Endpoints.MESSAGE.ADD}`, {
            content,
            receiver,
        });

        return addMessageRequest;
    };

    /**
     * Adds a message to a chat room
     *
     * @param chatRoomId - The id of the chat room we are adding the message to
     * @param messageId - The id of the message we are adding
     * @returns The added message
     */
    public static addMessageToChatRoom = async (
        chatRoomId: number,
        messageId: number,
    ): Promise<ApiResponse<Partial<ChatRoomMessage>>> => {
        if (Number.isNaN(chatRoomId) || Number.isNaN(messageId)) {
            return { data: {} };
        }

        const addMessageToChatRoomRequest = await super.post<
            ApiResponse<Partial<ChatRoomMessage>>,
            AddChatRoomMessageDto
        >(
            `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.ADD_MESSAGE}`,
            { chatRoomId, messageId },
        );

        return addMessageToChatRoomRequest;
    };

    /**
     * Sends a direct message to the user specified by `receiver` from the user `sender` with content of `content`
     *
     * @param receiver - The person who is receiving the message
     * @param content - The content of the message
     * @param senderProfilePicture - The profile picture of the person sending the message
     * @returns Whether or not the DM was successfully sent
     */
    public static sendDM = async (
        receiver: number,
        content: string,
    ): Promise<ApiResponse<boolean>> => {
        if (receiver === undefined || content.length === 0) {
            return { data: false };
        }

        const sendDmRequest = await super.post<ApiResponse<boolean>, DmPayload>(
            `${Endpoints.MESSAGE.BASE}${Endpoints.MESSAGE.SEND_DIRECT_MESSAGE}`,
            {
                content,
                receiver,
            },
        );

        return sendDmRequest;
    };

    /**
     * Creates a chat room in the database
     *
     * @param name - The name of the chat room
     * @param description - The description of the chatroom
     */
    public static createChatRoom = async (
        name: string,
        description?: string,
    ): Promise<ApiResponse<boolean>> => {
        if (name === undefined) {
            return { data: false };
        }

        const createChatRoomResponse = await super.post<
            ApiResponse<boolean>,
            CreateChatRoomDto
        >(
            `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.CREATE}`,
            { description, name },
        );

        return createChatRoomResponse;
    };
}
