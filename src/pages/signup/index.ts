/* eslint-disable import/no-nodejs-modules -- disabled */
import type { IncomingMessage } from "node:http";

import type { GetServerSideProps } from "next/types";

import { UserApi } from "@/@classes";

type PageProperties = object;

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
    const { data } = await UserApi.ssGetUserDashboardInformation(req.headers);

    if (data !== undefined) {
        return { redirect: { destination: "/dashboard", permanent: false } };
    }

    return { props: {} };
};

export { SignUp as default } from "@/modules";
