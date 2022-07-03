import { GetStaticProps, NextPage } from 'next';
import Navbar from '@components/Navbar';
import { NewsItem } from '@components/News';
import { NewsModel } from '@models/news';
import { FeedCreateForm } from '@models/feed';
import { getNewsData } from '@utils/news';
import { useRouter } from 'next/router';

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
      <Navbar />
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
      </main>
    </div>
  );
};

export default Index;
