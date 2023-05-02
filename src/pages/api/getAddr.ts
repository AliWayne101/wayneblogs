import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { host, protocol } = req.headers;
  const address = `${protocol}//${host}`;

  res.status(200).json({ address });
};

export default handler;