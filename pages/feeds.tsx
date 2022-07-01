import { GetServerSideProps, NextPage } from 'next';
import Feed from '../components/Feed';
import { FeedModel } from '../model/feed';
import { prisma } from '../utils/db';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const feeds: FeedModel[] = (
    await prisma.feed.findMany({
      include: {
        _count: {
          select: {
            subFeeds: true,
          },
        },
      },
    })
  ).map((feed) => ({
    ...feed,
    userId: '',
    createdAt: feed.createdAt.toISOString(),
    updatedAt: feed.updatedAt.toISOString(),
    subFeed: feed._count.subFeeds,
  }));

  return {
    props: {
      feeds,
    },
  };
};

const FeedsPage: NextPage<{ feeds: FeedModel[] }> = (props) => {
  const { feeds } = props;
  return (
    <div className="mx-2">
      {feeds.map((feed) => (
        <Feed feed={feed} key={feed.id} />
      ))}
    </div>
  );
};

export default FeedsPage;
