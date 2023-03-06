import type { NextApiRequest, NextApiResponse } from "next";

import type { ApiResponse, User } from "@/@types";
import { Endpoints } from "@/assets";

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
        const postedResult = await super.post<User>(
            `${Endpoints.USER.BASE}${Endpoints.USER.CREATE}`,
            JSON.parse(request.body) as User,
        );

        response.json(postedResult);
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
        const getResult = await super.get<ApiResponse<boolean>>(
            `${Endpoints.USER.BASE}${Endpoints.USER.DOES_EXIST}?username=${request.query.username}`,
        );

        response.json(getResult);
    };
}
