import Script from 'next/script';
import { ThemeProvider } from 'next-themes';

import { DEFIProvider } from '../context/DEFIContext';
import '../styles/globals.css';
import { Navbar, Footer } from '../components';

const MyApp = ({ Component, pageProps }) => (
  <DEFIProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen overflow-hidden">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
      <Script src="https://kit.fontawesome.com/4622253fa3.js" crossOrigin="anonymous" />
    </ThemeProvider>
  </DEFIProvider>
);

export default MyApp;
