import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const method = req.method?.toUpperCase();
  if (method !== 'GET') {
    return res.status(405).json({
      message: 'The methods is not allowed.',
    });
  }
  return res.status(200).json({
    message: 'Status checked.',
  });
};

export default handler;
