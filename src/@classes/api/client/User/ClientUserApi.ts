/* eslint-disable @typescript-eslint/indent -- disabled */
import type { ApiResponse, User } from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";

/**
 * Client-side user api
 */
export class ClientUserApi extends ClientSideApi {
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
}
