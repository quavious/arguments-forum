import { NextApiHandler } from 'next';
import { FeedUpdateForm } from '@models/feed';
import { prisma } from '@utils/db';
import { getToken } from 'next-auth/jwt';

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  if (typeof id !== 'string') {
    return res.status(404).json({
      message: 'URL parameter is invalid.',
    });
  }
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token || !token.sub) {
    return res.status(403).json({
      message: 'You are not authenticated.',
    });
  }
  const method = req.method?.toUpperCase();
  switch (method) {
    case 'PUT':
      const body: FeedUpdateForm = req.body;
      await prisma.feed.updateMany({
        data: {
          content: body.content,
        },
        where: {
          id,
          userId: token.sub,
        },
      });
      return res.status(200).json({
        message: `The feed ${id} is updated.`,
      });
    case 'DELETE':
      await prisma.feed.updateMany({
        data: {
          isDeleted: true,
        },
        where: {
          id,
          userId: token.sub,
        },
      });
      res.status(200).json({
        message: `The feed ${id} is deleted.`,
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
