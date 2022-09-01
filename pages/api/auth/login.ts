// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '@app/mongo'

type Data = {
    name: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const username = req.query.username
    const password = req.query.password


    const Users = await Database('users')
    const User: any = await Users.findOne({ 'username': username })

    if (!User) return res.status(401)

    res.status(200).json({ 'token': User.token })

}
