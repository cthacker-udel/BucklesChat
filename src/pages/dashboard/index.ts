/* eslint-disable @typescript-eslint/indent -- disabled */

import type { GetServerSideProps } from "next/types";

import { UserApi } from "@/@classes";

type PageProperties = {
    handle?: string;
    profilePictureUrl?: string;
    username?: string;
};

/**
 *
 * @returns The fetched server side props, which will consist of relevant information to display to the dashboard
 */
export const getServerSideProps: GetServerSideProps<
    PageProperties
> = async () => {
    const { data } = await UserApi.getUserDashboardInformation("a");
    return { props: { ...data } };
};

export { Dashboard as default } from "@/modules";
