/* eslint-disable react/no-array-index-key -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { Form, Image, InputGroup } from "react-bootstrap";
import useSWR from "swr";

import type { User } from "@/@types";
import placeholderPFP from "@/assets/placeholder/pfp.jpg";

import styles from "./FriendMultiselect.module.css";

type FriendMultiselectProperties = {
    onSearch: (
        _handleOrUsername: string,
        _handleLookup: Map<string, string>,
    ) => void;
    onSelectFriend: (_username: string) => void;
    selectedFriends: Set<string>;
    username: string;
};

/**
 * The friend multiselect, which allows for users to select who they want to send friend requests to
 */
export const FriendMultiSelect = ({
    onSearch,
    onSelectFriend,
    selectedFriends,
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

    const [handleLookup, setHandleLookup] = React.useState<Map<string, string>>(
        new Map(),
    );

    React.useEffect(() => {
        if (availableFriendInformation !== undefined) {
            for (const eachFriendInformation of availableFriendInformation) {
                if (eachFriendInformation.handle !== null) {
                    setHandleLookup((oldHandleLookup) => {
                        const clonedMap = new Map(oldHandleLookup);
                        if (
                            !clonedMap.has(
                                eachFriendInformation.handle as unknown as string,
                            )
                        ) {
                            clonedMap.set(
                                eachFriendInformation.handle as unknown as string,
                                eachFriendInformation.username as unknown as string,
                            );
                        }
                        return clonedMap;
                    });
                }
            }
        }
    }, [availableFriendInformation]);

    if (
        availableFriendInformation === undefined ||
        availableFriends === undefined
    ) {
        return <div />;
    }

    return (
        <div className={styles.container}>
            <InputGroup>
                <Form.Control
                    className={styles.multiselect_search}
                    onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        const { target } = event;
                        if (target !== undefined) {
                            const { value } = target;
                            onSearch(value, handleLookup);
                        }
                    }}
                    placeholder="Search for a user..."
                    type="text"
                />
                <InputGroup.Text>
                    <i className="fa-solid fa-magnifying-glass" />
                </InputGroup.Text>
            </InputGroup>
            <div className={styles.multiselect_container} id="friend_list">
                {availableFriendInformation.map(
                    (eachFriendInformation: Partial<User>, _index: number) => (
                        <div
                            className={styles.multiselect_selection}
                            id={`username_${
                                eachFriendInformation.username as unknown as string
                            }`}
                            key={`multiselect_selection-${_index}`}
                            onClick={(): void => {
                                onSelectFriend(
                                    eachFriendInformation.username as unknown as string,
                                );
                            }}
                        >
                            <div
                                className={
                                    styles.multiselect_selection_user_information
                                }
                            >
                                <Image
                                    alt={`${eachFriendInformation.username}'s profile picture`}
                                    className={styles.multiselect_profile_image}
                                    src={
                                        eachFriendInformation.profileImageUrl ??
                                        placeholderPFP.src
                                    }
                                />
                                <div
                                    className={
                                        styles.multiselect_selection_text
                                    }
                                >
                                    <span
                                        className={
                                            styles.multiselect_selection_header_text
                                        }
                                    >
                                        {eachFriendInformation.handle ??
                                            eachFriendInformation.username}
                                    </span>
                                    <div
                                        className={
                                            styles.multiselect_selection_subtext
                                        }
                                    >
                                        {eachFriendInformation.createdAt ===
                                        undefined
                                            ? new Date(
                                                  Date.now(),
                                              ).toLocaleDateString()
                                            : new Date(
                                                  eachFriendInformation.createdAt,
                                              ).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            {eachFriendInformation.username && (
                                <div
                                    className={
                                        styles.multiselect_selection_toggle
                                    }
                                >
                                    {selectedFriends.has(
                                        eachFriendInformation.username,
                                    ) ? (
                                        <i
                                            className={`fa-solid fa-circle-check ${styles.toggle_selected}`}
                                        />
                                    ) : (
                                        <i
                                            className={`fa-solid fa-circle ${styles.toggle_not_selected}`}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};
