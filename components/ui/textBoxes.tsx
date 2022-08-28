import React, { ReactNode, useEffect, useState } from 'react'



interface Props {
    children?: ReactNode

    style?: 'regular' | 'solid'

    type?: 'text' | 'number' | 'password' | 'email'
    placeholder?: string
}


export const Simple = (props: Props) => {

    //? Solid Style
    return (
        <div className="relative" style={{margin: '50px 30px'}}>
            <input type={props.type || 'text'} className="w-full p-4 pr-12 text-sm bg-slate-800 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-slate-600" placeholder={props.placeholder} />
        </div>
    )

}