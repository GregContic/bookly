import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SolitoAppProvider } from '../../../shared/providers/SolitoProvider';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BooklyPH</title>
        <meta name="description" content="Your one-stop booking platform for services in the Philippines" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SolitoAppProvider>
        <Component {...pageProps} />
      </SolitoAppProvider>
    </>
  );
}
