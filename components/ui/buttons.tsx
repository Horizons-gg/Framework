import type { Theme } from '@models/theme'

import React, { ReactNode, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'



interface Props {
    children?: ReactNode

    href?: string

    style?: 'regular' | 'solid'
}


export const Simple = (props: Props) => {

    //? Solid Style
    if (props.style === 'solid') return (
        <div>
            <a className="inline-flex items-center px-8 py-3 text-white bg-cyan-500 border border-cyan-500 rounded hover:bg-transparent hover:text-bg-cyan-500 active:text-cyan-500 focus:outline-none" href={props.href || '#'}>
                <p>{props.children}</p>
            </a>
        </div>
    )


    //? Regular Style
    else return (
        <div>
            <a className="inline-flex items-center px-8 py-3 text-cyan-400 border border-cyan-500 rounded hover:bg-cyan-500 hover:text-white active:bg-cyan-500 focus:outline-none" href={props.href || '#'}>
                <p>{props.children}</p>
            </a>
        </div>
    )

}