import FeedUpdate from '@components/FeedUpdate';
import { FeedModel, FeedUpdateForm } from '@models/feed';
import { prisma } from '@utils/db';
import { GetServerSideProps, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const feedId = context.params?.id;
  if (typeof feedId !== 'string') {
    return {
      redirect: {
        destination: `/feeds/${feedId}`,
        permanent: false,
      },
    };
  }
  const token = await getToken({
    req: context.req,
    secret: process.env.AUTH_SECRET,
  });
  if (!token || !token.sub) {
    return {
      redirect: {
        destination: `/feeds/${feedId}`,
        permanent: false,
      },
    };
  }
  const _feed = await prisma.feed.findFirst({
    where: {
      id: feedId,
      userId: token.sub,
      isDeleted: false,
    },
  });
  if (!_feed) {
    return {
      redirect: {
        destination: `/feeds/${feedId}`,
        permanent: false,
      },
    };
  }
  const feed: FeedModel = {
    ..._feed,
    createdAt: _feed.createdAt.toISOString(),
    updatedAt: _feed.updatedAt.toISOString(),
    userId: '',
    subFeed: 0,
  };
  return {
    props: {
      feed,
    },
  };
};

export interface FeedEditPageProps {
  feed: FeedModel;
}

const FeedEditPage: NextPage<FeedEditPageProps> = (props) => {
  const { feed } = props;
  const [text, setText] = useState(feed.content);
  const router = useRouter();
  return (
    <div className="mt-4 mx-2">
      <FeedUpdate
        id={feed.id}
        text={text}
        onTextChange={(value) => setText(value)}
        onTextSubmit={async (feedId, value) => {
          if (value.length < 1) {
            return;
          }
          const form: FeedUpdateForm = {
            content: value,
          };
          try {
            await fetch(`/api/feeds/${feedId}`, {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(form),
              credentials: 'include',
            });
            router.push(`/feeds/${feedId}`);
          } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
              console.error(error);
            }
            await router.push('/feeds');
          }
        }}
      />
    </div>
  );
};

export default FeedEditPage;
