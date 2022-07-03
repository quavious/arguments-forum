import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import FeedMain from '@components/FeedMain';
import SubFeedCreate from '@components/SubFeedCreate';
import { FeedModel, SubFeedModel } from '@models/feed';
import { prisma } from '@utils/db';
import SubFeed from '@components/SubFeed';
import { useRouter } from 'next/router';

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
    <div className="mt-2 mx-2">
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
            const response = await fetch(`/api/feeds/${feed.id}/subfeeds`, {
              method: 'POST',
              body: JSON.stringify(subFeedForm),
              headers: {
                'content-type': 'application/json',
              },
              credentials: 'include',
            });
            const data = await response.json();
            setSubFeedContent('');
            const newSubFeed: SubFeedModel = data.subFeed;
            setNewSubFeeds((current) => current.concat(newSubFeed));
          }}
        />
      )}
      <>
        {newSubFeeds.map((subFeed) => (
          <SubFeed key={subFeed.id} subFeed={subFeed} isCreatedNow={true} />
        ))}
      </>
      <>
        {subFeeds.map((subFeed) => (
          <SubFeed key={subFeed.id} subFeed={subFeed} />
        ))}
      </>
    </div>
  );
};

export default FeedPage;
