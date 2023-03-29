import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import GoogleAnalytics from '../components/GoogleAnalytics';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <Head>
          <title>Hoang&apos;s Blog</title>
          <meta name="description" content="Welcome to my blog" />
          <meta property="og:title" content="Hoang's Blog" />
          <meta property="og:description" content="Welcome to my blog" />
          <link rel="icon" href="/favicon.png" />
        </Head>
      </div>
      <div>
        {process.env.NEXT_PUBLIC_G_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_G_ID} />
        ) : null}
      </div>
      <div className="container">
        <div className="logo-container">
          <Link href="/" className="logo pointer">
            <div className="logo-image">
              <Image src="/logo.png" alt="logo" width={150} height={150}></Image>
            </div>
            <div className="logo-name">
              <span className="highlight-name">{"Hoang's"}</span> Blog
            </div>
          </Link>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
