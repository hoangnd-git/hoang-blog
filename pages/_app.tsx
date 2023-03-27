import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <Head>
          <title>Jacky's Blog</title>
          <meta name="description" content="Welcome to my blog" />
          <meta property="og:title" content="Jacky's Blog" />
          <meta property="og:description" content="Welcome to my blog" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
      </div>
      <div className="container">
        <div className="header">
          <Link href="/" className="logo pointer">
            <div className="logo-image">
              <img src="/logo.svg"></img>
            </div>
            <div className="logo-name">
              <span className="highlight-name">Jacky</span> Nguyen
            </div>
          </Link>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
