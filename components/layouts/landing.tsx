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
        <>
            <Head>
                <title>{Props.title}</title>
            </Head>

            {Props.children}

            <Props.Footer />
        </>
    )
}

export default Landing