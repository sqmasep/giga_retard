import Navbar from "@/components/Navbar";
import theme from "@/lib/mui/theme";
import { trpc } from "@/utils/trpc";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const App: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(App);
