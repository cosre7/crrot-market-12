import withHandler from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone } : { email };
  // upsert, 동적 방식으로 구현
  const user = await client.user.upsert({
    where: {
      // ...(phone && { phone }),
      // ...(email && { email })
      ...payload
    },
    create: {
      name: 'Anonymous',
      // ...(phone && { phone }),
      // ...(email && { email })
      ...payload
    },
    update: {}
  });
  console.log(user);

  // upsert 방식으로 구현
  // let user;
  // if (phone) {
  //   user = await client.user.upsert({
  //     where: {
  //       phone
  //     },
  //     create: {
  //       phone,
  //       name: 'Anonymous'
  //     },
  //     update: {}
  //   });
  // } else if (email) {
  //   user = await client.user.upsert({
  //     where: {
  //       email
  //     },
  //     create: {
  //       email,
  //       name: 'Anonymous'
  //     },
  //     update: {}
  //   });
  // }

  // upsert 사용 전
  // let user;
  // if (email) {
  //   // 이메일을 가지는 유저 찾기
  //   user = await client.user.findUnique({
  //     where: {
  //       email
  //     }
  //   });
  //   if (user) console.log('found it');
  //   // 유저가 없을 경우 만들기
  //   if (!user) {
  //     console.log('Did not found. Will create.');
  //     user = await client.user.create({
  //       data: {
  //         name: 'Anonymous',
  //         email
  //       }
  //     });
  //   }
  //   console.log(user);
  // }
  // if (phone) {
  //   // 폰을 가지는 유저 찾기
  //   user = await client.user.findUnique({
  //     where: {
  //       phone
  //     }
  //   });
  //   if (user) console.log('found it');
  //   // 유저가 없을 경우 만들기
  //   if (!user) {
  //     console.log('Did not found. Will create.');
  //     user = await client.user.create({
  //       data: {
  //         name: 'Anonymous',
  //         phone
  //       }
  //     });
  //   }
  //   console.log(user);
  // }
  return res.status(200).end();
}

export default withHandler('POST', handler);
