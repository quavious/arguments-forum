import { GetServerSideProps, NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import FeedComponent from '../../components/FeedComponent';
import { FeedModel, SubFeedModel } from '../../model/feed';
import { prisma } from '../../utils/db';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (typeof id !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const response = await prisma.feed.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      _count: {
        select: {
          subFeeds: true,
        },
      },
    },
  });
  if (!response) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const feed: FeedModel = {
    ...response,
    createdAt: response.createdAt.toISOString(),
    updatedAt: response.updatedAt.toISOString(),
    subFeed: response._count.subFeeds,
    userId: '',
  };

  return {
    props: { feed },
  };
};

const FeedPage: NextPage<{ feed: FeedModel }> = (props) => {
  const { feed } = props;
  const [page, setPage] = useState(1);
  const [subFeeds, setSubFeeds] = useState<SubFeedModel[]>([]);
  const fetchSubFeeds = useCallback(async () => {
    const response = await fetch(`/api/feeds/${feed.id}/subfeeds?page=${page}`);
    const data: { subFeeds: SubFeedModel[] } = await response.json();
    setSubFeeds((current) => current.concat(data.subFeeds));
  }, [feed.id, page]);
  useEffect(() => {
    fetchSubFeeds();
  }, [fetchSubFeeds]);
  return (
    <div className="mt-2 mx-2">
      <FeedComponent feed={feed} />
    </div>
  );
};

export default FeedPage;
