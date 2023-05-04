/* eslint-disable import/no-nodejs-modules -- disabled */

import type { IncomingMessage } from "node:http";

import type { GetServerSideProps } from "next/types";

import { UserApi } from "@/@classes";
import { cookieKey } from "@/assets";

type PageProperties = {
    numberOfUsersOnline?: number;
    numberOfUsers?: number;
};

type GetServerSideProperties = {
    req: IncomingMessage;
};

/**
 *
 * @returns
 */
export const getServerSideProps: GetServerSideProps<PageProperties> = async ({
    req,
}: GetServerSideProperties) => {
    const { data: numberOfUsersOnline } = await UserApi.usersOnline();
    const { data: numberOfUsers } = await UserApi.totalUsers();
    const isLoggedIn = req.headers.cookie?.includes(cookieKey);

    if (isLoggedIn) {
        return { redirect: { destination: "/dashboard", permanent: false } };
    }

    return { props: { numberOfUsers, numberOfUsersOnline } };
};

export { Login as default } from "@/modules";
