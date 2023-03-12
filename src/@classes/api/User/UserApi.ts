import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type { ApiResponse, ExceptionLog, User } from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../ClientSideApi";
import { ServerSideApi } from "../ServerSideApi";

/**
 *
 */
export class UserApi extends ServerSideApi {
    /**
     * Creates a user in the database
     *
     * @param request - The client-side request
     * @param response - The response back to the client
     */
    public static createUser = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const postedResult = await super.post<User>(
                `${Endpoints.USER.BASE}${Endpoints.USER.CREATE}`,
                JSON.parse(request.body) as User,
            );

            response.json(postedResult);
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
                    apiError: { message: (error as Error).message },
                    data: false,
                });
            }
        }
    };

    /**
     * Finds whether the username supplied within the query string exists within the database
     *
     * @param request - The client-side request
     * @param response - The response back to the client
     */
    public static doesUsernameExist = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const getResult = await super.get<ApiResponse<boolean>>(
                `${Endpoints.USER.BASE}${Endpoints.USER.DOES_EXIST}?username=${request.query.username}`,
            );

            response.json(getResult);
        } catch (error: unknown) {
            try {
                const convertedError = error as Error;
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
                    apiError: { message: (error as Error).message },
                    data: false,
                });
            }
        }
    };

    public static login = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const getResult = await super.post<ApiResponse<boolean>>(
                `${Endpoints.USER.BASE}${Endpoints.USER.LOGIN}`,
                JSON.parse(request.body) as Partial<User>,
            );

            response.json(getResult);
        } catch (error: unknown) {
            try {
                const convertedError = error as Error;
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
                    apiError: { message: (error as Error).message },
                    data: false,
                });
            }
        }
    };
}
