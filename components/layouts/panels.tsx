import React, { ReactNode } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'


interface Props {
    children?: ReactNode

    title: string | ReactNode
    subtitle: string | ReactNode
    icon?: ReactNode
}


export const Simple = (props: Props) => {

    return (
        <div className='flex h-screen bg-slate-900'>
            <div className='m-auto'>
                <div className="p-8 border border-slate-800 shadow-xl rounded-xl">

                    <div className="mt-4 text-gray-400 sm:pr-8">
                        <FontAwesomeIcon icon={SolidIcons.faUser} />

                        <h5 className="mt-4 text-xl font-bold text-gray-300">{props.title}</h5>

                        <p className="mt-2 text-sm sm:block">{props.subtitle}</p>

                        {props.children}
                    </div>

                </div>
            </div>
        </div>
    )

}