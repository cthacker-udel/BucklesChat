/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
/* eslint-disable react/no-array-index-key -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
import { useRouter } from "next/router";
import React from "react";
import { Form, Image, InputGroup } from "react-bootstrap";
import useSWR from "swr";
import { Key } from "ts-key-enum";

import type { User } from "@/@types";
import { Endpoints } from "@/assets";
import placeholderPFP from "@/assets/placeholder/pfp.jpg";

import styles from "./FriendMultiselect.module.css";

type FriendMultiselectProperties = {
    onSearch: (
        _handleOrUsername: string,
        _handleLookup: Map<string, string>,
    ) => void;
    onSelectFriend: (_username: string) => void;
    selectedFriends: Set<string>;
};

/**
 * The friend multiselect, which allows for users to select who they want to send friend requests to
 */
export const FriendMultiSelect = ({
    onSearch,
    onSelectFriend,
    selectedFriends,
}: FriendMultiselectProperties): JSX.Element => {
    const {
        data: availableFriends,
        error,
        isLoading: isLoadingAvailableFriends,
    } = useSWR<string[], Error, string>(
        `${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.AVAILABLE_FRIENDS}`,
    );
    const {
        data: availableFriendInformation,
        error: availableFriendsError,
        isLoading: isLoadingBulkDashboard,
    } = useSWR<Partial<User>[], Error, string>(
        `${Endpoints.USER.BASE}${Endpoints.USER.BULK_DASHBOARD}?usernames=${
            availableFriends === undefined ? "" : availableFriends.join(",")
        }`,
    );

    const router = useRouter();

    const [handleLookup, setHandleLookup] = React.useState<Map<string, string>>(
        new Map(),
    );

    const [currentKeyIndex, setCurrentKeyIndex] = React.useState<number>(0);

    const onKeyPressed = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (
                (event.key === Key.ArrowDown || event.key === Key.ArrowUp) &&
                availableFriendInformation !== undefined
            ) {
                const isKeyDown = event.key === Key.ArrowDown;
                const modifiedKeyIndex = isKeyDown
                    ? currentKeyIndex === availableFriendInformation.length - 1
                        ? 0
                        : currentKeyIndex + 1
                    : currentKeyIndex === 0
                    ? availableFriendInformation.length - 1
                    : currentKeyIndex - 1;
                const currentKeyIndexFriend =
                    availableFriendInformation[modifiedKeyIndex];
                const foundFriendDocuments = document.querySelectorAll(
                    `#username_${
                        currentKeyIndexFriend.username as unknown as string
                    }`,
                );
                if (foundFriendDocuments.length > 0) {
                    foundFriendDocuments[0]?.scrollIntoView({
                        behavior: "smooth",
                    });
                    foundFriendDocuments[0]?.animate(
                        [
                            { borderColor: "green" },
                            { borderColor: "rgba(0, 0, 0, 0.25)" },
                        ],
                        {
                            duration: 1200,
                            easing: "ease-in-out",
                            fill: "forwards",
                        },
                    );
                }
                setCurrentKeyIndex(modifiedKeyIndex);
            } else if (
                event.key === Key.Enter &&
                availableFriendInformation !== undefined
            ) {
                const currentKeyIndexFriend =
                    availableFriendInformation[currentKeyIndex];
                const foundFriendDocuments = document.querySelectorAll(
                    `#username_${
                        currentKeyIndexFriend.username as unknown as string
                    }`,
                );
                if (foundFriendDocuments.length > 0) {
                    const foundFriendDocument =
                        foundFriendDocuments[0] as HTMLElement;
                    const { username: foundFriendUsername } =
                        foundFriendDocument.dataset;
                    if (foundFriendUsername !== undefined) {
                        onSelectFriend(foundFriendUsername);
                    }
                }
            }
        },
        [availableFriendInformation, currentKeyIndex, onSelectFriend],
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

    if (error !== undefined || availableFriendsError !== undefined) {
        router.push("/login");
    }

    if (
        availableFriendInformation === undefined ||
        availableFriends === undefined ||
        isLoadingAvailableFriends ||
        isLoadingBulkDashboard
    ) {
        return <div />;
    }

    return (
        <div className={styles.container} onKeyDown={onKeyPressed} tabIndex={0}>
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
                            data-username={eachFriendInformation.username}
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
