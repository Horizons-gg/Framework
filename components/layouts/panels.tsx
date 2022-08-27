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
        <div className='flex h-screen'>
            <div className='m-auto'>
                <div className="p-8 border border-gray-100 shadow-xl rounded-xl">

                    <div className="mt-4 text-gray-500 sm:pr-8">
                        <FontAwesomeIcon icon={SolidIcons.faUser} />

                        <h5 className="mt-4 text-xl font-bold text-gray-900">{props.title}</h5>

                        <p className="hidden mt-2 text-sm sm:block">{props.subtitle}</p>

                        <br />

                        {props.children}
                    </div>

                </div>
            </div>
        </div>
    )

}