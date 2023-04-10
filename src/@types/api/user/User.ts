export type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
    handle?: string;
    dob?: number;
    username: string;
    password: string;
    passwordSalt: string;
    profileImageUrl?: string;
    profileImageRemovalUrl?: string;
    createdAt?: number | string;
    updatedAt?: number | string;
};
