import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import FeedCreate from '../components/FeedCreate';
import Navbar from '../components/Navbar';
import { NewsItem } from '../components/News';
import { NewsModel } from '../model/news';
import { getNewsData } from '../utils/news';

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
  return (
    <div>
      <Navbar />
      <main className="mx-2 pb-4">
        {news.map((item, index) => (
          <NewsItem key={item.id} news={item} index={index} />
        ))}
      </main>
    </div>
  );
};

export default Index;
