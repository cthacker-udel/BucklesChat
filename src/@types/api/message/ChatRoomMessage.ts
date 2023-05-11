export type ChatRoomMessage = {
    content: string;
    createdAt?: Date;
    sender: string;
    senderHandle?: string;
    senderUsername: string;
    senderProfilePictureUrl?: string;
};
