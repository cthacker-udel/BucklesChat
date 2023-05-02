/* eslint-disable @next/next/no-page-custom-font -- disabled */
import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

import { Loading } from "@/modules";

/**
 * Only rendered on the server, updates the html and body tags used to render a page.
 *
 * @returns The document component
 */
const Document = (): JSX.Element => (
    <Html lang="en">
        <Head>
            <link href="https://fonts.googleapis.com" rel="preconnect" />
            <link
                crossOrigin=""
                href="https://fonts.gstatic.com"
                rel="preconnect"
            />
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
                rel="stylesheet"
            />
            <link
                crossOrigin="anonymous"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
                integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@500&family=Golos+Text&family=Oswald:wght@300&family=Radio+Canada&family=Zeyada&display=swap"
                rel="stylesheet"
            />
        </Head>
        <body>
            <Loading />
            <Main />
            <NextScript />
        </body>
    </Html>
);

export { Document as default };
