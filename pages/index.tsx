import { GetStaticProps, NextPage } from 'next';
import { NewsItem } from '@components/News';
import { NewsModel } from '@models/news';
import { FeedCreateForm } from '@models/feed';
import { getNewsData } from '@utils/news';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
  const news = await getNewsData();
  return {
    props: {
      news,
    },
    revalidate: 60 * 10,
  };
};

const Index: NextPage<{ news: NewsModel[] }> = (props) => {
  const { news } = props;
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>ARGUMENTS</title>
        <meta name="title" content={'ARGUMENTS 메인 페이지'} />
        <meta name="og:title" content={'ARGUMENTS 메인 페이지'} />
        <meta
          name="description"
          content="ARGUMENTS 최신 정치, 사회, 국제, 경제 뉴스 목록입니다."
        />
        <meta
          name="og:description"
          content="ARGUMENTS 최신 정치, 사회, 국제, 경제 뉴스 목록입니다."
        />
        <meta name="url" content={process.env.NEXT_PUBLIC_URL} />
        <meta name="og:url" content={process.env.NEXT_PUBLIC_URL} />
      </Head>
      <main className="mx-2 mt-2 pb-4">
        {news.map((item, index) => (
          <NewsItem
            key={item.id}
            news={item}
            index={index}
            onFormSubmit={async (index, text) => {
              try {
                const form: FeedCreateForm = {
                  content: text,
                  newsTitle: news[index].title,
                  newsLink: news[index].link,
                };
                await fetch('/api/feeds', {
                  method: 'POST',
                  body: JSON.stringify(form),
                  headers: {
                    'content-type': 'application/json',
                  },
                  credentials: 'include',
                });
                await router.push('/feeds/new');
              } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                  console.error(error);
                }
                alert('피드 업로드 실패');
              }
            }}
          />
        ))}
        <div className="h-8 w-full"></div>
      </main>
    </div>
  );
};

export default Index;
