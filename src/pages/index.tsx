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
            <meta content="summary_large_image" name="twitter:card" />
            <meta content="#FF0000" name="theme-color" />
            <meta content="website" property="og:type" />
            <meta
                content="https://buckles-chat.vercel.app/"
                property="og:url"
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
                content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
                property="og:image"
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
