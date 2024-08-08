"use client"

import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import type { AppProps } from "next/app";
import { WagmiProvider, createConfig, http } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { fonts } from "@/utils/font";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "bekwest",
    projectId: "a6ad1f48f6b4d2e0e97fefe606105d62",
  }
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={fonts.gabarito.className}>
      <Head>
        <title>bekwest</title>
        <meta name="description" content="where we vouch for you" />
        <link rel="icon" href="/favicon.png" sizes="any" />

        <meta property="og:title" content="bekwest" />
        <meta
          property="og:description"
          content="where we vouch for you"
        />
        <meta property="og:image" content="/favicon.png" />
      </Head>
      <ChakraProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
             theme={lightTheme({
              accentColor: "#EB3C7F",
              accentColorForeground: "white",
              borderRadius: "large",
              fontStack: "rounded",
              overlayBlur: "small",
            })}
            >
              <Layout>
                <Component {...pageProps} />
                <Analytics />
                <SpeedInsights />
              </Layout>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </main>
  );
}

export default App;
