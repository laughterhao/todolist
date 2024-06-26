import Head from "next/head";
import Content from "./content";

export default function Home() {
  return (
    <>
      <Head>
        <title>練功紀錄</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/gamepad-solid.svg" />
      </Head>
      <main>
      <Content/>
      </main>
    </>
  );
}
