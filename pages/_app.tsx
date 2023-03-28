import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <Head>
          <title>Hoang&apos;s Blog</title>
          <meta name="description" content="Welcome to my blog" />
          <meta property="og:title" content="Hoang's Blog" />
          <meta property="og:description" content="Welcome to my blog" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
      </div>
      <div className='ga'>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_ID}`}
        />
            
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                    window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${process.env.NEXT_PUBLIC_G_ID}');
        `,
          }}
        />
      </div>
      <div className="container">
        <div className="header">
          <Link href="/" className="logo pointer">
            <div className="logo-image">
              <Image src="/logo.svg" alt="logo" width={44} height={44}></Image>
            </div>
            <div className="logo-name">
              <span className="highlight-name">Hoang's</span> Blog
            </div>
          </Link>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
