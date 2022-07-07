import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Feed from '@components/Feed';
import { FeedModel } from '@models/feed';
import Head from 'next/head';
import { Virtuoso } from 'react-virtuoso';

const FeedsPage: NextPage = () => {
  const [feeds, setFeeds] = useState<FeedModel[]>([]);
  const [page, setPage] = useState(1);
  const fetchFeeds = useCallback(async () => {
    if (!page) {
      return;
    }
    const response = await fetch(`/api/feeds?page=${page}`);
    const data: { feeds: FeedModel[] } = await response.json();
    setFeeds((current) => current.concat(data.feeds));
  }, [page]);
  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);
  return (
    <div className="mx-2 mt-2 h-full">
      <Head>
        <title>최신 피드 - ARGUMENTS</title>
        <meta name="title" content={'ARGUMENTS 최신 피드'} />
        <meta name="og:title" content={'ARGUMENTS 최신 피드'} />
        <meta name="description" content="ARGUMENTS 최신 피드 페이지." />
        <meta name="og:description" content="ARGUMENTS 최신 피드 페이지." />
        <meta name="url" content={process.env.NEXT_PUBLIC_URL + '/feeds'} />
        <meta name="og:url" content={process.env.NEXT_PUBLIC_URL + '/feeds'} />
      </Head>
      <Virtuoso
        itemContent={(index) => (
          <Feed feed={feeds[index]} key={feeds[index].id} />
        )}
        totalCount={feeds.length}
        style={{ height: '100%' }}
        className="no-scroll"
        endReached={() => {
          setPage((page) => page + 1);
        }}
        components={{
          Footer: () => {
            return (
              <div
                className="flex justify-center items-center h-16 mx-auto w-full p-2 bg-gray-100"
                style={{ maxWidth: '50rem' }}
              >
                <h4 className="font-medium">피드를 더 불러오고 있습니다...</h4>
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default FeedsPage;
