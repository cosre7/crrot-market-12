import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true
          }
        }
      }
    });
    res.json({
      ok: true,
      products
    });
  }
  if (req.method === 'POST') {
    const {
      body: { name, price, description },
      session: { user }
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: 'xx',
        user: {
          connect: {
            id: user?.id
          }
        }
      }
    });

    res.json({
      ok: true,
      product
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler
  })
);
