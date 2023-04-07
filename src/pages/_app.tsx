/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import React from "react";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr/_internal";

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
const App = ({ Component, pageProps }: AppProps): JSX.Element => (
    <>
        <SWRConfig
            value={{
                fetcher: async (resource: string, _init: any): Promise<any> => {
                    const result = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}api/${resource}`,
                    );
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

export { App as default };
