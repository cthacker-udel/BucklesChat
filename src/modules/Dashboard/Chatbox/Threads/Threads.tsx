/* eslint-disable @typescript-eslint/indent -- disabled */
import React from "react";
import useSWR from "swr";

import { ApiResponse, Thread, ThreadMessages } from "@/@types";
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
    const { data: allThreadsMessages } = useSWR<
        ApiResponse<ThreadMessages[]>,
        ApiResponse<ThreadMessages[]>,
        string
    >(`message/thread/getAll/messages?username=${username}`);

    return <div>{"Threads"}</div>;
};
