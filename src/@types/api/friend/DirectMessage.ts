export type DirectMessage = {
    content: string;
    createdAt: Date;
    id: number;
    receiver: string;
    sender: string;
    senderProfilePictureUrl?: string;
};
