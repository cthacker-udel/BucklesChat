/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import useSWR from "swr";

import type { Thread, ThreadMessages } from "@/@types";
import { useSocket } from "@/hooks";

type ThreadsProperties = {
    username: string;
};

/**
 * Displays all threads belonging to the user and allows them to interact with them, reply within them.
 *
 * @returns All threads belonging to the user
 */
export const Threads = ({ username }: ThreadsProperties): JSX.Element => {
    const { socket } = useSocket();
    const { data: currentThreadData } = useSWR<Thread[], Thread[], string>(
        `message/thread/getAll?username=${username}`,
    );
    const { data: threadMessages } = useSWR<
        ThreadMessages[],
        ThreadMessages[],
        string
    >(
        `message/thread/messages?threadIds=${
            currentThreadData
                ?.map((eachThreadId) => eachThreadId.id)
                .join(",") ?? ""
        }`,
    );

    return <div>{"Threads"}</div>;
};
