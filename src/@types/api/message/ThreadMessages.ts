import type { DirectMessage } from "../friend";

export type ThreadMessages = {
    creatorProfilePictureUrl?: string;
    messages: DirectMessage[];
    receiverProfilePictureUrl?: string;
    threadId: number;
};
