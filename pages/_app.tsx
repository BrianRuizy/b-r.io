import { ReactElement, ReactNode, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import SEO from "components/seo";
import * as gtag from "lib/gtag";

import "../styles/globals.css";
import Header from "components/header";
import { NextPage } from "next";

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
      <main className="px-6 md:px-6 pt-20 pb-24 md:pb-44 max-w-[700px] mx-auto ring-offset-primary overflow-x-hidden md:overflow-x-visible">
        {page}
      </main>
    ));

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider
      attribute="class"
      value={{
        light: "light-theme",
        dark: "dark-theme",
        arc: "arc-theme",
      }}
    >

      <SEO />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="antialiased  bg-primary text-primary width-full">
        <Header />
        {getLayout(<Component {...pageProps} />)}
      </div>
      <Analytics />
    </ThemeProvider>
  );
}
