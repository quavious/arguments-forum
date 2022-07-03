import { FeedModel } from '@models/feed';
import { prisma } from '@utils/db';
import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';

const handler: NextApiHandler = async (req, res) => {
  const method = req.method?.toUpperCase() ?? '';
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  switch (method) {
    case 'GET':
      if (!token || !token.sub) {
        res.status(403).json({
          message: 'You are not authenticated.',
        });
        return;
      }
      let _page = req.query.page;
      if (typeof _page !== 'string') {
        _page = '1';
      }
      let page = parseInt(_page) || 1;
      if (page < 1) {
        page = 1;
      }
      const feeds: FeedModel[] = (
        await prisma.feed.findMany({
          take: 20,
          skip: (page - 1) * 20,
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            isDeleted: false,
          },
          include: {
            _count: {
              select: { subFeeds: true },
            },
          },
        })
      ).map((feed) => ({
        ...feed,
        subFeed: feed._count.subFeeds,
        createdAt: feed.createdAt.toISOString(),
        updatedAt: feed.updatedAt.toISOString(),
        userId: '',
      }));
      res.status(200).json({
        feeds,
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
