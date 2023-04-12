import type { User } from "./User";

export type DashboardInformation = {
    handle?: string;
    profileImageUrl?: string;
    username?: string;
    createdAt?: string;
    numberOfFriends?: number;
    friendsInformation?: Partial<User>[];
};
