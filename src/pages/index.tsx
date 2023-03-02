import React from "react";
import Head from "next/head";
import { HomePage } from "../modules/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>{"Buckles Chat"}</title>
        <meta
          name="description"
          content="Chatting app for everyone to talk about everything buckles related"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <HomePage />
    </>
  );
}
