import React, { ReactNode } from 'react'


interface Props {
    children?: ReactNode

    href?: string

    style?: 'regular' | 'solid'

    primaryColor?: string
    secondaryColor?: string
}


export const Simple = (props: Props) => {


    //? Solid Style
    if (props.style === 'solid') return (
        <div>
            <a className="inline-flex items-center px-8 py-3 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-transparent hover:text-indigo-600 active:text-indigo-500 focus:outline-none focus:ring" href={props.href || '#'}>
                <p>
                    {props.children}
                </p>
            </a>
        </div>
    )


    //? Regular Style
    else return (
        <div>
            <a className="inline-flex items-center px-8 py-3 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring" href={props.href || '#'}>
            <p>
                    {props.children}
                </p>
            </a>
        </div>
    )

}