import Head from "next/head";
import React from "react";

import { LoggerProvider } from "@/providers";

import { HomePage } from "../modules/HomePage";

/**
 * The index page of the application, when the user starts up the website, it loads this page
 * initially
 *
 * @returns The home page
 */
const Home = (): JSX.Element => (
    <>
        <Head>
            <title>{"Buckles Chat"}</title>
            <meta
                content="Chatting app for everyone to talk about everything buckles related"
                name="description"
            />
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <link href="/icon.ico" rel="icon" />
        </Head>
        <LoggerProvider>
            <HomePage />
        </LoggerProvider>
    </>
);

export { Home as default };
