import type { FetchedNotification } from "@/@types";
import { NotificationType } from "@/assets";

/**
 * Processes the backend notification and stringifies it for display in the client
 *
 * @param notification - The notification to process
 * @returns The processed notification, stringified, as to be displayed in the toast
 */
export const processNotification = (
    notification: FetchedNotification,
): string => {
    if (notification.type === NotificationType.SENDING_MESSAGE) {
        return `Received message from ${
            notification.senderHandle ?? notification.senderUsername
        }`;
    } else if (notification.type === NotificationType.SENDING_FRIEND_REQUEST) {
        return `Received friend request from ${
            notification.senderHandle ?? notification.senderUsername
        }`;
    }
    return "";
};
