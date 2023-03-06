import "@/styles/globals.css";

import type { AppProps } from "next/app";
import React from "react";

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
    <LoggerProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </LoggerProvider>
);

export { App as default };
