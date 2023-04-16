export type DirectMessage = {
    content: string;
    createdAt: Date;
    receiver: string;
    sender: string;
    senderProfilePictureUrl?: string;
};
