/* eslint-disable @typescript-eslint/indent -- disabled */
import type { ApiResponse, SendFriendRequest } from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";

/**
 *
 */
export class FriendService extends ClientSideApi {
    /**
     * Sends a friend request to the specified user `usernameTo` from the user `usernameFrom`
     *
     * @param usernameTo -  The username we are sending the request to
     * @param usernameFrom - The username we are sending the request from
     * @param customMessage - The custom message we are appending to the request
     * @returns Whether or not the request was successfully sent
     */
    public static sendFriendRequest = async (
        usernameTo: string,
        usernameFrom: string,
        customMessage?: string,
    ): Promise<ApiResponse<boolean>> => {
        if (usernameTo.length === 0 || usernameFrom.length === 0) {
            return { data: false };
        }

        const sendRequest = await super.post<
            ApiResponse<boolean>,
            SendFriendRequest
        >(`${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.SEND_REQUEST}`, {
            customMessage,
            usernameFrom,
            usernameTo,
        });

        return sendRequest;
    };
}
