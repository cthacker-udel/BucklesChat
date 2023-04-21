/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import { Accordion } from "react-bootstrap";
import useSWR from "swr";

import type { DirectMessage, ThreadMessages } from "@/@types";

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
    const { data: allThreadsMessages, mutate } = useSWR<
        ThreadMessages[],
        ThreadMessages[],
        string
    >(`message/thread/getAll/messages?username=${username}`);

    const addMessage = React.useCallback(
        async (threadId: number, message: DirectMessage) => {
            if (allThreadsMessages !== undefined) {
                const modifiedMessages = allThreadsMessages.map(
                    (eachThreadMessages: ThreadMessages) => {
                        if (eachThreadMessages.threadId === threadId) {
                            return {
                                ...eachThreadMessages,
                                messages: [
                                    ...eachThreadMessages.messages,
                                    message,
                                ],
                            };
                        }
                        return { ...eachThreadMessages };
                    },
                );
                await mutate(modifiedMessages);
            }
        },
        [allThreadsMessages, mutate],
    );

    return (
        <div className={styles.threads_container}>
            {allThreadsMessages?.map((eachThreadMessage: ThreadMessages) => {
                const { creator, messages, receiver, threadId } =
                    eachThreadMessage;
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
                                        addMessage={addMessage}
                                        left={messages.length % 2 === 0}
                                        receiver={
                                            creator === username
                                                ? receiver
                                                : creator
                                        }
                                        sender={username}
                                        senderProfilePictureUrl={
                                            usernameProfilePictureUrl
                                        }
                                        threadId={threadId}
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