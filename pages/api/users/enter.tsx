// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withHandler from '@/libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  return res.json({ OK: true });
}

export default withHandler('POST', handler);
