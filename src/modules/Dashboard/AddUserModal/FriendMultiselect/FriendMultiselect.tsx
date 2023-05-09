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
        _handleLookup: Map<string, number>,
    ) => void;
    onSelectFriend: (_id: number) => void;
    selectedFriends: Set<number>;
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
    } = useSWR<
        Pick<
            User,
            "createdAt" | "handle" | "id" | "profileImageUrl" | "username"
        >[],
        Error,
        string
    >(`${Endpoints.FRIEND.BASE}${Endpoints.FRIEND.AVAILABLE_FRIENDS}`);

    const router = useRouter();

    const [handleLookup, setHandleLookup] = React.useState<Map<string, number>>(
        new Map(),
    );

    const [currentKeyIndex, setCurrentKeyIndex] = React.useState<number>(0);

    const onKeyPressed = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (
                (event.key === Key.ArrowDown || event.key === Key.ArrowUp) &&
                availableFriends !== undefined
            ) {
                const isKeyDown = event.key === Key.ArrowDown;
                const modifiedKeyIndex = isKeyDown
                    ? currentKeyIndex === availableFriends.length - 1
                        ? 0
                        : currentKeyIndex + 1
                    : currentKeyIndex === 0
                    ? availableFriends.length - 1
                    : currentKeyIndex - 1;
                const currentKeyIndexFriend =
                    availableFriends[modifiedKeyIndex];
                const foundFriendDocuments = document.querySelectorAll(
                    `#userid_${currentKeyIndexFriend.id}`,
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
                availableFriends !== undefined
            ) {
                const currentKeyIndexFriend = availableFriends[currentKeyIndex];
                const foundFriendDocuments = document.querySelectorAll(
                    `#userid_${currentKeyIndexFriend.id}`,
                );
                if (foundFriendDocuments.length > 0) {
                    const foundFriendDocument =
                        foundFriendDocuments[0] as HTMLElement;
                    const { userid: foundFriendId } =
                        foundFriendDocument.dataset;
                    if (foundFriendId !== undefined) {
                        onSelectFriend(Number.parseInt(foundFriendId, 10));
                    }
                }
            }
        },
        [availableFriends, currentKeyIndex, onSelectFriend],
    );

    React.useEffect(() => {
        if (availableFriends !== undefined) {
            for (const eachFriendInformation of availableFriends) {
                if (
                    eachFriendInformation.handle !== null ||
                    eachFriendInformation.username !== null
                ) {
                    setHandleLookup((oldHandleLookup) => {
                        const clonedMap = new Map(oldHandleLookup);
                        if (
                            !clonedMap.has(
                                eachFriendInformation.handle as unknown as string,
                            ) ||
                            !clonedMap.has(
                                eachFriendInformation.username as unknown as string,
                            )
                        ) {
                            clonedMap.set(
                                (eachFriendInformation.handle as unknown as string) ??
                                    eachFriendInformation.username,
                                eachFriendInformation.id as unknown as number,
                            );
                        }
                        return clonedMap;
                    });
                }
            }
        }
    }, [availableFriends]);

    if (error !== undefined) {
        router.push("/login");
    }

    if (availableFriends === undefined || isLoadingAvailableFriends) {
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
                {availableFriends.map(
                    (eachFriendInformation: Partial<User>, _index: number) => (
                        <div
                            className={styles.multiselect_selection}
                            data-handle={eachFriendInformation.handle}
                            data-userid={eachFriendInformation.id}
                            data-username={eachFriendInformation.username}
                            id={`userid_${eachFriendInformation.id}`}
                            key={`multiselect_selection-${_index}`}
                            onClick={(): void => {
                                onSelectFriend(
                                    eachFriendInformation.id as unknown as number,
                                );
                            }}
                        >
                            <div
                                className={
                                    styles.multiselect_selection_user_information
                                }
                            >
                                <div
                                    className={
                                        styles.multiselect_selection_user_image_username
                                    }
                                >
                                    <Image
                                        alt={`${eachFriendInformation.username}'s profile picture`}
                                        className={
                                            styles.multiselect_profile_image
                                        }
                                        src={
                                            eachFriendInformation.profileImageUrl ??
                                            placeholderPFP.src
                                        }
                                    />
                                    <div
                                        className={
                                            styles.multiselect_selection_header_text
                                        }
                                    >
                                        {eachFriendInformation.handle ===
                                        null ? (
                                            <div>
                                                {eachFriendInformation.username}
                                            </div>
                                        ) : (
                                            <>
                                                <div>
                                                    {
                                                        eachFriendInformation.handle
                                                    }
                                                </div>
                                                <div
                                                    className={
                                                        styles.multiselect_selection_header_username_with_handle
                                                    }
                                                >
                                                    {
                                                        eachFriendInformation.username
                                                    }
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
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
                            {eachFriendInformation.username && (
                                <div
                                    className={
                                        styles.multiselect_selection_toggle
                                    }
                                >
                                    {selectedFriends.has(
                                        eachFriendInformation.id as unknown as number,
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
