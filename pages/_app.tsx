import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import * as gtag from '@utils/gtag';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isChecked) {
      return;
    }
    fetch('/api/status', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(() => setIsChecked(true))
      .catch((error) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error);
        }
      });
  }, [isChecked]);
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta
          name="keyword"
          content="ARGUMENTS, 뉴스 기사, 인터넷 신문, 정치, 사회, 경제, 국제, 토론, 피드, 댓글, 익명, 논쟁, 비판, 정부, 청와대, 외교, 안보, 시민"
        />
      </Head>
      <SessionProvider session={session}>
        <Script strategy="afterInteractive" async={true} src={gtag.GA_URL} />
        <Script
          strategy="afterInteractive"
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Script
          strategy="afterInteractive"
          crossOrigin="anonymous"
          async={true}
          id="google-adsense"
          data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
