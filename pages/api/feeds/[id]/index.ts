import { NextApiHandler } from 'next';
import { FeedUpdateForm } from '@models/feed';
import { prisma } from '@utils/db';

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  if (typeof id !== 'string') {
    return res.status(404).json({
      message: 'URL parameter is invalid.',
    });
  }
  const method = req.method?.toUpperCase();
  switch (method) {
    case 'PUT':
      const body: FeedUpdateForm = req.body;
      await prisma.feed.update({
        data: {
          content: body.content,
        },
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: `The feed ${id} is updated.`,
      });
    case 'DELETE':
      await prisma.feed.update({
        data: {
          isDeleted: true,
        },
        where: {
          id,
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
