import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
