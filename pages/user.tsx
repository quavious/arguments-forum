import Feed from '@components/Feed';
import { FeedModel } from '@models/feed';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
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
    <div className="mt-2 mx-2 h-full">
      <Virtuoso
        itemContent={(index) => {
          if (index === 0) {
            return <User name={user?.name} email={user?.email} />;
          } else {
            return <Feed feed={feeds[index - 1]} key={feeds[index - 1].id} />;
          }
        }}
        totalCount={feeds.length + 1}
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

export default UserPage;
