import Navbar from "@/components/Navbar";
import theme from "@/lib/mui/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </ThemeProvider>
  );
}
