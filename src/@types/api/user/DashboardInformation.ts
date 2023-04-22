import type { User } from "./User";

export type DashboardInformation = {
    handle?: string;
    profileImageUrl?: string;
    username?: string;
    createdAt?: string;
    numberOfFriends?: number;
    numberOfMessages?: number;
    friendsInformation?: Partial<User>[];
};
