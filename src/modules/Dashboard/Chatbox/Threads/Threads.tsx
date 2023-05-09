/* eslint-disable @typescript-eslint/no-floating-promises -- disabled */
import { useRouter } from "next/router";
import React from "react";
import { Accordion } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import useSWR from "swr";

import type { DirectMessage, ThreadMessages } from "@/@types";
import { Endpoints } from "@/assets";

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
    const {
        data: allThreadsMessages,
        mutate,
        error,
        isLoading,
    } = useSWR<ThreadMessages[], Error, string>(
        `${Endpoints.MESSAGE.THREAD.BASE}${Endpoints.MESSAGE.THREAD.ALL_MESSAGES}`,
    );

    const router = useRouter();

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
                await mutate(modifiedMessages, {
                    optimisticData: modifiedMessages,
                    revalidate: false,
                });
            }
        },
        [allThreadsMessages, mutate],
    );

    if (error !== undefined) {
        router.push("/login");
    }

    if (allThreadsMessages === undefined || isLoading) {
        return <ClipLoader color="blue" />;
    }

    if (allThreadsMessages.length === 0) {
        return (
            <div className={styles.no_threads_container}>
                <div className={styles.no_threads_content}>
                    <span className={styles.no_threads_title}>
                        {"It's empty in here..."}
                    </span>
                    <span className={styles.no_threads_subtitle}>
                        {"Message someone!"}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.threads_container}>
            {allThreadsMessages?.map(
                (
                    eachThreadMessage: ThreadMessages,
                    eachThreadIndex: number,
                ) => {
                    const { creator, messages, receiver, threadId } =
                        eachThreadMessage;
                    return (
                        <div
                            className={styles.thread}
                            key={`thread_${threadId}`}
                        >
                            <Accordion
                                className={styles.thread_user}
                                defaultActiveKey="-1"
                            >
                                <ThreadToggle
                                    eventKey={`${eachThreadIndex}`}
                                    sender={username}
                                    {...eachThreadMessage}
                                />
                                <Accordion.Collapse
                                    className={styles.thread_collapse}
                                    eventKey={`${eachThreadIndex}`}
                                >
                                    <div className={styles.thread_messages}>
                                        {messages.map(
                                            (
                                                eachDirectMessage: DirectMessage,
                                                eachDirectMessageIndex: number,
                                            ) => (
                                                <ThreadMessage
                                                    key={`message_${eachDirectMessage.thread}_${eachDirectMessage.threadOrder}`}
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
                },
            )}
        </div>
    );
};
