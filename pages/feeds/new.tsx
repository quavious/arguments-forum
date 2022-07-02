import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Feed from '../../components/Feed';
import { FeedModel } from '../../model/feed';
import { prisma } from '../../utils/db';

export const getStaticProps: GetStaticProps = async (context) => {
  const feeds: FeedModel[] = (
    await prisma.feed.findMany({
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        isDeleted: false,
      },
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
    subFeed: feed._count.subFeeds,
    userId: '',
    createdAt: feed.createdAt.toISOString(),
    updatedAt: feed.updatedAt.toISOString(),
  }));
  return {
    props: {
      feeds,
    },
    revalidate: 60,
  };
};

const FeedsNewPage: NextPage<{ feeds: FeedModel[] }> = (props) => {
  const { feeds } = props;
  return (
    <div className="mx-2 mt-2">
      <div
        className="flex items-end w-full mx-auto px-2"
        style={{ maxWidth: '50rem' }}
      >
        <h1 className="inline-flex font-bold text-xl sm:text-2xl">최신 피드</h1>
        <h5 className="text-gray-600 ml-2 whitespace-nowrap font-semibold">
          <Link href={'/feeds'}>더 보기</Link>
        </h5>
      </div>
      {feeds.map((feed) => (
        <Feed feed={feed} key={feed.id} />
      ))}
    </div>
  );
};

export default FeedsNewPage;
