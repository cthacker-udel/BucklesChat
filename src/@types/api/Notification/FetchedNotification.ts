import type { NotificationType } from "@/assets";

export type FetchedNotification = {
    createdAt: Date;
    id: number;
    receiverHandle?: string;
    receiverId: number;
    receiverUsername?: string;
    senderHandle?: string;
    senderId: number;
    senderUsername?: string;
    type: NotificationType;
};
