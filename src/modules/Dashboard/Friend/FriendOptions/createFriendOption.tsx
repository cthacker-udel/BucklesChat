import React from "react";
import { Tooltip } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

import { FriendOptions } from "./FriendOptions";

/**
 * Creates a FriendOptions component with the injected properties from the OverlayTrigger component
 *
 * @param onMessageFriendOptionCallback - The callback that is fired when the message friend option is clicked
 * @param username - The friend's username
 * @param rest - The inject props from the OverlayTrigger component
 * @param id - The id of the friend in the database
 * @param handle - (optional) The friend's handle (can be null)
 * @param profileImageUrl - (optional) The friend's profile image url (can be null)
 * @returns The rendered FriendOptions component, with the appropriate properties passed in
 */
export const createFriendOptions = (
    onMessageFriendOptionCallback: () => void,
    username: string,
    rest: OverlayInjectedProps,
    id?: number,
    handle?: string,
    profileImageUrl?: string,
): JSX.Element => (
    <Tooltip {...rest}>
        <FriendOptions
            handle={handle}
            id={id}
            onMessageFriendOptionCallback={onMessageFriendOptionCallback}
            profileImageUrl={profileImageUrl}
            username={username}
        />
    </Tooltip>
);
