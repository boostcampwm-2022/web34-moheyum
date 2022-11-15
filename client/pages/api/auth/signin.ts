// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type requestData = {
  userId: string;
};
type responseData = {
  message: string;
  data: requestData;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<responseData>) {
  res.status(200).json({ message: 'success', data: { userId: req.body.userId } });
}
