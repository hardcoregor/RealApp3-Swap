import { useEffect, useState } from 'react';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { DEFIProvider } from '../context/DEFIContext';
import '../styles/globals.css';
import { Navbar, Footer } from '../components';

const { chains, provider } = configureChains(
  [chain.goerli],
  [infuraProvider({
    apiKei: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  })],
);

const { connectors } = getDefaultWallets({
  appName: 'Swapper',
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

const MyApp = ({ Component, pageProps }) => (
  <DEFIProvider>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ThemeProvider attribute="class">
          <div className="dark:bg-nft-dark bg-white min-h-screen overflow-hidden">
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </div>
          <Script src="https://kit.fontawesome.com/4622253fa3.js" crossOrigin="anonymous" />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </DEFIProvider>
);

export default MyApp;