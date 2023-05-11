export type DirectMessage = {
    content: string;
    createdAt: Date;
    id: number;
    receiver: string;
    sender: string;
    senderHandle?: string;
    senderUsername?: string;
    senderProfilePictureUrl?: string;
    thread?: number;
    threadOrder?: number;
};
