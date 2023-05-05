import type { DirectMessage } from "../friend";

export type ThreadMessages = {
    creator: string;
    creatorUsername: string;
    creatorProfilePictureUrl?: string;
    messages: DirectMessage[];
    receiver: string;
    receiverProfilePictureUrl?: string;
    receiverUsername: string;
    threadId: number;
};
