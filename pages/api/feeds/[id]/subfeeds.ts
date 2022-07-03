import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';
import { SubFeedCreateForm, SubFeedModel } from '@models/feed';
import { prisma } from '@utils/db';
import { buildFakeUsername } from '@utils/username';

const handler: NextApiHandler = async (req, res) => {
  const feedId = req.query.id;
  const method = req.method?.toUpperCase() ?? '';
  switch (method) {
    case 'GET':
      const _page = req.query.page;
      if (typeof feedId !== 'string' || typeof _page !== 'string') {
        return res.status(404).json({
          message: 'Url parameters are not valid',
        });
      }
      let page = parseInt(_page);
      if (!page || page < 1) {
        page = 1;
      }
      const subFeeds: SubFeedModel[] = (
        await prisma.subFeed.findMany({
          skip: (page - 1) * 20,
          take: 20,
          where: {
            isDeleted: false,
            feedId,
          },
          orderBy: {
            createdAt: 'asc',
          },
        })
      ).map((subFeed) => ({
        ...subFeed,
        createdAt: subFeed.createdAt.toISOString(),
        updatedAt: subFeed.updatedAt.toISOString(),
        userId: '',
      }));
      res.status(200).json({
        subFeeds,
      });
      break;
    case 'POST':
      const token = await getToken({ req, secret: process.env.AUTH_SECRET });
      if (!token || !token.sub) {
        return res.status(403).json({
          message: 'You are not unauthorized.',
        });
      }
      const body: SubFeedCreateForm = req.body;
      const response = await prisma.subFeed.create({
        data: {
          content: body.content,
          feedId: body.feedId,
          userId: token.sub,
          fakeUsername: buildFakeUsername(),
        },
      });
      const newSubFeed: SubFeedModel = {
        ...response,
        createdAt: response.createdAt.toISOString(),
        updatedAt: response.updatedAt.toISOString(),
        userId: '',
      };
      res.status(201).json({
        subFeed: newSubFeed,
      });
      break;
    default:
      res.status(405).json({
        message: 'Methods are not allowed.',
      });
      break;
  }
};

export default handler;
