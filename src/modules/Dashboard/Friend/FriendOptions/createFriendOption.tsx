import React from "react";
import { Tooltip } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import { FriendOptions } from "./FriendOptions";

/**
 * Creates a FriendOptions component with the injected properties from the OverlayTrigger component
 *
 * @param handle - The friend's handle (can be null)
 * @param loggedInUsername - The username of the user who is currently logged in
 * @param profileImageUrl - The friend's profile image url (can be null)
 * @param username - The friend's username
 * @param rest - The inject props from the OverlayTrigger component
 * @returns The rendered FriendOptions component, with the appropriate properties passed in
 */
export const createFriendOptions = (
    loggedInUsername: string,
    username: string,
    rest: OverlayInjectedProps,
    handle?: string,
    profileImageUrl?: string,
): JSX.Element => (
    <Tooltip {...rest}>
        <FriendOptions
            handle={handle}
            loggedInUsername={loggedInUsername}
            profileImageUrl={profileImageUrl}
            username={username}
        />
    </Tooltip>
);
