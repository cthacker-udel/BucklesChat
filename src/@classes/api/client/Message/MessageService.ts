/* eslint-disable @typescript-eslint/indent -- disabled */
import type {
    AddMessageToThreadPayload,
    ApiResponse,
    CreateThreadPayload,
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
    ): Promise<ApiResponse<boolean>> => {
        if (receiver.length === 0 || creator.length === 0) {
            return { data: false };
        }

        const createRequest = await super.post<
            ApiResponse<boolean>,
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
}
