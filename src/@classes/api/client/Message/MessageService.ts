/* eslint-disable @typescript-eslint/indent -- disabled */
import type {
    AddMessageToThreadPayload,
    ApiResponse,
    CreateThreadPayload,
    DirectMessage,
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

    public static addMessage = async (
        payload: Partial<DirectMessage>,
    ): Promise<ApiResponse<number>> => {
        if (
            payload.content === undefined ||
            payload.receiver === undefined ||
            payload.sender === undefined
        ) {
            return { data: -1 };
        }

        const { content, receiver, sender } = payload;

        const addMessageRequest = await super.post<
            ApiResponse<number>,
            Partial<DirectMessage>
        >(`${Endpoints.MESSAGE.BASE}${Endpoints.MESSAGE.ADD}`, {
            content,
            receiver,
            sender,
        });

        return addMessageRequest;
    };
}
