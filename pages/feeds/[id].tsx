import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import FeedMain from '@components/FeedMain';
import SubFeedCreate from '@components/SubFeedCreate';
import { FeedModel, SubFeedModel } from '@models/feed';
import { prisma } from '@utils/db';
import SubFeed from '@components/SubFeed';
import { useRouter } from 'next/router';
import { Virtuoso } from 'react-virtuoso';

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
  const [newSubFeeds, setNewSubFeeds] = useState<SubFeedModel[]>([]);
  const [subFeedContent, setSubFeedContent] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();
  const fetchSubFeeds = useCallback(async () => {
    const response = await fetch(`/api/feeds/${feed.id}/subfeeds?page=${page}`);
    const data: { subFeeds: SubFeedModel[] } = await response.json();
    setSubFeeds((current) => current.concat(data.subFeeds));
  }, [feed.id, page]);
  useEffect(() => {
    fetchSubFeeds();
  }, [fetchSubFeeds]);
  return (
    <div className="mt-2 mx-2 h-full">
      <>
        <Virtuoso
          itemContent={(index) => {
            if (index === 0) {
              return (
                <>
                  <FeedMain
                    feed={feed}
                    onDeleteClick={async (feedId) => {
                      await fetch(`/api/feeds/${feedId}`, {
                        method: 'DELETE',
                        credentials: 'include',
                      });
                      await router.push('/feeds');
                    }}
                  />
                  {status === 'authenticated' && (
                    <SubFeedCreate
                      content={subFeedContent}
                      onContentChange={(value) => setSubFeedContent(value)}
                      onContentSubmit={async (value) => {
                        if (!session || !session.user) {
                          return;
                        }
                        const subFeedForm = {
                          content: value,
                          feedId: feed.id,
                        };
                        const response = await fetch(
                          `/api/feeds/${feed.id}/subfeeds`,
                          {
                            method: 'POST',
                            body: JSON.stringify(subFeedForm),
                            headers: {
                              'content-type': 'application/json',
                            },
                            credentials: 'include',
                          },
                        );
                        const data = await response.json();
                        setSubFeedContent('');
                        const newSubFeed: SubFeedModel = data.subFeed;
                        setNewSubFeeds((current) => current.concat(newSubFeed));
                      }}
                    />
                  )}
                  {newSubFeeds.map((subFeed) => (
                    <SubFeed
                      key={subFeed.id}
                      subFeed={subFeed}
                      isCreatedNow={true}
                    />
                  ))}
                </>
              );
            } else {
              return (
                <SubFeed
                  key={subFeeds[index - 1].id}
                  subFeed={subFeeds[index - 1]}
                />
              );
            }
          }}
          totalCount={subFeeds.length + 1}
          className="no-scroll h-full"
          endReached={() => setPage((page) => page + 1)}
          components={{
            Footer: () => {
              return (
                <div
                  className="flex justify-center items-center h-16 mx-auto w-full p-2 bg-gray-100"
                  style={{ maxWidth: '50rem' }}
                >
                  <h4 className="font-medium">
                    서브피드를 더 불러오고 있습니다...
                  </h4>
                </div>
              );
            },
          }}
        />
      </>
    </div>
  );
};

export default FeedPage;
