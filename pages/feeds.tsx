import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Feed from '@components/Feed';
import { FeedModel } from '@models/feed';

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
    <div className="mx-2 mt-2">
      {feeds.map((feed) => (
        <Feed feed={feed} key={feed.id} />
      ))}
    </div>
  );
};

export default FeedsPage;
