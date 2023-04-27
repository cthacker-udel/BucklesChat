import React from "react";
import useSWR from "swr";

import type { ChatRoom } from "@/@types";
import { Endpoints } from "@/assets";

import styles from "./Chat.module.css";
import { ChatRoomForm } from "./ChatRoomForm";
import { ChatRoomToggle } from "./ChatRoomToggle";

/**
 *
 * @returns - The main chat component, that houses all of the current live chats taking place
 */
export const Chat = (): JSX.Element => {
    const { data: chatRooms } = useSWR<ChatRoom[], ChatRoom[], string>(
        `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.ALL}`,
    );

    const [activeChat, setActiveChat] = React.useState<string>("-1");

    const onChatRoomFormClose = React.useCallback(() => {
        setActiveChat("");
    }, []);

    const onChatRoomOpen = React.useCallback((name: string) => {
        setActiveChat(name);
    }, []);

    return (
        <div className={styles.chat_room_list}>
            {chatRooms?.map((eachChatRoom: ChatRoom) => (
                <div key={`chat_room_${eachChatRoom.name}`}>
                    <ChatRoomToggle
                        onChatRoomOpen={onChatRoomOpen}
                        {...eachChatRoom}
                    />
                    <ChatRoomForm
                        display={eachChatRoom.name === activeChat}
                        onChatRoomFormClose={onChatRoomFormClose}
                        {...eachChatRoom}
                    />
                </div>
            ))}
        </div>
    );
};
