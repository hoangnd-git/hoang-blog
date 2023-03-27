import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
