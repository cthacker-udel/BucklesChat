/* eslint-disable @typescript-eslint/indent -- disabled */
import type { ApiResponse, FriendRequestPayload } from "@/@types";
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
            FriendRequestPayload
        >(`${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.SEND_REQUEST}`, {
            customMessage,
            usernameFrom,
            usernameTo,
        });

        return sendRequest;
    };

    /**
     * Accepts or rejects a friend request from the user (`usernameFrom`) to the user (`usernameTo`)
     *
     * @param usernameTo - The username the friend request is targeted at
     * @param usernameFrom - The username whom sent the friend request
     * @param accept - Whether we are accepting or rejecting the friend request
     * @returns - Whether or not the process went through
     */
    public static processFriendRequest = async (
        usernameTo: string,
        usernameFrom: string,
        accept: boolean,
    ): Promise<ApiResponse<boolean>> => {
        if (usernameTo.length === 0 || usernameFrom.length === 0) {
            return { data: false };
        }

        const processRequest = await super.post<
            ApiResponse<boolean>,
            FriendRequestPayload
        >(
            `${Endpoints.FRIEND.BASE}${
                accept
                    ? Endpoints.FRIEND.ACCEPT_REQUEST
                    : Endpoints.FRIEND.REJECT_REQUEST
            }`,
            { usernameFrom, usernameTo },
        );

        return processRequest;
    };
}
