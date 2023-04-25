/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { useAccordionButton } from "react-bootstrap";
import useSWR from "swr";

import type { ChatRoomStats } from "@/@types";
import { Endpoints } from "@/assets";

import styles from "./ChatRoomToggle.module.css";

type ChatRoomToggleProperties = {
    createdAt?: Date;
    createdBy: string;
    description?: string;
    eventKey: string;
    id?: number;
    name: string;
    toggleActiveKey: (_newActiveKey: string) => void;
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
    eventKey,
    id,
    name,
    toggleActiveKey,
    updatedAt: _updatedAt,
}: ChatRoomToggleProperties): JSX.Element => {
    const { data: chatRoomStats } = useSWR<
        ChatRoomStats,
        ChatRoomStats,
        string
    >(
        `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.STATS}?chatRoomId=${id}`,
    );
    const chatRoomToggleHook = useAccordionButton(eventKey);

    return (
        <div
            className={styles.chat_room_toggle}
            onClick={(event: React.MouseEvent<HTMLDivElement>): void => {
                toggleActiveKey(eventKey);
                chatRoomToggleHook(event);
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
