import React from "react";
import { Accordion } from "react-bootstrap";
import useSWR from "swr";

import type { ChatRoom } from "@/@types";
import { Endpoints } from "@/assets";

import styles from "./Chat.module.css";
import { ChatRoomToggle } from "./ChatRoomToggle";

/**
 *
 * @returns - The main chat component, that houses all of the current live chats taking place
 */
export const Chat = (): JSX.Element => {
    const { data: chatRooms } = useSWR<ChatRoom[], ChatRoom[], string>(
        `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.ALL}`,
    );

    const [activeKey, setActiveKey] = React.useState<string>("-1");

    const toggleActiveKey = React.useCallback((newActiveKey: string) => {
        setActiveKey((oldActiveKey: string) => {
            if (oldActiveKey === newActiveKey) {
                return "-1";
            }
            return newActiveKey;
        });
    }, []);

    return (
        <div className={styles.chat_room_list}>
            {chatRooms?.map(
                (eachChatRoom: ChatRoom, eachChatRoomIndex: number) => (
                    <div key={`chat_room_${eachChatRoom.name}`}>
                        <Accordion
                            activeKey={`${activeKey}`}
                            className={styles.chat_room_accordion}
                            defaultActiveKey="-1"
                        >
                            <ChatRoomToggle
                                eventKey={`${eachChatRoomIndex}`}
                                toggleActiveKey={toggleActiveKey}
                                {...eachChatRoom}
                            />
                            <Accordion.Collapse
                                eventKey={`${eachChatRoomIndex}`}
                            >
                                <div>{"hello"}</div>
                            </Accordion.Collapse>
                        </Accordion>
                    </div>
                ),
            )}
        </div>
    );
};
