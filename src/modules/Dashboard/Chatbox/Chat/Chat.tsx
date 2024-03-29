/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
import { useRouter } from "next/router";
import React from "react";
import { Button, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import useSWR from "swr";

import type { ChatRoom } from "@/@types";
import { Endpoints } from "@/assets";
import { renderTooltip } from "@/helpers";

import { AddChatModal } from "./AddChatModal";
import styles from "./Chat.module.css";
import { ChatRoomForm } from "./ChatRoomForm";
import { ChatRoomToggle } from "./ChatRoomToggle";

/**
 *
 * @returns - The main chat component, that houses all of the current live chats taking place
 */
export const Chat = (): JSX.Element => {
    const {
        data: chatRooms,
        error: allChatRoomsError,
        isLoading,
    } = useSWR<ChatRoom[], Error, string>(
        `${Endpoints.MESSAGE.CHATROOM.BASE}${Endpoints.MESSAGE.CHATROOM.ALL}`,
    );

    const router = useRouter();
    const [activeChat, setActiveChat] = React.useState<string>("-1");
    const [showAddChatModal, setShowAddChatModal] =
        React.useState<boolean>(false);

    const onChatRoomFormClose = React.useCallback(() => {
        setActiveChat("");
    }, []);

    const onChatRoomOpen = React.useCallback((name: string) => {
        setActiveChat(name);
    }, []);

    const toggleAddChatModal = React.useCallback(() => {
        setShowAddChatModal((oldValue) => !oldValue);
    }, []);

    if (allChatRoomsError !== undefined) {
        router.push("/login");
    }

    if (chatRooms === undefined || isLoading) {
        return <span />;
    }

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
            <OverlayTrigger
                overlay={(properties: OverlayInjectedProps): JSX.Element =>
                    renderTooltip(properties, { title: "Create Chat" })
                }
                placement="bottom"
            >
                <Button
                    className={styles.chat_add_button}
                    onClick={toggleAddChatModal}
                    variant="outline-primary"
                >
                    <i className="fa-solid fa-plus" />
                </Button>
            </OverlayTrigger>
            <AddChatModal
                addChatModalOnClose={toggleAddChatModal}
                showAddChatModal={showAddChatModal}
            />
        </div>
    );
};
