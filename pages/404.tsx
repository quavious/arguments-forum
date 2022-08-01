import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 페이지 - ARGUMENTS</title>
      </Head>
      <div
        className="w-full flex flex-col items-start mt-4 mx-auto px-2"
        style={{ maxWidth: '50rem' }}
      >
        <h3 className="text-xl">😥</h3>
        <h1 className="text-2xl sm:text-4xl font-bold mt-2">
          여기는 아무것도 없어요
        </h1>
        <h5 className="bg-pink-900 text-white rounded-md px-2 py-1 mt-4">
          <Link href={'/'}>메인 페이지로 가기</Link>
        </h5>
      </div>
    </>
  );
};

export default NotFound;
