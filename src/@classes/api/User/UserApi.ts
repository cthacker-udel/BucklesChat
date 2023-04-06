import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type { ApiResponse, ExceptionLog, User } from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../ClientSideApi";
import { ServerSideApi } from "../ServerSideApi";

/**
 * All methods involving the user api
 */
export class UserApi extends ServerSideApi {
    /**
     * Signs a user up for the service
     *
     * @param request - The client-side request
     * @param response - The response back to the client
     */
    public static signUp = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const postedResult = await super.post<User>(
                `${Endpoints.USER.BASE}${Endpoints.USER.SIGNUP}`,
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
                    apiError: { code: 500, message: (error as Error).message },
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
                    apiError: { code: 500, message: (error as Error).message },
                    data: false,
                });
            }
        }
    };

    /**
     * Attempts to log the user into the database
     *
     * @param request - The client request
     * @param response - The response from the backend
     */
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
                    apiError: { code: 500, message: (error as Error).message },
                    data: false,
                });
            }
        }
    };

    /**
     * Returns the total number of active users online, by fetching the number of current keys in the redis session database
     *
     * @returns - The number of active users online
     */
    public static usersOnline = async (): Promise<ApiResponse<number>> => {
        try {
            const numberOfUsersOnline = await super.get<ApiResponse<number>>(
                `${Endpoints.USER.BASE}${Endpoints.USER.USERS_ONLINE}`,
            );
            return numberOfUsersOnline;
        } catch (error: unknown) {
            try {
                const convertedError = error as Error;
                await ClientSideApi.post<ApiResponse<string>, ExceptionLog>(
                    `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EXCEPTION}`,
                    {
                        id: v4.toString(),
                        message: convertedError.message,
                        stackTrace: convertedError.stack,
                        timestamp: Date.now(),
                    },
                );
            } catch {}
            return { data: 0 };
        }
    };

    /**
     * Returns the total # of users in the entire application
     *
     * @returns - The total number of users in the entire application
     */
    public static totalUsers = async (): Promise<ApiResponse<number>> => {
        try {
            const numberOfUsers = await super.get<ApiResponse<number>>(
                `${Endpoints.USER.BASE}${Endpoints.USER.TOTAL_USERS}`,
            );
            return numberOfUsers;
        } catch (error: unknown) {
            try {
                const convertedError = error as Error;
                await ClientSideApi.post<ApiResponse<string>, ExceptionLog>(
                    `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EXCEPTION}`,
                    {
                        id: v4.toString(),
                        message: convertedError.message,
                        stackTrace: convertedError.stack,
                        timestamp: Date.now(),
                    },
                );
            } catch {}
            return { data: 0 };
        }
    };
}
