/* eslint-disable @typescript-eslint/indent -- disabled */
import type {
    ApiResponse,
    FriendPayload,
    FriendRequestPayload,
} from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";

/**
 *
 */
export class FriendService extends ClientSideApi {
    /**
     * Sends a friend request to the specified user `usernameTo` from the user `usernameFrom`
     *
     * @param userIdTo -  The username we are sending the request to
     * @param customMessage - The custom message we are appending to the request
     * @returns Whether or not the request was successfully sent
     */
    public static sendFriendRequest = async (
        userIdTo: number,
        customMessage?: string,
    ): Promise<ApiResponse<boolean>> => {
        if (userIdTo === undefined) {
            return { data: false };
        }

        const sendRequest = await super.post<
            ApiResponse<boolean>,
            FriendRequestPayload
        >(`${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.SEND_REQUEST}`, {
            customMessage,
            userIdTo,
        });

        return sendRequest;
    };

    /**
     * Accepts or rejects a friend request from the user (`usernameFrom`) to the user (`usernameTo`)
     *
     * @param userIdFrom - The user id whom sent the friend request
     * @param accept - Whether we are accepting or rejecting the friend request
     * @returns - Whether or not the process went through
     */
    public static processFriendRequest = async (
        userIdFrom: number,
        accept: boolean,
    ): Promise<ApiResponse<boolean>> => {
        if (userIdFrom === undefined) {
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
            { userIdFrom },
        );

        return processRequest;
    };

    /**
     * Removes a friend from the database
     *
     * @param friendId - The id of the friend you want to remove
     * @returns Whether or not the friend was successfully removed
     */
    public static removeFriend = async (
        friendId?: number,
    ): Promise<ApiResponse<boolean>> => {
        if (friendId === undefined) {
            return { data: false };
        }

        const removeFriendRequest = await super.post<
            ApiResponse<boolean>,
            FriendPayload
        >(`${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.REMOVE_FRIEND}`, {
            sender: friendId,
        });

        return removeFriendRequest;
    };
}
