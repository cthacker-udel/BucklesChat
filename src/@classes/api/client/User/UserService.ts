/* eslint-disable @typescript-eslint/indent -- disabled */
import type { ApiResponse, User } from "@/@types";
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
        if (!RegexConstants.EMAIL.test(email)) {
            return { data: false };
        }

        const response = await super.get<ApiResponse<boolean>>(
            `${Endpoints.USER.BASE}${Endpoints.USER.IS_EMAIL_VALID}?email=${email}`,
        );

        return response;
    };
}
