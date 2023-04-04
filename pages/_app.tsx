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
          <meta name="description" content="Một chiếc blog nho nhỏ" />
          <meta property="og:image" content="/favicon.png" />
          <meta property="og:title" content="Hoang's Blog" />
          <meta property="og:description" content="Một chiếc blog nho nhỏ" />
          <meta name="keywords" content="nguyenhoang, blog, it"></meta>
          <meta name="author" content="Hoang Nguyen"></meta>
          <meta name="google-site-verification" content="2sv7utYTeZ0DN0LfK10EIjz-paQ_f4mP84RWLmQqjs0" />
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
