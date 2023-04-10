/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import useSWR from "swr";

import type { User } from "@/@types";

type FriendMultiselectProperties = {
    username: string;
};

/**
 * The friend multiselect, which allows for users to select who they want to send friend requests to
 */
export const FriendMultiSelect = ({
    username,
}: FriendMultiselectProperties): JSX.Element => {
    const { data: availableFriends } = useSWR<string[], undefined, string>(
        `friend/availableFriends?username=${username}`,
    );
    const { data: availableFriendInformation } = useSWR<
        Partial<User>[],
        Partial<User>[],
        string
    >(
        `user/bulkDashboardInformation?usernames=${
            availableFriends === undefined ? "" : availableFriends.join(",")
        }`,
    );

    console.log(availableFriends, availableFriendInformation);

    return <div />;
};
