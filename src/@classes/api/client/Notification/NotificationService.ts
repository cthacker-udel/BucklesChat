/* eslint-disable @typescript-eslint/indent -- disabled */
import type { ApiResponse, FetchedNotification } from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../../ClientSideApi";

/**
 * All client-side functionality regarding notifications and contacting the server
 */
export class NotificationService extends ClientSideApi {
    /**
     * Fetches all notifications in the database that fall under the user requesting them
     *
     * @returns All notifications stored in the database under the user
     */
    public static fetchNotifications = async (): Promise<
        ApiResponse<FetchedNotification[]>
    > => {
        const fetchRequest = await super.get<
            ApiResponse<FetchedNotification[]>
        >(
            `${Endpoints.NOTIFICATION.BASE}${Endpoints.NOTIFICATION.ALL_NOTIFICATIONS}`,
        );

        return fetchRequest;
    };
}
