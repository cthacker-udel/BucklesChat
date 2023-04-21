import type { DirectMessage } from "../friend";

export type ThreadMessages = {
    creator: string;
    creatorProfilePictureUrl?: string;
    messages: DirectMessage[];
    receiver: string;
    receiverProfilePictureUrl?: string;
    threadId: number;
};
