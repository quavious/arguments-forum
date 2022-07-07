import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
