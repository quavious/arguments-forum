import { NextApiHandler } from 'next';
import { SubFeedModel } from '../../../../model/feed';
import { prisma } from '../../../../utils/db';

const handler: NextApiHandler = async (req, res) => {
  const feedId = req.query.id;
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
        createdAt: 'desc',
      },
    })
  ).map((subFeed) => ({
    ...subFeed,
    createdAt: subFeed.createdAt.toISOString(),
    updatedAt: subFeed.updatedAt.toISOString(),
    userId: '',
  }));
  return res.status(200).json({
    subFeeds,
  });
};

export default handler;
