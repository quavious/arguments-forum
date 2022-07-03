import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';
import { FeedCreateForm, FeedModel } from '@models/feed';
import { prisma } from '@utils/db';
import { buildFakeUsername } from '@utils/username';

const feeds: NextApiHandler = async (req, res) => {
  const method = req.method?.toUpperCase();
  switch (method) {
    case 'POST':
      const token = await getToken({ req, secret: process.env.AUTH_SECRET });
      if (!token || !token.sub) {
        return res.status(403).json({
          message: 'Unauthenticated',
        });
      }
      const body: FeedCreateForm = req.body;
      const created = await prisma.feed.create({
        data: {
          content: body.content,
          newsTitle: body.newsTitle,
          newsLink: body.newsLink,
          userId: token.sub,
          fakeUsername: buildFakeUsername(),
        },
      });
      if (!created) {
        res.status(400).json({
          message: 'Check feed form.',
        });
      } else {
        res.status(201).json({
          message: 'New feed created.',
          feed: created,
        });
      }
      break;
    case 'GET':
      let _page = req.query.page;
      let page: number;
      if (typeof _page !== 'string') {
        page = 1;
      } else {
        page = parseInt(_page) || 1;
      }
      const response = await prisma.feed.findMany({
        take: 20,
        skip: (page - 1) * 20,
        where: {
          isDeleted: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          _count: {
            select: {
              subFeeds: true,
            },
          },
        },
      });
      const feeds: FeedModel[] = response.map((element) => ({
        ...element,
        createdAt: element.createdAt.toISOString(),
        updatedAt: element.updatedAt.toISOString(),
        subFeed: element._count.subFeeds,
        userId: '',
      }));
      return res.status(200).json({
        feeds,
      });
    default:
      res.status(405).json({
        message: 'Method is not allowed.',
      });
      break;
  }
  return;
};

export default feeds;
