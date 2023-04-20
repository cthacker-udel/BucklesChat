import type { DirectMessage } from "../friend";

export type ThreadMessages = {
    messages: DirectMessage[];
    threadId: number;
};
