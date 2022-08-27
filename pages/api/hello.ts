// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '@app/mongo'

type Data = {
  name: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const Users = await Database('users')
  Users.insertOne({ name: 'John Doe' })

  res.status(200).json({ name: 'John Doe' })

}
