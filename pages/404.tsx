import type { NextPage } from 'next'
import Head from 'next/head'


const NoPageFoundPage: NextPage = () => {

    return (

        <a className='bg-slate-900 flex h-screen justify-center' href='/'>
                <span className='text-slate-100 text-8xl font-bold m-auto hover:text-pink-500 transition-all hover:cursor-pointer'>Nothing Here, Go Away</span>
        </a>

    )
}

export default NoPageFoundPage