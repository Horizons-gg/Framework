import Themes from '@lib/themes'
import type { Theme } from '@models/theme'

import type { NextApiRequest, NextApiResponse } from 'next'


export default async (req: NextApiRequest, res: NextApiResponse<Theme>) => {

    try {
        const id: any = req.query.id

        if (!Themes[id]) return res.status(200).json(Themes['dark'])
        return res.status(200).json(Themes[id])

    } catch (error) {
        console.log('Theme Error: ' + error)

        return res.status(200).json(Themes['dark'])
    }

}
