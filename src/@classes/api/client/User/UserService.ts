/* eslint-disable @typescript-eslint/indent -- disabled */
import type { ApiResponse, ChangePasswordRequest, User } from "@/@types";
import { Endpoints, RegexConstants } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";

/**
 * Client-side user api
 */
export class UserService extends ClientSideApi {
    /**
     * Edits an user in the database
     *
     * @param partialUser - The partial user upon whom we are executing the edit request upon
     * @returns The edited user
     */
    public static editUser = async (
        partialUser: Partial<User>,
    ): Promise<ApiResponse<boolean>> => {
        if (partialUser.username === undefined) {
            return { data: false };
        }

        const editRequest = await super.put<
            ApiResponse<boolean>,
            Partial<User>
        >(`${Endpoints.USER.BASE}${Endpoints.USER.EDIT}`, partialUser);
        return editRequest;
    };

    /**
     * Logs the user out from the service
     *
     * @returns The logout response, 204 for success and 500 for failure, true if 204, false if 500
     */
    public static logout = async (): Promise<ApiResponse<boolean>> => {
        const response = await super.post<ApiResponse<boolean>, unknown>(
            `${Endpoints.USER.BASE}${Endpoints.USER.LOGOUT}`,
            undefined,
            undefined,
        );

        return response;
    };

    /**
     * Checks if the provided email is valid
     *
     * @param email - The email we are validating
     * @returns Whether or not the email is valid
     */
    public static isEmailValid = async (
        email: string,
    ): Promise<ApiResponse<boolean>> => {
        if (
            email === undefined ||
            !RegexConstants.EMAIL.test(email) ||
            email.length === 0
        ) {
            return { data: false };
        }

        const response = await super.get<ApiResponse<boolean>>(
            `${Endpoints.USER.BASE}${Endpoints.USER.IS_EMAIL_VALID}?email=${email}`,
        );

        return response;
    };

    /**
     * Attempts to confirm an email given the email confirmation token
     *
     * @param token - The token used to confirm the email
     * @returns Whether the email was confirmed or not
     */
    public static confirmEmail = async (
        token: string,
    ): Promise<ApiResponse<boolean>> => {
        if (token === undefined || token.length === 0) {
            return { data: false };
        }

        const response = await super.get<ApiResponse<boolean>>(
            `${Endpoints.USER.BASE}${Endpoints.USER.CONFIRM_EMAIL}?token=${token}`,
        );

        return response;
    };

    /**
     * Attempts to refresh the user state in the psql + redis database
     *
     * @returns Whether the state was refreshed
     */
    public static refreshState = async (): Promise<ApiResponse<boolean>> => {
        const response = await super.get<ApiResponse<boolean>>(
            `${Endpoints.USER.BASE}${Endpoints.USER.REFRESH_USER_STATE}`,
        );

        return response;
    };

    /**
     * Attempts to remove the logged in state from the redis database
     *
     * @returns Whether the state was cleared
     */
    public static clearState = async (): Promise<ApiResponse<boolean>> => {
        const response = await super.delete<ApiResponse<boolean>>(
            `${Endpoints.USER.BASE}${Endpoints.USER.CLEAR_USER_STATE}`,
        );

        return response;
    };

    /**
     * Changes the user's password to the password supplied
     *
     * @param newPassword - The new password the user is setting their password as
     */
    public static changePassword = async (
        newPassword: string,
    ): Promise<ApiResponse<boolean>> => {
        const response = await super.post<
            ApiResponse<boolean>,
            ChangePasswordRequest
        >(`${Endpoints.USER.BASE}${Endpoints.USER.CHANGE_PASSWORD}`, {
            newPassword,
        });

        return response;
    };

    /**
     * Deletes the user from the database, removing all records of their interaction within the app
     * from the database as well (messages, threads, etc)
     */
    public static deleteUser = async (): Promise<ApiResponse<boolean>> => {
        const response = await super.delete<ApiResponse<boolean>>(
            `${Endpoints.USER.BASE}${Endpoints.USER.DELETE_USER}`,
        );

        return response;
    };
}
