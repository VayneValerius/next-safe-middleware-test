import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const nonce = pageProps.nonce;

  if (nonce) {
    console.log('Injected Nonce', { nonce });
  }

  return <Component {...pageProps} />;
}

export default MyApp;
