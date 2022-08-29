import { ReactNode } from 'react'

import { NextPage } from 'next'
import Head from 'next/head'



interface Props {
    children?: ReactNode

    title: string


    Footer: NextPage
}


export const Landing = (Props: Props) => {

    return (
        <div className='h-screen bg-slate-900'>
            <Head>
                <title>{Props.title}</title>
            </Head>

            {Props.children}

            <Props.Footer />
        </div>
    )
}

export default Landing