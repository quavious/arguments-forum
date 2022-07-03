import Feed from '@components/Feed';
import { FeedModel } from '@models/feed';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import User, { UserProps } from '../components/User';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

const UserPage: NextPage<{ user: UserProps }> = (props) => {
  const { user } = props;
  const [feeds, setFeeds] = useState<FeedModel[]>([]);
  const [page, setPage] = useState(1);
  const fetchFeeds = useCallback(async () => {
    if (!page) {
      return;
    }
    const response = await fetch(`/api/feeds/user?page=${page}`);
    const data: { feeds: FeedModel[] } = await response.json();
    setFeeds((current) => current.concat(data.feeds));
  }, [page]);
  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);
  return (
    <div className="mt-2 mx-2">
      <User name={user?.name} email={user?.email} />
      {feeds.map((feed) => (
        <Feed feed={feed} key={feed.id} />
      ))}
    </div>
  );
};

export default UserPage;
