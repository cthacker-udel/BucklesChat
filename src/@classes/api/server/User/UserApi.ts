/* eslint-disable import/no-nodejs-modules -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
import type { IncomingHttpHeaders } from "node:http";

import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import type {
    ApiResponse,
    DashboardInformation,
    ExceptionLog,
    User,
} from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";
import { ServerSideApi } from "../../ServerSideApi";

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
                undefined,
                request.headers as { [key: string]: string },
                response,
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
                undefined,
                request.headers as { [key: string]: string },
                response,
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
     * Edits the user specified by the username passed in the body with the specified payload
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static edit = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const partialUser = JSON.parse(request.body) as Partial<User>;
            const updateResult = await super.put<
                ApiResponse<boolean>,
                Partial<User>
            >(
                `${Endpoints.USER.BASE}${Endpoints.USER.EDIT}`,
                partialUser,
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

            response.send(updateResult);
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
                undefined,
                request.headers as { [key: string]: string },
                response,
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
     * Gets the user dashboard information from a client-side request
     *
     * @param request - The client request
     * @param response - The response to the client
     */
    public static getUserDashboardInformation = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const getResult = await super.get<
                ApiResponse<DashboardInformation>
            >(
                `${Endpoints.USER.BASE}${Endpoints.USER.DASHBOARD}`,
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

            response.send(getResult);
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
     * Bulk fetches dashboard information for all usernames sent
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static bulkGetDashboardInformation = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const usernames = request.query.usernames as string;
            const getResult = await super.get<ApiResponse<Partial<User>[]>>(
                `${Endpoints.USER.BASE}${Endpoints.USER.BULK_DASHBOARD}?usernames=${usernames}`,
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

            response.send(getResult);
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
     * Gets the user edit information from a client-side request
     *
     * @param request - The client request
     * @param response - The response to the client
     */
    public static getUserDetails = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const getResult = await super.get<
                ApiResponse<DashboardInformation>
            >(
                `${Endpoints.USER.BASE}${Endpoints.USER.DETAILS}`,
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

            response.send(getResult);
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
     * Gets the user dashboard information, such as the profile picture url, the handle, and the username
     *
     * @param username - The username we are looking up
     */
    public static ssGetUserDashboardInformation = async (
        headers: IncomingHttpHeaders,
    ): Promise<ApiResponse<DashboardInformation>> => {
        try {
            const getResult = await super.get<
                ApiResponse<DashboardInformation>
            >(
                `${Endpoints.USER.BASE}${Endpoints.USER.DASHBOARD}`,
                undefined,
                headers as { [key: string]: string },
            );
            return getResult;
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
            return {
                data: {
                    handle: undefined,
                    profileImageUrl: undefined,
                    username: undefined,
                },
            };
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

    /**
     * Logs the user out of the application
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static logout = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            await super.post<ApiResponse<void>>(
                `${Endpoints.USER.BASE}${Endpoints.USER.LOGOUT}`,
                {},
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

            response.send({ data: response.statusCode === 200 });
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
        }
    };

    /**
     * Checks if the supplied email is valid, and returns the result of either false, or true.
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static isEmailValid = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const email = request.query.email;

            if (email === undefined || email.length === 0) {
                throw new Error("Must supply valid email to validate");
            }
            const isEmailValid = await super.get<ApiResponse<boolean>>(
                `${Endpoints.USER.BASE}${Endpoints.USER.IS_EMAIL_VALID}?email=${email}`,
                undefined,
                request.headers as { [key: string]: string },
                response,
            );

            response.send(isEmailValid);
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
        }
    };

    /**
     * Confirms a user email
     *
     * @param request - The client request
     * @param response - The client response
     */
    public static confirmEmail = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        try {
            const token = request.query.token as string;

            if (token === undefined) {
                throw new Error(
                    "Must supply confirmation token when attempting to confirm email",
                );
            }

            const didConfirmEmail = await super.get<ApiResponse<boolean>>(
                `${Endpoints.USER.BASE}${Endpoints.USER.CONFIRM_EMAIL}`,
                { token },
                request.headers as { [key: string]: string },
                response,
            );

            response.send(didConfirmEmail);
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
        }
    };
}
