import React from "react";
import useSWRInfinite from "swr/infinite";

type FriendMultiselectProperties = {
    username: string;
};

/**
 * The friend multiselect, which allows for users to select who they want to send friend requests to
 */
export const FriendMultiselect = ({
    username,
}: FriendMultiselectProperties): JSX.Element => {};
