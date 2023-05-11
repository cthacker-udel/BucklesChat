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
    switch (notification.type) {
        case NotificationType.SENDING_MESSAGE: {
            return `Received message from ${
                notification.senderHandle ?? notification.senderUsername
            }`;
        }
        case NotificationType.SENDING_FRIEND_REQUEST: {
            return `Received friend request from ${
                notification.senderHandle ?? notification.senderUsername
            }`;
        }
        case NotificationType.ACCEPTED_FRIEND_REQUEST: {
            return `${
                notification.senderHandle ?? notification.senderHandle
            } accepted your friend request`;
        }
        case NotificationType.REJECTED_FRIEND_REQUEST: {
            return `${
                notification.senderHandle ?? notification.senderHandle
            } rejected your friend request`;
        }
        case NotificationType.REMOVED_FRIEND: {
            return `${
                notification.senderHandle ?? notification.senderHandle
            } removed you as a friend`;
        }
        default: {
            return "";
        }
    }
};
