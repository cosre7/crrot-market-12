import withHandler from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone } : { email };
  const token = await client.token.create({
    data: {
      payload: '12345',
      user: {
        // 조건과 만족하는 user가 있는 경우 token과 연결, 없을 경우 user 생성
        connectOrCreate: {
          where: {
            ...payload
          },
          create: {
            name: 'Anonymous',
            ...payload
          }
        }
      }
    }
  });
  console.log(token);

  return res.status(200).end();
}

export default withHandler('POST', handler);
