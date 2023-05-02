/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import type { ChatRoomStats } from "@/@types";
import { Endpoints } from "@/assets";

import styles from "./ChatRoomToggle.module.css";

type ChatRoomToggleProperties = {
    createdAt?: Date;
    createdBy: string;
    description?: string;
    id?: number;
    name: string;
    onChatRoomOpen: (_chatName: string) => void;
    updatedAt?: Date;
};

/**
 *
 * @param param0
 * @returns
 */
export const ChatRoomToggle = ({
    createdAt: _createdAt,
    createdBy: _createdBy,
    description: _description,
    id,
    name,
    onChatRoomOpen,
    updatedAt: _updatedAt,
}: ChatRoomToggleProperties): JSX.Element => {
    const {
        data: chatRoomStats,
        error,
        isLoading,
    } = useSWR<ChatRoomStats, Error, string>(
        `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.STATS}?chatRoomId=${id}`,
    );

    const router = useRouter();

    if (error !== undefined) {
        router.push("/login");
    }

    if (chatRoomStats === undefined || isLoading) {
        return <span />;
    }

    return (
        <div
            className={styles.chat_room_toggle}
            onClick={(): void => {
                onChatRoomOpen(name);
            }}
        >
            <div className={styles.chat_room_stats}>
                <span>{name}</span>
                <div className={styles.chat_room_stats_multiple_elements}>
                    <i className="fa-solid fa-message fa-xs" />
                    <span>{chatRoomStats?.numberOfMessages ?? 0}</span>
                    <span>{"Messages"}</span>
                </div>
                <div>
                    {chatRoomStats?.lastUpdate?.toLocaleString() ??
                        "Not Updated"}
                </div>
                <div className={styles.chat_room_stats_multiple_elements}>
                    <i className="fa-solid fa-user fa-xs" />
                    <span>{chatRoomStats?.numberOfUsers}</span>
                    <span>{"Users"}</span>
                </div>
            </div>
        </div>
    );
};
