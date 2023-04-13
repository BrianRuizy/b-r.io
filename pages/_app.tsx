import { ReactElement, ReactNode, useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import "../styles/globals.css";
import SEO from "components/seo";
import Header from "components/header";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout): JSX.Element {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <main className="px-6 md:px-6 pt-16 pb-24 md:pt-20 md:pb-44 max-w-[700px] mx-auto ring-offset-primary ">
        {page}
      </main>
    ));

  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      value={{
        light: "light-theme",
        dark: "dark-theme",
      }}
    >
      <SEO />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="antialiased bg-primary text-primary width-full">
        <Header />
        {getLayout(<Component {...pageProps} />)}
      </div>
      <Analytics />
    </ThemeProvider>
  );
}
