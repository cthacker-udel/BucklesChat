/* eslint-disable require-await -- disabled */
/* eslint-disable @typescript-eslint/require-await -- disabled */
/* eslint-disable import/no-nodejs-modules -- disabled */
import type { IncomingMessage } from "node:http";

import type { GetServerSideProps } from "next/types";

import { cookieKey } from "@/assets";

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
    const isLoggedIn = req.headers.cookie?.includes(cookieKey);

    if (isLoggedIn) {
        return { redirect: { destination: "/dashboard", permanent: false } };
    }

    return { props: {} };
};

export { SignUp as default } from "@/modules";
