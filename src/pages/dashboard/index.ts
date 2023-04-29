/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable import/no-nodejs-modules -- disabled */
import type { IncomingMessage } from "node:http";

import type { GetServerSideProps } from "next/types";

import { UserApi } from "@/@classes";

type PageProperties = {
    username?: string;
};

type GetServerSideProperties = {
    req: IncomingMessage;
};

/**
 *
 * @returns The fetched server side props, which will consist of relevant information to display to the dashboard
 */
export const getServerSideProps: GetServerSideProps<PageProperties> = async ({
    req,
}: GetServerSideProperties) => {
    const { data } = await UserApi.ssGetUserDashboardInformation(req.headers);

    if (data === undefined) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            username: data.username === undefined ? "" : data.username,
        },
    };
};

export { Dashboard as default } from "@/modules";
