/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { Accordion } from "react-bootstrap";
import useSWR from "swr";

import type { DirectMessage, ThreadMessages } from "@/@types";
import { useSocket } from "@/hooks";

import { ThreadMessage } from "./ThreadMessage";
import { ThreadReply } from "./ThreadReply";
import styles from "./Threads.module.css";
import { ThreadToggle } from "./ThreadToggle";

type ThreadsProperties = {
    username: string;
    usernameProfilePictureUrl?: string;
};

/**
 * Displays all threads belonging to the user and allows them to interact with them, reply within them.
 *
 * @returns All threads belonging to the user
 */
export const Threads = ({
    username,
    usernameProfilePictureUrl,
}: ThreadsProperties): JSX.Element => {
    const { socket } = useSocket();
    const { data: allThreadsMessages } = useSWR<
        ThreadMessages[],
        ThreadMessages[],
        string
    >(`message/thread/getAll/messages?username=${username}`);

    return (
        <div className={styles.threads_container}>
            {allThreadsMessages?.map((eachThreadMessage: ThreadMessages) => {
                const { messages, threadId } = eachThreadMessage;
                return (
                    <div className={styles.thread} key={`thread_${threadId}`}>
                        <Accordion
                            className={styles.thread_user}
                            defaultActiveKey="-1"
                        >
                            <ThreadToggle eventKey="0" {...eachThreadMessage} />
                            <Accordion.Collapse eventKey="0">
                                <div className={styles.thread_messages}>
                                    {messages.map(
                                        (
                                            eachDirectMessage: DirectMessage,
                                            eachDirectMessageIndex: number,
                                        ) => (
                                            <ThreadMessage
                                                key={`message_${eachDirectMessage.id}`}
                                                left={
                                                    eachDirectMessageIndex %
                                                        2 ===
                                                    0
                                                }
                                                {...eachDirectMessage}
                                            />
                                        ),
                                    )}
                                    <ThreadReply
                                        left={messages.length % 2 === 0}
                                        username={username}
                                        usernameProfilePictureUrl={
                                            usernameProfilePictureUrl
                                        }
                                    />
                                </div>
                            </Accordion.Collapse>
                        </Accordion>
                    </div>
                );
            })}
        </div>
    );
};
