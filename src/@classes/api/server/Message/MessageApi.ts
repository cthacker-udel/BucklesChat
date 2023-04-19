/* eslint-disable @typescript-eslint/indent -- disabled */
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type {
    AddMessageToThreadPayload,
    ApiResponse,
    CreateThreadPayload,
    ExceptionLog,
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
}
