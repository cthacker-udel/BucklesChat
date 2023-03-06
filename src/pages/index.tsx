import Head from "next/head";
import React from "react";

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
                content="Chatting app for everyone to talk about everything buckles related."
                name="description"
            />
            <meta
                content="https://i.pinimg.com/736x/85/e0/5d/85e05d7acff2d8e11bb22f1fb869226e.jpg"
                property="og:image"
            />
            <meta
                content="Buckles Chat - Meow with your friends"
                property="og:title"
            />
            <meta
                content="Chatting application where you can have a blast talking about black cats! Talk about buckles, or send funny shrek gifs to each-other, whichever floats your boat! We are not sponsored by Burger King."
                property="og:description"
            />
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <link href="/icon.ico" rel="icon" />
        </Head>
        <HomePage />
    </>
);

export { Home as default };
