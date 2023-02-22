import "@total-typescript/ts-reset"

import Navbar from "@/components/ui/Navbar";
import Overlay from "@/components/ui/Overlay";
import theme from "@/lib/mui/theme";
import { trpc } from "@/utils/trpc";
import { ThemeProvider } from "@mui/material";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import Head from "next/head";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <title>giga-retard</title>
      </Head>
      <Navbar />
      {children}
      <Overlay />
    </>
  );
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(App);
