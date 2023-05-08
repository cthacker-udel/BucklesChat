/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import React from "react";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr/_internal";

import { UserService } from "@/@classes";
import type { ApiResponse } from "@/@types";
import { LoggerProvider } from "@/providers";

import { Layout } from "../common";

/**
 * Used to initialize pages, control the page initialization and persist layouts between page
 * changes. Keeping state when navigating pages, and injecting additional data into pages, and also adding global css.
 *
 * @param props - The props injected into the app component
 * @param props.Component - The component we are rendering
 * @param props.pageProps - The page props we are passing into the component
 * @returns The app component
 */
const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    /**
     * Refreshes the user state when the document is focused (aka the user clicks back on it)
     */
    const refreshStateOnFocus = React.useCallback(async () => {
        await UserService.refreshState();
    }, []);

    React.useEffect(() => {
        document.addEventListener("focus", refreshStateOnFocus);

        return () => {
            document.removeEventListener("focus", refreshStateOnFocus);
        };
    }, [refreshStateOnFocus]);

    return (
        <>
            <SWRConfig
                value={{
                    fetcher: async (
                        resource: string,
                        _init: any,
                    ): Promise<any> => {
                        const result = await fetch(
                            `${process.env.NEXT_PUBLIC_BASE_URL}api/${resource}`,
                        );

                        if (result.status === 401) {
                            throw new Error("Invalid user");
                        }

                        const convertedResult =
                            (await result.json()) as ApiResponse;
                        const { data } = convertedResult;
                        return data;
                    },
                    provider: () => new Map(),
                    refreshInterval: 3000,
                }}
            >
                <LoggerProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </LoggerProvider>
            </SWRConfig>
            <ToastContainer
                autoClose={5000}
                closeOnClick
                draggable
                hideProgressBar={false}
                newestOnTop={false}
                pauseOnHover
                position="top-right"
                rtl={false}
                theme="light"
            />
        </>
    );
};

export { App as default };
