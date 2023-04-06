/* eslint-disable @typescript-eslint/indent -- disabled */

import type { GetServerSideProps } from "next/types";

import { UserApi } from "@/@classes";

type PageProperties = {
    numberOfUsersOnline?: number;
    numberOfUsers?: number;
};

/**
 *
 * @returns
 */
export const getServerSideProps: GetServerSideProps<
    PageProperties
> = async () => {
    const { data: numberOfUsersOnline } = await UserApi.usersOnline();
    const { data: numberOfUsers } = await UserApi.totalUsers();

    return { props: { numberOfUsers, numberOfUsersOnline } };
};

export { Login as default } from "@/modules";
